// Importamos dependencias
const express = require('express');
const router = express.Router();
const securityRouter = require('./security.router');
const museumRouter = require('./museum.router');
const userRouter = require('./users.router');

// Función que tiene todos los enrutamientos de la aplicación
function routerApi(app) {
  app.use('/', router);
  // GET home page
  router.get('/', function (req, res, next) {
    res.render('index', { title: 'Museums API' });
  });
  // Agregamos a la app el pattern path del servicio
  app.use('/aws/cloudapp/v1', router);
  // Agregamos los paths de los servicios de seguridad
  router.use('/security', securityRouter);
  // Agregamos los paths de los servicios de museos
  router.use('/museums', museumRouter);
  // Agregamos los paths de los servicios de usuarios
  router.use('/users', userRouter);
  /*
  Si queremos definir varias enpoint con diferentes versiones se haria de la siguiente forma
  const routerV2 = express.Router();
  app.use('/aws/cloudapp/v2', routerV2);
  routerV2.use('/museums', museumsRouter);
  */
}

// Exportamos función routerApi
module.exports = routerApi;


