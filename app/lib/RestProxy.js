var requestMethod = function(type, model, url, callbacks, data){
	var requestOptions = {};
	
	requestOptions.type = type;
	requestOptions.url = url;
    requestOptions.callbackFunctions = (callbacks || {});
    requestOptions.data = (data || {});
    
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