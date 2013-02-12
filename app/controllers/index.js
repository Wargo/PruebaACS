$.index.open();

Login = require('login');
Login(loginCallback);

$.search.title = L('search_user');
$.random.title = L('random_user');
$.fb_friend.title = L('fb_user');

function loginCallback(user) {
	
	alert('Bienvenido ' + user.username);
	$.buttons.animate({opacity:1});
	
}