$.index.open();

Login = require('login');
Login(loginCallback);

$.search.title = L('search_user');
$.random.title = L('random_user');
$.fb_friend.title = L('fb_user');

var Cloud = require('ti.cloud');

function loginCallback(user) {
	
	alert('Bienvenido ' + user.username);
	
	$.buttons.animate({opacity:1});
	
}

Ti.Facebook.appid = Alloy.CFG.fb_app_id;

var fb_button = Ti.Facebook.createLoginButton();

$.fb_friend.on('click', function() {
	
	Cloud.SocialIntegrations.searchFacebookFriends(function(e) {
		
		if (e.success) {
			
			for (var i in e.users) {
				
				var img = Ti.UI.createImageView({
					image:'http://graph.facebook.com/' + e.users[i].external_accounts[0].external_id + '/picture',
					width:50,
					heigth:50
				});
				$.index.add(img);
				
			}
			
		} else {
			
			$.index.add(fb_button);
			
			Ti.Facebook.addEventListener('login', function(e) {
			    if (e.success) {
			    	$.index.remove(fb_button);
			    	
			    	Cloud.SocialIntegrations.externalAccountLink({
			    		type:'facebook',
			    		token:Ti.Facebook.accessToken
			    	}, function(e2) {
			    		if (e2.success) {
			    			var user = e2.users[0];
			    			Ti.API.info('ok')
			    		} else {
			    			alert(e2)
			    		}
			    	});
			    }
			});
			
		}
	});
	
});
