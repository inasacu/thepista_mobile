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
           		this.set('startDateTimeMillis', jsonObject.start_datetime_millis);
           		this.set('startDate', jsonObject.start_date);
           		this.set('startTime', jsonObject.start_time);
           		this.set('endDateTimeMillis', jsonObject.end_datetime_millis);
           		this.set('endDate', jsonObject.end_date);
           		this.set('endTime', jsonObject.end_time);
           		this.set('weekDay', jsonObject.week_day);
           		this.set('fee', jsonObject.fee);
           		this.set('playerLimit', jsonObject.player_limit);
           		
           		if(jsonObject.group){
           			this.set('group', {id: jsonObject.group.id, 
           							  name: jsonObject.group.name});
           		}
           		
           		if(jsonObject.people_info){
           			this.set('peopleInfo', {comming: jsonObject.people_info.comming,
					           				missing: jsonObject.people_info.missing,
					           				lastMinute: jsonObject.people_info.last_minute});	
           		}
           		
           		if(jsonObject.place){
           			this.set('place', {name: jsonObject.place.name,
				           			  location: {latitude: jsonObject.place.latitude, 
				           			  			longitude: jsonObject.place.longitude}});	
           		}       
           		           		
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
           getActiveByUser: function(userId, extCallbacks){
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
           			Ti.App.Properties.getString('webappRestAPI')+'/event/active_by_user/'+userId,
           			myCallbacks);
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
           getUserHistory: function(userId, offsetFactor, extCallbacks){
           		var myCallbacks = {
					success: function(message){
						
						var eventsCollection = [];
						
						for(i=0;i<message.length;i++){
							var obj = message[i];
							var tempEvent = Alloy.createModel("event");
							tempEvent.setFromJson(obj);
							eventsCollection.push(tempEvent);
						}
						
						Alloy.Globals.successCallback(extCallbacks, eventsCollection);	
					},
					error: function(verificationError){
						Alloy.Globals.errorCallback(extCallbacks,verificationError);
					}
				}; 
           		
           		var restProxy = require('RestProxy');
           		restProxy.get(this, 
           			Ti.App.Properties.getString('webappRestAPI')+'/event/user_history/'+userId+"/"+offsetFactor,
           			myCallbacks);
           },
           changeUserState: function(eventId, userId, newState, extCallbacks){
           		var userEventData = {};
           		var myCallbacks = {
					success: function(message){
						var userEventDataDTO = {userId: message.user_data.user_id,
												status: message.user_data.user_event_state};
						var tempEvent = Alloy.createModel("event");	
						tempEvent.setFromJson(message.event);
						Alloy.Globals.successCallback(extCallbacks,{userEventData: userEventDataDTO, eventObj: tempEvent});	
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
           changeUserTeam: function(eventId, userId, extCallbacks){
           		var userEventData = {};
           		var myCallbacks = {
					success: function(message){
						var userTeamDataDTO = {success: message.success,
											   isSecondTeam: message.is_second_team};
						var localTeam = [];
						var visitorTeam = [];
						if(message.teams){
							if(message.teams.local){
								_.each(message.teams.local, function(localPlayer, index, list){
									localTeam.push({id: localPlayer.legacy_id, name: localPlayer.name});
								});
							}
							if(message.teams.visitor){
								_.each(message.teams.visitor, function(visitorPlayer, index, list){
									visitorTeam.push({id: visitorPlayer.legacy_id, name: visitorPlayer.name});
								});		
							}
						}
						
						Alloy.Globals.successCallback(extCallbacks,
							{userTeamData: userTeamDataDTO, localTeamArray: localTeam, visitorTeamArray: visitorTeam});	
					},
					error: function(verificationError){
						Alloy.Globals.errorCallback(extCallbacks,verificationError);
					}
				}; 
           		
           		var restProxy = require('RestProxy');
           		restProxy.post(this, 
           			Ti.App.Properties.getString('webappRestAPI')+'/event/change_user_event_team',
           			myCallbacks, {event_id: eventId, user_id: userId});
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
           getUserAndEventData: function(eventId, userId, extCallbacks){
           		var userEventData = {};
           		var myCallbacks = {
					success: function(message){
						var userEventDataDTO = {userId: message.user_data.user_id,
												status: message.user_data.user_event_state,
												isMember: message.user_data.is_member,
												isManager: message.user_data.is_manager,
												isCreator: message.user_data.is_creator};
						var tempEvent = Alloy.createModel("event");	
						tempEvent.setFromJson(message.event);
						Alloy.Globals.successCallback(extCallbacks,{userEventData: userEventDataDTO, eventObj: tempEvent});
					},
					error: function(verificationError){
						Alloy.Globals.errorCallback(extCallbacks,verificationError);
					}
				}; 
           		
           		var restProxy = require('RestProxy');
           		restProxy.get(this, 
           			Ti.App.Properties.getString('webappRestAPI')+'/event/get_info/'+eventId+'/'+userId,
           			myCallbacks);
           },
           getEventTeams: function(eventId, extCallbacks){
           		var userEventData = {};
           		var myCallbacks = {
					success: function(message){
						var userTeamDataDTO = {success: message.success,
											   isSecondTeam: message.is_second_team};
						var localTeam = [];
						var visitorTeam = [];
						if(message.teams){
							if(message.teams.local){
								_.each(message.teams.local, function(localPlayer, index, list){
									localTeam.push({id: localPlayer.legacy_id, name: localPlayer.name});
								});
							}
							if(message.teams.visitor){
								_.each(message.teams.visitor, function(visitorPlayer, index, list){
									visitorTeam.push({id: visitorPlayer.legacy_id, name: visitorPlayer.name});
								});		
							}
						}
						
						Alloy.Globals.successCallback(extCallbacks,
							{userTeamData: userTeamDataDTO, localTeamArray: localTeam, visitorTeamArray: visitorTeam});
					},
					error: function(verificationError){
						Alloy.Globals.errorCallback(extCallbacks,verificationError);
					}
				}; 
           		
           		var restProxy = require('RestProxy');
           		restProxy.get(this, 
           			Ti.App.Properties.getString('webappRestAPI')+'/event/get_teams/'+eventId,
           			myCallbacks);
           },
           create: function(eventInfo, userId, extCallbacks){
           		
           		var myCallbacks = {
					success: function(message){
						var tempEvent = Alloy.createModel("event");
						tempEvent.setFromJson(message);
						Alloy.Globals.successCallback(extCallbacks, tempEvent);	
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
           },
           edit: function(eventInfo, userId, extCallbacks){
           		
           		var myCallbacks = {
					success: function(message){
						var tempEvent = Alloy.createModel("event");
						tempEvent.setFromJson(message);
						Alloy.Globals.successCallback(extCallbacks, tempEvent);	
					},
					error: function(verificationError){
						Alloy.Globals.errorCallback(extCallbacks,verificationError);
					}
				}; 
				
				var restDTO = {
					event_id: eventInfo.id,
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
           			Ti.App.Properties.getString('webappRestAPI')+'/event/edit',
           			myCallbacks, restDTO);
           },
           addForumComment: function(eventId, userId, comment, extCallbacks){
           		
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
           			Ti.App.Properties.getString('webappRestAPI')+'/event/forum/add_comment',
           			myCallbacks, {event_id: eventId, user_id:userId, message: comment});
           },
           getForumComments: function(eventId, extCallbacks){
           		
           		var myCallbacks = {
					success: function(message){
						Alloy.Globals.successCallback(extCallbacks, message);	
					},
					error: function(verificationError){
						Alloy.Globals.errorCallback(extCallbacks,verificationError);
					}
				}; 
				
           		var restProxy = require('RestProxy');
           		restProxy.get(this, 
           			Ti.App.Properties.getString('webappRestAPI')+'/event/forum/get_comments/'+eventId,
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