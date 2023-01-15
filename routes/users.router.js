// Importamos dependencias
const express = require('express');
const UserService = require('./../services/user.service');
const validatorHandler = require('./../middlewares/validator.handler');
const verifyToken = require('../middlewares/validator.jwt.handler');
const { updateUserSchema, createUserSchema, getUserSchema } = require('./../schemas/user.schema');
const router = express.Router();
const service = new UserService();

// Recurso que permite para obtener los usuarios registrados
router.get('/',
    verifyToken,
    async (req, res, next) => {
        const { limit } = req.query;
        const { status } = req.query;
        try {
            let users = await service.find(limit, status);
            res.status(200).json({
                statusCode: 200,
                message: 'Success transaction',
                data: users
            });
        } catch (error) {
            next(error);
        }
    });

// Recurso que permite obtener un usuario
router.get('/:id',
    verifyToken,
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const { forceQuery } = req.query;
            let user = await service.findOne(id, forceQuery);
            res.status(200).json({
                statusCode: 200,
                message: 'Success transaction',
                data: user
            });
        } catch (error) {
            next(error);
        }
    }
);

// Recurso que permite crear un usuario
router.post('/',
    verifyToken,
    validatorHandler(createUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const passwordEncrypt = req.headers['pass-encrypt'];
            userCreated = await service.create(body, passwordEncrypt);
            res.status(201).json({
                statusCode: 201,
                message: "User created",
                data: userCreated
            });
        } catch (error) {
            next(error);
        }
    }
);

// Recurso que permite actualizar un usuario
router.patch('/:id',
    verifyToken,
    validatorHandler(getUserSchema, 'params'),
    validatorHandler(updateUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const museumUpdate = await service.update(id, body);
            res.status(200).json({
                statusCode: 200,
                message: "User updated",
                data: museumUpdate
            });
        } catch (error) {
            next(error);
        }
    }
);

// Recurso que permite eliminar un usuario
router.delete('/:id',
    verifyToken,
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const { forceDelete } = req.query;
            const userDeleted = await service.deleteOne(id, forceDelete);
            res.status(200).json({
                statusCode: 200,
                message: `User [${userDeleted}] successfully deleted`
            });
        } catch (error) {
            next(error);
        }
    }
);

// Exportamos router
module.exports = router;

