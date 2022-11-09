const { google } = require("googleapis");


 const generateUrl = async () => {
    try {
      const oAuth2Client = await new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT,
        process.env.GOOGLE_SECRET_ID,
        process.env.GOOGLE_URI_REDIRECT
      );

      const GMAIL_SCOPES = ["https://mail.google.com/"];

      const url = await oAuth2Client.generateAuthUrl({
        redirect_uri: process.env.GOOGLE_URI_REDIRECT,
        access_type: "offline",
        prompt: "consent",
        scope: GMAIL_SCOPES,
      });
      return url
    } catch (error) {
      console.log(error);
    }
  }
 const generateToken = async (code) => {
    try {
      const oAuth2Client = await new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT,
        process.env.GOOGLE_SECRET_ID,
        process.env.GOOGLE_URI_REDIRECT
      );

      let { tokens } = await oAuth2Client.getToken(code);
      oAuth2Client.setCredentials(tokens);

      return tokens;
    } catch (error) {
      console.log(error.message);
      throw new Error("Algo salio mal");
    }
  }

  module.exports = {
    generateUrl,
    generateToken
  }

