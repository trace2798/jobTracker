import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";

const createJob = async (req, res) => {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError("please provide all values");
  }
  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id : ${jobId}`);
  }

  checkPermissions(req.user, job.createdBy);

  await job.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Job removed" });
};

const getAllJobs = async (req, res) => {
    //grabbing all the string parameters.
    const { status, jobType, sort, search } = req.query;

    //setting up the object
    const queryObject = {
      createdBy: req.user.userId,
    };

    // if result is not 'interview', 'declined', 'pending' then return all.
    if (status && status !== 'all') {
      queryObject.status = status;
    }
  // if result is not 'full-time', 'part-time', 'remote', 'internship' then return all.
    if (jobType  && jobType!== 'all') {
      queryObject.jobType = jobType;
    }

    if(search){
      //$regex is a MongoDB operator that allows you to perform regular expression (regex) pattern matching on a string field in a collection. It can be used in conjunction with other operators such as $match, $find, and $aggregate to filter or manipulate data.
      //With this setup we are not looking for the exact text but looking for positions where the text exists in general 
      //$options: 'i': Perform a case-insensitive search
      queryObject.position = { $regex: search, $options: 'i' };
    }

    //passing the object created above
    let result = Job.find(queryObject);

    if (sort === 'latest') {
      result = result.sort('-createdAt');
    }
    if (sort === 'oldest') {
      result = result.sort('createdAt');
    }
    if (sort === 'a-z') {
      result = result.sort('position');
    }
    if (sort === 'z-a') {
      result = result.sort('-position');
    }

    //Pagination
    //if page is not specified it will take the default value which is 1 in our case.
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    //whatever is the page -1 x Limit. Eg. for page 2 it will skip (2-1)*10=10.
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);

    const jobs = await result;
    //To show total jobs for the particular user taking in account the limit and skip
    const totalJobs = await Job.countDocuments(queryObject);
    //to show total number of pages taking in account the limit and skip
    const numOfPages = Math.ceil(totalJobs / limit);
    
  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs, numOfPages });
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;

  const { company, position } = req.body;

  if (!company || !position) {
    throw new BadRequestError("Please Provide All Values");
  }

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }

  // check permissions
  // req.user.userId (string) === job.createdBy(object)
  // throw new UnAuthenticatedError('Not authorized to access this route')

  // console.log(typeof req.user.userId)
  // console.log(typeof job.createdBy)

  checkPermissions(req.user, job.createdBy);
  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedJob });
};

const showStats = async (req, res) => {
  //For our stats we will use aggregation pipeline.
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  //manipulating the data to get in as object instead of array.
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
  //we need the default values so that the front end does not break when the values are null.
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };
  //we again run aggregate pipeline on monthlyApplications
  let monthlyApplications = await Job.aggregate([
    //grab all jobs based on user id.
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      //grouping them on 2 conditions. Year and month.
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
        },
        //We are using the createdAT property above so we will count how many jobs were created in that month in that specific year
        count: { $sum: 1 },
      },
    },
    //showcasing the last 6 months since we are getting all the jobs back we are using limit.
    //latest jobs first thats why -1.
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 12 },
  ]);
  //refactoring the monthlyApplications with moment
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      // accepts 0-11
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();
  //We use reverse because instead of showing the latest month first we show the oldest month first
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
