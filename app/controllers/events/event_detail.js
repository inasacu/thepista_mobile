// Listeners
$.stateBar.barLeftButton.addEventListener("click", function(){
	$.event_detail_win.close();
});
$.event_detail_win.addEventListener('android:back', function(){
    $.event_detail_win.close();
});