function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "events_home";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.events_home_win = Ti.UI.createWindow({
        height: Titanium.UI.FILL,
        id: "events_home_win",
        layout: "vertical"
    });
    $.__views.events_home_win && $.addTopLevelView($.__views.events_home_win);
    $.__views.stateBar = Alloy.createController("includes/custom_state_bar", {
        id: "stateBar",
        back: "false",
        title: L("events_title"),
        __parentSymbol: $.__views.events_home_win
    });
    $.__views.stateBar.setParent($.__views.events_home_win);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        color: "#5da423",
        top: 0,
        height: "auto",
        width: "auto",
        font: {
            fontSize: 15
        },
        id: "activityIndicator",
        message: L("loading")
    });
    $.__views.events_home_win.add($.__views.activityIndicator);
    $.__views.__alloyId0 = Ti.UI.createView({
        layout: "horizontal",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        id: "__alloyId0"
    });
    $.__views.events_home_win.add($.__views.__alloyId0);
    $.__views.button1 = Alloy.createController("includes/custom_button", {
        id: "button1",
        isAccept: "true",
        text: "Ir a evento",
        __parentSymbol: $.__views.__alloyId0
    });
    $.__views.button1.setParent($.__views.__alloyId0);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.button1.buttonView.addEventListener("click", function() {
        Alloy.Globals.openWindow($.events_home_win, "events/event_detail");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;