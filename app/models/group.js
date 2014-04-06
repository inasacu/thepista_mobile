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
           		this.set('name', jsonObject.name);
           		this.set('memberQ', jsonObject.number_of_members);
           		this.set('secondTeamName', jsonObject.second_team);	
           		this.set('conditions', jsonObject.conditions);	
           		this.set('playerLimit', jsonObject.player_limit);
           		this.set('eventsQ', jsonObject.number_of_events);	
           		
           		if(jsonObject.sport){
           			this.set('sport', {id: jsonObject.sport.id, name: jsonObject.sport.name});
           		}
           		
           		if(jsonObject.managers){
           			tempManagers = [];
           			_.each(jsonObject.managers, function(element, index, list){
           				tempManagers.push({id: element.id, name: element.name});
           			});
           			this.set('managers', tempManagers);
           		}
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
           },
           create: function(groupInfo, extCallbacks){
           		
           		var myCallbacks = {
					success: function(message){
						var tempGroup = Alloy.createModel("group");
						tempGroup.setFromJson(message);
						Alloy.Globals.successCallback(extCallbacks,tempGroup);	
					},
					error: function(verificationError){
						Alloy.Globals.errorCallback(extCallbacks,verificationError);
					}
				}; 
				
				var restDTO = {
					group_name: groupInfo.name,
					group_sport: groupInfo.sportId,
					group_creator: groupInfo.creatorId
				};
           		
           		var restProxy = require('RestProxy');
           		restProxy.post(this, 
           			Ti.App.Properties.getString('webappRestAPI')+'/group/create_new',
           			myCallbacks, restDTO);
           },
           getGroupDetail: function(groupId, userId, extCallbacks){
           	
	           	var myCallbacks = {
					success: function(message){
						var tempGroup = Alloy.createModel("group");
						tempGroup.setFromJson(message.group);
						
						var userGroupDataDTO = undefined;
						if(message.user_data){
							userGroupDataDTO = {
								isMember: message.user_data.is_member,
								isCreator: message.user_data.is_creator,
								isManager: message.user_data.is_manager
							};		
						}
						Alloy.Globals.successCallback(extCallbacks,{group: tempGroup, userGroupData: userGroupDataDTO});	
					},
					error: function(verificationError){
						Alloy.Globals.errorCallback(extCallbacks,verificationError);
					}
				}; 
				
	       		var restProxy = require('RestProxy');
	       		restProxy.get(this, 
	       			Ti.App.Properties.getString('webappRestAPI')+'/group/get_info/'+groupId+"/"+userId,
	       			myCallbacks);
           	
          },
          getGroupMembers: function(groupId, extCallbacks){
           	
	           	var myCallbacks = {
					success: function(message){	
						var users = [];					
						_.each(message, function(element, index, list){
							var tempUser = Alloy.createModel("user");
							tempUser.setFromJson(element);
							users.push(tempUser);
	           			});
						
						Alloy.Globals.successCallback(extCallbacks,users);	
					},
					error: function(verificationError){
						Alloy.Globals.errorCallback(extCallbacks,verificationError);
					}
				}; 
				
	       		var restProxy = require('RestProxy');
	       		restProxy.get(this, 
	       			Ti.App.Properties.getString('webappRestAPI')+'/group/members/'+groupId,
	       			myCallbacks);
           	
          },
          getGroupEvents: function(groupId, extCallbacks){
           	
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
	       			Ti.App.Properties.getString('webappRestAPI')+'/group/events/'+groupId,
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