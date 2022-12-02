const nodemailer = require("nodemailer");
require("moment-timezone");
const moment = require("moment");
const { google } = require("googleapis");
const {
  generateUrl,
  generateToken,
} = require("../../utils/googleAuthGenerate");

const Agente = require("../../models/Agente");
const SaveEmail = require("../../models/SaveEmail");

moment.tz.setDefault("Europe/Madrid");

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
  const { message, subject, to } = body;

  if (!id) throw new Error("Envia el id");
  if (!message || !subject || !to)
    throw new Error("Debes rellenar todos los campos antes de enviar el mail");

  const agente = await Agente.findOne({ _id: id });

  if (!agente) throw new Error("no existe el agente");

  const { google_access_token, google_refresh_token, email, name_show_email } =
    agente;
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
      user: email, // cambiar el mail
      clientId: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_SECRET_ID,
      refreshToken: google_refresh_token,
      accessToken: token,
    },
  });

  // TODO: SISTEMA PARA ENVIAR ARCHIVOS ADJUNTOS

  const mailOptions = {
    from: `${name_show_email} <${email}>`, // cambiar por NameMail y el mail
    to,
    subject,
    text: message,
  };

  const result = await transport.sendMail(mailOptions);
  console.log(result);

  if(result){

const data = {
  agente: agente._id,
  to,
  subject,
  message,
  date: moment().toDate()
}

   await new SaveEmail(data).save()
  }

  return "Email Enviado";
};

module.exports = {
  authenticateGoogleGmailServices,
  saveTokenGoogleServices,
  sendGmailServices,
};
