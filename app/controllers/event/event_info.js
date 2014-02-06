
// Initial
var loggedUser = Alloy.Globals.UI.getLoggedUser();
var eventModel = Alloy.createModel("event");
var eventId;

var args = arguments[0] || {};

function init(){
	if(!_.isEmpty(args)){
		eventId = args.eventId;
		getEvent(eventId);
	}else{
	}	
}

function getEvent(eventId){
	eventModel.getById(eventId, {
		success: function(data){
			var responseObj = data.responseJSON;
			
			if(Alloy.Globals.verifyAPICall(responseObj.code)){
				
				var message = responseObj.message;
				event = Alloy.createModel("event");
				event.setFromJson(message);
				
				if(_.isEmpty(event)){
					alert("No se pudo recuperar el evento");
				}
			}
			else{
				Titanium.API.info("SUCCESS WITH ERRORS"+JSON.stringify(data));	
			}
		},
		error: function(data){
			Titanium.API.info("ERROR "+JSON.stringify(data));
			alert("No se pudo recuperar el evento");
		}
	});	
}

//init();