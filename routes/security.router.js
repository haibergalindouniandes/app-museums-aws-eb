const express = require("express");
const SecurityServices = require("../services/security.service");
const router = express.Router();
const service = new SecurityServices();

const validatorHandler = require('../middlewares/validator.handler');
const { postJWTGenerateSchema } = require("../schemas/security.schema");

//Prueba borrar
const MuseumServices = require('../services/museum.service');
const serviceM = new MuseumServices();
const verifyToken = require('../middlewares/validator.jwt.handler');
const { getMuseumSchema, createMuseumSchema, updateMuseumSchema, generateMuseumsSchema, updateParcialMuseumSchema } = require('../schemas/museum.schema');



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
    verifyToken,
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


// Recurso get para obtener un museo por el identificador a traves de path params
router.get('/:id',
    verifyToken,
    validatorHandler(getMuseumSchema, 'params'),
    async (req, res, next) => {
        // Forma convencional para obtener el path param a buscar
        // const id = req.params.id;
        // Destructiracion de objetos ecmascript para obtener solo los elementos que necesito
        try {
            const { id } = req.params;
            const { forceQuery } = req.query;
            let museum = await serviceM.findOne(id, forceQuery);
            res.status(200).json({
                statusCode: 200,
                message: 'Success transaction',
                data: museum
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
            museumCreated = await serviceM.create(body);
            res.status(201).json({
                statusCode: 201,
                message: "Museum created",
                data: museumCreated
            });
        } catch (error) {
            next(error);
        }
    });

// Recurso post para generar listado de museos
router.post('/generate/museums',
    verifyToken,
    validatorHandler(generateMuseumsSchema, 'body'),
    async (req, res, next) => {
        try {
            const { noMuseums } = req.body;
            const limit = noMuseums || 10;
            await serviceM.generate(limit);
            res.status(201).json({
                statusCode: 201,
                message: "Museums created"
            });
        } catch (error) {
            next(error);
        }
    });

// Recurso put para actualizar un museo completo
router.put('/:id',
    verifyToken,
    validatorHandler(getMuseumSchema, 'params'),
    validatorHandler(updateMuseumSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const museumUpdate = await serviceM.update(id, body);
            //Validamos si se actualizo la inforamcion de museo
            res.status(200).json({
                statusCode: 200,
                message: "Museum updated",
                data: museumUpdate
            });
        } catch (error) {
            next(error);
        }
    });

// Recurso path para actualizar un museo parcialmente
router.patch('/:id',
    verifyToken,
    validatorHandler(getMuseumSchema, 'params'),
    validatorHandler(updateParcialMuseumSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const museumUpdate = await serviceM.parcialUpdate(id, body);
            res.status(200).json({
                statusCode: 200,
                message: "Museum updated",
                data: museumUpdate
            });
        } catch (error) {
            next(error);
        }
    });

// Recurso para eliminar toda la lista de museos o uno en especifico
router.delete('/',
    verifyToken,
    async (req, res, next) => {
        try {
            await serviceM.deleteAll();
            res.status(200).json({
                statusCode: 200,
                message: `Museums deleted`
            });
        } catch (error) {
            next(error);
        }
    });

// Recurso para eliminar un museo en especifico
router.delete('/:id',
    verifyToken,
    validatorHandler(getMuseumSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const museumDeleted = await serviceM.deleteOne(id);
            res.status(200).json({
                statusCode: 200,
                message: `The museum with the id [${museumDeleted}] deleted`
            });
        } catch (error) {
            next(error);
        }

    });

module.exports = router;
