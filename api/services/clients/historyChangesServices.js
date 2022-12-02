const HistoryChange = require("../../models/HistoryChange");

const getAllHistoryChangesServices = async (req) => {
  let { limit = 30, page = 0 } = req.query;
  limit = parseInt(limit);
  page = parseInt(page);
  const historyChanges = await HistoryChange.find()
    .skip(page * limit)
    .limit(limit);

  const count = await HistoryChange.countDocuments();

  const data = {
    total: count,
    page: +page,
    per_page: limit,
    result: historyChanges,
  };

  return data;
};

const readHistoryChangesServices = async (params) => {
  const {id} = params

  const history = await HistoryChange.findById({_id:id})

  return history 
};

module.exports = {
  readHistoryChangesServices,
  getAllHistoryChangesServices,
};
