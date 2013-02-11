$.index.open();

Login = require('login');
Login(loginCallback);

$.search.title = L('search_user');
$.random.title = L('random_user');
$.fb_friend.title = L('fb_user');

function loginCallback() {
	/*
	Cloud.Users.showMe(function (e) {
		if (e.success) {
			var user = e.users[0];
			alert('Bienvenido ' + user.username);
		} else {
			
		}
	});
	*/
	$.buttons.animate({opacity:1});
	
}