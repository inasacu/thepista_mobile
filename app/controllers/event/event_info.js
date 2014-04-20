
// Inner Modules and namespaces
var UI = {};
var Control = {};
var Global = {};

// Initial
Global.eventModel = Alloy.createModel("event");
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
					switch(Alloy.Globals.userEventData.status){
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
					switch(Alloy.Globals.userEventData.status){
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
			Global.eventModel.changeUserState(Alloy.Globals.selectedEventObj.get("legacyId"), 
				Alloy.Globals.userEventData.userId, newStatusCode, {
				success: function(data){
					if(data.userEventData && data.eventObj){
						Alloy.Globals.userEventData = data.userEventData;
						Alloy.Globals.selectedEventObj = data.eventObj;
						
						UI.setViewUserOptions();
						UI.setEventInfoView();
					}else{
						alert(data.message);
					}
				}
			});	
		},
		setViewUserOptions: function(){
			
			// Check if user is member
			if(Alloy.Globals.userEventData.isMember===true){
				var leftText = "";
				var rightText = "";
				var stateText = "";
				var stateColor = "";
				
				switch(Alloy.Globals.userEventData.status){
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
			}else{
				$.eventInfoBox.remove($.userEventStatusBar);
				$.eventInfoBox.remove($.changeStateButtonBox);
			}
			
			
			// evaluate if admin options should be shown
			var adminOptions = $.adminOptionListView;
			if(adminOptions){
				if(Alloy.Globals.userEventData.isManager===true
					|| Alloy.Globals.userEventData.isCreator===true){
					$.adminOptionListView.show();
				}else{
					$.principalView.remove(adminOptions);
				}
			}
		},
		setEventInfoView: function(){
			if(_.isEmpty(Alloy.Globals.selectedEventObj) 
				|| isNaN(Alloy.Globals.selectedEventObj.get("legacyId"))){
				alert("No se pudo recuperar el evento ");
			}
			else{
				$.eventName.text = Alloy.Globals.selectedEventObj.get("name");
				$.eventGroup.text = Alloy.Globals.selectedEventObj.get("group").name;
				$.eventDate.text = Alloy.Globals.longDateTimeFormat(
								   Alloy.Globals.selectedEventObj.get("weekDay"), 
								   Alloy.Globals.selectedEventObj.get("startDate"),
						   		   Alloy.Globals.selectedEventObj.get("startTime"));
				$.eventPlace.text = Alloy.Globals.selectedEventObj.get("place").name;
				$.eventFee.text = Alloy.Globals.selectedEventObj.get("fee")+" \u20ac";
				$.roosterGoing.text = Alloy.Globals.selectedEventObj.get("peopleInfo").comming;
				$.roosterMissing.text = Alloy.Globals.selectedEventObj.get("peopleInfo").missing;
			}
		}
	};
}();

Control = function(){
	return {
		init: function(){
			// Always hide the admin options
			$.adminOptionListView.hide();
			
			if(!_.isEmpty(Alloy.Globals.selectedEventObj)){
				if(Alloy.Globals.selectedEventObj.get("legacyId")){
					
					UI.setEventInfoView();
					UI.setViewUserOptions();
					
				}else{
					alert("No se pudo obtener el evento");
					Alloy.Globals.eventDetailparentWindow.close();
				}
			}else{
				alert("No se pudo obtener el evento");
				Alloy.Globals.eventDetailparentWindow.close();
			}	
		}
	};
}();


exports.reload = function(){
	Control.init();
};

// Listeners
$.stateOneButton.buttonView.addEventListener("click", function(e){
	UI.buttonActions(LEFT_BUTTON);
});

$.stateTwoButton.buttonView.addEventListener("click", function(e){
	UI.buttonActions(RIGHT_BUTTON);
});

$.adminOptionListView.addEventListener("itemclick", function(e){
	if(Alloy.Globals.selectedEventObj){
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
Control.init();