const Joi = require("joi");

const userName = Joi.string().min(8).max(32);
const password = Joi.string().min(8).max(32);
const token = Joi.string().min(8);

const postJWTGenerateSchema = Joi.object({
  userName: userName.required(),
  password: password.required(),
});

module.exports = { postJWTGenerateSchema };
