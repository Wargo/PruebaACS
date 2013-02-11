module.exports = function(f_callback) {
    var pass = "123123", Cloud = require("ti.cloud");
    Ti.App.Properties.removeProperty("username");
    Ti.Facebook.logout();
    if (Ti.App.Properties.getString("username", null)) Cloud.Users.login({
        login: Ti.App.Properties.getString("username", null),
        password: pass
    }, function(e) {
        if (e.success) {
            var user = e.users[0];
            f_callback(user);
        } else alert("error login: " + (e.error && e.message || JSON.stringify(e)));
    }); else {
        var loginWindow = Alloy.createController("login", {
            f_callback: register
        }).getView();
        loginWindow.open({
            opacity: 1
        });
        function register(username, fb) {
            if (fb) {
                f_callback();
                return;
            }
            Cloud.Users.create({
                username: username,
                password: pass,
                password_confirmation: pass
            }, function(e) {
                e.success ? Cloud.Users.login({
                    login: username,
                    password: pass
                }, function(ev) {
                    if (ev.success) {
                        var user = ev.users[0];
                        Ti.App.Properties.setString("username", username);
                        f_callback();
                    } else alert("error login: " + (ev.error && ev.message || JSON.stringify(ev)));
                }) : alert("error creando usuario: " + (e.error && e.message || JSON.stringify(e)));
            });
        }
    }
};