// Middlewares de errores
const boom = require('@hapi/boom');

// Middleware que permite imprimir por pantalla un error
function logErrors(err, req, res, next) {
  console.log(err);
  next(err);
}

// Middleware que permite capturar un error de sequelize
function ormErrorHandler(err, req, res, next) {
  if (err.name.includes('Sequelize')) {
    // next(boom.badRequest(err.errors.map(e => e.message)));
    next(boom.conflict(`${err.errors[0].message} - ${err.parent.detail}`));
  } else {
    next(err);
  }
}

// Middleware que permite capturar un error de tipo boom
function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

// Middleware que retorna un error 500 en caso no de detectar un error de tipo boom
function errorHandler(err, req, res, next) {
  res.status(500).json({
    statusCode: 500,
    error: 'Internal Server Error',
    message: `${err.message} - ${err.stack}`
  });
}

// Exportamos funciones
module.exports = { logErrors, ormErrorHandler, boomErrorHandler, errorHandler }
