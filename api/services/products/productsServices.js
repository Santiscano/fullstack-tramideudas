const Product = require("../../models/Product");

const regexDouble = new RegExp(/\-?\d+\.\d+/);

const createProductServices = async (req) => {
  let { name, price, isBankable } = req.body;

  if (!name || !price)
    throw new Error("Debes enviar el nombre y precio del producto");

  isBankable = isBankable !== true ? { isBankable: false } : { isBankable };

  const result = regexDouble.test(price);

  if (!result) throw new Error("el precio debe ser un double");

  const data = {
    name,
    price,
    ...isBankable,
  };

  await new Product(data).save();

  return data;
};

const getAllProductServices = async (req) => {
  let { limit = 30, page = 0 } = req.query;
  limit = parseInt(limit);
  page = parseInt(page);
  const product = await Product.find()
    .skip(page * limit)
    .limit(limit);
  const count = await Product.countDocuments();
  const data = {
    total: count,
    page: +page,
    per_page: limit,
    result: product,
  };
  return data;
};

const updateProductServices = async (req) => {
  const { id } = req.params;
  const { price } = req.body;

  const result = regexDouble.test(price);

  if (!result) throw new Error("el precio debe ser un double");

  return await Product.findByIdAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );
};
const readProductServices = async (req) => {
  const { id } = req.params;
  if (!id) throw new Error("Envia el id del producto");
  const data = await Product.findOne({ _id: id }).lean();
  console.log(data);
  if (!data) throw new Error("No se encontro resultado");
  return data;
};

const deleteProductServices = async (req) => {
  const { id } = req.params;
  if (!id) throw new Error("Envia el id del producto");
  const data = await Product.findByIdAndRemove(
    { _id: id },
    { new: true }
  ).lean();
  if (!data) throw new Error("Ese producto no se encuentra");
  return data;
};
module.exports = {
  createProductServices,
  getAllProductServices,
  updateProductServices,
  readProductServices,
  deleteProductServices,
};
