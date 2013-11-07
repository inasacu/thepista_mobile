function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        navBarHidden: "true",
        backgroundColor: "#5da423",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.__alloyId1 = Ti.UI.createScrollView({
        height: Titanium.UI.FILL,
        layout: "vertical",
        showVerticalScrollIndicator: "true",
        id: "__alloyId1"
    });
    $.__views.index.add($.__views.__alloyId1);
    $.__views.hayPistaLogoAuth = Ti.UI.createImageView({
        image: "/images/haypista_logo.png",
        top: 150,
        id: "hayPistaLogoAuth"
    });
    $.__views.__alloyId1.add($.__views.hayPistaLogoAuth);
    $.__views.loginChoose = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: "20dp"
        },
        top: 30,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "loginChoose",
        text: L("login_choose")
    });
    $.__views.__alloyId1.add($.__views.loginChoose);
    $.__views.providersView = Ti.UI.createView({
        width: 210,
        height: Titanium.UI.SIZE,
        id: "providersView",
        layout: "vertical"
    });
    $.__views.__alloyId1.add($.__views.providersView);
    $.__views.facebookLogin = Ti.UI.createButton({
        width: 240,
        height: 100,
        top: 30,
        id: "facebookLogin",
        title: "Facebook"
    });
    $.__views.providersView.add($.__views.facebookLogin);
    $.__views.googleLogin = Ti.UI.createButton({
        width: 240,
        height: 100,
        top: 30,
        id: "googleLogin",
        title: "Google"
    });
    $.__views.providersView.add($.__views.googleLogin);
    $.__views.outlookLogin = Ti.UI.createButton({
        width: 240,
        height: 100,
        top: 30,
        id: "outlookLogin",
        title: "Microsoft"
    });
    $.__views.providersView.add($.__views.outlookLogin);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var tabs_home_window = Alloy.createController("tab_home").getView();
    tabs_home_window.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;