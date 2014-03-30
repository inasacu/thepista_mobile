
// Modules and namespaces
var UI = {};
var Global = {};

// Initial
Global.groupModel = Alloy.createModel("group");
Global.starredGroupsCollection = [];
Global.myGroupsCollection = [];

UI = function(){
	return {
		pushDataIntoSection: function(collection, section, data){
			for(i=0;i<data.length;i++){
				var tempGroup = data[i];
				var imageFile = tempGroup.get("imageURL") || Ti.App.Properties.getString('imageNA');
				var temp = {gname: {text: tempGroup.get("name")},
									gsize: {text: tempGroup.get("memberQ")+" Miembros"}, 
								    gpic: {image: imageFile},
								    extData: {id: tempGroup.get("legacyId")}};
				Global[collection].push(temp);
			}
			$[section].setItems(Global[collection]);
		},
		pushMessageIntoSection: function(section, message){
			msg = {template: "messageTemplate", info: {text: message}};
			$[section].setItems([msg]);
		}
	};
}();

function starredGroups(){
	Global.groupModel.getStarred({
		success: function(data){
			Global.starredGroupsCollection = [];
			if(_.isEmpty(data)){
				UI.pushMessageIntoSection("starredGroupsListSection", "No hay grupos destacados disponibles");
			}else{
				UI.pushDataIntoSection("starredGroupsCollection", "starredGroupsListSection", data);
			}
		},
		error: function(data){
			UI.pushMessageIntoSection("starredGroupsListSection", "No se pudieron obtener los grupos destacados, intenta de nuevo");
		}
	});	
}

function userGroups(){
	Global.groupModel.getByUser(Alloy.Globals.getLoggedUser().get("legacyId"), {
		success: function(data){
			Global.myGroupsCollection = [];
			if(_.isEmpty(data)){
				UI.pushMessageIntoSection("myGroupsListSection", "No estas inscrito en ningún grupo");
			}else{
				UI.pushDataIntoSection("myGroupsCollection", "myGroupsListSection", data);
			}
		},
		error: function(data){
			UI.pushMessageIntoSection("myGroupsListSection", "No se pudieron obtener tus grupos, intenta de nuevo");
		}
	});	
}

// listeners
$.listViewGroups.addEventListener("itemclick", function(e){
	switch(e.sectionIndex){
		case 0:
			temp = Global.myGroupsCollection[e.itemIndex];
		break;
		case 1:
			temp = Global.starredGroupsCollection[e.itemIndex];
		break;
	}
	var tempGroup = temp.extData;
	if(!_.isEmpty(tempGroup) && !isNaN(tempGroup.id)){
		Alloy.Globals.openWindow($.groups_home_win, "group/group_detail", {groupId: tempGroup.id});
	}
});

$.stateBar.barRightButton.addEventListener("click", function(){
	starredGroups();
	userGroups();
});

$.groupCreationButton.buttonView.addEventListener("click", function(){
	Alloy.Globals.openWindow($.groups_home_win, "group/group_creation");
});

userGroups();
starredGroups();
