var express = require('express');
var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

const securityRouter = require('./security.router');

//Funcion que tiene todos los enrutamientos de la aplicación
function routerApi(app) {
  //Agregamos a la app el pattern path del servicio
  app.use('/aws/cloudapp/v1', router);
  //Agregamos los paths de los servicios de museos
  // router.use('/museums', museumRouter);
  //Agregamos los paths de los servicios de museos
  router.use('/security', securityRouter);
  //Si queremos definir varias enpoint con diferentes versiones se haria de la siguiente forma
  // const routerV2 = express.Router();
  // app.use('/aws/cloudapp/v2', routerV2);
  // routerV2.use('/museums', museumsRouter);
}

module.exports = routerApi;


