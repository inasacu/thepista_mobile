exports.definition = {
	config: {
		adapter: {
			type: "restapi",
			collection_name: "venue"
		},
		headers:{
			"HayPistaMobile-API-Key": Ti.App.Properties.getString('restAPIKey')
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
           setFromJson: function(jsonObject){
           		this.set("name", jsonObject.name);
           },
           getStarred: function(extCallbacks){
           		var myCallbacks = {
					success: function(message){
						var starredVenuesCollection = [];
						
						for(i=0;i<message.length;i++){
							var obj = message[i];
							var tempVenue = Alloy.createModel("venue");
							tempVenue.setFromJson(obj);
							starredVenuesCollection.push(tempVenue);
						}
						
						Alloy.Globals.successCallback(extCallbacks, starredVenuesCollection);	
					},
					error: function(verificationError){
						Alloy.Globals.errorCallback(extCallbacks, verificationError);
					}
				}; 
           		
           		var restProxy = require('RestProxy');
           		restProxy.get(this, 
           			Ti.App.Properties.getString('webappRestAPI')+'/venue/starred',
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