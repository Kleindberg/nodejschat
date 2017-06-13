'use strict';

// Звуковое уведомление
var notify = new Audio();
	notify.src = '/notify.mp3';

var app = {
	rooms: function() {
		var socket = io('/rooms', {
			transports: ['websocket']
		});
		// Когда сокет подключился, получаем список комнат
		socket.on('connect', function() {
			// Обновляем список комнат
			socket.on('updateRoomsList', function(room) {
				// Обрабатываем ошибки (например комната уже создана)
				$('.room-create p.message').remove();
				if(room.error != null) {
					$('.room-create').append(`<p class="message error">${room.error}</p>`);
				} else {
					app.helpers.updateRoomsList(room);
				}
			});
			// Если пользователь создает комнату
			$('.room-create button').on('click', function(e) {
				var inputEle = $("input[name='title']");
				var roomTitle = inputEle.val().trim();
				if(roomTitle !== '') {
					socket.emit('createRoom', roomTitle);
					inputEle.val('');
				}
			});
		});
	},
	chat: function(roomId, username) {
		var socket = io('/chatroom', {
			transports: ['websocket']
		});
		// Подключаемся к выбранной комнате
		socket.on('connect', function() {
			socket.emit('join', roomId);
			
			// Обновляем список пользователей в комнате
			socket.on('updateUsersList', function(users, clear) {
				$('.container p.message').remove();
				if(users.error != null) {
					$('.container').html(`<p class="message error">${users.error}</p>`);
				} else {
					app.helpers.updateUsersList(users, clear);
				}
			});
			
			// Когда пользователь отправляет сообщение создаем событие newMessage
			$('#message').keypress(function(e) {
				// По нажатию Enter в поле ввода текста в чате
				if(e.keyCode === 13 && !e.ctrlKey && !e.shiftKey) {
					var text = $('#message').html();
					if(text !== '') {
						var message = {
							content: text,
							username: username,
							date: Date.now()
						};
						socket.emit('newMessage', roomId, message);
						$('#message').empty();
						app.helpers.addMessage(message);
					}
					return false;
				}
			});
			
			// Кнопка отправки сообщения
			$(".chat-message button").on('click', function(e) {
			  var text = $('#message').html();
			  if(text !== '') {
				var message = { 
				  content: text, 
				  username: username,
				  date: Date.now()
				};
				socket.emit('newMessage', roomId, message);
				$('.emojionearea-editor').empty();
				$('#message').empty();
				app.helpers.addMessage(message);
			  }
			});
			
			// Если пользователь покидает комнату, убираем его из списка
			socket.on('removeUser', function(userId) {
				$('li#user-' + userId).remove();
				app.helpers.updateNumOfUsers();
			});
			// Добавляем новое сообщение
			socket.on('addMessage', function(message) {
				app.helpers.addMessage(message);				
			});
		});
	},
	helpers: {
		encodeHTML: function(str) {
			return $('<div />').text(str).html();
		},
		// Обновляем список комнат
		updateRoomsList: function(room) {
			room.title = this.encodeHTML(room.title);
			var html = `<a href="/chat/${room._id}"><li class="room-item">${room.title}</li></a>`;
			if(html === '') {
				return;
			}
			if($(".room-list ul li").length > 0) {
				$('.room-list ul').prepend(html);
			} else {
				$('.room-list ul').html('').html(html);
			}
			this.updateNumOfRooms();
		},
		// Обновляем список пользователей
		updateUsersList: function(users, clear) {
			if(users.constructor !== Array) {
				users = [users];
			}
			var html = '';
			for(var user of users) {
				user.username = this.encodeHTML(user.username);
				html += `<li class="clearfix" id="user-${user._id}">
                     <img src="${user.picture}" alt="${user.username}" />
                     <div class="about">
                        <div class="name">${user.username}</div>
                        <div class="status"><i class="fa fa-circle online"></i> в сети</div>
                     </div></li>`;
			}
			if(html === '') {
				return;
			}
			if(clear != null && clear == true) {
				$('.users-list ul').html('').html(html);
			} else {
				$('.users-list ul').prepend(html);
			}
			var newuser = `<li><div class="system-info"><i class="fa fa-info-circle" aria-hidden="true"></i> К нам присоединился <b>${user.username}</b></div></li>`;
			$(newuser).hide().appendTo('.chat-history ul').slideDown(200);
			this.updateNumOfUsers();
		},
		// Отправляет сообщение в чат
		addMessage: function(message) {
			message.date = (new Date(message.date)).toLocaleString();
			message.username = this.encodeHTML(message.username);
			message.content = message.content; // Позволяет HTML
			var html = `<li>
                    <div class="message-data">
                      <span class="message-data-name">${message.username}</span>
                      <span class="message-data-time">${message.date}</span>
                    </div>
                    <div class="message my-message" dir="auto">${message.content}</div>
                  </li>`;
			$(html).hide().appendTo('.chat-history ul').slideDown(200);			
			
			// Звуковое уведомление
			notify.currentTime = 0;
			notify.play();
			
			// Прокручиваем экран вниз
			$(".chat-history").animate({
				scrollTop: $('.chat-history')[0].scrollHeight
			}, 1000);
		},
		// Обновляем число комнат (метод вызывается ПОСЛЕ создания комнаты)
		updateNumOfRooms: function() {
			var num = $('.room-list ul li').length;
			$('.room-num-rooms').text(num + " комнат");
		},
		// Обновляем число пользователей онлайн (ПОСЛЕ входа или выхода)
		updateNumOfUsers: function() {
			var num = $('.users-list ul li').length;
			$('.chat-num-users').text(num + " в сети");
		}
	}
};