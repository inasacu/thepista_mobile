function L(text) {
    if (void 0 === Ti.App.languageXML || null === Ti.App.languageXML) {
        var langFile = Ti.App.Properties.getString("SETTING_LANGUAGE");
        var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "i18n/" + langFile + "/strings.xml");
        if (!file.exists()) {
            var langFile = "en";
            file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "i18n/" + langFile + "/strings.xml");
        }
        var xmltext = file.read().text;
        var xmldata = Titanium.XML.parseString(xmltext);
        Ti.App.languageXML = xmldata;
    }
    var xpath = "/resources/string[@name='" + text + "']/text()";
    var result = Ti.App.languageXML.evaluate(xpath).item(0);
    return result ? result.text : text;
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Ti.App.Properties.setString("webappURL", "http://thepista.dev/");

Ti.App.Properties.setString("webappOAuthSuffix", "/mobile/security/?oauth_provider=:oauth_provider");

Ti.App.Properties.setString("webappRestAPI", Ti.App.Properties.getString("webappURL") + "mobile");

Ti.App.Properties.setString("facebookProviderIndex", "1");

Ti.App.Properties.setString("googleProviderIndex", "2");

Ti.App.Properties.setString("outlookProviderIndex", "3");

Ti.App.Properties.setString("mobile_valid_property", "mobile_valid");

Ti.App.Properties.setString("user_data_property", "user_data");

Ti.App.Properties.setString("SETTING_LANGUAGE", "es");

Ti.App.Properties.setString("AIshowCode", "1");

Ti.App.Properties.setString("AIhideCode", "0");

Ti.App.Properties.setString("okCode", "00");

Alloy.Globals.cleanCookiesHaypistaWeb = function() {
    Ti.Network.createHTTPClient().clearCookies(Ti.App.Properties.getString("webappURL"));
};

Alloy.Globals.backToPreviousWindow = function() {
    var previous = Alloy.Globals.previousWindow;
    null != previous && "undefined" != previous ? previous.open() : Ti.API.info("BackToPreviousWindow: No previous in the global scope");
};

Alloy.Globals.openWindow = function(currentView, nextViewId) {
    Alloy.Globals.navStack || (Alloy.Globals.navStack = []);
    Alloy.Globals.navStack.push = currentView;
    var next_view = Alloy.createController(nextViewId).getView();
    next_view.addEventListener("close", function() {
        Alloy.Globals.navStack.pop();
    });
    next_view.open();
};

Alloy.Globals.showView = function(nextViewId) {
    var next_view = Alloy.createController(nextViewId).getView();
    next_view.show();
};

Alloy.Globals.removeWhiteSpace = function(s) {
    if ("undefined" != s && null != s) return s.replace(/\s/g, "");
};

Alloy.Globals.toogleActivityIndicator = function(activityIndicator, code) {
    switch (code) {
      case Ti.App.Properties.getString("AIhideCode"):
        activityIndicator.hide();
        activityIndicator.height = 0;
        break;

      case Ti.App.Properties.getString("AIshowCode"):
        activityIndicator.show();
        activityIndicator.height = "auto";
    }
};

Alloy.Globals.verifyAPICall = function(code) {
    switch (code) {
      case Ti.App.Properties.getString("okCode"):
        return true;

      default:
        alert("Problema contactando servidor");
        return false;
    }
};

Alloy.Globals.UI = {};

Alloy.Globals.UI.FONT_REGULAR_SIZE_BODY = function() {
    return 12;
}();

Alloy.Globals.UI.FONT_SMALL_SIZE_BODY = function() {
    return 10;
}();

Alloy.Globals.UI.VIEW_REGULAR_MARGIN = function() {
    return 5;
}();

Alloy.createController("index");