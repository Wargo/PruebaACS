var args = arguments[0] || null;

var Cloud = require('ti.cloud');

$.button.title = L('login');
$.textField.hintText = L('username');
$.text.text = L('or');

Ti.Facebook.appid = '422906664458373';

$.fb.on('singletap', function() {
	$.fb.hide();
	$.loading.show();
})

Ti.Facebook.addEventListener('login', function(e) {

	$.loading.hide();
	
    if (e.success) {
    	Cloud.SocialIntegrations.externalAccountLogin({
    		type:'facebook',
    		token:Ti.Facebook.accessToken
    	}, function(e) {
    		if (e.success) {
    			// TODO get username and save it
    		} else {
    			
    		}
    		alert(e)
    	});
    	
    	$.login.close({opacity:0});
    	
    } else if (e.error) {
    	
    	// TODO show error
    	
    } else if (e.cancelled) {
    	// TODO ... nada?
    }
});

$.button.on('click', function() {
	
	if (!$.textField.value) {
		return;
	}
   
    Cloud.Users.query({
        where: {
            username: $.textField.value
        }
    }, function (e) {
        if (e.success) {
            if (e.users.length > 0) {
                alert('ya existe')
            } else {
                args.f_callback($.textField.value);
                $.login.close({opacity:0});
            }
        } else {
            alert('error en la búsqueda')
        }
    });
   
});