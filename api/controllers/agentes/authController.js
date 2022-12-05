const { response } = require("express");
const { authLoginServices } = require("../../services/agentes/authServices");
const authLoginController = async (req, res = response) => {
  try {
    const data = await authLoginServices(req.body);
    return res
      .cookie("token", data.token, {
        httpOnly: true,
      })
      .status(200)
      // .json({ response: "Bienvenido" });
      .json({ response: data.agent});
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};
const authLogoutController = async (req, res = response) => {
  try {
    return res
      .clearCookie("token")
      .status(200)
      .json({ response: "Hasta luego" });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};

module.exports = {
  authLoginController,
  authLogoutController,
};
