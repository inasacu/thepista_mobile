
// Initial
var Global = {};
var UI = {};

Global.eventModel = Alloy.createModel("event");
Global.eventsCollection = [];
Global.offsetFactor = 0;

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

function historicalOfEvents(){
	Global.eventModel.getUserHistory(Alloy.Globals.getLoggedUser().get("legacyId"), Global.offsetFactor, {
		success: function(data){
			//Global.eventsCollection = [];
			if(_.isEmpty(Global.eventsCollection) && _.isEmpty(data)){
				UI.pushMessageIntoSection("historicalEventsListSection", "No estas apuntado a ningún evento");
			}else{
				if(!_.isEmpty(data)){
					UI.pushDataIntoSection("eventsCollection", "historicalEventsListSection", data);
					Global.offsetFactor++;
				}
			}
		},
		error: function(data){
			UI.pushMessageIntoSection("historicalEventsListSection", "No se pudieron obtener tus eventos, intenta de nuevo");
		}
	});	
}

// listeners
$.stateBar.barRightButton.addEventListener("click", function(){
	historicalOfEvents();
});

$.createEventButton.buttonView.addEventListener("click", function(){
	Alloy.Globals.openWindow($.events_home_win, "shared/general_list", {initOption:1});
});

$.listViewHistoricalEvents.addEventListener("itemclick", function(e){
	switch(e.sectionIndex){
		case 0:
			temp = Global.eventsCollection[e.itemIndex];
		break;
	}
	var tempEvent = temp.extData;
	if(!_.isEmpty(tempEvent) && !isNaN(tempEvent.id)){
		Alloy.Globals.eventDetail = {eventId: tempEvent.id};
		Alloy.Globals.openWindow($.events_home_win, "event/event_detail");
	}
});

// first calls
historicalOfEvents();
