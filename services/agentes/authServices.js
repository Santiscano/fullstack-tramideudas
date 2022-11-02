const bcryptjs = require("bcryptjs");
const Agente = require("../../models/agentes/Agente");
const generateAccessToken = require("../../utils/generateAccessToken");

const authServices = async (body) => {
  const { password, username } = body;

  // validacion req.body

  if (!password || !username)
    throw new Error("Debes ingresar tus datos de logueo");

  // validacion username
  const agent = await Agente.findOne({ username });

  if (!agent) throw new Error("Verifica las credenciales");

  //validacion contraseña

  const validPassword = bcryptjs.compareSync(password, agent.password);
  if (!validPassword) throw new Error("Verifica las credenciales");

  // JWT


  const token = generateAccessToken(agent._id,agent.role)

  return {
    token,
    msg: "Todo ok",
  };
};

module.exports = authServices;
