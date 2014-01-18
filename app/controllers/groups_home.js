Ti.App.Properties.setString('restAPIKey', 'Ip4Q7-MXv43syXL98vn1hA');

var user = Alloy.createModel("user");
user.set("legacyId", 3130);

var group = Alloy.createModel("group");

function starredGroups(){
	group.getStarred({
		success: function(data){
			var responseObj = data.responseJSON;
			
			if(Alloy.Globals.verifyAPICall(responseObj.code)){
				
				var message = responseObj.message;
				var starredGroupsDataArray = [];
				for(i=0;i<message.length;i++){
					var obj = message[i];
					var temp = {gname: {text: obj.name}, gpic: {image: '/test.png'}};
					starredGroupsDataArray.push(temp);
				}
				
				$.starredGroupsListSection.setItems(starredGroupsDataArray);				
			}
			else{
				Titanium.API.info("SUCCESS WITH ERRORS"+JSON.stringify(data));	
			}
		},
		error: function(data){
			alert("No se pudieron obtener los grupos destacados");
			Titanium.API.info("ERROR "+JSON.stringify(data));
		}
	});	
}

function userGroups(){
	user.getGroups({
		success: function(data){
			var responseObj = data.responseJSON;
			
			if(Alloy.Globals.verifyAPICall(responseObj.code)){
				
				var message = responseObj.message;
				var myGroupsDataArray = [];
				for(i=0;i<message.length;i++){
					var obj = message[i];
					var temp = {gname: {text: obj.name}, gpic: {image: '/test.png'}};
					myGroupsDataArray.push(temp);
				}
				
				$.myGroupsListSection.setItems(myGroupsDataArray);				
			}
			else{
				Titanium.API.info("SUCCESS WITH ERRORS"+JSON.stringify(data));	
			}
		},
		error: function(data){
			alert("No se pudieron obtener los grupos");
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
