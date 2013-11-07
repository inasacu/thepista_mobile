// Get passed arguments
var args = arguments[0] || {};
$.barTitle.text = args.title || 'Title';

// Override defaults
if(args.back==="true"){
	$.barBackIcon.show();
	if(OS_IOS){
		$.barBackIcon.width = 5;
	}else if(OS_ANDROID){
		$.barBackIcon.width = 20;
	}
}
else{
	$.barBackIcon.hide();
	$.barBackIcon.width = 0;
}

// Listeners
$.barLeftButton.addEventListener('touchstart', function(e) {
    this.backgroundColor = '#ff9900';
});

$.barLeftButton.addEventListener('touchend', function(e) {
   this.backgroundColor = '#5da423';
});