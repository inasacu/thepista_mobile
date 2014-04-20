
// Initial
var Global = {};
var UI = {};
var Control = {};
Global.eventModel = Alloy.createModel("event");
Global.vistorsCollection = [];
Global.localsCollection = [];
Alloy.Globals.eventViewsControllers["event_team"] = $;

UI = function(){
	return {
		pushDataIntoSection: function(collection, section, data){
			for(i=0;i<data.length;i++){
				var player = data[i];
				var imageFile = player.imageUrl || Ti.App.Properties.getString('imageNA');
				var changeButtonText = "";
				if(Alloy.Globals.userEventData.isMember===true){
					changeButtonText = "Cambiar";
				}
				var temp = {pic: {image: imageFile},
					        name: {text: player.name},
					        changeButton: {text: changeButtonText},
						    extData: {id: player.id}};
				Global[collection].push(temp);
			}
			$[section].setItems(Global[collection]);
		},
		pushMessageIntoSection: function(section, message){
			msg = {template: "messageTemplate", info: {text: message}};
			$[section].setItems([msg]);
		},
		getPlayerView: function(){
			
		}
	};
}();

Control = function(){
	return {
		init: function(){
			Global.eventModel.getEventTeams(Alloy.Globals.selectedEventObj.get("legacyId"), {
				success: function(data){
					Global.vistorsCollection = [];
					Global.localsCollection = [];
					if(_.isEmpty(data)){
						UI.pushMessageIntoSection("localTeamSection", "No se pudo recuperar el equipo");
						UI.pushMessageIntoSection("visitorTeamSection", "No se pudo recuperar el equipo");
					}else{
						UI.pushDataIntoSection("localsCollection", "localTeamSection", data.localTeamArray);
						UI.pushDataIntoSection("vistorsCollection", "visitorTeamSection", data.visitorTeamArray);
					}
				},
				error: function(data){
					UI.pushMessageIntoSection("localTeamSection", "No se pudo recuperar el equipo");
					UI.pushMessageIntoSection("visitorTeamSection", "No se pudo recuperar el equipo");
				}
			});	
		},
		changeUserTeam : function(userId){
			Global.eventModel.changeUserTeam(Alloy.Globals.selectedEventObj.get("legacyId"), userId, {
				success: function(data){
					Global.vistorsCollection = [];
					Global.localsCollection = [];
					if(_.isEmpty(data)){
						UI.pushMessageIntoSection("localTeamSection", "No se pudo recuperar el equipo");
						UI.pushMessageIntoSection("visitorTeamSection", "No se pudo recuperar el equipo");
					}else{
						UI.pushDataIntoSection("localsCollection", "localTeamSection", data.localTeamArray);
						UI.pushDataIntoSection("vistorsCollection", "visitorTeamSection", data.visitorTeamArray);
					}
				},
				error: function(data){
					UI.pushMessageIntoSection("localTeamSection", "No se pudo recuperar el equipo");
					UI.pushMessageIntoSection("visitorTeamSection", "No se pudo recuperar el equipo");
				}
			});
		}	
	};
}();

// reload
exports.reload = function(){
	Control.init();
};

// listeners

$.listViewTeams.addEventListener("itemclick", function(e){
	if(e.bindId=="changeButton" 
		&& Alloy.Globals.userEventData.isMember===true){
		var temp = undefined;
		switch(e.sectionIndex){
			case 0:
				temp = Global.localsCollection[e.itemIndex];
			break;
			case 1:
				temp = Global.vistorsCollection[e.itemIndex];
			break;
		}
		if(temp){
			Control.changeUserTeam(temp.extData.id);	
		}
	}
});

// first calls
Control.init();
