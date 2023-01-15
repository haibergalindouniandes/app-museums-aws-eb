// Importamos dependencias
const Joi = require("joi")

// Definimos los parametros
const id = Joi.number().min(1);
const name = Joi.string().min(5).max(192);
const description = Joi.string().min(5).max(500);
const address = Joi.string().min(5).max(500);
const city = Joi.string().min(5).max(100);
const image = Joi.string().uri();
const isBlocked = Joi.boolean();
const noMuseums = Joi.number().min(1).max(1000);
const updateAt = Joi.date();

// Definimos el esquema para consultar museos
const getMuseumSchema = Joi.object({
  id: id.required(),
});

// Definimos el esquema para crear un museo
const createMuseumSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  address: address.required(),
  city: city.required(),
  image: image.required(),
  isBlocked: isBlocked
});

// Definimos el esquema para actualizar un museo
const updateMuseumSchema = Joi.object({
  id: id,
  name: name.required(),
  description: description.required(),
  address: address.required(),
  city: city.required(),
  image: image.required(),
  isBlocked: isBlocked.required(),
});

// Definimos el esquema para actualizar parcialmente un museo
const updateParcialMuseumSchema = Joi.object({
  id: id,
  name: name,
  description: description,
  address: address,
  city: city,
  image: image,
  isBlocked: isBlocked,
  updateAt: updateAt
});

// Definimos el esquema para generar museos aleatoriamente
const generateMuseumsSchema = Joi.object({
  noMuseums: noMuseums.required(),
});

// Exportamos los esquemas
module.exports = { getMuseumSchema, createMuseumSchema, updateMuseumSchema, generateMuseumsSchema, updateParcialMuseumSchema };
