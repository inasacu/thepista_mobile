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
           		//this.set('active', jsonObject.active);
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
           },
           getById: function(eventId, callbacks){
           		var restProxy = require('RestProxy');
           		restProxy.get(this, 
           			Ti.App.Properties.getString('webappRestAPI')+'/event/by_id/'+eventId,
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