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
    
    var backgroundGradientNotClicked = {
        type: 'linear',
        startPoint: { x: '50%', y: '100%' },
        endPoint: { x: '50%', y: '0%' },
        colors: [ { color: notClickedColor, offset: 0.95}, { color: '#fff', offset: 0.0 }],
    };
    
    var backgroundGradientClicked = {
        type: 'linear',
        startPoint: { x: '50%', y: '100%' },
        endPoint: { x: '50%', y: '0%' },
        colors: [ { color: clickedColor, offset: 0.95}, { color: '#fff', offset: 0.0 }],
    };
	
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
		//$.buttonInnerView.backgroundColor = notClickedColor;
	    $.buttonInnerView.backgroundGradient = backgroundGradientNotClicked;
	}
	else if(stateCode==1){
		$.buttonInnerView.backgroundGradient = backgroundGradientClicked;
	}else if(stateCode==2){
		$.buttonInnerView.backgroundGradient = backgroundGradientNotClicked;
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

$.buttonView.addEventListener('touchcancel', function(e) {
   setColor(2);
});