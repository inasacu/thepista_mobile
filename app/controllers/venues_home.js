Ti.App.Properties.setString('restAPIKey', 'Ip4Q7-MXv43syXL98vn1hA');

var venue = Alloy.createModel("venue");

function starredVenues(){
	venue.getStarred({
		success: function(data){
			var responseObj = data.responseJSON;
			
			if(Alloy.Globals.verifyAPICall(responseObj.code)){
				
				var message = responseObj.message;
				var starredVenuesDataArray = [];
				for(i=0;i<message.length;i++){
					var obj = message[i];
					Titanium.API.info("DATA"+JSON.stringify(obj));	
					var temp = {name: {text: obj.name}, pic: {image: '/test.png'}};
					starredVenuesDataArray.push(temp);
				}
				
				$.starredVenuesListSection.setItems(starredVenuesDataArray);	
			}
			else{
				Titanium.API.info("SUCCESS WITH ERRORS"+JSON.stringify(data));	
			}
		},
		error: function(data){
			alert("No se pudieron obtener los venues");
			Titanium.API.info("ERROR "+JSON.stringify(data));
		}
	});	
}

// listeners
$.stateBar.barRightButton.addEventListener("click", function(){
	starredVenues();
});

// first calls
starredVenues();
