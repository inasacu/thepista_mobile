var viewNumber = -1; 

$.scrollableView.addEventListener('pageChanged',function(){
	var tabOptions = $.tabIndicator.getChildren();
	for (var i = 0; i < tabOptions.length; i++) {
		tabOptionView = tabOptions[i];
		tabOptionView.backgroundColor = "#000";
		tabOptionView.color = "#000";
	}
	tabOptions[this.currentPage].backgroundColor = "#5da423";
});

$.scrollableView.addEventListener('checkCurrentPage',function(){
	if(viewNumber != this.currentPage){
	    viewNumber = this.currentPage; 
	    this.fireEvent('pageChanged');
	}
});

$.scrollableView.addEventListener('scroll',function(e){
	this.fireEvent("checkCurrentPage");
});
	 
$.scrollableView.fireEvent("checkCurrentPage");