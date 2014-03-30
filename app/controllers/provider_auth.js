// Modules and Namespaces
var Global = {};
var Imported = {};
var Util = {};

// Require of modules
Imported.alloyString = require('alloy/string');

// Set init params
Global.firstLoad = true;
Global.args = arguments[0] || {};

// Functions
Util = function(){
	return {
		getProviderUrl: function(providerIndex){
			var providerUrl = Ti.App.Properties.getString('webappURL') 
						    + Ti.App.Properties.getString('webappOAuthSuffix')
						  	.replace(":oauth_provider", providerIndex);
			return providerUrl;
		},
		closeAndBack: function(){
			$.provider_auth.close();
		}
	};
}(); 

// Initial calls
Alloy.Globals.cleanCookiesHaypistaWeb();
$.providerWebView.url = Util.getProviderUrl(Global.args.providerIndex);

// Listeners for events
$.providerWebView.addEventListener("beforeload", function(){
	Alloy.Globals.toogleActivityIndicator($.activityIndicator, 
		Ti.App.Properties.getString('AIshowCode'));
});

$.providerWebView.addEventListener("load", function(){
	
	Alloy.Globals.toogleActivityIndicator($.activityIndicator, 
		Ti.App.Properties.getString('AIhideCode'));
				
	
	var cookiesString = $.providerWebView.evalJS("document.cookie");
	
	if(cookiesString!=""){
		var cookies = cookiesString.split(";"); 
		var cookiesObj = {};
		
		for (i = 0; i <= cookies.length - 1; i++) {
			var cookieArray = cookies[i].split("=");
	    	var cookieKey = Alloy.Globals.removeWhiteSpace(cookieArray[0]);
	    	var cookieValue = Imported.alloyString.urlDecode(Alloy.Globals.removeWhiteSpace(cookieArray[1])); 
	    	
	    	Ti.API.info("Cookie: "+cookieKey+" "+cookieValue);
	    	
	    	switch(cookieKey){
	    		case Ti.App.Properties.getString('mobile_valid_property'):
	    			cookiesObj.mobileValid = cookieValue;
	    		break;
	    		case Ti.App.Properties.getString('user_data_property'):
	    			cookiesObj.userData = cookieValue;
	    		break;
	    		case Ti.App.Properties.getString('oauth_data_property'):
	    			cookiesObj.oauthData = cookieValue;
	    		break;
	    	}
	    	
		}
		
		switch(cookiesObj.mobileValid){
			case Ti.App.Properties.getString('loginRegistered'):
				// get info from the logged user
		    	var userData = JSON.parse(cookiesObj.userData);
		    	
		    	// Populate singleton user object
		    	Alloy.Globals.setLoggedUser(userData.mobile_token);
		    	
		    	var tab_home_window = Alloy.createController("home/tab_home").getView();
				tab_home_window.open();
				$.provider_auth.close();				
			break;
			case Ti.App.Properties.getString('loginShouldSignup'):
				// get info from user
		    	var userData = JSON.parse(cookiesObj.userData);
		    	var tempUser = Alloy.createModel("user");
		    	tempUser.setFromMobileTokenJson(userData.mobile_token);
		    	
		    	// only for signup
		    	var oauthData = JSON.parse(cookiesObj.oauthData);
		    	tempUser.set("provider", oauthData.provider);
		    	tempUser.set("uid", oauthData.uid);
		    	
		    	var signup_home_window = Alloy.createController("signup", {info: tempUser}).getView();
				signup_home_window.open();
				$.provider_auth.close();
			break;
			case Ti.App.Properties.getString('loginFailure'):
				Util.closeAndBack();
			break;
			default:
				//alert("Error en el proceso de registro, intentalo de nuevo");
				//Util.closeAndBack();
			break;
		};

	}
	    
});

// Listeners
$.stateBar.barLeftButton.addEventListener("click", function(){
	Util.closeAndBack();
});
$.provider_auth.addEventListener('android:back', function(){
    Util.closeAndBack();
});


