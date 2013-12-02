function InitAdapter(config) {
        return {};
}

function apiCall(_options) {
    if (Ti.Network.online) {
        var xhr = Ti.Network.createHTTPClient({
            timeout : _options.timeout || 7000
        });

        //Prepare the request
        xhr.open(_options.type, _options.url);

        xhr.onload = function() {
            var responseJSON, success = true, error;

            try {
                responseJSON = JSON.parse(xhr.responseText);
            } catch (e) {
                Ti.API.error('[REST API] apiCall ERROR: ' + e.message);
                success = false;
                error = e.message;
            }

            _options.callbackFunctions.success({
                success : success,
                status : success ? (xhr.status == 200 ? "ok" : xhr.status) : 'error',
                code : xhr.status,
                data : error,
                responseText : xhr.responseText || null,
                responseJSON : responseJSON || null
            });
        };

            //Handle error
        xhr.onerror = function(e) {
            var responseJSON;

            try {
                responseJSON = JSON.parse(xhr.responseText);
            } catch (e) {
            }

            _options.callbackFunctions.success({
                success : false,
                status : "error",
                code : xhr.status,
                data : e.error,
                responseText : xhr.responseText,
                responseJSON : responseJSON || null
            });
            Ti.API.error('[REST API] apiCall ERROR: ' + xhr.responseText);
            Ti.API.error('[REST API] apiCall ERROR CODE: ' + xhr.status);
        };
            
        // headers
        for (var header in _options.headers) {
            xhr.setRequestHeader(header, _options.headers[header]);
        }

        if (_options.beforeSend) {
            _options.beforeSend(xhr);
        }

        xhr.send(_options.data || null);
    } else {
        // Offline
        _options.callbackFunctions.error({
            success : false,
            status : "offline",
            responseText : null
        });
    }
}

function customSync(method, model, options) {
	var params = _.extend({}, options);

    //set default headers
    params.headers = params.headers || {};

    // Send our own custom headers
    if (model.config.hasOwnProperty("headers")) {
            for (var header in model.config.headers) {
                    params.headers[header] = model.config.headers[header];
            }
    }

    // We need to ensure that we have a base url.
    if (!params.url) {
            params.url = (model.config.URL || model.url());
            if (!params.url) {
                    Ti.API.error("[REST API] ERROR: NO BASE URL");
                    return;
            }
    }
    
	params.headers['Content-Type'] = 'application/json';
	 
	apiCall(params);
}

//we need underscore
var _ = require("alloy/underscore")._;

//until this issue is fixed: https://jira.appcelerator.org/browse/TIMOB-11752
var Alloy = require("alloy"), Backbone = Alloy.Backbone;

module.exports.sync = customSync;

module.exports.beforeModelCreate = function(config, name) {
        config = config || {};
        InitAdapter(config);
        return config;
};

module.exports.afterModelCreate = function(Model, name) {
        Model = Model || {};
        Model.prototype.config.Model = Model;
        Model.prototype.idAttribute = Model.prototype.config.adapter.idAttribute;
        return Model;
};