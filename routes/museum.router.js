const express = require('express');
const { async } = require('rxjs');
const MuseumServices = require('../services/museum.service');
const router = express.Router();
const service = new MuseumServices();
const validatorHandler = require('../middlewares/validator.handler');
const verifyToken = require('../middlewares/validator.jwt.handler');
const { createMuseumSchema } = require('../schemas/museum.schema');

// Recurso get para obtener los museos desde un Json, tambien se obtienen valores desde query params
router.get('/',
  verifyToken,
  async (req, res, next) => {
    // Forma convencional para obtener el path param a buscar
    // const size = req.query.size;
    // Destructiracion de objetos ecmascript para obtener solo los elementos que necesito
    const { limit } = req.query;
    const { queryType } = req.query;
    try {
      let museums = await service.find(limit, queryType);
      res.status(200).json({
        statusCode: 200,
        message: 'Success transaction',
        data: museums
      });
    } catch (error) {
      next(error);
    }
  });

// Recurso post para crear un nuevo museo
router.post('/',
  verifyToken,
  validatorHandler(createMuseumSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      museumCreated = await service.create(body);
      res.status(201).json({
        statusCode: 201,
        message: "Museum created",
        data: museumCreated
      });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
