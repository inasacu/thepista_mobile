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
		  setFromJson: function(jsonObject){
           		this.set('legacyId', jsonObject.legacy_id);
           		this.set('token', jsonObject.token);
           		this.set('email', jsonObject.email);
           		this.set('name', jsonObject.name);
           		this.set('phone', jsonObject.phone);
           		this.set('waActive', jsonObject.is_whatsapp_phone);
           		this.set('active', jsonObject.active);
           		this.set('city', jsonObject.city);
           		this.set('language', jsonObject.language);
          },
           setFromMobileTokenJson: function(jsonObject){
           		this.set('legacyId', jsonObject.legacy_id);
           		this.set('token', jsonObject.token);
           		this.set('email', jsonObject.email);
           		this.set('name', jsonObject.name);
           		this.set('phone', jsonObject.phone);
           		this.set('waActive', jsonObject.is_whatsapp_phone);
           		this.set('active', jsonObject.active);
           		this.set('city', jsonObject.city);
           		this.set('language', jsonObject.language);
           },
           register: function(regInfo, extCallbacks){
           		
           		var myCallbacks = {
					success: function(message){
						Alloy.Globals.successCallback(extCallbacks,message);	
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
           },
           getUserAccountInfo: function(userId, extCallbacks){
           	
	           	var myCallbacks = {
					success: function(message){
						var tempUser = Alloy.createModel("user");
						tempUser.setFromJson(message);
						
						Alloy.Globals.successCallback(extCallbacks, tempUser);	
					},
					error: function(verificationError){
						Alloy.Globals.errorCallback(extCallbacks,verificationError);
					}
				}; 
				
	       		var restProxy = require('RestProxy');
	       		restProxy.get(this, 
	       			Ti.App.Properties.getString('webappRestAPI')+'/user/account_info/'+userId,
	       			myCallbacks);
           	
           },
           logout: function(userId, extCallbacks){
           	
	           	var myCallbacks = {
					success: function(message){
						Alloy.Globals.successCallback(extCallbacks, message);	
					},
					error: function(verificationError){
						Alloy.Globals.errorCallback(extCallbacks,verificationError);
					}
				}; 
				
	       		var restProxy = require('RestProxy');
	       		restProxy.post(this, 
	       			Ti.App.Properties.getString('webappRestAPI')+'/user/logout/'+userId,
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