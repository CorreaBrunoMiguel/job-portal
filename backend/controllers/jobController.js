const Job = require("../model/Job");
const User = require("../model/User");
const Application = require("../model/Application");
const SavedJob = require("../model/SavedJob");

/* @desc Create a new job (Employer Only) */
exports.createJob = async (req, res) => {
  try {
    if (role !== "employer") {
      return res.status(403).json({ message: "Only employers can post jobs" });
    }

    const job = await Job.create({ ...req.body, company: req.user._id });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getJobs = async (req, res) => {
  const { keyword, location, category, type, minSalary, maxSalary, userId } =
    req.query;

  const query = {
    isClosed: false,
    ...(keyword && { title: { $regex: keyword, $options: "i" } }),
    ...(location && { location: { $regex: location, $options: "i" } }),
    ...(category && { category }),
    ...(type && { type }),
  };

  if (minSalary || maxSalary) {
    query.$and = [];
  }
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* @desc Get Jobs for logged in user (Employer can see posted jobs) */
exports.getJobsEmployer = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* @desc Get single job by ID */
exports.getJobById = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* @desc Update a job (Employer Only) */
exports.updateJob = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* @desc Delete a job (Employer only) */
exports.deleteJob = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* @desc Toggle Close Status for a job (Employer only) */
exports.toggleCloseJob = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
