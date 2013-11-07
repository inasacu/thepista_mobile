// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

// Global properties ---------------------------------------------

// Webapp
Ti.App.Properties.setString('webappURL', 'http://thepista.192.168.1.134.xip.io/');
//Ti.App.Properties.setString('webappURL', 'http://thepista.dev/');
Ti.App.Properties.setString('webappOAuthSuffix', '/mobile/security/?oauth_provider=:oauth_provider');

Ti.App.Properties.setString('facebookProviderIndex', '1');
Ti.App.Properties.setString('googleProviderIndex', '2');
Ti.App.Properties.setString('outlookProviderIndex', '3');

// Cookies object preferences
Ti.App.Properties.setString('mobile_valid_property', 'mobile_valid');
Ti.App.Properties.setString('user_data_property', 'user_data');

// Mobile app specific
Ti.App.Properties.setString('SETTING_LANGUAGE','es');

// Activity indicator visibility codes
Ti.App.Properties.setString('AIshowCode', '1');
Ti.App.Properties.setString('AIhideCode', '0');

// Global functions
Alloy.Globals.cleanCookiesHaypistaWeb = function(){
	Ti.Network.createHTTPClient().clearCookies(Ti.App.Properties.getString("webappURL"));
};
Alloy.Globals.backToPreviousWindow = function(){
	var parent = Alloy.Globals.parent;
	parent.open();
};
Alloy.Globals.removeWhiteSpace = function(s) {
	if(s!='undefined' && s!=null){
		return s.replace(/\s/g, '');	
	}
};
Alloy.Globals.toogleActivityIndicator = function(activityIndicator, code) {
	switch(code){
		case Ti.App.Properties.getString('AIhideCode'):
			activityIndicator.hide();
			activityIndicator.height = 0;
		break;
		case Ti.App.Properties.getString('AIshowCode'):
			activityIndicator.show();
			activityIndicator.height = "auto";
		break;
	}
};

// Global no-namespace functions - override
function L(text) {
	  if (Ti.App.languageXML === undefined || Ti.App.languageXML === null) {
		    var langFile = Ti.App.Properties.getString('SETTING_LANGUAGE'); // We should store user's language setting in SETTING_LANGUAGE
		  
		    var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'i18n/' + langFile + '/strings.xml'); // Get the corresponding file from i18n
		    if (!file.exists()) {
		      var langFile = "en"; // Fall back to english as the default language
		      file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'i18n/' + langFile + '/strings.xml');
		    }
		    var xmltext = file.read().text;
		    var xmldata = Titanium.XML.parseString(xmltext); // Parse the xml
		    Ti.App.languageXML = xmldata; // Store the parsed xml so that we don't parse everytime L() is called
	  }
	  // Get the localised string from xml file
	  var xpath = "/resources/string[@name='" + text + "']/text()"; 
	  var result = Ti.App.languageXML.evaluate(xpath).item(0);
	  	  
	  if (result) {
	    return result.text;
	  } else {
	    return text; // Return the text if localised version not found
	  }
};


