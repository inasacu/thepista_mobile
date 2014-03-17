// Namespaces
var UI = {};
var Globals = {};

// variables
Globals.inputArgs = arguments[0] || {dateTitle: "Fecha de inicio", 
	callback:function(data){
				alert(data.pickedDate+" "+data.pickedTime);
			}
	};

UI = function(){
	return {
	};
}();

// set title of the window
$.stateBar.barTitle.text = Globals.inputArgs.dateTitle;

$.submitButton.buttonView.addEventListener("click", function(e){
	var chosenDate = $.datePicker.getValue();
	var chosenTime = $.timePicker.getValue();
	Globals.inputArgs.callback({pickedDate: chosenDate.getTime(), pickedTime: chosenTime.getTime()});
	$.date_picker.close();
});
$.cancelButton.buttonView.addEventListener('click', function(){
    $.date_picker.close();
});
$.stateBar.barLeftButton.addEventListener("click", function(){
	$.date_picker.close();
});
$.date_picker.addEventListener('android:back', function(){
    $.date_picker.close();
});
