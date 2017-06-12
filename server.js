'use strict'; // Помогает от взлома

// Зависимости
var express 	= require('express');
var app  		= express();
var path 		= require('path');
var bodyParser 	= require('body-parser');
var flash 		= require('connect-flash');

// Компоненты
var routes 		= require('./app/routes');
var session 	= require('./app/session');
var passport    = require('./app/auth');
var ioServer 	= require('./app/socket')(app);
var logger 		= require('./app/logger');

// Порт по умолчанию
var port = process.env.PORT || 3000;

// Шаблонизатор Express
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// Прочие зависимости
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', routes);

// Отлавливает ошибку 404
app.use(function(req, res, next) {
	res.status(404).sendFile(process.cwd() + '/app/views/404.htm');
});

// Запускаем сервер
ioServer.listen(port, function () {
  console.log('Сервер доступен по адресу: 127.0.0.1:' + port);
});