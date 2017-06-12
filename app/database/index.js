'use strict';

var config = require('../config');
var Mongoose = require('mongoose');
var logger = require('../logger');

// Подключаемся к базе данных
// Создаем ссылку включающую логин и пароль
var dbURI = "mongodb://" +
    encodeURIComponent(config.db.username) + ":" +
    encodeURIComponent(config.db.password) + "@" +
    config.db.host + ":" +
    config.db.port + "/" +
    config.db.name;
Mongoose.connect(dbURI);

// Отображаем ошибку если что-то пошло не так
Mongoose.connection.on('error', function(err) {
    if (err) throw err;
});

// Так как библиотека mpromise больше не поддерживается, 
// разрабатываем собственный Promise
Mongoose.Promise = global.Promise;

// Подключаем схемы
module.exports = {
    Mongoose,
    models: {
        user: require('./schemas/user.js'),
        room: require('./schemas/room.js')
    }
};