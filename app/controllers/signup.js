// Initial calls
Alloy.Globals.toogleActivityIndicator($.activityIndicator, 
		Ti.App.Properties.getString('AIhideCode'));

// Listeners
$.stateBar.barLeftButton.addEventListener("click", function(){
	Alloy.Globals.backToPreviousWindow();
	$.signup.close();
});
$.signup.addEventListener('android:back', function(){
    Alloy.Globals.backToPreviousWindow();
    $.signup.close();
});