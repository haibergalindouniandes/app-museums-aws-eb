const boom = require('@hapi/boom');
const jwt = require("jsonwebtoken");
const config = require('../configs/config');

// Middleware que permite validar el JWT enviado en el headers["access-token"]
function verifyToken(req, res, next) {
  const token = req.headers["access-token"];
  if (token == null) {
    next(boom.badRequest('Token not provided'));
  }

  jwt.verify(token, config.privateKey, (err, decoded) => {
    if (err) {
      next(boom.unauthorized(err.message));
    }
    req.decoded = decoded;
    next();
  });
}

module.exports = verifyToken;
