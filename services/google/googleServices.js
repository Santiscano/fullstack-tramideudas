
const Agente = require("../../models/Agente");
const { generateUrl, generateToken } = require("../../utils/googleAuthGenerate");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const authenticateGoogleGmailServices = async () => await generateUrl();

const saveTokenGoogleServices = async (req = request) => {
  const { code } = req.query;
  const { userId } = req;
  const isAgent = await Agente.findOne({ _id: userId });
  if (!isAgent) throw new Error("Ese usuario no existe");
  const { refresh_token, access_token } = await generateToken(code);
  await isAgent.updateOne({
    google_access_token: access_token,
    google_refresh_token: refresh_token,
  });
  return "Registrado con exito";
};

const sendGmailServices = async (params, body) => {
  const { id } = params;
  const { message } = body;

  if (!id || !message) throw new Error("Envia el id y el mensaje");

  const agente = await Agente.findOne({ _id: id });

  if (!agente) throw new Error("no existe el agente");

  const { google_access_token, google_refresh_token, email } = agente;

  const GMAIL_SCOPES = ["https://mail.google.com/"];

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT,
    process.env.GOOGLE_SECRET_ID,
    GMAIL_SCOPES
  );

  oAuth2Client.setCredentials({ refresh_token: google_refresh_token });

  const { token } = await oAuth2Client.getAccessToken();

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
  return "Email Enviado";
};

module.exports = {
    authenticateGoogleGmailServices,
    saveTokenGoogleServices,
    sendGmailServices,
};
