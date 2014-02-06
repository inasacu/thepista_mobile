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
//Ti.App.Properties.setString('webappURL', 'http://thepista.192.168.1.133.xip.io/');
Ti.App.Properties.setString('webappURL', 'http://thepista.dev/');
Ti.App.Properties.setString('webappOAuthSuffix', '/mobile/security/?oauth_provider=:oauth_provider');
Ti.App.Properties.setString('webappRestAPI', Ti.App.Properties.getString('webappURL')+'mobile');

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

// API Call codes
Ti.App.Properties.setString('okCode', '00');

// Global functions
Alloy.Globals.cleanCookiesHaypistaWeb = function(){
	Ti.Network.createHTTPClient().clearCookies(Ti.App.Properties.getString("webappURL"));
};
Alloy.Globals.backToPreviousWindow = function(){
	// Alloy.Globals.parent should be setted properly
	var previous = Alloy.Globals.previousWindow;
	if(previous!=null && previous!="undefined"){
		previous.open();	
	}
	else{
		Ti.API.info("BackToPreviousWindow: No previous in the global scope");
	}
};
Alloy.Globals.openWindow = function(currentView, nextViewId, args){
	if(!Alloy.Globals.navStack){
		Alloy.Globals.navStack = [];
	}
	// enters the window in the stack
	Alloy.Globals.navStack.push = currentView;
	
	// gets next window
	var next_view = Alloy.createController(nextViewId, args).getView();
	
	// listener for closing the window
	next_view.addEventListener('close', function(){
		Alloy.Globals.navStack.pop();
	});
	
	// opens next window
	next_view.open();
};
Alloy.Globals.showView = function(nextViewId){
	var next_view = Alloy.createController(nextViewId).getView();
	next_view.show();
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
Alloy.Globals.verifyAPICall = function(code) {
	switch(code){
		case Ti.App.Properties.getString('okCode'):
			return true;
		break;
		default:
			alert("Problema contactando servidor");
			return false;
		break;
	}
};
// Global UI properties
Alloy.Globals.UI = {};
Alloy.Globals.UI.FONT_REGULAR_SIZE_BODY = function(){
	if(OS_IOS){
		return 12;
	}else if(OS_ANDROID){
		return "15dp";
	}
}();
Alloy.Globals.UI.FONT_SMALL_SIZE_BODY = function(){
	if(OS_IOS){
		return 10;
	}else if(OS_ANDROID){
		return "12dp";
	}
}();
Alloy.Globals.UI.VIEW_REGULAR_MARGIN = function(){
	if(OS_IOS){
		return 5;
	}else if(OS_ANDROID){
		return 10;
	}
}();
Alloy.Globals.UI.showActivityIndicator = function(currentWindow){
	var actInd = Titanium.UI.createActivityIndicator({
		id:"actInd",
		height:50,
		message:"Requesting..",
		width:10
	}); 
	currentWindow.add(actInd);
	return actInd;
};

// Authentication, Authorization, User profile
Ti.App.Properties.setString('restAPIKey', 'Ip4Q7-MXv43syXL98vn1hA');

Alloy.Globals.UI.getLoggedUser = function(){
	var user = {legacyId: 3130};
	return user;
};

// Utils
Alloy.Globals.weekdayToString = function(wday){
	var array = ["sunday", "monday","tuesday","wednesday","thursday","friday","saturday"];
	return L(array[wday]);
};
Alloy.Globals.monthToString = function(mday){
	// mday should be 1...12
	var array = ["january", "february","march","april","may","june","july",
				"august", "september","october","november","december"];
	return L(array[mday-1]);
};
Alloy.Globals.longDateFormat = function(wday, date){
	// Date should come in the form d/m/y and wday 0...6
	var dayString = Alloy.Globals.weekdayToString(wday);
	var dateArray = date.split("/");
	var monthString = Alloy.Globals.monthToString(parseInt(dateArray[1]));
	
	var formattedDate = dayString+", "+dateArray[0]+" "+L("of")+" "+monthString;
	return formattedDate;
};

// Global object for cached locale strings 
// if the languange changes this should be flushed
Alloy.Globals.localeStrings = {};

// Global no-namespace functions - override
function L(text) {
	// Looks if the text is cached
	if (text in Alloy.Globals.localeStrings) {
	   return Alloy.Globals.localeStrings[text];
	} else {
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
	  	Alloy.Globals.localeStrings[text] = result.text;
	    return result.text;
	  } else {
	    return text; // Return the text if localised version not found
	  }
	}
};


