//Importamos dependencias
const Joi = require("joi");

//Definimos los parametros
const userName = Joi.string().min(8).max(32);
const password = Joi.string().min(8).max(32);

//Definimos el esquema para crear JWT
const postJWTGenerateSchema = Joi.object({
  userName: userName.required(),
  password: password.required(),
});

//Exportamos los esquemas
module.exports = { postJWTGenerateSchema };
