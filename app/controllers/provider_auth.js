// Require of modules
var alloyString = require('alloy/string');

// Functions
function getProviderUrl(providerIndex){
	providerUrl = Ti.App.Properties.getString('webappURL') 
				  + Ti.App.Properties.getString('webappOAuthSuffix')
				  	.replace(":oauth_provider", providerIndex);

	return providerUrl;
}

// Initial calls
Alloy.Globals.cleanCookiesHaypistaWeb();

// Set init params
var firstLoad = true;
var args = arguments[0] || {};
$.providerWebView.url = getProviderUrl(args.providerIndex);
//$.providerWebView.url = "http://google.com";

$.providerWebView.addEventListener("beforeload", function(){
	Alloy.Globals.toogleActivityIndicator($.activityIndicator, 
		Ti.App.Properties.getString('AIshowCode'));
});

// Listeners for events
$.providerWebView.addEventListener("load", function(){
	
	Alloy.Globals.toogleActivityIndicator($.activityIndicator, 
		Ti.App.Properties.getString('AIhideCode'));
				
	if(!firstLoad){
		cookiesString = $.providerWebView.evalJS("document.cookie");
		
		if(cookiesString!=""){
			var cookies = cookiesString.split(";"); 
			var cookiesObj = {};
			
			for (i = 0; i <= cookies.length - 1; i++) {
				cookieArray = cookies[i].split("=");
		    	cookieKey = Alloy.Globals.removeWhiteSpace(cookieArray[0]);
		    	cookieValue = alloyString.urlDecode(Alloy.Globals.removeWhiteSpace(cookieArray[1])); 
		    	
		    	Ti.API.info("Cookie: "+cookieKey+" "+cookieValue);
		    	
		    	switch(cookieKey){
		    		case Ti.App.Properties.getString('mobile_valid_property'):
		    			cookiesObj.mobileValid = cookieValue;
		    		break;
		    		case Ti.App.Properties.getString('user_data_property'):
		    			cookiesObj.userData = cookieValue;
		    		break;
		    	}
		    	
			}
			
			if(cookiesObj.mobileValid === "true"){
				// get info from the logged user
		    	userData = JSON.parse(cookiesObj.userData);
		    	
		    	// Populate singleton user object
		    	var currentUser = Alloy.Models.instance("user");
		    	currentUser.setFromJson(userData.mobile_token);
		    	
		    	var tab_home_window = Alloy.createController("tab_home").getView();
				tab_home_window.open();
				
				$.provider_auth.close();
		    	
			}else if(cookiesObj.mobile_valid === "false"){
				// get info from the logged user
		    	Ti.API.info("User permission not granted");
		    					   
				$.provider_auth.close();
			    Alloy.createController("index").getView().open();
			}	
		}
		
	}else{
		firstLoad = false;
	}
	    
});

// Listeners
$.stateBar.barLeftButton.addEventListener("click", function(){
	Alloy.Globals.backToPreviousWindow();
	$.provider_auth.close();
});
$.provider_auth.addEventListener('android:back', function(){
    Alloy.Globals.backToPreviousWindow();
    $.provider_auth.close();
});


