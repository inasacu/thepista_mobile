// utility functions
function defaultHeight(){
	if(OS_IOS){
		return 40;
	}else if(OS_ANDROID){
		return 80;
	}
}

function defaultWidth(){
	if(OS_IOS){
		return 80;
	}else if(OS_ANDROID){
		return 250;
	}	
}

function setColor(stateCode){
	var notClickedColor;
	var clickedColor;
	var fontColor;
	
	notClickedColor = "#f8f8f8";
    clickedColor = "#ccc";
	
	if(args.isAccept==="true"){
		fontColor = "#2795b6";
	}else{
		if(args.isCancel==="true"){
			fontColor = "red";
		}
		else{
			fontColor = "#2795b6";
		}
	}
	
	$.buttonViewLabel.color = fontColor;
	
	if(stateCode==0){
		$.buttonInnerView.backgroundColor = notClickedColor;
	}
	else if(stateCode==1){
		$.buttonInnerView.backgroundColor = clickedColor;
	}else if(stateCode==2){
		$.buttonInnerView.backgroundColor = notClickedColor;
	}
}

// Get passed arguments
var args = arguments[0] || {};
$.buttonView.height = args.height || defaultHeight();
$.buttonView.width = args.width || defaultWidth();
$.buttonViewLabel.text = args.text || "title";


// Override defaults

setColor(0);

// Listeners
$.buttonView.addEventListener('touchstart', function(e) {
    setColor(1);
});

$.buttonView.addEventListener('touchend', function(e) {
   setColor(2);
});

$.buttonView.addEventListener('swipe', function(e) {
   setColor(2);
});