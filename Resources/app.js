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

Ti.App.Properties.setString("facebookProviderIndex", "1");

Ti.App.Properties.setString("googleProviderIndex", "2");

Ti.App.Properties.setString("outlookProviderIndex", "3");

Ti.App.Properties.setString("mobile_valid_property", "mobile_valid");

Ti.App.Properties.setString("user_data_property", "user_data");

Ti.App.Properties.setString("SETTING_LANGUAGE", "es");

Alloy.Globals.cleanCookiesHaypistaWeb = function() {
    Ti.Network.createHTTPClient().clearCookies(Ti.App.Properties.getString("webappURL"));
};

Alloy.Globals.backToPreviousWindow = function() {
    var parent = Alloy.Globals.parent;
    parent.open();
};

Alloy.Globals.removeWhiteSpace = function(s) {
    if ("undefined" != s && null != s) return s.replace(/\s/g, "");
};

Alloy.createController("index");