//	TAB CHANGE LOGIC 

// The current visible view
var viewNumber = -1; 
Alloy.Globals.parentWindow = $.tab_home;

// Listeners for color changing for scrollview
$.scrollableView.addEventListener("pageChanged",function(){
	var tabOptions = $.tabIndicator.getChildren();
	
	// Sets the tabs border to default
	_.each(tabOptions, function(tabOptionView, index, list){
		var tabChildren = tabOptionView.getChildren();
		tabChildren[1].backgroundColor = "#ccc";
	});
	
	// Sets the border for the current tab
	var tabChildren = tabOptions[this.currentPage].getChildren();
	tabChildren[1].backgroundColor = "#5da423";
});

$.scrollableView.addEventListener("checkCurrentPage",function(){
	if(viewNumber != this.currentPage){
	    viewNumber = this.currentPage; 
	    this.fireEvent('pageChanged');
	}
});

$.scrollableView.addEventListener('scroll',function(e){
	this.fireEvent("checkCurrentPage");
});

$.scrollableView.fireEvent("checkCurrentPage");


// Listeneres for the tab indexes
_.each($.tabIndicator.getChildren(), function(tabIndexView, index, list){
	tabIndexView.addEventListener("click", function(e){
		$.scrollableView.scrollToView(index);
	});
});

$.event_detail_win.addEventListener('close', function() {
    $.destroy();
    // Set global controllers for children views to blank
    Alloy.Globals.eventViewsControllers = {};
});

// ----------------------------------------------------------------

// OTHER LOGIC

// received arguments
//var args = arguments[0] || {eventId: 427};
var args = {eventId: 427};

// Listener for reload
$.stateBar.barRightButton.addEventListener("click", function(){
	var children = $.scrollableView.getChildren();
	var page = $.scrollableView.currentPage;
	Alloy.Globals.eventViewsControllers["event_info"].reload(args);
});

// Listeners for back buttons
$.stateBar.barLeftButton.addEventListener("click", function(){
	$.event_detail_win.close();
});
$.event_detail_win.addEventListener('android:back', function(){
    $.event_detail_win.close();
});