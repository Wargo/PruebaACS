var args = arguments[0] || null;

var Cloud = require('ti.cloud');

var via_fb = false;

$.button.title = L('login');
$.textField.hintText = L('username');
$.text.text = L('or');

$.textField.on('change', function(e) {
	$.textField.value = $.textField.value.toLowerCase();
});

Ti.Facebook.appid = '422906664458373';

$.fb.on('singletap', function() {
	$.fb.hide();
	$.loading.show();
});

Ti.Facebook.addEventListener('login', function(e) {

	$.loading.hide();
	
    if (e.success) {
    	via_fb = true;
    	$.textField.value = e.data.username;
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
            	
            	if (via_fb) {
            		Cloud.SocialIntegrations.externalAccountLogin({
			    		type:'facebook',
			    		token:Ti.Facebook.accessToken
			    	}, function(e2) {
			    		var user = e2.users[0];
			    		if (e2.success) {
			    			Cloud.Users.update({
			    				username:$.textField.value
			    			}, function(e3) {
			    				if (e3.success) {
			    					$.login.close({opacity:0});
			    					args.f_callback(e3.users[0], true);
			    				} else {
			    					alert(e3);
			    				}
			    			});
			    		} else {
			    			alert(e2)
			    		}
    				});
    			} else {
    				args.f_callback($.textField.value, false);
    				$.login.close({opacity:0});
    			}
                
            }
        } else {
            alert('error en la búsqueda')
        }
    });
   
});