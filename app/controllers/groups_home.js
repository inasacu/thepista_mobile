Ti.App.Properties.setString('restAPIKey', 'hOMXEuoZRU09Ij4WG9IZ4A');

var user = Alloy.createModel("user");
user.set("legacyId", 3130);

user.getGroups({
	success: function(data){
		var responseObj = data.responseJSON;
		
		if(Alloy.Globals.verifyAPICall(responseObj.code)){
			
			var message = responseObj.message;
			var myGroupsDataArray = [];
			for(i=0;i<message.length;i++){
				var obj = message[i];
				var temp = {name: {text: obj.name}, pic: {image: '/test.png'}};
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