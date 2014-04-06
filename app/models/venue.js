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
           		this.set("legacyId", jsonObject.legacy_id);
           		this.set("name", jsonObject.name);
           		this.set("address", jsonObject.address);
           		this.set("city", jsonObject.city);
           		this.set("latitude", jsonObject.latitude);
           		this.set("longitude", jsonObject.longitude);
           		this.set("region", jsonObject.region);
           		this.set("eventsQ", jsonObject.number_of_events);
           		
           		if(jsonObject.sports){
           			var sports = [];
           			_.each(jsonObject.sports, function(element, index, list){
           				sports.push({id: element.id, name: element.name});
           			});
           			this.set("sports", sports);	
           		}
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
           },
           getVenueDetail: function(venueId, extCallbacks){
           	
	           	var myCallbacks = {
					success: function(message){
						var tempVenue = Alloy.createModel("venue");
						tempVenue.setFromJson(message);
						
						Alloy.Globals.successCallback(extCallbacks, tempVenue);	
					},
					error: function(verificationError){
						Alloy.Globals.errorCallback(extCallbacks,verificationError);
					}
				}; 
				
	       		var restProxy = require('RestProxy');
	       		restProxy.get(this, 
	       			Ti.App.Properties.getString('webappRestAPI')+'/venue/get_info/'+venueId,
	       			myCallbacks);
           	
          },
          getVenueEvents: function(venueId, extCallbacks){
           	
	           	var myCallbacks = {
					success: function(message){	
						var events = [];					
						_.each(message, function(element, index, list){
							var tempEvent = Alloy.createModel("event");
							tempEvent.setFromJson(element);
							events.push(tempEvent);
	           			});
						
						Alloy.Globals.successCallback(extCallbacks,events);	
					},
					error: function(verificationError){
						Alloy.Globals.errorCallback(extCallbacks,verificationError);
					}
				}; 
				
	       		var restProxy = require('RestProxy');
	       		restProxy.get(this, 
	       			Ti.App.Properties.getString('webappRestAPI')+'/venue/events/'+venueId,
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