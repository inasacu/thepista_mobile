function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "resume_home";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.resume_home = Ti.UI.createWindow({
        navBarHidden: "true",
        height: Titanium.UI.FILL,
        layout: "vertical",
        id: "resume_home"
    });
    $.__views.resume_home && $.addTopLevelView($.__views.resume_home);
    $.__views.stateBar = Alloy.createController("includes/custom_state_bar", {
        id: "stateBar",
        back: "false",
        title: L("home_title"),
        __parentSymbol: $.__views.resume_home
    });
    $.__views.stateBar.setParent($.__views.resume_home);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        color: "#5da423",
        top: 0,
        height: "auto",
        width: "auto",
        font: {
            fontSize: "20dp"
        },
        id: "activityIndicator",
        message: L("loading")
    });
    $.__views.resume_home.add($.__views.activityIndicator);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        text: "Hola resumen",
        id: "__alloyId2"
    });
    $.__views.resume_home.add($.__views.__alloyId2);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;