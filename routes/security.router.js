const express = require("express");
const SecurityServices = require("../services/security.service");
const router = express.Router();
const service = new SecurityServices();
// const validatorHandler = require('../middlewares/validator.handler');
// const { postJWTGenerateSchema } = require("../schemas/security.schema");

// Recurso post para generar JWT
router.post('/generate',
    //   validatorHandler(postJWTGenerateSchema, 'body'),
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

module.exports = router;
