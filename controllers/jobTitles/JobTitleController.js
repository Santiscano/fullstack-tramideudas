const {
  createJobTitleServices,
  getAllJobTitleServices,
  updateJobTitleServices,
  readJobTitleServices,
  deleteJobTitleServices,
} = require("../../services/jobTitles/jobTitleServices");
const createJobTitleController = async (req, res) => {
  try {
    const data = await createJobTitleServices(req.body);
    return res.status(201).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};
const updateJobTitleController = async (req, res) => {
  try {
    console.log(req.params);
    const data = await updateJobTitleServices(req.params, req.body);
    return res.status(200).json({ response: data });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ errorMessage: error.message });
  }
};
const readJobTitleController = async (req, res) => {
  try {
    const data = await readJobTitleServices(req.params);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};
const getAllJobTitleController = async (req, res) => {
  try {
    const data = await getAllJobTitleServices();
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};
const deleteJobTitleController = async (req, res) => {
  try {
    const data = await deleteJobTitleServices(req.params);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};
module.exports = {
  createJobTitleController,
  readJobTitleController,
  getAllJobTitleController,
  updateJobTitleController,
  deleteJobTitleController,
};
