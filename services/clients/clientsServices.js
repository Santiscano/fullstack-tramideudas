const Client = require("../../models/Client");

const createClientServices = async (body) => {
  let data;
  let telephone = [];
  let {
    name,
    surnames,
    identity_document,
    telephone_number,
    email,
    address,
    advertising_allowed,
  } = body;

  if (!name || !surnames || !telephone_number)
    throw new Error("Debes enviar nombre,apellido y un telefono");

  if (!advertising_allowed) advertising_allowed = false;

  if (telephone_number) {
    telephone_number.forEach((number, idx) => {
      const main = idx === 0;
      let objNumbers = { number, main };
      telephone.push(objNumbers);
    });
  }

  if (address) {
    
    if(!address.type_via ||
    !address.name_via ||
    !address.number_via ||
    !address.postal_code ||
    !address.province ||
    !address.municipality) {
        throw new Error('Tipo via, nombre via y número via, provincia, codigo postal y municipio son requeridos')
    }

    data = {
        name,
        surnames,
        identity_document,
        telephone,
        email,
        advertising_allowed,
        address: {...address}
      };

  }else{
    data = {
        name,
        surnames,
        identity_document,
        telephone,
        email,
        advertising_allowed,
      };
  }

  return await new Client(data).save();
};

const getAllClientServices = async (req) => {
    let { limit = 30, page = 0 } = req.query;
    limit = parseInt(limit );
    page = parseInt(page);

   const params = { deleted: { $ne: true }}

    const clients = await Client.find(params)
                                    .skip(page * limit)
                                    .limit(limit)

    const count = await Client.countDocuments(params);

    
    const data = {
        total: count,
        page: +page,
        per_page: limit,
        result: clients,
      };
    
      return data;

};

const updateClientServices = async (req) => {
  console.log("PUT");
  return "PUT";
};

const readClientServices = async (params) => {
    const { id } = params;

  const client = await Client.findById(id);

  return client;
};
const deleteClientServices = async (params) => {
    const { id } = params;

    return await Client.findByIdAndUpdate(
      { _id: id },
      { deleted: true },
      { new: true }
    );
};
module.exports = {
  createClientServices,
  readClientServices,
  updateClientServices,
  getAllClientServices,
  deleteClientServices,
};
