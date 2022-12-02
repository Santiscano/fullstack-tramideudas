const createNoteClientsServices = async (body) => {
    console.log('Nota');
};

const getAllNoteClientsServices = async (req) => {

};
const updateNoteClientsServices = async (req) => {


  const getUpdatedKeys = (oldData, newData) => {
    const data = uniq([...Object.keys(oldData), ...Object.keys(newData)]);
    const keys = [];
    for (const key of data) {
      if (!isEqual(oldData[key], newData[key])) {
        keys.push(key);
      }
    }
    return keys;
  };
  let updateList = getUpdatedKeys(client.toObject(), newData.toObject());

  console.log(updateList);

  dataHistory = {
    agente,
    update: {},
    client: client._id,
    date: moment().toDate(),
  };

  new HistoryChange(dataHistory).save();
};

const readNoteClientsServices = async (params) => {

};
const deleteNoteClientsServices = async (params) => {

};
module.exports = {
    createNoteClientsServices,
    getAllNoteClientsServices,
    updateNoteClientsServices,
    readNoteClientsServices,
    deleteNoteClientsServices,
};