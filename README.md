# NodeJS Chat

Розширена версія веб-чату мовою JavaScript на основі NodeJS.

## Технології
+ Express як основний фреймворк (шаблонізатор).
+ Сессії на основі [express-session](https://github.com/expressjs/session) пакету.
+ Аутентифікація на основі [Passport](https://github.com/jaredhanson/passport).
+ Шифрування паролів за допомогою [bcrypt-nodejs](https://github.com/shaneGirish/bcrypt-nodejs) пакету.
+ Комунікація реального часу за допомогою [Socket.io](https://github.com/socketio/socket.io).
+ Використовує [MongoDB](https://github.com/mongodb/mongo), [Mongoose](https://github.com/Automattic/mongoose) та [MongoLab(mLab)](https://mlab.com/) як бази даних.
+ Зберігає сессії у [MongoDB](https://github.com/mongodb/mongo) за допомогою [connect-mongo](https://github.com/kcbanner/connect-mongo);
+ [Redis](https://github.com/antirez/redis) як адаптер для [Socket.io](https://github.com/socketio/socket.io).
+ Журналювання подій за допомогою [Winston](https://github.com/winstonjs/winston).

**Розробник:** Герасименко Богдан Артурович

**Науковий керівник:** Попівщий Василь Іванович

Жива [демо-версія](https://chatua.herokuapp.com)
