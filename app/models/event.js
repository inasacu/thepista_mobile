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
           		this.set('legacyId', jsonObject.legacy_id);
           		this.set('name', jsonObject.name);
           		this.set('groupId', jsonObject.group_id);
           		this.set('groupName', jsonObject.group_name);
           		this.set('startDate', jsonObject.start_date);
           		this.set('startTime', jsonObject.start_time);
           		this.set('endDate', jsonObject.end_date);
           		this.set('endTime', jsonObject.end_time);
           		this.set('weekDay', jsonObject.week_day);
           		this.set('fee', jsonObject.fee);
           		//this.set('active', jsonObject.active);
           },
           getActiveByUserGroups: function(userId, extCallbacks){
           		var myCallbacks = {
					success: function(message){
						var activeEventsCollection = [];
						
						for(i=0;i<message.length;i++){
							var obj = message[i];
							var tempEvent = Alloy.createModel("event");
							tempEvent.setFromJson(obj);
							activeEventsCollection.push(tempEvent);
						}
						
						Alloy.Globals.successCallback(extCallbacks, activeEventsCollection);	
					},
					error: function(verificationError){
						Alloy.Globals.errorCallback(extCallbacks, verificationError);
					}
				}; 
           		
           		var restProxy = require('RestProxy');
           		restProxy.get(this, 
           			Ti.App.Properties.getString('webappRestAPI')+'/event/active_by_user_groups/'+userId,
           			myCallbacks);
           },
           getActiveByUser: function(userId, callbacks){
           		var restProxy = require('RestProxy');
           		restProxy.get(this, 
           			Ti.App.Properties.getString('webappRestAPI')+'/event/active_by_user/'+userId,
           			callbacks);
           },
           getById: function(eventId, extCallbacks){
           		var myCallbacks = {
					success: function(message){
						var currentEvent = Alloy.createModel("event");
						currentEvent.setFromJson(message);
						Alloy.Globals.successCallback(extCallbacks,currentEvent);	
					},
					error: function(verificationError){
						Alloy.Globals.errorCallback(extCallbacks,verificationError);
					}
				}; 
           		
           		var restProxy = require('RestProxy');
           		restProxy.get(this, 
           			Ti.App.Properties.getString('webappRestAPI')+'/event/by_id/'+eventId,
           			myCallbacks);
           },
           changeUserState: function(eventId, userId, newState, extCallbacks){
           		var userEventData = {};
           		var myCallbacks = {
					success: function(message){
						userEventData = {eventId: message.event_id, 
										userId: message.user_id,
										status: message.user_event_state};
						Alloy.Globals.successCallback(extCallbacks,userEventData);	
					},
					error: function(verificationError){
						Alloy.Globals.errorCallback(extCallbacks,verificationError);
					}
				}; 
           		
           		var restProxy = require('RestProxy');
           		restProxy.post(this, 
           			Ti.App.Properties.getString('webappRestAPI')+'/event/change_user_state',
           			myCallbacks, {event_id: eventId, user_id: userId, new_state: newState});
           },
           getUserEventData: function(eventId, userId, extCallbacks){
           		var userEventData = {};
           		var myCallbacks = {
					success: function(message){
						userEventData = {eventId: message.event_id, 
										userId: message.user_id,
										status: message.user_event_state};
						Alloy.Globals.successCallback(extCallbacks,userEventData);	
					},
					error: function(verificationError){
						Alloy.Globals.errorCallback(extCallbacks,verificationError);
					}
				}; 
           		
           		var restProxy = require('RestProxy');
           		restProxy.get(this, 
           			Ti.App.Properties.getString('webappRestAPI')+'/event/user_data/'+eventId+'/'+userId,
           			myCallbacks);
           },
           create: function(eventInfo, userId, extCallbacks){
           		
           		var myCallbacks = {
					success: function(message){
						Alloy.Globals.successCallback(extCallbacks,message);	
					},
					error: function(verificationError){
						Alloy.Globals.errorCallback(extCallbacks,verificationError);
					}
				}; 
				
				var restDTO = {
					event_name: eventInfo.name,
					event_player_limit: eventInfo.playerLimit,
					event_fee: eventInfo.fee,
					event_date: eventInfo.date,
					event_time: eventInfo.time,
					event_group: eventInfo.groupId,
					user_id: userId
				};
           		
           		var restProxy = require('RestProxy');
           		restProxy.post(this, 
           			Ti.App.Properties.getString('webappRestAPI')+'/event/create_new',
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