const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateAccesToken = (req, res = response, next) => {
  const token = req.header("x-auth");

  if (!token) {
    return res.status(401).json({ msg: "Revisa el token" });
  }

  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    console.log(payload);
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Revisa el token" });
  }
};

module.exports = validateAccesToken;
