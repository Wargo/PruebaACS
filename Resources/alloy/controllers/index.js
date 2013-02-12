function Controller() {
    function loginCallback(user) {
        alert("Bienvenido " + user.username);
        $.buttons.animate({
            opacity: 1
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.index = A$(Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    }), "Window", null);
    $.addTopLevelView($.__views.index);
    $.__views.buttons = A$(Ti.UI.createView({
        top: 50,
        opacity: 0,
        layout: "vertical",
        id: "buttons"
    }), "View", $.__views.index);
    $.__views.index.add($.__views.buttons);
    $.__views.search = A$(Ti.UI.createButton({
        top: 20,
        left: 20,
        right: 20,
        id: "search"
    }), "Button", $.__views.buttons);
    $.__views.buttons.add($.__views.search);
    $.__views.random = A$(Ti.UI.createButton({
        top: 20,
        left: 20,
        right: 20,
        id: "random"
    }), "Button", $.__views.buttons);
    $.__views.buttons.add($.__views.random);
    $.__views.fb_friend = A$(Ti.UI.createButton({
        top: 20,
        left: 20,
        right: 20,
        id: "fb_friend"
    }), "Button", $.__views.buttons);
    $.__views.buttons.add($.__views.fb_friend);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    Login = require("login");
    Login(loginCallback);
    $.search.title = L("search_user");
    $.random.title = L("random_user");
    $.fb_friend.title = L("fb_user");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;