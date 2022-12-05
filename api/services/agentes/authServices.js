const bcryptjs = require("bcryptjs");
const Agente = require("../../models/Agente");
const generateAccessToken = require("../../utils/generateAccessToken");

const authLoginServices = async (body) => {
  const { password, username } = body;
  // validacion req.body
  if (!password || !username)
    throw new Error("Debes ingresar tus datos de logueo");
  // validacion username
  const agent = await Agente.findOne({ username })
  if (!agent) throw new Error("Verifica las credenciales");
  //validacion contraseña
  const validPassword = bcryptjs.compareSync(password, agent.password);
  if (!validPassword) throw new Error("Verifica las credenciales");
  // JWT
  let token;
  if (agent.isActive) token = generateAccessToken(agent._id, agent.role);
  



  let agentData = {
    id: agent._id,
    username: agent.username,
    role: agent.role
  } 
  return agent;

};

module.exports = {
  authLoginServices,
};
