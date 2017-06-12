'use strict';

var Mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var gravatar = require('gravatar');

const SALT_WORK_FACTOR = 10;

/**
 * В таблице users хранится:
 * username - логин
 * password - хэшированный пароль
 * email - почта
 * picture - ссылка на аватар
 */
var UserSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
	email: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        default: null
    }
});

/**
 * Перед сохранением данных, убеждаемся что:
 * 1. Задана аватарка пользователя, иначе ставим по-умолчанию;
 * 2. Хэшируем пароль.
 */
UserSchema.pre('save', function(next) {
    var user = this;

    // Если не задана аватарка, выбираем фото по-умолчанию
    if (!user.picture) {
        user.picture = gravatar.url(user.email, {s: '200', r: 'pg', d: '404'});;
    }

    // хэшируем пароль если он новый или был изменён
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

/**
 * Создаём метод для проверки пароля
 * (сравнивает указанный пароль с базой данных)
 * 
 */
UserSchema.methods.validatePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

// Создаём модель пользователя
var userModel = Mongoose.model('user', UserSchema);

module.exports = userModel;