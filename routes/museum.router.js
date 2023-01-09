const express = require('express');
const { async } = require('rxjs');
const MuseumServices = require('../services/museum.service');
const router = express.Router();
const service = new MuseumServices();
// const verifyToken = require('../middlewares/validator.jwt.handler');

// Recurso get para obtener los museos desde un Json, tambien se obtienen valores desde query params
router.get('/',
  // verifyToken,
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

module.exports = router;
