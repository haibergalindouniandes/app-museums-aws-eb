// Importamos boom para la propagación de errores
const boom = require('@hapi/boom');

// Middleware que permite validar de forma dinamica contra un esquema
function validatorHandler(schema, property) {
  // Hacemos uso de las closure
  // Es una funcion que retorna otra funcion
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    // Validamos si se presenta un error al momento de validar
    if (error) {
      // Propagamos error con boom
      next(boom.badRequest(error));
    }
    next();
  }
}

// Exportamos funciones
module.exports = validatorHandler;
