
// Inner Modules
var UI = {};
var Global = {};

// Initial
Global.venueModel = Alloy.createModel("venue");
Global.venueId;
Global.args = arguments[0] || {};

UI = function(){
	return{ 
		setViewUserOptions: function(){
		
		},
		setVenueInfoView: function(currentVenue){
			if(_.isEmpty(currentVenue) || isNaN(currentVenue.get("legacyId"))){
				alert("No se pudo recuperar la instalación");
			}
			else{
				$.venueName.setText(currentVenue.get("name"));
				$.venueAddress.setText(currentVenue.get("address"));
				$.venueCity.setText(currentVenue.get("city"));
				
				var items = [];
			    items.push({
			        template: "options", 
			        pre: {
			            text: "("+currentVenue.get("eventsQ")+")"
			        },
			        desc: {
			            text: "Eventos"
			        }
			    });    
			    $.optionSection.setItems(items);
			    
				
				var sportsString = "No disponible"; 
				if(currentVenue.get("sports")){
					sportsString = "";
					_.each(currentVenue.get("sports"), function(element, index, list){
						if(index==0){
							sportsString += element.name;
						}else{
							sportsString += ", " + element.name;
						}
           			});
				}
				$.venueSports.setText(sportsString);
				
				// map location
				var installationLoc = Alloy.Globals.Map.createAnnotation({
				    latitude: currentVenue.get("latitude"),
				    longitude: currentVenue.get("longitude"),
				    title: currentVenue.get("name"),
				    subtitle:'',
				    pincolor:Alloy.Globals.Map.ANNOTATION_RED,
				    myid:1 // Custom property to uniquely identify this annotation.
				});
				
				$.mapview.region = {latitude: currentVenue.get("latitude"), longitude:currentVenue.get("longitude"),
				                    latitudeDelta:0.01, longitudeDelta:0.01};
				$.mapview.addAnnotation(installationLoc);
			}
		}
	};
}();

function init(initArgs){
	if(!_.isEmpty(initArgs)){
		Global.venueId = initArgs.venueId;
		
		Global.venueModel.getVenueDetail(Global.venueId, {
			success: function(respObj){
				if(respObj){
					UI.setVenueInfoView(respObj);	
				}else{
					alert("No se pudo obtener la información de la instalación");
					$.venue_detail.close();
				}
			}
		});
		
	}else{
	}	
}

// Listeners
$.stateBar.barLeftButton.addEventListener("click", function(){
	$.venue_detail.close();
});

$.venue_detail.addEventListener('android:back', function(){
    $.venue_detail.close();
});

$.optionListView.addEventListener("itemclick", function(e){
	switch(e.itemIndex){
		case 0:
			// members
			Alloy.Globals.openWindow($.venue_detail, "shared/general_list", {initOption: 4, venueId: Global.venueId});
		break;
	}
});


// Initial call
init(Global.args);