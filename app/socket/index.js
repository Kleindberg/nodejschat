'use strict';

var config = require('../config');
var redis = require('redis').createClient;
var adapter = require('socket.io-redis');

var Room = require('../models/room');

/**
 * Отвечает за работу сокетов
 */
var ioEvents = function(io) {

    // Namespace для комнат
    io.of('/rooms').on('connection', function(socket) {

        // Создание новой комнаты
        socket.on('createRoom', function(title) {
            Room.findOne({
                'title': new RegExp('^' + title + '$', 'i')
            }, function(err, room) {
                if (err) throw err;
                if (room) {
                    socket.emit('updateRoomsList', {
                        error: 'Такая комната уже создана!'
                    });
                } else {
                    Room.create({
                        title: title
                    }, function(err, newRoom) {
                        if (err) throw err;
                        socket.emit('updateRoomsList', newRoom);
                        socket.broadcast.emit('updateRoomsList', newRoom);
                    });
					console.log('Создана комната: ' + title);
                }
            });
        });
    });

    // Namespace для чатов
    io.of('/chatroom').on('connection', function(socket) {

        // Подключение к чату
        socket.on('join', function(roomId) {
            Room.findById(roomId, function(err, room) {
                if (err) throw err;
                if (!room) {
                    // Проверяет актуальность ссылки, если такая комната удалена - отображает ошибку                    
                    socket.emit('updateUsersList', {
                        error: 'Такой комнаты не существует!'
                    });
                } else {
                    // Check if user exists in the session
                    if (socket.request.session.passport == null) {
                        return;
                    }

                    Room.addUser(room, socket, function(err, newRoom) {

                        // Подключение к каналу
                        socket.join(newRoom.id);

                        Room.getUsers(newRoom, socket, function(err, users, cuntUserInRoom) {
                            if (err) throw err;

                            // Получаем список всех онлайн пользователей в комнате
                            socket.emit('updateUsersList', users, true);

                            // И сообщаем всем, что мы присоединились
                            if (cuntUserInRoom === 1) {
                                socket.broadcast.to(newRoom.id).emit('updateUsersList', users[users.length - 1]);
                            }
                        });
                    });
                }
            });
        });

        // Выход с чата
        socket.on('disconnect', function() {

            // Проверяем есть ли пользователь в сессии
            if (socket.request.session.passport == null) {
                return;
            }

            // Ищем комнату к которой подключен пользователь и его сокет и удаляем их
            Room.removeUser(socket, function(err, room, userId, cuntUserInRoom) {
                if (err) throw err;

                // Покидаем комнату
                socket.leave(room.id);

                // Return the user id ONLY if the user was connected to the current room using one socket
                // The user id will be then used to remove the user from users list on chatroom page
                if (cuntUserInRoom === 1) {
                    socket.broadcast.to(room.id).emit('removeUser', userId);
                }
            });
        });

        // Когда кто-то отправил сообщение
        socket.on('newMessage', function(roomId, message) {

            // No need to emit 'addMessage' to the current socket
            // As the new message will be added manually in 'main.js' file
            // socket.emit('addMessage', message);

            socket.broadcast.to(roomId).emit('addMessage', message);
        });

    });
}

/**
 * Инициализация Socket.io
 * Использует Redis как адаптер для Socket.io
 */
var init = function(app) {

    var server = require('http').Server(app);
    var io = require('socket.io')(server);

    // Заставляем Socket.io использовать только websockets
    io.set('transports', ['websocket']);

    // Используем Redis
    let port = config.redis.port;
    let host = config.redis.host;
    let password = config.redis.password;
    let pubClient = redis(port, host, {
        auth_pass: password
    });
    let subClient = redis(port, host, {
        auth_pass: password,
        return_buffers: true,
    });
    io.adapter(adapter({
        pubClient,
        subClient
    }));

    // Позволяет сокетам использовать сессии
    io.use((socket, next) => {
        require('../session')(socket.request, {}, next);
    });

    // Обработка событий
    ioEvents(io);
    
    return server;
}

module.exports = init;