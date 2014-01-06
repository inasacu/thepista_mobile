function InitAdapter() {
    return {};
}

function apiCall(_options) {
    if (Ti.Network.online) {
        var xhr = Ti.Network.createHTTPClient({
            timeout: _options.timeout || 7e3
        });
        xhr.open(_options.type, _options.url);
        xhr.onload = function() {
            var responseJSON, error, success = true;
            try {
                responseJSON = JSON.parse(xhr.responseText);
            } catch (e) {
                Ti.API.error("[REST API] apiCall ERROR: " + e.message);
                success = false;
                error = e.message;
            }
            success ? _options.callbackFunctions.success({
                success: success,
                status: success ? 200 == xhr.status ? "ok" : xhr.status : "error",
                code: xhr.status,
                data: error,
                responseText: xhr.responseText || null,
                responseJSON: responseJSON || null
            }) : _options.callbackFunctions.error({
                success: false,
                status: "error",
                code: xhr.status,
                data: e.error,
                responseText: xhr.responseText,
                responseJSON: responseJSON || null
            });
        };
        xhr.onerror = function(e) {
            var responseJSON;
            _options.callbackFunctions.error({
                success: false,
                status: "error",
                code: xhr.status,
                data: e.error,
                responseText: xhr.responseText,
                responseJSON: responseJSON || null
            });
            Ti.API.error("[REST API] apiCall ERROR: " + xhr.responseText);
            Ti.API.error("[REST API] apiCall ERROR CODE: " + xhr.status);
        };
        for (var header in _options.headers) xhr.setRequestHeader(header, _options.headers[header]);
        _options.beforeSend && _options.beforeSend(xhr);
        xhr.send(_options.data || null);
    } else _options.callbackFunctions.error({
        success: false,
        status: "offline",
        responseText: null
    });
}

function customSync(method, model, options) {
    var params = _.extend({}, options);
    params.headers = params.headers || {};
    if (model.config.hasOwnProperty("headers")) for (var header in model.config.headers) params.headers[header] = model.config.headers[header];
    if (!params.url) {
        params.url = model.config.URL || model.url();
        if (!params.url) {
            Ti.API.error("[REST API] ERROR: NO BASE URL");
            return;
        }
    }
    params.headers["Content-Type"] = "application/json";
    apiCall(params);
}

var _ = require("alloy/underscore")._;

var Alloy = require("alloy"), Backbone = Alloy.Backbone;

module.exports.sync = customSync;

module.exports.beforeModelCreate = function(config) {
    config = config || {};
    InitAdapter(config);
    return config;
};

module.exports.afterModelCreate = function(Model) {
    Model = Model || {};
    Model.prototype.config.Model = Model;
    Model.prototype.idAttribute = Model.prototype.config.adapter.idAttribute;
    return Model;
};