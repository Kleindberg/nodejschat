'use strict';

var config = require('../config');
var passport = require('passport');
var logger = require('../logger');

var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

// Отвечает за авторизацию пользователей
var init = function() {

    // Сериализация и десериализация зависимостей из сессии
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Локальные пользователи
    passport.use(new LocalStrategy(
        function(username, password, done) {
			// Извлекаем данные из базы
            User.findOne({
                username: new RegExp(username, 'i')
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
				// Если введённых данных нет в базе
                if (!user) {
                    return done(null, false, {
                        message: 'Для начала зарегистрируйтесь!'
                    });
                }
				// Если все хорошо - входим, иначе - ошибка
                user.validatePassword(password, function(err, isMatch) {
                    if (err) {
                        return done(err);
                    }
                    if (!isMatch) {
                        return done(null, false, {
                            message: 'Неверный логин или пароль'
                        });
                    }
                    console.log('К чату присоединился ' + username);
                    return done(null, user);
                });

            });
        }
    ));

    return passport;
}

module.exports = init();