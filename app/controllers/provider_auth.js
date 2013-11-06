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
	// Show loading indicator for the webview
	$.activityIndicator.show();
	$.activityIndicator.height = "auto";
});

// Listeners for events
$.providerWebView.addEventListener("load", function(){
	
	$.activityIndicator.hide();
	$.activityIndicator.height = 0;
		
	if(!firstLoad){
		
		var cookies = $.providerWebView.evalJS("document.cookie").split(";"); 
		var cookiesObj = {};
		
		for (i = 0; i <= cookies.length - 1; i++) {
			cookieArray = cookies[i].split("=");
	    	cookieKey = Alloy.Globals.removeWhiteSpace(cookieArray[0]);
	    	cookieValue = Alloy.Globals.removeWhiteSpace(cookieArray[1]);
	    	
	    	Ti.API.info("Cookie: "+cookieKey+" "+cookieValue);
	    	
	    	switch(cookieKey){
	    		case Ti.App.Properties.getString('mobile_valid_property'):
	    			cookiesObj.mobile_valid = cookieValue;
	    		break;
	    		case Ti.App.Properties.getString('user_data_property'):
	    			cookiesObj.user_data = cookieValue;
	    		break;
	    	}
	    	
		}
		
		if(cookiesObj.mobile_valid === "true"){
	    	// get info from the logged user
	    	Ti.API.info("User: "+cookiesObj.user_data);
		}else if(cookiesObj.mobile_valid === "false"){
			// get info from the logged user
	    	Ti.API.info("User permission not granted");
	    					   
			$.provider_auth.close();
		    Alloy.createController("index").getView().open();
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


