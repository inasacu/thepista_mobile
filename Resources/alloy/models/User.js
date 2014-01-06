exports.definition = {
    config: {
        adapter: {
            type: "restapi",
            collection_name: "user"
        },
        headers: {
            "HayPistaMobile-API-Key": Ti.App.Properties.getString("restAPIKey")
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            setFromJson: function(jsonObject) {
                this.set("legacyId", jsonObject.legacy_id);
                this.set("token", jsonObject.token);
                this.set("email", jsonObject.email);
                this.set("name", jsonObject.email);
                this.set("active", jsonObject.active);
            },
            getGroups: function(callbacks) {
                requestOptions = {
                    type: "GET",
                    url: Ti.App.Properties.getString("webappRestAPI") + "/user/my_groups/" + this.get("legacyId"),
                    callbackFunctions: callbacks
                };
                this.sync("", this, requestOptions);
            },
            getMyGroupsEvents: function(callbacks) {
                requestOptions = {
                    type: "GET",
                    url: Ti.App.Properties.getString("webappRestAPI") + "/user/my_groups_events/" + this.get("legacyId"),
                    callbackFunctions: callbacks
                };
                this.sync("", this, requestOptions);
            },
            getMyActiveEvents: function(callbacks) {
                requestOptions = {
                    type: "GET",
                    url: Ti.App.Properties.getString("webappRestAPI") + "/user/my_active_events/" + this.get("legacyId"),
                    callbackFunctions: callbacks
                };
                this.sync("", this, requestOptions);
            }
        });
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("user", exports.definition, []);

collection = Alloy.C("user", exports.definition, model);

exports.Model = model;

exports.Collection = collection;