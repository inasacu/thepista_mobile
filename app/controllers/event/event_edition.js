// Namespaces
var UI = {};
var Global = {};

// variables and initialization
Global.eventModel = Alloy.createModel('event');
Global.eventEditModel = undefined;
Global.eventFormInfo = {};
Global.chosenDateTime = {};

// validation
Global.validate = require('hdjs.validate');
Global.validator = new Global.validate.FormValidator();

UI = (function(){
	return {
		setEventFormInfo: function(){
			if(Global.eventEditModel.get("group")){
				Global.eventFormInfo.groupId = Global.eventEditModel.get("group").id;	
			}
			Global.eventFormInfo.id = Global.eventEditModel.get("legacyId");
			Global.eventFormInfo.playerLimit = $.playerLimit.getValue();
			Global.eventFormInfo.fee = $.eventFee.getValue();
			Global.eventFormInfo.name = $.eventName.getValue();
			Global.eventFormInfo.date = Global.chosenDateTime.pickedDate;
			Global.eventFormInfo.time = Global.chosenDateTime.pickedTime;
		},
		setEventInfoView: function(){
			if(Global.eventEditModel){
				// date
				var tempDate = new Date(Global.eventEditModel.get("startDateTimeMillis"));
				Global.chosenDateTime.pickedDate = tempDate.getTime();
				Global.chosenDateTime.pickedTime = tempDate.getTime();
				
				$.groupName.setText(Global.eventEditModel.get("group").name);
				$.playerLimit.setValue(Global.eventEditModel.get("playerLimit"));
				$.eventFee.setValue(Global.eventEditModel.get("fee"));
				$.eventName.setValue(Global.eventEditModel.get("name"));
				$.dateOptionButton1.buttonViewLabel.setText(
					Alloy.Globals.formatPickedDate(Global.eventEditModel.get("startDateTimeMillis"), 1));
			}
		},
		validateForm: function(outerCallback){
			
			var validationCallback = function(errors) {
			    if(errors.length > 0) {
			        for (var i = 0; i < errors.length; i++) {
			            Ti.API.debug(errors[i].message);
			        }
			        alert(errors[0].message);
			    } else {
			        outerCallback();
			    }
			};
			
			if(Global.chosenDateTime.pickedDate 
				&& Global.chosenDateTime.pickedTime){
				Global.validator.run([
			        {
			            id: 'eventName',
			            value: $.eventName.getValue(),
			            display: 'Nombre',    
			            rules: 'required'
			        },
			        {
			            id: 'playerLimit',
			            value: $.playerLimit.getValue(),
			            display: 'Limite de jugadores',    
			            rules: 'required|numeric'
			        },
			        {
			            id: 'eventFee',
			            value: $.eventFee.getValue(),
			            display: 'Precio',    
			            rules: 'required|numeric'
			        }
			    ], validationCallback); 	
			}else{
				alert("El campo Fecha de inicio es requerido");
			}
		},
		initCall: function(initArgs){
			
			if(!_.isEmpty(initArgs)){
				Global.eventId = initArgs.eventId;
				if(Global.eventId){
					
					Global.eventModel.getUserAndEventData(Global.eventId, Alloy.Globals.getLoggedUser().get("legacyId"), {
						success: function(respObj){
							if(respObj.eventObj){
								Global.eventEditModel = respObj.eventObj;
								UI.setEventInfoView();
							}else{
								alert("No pudo ser obtenida la información del evento");
								$.event_edition.close();
							}
						},
						error: function(errorObj){
							alert("No pudo ser obtenida la información del evento");
							$.event_edition.close();
						}
					});
				}else{
					alert("No se pudo obtener el evento");
					$.event_edition.close();
				}
			}else{
				alert("No se pudo obtener el evento");
				$.event_edition.close();
			}	
			
		}
	};
})();

// Listeners
$.dateOptionButton1.buttonView.addEventListener("click", function(){
	Alloy.Globals.openWindow($.event_edition, "helpers/date_picker", {
		dateTitle: "Fecha de inicio",
		callback: function(chosenDateTime){
			var formattedDateTime = Alloy.Globals.formatPickedDate(chosenDateTime);
			$.dateOptionButton1.buttonViewLabel.text = formattedDateTime;	
			Global.chosenDateTime = chosenDateTime;
		}
	});
});

$.submitButton.buttonView.addEventListener("click", function(){
	UI.validateForm(function(){
		UI.setEventFormInfo();
		Global.eventModel.edit(Global.eventFormInfo, Alloy.Globals.getLoggedUser().get("legacyId"), {
			success: function(newEvent){
				alert("Evento editado");
				//$.event_edition.close();
			},
			error: function(error){
				alert(error.message);
			}
		});	
	});
});   

$.cancelButton.buttonView.addEventListener("click", function(){
	$.event_edition.close();
});

$.stateBar.barLeftButton.addEventListener("click", function(){
	$.event_edition.close();
});
$.event_edition.addEventListener('android:back', function(){
    $.event_edition.close();
});
 
// Init call
UI.initCall(Alloy.Globals.eventDetail);
