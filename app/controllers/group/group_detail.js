
// Inner Modules
var UI = {};
var Global = {};

// Initial
Global.groupModel = Alloy.createModel("group");
Global.groupId;
Global.userGroupData = {};
Global.args = arguments[0] || {};

UI = function(){
	return{ 
		setViewUserOptions: function(){
		
		},
		setGroupInfoView: function(currentGroup){
			if(_.isEmpty(currentGroup) || isNaN(currentGroup.get("legacyId"))){
				alert("No se pudo recuperar el grupo ");
			}
			else{
				$.groupName.setText(currentGroup.get("name"));
				$.groupSecondTeam.setText(currentGroup.get("secondTeamName"));
				$.groupConditions.setText(currentGroup.get("conditions"));
				$.groupSports.setText(currentGroup.get("sport").name);
				$.groupPlayerLimit.setText(currentGroup.get("playerLimit"));
				
				var items = [];
			    items.push({
			        template: "options", 
			        pre: {
			            text:  "("+currentGroup.get("memberQ")+")"
			        },
			        desc: {
			            text: "Jugadores"
			        }
			    },
			    {
			        template: "options", 
			        pre: {
			            text: "("+currentGroup.get("eventsQ")+")"
			        },
			        desc: {
			            text: "Eventos"
			        }
			    },
			    {
			        template: "options",
			        desc: {
			            text: "Clasificación"
			        }
			    });    
			    $.optionSection.setItems(items);
			    
				
				var managersString = "No disponible"; 
				if(currentGroup.get("managers")){
					managersString = "";
					_.each(currentGroup.get("managers"), function(element, index, list){
						if(index==0){
							managersString += element.name;
						}else{
							managersString += ", " + element.name;
						}
           			});
				}
				$.groupOrganizer.setText(managersString);
			}
		}
	};
}();

function init(initArgs){
	if(!_.isEmpty(initArgs)){
		Global.groupId = initArgs.groupId;
		
		Global.groupModel.getGroupDetail(Global.groupId, Alloy.Globals.getLoggedUser().get("legacyId"), {
			success: function(respObj){
				if(respObj.group && respObj.userGroupData){
					Global.groupData = {id: respObj.group.get("legacyId"), name: respObj.group.get("name")};
					UI.setGroupInfoView(respObj.group);	
					
					// hide create event button if not authorized
					if(!respObj.userGroupData.isManager 
						&& !respObj.userGroupData.isCreator){
						$.buttonsBody.remove($.createEventButton.buttonView);
					}else{
						$.buttonsBody.show();	
					}
					
				}else{
					alert("No se pudo obtener la información del grupo");
					$.group_detail.close();
				}
			}
		});
		
	}else{
	}	
}

// Listeners
$.createEventButton.buttonView.addEventListener("click", function(){
	Alloy.Globals.openWindow($.group_detail, "event/event_creation", {group: Global.groupData});
});

$.stateBar.barLeftButton.addEventListener("click", function(){
	$.group_detail.close();
});

$.group_detail.addEventListener('android:back', function(){
    $.group_detail.close();
});

$.optionListView.addEventListener("itemclick", function(e){
	switch(e.itemIndex){
		case 0:
			// members
			Alloy.Globals.openWindow($.group_detail, "shared/general_list", {initOption: 2, groupId: Global.groupId});
		break;
		case 1:
			// events
			Alloy.Globals.openWindow($.group_detail, "shared/general_list", {initOption: 3, groupId: Global.groupId});
		break;
	}
});


// Initial call
init(Global.args);