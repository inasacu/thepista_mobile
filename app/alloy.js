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

Alloy.Globals.Map = require('ti.map');

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
Ti.App.Properties.setString('oauth_data_property', 'oauth_data');

// Mobile app specific
Ti.App.Properties.setString('SETTING_LANGUAGE','es');

// Activity indicator visibility codes
Ti.App.Properties.setString('AIshowCode', '1');
Ti.App.Properties.setString('AIhideCode', '0');

// API Call codes
Ti.App.Properties.setString('okCode', '00');
Ti.App.Properties.setString('operationErrorCode', '88');
Ti.App.Properties.setString('authorizationErrorCode', '99');
Ti.App.Properties.setString('connectionErrorCode', '77');

// LOGIN Codes
/*
 MOBILE_LOGIN_REGISTERED=11
MOBILE_LOGIN_SHOULD_SIGNUP=12
MOBILE_LOGIN_FAILURE=13
 * */
Ti.App.Properties.setString('loginRegistered', '11');
Ti.App.Properties.setString('loginShouldSignup', '12');
Ti.App.Properties.setString('loginFailure', '13');

// User event states
/*
 * 	  1;"convocado"
      2;"ultima_hora"
      3;"ausente"
      4;"no_jugado"
      5;"Ultima_Hora"
 * 
 */
Ti.App.Properties.setInt('UGOING', 1);
Ti.App.Properties.setInt('ULAST', 2);
Ti.App.Properties.setInt('UMISSING', 3);

// Image not-available file name
Ti.App.Properties.setString('imageNA', '/images/image_na.png');

// Global functions
Alloy.Globals.cleanCookiesHaypistaWeb = function(){
	Ti.Network.createHTTPClient().clearCookies(Ti.App.Properties.getString("webappURL"));
	Ti.Network.createHTTPClient().clearCookies("http://google.com");
	Ti.Network.createHTTPClient().clearCookies("http://facebook.com");
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
Alloy.Globals.verifyAPICall = function(responseObj) {
	switch(responseObj.code){
		case Ti.App.Properties.getString('okCode'):	
			return {good: true, message: responseObj.message};
		break;
		case Ti.App.Properties.getString('operationErrorCode'):
			// If an error with the operation ocurred handling should be done by caller
			return {good: false, message: responseObj.message};
		break;
		case Ti.App.Properties.getString('authorizationErrorCode'):
			// Probably inform user with alert and log off
			return {good: false, message: responseObj.message};
		default:
			return {good: false, message: "Problem contacting the server"};
		break;
	}
};
Alloy.Globals.successCallback = function(callback, data) {
	if(callback && callback.success){
		var tempData = (data || {});
		callback.success(tempData);
	}
};
Alloy.Globals.errorCallback = function(callback, data) {
	if(callback && callback.error){
		var tempData = (data || {});
		callback.error(tempData);
	}
};

// Global UI properties
Alloy.Globals.UI = {};
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

Alloy.Globals.getLoggedUser = function(){
	return Alloy.Globals.loggedUser;
};
Alloy.Globals.setLoggedUser = function(userData){
	if(userData){
		Alloy.Globals.loggedUser = Alloy.createModel('user');
		Alloy.Globals.loggedUser.setFromMobileTokenJson(userData);
		
		// Authentication, Authorization, User profile
		Ti.App.Properties.setString('restAPIKey', Alloy.Globals.loggedUser.get("token"));
	
		return Alloy.Globals.loggedUser;	
	}else{
		Alloy.Globals.loggedUser = {};
		return true;
	}
};
Alloy.Globals.testBootstrap = function(){
	var userData = {"mobile_token":{"_id":"53012177ca3ad81d86000024","_type":"null",
									 "active":1,"email":"jonathan.aradu@gmail.com","generated_time":"2014-02-16T20:37:11+00:00",
									 "legacy_id":3188,"name":"Jonathan Araujo GMAIL","token":"BlcsxjJmEePF-Mq5fQjY2g"}};
 	Alloy.Globals.setLoggedUser(userData.mobile_token);
};
Alloy.Globals.testBootstrap();

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
Alloy.Globals.longDateTimeFormat = function(wday, date, time){
	// Date should come in the form d/m/y and wday 0...6
	var dayString = Alloy.Globals.weekdayToString(wday);
	var dateArray = date.split("/");
	var monthString = Alloy.Globals.monthToString(parseInt(dateArray[1]));
	
	var formattedDate = dayString+", "+dateArray[0]+" "+L("of")+" "+monthString+" - "+time+"h";
	return formattedDate;
};
Alloy.Globals.formatPickedDate = function(chosenDateTime, formatIndex){
	var date = new Date(chosenDateTime.pickedDate);
	var time = new Date(chosenDateTime.pickedTime);
	var formattedDate = "";
	var formattedTime = "";
	var formatResult = "";
	
	switch(formatIndex){
		case 1:
			var datetime = new Date(chosenDateTime);
			formatResult = datetime.customFormat("#DD#/#MM#/#YYYY# - #hh#:#mm# #ampm#");
		break;
		default:
			formattedDate = date.customFormat("#DD#/#MM#/#YYYY#");
		    formattedTime = time.customFormat("#hh#:#mm# #ampm#");
		    formatResult = formattedDate + " - "+ formattedTime;
		break;
	}
	
	return formatResult;
};

// Global object with cached city list
Alloy.Globals.cityList = [];

// Global object with cached sports list
Alloy.Globals.sportList = [];

// Global object for cached locale strings 
// if the languange changes this should be flushed
Alloy.Globals.localeStrings = {};

// Global for children event views
Alloy.Globals.eventViewsControllers = {};

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

Date.prototype.customFormat = function(formatString){
	var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
	var dateObject = this;
	YY = ((YYYY=dateObject.getFullYear())+"").slice(-2);
	MM = (M=dateObject.getMonth()+1)<10?('0'+M):M;
	MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
	DD = (D=dateObject.getDate())<10?('0'+D):D;
	DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dateObject.getDay()]).substring(0,3);
	th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
	formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);

	h=(hhh=dateObject.getHours());
	if (h==0) h=24;
	if (h>12) h-=12;
	hh = h<10?('0'+h):h;
	AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
	mm=(m=dateObject.getMinutes())<10?('0'+m):m;
	ss=(s=dateObject.getSeconds())<10?('0'+s):s;
	return formatString.replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
};


