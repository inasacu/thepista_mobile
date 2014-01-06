function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "events/event_detail";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.event_detail_win = Ti.UI.createWindow({
        backgroundColor: "#fff",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        id: "event_detail_win",
        layout: "vertical"
    });
    $.__views.event_detail_win && $.addTopLevelView($.__views.event_detail_win);
    $.__views.stateBar = Alloy.createController("includes/custom_state_bar", {
        id: "stateBar",
        back: "true",
        title: "Detalle Evento",
        __parentSymbol: $.__views.event_detail_win
    });
    $.__views.stateBar.setParent($.__views.event_detail_win);
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
    $.__views.event_detail_win.add($.__views.activityIndicator);
    $.__views.__alloyId52 = Ti.UI.createLabel({
        text: "Detalle de un evento",
        id: "__alloyId52"
    });
    $.__views.event_detail_win.add($.__views.__alloyId52);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.stateBar.barLeftButton.addEventListener("click", function() {
        $.event_detail_win.close();
    });
    $.event_detail_win.addEventListener("android:back", function() {
        $.event_detail_win.close();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;