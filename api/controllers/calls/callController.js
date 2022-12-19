const {
  createHistoryCallServices,
  createNotifyAnswerServices,
} = require("../../services/calls/callsServices");

const createHistoryCallController = async (req, res) => {
  try {
    const data = await createHistoryCallServices(req);
    return res.status(201).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};
const createNotifyAnswerController = async (req, res) => {
  try {
    const data = await createNotifyAnswerServices(req);
    return res.status(201).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};

module.exports = {
  createHistoryCallController,
  createNotifyAnswerController,
};
