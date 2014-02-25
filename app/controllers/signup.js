// Namespaces
var UI = {};
var Global = {};

// variables and initialization
Global.utilModel = Alloy.createModel('util');
Global.userModel = Alloy.createModel('user');
Global.userFormInfo = {};
Global.chosenCity = {};

// validation
Global.validate = require('hdjs.validate');
Global.validator = new Global.validate.FormValidator();

// user info should come in args
Global.args = arguments[0] || {};

UI = (function(){
	return {
		setUserFormInfo: function(){
			Global.userFormInfo.name = $.userName.value;
			Global.userFormInfo.email = $.userEmail.value;
			Global.userFormInfo.phone = $.userTel.value;
			Global.userFormInfo.useWA = $.waSwitch.value;
			Global.userFormInfo.city = Global.chosenCity.id;
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
		            id: 'userName',
		            value: $.userName.value,
		            display: 'Name',    
		            rules: 'required'
		        },
		        {
		            id: 'userEmail',
		            value: $.userEmail.value,
		            display: 'Email',    
		            rules: 'required|valid_email'
		        },
		        {
		            id: 'userTel',
		            value: $.userTel.value,
		            display: 'Teléfono',    
		            rules: 'required|alpha_numeric'
		        }
		    ], validationCallback);   
		},
		initCall: function(){
			var user = Global.args.info;
	
			// form
			$.userEmail.setValue(user.get("email"));
			
			// user obj
			Global.userFormInfo.identityUrl = user.get("provider");
			Global.userFormInfo.provider = user.get("provider");
			Global.userFormInfo.uid = user.get("uid");
		}
	};
})();

// Listeners
$.optionListButton.buttonView.addEventListener("click", function(){
	Alloy.Globals.openWindow($.signup, "helpers/option_list", {
		showOption: "city", 
		callback: function(chosenCity){
			$.optionListButton.buttonViewLabel.text = chosenCity.name;	
			Global.chosenCity = chosenCity;
		}
	});
});

$.submitButton.buttonView.addEventListener("click", function(){
	UI.validateForm(function(){
		UI.setUserFormInfo();
		Global.userModel.register(Global.userFormInfo, {
			success: function(data){
				if(data){
					alert("Usuario registrado, espere un correo de confirmación");
					$.signup.close();
				}
			}
		});	
	});
});   

$.cancelButton.buttonView.addEventListener("click", function(){
	$.signup.close();
});

$.stateBar.barLeftButton.addEventListener("click", function(){
	$.signup.close();
});
$.signup.addEventListener('android:back', function(){
    $.signup.close();
});
 
// Init call
UI.initCall();
