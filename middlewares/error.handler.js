// Middlewares de errores

// Middleware que permite imprimir por pantalla un error
function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
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

// Middleware que retorna un error 500 en caso no de detectar un error de manejado con boom
function errorHandler(err, req, res, next) {
  res.status(500).json({
    statusCode: 500,
    error: 'Internal Server Error',
    message: err.stack
  });
}

module.exports = { logErrors, errorHandler, boomErrorHandler }
