const {
  getAllHistoryChangesServices,
  readHistoryChangesServices,
} = require("../../services/clients/historyChangesServices");

const readHistoryChangeController = async (req, res) => {
  try {
    const data = await readHistoryChangesServices(req.params);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};

const getAllHistoryChangeController = async (req, res) => {
  try {
    const data = await getAllHistoryChangesServices(req);
    return res.status(200).json({ response: data });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};

module.exports = {
  readHistoryChangeController,
  getAllHistoryChangeController,
};
