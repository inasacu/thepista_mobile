// Namespaces
var UI = {};
var Globals = {};

// variables
Globals.inputArgs = arguments[0] || {};
Globals.optionCollection = [];

UI = function(){
	return {
		fillCities: function(citiesCollection){
			if(citiesCollection){
				for(i=0;i<citiesCollection.length;i++){
					var tempCity = citiesCollection[i];
					var temp = {desc: {text: tempCity.name}, dataExt: {id: tempCity.legacyId, name: tempCity.name}};
					Globals.optionCollection.push(temp);
				}
				$.optionsSection.setItems(Globals.optionCollection);
			}
		}
	};
}();

switch(Globals.inputArgs.showOption){
	case "city":
		// Set title of status bar
		$.stateBar.barTitle.text = "Ciudades";
		
		if(Alloy.Globals.cityList.length==0){
			var utilModel = Alloy.createModel('util');
			utilModel.getCities({
				success: function(data){
					Alloy.Globals.cityList = data;
					UI.fillCities(data);
				}
			});
		}else{
			UI.fillCities(Alloy.Globals.cityList);
		}
		
	break;	
}

// Listener
$.optionsList.addEventListener("itemclick", function(e){
	var tempOption = Globals.optionCollection[e.itemIndex];
	if(!_.isEmpty(tempOption)){
		Globals.inputArgs.callback({id: tempOption.dataExt.id, name: tempOption.dataExt.name});
		$.option_list.close();
	}
});

$.stateBar.barLeftButton.addEventListener("click", function(){
	$.option_list.close();
});
$.option_list.addEventListener('android:back', function(){
    $.option_list.close();
});
