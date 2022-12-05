const nodemailer = require("nodemailer");
require("moment-timezone");
const moment = require("moment");
const { google } = require("googleapis");
const {
  generateUrl,
  generateToken,
} = require("../../utils/googleAuthGenerate");
const mongoose = require("mongoose");
const Agente = require("../../models/Agente");
const Client = require("../../models/Client");
const Document = require("../../models/Documento");
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
  const { message, subject, client, files } = body;
  let attachments = [];

  objectId = mongoose.Types.ObjectId(client);

  if (!id) throw new Error("Envia el id");
  if (!message || !subject || !client)
    throw new Error("Debes rellenar todos los campos antes de enviar el mail");

  const clientExist = await Client.findById({ _id: objectId });

  if (!clientExist) {
    throw new Error("No hay ningun cliente con ese id");
  }

  if (clientExist) {
    if (!clientExist.email) {
      throw new Error("El cliente no tiene email");
    }
  }

  const agente = await Agente.findOne({ _id: id });

  if (!agente) throw new Error("no existe el agente");

  if (files) {
    files.forEach(async (file) => {
      document = await Document.findOne({ _id: file });

      if (document) {
        const documentFormat = {
          filename: `${document.name}.${document.type}`,
          path: `${document.path_local}`,
        };

        attachments.push(documentFormat);
      }

      console.log(attachments);
    });
  }

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
    to: clientExist.email,
    subject,
    text: message,
    attachments,
  };

  const result = await transport.sendMail(mailOptions);

  if (result) {
    const data = {
      agente: agente._id,
      client: clientExist._id,
      subject,
      message,
      date: moment().toDate(),
    };

    await new SaveEmail(data).save();
  }

  return "Email Enviado";
};

module.exports = {
  authenticateGoogleGmailServices,
  saveTokenGoogleServices,
  sendGmailServices,
};
