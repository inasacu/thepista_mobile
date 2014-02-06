// Initial
var loggedUser = Alloy.Globals.UI.getLoggedUser();
var venue = Alloy.createModel("venue");
var starredVenuesCollection = [];

function starredVenues(){
	venue.getStarred({
		success: function(data){
			var responseObj = data.responseJSON;
			
			if(Alloy.Globals.verifyAPICall(responseObj.code)){
				
				var message = responseObj.message;
				starredVenuesCollection = [];
				
				for(i=0;i<message.length;i++){
					var obj = message[i];	
					var temp = {name: {text: obj.name}, pic: {image: '/test.png'}};
					starredVenuesCollection.push(temp);
				}
				
			}
			else{
				Titanium.API.info("SUCCESS WITH ERRORS"+JSON.stringify(data));	
			}
			
			if(_.isEmpty(starredVenuesCollection)){
				var msg = {template: "messageTemplate", info: {text: "No hay instalaciones destacadas disponibles"}};
				starredVenuesCollection.push(msg);	
			}
			
			$.starredVenuesListSection.setItems(starredVenuesCollection);	
		},
		error: function(data){
			alert("No se pudieron obtener los venues");
			
			var msg = {template: "messageTemplate", info: {text: "No hay instalaciones destacadas disponibles"}};
			starredVenuesCollection.push(msg);	
			$.starredVenuesListSection.setItems(starredVenuesCollection);	
			
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
