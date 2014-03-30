
// Modules and namespaces
var UI = {};
var Control = {};
var Global = {};

// Initial
Global.groupModel = Alloy.createModel("group");
Global.myCollection = [];

// constants
Global.Constants = {};
Global.Constants.GROUPS_EVENT_CREATION = 1;

// If the view is reused to load of something other than groups
// the index for initFunction should be recovered from arguments[0]
Global.initFunction = 1;

UI = function(){
	return {
		pushGroupDataIntoSection: function(collection, section, data){
			for(i=0;i<data.length;i++){
				var tempGroup = data[i];
				var imageFile = tempGroup.get("imageURL") || Ti.App.Properties.getString('imageNA');
				var temp = {gname: {text: tempGroup.get("name")},
									gsize: {text: tempGroup.get("memberQ")+" Miembros"}, 
								    gpic: {image: imageFile},
								    extData: {group:{id: tempGroup.get("legacyId"), name: tempGroup.get("name")}} };
				Global[collection].push(temp);
			}
			$[section].setItems(Global[collection]);
		},
		pushMessageIntoSection: function(section, message){
			msg = {template: "messageTemplate", info: {text: message}};
			$[section].setItems([msg]);
		},
		setIntroMessage: function(msg){
			$.introMessage.setText(msg);
		}
	};
}();

Control = function(){
	return {
		init: function(){
			switch(Global.initFunction){
				case Global.Constants.GROUPS_EVENT_CREATION:
					Control.groupsForEventCreationInit();
				break;
			}
		},
		groupsForEventCreationInit: function(){
			$.stateBar.barTitle.setText("Grupo del evento");
			$.listSectionElement.setHeaderTitle("Tus grupos");
			
			$.listViewElement.addEventListener("itemclick", function(e){
				switch(e.sectionIndex){
					case 0:
						temp = Global.myCollection[e.itemIndex];
					break;
				}
				var tempGroup = temp.extData.group;
				if(!_.isEmpty(tempGroup) && !isNaN(tempGroup.id)){
					Alloy.Globals.openWindow($.group_list, "event/event_creation", {group: tempGroup});
					$.general_list.close();
				}
			});
			
			Global.groupModel.getByUser(Alloy.Globals.getLoggedUser().get("legacyId"), {
				success: function(data){
					Global.myCollection = [];
					if(_.isEmpty(data)){
						UI.setIntroMessage("Para poder crear un evento debes ser administrador de un grupo");
						UI.pushGroupDataIntoSection("listSectionElement", "No estas inscrito en ningún grupo");
					}else{
						UI.setIntroMessage("Escoge el grupo para al que quieres crear el evento");
						UI.pushGroupDataIntoSection("myCollection", "listSectionElement", data);
					}
				},
				error: function(data){
					UI.pushMessageIntoSection("myGroupsListSection", "No se pudieron obtener tus grupos, intenta de nuevo");
				}
			});	
		}
	};
}();


// listeners
$.stateBar.barRightButton.addEventListener("click", function(){
	Control.init();
});

$.stateBar.barLeftButton.addEventListener("click", function(){
	$.general_list.close();
});
$.general_list.addEventListener('android:back', function(){
    $.general_list.close();
});

Control.init();
