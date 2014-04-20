
// Modules and namespaces
var UI = {};
var Control = {};
var Global = {};

// Initial
Global.groupModel = Alloy.createModel("group");
Global.eventModel = Alloy.createModel("event");
Global.venueModel = Alloy.createModel("venue");
Global.myCollection = [];

// constants
Global.Constants = {};
Global.Constants.GROUPS_EVENT_CREATION = 1;
Global.Constants.GROUP_MEMBERS = 2;
Global.Constants.GROUP_EVENTS = 3;
Global.Constants.VENUE_EVENTS = 4;

Global.args = arguments[0] || {};

UI = function(initArgs){
	var myArgs = initArgs;
	return {
		fillWithUsers: function(collection, section, data){
			var tempUser = data[i];
			var imageFile = tempUser.get("imageURL") || Ti.App.Properties.getString('imageNA');
			var temp = {label1: {text: tempUser.get("name")},
					    pic: {image: imageFile}};
			Global[collection].push(temp);
		},
		fillWithGroups: function(collection, section, data){
			var tempGroup = data[i];
			var imageFile = tempGroup.get("imageURL") || Ti.App.Properties.getString('imageNA');
			var temp = {label1: {text: tempGroup.get("name")},
						label2: {text: tempGroup.get("memberQ")+" Miembros"}, 
					    pic: {image: imageFile},
					    extData: {group:{id: tempGroup.get("legacyId"), name: tempGroup.get("name")}} };
			Global[collection].push(temp);
		},
		fillWithEvents: function(collection, section, data){
			var tempEvent = data[i];
			var imageFile = tempEvent.get("imageURL") || Ti.App.Properties.getString('imageNA');
			var temp = {label1: {text: tempEvent.get("name")},
						label2: {text: Alloy.Globals.longDateTimeFormat(tempEvent.get("weekDay"), 
						    	 tempEvent.get("startDate"), tempEvent.get("startTime"))}, 
					    pic: {image: imageFile},
					    extData: {eventId: tempEvent.get("legacyId")} };
			Global[collection].push(temp);
		},
		pushGroupDataIntoSection: function(collection, section, data){
			for(i=0;i<data.length;i++){
				switch(myArgs.initOption){
					case Global.Constants.GROUPS_EVENT_CREATION:
						UI.fillWithGroups(collection, section, data);
					break;
					case Global.Constants.GROUP_MEMBERS:
						UI.fillWithUsers(collection, section, data);
					break;
					case Global.Constants.GROUP_EVENTS:
						UI.fillWithEvents(collection, section, data);
					break;
					case Global.Constants.VENUE_EVENTS:
						UI.fillWithEvents(collection, section, data);
					break;
				}
			}
			$[section].setItems(Global[collection]);
		},
		pushMessageIntoSection: function(section, message){
			msg = {template: "messageTemplate", info: {text: message}};
			$[section].setItems([msg]);
		},
		setIntroMessage: function(msg){
			$.introMessage.setText(msg);
		}
	};
}(Global.args);

