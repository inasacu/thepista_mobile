exports.definition = {
	config: {
		adapter: {
			type: "restapi",
			collection_name: "user"
		},
		headers:{
			"HayPistaMobile-API-Key": Ti.App.Properties.getString('restAPIKey')
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
           setFromMobileTokenJson: function(jsonObject){
           		this.set('legacyId', jsonObject.legacy_id);
           		this.set('token', jsonObject.token);
           		this.set('email', jsonObject.email);
           		this.set('name', jsonObject.email);
           		this.set('active', jsonObject.active);
           },
           register: function(regInfo, extCallbacks){
           		var userRegData = {};
           		var myCallbacks = {
					success: function(message){
						Alloy.Globals.successCallback(extCallbacks,userRegData);	
					},
					error: function(verificationError){
						Alloy.Globals.errorCallback(extCallbacks,verificationError);
					}
				}; 
				
				var restDTO = {
					user_name: regInfo.name,
					user_email: regInfo.email,
					user_phone: regInfo.phone,
					user_city: regInfo.city,
					user_identity_url: regInfo.identityUrl,
					user_uid: regInfo.uid,
					user_provider: regInfo.provider,
					user_use_wa: regInfo.useWA
				};
           		
           		var restProxy = require('RestProxy');
           		restProxy.post(this, 
           			Ti.App.Properties.getString('webappRestAPI')+'/user/register',
           			myCallbacks, restDTO);
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