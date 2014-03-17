// Modules and namepspaces
var Global = {};
var UI = {};

// Initial
Global.venueModel = Alloy.createModel("venue");
Global.starredVenuesCollection = [];

UI = function(){
	return {
		pushDataIntoSection: function(collection, section, data){
			for(i=0;i<data.length;i++){
				var tempVenue = data[i];
				var imageFile = tempVenue.get("imageURL") || Ti.App.Properties.getString('imageNA');
				var temp = {name: {text: tempVenue.get("name")}, pic: {image: imageFile}};
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

function starredVenues(){
	Global.venueModel.getStarred({
		success: function(data){
			Global.starredVenuesCollection = [];
			if(_.isEmpty(data)){
				UI.pushMessageIntoSection("starredVenuesListSection", "No hay instalaciones disponibles");
			}else{
				UI.pushDataIntoSection("starredVenuesCollection", "starredVenuesListSection", data);
			}
		},
		error: function(data){
			UI.pushMessageIntoSection("starredVenuesListSection", "No se pudieron obtener las instalaciones destacadas, intenta de nuevo");
		}
	});	
}

// listeners
$.stateBar.barRightButton.addEventListener("click", function(){
	starredVenues();
});

// first calls
starredVenues();
