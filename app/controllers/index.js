$.index.open();

function loginCallback(user) {
	alert(user);  
}

Login = require('login');
Login(loginCallback);

