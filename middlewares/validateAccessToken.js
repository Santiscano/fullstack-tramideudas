const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const Agente = require("../models/agentes/Agente");

const validateAccesToken = async(req = request, res = response, next) => {
  const token = req.header("x-auth");


  if (!token) {
    return res.status(401).json({ msg: "Revisa el token" });
  }

  try {



    const {role} = jwt.verify(token, process.env.TOKEN_SECRET);
  

 
  
  

  
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Revisa el token" });
  }
};

module.exports = validateAccesToken;
