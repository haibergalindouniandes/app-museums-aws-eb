const express = require('express');
const { async } = require('rxjs');
const router = express.Router();
// const verifyToken = require('../middlewares/validator.jwt.handler');

// Recurso get para obtener los museos desde un Json, tambien se obtienen valores desde query params
router.get('/',
  // verifyToken,
  async (req, res, next) => {
    // Forma convencional para obtener el path param a buscar
    // const size = req.query.size;
    // Destructiracion de objetos ecmascript para obtener solo los elementos que necesito
    try {
      res.status(200).json({
        statusCode: 200,
        message: 'Success transaction',
        data: [{
          name: "Museum Created By API",
          description: "enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem",
          address: "9212 Packers Hill",
          city: "Bogota",
          image: "https://secretldn.com/wp-content/uploads/2022/01/summer-of-culture-british-museum-1024x606-1-666x394.jpg",
          isBlocked: false,
          id: 1
        }]
      });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
