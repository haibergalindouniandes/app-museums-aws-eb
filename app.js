// var createError = require('http-errors');
var express = require('express');
// var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

//Importamos el routerApi
var routerApi = require('./routes')
//Importamos helmet que nos permite habilitar cabeceras
var helmet = require('helmet')
//Importamos la configuracion para el JWT
var config = require('./configs/config');
//Importamos los Middlewares de manejo de errores
var { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');


var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


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

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
