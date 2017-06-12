'use strict';

var roomModel   = require('../database').models.room;
var User 		= require('../models/user');

var create = function (data, callback){
	var newRoom = new roomModel(data);
	newRoom.save(callback);
};

var find = function (data, callback){
	roomModel.find(data, callback);
}

var findOne = function (data, callback){
	roomModel.findOne(data, callback);
}

var findById = function (id, callback){
	roomModel.findById(id, callback);
}

var findByIdAndUpdate = function(id, data, callback){
	roomModel.findByIdAndUpdate(id, data, { new: true }, callback);
}

// Добавляем пользователя в выбранную комнату
var addUser = function(room, socket, callback){
	
	// Получаем id текущего пользователя
	var userId = socket.request.session.passport.user;

	// Создаём новое соединение {userId + socketId})
	var conn = { userId: userId, socketId: socket.id};
	room.connections.push(conn);
	room.save(callback);
}

// Получаем список всех пользователей в комнате
var getUsers = function(room, socket, callback){

	var users = [], vis = {}, cunt = 0;
	var userId = socket.request.session.passport.user;

	// Перебераем подключения к комнатам
	room.connections.forEach(function(conn){

		// Подсчитываем количество подключений к комнате
		if(conn.userId === userId){
			cunt++;
		}

		// Создаем список пользователей в комнате
		if(!vis[conn.userId]){
			users.push(conn.userId);
		}
		vis[conn.userId] = true;
	});

	// Перебераем всех пользователей, получаем ссылку на объект пользователя по id, присваиваем массиву.
	users.forEach(function(userId, i){
		User.findById(userId, function(err, user){
			if (err) { return callback(err); }
			users[i] = user;
			if(i + 1 === users.length){
				return callback(null, users, cunt);
			}
		});
	});
}

// Убираем пользователя из комнаты
var removeUser = function(socket, callback){

	// Получаем id текущего пользователя
	var userId = socket.request.session.passport.user;

	find(function(err, rooms){
		if(err) { return callback(err); }

		// Перебераем каждую комнату
		rooms.every(function(room){
			var pass = true, cunt = 0, target = 0;

			// Подсчитываем количество соединений с комнатами
			room.connections.forEach(function(conn, i){
				if(conn.userId === userId){
					cunt++;
				}
				if(conn.socketId === socket.id){
					pass = false, target = i;
				}
			});

			// Если комната отключилась от сокета завершаем перебор
			if(!pass) {
				room.connections.id(room.connections[target]._id).remove();
				room.save(function(err){
					callback(err, room, userId, cunt);
				});
			}

			return pass;
		});
	});
}

module.exports = { 
	create, 
	find, 
	findOne, 
	findById, 
	addUser, 
	getUsers, 
	removeUser 
};