function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.login = A$(Ti.UI.createWindow({
        backgroundColor: "#CCC",
        top: 20,
        right: 20,
        left: 20,
        bottom: 20,
        opacity: 0,
        id: "login"
    }), "Window", null);
    $.addTopLevelView($.__views.login);
    $.__views.textField = A$(Ti.UI.createTextField({
        top: 50,
        backgroundColor: "#FFF",
        left: 20,
        right: 20,
        height: 30,
        borderColor: "#CCC",
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        autoCapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        id: "textField"
    }), "TextField", $.__views.login);
    $.__views.login.add($.__views.textField);
    $.__views.button = A$(Ti.UI.createButton({
        top: 90,
        id: "button"
    }), "Button", $.__views.login);
    $.__views.login.add($.__views.button);
    $.__views.text = A$(Ti.UI.createLabel({
        top: 150,
        id: "text"
    }), "Label", $.__views.login);
    $.__views.login.add($.__views.text);
    $.__views.fb = A$(Ti.Facebook.createLoginButton({
        top: 180,
        style: Ti.Facebook.BUTTON_STYLE_WIDE,
        id: "fb",
        ns: Ti.Facebook
    }), "LoginButton", $.__views.login);
    $.__views.login.add($.__views.fb);
    $.__views.loading = A$(Ti.UI.createActivityIndicator({
        top: 180,
        style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
        id: "loading"
    }), "ActivityIndicator", $.__views.login);
    $.__views.login.add($.__views.loading);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || null, Cloud = require("ti.cloud"), via_fb = !1;
    $.button.title = L("login");
    $.textField.hintText = L("username");
    $.text.text = L("or");
    $.textField.on("change", function(e) {
        $.textField.value = $.textField.value.toLowerCase();
    });
    Ti.Facebook.appid = "422906664458373";
    $.fb.on("singletap", function() {
        $.fb.hide();
        $.loading.show();
    });
    Ti.Facebook.addEventListener("login", function(e) {
        $.loading.hide();
        if (e.success) {
            via_fb = !0;
            $.textField.value = e.data.username;
        } else e.error || !e.cancelled;
    });
    $.button.on("click", function() {
        if (!$.textField.value) return;
        Cloud.Users.query({
            where: {
                username: $.textField.value
            }
        }, function(e) {
            if (e.success) if (e.users.length > 0) alert("ya existe"); else if (via_fb) Cloud.SocialIntegrations.externalAccountLogin({
                type: "facebook",
                token: Ti.Facebook.accessToken
            }, function(e2) {
                var user = e2.users[0];
                e2.success ? Cloud.Users.update({
                    username: $.textField.value
                }, function(e3) {
                    if (e3.success) {
                        $.login.close({
                            opacity: 0
                        });
                        args.f_callback($.textField.value, !0);
                    } else alert(e3);
                }) : alert(e2);
            }); else {
                args.f_callback($.textField.value, !1);
                $.login.close({
                    opacity: 0
                });
            } else alert("error en la búsqueda");
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;