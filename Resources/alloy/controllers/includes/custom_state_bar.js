function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "includes/custom_state_bar";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.statusBar = Ti.UI.createView({
        backgroundColor: "#5da423",
        height: 25,
        id: "statusBar",
        layout: "composite"
    });
    $.__views.statusBar && $.addTopLevelView($.__views.statusBar);
    $.__views.barLeftButton = Ti.UI.createView({
        background: "#5da423",
        color: "#fff",
        layout: "composite",
        left: 0,
        width: 27,
        id: "barLeftButton"
    });
    $.__views.statusBar.add($.__views.barLeftButton);
    $.__views.__alloyId1 = Ti.UI.createImageView({
        background: "#5da423",
        image: "/images/back_arrow.png",
        color: "#fff",
        left: 2,
        width: 5,
        id: "__alloyId1"
    });
    $.__views.barLeftButton.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createImageView({
        background: "#5da423",
        image: "/images/haypista_symbol.png",
        color: "#fff",
        left: 10,
        width: 10,
        id: "__alloyId2"
    });
    $.__views.barLeftButton.add($.__views.__alloyId2);
    $.__views.barTitle = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: 15
        },
        id: "barTitle"
    });
    $.__views.statusBar.add($.__views.barTitle);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.barTitle.text = args.title || "Title";
    $.barLeftButton.addEventListener("touchstart", function() {
        this.backgroundColor = "#ff9900";
    });
    $.barLeftButton.addEventListener("touchend", function() {
        this.backgroundColor = "#5da423";
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;