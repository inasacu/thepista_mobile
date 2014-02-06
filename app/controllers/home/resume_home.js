
// Initial
var loggedUser = Alloy.Globals.UI.getLoggedUser();
var event = Alloy.createModel("event");
var activeEventsCollection = [];
var groupEventsCollection = [];

function activeEvents(){
	event.getActiveByUser(loggedUser.legacyId, {
		success: function(data){
			var responseObj = data.responseJSON;
			
			if(Alloy.Globals.verifyAPICall(responseObj.code)){
				
				var message = responseObj.message;
				activeEventsCollection = [];
				
				for(i=0;i<message.length;i++){
					var obj = message[i];
					var tempEvent = Alloy.createModel("event");
					tempEvent.setFromJson(obj);
					var temp = {name: {text: tempEvent.get("name")}, 
							   group: {text: tempEvent.get("groupName")},
							   date: {text: Alloy.Globals.longDateFormat(tempEvent.get("weekDay"), tempEvent.get("startDate"))
							   		  +" - "+tempEvent.get("startTime")+"h"}, 
							   pic: {image: '/test.png'},
							   extData: {id: tempEvent.get("legacyId")}};
					activeEventsCollection.push(temp);
				}
				
			}
			else{
				Titanium.API.info("SUCCESS WITH ERRORS"+JSON.stringify(data));	
			}
			
			if(_.isEmpty(activeEventsCollection)){
				var msg = {template: "messageTemplate", info: {text: "No estas apuntado a ningún evento"}};
				activeEventsCollection.push(msg);	
			}
			
			$.myEventsListSection.setItems(activeEventsCollection);
		},
		error: function(data){
			var msg = {template: "messageTemplate", info: {text: "No se pudieron obtener tus eventos, intenta de nuevo"}};
			activeEventsCollection.push(msg);
			$.myEventsListSection.setItems(activeEventsCollection);
			
			Titanium.API.info("ERROR "+JSON.stringify(data));
		}
	});	
}

function groupEvents(){
	event.getActiveByUserGroups(loggedUser.legacyId, {
		success: function(data){
			var responseObj = data.responseJSON;
			
			if(Alloy.Globals.verifyAPICall(responseObj.code)){
				
				var message = responseObj.message;
				groupEventsCollection = [];
				
				for(i=0;i<message.length;i++){
					var obj = message[i];
					var tempEvent = Alloy.createModel("event");
					tempEvent.setFromJson(obj);
					var temp = {name: {text: tempEvent.get("name")}, 
							   group: {text: tempEvent.get("groupName")},
							   date: {text: Alloy.Globals.longDateFormat(tempEvent.get("weekDay"), tempEvent.get("startDate"))
							   		  +" - "+tempEvent.get("startTime")+"h"}, 
							   pic: {image: '/test.png'},
							   extData: {id: tempEvent.get("legacyId")}};
					groupEventsCollection.push(temp);
				}
				
			}
			else{
				// should add function to handle different types of errors
				Titanium.API.info("SUCCESS WITH ERRORS"+JSON.stringify(data));	
			}
			
			if(_.isEmpty(groupEventsCollection)){
				var msg = {template: "messageTemplate", info: {text: "Tus grupos no tienen eventos activos"}};
				groupEventsCollection.push(msg);	
			}
			
			$.myGroupsEventsListSection.setItems(groupEventsCollection);
		},
		error: function(data){
			var msg = {template: "messageTemplate", info: {text: "No se pudieron obtener los eventos de interes, intenta de nuevo"}};
			groupEventsCollection.push(msg);
			$.myGroupsEventsListSection.setItems(groupEventsCollection);
			
			Titanium.API.info("ERROR "+JSON.stringify(data));
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
			temp = activeEventsCollection[e.itemIndex];
		break;
		case 1:
			temp = groupEventsCollection[e.itemIndex];
		break;
	}
	var tempEvent = temp.extData;
	if(!_.isEmpty(tempEvent) && !isNaN(tempEvent.id)){
		Alloy.Globals.openWindow($.resume_home_win, "event/event_detail", {eventId: tempEvent.id});
	}
});



// first calls
activeEvents();
groupEvents();
