function Controller() {
    function getProviderUrl(providerIndex) {
        providerUrl = Ti.App.Properties.getString("webappURL") + Ti.App.Properties.getString("webappOAuthSuffix").replace(":oauth_provider", providerIndex);
        return providerUrl;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "provider_auth";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.provider_auth = Ti.UI.createWindow({
        backgroundColor: "#fff",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        layout: "vertical",
        id: "provider_auth"
    });
    $.__views.provider_auth && $.addTopLevelView($.__views.provider_auth);
    $.__views.stateBar = Alloy.createController("includes/custom_state_bar", {
        id: "stateBar",
        back: "true",
        title: L("login_title"),
        __parentSymbol: $.__views.provider_auth
    });
    $.__views.stateBar.setParent($.__views.provider_auth);
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
    $.__views.provider_auth.add($.__views.activityIndicator);
    $.__views.providerWebView = Ti.UI.createWebView({
        id: "providerWebView"
    });
    $.__views.provider_auth.add($.__views.providerWebView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var alloyString = require("alloy/string");
    Alloy.Globals.cleanCookiesHaypistaWeb();
    var firstLoad = true;
    var args = arguments[0] || {};
    $.providerWebView.url = getProviderUrl(args.providerIndex);
    $.providerWebView.addEventListener("beforeload", function() {
        Alloy.Globals.toogleActivityIndicator($.activityIndicator, Ti.App.Properties.getString("AIshowCode"));
    });
    $.providerWebView.addEventListener("load", function() {
        Alloy.Globals.toogleActivityIndicator($.activityIndicator, Ti.App.Properties.getString("AIhideCode"));
        if (firstLoad) firstLoad = false; else {
            cookiesString = $.providerWebView.evalJS("document.cookie");
            if ("" != cookiesString) {
                var cookies = cookiesString.split(";");
                var cookiesObj = {};
                for (i = 0; cookies.length - 1 >= i; i++) {
                    cookieArray = cookies[i].split("=");
                    cookieKey = Alloy.Globals.removeWhiteSpace(cookieArray[0]);
                    cookieValue = alloyString.urlDecode(Alloy.Globals.removeWhiteSpace(cookieArray[1]));
                    Ti.API.info("Cookie: " + cookieKey + " " + cookieValue);
                    switch (cookieKey) {
                      case Ti.App.Properties.getString("mobile_valid_property"):
                        cookiesObj.mobileValid = cookieValue;
                        break;

                      case Ti.App.Properties.getString("user_data_property"):
                        cookiesObj.userData = cookieValue;
                    }
                }
                if ("true" === cookiesObj.mobileValid) {
                    userData = JSON.parse(cookiesObj.userData);
                    var currentUser = Alloy.Models.instance("user");
                    currentUser.setFromJson(userData.mobile_token);
                    var tab_home_window = Alloy.createController("tab_home").getView();
                    tab_home_window.open();
                    $.provider_auth.close();
                } else if ("false" === cookiesObj.mobile_valid) {
                    Ti.API.info("User permission not granted");
                    $.provider_auth.close();
                    Alloy.createController("index").getView().open();
                }
            }
        }
    });
    $.stateBar.barLeftButton.addEventListener("click", function() {
        Alloy.Globals.backToPreviousWindow();
        $.provider_auth.close();
    });
    $.provider_auth.addEventListener("android:back", function() {
        Alloy.Globals.backToPreviousWindow();
        $.provider_auth.close();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;