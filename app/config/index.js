'use strict';

var init = function() {
	// Настройки production на сервере
    if (process.env.NODE_ENV === 'production') {
        var redisURI = require('url').parse(process.env.REDIS_URL);
        var redisPassword = redisURI.auth.split(':')[1];
        return {
            db: {
                username: 'heroku_dm91w47r',
                password: 'kbq3ejjul5oetu08mciuk6uuu0',
                host: 'ds123662.mlab.com',
                port: 23662,
                name: 'heroku_dm91w47r'
            },
            sessionSecret: process.env.sessionSecret,            
            redis: {
                host: redisURI.hostname,
                port: redisURI.port,
                password: redisPassword
            }
        }
    } else {
		// Если запущено на localhost
        return require('./config.json');
    }
}

module.exports = init();
