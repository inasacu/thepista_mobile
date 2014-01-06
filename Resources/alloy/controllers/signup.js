function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "signup";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.signup = Ti.UI.createWindow({
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
            fontSize: 15
        },
        id: "activityIndicator",
        message: L("loading")
    });
    $.__views.signup.add($.__views.activityIndicator);
    $.__views.__alloyId28 = Ti.UI.createScrollView({
        height: Titanium.UI.FILL,
        layout: "vertical",
        showVerticalScrollIndicator: "true",
        id: "__alloyId28"
    });
    $.__views.signup.add($.__views.__alloyId28);
    $.__views.__alloyId29 = Ti.UI.createLabel({
        width: "98%",
        color: "#555",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: Alloy.Globals.UI.FONT_REGULAR_SIZE_BODY
        },
        top: Alloy.Globals.UI.VIEW_REGULAR_MARGIN,
        text: L("signup_text"),
        id: "__alloyId29"
    });
    $.__views.__alloyId28.add($.__views.__alloyId29);
    $.__views.__alloyId30 = Ti.UI.createView({
        backgroundColor: "#ccc",
        height: 1,
        width: Titanium.UI.Fill,
        top: Alloy.Globals.UI.VIEW_REGULAR_MARGIN,
        id: "__alloyId30"
    });
    $.__views.__alloyId28.add($.__views.__alloyId30);
    $.__views.__alloyId31 = Ti.UI.createLabel({
        width: "98%",
        color: "#555",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: Alloy.Globals.UI.FONT_REGULAR_SIZE_BODY
        },
        top: "10",
        text: L("name"),
        id: "__alloyId31"
    });
    $.__views.__alloyId28.add($.__views.__alloyId31);
    $.__views.__alloyId32 = Ti.UI.createTextField({
        width: "98%",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "__alloyId32"
    });
    $.__views.__alloyId28.add($.__views.__alloyId32);
    $.__views.__alloyId33 = Ti.UI.createLabel({
        width: "98%",
        color: "#555",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: Alloy.Globals.UI.FONT_REGULAR_SIZE_BODY
        },
        top: Alloy.Globals.UI.VIEW_REGULAR_MARGIN,
        text: L("email"),
        id: "__alloyId33"
    });
    $.__views.__alloyId28.add($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createTextField({
        width: "98%",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "__alloyId34"
    });
    $.__views.__alloyId28.add($.__views.__alloyId34);
    $.__views.__alloyId35 = Ti.UI.createLabel({
        width: "98%",
        color: "#555",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: Alloy.Globals.UI.FONT_REGULAR_SIZE_BODY
        },
        top: Alloy.Globals.UI.VIEW_REGULAR_MARGIN,
        text: L("telephone"),
        id: "__alloyId35"
    });
    $.__views.__alloyId28.add($.__views.__alloyId35);
    $.__views.__alloyId36 = Ti.UI.createTextField({
        width: "98%",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "__alloyId36"
    });
    $.__views.__alloyId28.add($.__views.__alloyId36);
    $.__views.__alloyId37 = Ti.UI.createView({
        width: "98%",
        height: Titanium.UI.SIZE,
        layout: "horizontal",
        top: Alloy.Globals.UI.VIEW_REGULAR_MARGIN,
        id: "__alloyId37"
    });
    $.__views.__alloyId28.add($.__views.__alloyId37);
    $.__views.waSwitch = Ti.UI.createSwitch({
        id: "waSwitch",
        value: "false"
    });
    $.__views.__alloyId37.add($.__views.waSwitch);
    $.__views.__alloyId38 = Ti.UI.createLabel({
        color: "#555",
        left: Alloy.Globals.UI.VIEW_REGULAR_MARGIN,
        font: {
            fontSize: Alloy.Globals.UI.FONT_REGULAR_SIZE_BODY
        },
        text: L("use_wa"),
        id: "__alloyId38"
    });
    $.__views.__alloyId37.add($.__views.__alloyId38);
    $.__views.__alloyId39 = Ti.UI.createLabel({
        width: "98%",
        color: "#555",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: Alloy.Globals.UI.FONT_REGULAR_SIZE_BODY
        },
        top: Alloy.Globals.UI.VIEW_REGULAR_MARGIN,
        text: L("city"),
        id: "__alloyId39"
    });
    $.__views.__alloyId28.add($.__views.__alloyId39);
    $.__views.cityPicker = Ti.UI.createPicker({
        width: Titanium.UI.FILL,
        id: "cityPicker",
        top: "0",
        selectionIndicator: "true"
    });
    $.__views.__alloyId28.add($.__views.cityPicker);
    $.__views.column1 = Ti.UI.createPickerColumn({
        id: "column1"
    });
    $.__views.cityPicker.add($.__views.column1);
    $.__views.__alloyId41 = Ti.UI.createPickerRow({
        title: "Madrid",
        id: "__alloyId41"
    });
    $.__views.column1.addRow($.__views.__alloyId41);
    $.__views.__alloyId42 = Ti.UI.createPickerRow({
        title: "Malaga",
        id: "__alloyId42"
    });
    $.__views.column1.addRow($.__views.__alloyId42);
    $.__views.__alloyId43 = Ti.UI.createPickerRow({
        title: "Barcelona",
        id: "__alloyId43"
    });
    $.__views.column1.addRow($.__views.__alloyId43);
    $.__views.__alloyId44 = Ti.UI.createView({
        layout: "horizontal",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        id: "__alloyId44"
    });
    $.__views.__alloyId28.add($.__views.__alloyId44);
    $.__views.button1 = Alloy.createController("includes/custom_button", {
        id: "button1",
        isAccept: "true",
        text: "Aceptar",
        __parentSymbol: $.__views.__alloyId44
    });
    $.__views.button1.setParent($.__views.__alloyId44);
    $.__views.button2 = Alloy.createController("includes/custom_button", {
        id: "button2",
        isCancel: "true",
        text: "Cancelar",
        __parentSymbol: $.__views.__alloyId44
    });
    $.__views.button2.setParent($.__views.__alloyId44);
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