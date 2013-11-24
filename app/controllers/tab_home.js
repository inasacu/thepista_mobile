// The current visible view
var viewNumber = -1; 
Alloy.Globals.parentWindow = $.tab_home;

// Listeners for color changing for scrollview
$.scrollableView.addEventListener("pageChanged",function(){
	var tabOptions = $.tabIndicator.getChildren();
	
	_.each(tabOptions, function(tabOptionView, index, list){
		tabOptionView.backgroundColor = "#000";
		tabOptionView.color = "#000";
	});
	
	tabOptions[this.currentPage].backgroundColor = "#5da423";
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
