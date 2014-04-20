// INIT LOGIC -------------------------------------------------

// Namespaces
var Control = {};
var Global = {};
Global.eventModel = Alloy.createModel('event');

Control = function(){
	return {
		init: function(){
			Global.eventModel.getUserAndEventData(Alloy.Globals.selectedEventInfo.eventId, 
				Alloy.Globals.getLoggedUser().get("legacyId"), {
				success: function(respObj){
					if(respObj.userEventData && respObj.eventObj){
						// set global event data and user related data
						Alloy.Globals.selectedEventObj = respObj.eventObj;
						Alloy.Globals.userEventData = respObj.userEventData;
						
						// Get tabs content
						var view1 = Alloy.createController('event/event_info').getView();
						var view2 = Alloy.createController('event/event_team').getView();
						var view3 = Alloy.createController('event/event_forum').getView();
						var view4 = Alloy.createController('event/event_people').getView();
						
						$.scrollableView.addView(view1);
						$.scrollableView.addView(view2);
						$.scrollableView.addView(view3);
						$.scrollableView.addView(view4);
					}else{
						alert("No pudo ser obtenida la información del evento");
						$.event_detail_win.close();
					}
				},
				error: function(errorObj){
					alert("No pudo ser obtenida la información del evento");
					Alloy.Globals.eventDetailparentWindow.close();
				}
			});
		}
	};
}(); 

// Global variables
Alloy.Globals.eventDetailparentWindow = $.event_detail_win;

//	TAB CHANGE LOGIC ----------------------------------------

// The current visible view
var viewNumber = -1; 

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
    Alloy.Globals.selectedEventObj = {};
    Alloy.Globals.selectedEventId = {};
    Alloy.Globals.userEventData = {};
});

// ----------------------------------------------------------------

// OTHER LOGIC

// Listener for reload
$.stateBar.barRightButton.addEventListener("click", function(){
	var page = $.scrollableView.currentPage;
	switch(page){
		case 0:
			Alloy.Globals.eventViewsControllers["event_info"].reload();
		break;
		case 1:
			Alloy.Globals.eventViewsControllers["event_team"].reload();
		break;
		case 2:
			Alloy.Globals.eventViewsControllers["event_forum"].reload();
		break;
	}
});

// Listeners for back buttons
$.stateBar.barLeftButton.addEventListener("click", function(){
	$.event_detail_win.close();
});
$.event_detail_win.addEventListener('android:back', function(){
    $.event_detail_win.close();
});


// Init call
Control.init();
