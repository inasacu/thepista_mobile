// utility functions
function setColor(stateCode){
	var notClickedColor;
	var clickedColor;
	
	notClickedColor = "#fff";
    clickedColor = "#ccc";
	
	if(stateCode==0){
	    $.buttonView.backgroundColor = notClickedColor;
	}
	else if(stateCode==1){
		$.buttonView.backgroundColor = clickedColor;
	}else if(stateCode==2){
		$.buttonView.backgroundColor = notClickedColor;
	}
}

// Get passed arguments
var args = arguments[0] || {};
$.buttonViewLabel.text = args.title || "title";


// Override defaults
setColor(0);

// Listeners
$.buttonView.addEventListener('touchstart', function(e) {
    setColor(1);
});

$.buttonView.addEventListener('touchend', function(e) {
   setColor(2);
});

$.buttonView.addEventListener('touchcancel', function(e) {
   setColor(2);
});