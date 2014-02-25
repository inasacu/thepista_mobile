
// Inner Modules
var UI = {};
var Global = {};

// Initial
Global.eventModel = Alloy.createModel("event");
Global.eventId;
Global.userEventData = {};
Global.args = {eventId: 427};
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
						if(data.userId){
							Global.userEventData = data;
							UI.setViewUserOptions();
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
		},
		setEventInfoView: function(currentEvent){
			if(_.isEmpty(currentEvent) || isNaN(currentEvent.get("legacyId"))){
				alert("No se pudo recuperar el evento ");
			}
			else{
				$.eventName.text = currentEvent.get("name");
				$.eventGroup.text = currentEvent.get("groupName");
				$.eventDate.text = Alloy.Globals.longDateTimeFormat(
								   currentEvent.get("weekDay"), 
								   currentEvent.get("startDate"),
						   		   currentEvent.get("startTime"));
				$.eventPlace.text = 'CD Generico, Campo 1';
				$.eventFee.text = currentEvent.get("fee")+" \u20ac";
				$.roosterGoing.text = 1;
				$.roosterMissing.text = 14;
			}
		}
	};
}();

function init(initArgs){
	if(!_.isEmpty(initArgs)){
		Global.eventId = initArgs.eventId;
		
		Global.eventModel.getById(Global.eventId, {
			success: function(event){
				UI.setEventInfoView(event);
			}
		});
		
		Global.eventModel.getUserEventData(Global.eventId, Alloy.Globals.getLoggedUser().get("legacyId"), {
			success: function(userData){
				Global.userEventData = userData;
				UI.setViewUserOptions();
			}
		});
		
	}else{
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

// Initial call
init(Global.args);