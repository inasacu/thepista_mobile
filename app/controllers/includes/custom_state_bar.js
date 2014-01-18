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

if(args.reload==="true"){
	$.barRightButton.show();
}
else{
	$.barRightButton.hide();
}

// Listeners
function touchStartFunction(e){
	 e.backgroundColor = '#ff9900';
}
function touchEndFunction(e){
	e.backgroundColor = '#5da423';
}

$.barLeftButton.addEventListener('touchstart', function(e) {
    touchStartFunction(this);
});

$.barLeftButton.addEventListener('touchend', function(e) {
   touchEndFunction(this);
});

$.barRightButton.addEventListener('touchstart', function(e) {
    touchStartFunction(this);
});

$.barRightButton.addEventListener('touchend', function(e) {
   touchEndFunction(this);
});