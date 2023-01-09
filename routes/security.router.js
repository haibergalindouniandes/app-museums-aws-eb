const express = require("express");
const SecurityServices = require("../services/security.service");
const router = express.Router();
const service = new SecurityServices();

const validatorHandler = require('../middlewares/validator.handler');
const { postJWTGenerateSchema } = require("../schemas/security.schema");

//Prueba borrar
const MuseumServices = require('../services/museum.service');
const serviceM = new MuseumServices();



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
            let museums = await serviceM.find(limit, queryType);
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
