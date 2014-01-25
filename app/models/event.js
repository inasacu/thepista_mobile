exports.definition = {
	config: {
		adapter: {
			type: "restapi",
			collection_name: "event"
		},
		headers:{
			"HayPistaMobile-API-Key": Ti.App.Properties.getString('restAPIKey')
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
           setFromJson: function(jsonObject){
           },
           getActiveByUserGroups: function(userId, callbacks){
           		var restProxy = require('RestProxy');
           		restProxy.get(this, 
           			Ti.App.Properties.getString('webappRestAPI')+'/event/active_by_user_groups/'+userId,
           			callbacks);
           },
           getActiveByUser: function(userId, callbacks){
           		var restProxy = require('RestProxy');
           		restProxy.get(this, 
           			Ti.App.Properties.getString('webappRestAPI')+'/event/active_by_user/'+userId,
           			callbacks);
           }
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};