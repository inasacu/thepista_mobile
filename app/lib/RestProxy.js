var requestMethod = function(type, model, url, callbacks, data){
	var requestOptions = {};
	
	requestOptions.type = type;
	requestOptions.url = url;
    requestOptions.data = (data || {});
    requestOptions.callbackFunctions = {};
    
    if(data && data.jsonContent===true){
    	requestOptions.accepts = "application/json";
    	requestOptions.contentType = "application/json";	
    }
   
	// checks callbacks content
	callbacks = (callbacks || {});
	    
    // Wraps up the callbacks to handle verification of response
    var myCallbacks = {
		success: function(data){
			var responseObj = data.responseJSON;
			var verification = Alloy.Globals.verifyAPICall(responseObj);
			
			if(verification.good){
				var message = responseObj.message;
				callbacks.success(message);
			}
			else{
				callbacks.error(verification);
				Titanium.API.info("SUCCESS WITH ERRORS "+JSON.stringify(data));	
			}
		},
		error: function(data){
			var verification = Alloy.Globals.verifyAPICall(data);
			callbacks.error(verification);	
			
			Titanium.API.info("ERROR "+JSON.stringify(data));
		}
	};
	
	requestOptions.callbackFunctions.success = myCallbacks.success;
    requestOptions.callbackFunctions.error = myCallbacks.error;
    
    model.sync(model, requestOptions);
};


exports.get = function(model, url, callbacks, data) {
	requestMethod("GET", model, url, callbacks, data);
};

exports.post = function(model, url, callbacks, data) {
	requestMethod("POST", model, url, callbacks, data);
};

exports.version = 1.0;
exports.author = 'Jonathan Araujo';