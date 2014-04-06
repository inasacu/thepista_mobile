
// Inner Modules
var UI = {};
var Global = {};

// Initial
Global.eventModel = Alloy.createModel("event");
Global.eventId;
Global.userEventData = {};
Alloy.Globals.eventViewsControllers["event_info"] = $;

// Constants
var LEFT_BUTTON = 1, RIGHT_BUTTON = 2;

UI = function(){
	return{
		buttonActions: function(buttonIndex){
			// if convocado -> ausente - ultima
			// if ausente -> convocado - ultima
			// if ultima -> convocado - ausente
			var newStatusCode;
			switch(buttonIndex){
				case LEFT_BUTTON:
					switch(Global.userEventData.status){
						case Ti.App.Properties.getInt('UGOING'):
						// ausente
						newStatusCode = Ti.App.Properties.getInt('UMISSING');
						break;
						case Ti.App.Properties.getInt('UMISSING'):
						// convocado
						newStatusCode = Ti.App.Properties.getInt('UGOING');
						break;
						case Ti.App.Properties.getInt('ULAST'):
						// convocado
						newStatusCode = Ti.App.Properties.getInt('UGOING');
						break;
					}
				break;
				case RIGHT_BUTTON:
					switch(Global.userEventData.status){
						case Ti.App.Properties.getInt('UGOING'):
						// ultima
						newStatusCode = Ti.App.Properties.getInt('ULAST');
						break;
						case Ti.App.Properties.getInt('UMISSING'):
						// ultima
						newStatusCode = Ti.App.Properties.getInt('ULAST');
						break;
						case Ti.App.Properties.getInt('ULAST'):
						// ausente
						newStatusCode = Ti.App.Properties.getInt('UMISSING');
						break;
					}
				break;
			};
			Global.eventModel.changeUserState(Global.eventId, 
				Global.userEventData.userId, newStatusCode, {
				success: function(data){
					if(data.userEventData && data.eventObj){
						Global.userEventData = data.userEventData;
						UI.setViewUserOptions();
						
						UI.setEventInfoView(data.eventObj);
					}else{
						alert(data.message);
					}
				}
			});	
		},
		setViewUserOptions: function(){
			var leftText = "";
			var rightText = "";
			var stateText = "";
			var stateColor = "";
			
			switch(Global.userEventData.status){
				case Ti.App.Properties.getInt('UGOING'):
				// ausente - ultima
					leftText = "Pasar a ausente";
				 	rightText = "Pasar a ultima hora";
				 	stateText = "Estas convocado";
				 	stateColor = "#5da423";
				break;
				case Ti.App.Properties.getInt('UMISSING'):
				// convocado - ultima
					leftText = "Pasar a convocado";
				 	rightText = "Pasar a ultima hora";
				 	stateText = "Estas ausente";
				 	stateColor = "red";
				break;
				case Ti.App.Properties.getInt('ULAST'):
				// convocado - ausente
					leftText = "Pasar a convocado";
				 	rightText = "Pasar a ausente";
				 	stateText = "Estas para ultima hora";
				 	stateColor = "#ff9933";
				break;
			}
			
			$.stateOneButton.buttonViewLabel.text = leftText;
			$.stateTwoButton.buttonViewLabel.text = rightText;
			$.userEventStatusBar.backgroundColor = stateColor;
			$.userEventStatusLabel.text = stateText;
			
			// evaluate if admin options should be shown
			var adminOptions = $.adminOptionListView;
			if(adminOptions){
				if(Global.userEventData.isManager===true
					|| Global.userEventData.isCreator===true){
					$.adminOptionListView.show();
				}else{
					$.principalView.remove(adminOptions);
				}
			}
		},
		setEventInfoView: function(currentEvent){
			if(_.isEmpty(currentEvent) || isNaN(currentEvent.get("legacyId"))){
				alert("No se pudo recuperar el evento ");
			}
			else{
				$.eventName.text = currentEvent.get("name");
				$.eventGroup.text = currentEvent.get("group").name;
				$.eventDate.text = Alloy.Globals.longDateTimeFormat(
								   currentEvent.get("weekDay"), 
								   currentEvent.get("startDate"),
						   		   currentEvent.get("startTime"));
				$.eventPlace.text = currentEvent.get("place").name;
				$.eventFee.text = currentEvent.get("fee")+" \u20ac";
				$.roosterGoing.text = currentEvent.get("peopleInfo").comming;
				$.roosterMissing.text = currentEvent.get("peopleInfo").missing;
			}
		}
	};
}();

function init(initArgs){
	// Always hide the admin options
	$.adminOptionListView.hide();
	
	if(!_.isEmpty(initArgs)){
		Global.eventId = initArgs.eventId;
		if(Global.eventId){
			
			Global.eventModel.getUserAndEventData(Global.eventId, Alloy.Globals.getLoggedUser().get("legacyId"), {
				success: function(respObj){
					if(respObj.userEventData && respObj.eventObj){
						UI.setEventInfoView(respObj.eventObj);
						
						Global.userEventData = respObj.userEventData;
						UI.setViewUserOptions();
					}else{
						alert("No pudo ser obtenida la información del evento");
						Alloy.Globals.eventDetailparentWindow.close();
					}
				},
				error: function(errorObj){
					alert("No pudo ser obtenida la información del evento");
					Alloy.Globals.eventDetailparentWindow.close();
				}
			});
		}else{
			alert("No se pudo obtener el evento");
			Alloy.Globals.eventDetailparentWindow.close();
		}
	}else{
		alert("No se pudo obtener el evento");
		Alloy.Globals.eventDetailparentWindow.close();
	}	
}

exports.reload = function(reloadArgs){
	init(reloadArgs);
};

// Listeners
$.stateOneButton.buttonView.addEventListener("click", function(e){
	UI.buttonActions(LEFT_BUTTON);
});

$.stateTwoButton.buttonView.addEventListener("click", function(e){
	UI.buttonActions(RIGHT_BUTTON);
});

$.adminOptionListView.addEventListener("itemclick", function(e){
	if(Alloy.Globals.eventDetail){
		switch(e.itemIndex){
			case 0:
				Alloy.Globals.openWindow($.event_info, "event/event_edition");
			break;
			case 1:
				Alloy.Globals.openWindow($.event_info, "event/event_edition");
			break;
		}
	}else{
		// could not get the event id
	}
});

// Initial call
init(Alloy.Globals.eventDetail);