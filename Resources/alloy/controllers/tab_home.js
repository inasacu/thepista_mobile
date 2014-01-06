function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tab_home";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.tab_home = Ti.UI.createWindow({
        backgroundColor: "#fff",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        layout: "vertical",
        id: "tab_home"
    });
    $.__views.tab_home && $.addTopLevelView($.__views.tab_home);
    $.__views.vista = Ti.UI.createView({
        height: Titanium.UI.Fill,
        id: "vista"
    });
    $.__views.tab_home.add($.__views.vista);
    var __alloyId45 = [];
    $.__views.__alloyId46 = Alloy.createController("resume_home", {
        id: "__alloyId46"
    });
    __alloyId45.push($.__views.__alloyId46.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId47 = Alloy.createController("events_home", {
        id: "__alloyId47"
    });
    __alloyId45.push($.__views.__alloyId47.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId48 = Alloy.createController("groups_home", {
        id: "__alloyId48"
    });
    __alloyId45.push($.__views.__alloyId48.getViewEx({
        recurse: true
    }));
    $.__views.scrollableView = Ti.UI.createScrollableView({
        top: 0,
        height: Titanium.UI.SIZE,
        views: __alloyId45,
        id: "scrollableView",
        showPagingControl: "false"
    });
    $.__views.vista.add($.__views.scrollableView);
    $.__views.tabIndicator = Ti.UI.createView({
        backgroundColor: "#000",
        bottom: 0,
        height: 40,
        id: "tabIndicator",
        layout: "horizontal",
        horizontalWrap: "false"
    });
    $.__views.vista.add($.__views.tabIndicator);
    $.__views.tab1 = Ti.UI.createView({
        width: "33%",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "tab1"
    });
    $.__views.tabIndicator.add($.__views.tab1);
    $.__views.__alloyId49 = Ti.UI.createLabel({
        color: "#fff",
        text: "Inicio",
        id: "__alloyId49"
    });
    $.__views.tab1.add($.__views.__alloyId49);
    $.__views.tab2 = Ti.UI.createView({
        width: "33%",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "tab2"
    });
    $.__views.tabIndicator.add($.__views.tab2);
    $.__views.__alloyId50 = Ti.UI.createLabel({
        color: "#fff",
        text: "Eventos",
        id: "__alloyId50"
    });
    $.__views.tab2.add($.__views.__alloyId50);
    $.__views.tab3 = Ti.UI.createView({
        width: "33%",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "tab3"
    });
    $.__views.tabIndicator.add($.__views.tab3);
    $.__views.__alloyId51 = Ti.UI.createLabel({
        color: "#fff",
        text: "Grupos",
        id: "__alloyId51"
    });
    $.__views.tab3.add($.__views.__alloyId51);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var viewNumber = -1;
    Alloy.Globals.parentWindow = $.tab_home;
    $.scrollableView.addEventListener("pageChanged", function() {
        var tabOptions = $.tabIndicator.getChildren();
        _.each(tabOptions, function(tabOptionView) {
            tabOptionView.backgroundColor = "#000";
            tabOptionView.color = "#000";
        });
        tabOptions[this.currentPage].backgroundColor = "#5da423";
    });
    $.scrollableView.addEventListener("checkCurrentPage", function() {
        if (viewNumber != this.currentPage) {
            viewNumber = this.currentPage;
            this.fireEvent("pageChanged");
        }
    });
    $.scrollableView.addEventListener("scroll", function() {
        this.fireEvent("checkCurrentPage");
    });
    $.scrollableView.fireEvent("checkCurrentPage");
    _.each($.tabIndicator.getChildren(), function(tabIndexView, index) {
        tabIndexView.addEventListener("click", function() {
            $.scrollableView.scrollToView(index);
        });
    });
    $.tab_home.addEventListener("close", function() {
        $.destroy();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;