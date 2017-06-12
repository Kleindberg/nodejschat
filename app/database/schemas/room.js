'use strict';

var Mongoose = require('mongoose');

/**
 * Каждое соединение - это отедльный пользователь через уникальный сокет.
 * Каждое соединение состоит из {userId + socketId}, оба параметра уникальны.
 */
var RoomSchema = new Mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    connections: {
        type: [{
            userId: String,
            socketId: String
        }]
    }
});

var roomModel = Mongoose.model('room', RoomSchema);

module.exports = roomModel;