
// Initial
var Global = {};
var UI = {};
Global.eventModel = Alloy.createModel("event");
Global.activeEventsCollection = [];
Global.groupEventsCollection = [];

UI = function(){
	return {
		pushDataIntoSection: function(collection, section, data){
			for(i=0;i<data.length;i++){
				var tempEvent = data[i];
				var imageFile = tempEvent.get("imageURL") || Ti.App.Properties.getString('imageNA');
				var temp = {name: {text: tempEvent.get("name")}, 
						    group: {text: tempEvent.get("group").name},
						    date: {text: Alloy.Globals.longDateTimeFormat(tempEvent.get("weekDay"), 
						    	  tempEvent.get("startDate"), tempEvent.get("startTime"))}, 
						    pic: {image: imageFile},
						    extData: {id: tempEvent.get("legacyId")}};
				Global[collection].push(temp);
			}
			$[section].setItems(Global[collection]);
		},
		pushMessageIntoSection: function(section, message){
			msg = {template: "messageTemplate", info: {text: message}};
			$[section].setItems([msg]);
		}
	};
}();

function activeEvents(){
	Global.eventModel.getActiveByUser(Alloy.Globals.getLoggedUser().get("legacyId"), {
		success: function(data){
			Global.activeEventsCollection = [];
			if(_.isEmpty(data)){
				UI.pushMessageIntoSection("myEventsListSection", "No estas apuntado a ningún evento");
			}else{
				UI.pushDataIntoSection("activeEventsCollection", "myEventsListSection", data);
			}
		},
		error: function(data){
			UI.pushMessageIntoSection("myEventsListSection", "No se pudieron obtener tus eventos, intenta de nuevo");
		}
	});	
}

function groupEvents(){
	Global.eventModel.getActiveByUserGroups(Alloy.Globals.getLoggedUser().get("legacyId"), {
		success: function(data){
			Global.groupEventsCollection = [];
			if(_.isEmpty(data)){
				UI.pushMessageIntoSection("myGroupsEventsListSection", "Tus grupos no tienen eventos");
			}else{
				UI.pushDataIntoSection("groupEventsCollection", "myGroupsEventsListSection", data);
			}
		},
		error: function(data){
			UI.pushMessageIntoSection("myGroupsEventsListSection", "No se pudieron obtener tus eventos, intenta de nuevo");
		}
	});	
}

// listeners
$.stateBar.barRightButton.addEventListener("click", function(){
	activeEvents();
	groupEvents();
});

$.listViewResume.addEventListener("itemclick", function(e){
	switch(e.sectionIndex){
		case 0:
			temp = Global.activeEventsCollection[e.itemIndex];
		break;
		case 1:
			temp = Global.groupEventsCollection[e.itemIndex];
		break;
	}
	
	var tempEvent = (temp) ? temp.extData : undefined;
	if(!_.isEmpty(tempEvent) && !isNaN(tempEvent.id)){
		Alloy.Globals.eventDetail = {eventId: tempEvent.id};
		Alloy.Globals.openWindow($.resume_home_win, "event/event_detail");
	}
});

// first calls
activeEvents();
groupEvents();
