const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const Ruta = require("../models/rutas/Ruta");

const validateAccesToken = async (req = request, res = response, next) => {
  const token = req.header("x-auth");

  if (!token) {
    return res.status(401).json({ msg: "Revisa el token" });
  }

  const metodo = req.method;
  const direccion = req.baseUrl.split("/").at(-1);
  //console.log(req.baseUrl.replace("/api/", ""));
  
  try {
    const { role } = jwt.verify(token, process.env.TOKEN_SECRET);
  
    const permisos = await Ruta.findOne({
      ruta: direccion,
      [req.method]: role.toString(),
    });

    if (!permisos) {
      return res.status(401).json({ msg: "no tienes permisos" });
    }

    next();

  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Revisa el token" });
  }
};

module.exports = validateAccesToken;
