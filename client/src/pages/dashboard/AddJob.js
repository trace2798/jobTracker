import { useState } from "react";
import { FormRow, Alert, FormRowSelect } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddJob = () => {
  const {
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }
    console.log("create job");
  };

  const handleJobInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };
  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        {showAlert && <Alert />}

        {/* name */}
        <div className="form-center">
          <FormRow
            type="text"
            name="Position"
            value={position}
            handleChange={handleJobInput}
          />

          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />

          <FormRow
            type="text"
            labelText="location"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />

          {/* job type */}
          <div className="form-row">
            <label htmlFor="jobType" className="form-label">
              job type
            </label>
            <select
              name="jobType"
              value={jobType}
              handleChange={handleJobInput}
              className="form-select"
            >
              {/* default value in the state is full-time */}
              {jobTypeOptions.map((jobtype, index) => {
                return (
                  <option key={index} value={jobtype}>
                    {jobtype}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Job status */}
          <div className="form-row">
            <label htmlFor="jobStatus" className="form-label">
              Status
            </label>
            <select
              name="status"
              value={status}
              handleChange={handleJobInput}
              className="form-select"
            >
              {/* default value in the state is full-time */}
              {statusOptions.map((statusoptions, index) => {
                return (
                  <option key={index} value={statusoptions}>
                    {statusoptions}
                  </option>
                );
              })}
            </select>
          </div> 
          {/* we can also use <FormRowSelect/> like the example below instead of hard coding it. */}
          {/* <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          /> */}

          <div>
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={handleSubmit}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
