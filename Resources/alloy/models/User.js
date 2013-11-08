exports.definition = {
    config: {
        columns: {
            legacy_id: "Integer",
            token: "String",
            email: "String",
            name: "String",
            active: "Integer"
        },
        defaults: {
            legacy_id: "0",
            token: "",
            email: "",
            name: "",
            active: "0"
        },
        adapter: {
            type: "sql",
            collection_name: "user"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            setFromJson: function(jsonObject) {
                this.set("legacy_id", jsonObject.legacy_id);
                this.set("token", jsonObject.token);
                this.set("email", jsonObject.email);
                this.set("name", jsonObject.email);
                this.set("active", jsonObject.active);
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