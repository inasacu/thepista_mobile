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
        layout: "vertical",
        id: "provider_auth"
    });
    $.__views.provider_auth && $.addTopLevelView($.__views.provider_auth);
    $.__views.stateBar = Alloy.createController("includes/custom_state_bar", {
        id: "stateBar",
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
    Alloy.Globals.cleanCookiesHaypistaWeb();
    var firstLoad = true;
    var args = arguments[0] || {};
    $.providerWebView.url = getProviderUrl(args.providerIndex);
    $.providerWebView.addEventListener("beforeload", function() {
        $.activityIndicator.show();
        $.activityIndicator.height = "auto";
    });
    $.providerWebView.addEventListener("load", function() {
        $.activityIndicator.hide();
        $.activityIndicator.height = 0;
        if (firstLoad) firstLoad = false; else {
            var cookies = $.providerWebView.evalJS("document.cookie").split(";");
            var cookiesObj = {};
            for (i = 0; cookies.length - 1 >= i; i++) {
                cookieArray = cookies[i].split("=");
                cookieKey = Alloy.Globals.removeWhiteSpace(cookieArray[0]);
                cookieValue = Alloy.Globals.removeWhiteSpace(cookieArray[1]);
                Ti.API.info("Cookie: " + cookieKey + " " + cookieValue);
                switch (cookieKey) {
                  case Ti.App.Properties.getString("mobile_valid_property"):
                    cookiesObj.mobile_valid = cookieValue;
                    break;

                  case Ti.App.Properties.getString("user_data_property"):
                    cookiesObj.user_data = cookieValue;
                }
            }
            if ("true" === cookiesObj.mobile_valid) Ti.API.info("User: " + cookiesObj.user_data); else if ("false" === cookiesObj.mobile_valid) {
                Ti.API.info("User permission not granted");
                $.provider_auth.close();
                Alloy.createController("index").getView().open();
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