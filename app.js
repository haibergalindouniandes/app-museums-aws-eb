// const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// Importamos logger morgan
const logger = require('morgan');
// Importamos el routerApi
const routerApi = require('./routes')
// Importamos helmet que nos permite habilitar cabeceras
const helmet = require('helmet')
//Importamos cors que nos va a permitir a solucionar el error de CORS
const cors = require('cors');
// Importamos las variables de ambiente
const { config } = require('./configs/config')
// Importamos los Middlewares de manejo de errores
const { logErrors, ormErrorHandler, boomErrorHandler, errorHandler } = require('./middlewares/error.handler');

// Creamos app
const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
// Hacemos uso de logger en dev
app.use(logger('dev'));
// Middleware necesario para poder obtener la data que viaja a nuestro servicio en formato json, se debe implementar un middleware de express "express.json()"
app.use(express.json());
//Hacemos uso de cors para habilitar el acceso desde cualquier origen
app.use(cors());
// Middleware necesario para poder codificar el payload
app.use(express.urlencoded({ extended: false }));
// Middleware necesario para poder obtener y parsear las cookies
app.use(cookieParser());
//Hacemos uso de helmet
app.use(helmet());
// Asignamos el routerAPI
routerApi(app);
// Midlewares para manejo de errores (estos deben ser asigandos despues del router)
// Es muy importante tambien el orden, ya que se ejecutan de forma secuencia
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);
// Levantamos el servidor en el puerto configurado
app.listen(config.port, () => {
  console.log(`Application running: ${config.port} ...`)
});

// Exportamos app
module.exports = app;
