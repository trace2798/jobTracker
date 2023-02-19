import Job from '../models/Job.js';

const createJob = async (req, res) => {
  res.send(" Create Job");
};

const deleteJob = async (req, res) => {
  res.send(" Delete Job");
};
const getAllJobs = async (req, res) => {
  res.send(" getAllJobs Job");
};

const updateJob = async (req, res) => {
  res.send("Update Job");
};

const showStats = async (req, res) => {
  res.send("Stats of Job");
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
