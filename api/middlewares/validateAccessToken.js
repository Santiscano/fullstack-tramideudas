const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const Ruta = require("../models/Ruta");

const validateAccesToken = async (req = request, res = response, next) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(403).json({ response: "No tienes los permisos" });

  const metodo = req.method;
  const direccion = req.baseUrl.split("/").at(-1);

  //console.log(req.baseUrl.replace("/api/", ""));

  try {
    const { role, id } = jwt.verify(token, process.env.TOKEN_SECRET);

    const permisos = await Ruta.findOne({
      ruta: direccion,
      [req.method]: role.toString(),
    });

    if (!permisos)
      return res.status(403).json({ response: "No tienes los permisos" });
    req.userId = id;
    next();
  } catch (error) {
    res.status(403).json({ ErrorMessage: "No estas autorizado" });
  }
};

module.exports = validateAccesToken;
