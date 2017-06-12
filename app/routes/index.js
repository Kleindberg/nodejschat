'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user');
var Room = require('../models/room');

// Главная страница
router.get('/', function(req, res, next) {
    // Если пользователь авторизован, перекидываем на страницу с комнатами
    if (req.isAuthenticated()) {
        res.redirect('/rooms');
    } else {
        res.render('login', {
            success: req.flash('success')[0],
            errors: req.flash('error'),
            showRegisterForm: req.flash('showRegisterForm')[0]
        });
    }
});

// Авторизация
router.post('/login', passport.authenticate('local', {
    successRedirect: '/rooms',
    failureRedirect: '/',
    failureFlash: true
}));

// Регистрация
router.post('/register', function(req, res, next) {

    var credentials = {
        'username': req.body.username,
        'password': req.body.password,
        'email': req.body.email
    };

    if (credentials.username === '' || credentials.password === '' || credentials.email === '') {
        req.flash('error', 'Ошибка регистрации');
        req.flash('showRegisterForm', true);
        res.redirect('/');
    } else {

        // Проверяем уникальность логина
        User.findOne({
            'username': new RegExp('^' + req.body.username + '$', 'i')
        }, function(err, user) {
            if (err) throw err;
            if (user) {
                req.flash('error', 'Такой пользователь уже есть!');
                req.flash('showRegisterForm', true);
                res.redirect('/');
            } else {
                User.create(credentials, function(err, newUser) {
                    if (err) throw err;
                    req.flash('success', 'Вы успешно зарегистрированы!');
                    res.redirect('/');
                });
            }
        });
    }
});

// Комнаты
router.get('/rooms', [User.isAuthenticated, function(req, res, next) {
    Room.find(function(err, rooms) {
        if (err) throw err;
        res.render('rooms', {
            rooms
        });
    });
}]);

// Чат
router.get('/chat/:id', [User.isAuthenticated, function(req, res, next) {
    var roomId = req.params.id;
    Room.findById(roomId, function(err, room) {
        if (err) throw err;
        if (!room) {
            return next();
        }
        res.render('chatroom', {
            user: req.user,
            room: room
        });
    });

}]);

// Выход
router.get('/logout', function(req, res, next) {
    // убираем req.user
    req.logout();

    // удаляем сессию
    req.session = null;

    // перенаправляем на главную страницу
    res.redirect('/');
});

module.exports = router;