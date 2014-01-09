var requestMethod = function(type, model, url, callbacks, data) {
    var requestOptions = {};
    requestOptions.type = type;
    requestOptions.url = url;
    requestOptions.callbackFunctions = callbacks || {};
    requestOptions.data = data || {};
    model.sync(model, requestOptions);
    Ti.API.info("BASE REQUEST");
};

exports.get = function(model, url, callbacks, data) {
    requestMethod("GET", model, url, callbacks, data);
    Ti.API.info("GET REQUEST");
};

exports.post = function(model, url, callbacks, data) {
    requestMethod("POST", model, url, callbacks, data);
    Ti.API.info("POST REQUEST");
};

exports.version = 1;

exports.author = "Jonathan Araujo";