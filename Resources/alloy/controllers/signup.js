function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "signup";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.signup = Ti.UI.createWindow({
        navBarHidden: "true",
        backgroundColor: "#fff",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        layout: "vertical",
        id: "signup"
    });
    $.__views.signup && $.addTopLevelView($.__views.signup);
    $.__views.stateBar = Alloy.createController("includes/custom_state_bar", {
        id: "stateBar",
        back: "true",
        title: L("signup_title"),
        __parentSymbol: $.__views.signup
    });
    $.__views.stateBar.setParent($.__views.signup);
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
    $.__views.signup.add($.__views.activityIndicator);
    $.__views.__alloyId3 = Ti.UI.createScrollView({
        height: Titanium.UI.FILL,
        layout: "vertical",
        showVerticalScrollIndicator: "true",
        id: "__alloyId3"
    });
    $.__views.signup.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createLabel({
        width: "98%",
        color: "#555",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: Alloy.Globals.UI.FONT_REGULAR_SIZE_BODY
        },
        top: Alloy.Globals.UI.VIEW_REGULAR_MARGIN,
        text: L("signup_text"),
        id: "__alloyId4"
    });
    $.__views.__alloyId3.add($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createView({
        backgroundColor: "#ccc",
        height: 1,
        width: Titanium.UI.Fill,
        top: Alloy.Globals.UI.VIEW_REGULAR_MARGIN,
        id: "__alloyId5"
    });
    $.__views.__alloyId3.add($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createLabel({
        width: "98%",
        color: "#555",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: Alloy.Globals.UI.FONT_REGULAR_SIZE_BODY
        },
        top: "10",
        text: L("name"),
        id: "__alloyId6"
    });
    $.__views.__alloyId3.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createTextField({
        width: "98%",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "__alloyId7"
    });
    $.__views.__alloyId3.add($.__views.__alloyId7);
    $.__views.__alloyId8 = Ti.UI.createLabel({
        width: "98%",
        color: "#555",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: Alloy.Globals.UI.FONT_REGULAR_SIZE_BODY
        },
        top: Alloy.Globals.UI.VIEW_REGULAR_MARGIN,
        text: L("email"),
        id: "__alloyId8"
    });
    $.__views.__alloyId3.add($.__views.__alloyId8);
    $.__views.__alloyId9 = Ti.UI.createTextField({
        width: "98%",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "__alloyId9"
    });
    $.__views.__alloyId3.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createLabel({
        width: "98%",
        color: "#555",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: Alloy.Globals.UI.FONT_REGULAR_SIZE_BODY
        },
        top: Alloy.Globals.UI.VIEW_REGULAR_MARGIN,
        text: L("telephone"),
        id: "__alloyId10"
    });
    $.__views.__alloyId3.add($.__views.__alloyId10);
    $.__views.__alloyId11 = Ti.UI.createTextField({
        width: "98%",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "__alloyId11"
    });
    $.__views.__alloyId3.add($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createView({
        width: "98%",
        height: Titanium.UI.SIZE,
        layout: "horizontal",
        top: Alloy.Globals.UI.VIEW_REGULAR_MARGIN,
        id: "__alloyId12"
    });
    $.__views.__alloyId3.add($.__views.__alloyId12);
    $.__views.waSwitch = Ti.UI.createSwitch({
        style: Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
        id: "waSwitch",
        value: "false"
    });
    $.__views.__alloyId12.add($.__views.waSwitch);
    $.__views.__alloyId13 = Ti.UI.createLabel({
        color: "#555",
        left: Alloy.Globals.UI.VIEW_REGULAR_MARGIN,
        font: {
            fontSize: Alloy.Globals.UI.FONT_REGULAR_SIZE_BODY
        },
        text: L("use_wa"),
        id: "__alloyId13"
    });
    $.__views.__alloyId12.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createLabel({
        width: "98%",
        color: "#555",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: Alloy.Globals.UI.FONT_REGULAR_SIZE_BODY
        },
        top: Alloy.Globals.UI.VIEW_REGULAR_MARGIN,
        text: L("city"),
        id: "__alloyId14"
    });
    $.__views.__alloyId3.add($.__views.__alloyId14);
    $.__views.cityPicker = Ti.UI.createPicker({
        width: Titanium.UI.FILL,
        id: "cityPicker",
        top: "0",
        selectionIndicator: "true"
    });
    $.__views.__alloyId3.add($.__views.cityPicker);
    $.__views.column1 = Ti.UI.createPickerColumn({
        id: "column1"
    });
    $.__views.cityPicker.add($.__views.column1);
    $.__views.__alloyId16 = Ti.UI.createPickerRow({
        title: "Madrid",
        id: "__alloyId16"
    });
    $.__views.column1.addRow($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createPickerRow({
        title: "Malaga",
        id: "__alloyId17"
    });
    $.__views.column1.addRow($.__views.__alloyId17);
    $.__views.__alloyId18 = Ti.UI.createPickerRow({
        title: "Barcelona",
        id: "__alloyId18"
    });
    $.__views.column1.addRow($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createView({
        layout: "horizontal",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        id: "__alloyId19"
    });
    $.__views.__alloyId3.add($.__views.__alloyId19);
    $.__views.button1 = Alloy.createController("includes/custom_button", {
        id: "button1",
        isAccept: "true",
        text: "Aceptar",
        __parentSymbol: $.__views.__alloyId19
    });
    $.__views.button1.setParent($.__views.__alloyId19);
    $.__views.button2 = Alloy.createController("includes/custom_button", {
        id: "button2",
        isCancel: "true",
        text: "Cancelar",
        __parentSymbol: $.__views.__alloyId19
    });
    $.__views.button2.setParent($.__views.__alloyId19);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.toogleActivityIndicator($.activityIndicator, Ti.App.Properties.getString("AIhideCode"));
    $.stateBar.barLeftButton.addEventListener("click", function() {
        Alloy.Globals.backToPreviousWindow();
        $.signup.close();
    });
    $.signup.addEventListener("android:back", function() {
        Alloy.Globals.backToPreviousWindow();
        $.signup.close();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;