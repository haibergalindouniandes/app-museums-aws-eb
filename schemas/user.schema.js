// Importamos dependencias
const Joi = require('joi');

// Definimos los parametros
const id = Joi.string();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5);
const status = Joi.string().max(2);

// Definimos el esquema para crear un museo
const createUserSchema = Joi.object({
    email: email.required(),
    password: password.required(),
    role: role.required()
});

// Definimos el esquema para actualizar un museo
const updateUserSchema = Joi.object({
    email: email,
    password: password,
    role: role,
    status: status
});

// Definimos el esquema para consultar museos
const getUserSchema = Joi.object({
    id: id
});

// Exportamos los esquemas
module.exports = { createUserSchema, updateUserSchema, getUserSchema }
