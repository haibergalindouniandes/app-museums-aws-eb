// var createError = require('http-errors');
var express = require('express');
// var path = require('path');
var cookieParser = require('cookie-parser');
//Importamos logger morgan
var logger = require('morgan');
//Importamos el routerApi
var routerApi = require('./routes')
//Importamos helmet que nos permite habilitar cabeceras
var helmet = require('helmet')
//Importamos la configuracion para el JWT
var config = require('./configs/config');
//Importamos los Middlewares de manejo de errores
var { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

//Creamos app
var app = express();
//Hacemos uso de logger en dev
app.use(logger('dev'));
//Middleware necesario para poder obtener la data que viaja a nuestro servicio en formato json, se debe implementar un middleware de express "express.json()"
app.use(express.json());
//Middleware necesario para poder codificar el payload
app.use(express.urlencoded({ extended: false }));
//Middleware necesario para poder obtener y parsear las cookies
app.use(cookieParser());
//Hacemos uso de helmet
app.use(helmet());
//Definimos el key maestro
app.set('key', config.key);
//Asignamos el routerAPI
routerApi(app);
//Midlewares para manejo de errores (estos deben ser asigandos despues del router)
//Es muy importante tambien el orden, ya que se ejecutan de forma secuencia
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
//Levantamos el servidor en el puerto configurado
app.listen(() => {
  console.log('Application running ...')
});

module.exports = app;
