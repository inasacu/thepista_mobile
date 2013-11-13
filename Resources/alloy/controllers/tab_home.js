function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tab_home";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.tab_home = Ti.UI.createWindow({
        navBarHidden: "true",
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
    var __alloyId20 = [];
    $.__views.__alloyId21 = Alloy.createController("resume_home", {
        id: "__alloyId21"
    });
    __alloyId20.push($.__views.__alloyId21.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId22 = Alloy.createController("events_home", {
        id: "__alloyId22"
    });
    __alloyId20.push($.__views.__alloyId22.getViewEx({
        recurse: true
    }));
    $.__views.scrollableView = Ti.UI.createScrollableView({
        top: 0,
        height: Titanium.UI.SIZE,
        views: __alloyId20,
        id: "scrollableView",
        showPagingControl: "false"
    });
    $.__views.vista.add($.__views.scrollableView);
    $.__views.tabIndicator = Ti.UI.createView({
        backgroundColor: "#000",
        bottom: 0,
        height: 100,
        id: "tabIndicator",
        layout: "horizontal"
    });
    $.__views.vista.add($.__views.tabIndicator);
    $.__views.tab1 = Ti.UI.createView({
        borderColor: "#ccc",
        borderWidth: "1",
        width: "50%",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "tab1"
    });
    $.__views.tabIndicator.add($.__views.tab1);
    $.__views.__alloyId23 = Ti.UI.createLabel({
        color: "#fff",
        text: "Tab 1",
        id: "__alloyId23"
    });
    $.__views.tab1.add($.__views.__alloyId23);
    $.__views.tab2 = Ti.UI.createView({
        borderColor: "#ccc",
        borderWidth: "1",
        width: "50%",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "tab2"
    });
    $.__views.tabIndicator.add($.__views.tab2);
    $.__views.__alloyId24 = Ti.UI.createLabel({
        color: "#fff",
        text: "Tab 2",
        id: "__alloyId24"
    });
    $.__views.tab2.add($.__views.__alloyId24);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var viewNumber = -1;
    $.scrollableView.addEventListener("pageChanged", function() {
        var tabOptions = $.tabIndicator.getChildren();
        for (var i = 0; tabOptions.length > i; i++) {
            tabOptionView = tabOptions[i];
            tabOptionView.backgroundColor = "#000";
            tabOptionView.color = "#000";
        }
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
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;