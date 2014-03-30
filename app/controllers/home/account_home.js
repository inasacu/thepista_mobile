
// Inner Modules
var UI = {};
var Global = {};

// Initial
Global.userModel = Alloy.createModel("user");
Global.args = arguments[0] || {};

UI = function(){
	return{ 
		setViewUserOptions: function(){
		
		},
		setUserInfoView: function(currentUser){
			if(_.isEmpty(currentUser) || isNaN(currentUser.get("legacyId"))){
				alert("No se pudo recuperar la información de la cuenta");
			}
			else{
				$.userName.setText(currentUser.get("name"));
				$.userEmail.setText(currentUser.get("email"));
				$.userPhone.setText(currentUser.get("phone"));
				$.userWA.setText(currentUser.get("waActive") ? "Si" : "No");
			}
		}
	};
}();

function init(initArgs){
	Global.userModel.getUserAccountInfo(Alloy.Globals.getLoggedUser().get("legacyId"), {
		success: function(userObj){
			if(userObj && userObj.get("legacyId")){
				UI.setUserInfoView(userObj);	
			}else{
				alert("No se pudo obtener la información de la cuenta");
			}
		}
	});
}

// Listeners
$.logOutButton.buttonView.addEventListener("click", function(){
	Global.userModel.logout(Alloy.Globals.getLoggedUser().get("legacyId"), {
		success: function(message){
			Alloy.Globals.openWindow($.user_account, "index");
			//Alloy.Globals.homeTabWindow.close();
		},
		error: function(){
			alert("No se pudo cerrar la sesión");
		}
	});
});

$.stateBar.barRightButton.addEventListener("click", function(){
	init();
});


// Initial call
init(Global.args);