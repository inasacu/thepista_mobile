// Namespaces
var UI = {};
var Global = {};

// variables and initialization
Global.utilModel = Alloy.createModel('util');
Global.groupModel = Alloy.createModel('group');
Global.groupFormInfo = {};
Global.chosenSport = {};

// validation
Global.validate = require('hdjs.validate');
Global.validator = new Global.validate.FormValidator();

// user info should come in args
Global.args = arguments[0] || {};

UI = (function(){
	return {
		setGroupFormInfo: function(){
			Global.groupFormInfo.name = $.groupName.value;
			Global.groupFormInfo.creatorId = Alloy.Globals.getLoggedUser().get("legacyId");
			Global.groupFormInfo.sportId = Global.chosenSport.id;
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
			
			Global.validator.run([
		        {
		            id: 'groupName',
		            value: $.groupName.value,
		            display: 'Nombre',    
		            rules: 'required'
		        }
		    ], validationCallback);   
		},
		initCall: function(){
		}
	};
})();

// Listeners
$.optionListButton.buttonView.addEventListener("click", function(){
	Alloy.Globals.openWindow($.group_creation, "helpers/option_list", {
		showOption: "sport", 
		callback: function(chosenSport){
			$.optionListButton.buttonViewLabel.text = chosenSport.name;	
			Global.chosenSport = chosenSport;
		}
	});
});

$.submitButton.buttonView.addEventListener("click", function(){
	UI.validateForm(function(){
		UI.setGroupFormInfo();
		Global.groupModel.create(Global.groupFormInfo, {
			success: function(){
				alert("El grupo ha sido creado");
			},
			error: function(error){
				alert(error);
			}
		});	
	});
});   

$.cancelButton.buttonView.addEventListener("click", function(){
	$.group_creation.close();
});

$.stateBar.barLeftButton.addEventListener("click", function(){
	$.group_creation.close();
});
$.group_creation.addEventListener('android:back', function(){
    $.group_creation.close();
});
 
// Init call
UI.initCall();
