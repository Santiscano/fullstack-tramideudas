const { response } = require("express");
const {
  authServices,
  authGetTokenServices,
  authSaveTokenServices,
  authSentMailServices,
} = require("../../services/agentes/authServices");
const authLoginController = async (req, res = response) => {
  try {
    const data = await authServices(req.body);
    return res
      .cookie("token", data.token, {
        httpOnly: true,
      })
      .status(200)
      .json({ msg: "Ok" });
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
};
const authLogoutController = async (req, res = response) => {
  try {
    return res.clearCookie("token").status(200).json({ msg: "Ok" });
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
};
const authGetTokenController = async (req, res) => {
  try {
    const data = await authGetTokenServices(req.body);
    return res.status(200).json({ msg: data });
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
};
const authSaveTokenController = async (req, res) => {
  try {
    const data = await authSaveTokenServices(req);
    return res.status(200).json({ msg: data });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
};
const authSendMailController = async (req, res) => {
  try {
    const data = await authSentMailServices(req.params, req.body);
    return res.status(200).json({ msg: data });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  authLoginController,
  authGetTokenController,
  authSaveTokenController,
  authSendMailController,
  authLogoutController,
};
