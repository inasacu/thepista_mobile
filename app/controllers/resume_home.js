Ti.App.Properties.setString('restAPIKey', 'Ip4Q7-MXv43syXL98vn1hA');

var user = Alloy.createModel("user");
user.set("legacyId", 3130);

function activeEvents(){
	user.getMyActiveEvents({
		success: function(data){
			var responseObj = data.responseJSON;
			
			if(Alloy.Globals.verifyAPICall(responseObj.code)){
				
				var message = responseObj.message;
				var myEventsDataArray = [];
				for(i=0;i<message.length;i++){
					var obj = message[i];
					var temp = {name: {text: obj.name}, 
							   group: {text: obj.group_name},
							   date: {text: obj.start_date}, 
							   pic: {image: '/test.png'}};
					myEventsDataArray.push(temp);
				}
				$.myEventsListSection.setItems(myEventsDataArray);
			}
			else{
				Titanium.API.info("SUCCESS WITH ERRORS"+JSON.stringify(data));	
			}
		},
		error: function(data){
			Titanium.API.info("ERROR "+JSON.stringify(data));
		}
	});	
}

function groupEvents(){
	user.getMyGroupsEvents({
		success: function(data){
			var responseObj = data.responseJSON;
			
			if(Alloy.Globals.verifyAPICall(responseObj.code)){
				
				var message = responseObj.message;
				var groupsEventsDataArray = [];
				for(i=0;i<message.length;i++){
					var obj = message[i];
					var temp = {name: {text: obj.name}, 
							   group: {text: obj.group_name},
							   date: {text: obj.begin_date}, 
							   pic: {image: '/test.png'}};
					groupsEventsDataArray.push(temp);
				}
				$.myGroupsEventsListSection.setItems(groupsEventsDataArray);
			}
			else{
				Titanium.API.info("SUCCESS WITH ERRORS"+JSON.stringify(data));	
			}
		},
		error: function(data){
			Titanium.API.info("ERROR "+JSON.stringify(data));
		}
	});	
}

// listeners
$.stateBar.barRightButton.addEventListener("click", function(){
	activeEvents();
	groupEvents();
});

// first calls
activeEvents();
groupEvents();
