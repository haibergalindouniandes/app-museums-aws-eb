// Importamos boom para la propagación de errores
const boom = require('@hapi/boom');
// Importamos jsonwebtoken que nos permite generar el JWT
const jwt = require("jsonwebtoken");
// Importamos las variables de ambiente
const { config } = require('../configs/config');

// Middleware que permite validar el JWT enviado en el headers["access-token"]
function verifyToken(req, res, next) {
  const token = req.headers["access-token"];
  // Validamos si viene el token
  if (token == null) {
    next(boom.unauthorized('Token not provided'));
  }

  jwt.verify(token, config.privateKey, (err, decoded) => {
    // Validamos si se presenta un error al verificar el token
    if (err) {
      next(boom.unauthorized(err.message));
    }
    req.decoded = decoded;
    next();
  });
}

// Exportamos función verifyToken
module.exports = verifyToken;
