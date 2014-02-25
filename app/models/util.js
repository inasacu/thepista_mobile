exports.definition = {
	config: {
		adapter: {
			type: "restapi",
			collection_name: "util"
		},
		headers:{
			"HayPistaMobile-API-Key": Ti.App.Properties.getString('restAPIKey')
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
           getCities: function(extCallbacks){
           		var myCallbacks = {
					success: function(message){
						var citiesCollection = [];
						
						for(i=0;i<message.length;i++){
							var obj = message[i];
							var tempCity = {legacyId: obj.id, name: obj.name};
							citiesCollection.push(tempCity);
						}
						
						Alloy.Globals.successCallback(extCallbacks, citiesCollection);	
					},
					error: function(verificationError){
						Alloy.Globals.errorCallback(extCallbacks, verificationError);
					}
				}; 
           		
           		var restProxy = require('RestProxy');
           		restProxy.get(this, 
           			Ti.App.Properties.getString('webappRestAPI')+'/util/cities/',
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