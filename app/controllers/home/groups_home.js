
// Initial
var loggedUser = Alloy.Globals.UI.getLoggedUser();
var group = Alloy.createModel("group");
var starredGroupsCollection = [];
var myGroupsCollection = [];


function starredGroups(){
	group.getStarred({
		success: function(data){
			var responseObj = data.responseJSON;
			
			if(Alloy.Globals.verifyAPICall(responseObj.code)){
				
				var message = responseObj.message;
				starredGroupsCollection = [];
				
				for(i=0;i<message.length;i++){
					var obj = message[i];
					var temp = {gname: {text: obj.description.name},
								gsize: {text: obj.size+" Miembros"}, 
							    gpic: {image: '/test.png'}};
					starredGroupsCollection.push(temp);
				}
				
			}
			else{
				Titanium.API.info("SUCCESS WITH ERRORS"+JSON.stringify(data));	
			}
			
			if(_.isEmpty(starredGroupsCollection)){
				var msg = {template: "messageTemplate", info: {text: "No hay grupos destacados disponibles"}};
				starredGroupsCollection.push(msg);	
			}
			
			$.starredGroupsListSection.setItems(starredGroupsCollection);
		},
		error: function(data){
			alert("No se pudieron obtener los grupos, intenta de nuevo");
			
			var msg = {template: "messageTemplate", info: {text: "No hay grupos destacados disponibles"}};
			starredGroupsCollection.push(msg);	
			$.starredGroupsListSection.setItems(starredGroupsCollection);
			
			Titanium.API.info("ERROR "+JSON.stringify(data));
		}
	});	
}

function userGroups(){
	group.getByUser(loggedUser.legacyId, {
		success: function(data){
			var responseObj = data.responseJSON;
			
			if(Alloy.Globals.verifyAPICall(responseObj.code)){
				
				var message = responseObj.message;
				myGroupsCollection = [];
				
				for(i=0;i<message.length;i++){
					var obj = message[i];
					var temp = {gname: {text: obj.description.name},
								gsize: {text: obj.size+" Miembros"}, 
							    gpic: {image: '/test.png'}};
					myGroupsCollection.push(temp);
				}
						
			}
			else{
				Titanium.API.info("SUCCESS WITH ERRORS"+JSON.stringify(data));	
			}
			
			if(_.isEmpty(myGroupsCollection)){
				var msg = {template: "messageTemplate", info: {text: "No te has unido a ningún grupo"}};
				myGroupsCollection.push(msg);	
			}
			
			$.myGroupsListSection.setItems(myGroupsCollection);		
		},
		error: function(data){
			alert("No se pudieron tus grupos, intenta de nuevo");
			var msg = {template: "messageTemplate", info: {text: "No te has unido a ningún grupo"}};
			myGroupsCollection.push(msg);
			$.myGroupsListSection.setItems(myGroupsCollection);		
			Titanium.API.info("ERROR "+JSON.stringify(data));
		}
	});	
}

// listeners
$.stateBar.barRightButton.addEventListener("click", function(){
	starredGroups();
	userGroups();
});

userGroups();
starredGroups();
