exports.definition = {
	config: {
		adapter: {
			type: "restapi",
			collection_name: "group"
		},
		headers:{
			"HayPistaMobile-API-Key": Ti.App.Properties.getString('restAPIKey')
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
           setFromJson: function(jsonObject){
           		this.set('legacyId', jsonObject.legacy_id);
           		this.set('name', jsonObject.description.name);
           		this.set('memberQ', jsonObject.size);	
           },
           getStarred: function(extCallbacks){
           		var myCallbacks = {
					success: function(message){
						var starredCollection = [];
						for(i=0;i<message.length;i++){
							var obj = message[i];
							var tempGroup = Alloy.createModel("group");
							tempGroup.setFromJson(obj);
							starredCollection.push(tempGroup);
						}
						Alloy.Globals.successCallback(extCallbacks, starredCollection);	
					},
					error: function(verificationError){
						Alloy.Globals.errorCallback(extCallbacks, verificationError);
					}
				}; 
           		
           		var restProxy = require('RestProxy');
           		restProxy.get(this, 
           			Ti.App.Properties.getString('webappRestAPI')+'/group/starred',
           			myCallbacks);
           },
           getByUser: function(userId, extCallbacks){
           		var myCallbacks = {
					success: function(message){
						var byUserCollection = [];
						for(i=0;i<message.length;i++){
							var obj = message[i];
							var tempGroup = Alloy.createModel("group");
							tempGroup.setFromJson(obj);
							byUserCollection.push(tempGroup);
						}
						Alloy.Globals.successCallback(extCallbacks, byUserCollection);	
					},
					error: function(verificationError){
						Alloy.Globals.errorCallback(extCallbacks, verificationError);
					}
				}; 
				
           		var restProxy = require('RestProxy');
           		restProxy.get(this, 
           			Ti.App.Properties.getString('webappRestAPI')+'/group/by_user/'+userId,
           			myCallbacks);
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