Control = function(initArgs){
	var myArgs = initArgs;
	return {
		init: function(){
			switch(myArgs.initOption){
				case Global.Constants.GROUPS_EVENT_CREATION:
					Control.groupsForEventCreationInit();
				break;
				case Global.Constants.GROUP_MEMBERS:
					Control.groupMembersInit();
				break;
				case Global.Constants.GROUP_EVENTS:
					Control.groupEventsInit();
				break;
				case Global.Constants.VENUE_EVENTS:
					Control.venueEventsInit();
				break;
			}
		},
		groupsForEventCreationInit: function(){
			$.stateBar.barTitle.setText("Grupo del evento");
			$.listSectionElement.setHeaderTitle("Tus grupos");
			
			$.listViewElement.addEventListener("itemclick", function(e){
				switch(e.sectionIndex){
					case 0:
						temp = Global.myCollection[e.itemIndex];
					break;
				}
				var tempGroup = temp.extData.group;
				if(!_.isEmpty(tempGroup) && !isNaN(tempGroup.id)){
					Alloy.Globals.openWindow($.general_list, "event/event_creation", {group: tempGroup});
					$.general_list.close();
				}
			});
			
			Global.groupModel.getByUser(Alloy.Globals.getLoggedUser().get("legacyId"), {
				success: function(data){
					Global.myCollection = [];
					if(_.isEmpty(data)){
						UI.setIntroMessage("Para poder crear un evento debes ser administrador de un grupo");
						UI.pushMessageIntoSection("listSectionElement", "No estas inscrito en ningún grupo");
					}else{
						UI.setIntroMessage("Escoge el grupo para al que quieres crear el evento");
						UI.pushGroupDataIntoSection("myCollection", "listSectionElement", data);
					}
				},
				error: function(data){
					UI.pushMessageIntoSection("listSectionElement", "No se pudieron obtener tus grupos, intenta de nuevo");
				}
			});	
		},
		groupMembersInit: function(){
			$.stateBar.barTitle.setText("Miembros del grupo");
			//$.listSectionElement.setHeaderTitle("Tus grupos");
			
			if(myArgs.groupId){
				Global.groupModel.getGroupMembers(myArgs.groupId, {
					success: function(users){
						Global.myCollection = [];
						if(_.isEmpty(users)){
							UI.setIntroMessage("No hay ningún miembro en el grupo");
							//UI.pushMessageIntoSection("listSectionElement", "No estas inscrito en ningún grupo");
						}else{
							//UI.setIntroMessage("Estos son los miembros del grupo");
							UI.pushGroupDataIntoSection("myCollection", "listSectionElement", users);
						}
					},
					error: function(data){
						UI.pushMessageIntoSection("listSectionElement", "No se pudieron obtener tus grupos, intenta de nuevo");
					}
				});		
			}else{
				alert("No se pudo obtener la lista de miembros");
				$.general_list.close();
			}
		},
		groupEventsInit: function(){
			$.stateBar.barTitle.setText("Eventos del grupo");
			//$.listSectionElement.setHeaderTitle("Tus grupos");
			
			if(myArgs.groupId){
				Global.groupModel.getGroupEvents(myArgs.groupId, {
					success: function(events){
						Global.myCollection = [];
						if(_.isEmpty(events)){
							UI.setIntroMessage("No hay ningún evento para el grupo");
							//UI.pushMessageIntoSection("listSectionElement", "No estas inscrito en ningún grupo");
						}else{
							//UI.setIntroMessage("Estos son los eventos del grupo");
							UI.pushGroupDataIntoSection("myCollection", "listSectionElement", events);
						}
					},
					error: function(data){
						UI.pushMessageIntoSection("listSectionElement", "No se pudieron obtener los eventos del grupos, intenta de nuevo");
					}
				});	
				
				$.listViewElement.addEventListener("itemclick", function(e){
					switch(e.sectionIndex){
						case 0:
							temp = Global.myCollection[e.itemIndex];
						break;
					}
					var tempEvent = temp.extData;
					if(!_.isEmpty(tempEvent) && !isNaN(tempEvent.eventId)){
						Alloy.Globals.selectedEventInfo = {eventId: tempEvent.eventId};
						Alloy.Globals.openWindow($.general_list, "event/event_detail");
						$.general_list.close();
					}
				});
					
			}else{
				alert("No se pudo obtener la lista de eventos");
				$.general_list.close();
			}
		},
		venueEventsInit: function(){
			$.stateBar.barTitle.setText("Eventos de la instalación");
			//$.listSectionElement.setHeaderTitle("Tus grupos");
			
			if(myArgs.venueId){
				Global.venueModel.getVenueEvents(myArgs.venueId, {
					success: function(events){
						Global.myCollection = [];
						if(_.isEmpty(events)){
							UI.setIntroMessage("No hay ningún evento para la instalación");
							//UI.pushMessageIntoSection("listSectionElement", "No estas inscrito en ningún grupo");
						}else{
							//UI.setIntroMessage("Estos son los eventos del grupo");
							UI.pushGroupDataIntoSection("myCollection", "listSectionElement", events);
						}
					},
					error: function(data){
						UI.pushMessageIntoSection("listSectionElement", "No se pudieron obtener los eventos de la instalación, intenta de nuevo");
					}
				});		
			}else{
				alert("No se pudo obtener la lista de eventos");
				$.general_list.close();
			}
		}
	};
}(Global.args);

// listeners
$.stateBar.barRightButton.addEventListener("click", function(){
	Control.init();
});

$.stateBar.barLeftButton.addEventListener("click", function(){
	$.general_list.close();
});
$.general_list.addEventListener('android:back', function(){
    $.general_list.close();
});

Control.init();
