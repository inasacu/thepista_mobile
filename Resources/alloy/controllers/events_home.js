function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "events_home";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.events_home = Ti.UI.createWindow({
        navBarHidden: "true",
        height: Titanium.UI.FILL,
        layout: "vertical",
        id: "events_home"
    });
    $.__views.events_home && $.addTopLevelView($.__views.events_home);
    $.__views.stateBar = Alloy.createController("includes/custom_state_bar", {
        id: "stateBar",
        back: "false",
        title: L("events_title"),
        __parentSymbol: $.__views.events_home
    });
    $.__views.stateBar.setParent($.__views.events_home);
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
    $.__views.events_home.add($.__views.activityIndicator);
    $.__views.__alloyId0 = Ti.UI.createLabel({
        text: "HOla eventos",
        id: "__alloyId0"
    });
    $.__views.events_home.add($.__views.__alloyId0);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;