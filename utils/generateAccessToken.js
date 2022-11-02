const jwt = require('jsonwebtoken')

const generateAccessToken = (username = '') => {

    const payload = {username}

    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '4h' });
  }

module.exports = generateAccessToken;