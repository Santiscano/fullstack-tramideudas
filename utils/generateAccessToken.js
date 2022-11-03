const jwt = require("jsonwebtoken");

const generateAccessToken = (_id = "", role = "") => {
  const payload = {
    id: _id,
    role,
  };

  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "24h" });
};

module.exports = generateAccessToken;
