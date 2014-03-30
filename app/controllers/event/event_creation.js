// Namespaces
var UI = {};
var Global = {};

// variables and initialization
Global.eventModel = Alloy.createModel('event');
Global.eventFormInfo = {};
Global.chosenDateTime = {};
Global.group = {};

// validation
Global.validate = require('hdjs.validate');
Global.validator = new Global.validate.FormValidator();

// group info should come in args
Global.args = arguments[0] || {group:{id: 33, name: "AJA"}};

UI = (function(){
	return {
		setEventFormInfo: function(){
			if(Global.group){
				Global.eventFormInfo.groupId = Global.group.id;	
			}
			Global.eventFormInfo.playerLimit = $.playerLimit.getValue();
			Global.eventFormInfo.fee = $.eventFee.getValue();
			Global.eventFormInfo.name = $.eventName.getValue();
			Global.eventFormInfo.date = Global.chosenDateTime.pickedDate;
			Global.eventFormInfo.time = Global.chosenDateTime.pickedTime;
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
			Global.group = initArgs.group;
		
			// form
			if(Global.group){
				$.groupName.setText(Global.group.name);	
			}
		}
	};
})();

// Listeners
$.dateOptionButton1.buttonView.addEventListener("click", function(){
	Alloy.Globals.openWindow($.event_creation, "helpers/date_picker", {
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
		Global.eventModel.create(Global.eventFormInfo, Alloy.Globals.getLoggedUser().get("legacyId"), {
			success: function(newEvent){
				alert("Evento creado");
				Alloy.Globals.eventDetail = {eventId: newEvent.get("legacyId")};
				Alloy.Globals.openWindow($.event_creation, "event/event_detail");
				$.event_creation.close();
			},
			error: function(error){
				alert(error.message);
			}
		});	
	});
});   

$.cancelButton.buttonView.addEventListener("click", function(){
	$.event_creation.close();
});

$.stateBar.barLeftButton.addEventListener("click", function(){
	$.event_creation.close();
});
$.event_creation.addEventListener('android:back', function(){
    $.event_creation.close();
});
 
// Init call
UI.initCall(Global.args);
