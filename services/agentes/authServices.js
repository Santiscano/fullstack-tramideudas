const bcryptjs = require("bcryptjs");
const { request } = require("express");
const Agente = require("../../models/agentes/Agente");
const generateAccessToken = require("../../utils/generateAccessToken");
const { generateUrl, generateToken } = require("../../utils/googleAuth");

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
  let token;

  if (agent.isActive) {
    token = generateAccessToken(agent._id, agent.role);
  }

  return {
    token,
  };
};
const authLogoutServices = async (req) => {};
const authGetTokenServices = async () => {
  const token = await generateUrl();

  return token;
};
const authSaveTokenServices = async (req = request) => {
  const { code } = req.query;
  const { userId } = req;

  const isAgent = await Agente.findOne({ _id: userId });

  if (!isAgent) throw new Error("Ese usuario no existe");

  const { refresh_token, access_token } = await generateToken(code);

  await isAgent.updateOne({
    google_access_token: access_token,
    google_refresh_token: refresh_token,
  });

  return "token agregado";
};
const authSentMailServices = async (params, body) => {
  const nodemailer = require("nodemailer");
  const { google } = require("googleapis");

  const { id } = params;
  const { message } = body;

  if (!id || !message) throw new Error("Envia el id y el mensaje");

  const agente = await Agente.findOne({ _id: id });

  if (!agente) throw new Error("no existe el agente");

  // console.log(agente);

  const { google_access_token, google_refresh_token, email } = agente;

  // oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  const GMAIL_SCOPES = ["https://mail.google.com/"];

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT,
    process.env.GOOGLE_SECRET_ID,
    GMAIL_SCOPES
  );

  oAuth2Client.setCredentials({ refresh_token: google_refresh_token });

  const { token } = await oAuth2Client.getAccessToken();

  console.log(token);

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "newusertest3.0@gmail.com",
      clientId: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_SECRET_ID,
      refreshToken: google_refresh_token,
      accessToken: { token },
    },
  });

  const mailOptions = {
    from: "Siddhant &lt;newusertest3.0@gmail.com>",
    to: "contacto@manuel-corrales.es",
    subject: "Gmail API NodeJS",
    text: "The Gmail API with NodeJS works",
  };

  const result = await transport.sendMail(mailOptions);
  console.log(result);
};

module.exports = {
  authServices,
  authLogoutServices,
  authGetTokenServices,
  authSaveTokenServices,
  authSentMailServices,
};
