const express = require("express");
const SecurityServices = require("../services/security.service");
const router = express.Router();
const service = new SecurityServices();

const validatorHandler = require('../middlewares/validator.handler');
const { postJWTGenerateSchema } = require("../schemas/security.schema");

// Recurso post para generar JWT
router.post('/generate',
    validatorHandler(postJWTGenerateSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const token = service.generateJWT(body);
            res.status(200).json({
                statusCode: 200,
                message: 'Successful authentication',
                token: token
            });
        } catch (error) {
            next(error);
        }
    }
);

//Borrar

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
