function Controller() {
    function defaultHeight() {
        return 40;
    }
    function defaultWidth() {
        return 80;
    }
    function setColor(stateCode) {
        var notClickedColor;
        var clickedColor;
        if ("true" === args.isAccept) {
            notClickedColor = "#5da423";
            clickedColor = "#457a1a";
        } else if ("true" === args.isCancel) {
            notClickedColor = "#ccc";
            clickedColor = "#666";
        } else {
            notClickedColor = "#5da423";
            clickedColor = "#457a1a";
        }
        0 == stateCode ? $.buttonInnerView.backgroundColor = notClickedColor : 1 == stateCode ? $.buttonInnerView.backgroundColor = clickedColor : 2 == stateCode && ($.buttonInnerView.backgroundColor = notClickedColor);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "includes/custom_button";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.buttonView = Ti.UI.createView({
        borderRadius: 5,
        height: 40,
        width: 80,
        id: "buttonView"
    });
    $.__views.buttonView && $.addTopLevelView($.__views.buttonView);
    $.__views.buttonInnerView = Ti.UI.createView({
        borderRadius: 5,
        height: "92%",
        width: "95%",
        left: 0,
        top: 0,
        backgroundColor: "#5da423",
        zIndex: 2,
        id: "buttonInnerView"
    });
    $.__views.buttonView.add($.__views.buttonInnerView);
    $.__views.buttonViewLabel = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: Alloy.Globals.UI.FONT_REGULAR_SIZE_BODY
        },
        id: "buttonViewLabel"
    });
    $.__views.buttonInnerView.add($.__views.buttonViewLabel);
    $.__views.buttonShadowView = Ti.UI.createView({
        borderRadius: 5,
        height: "92%",
        width: "95%",
        left: 2,
        top: 2,
        backgroundColor: "#000",
        opacity: "0.7",
        zIndex: 1,
        id: "buttonShadowView"
    });
    $.__views.buttonView.add($.__views.buttonShadowView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.buttonView.height = args.height || defaultHeight();
    $.buttonView.width = args.width || defaultWidth();
    $.buttonViewLabel.text = args.text || "title";
    setColor(0);
    $.buttonView.addEventListener("touchstart", function() {
        setColor(1);
    });
    $.buttonView.addEventListener("touchend", function() {
        setColor(2);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;