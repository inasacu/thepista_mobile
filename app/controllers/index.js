// function showLogin(providerIndexValue) {
	// var provider_auth_window = Alloy.createController("provider_auth", 
						       // {providerIndex: providerIndexValue}).getView();
// 						   
	// provider_auth_window.open();
// }
// 
// // Listeners for the buttons
// $.facebookLogin.addEventListener("click", function(e){
	// showLogin(Ti.App.Properties.getString('facebookProviderIndex'));
// });
// 
// $.googleLogin.addEventListener("click", function(e){
	// showLogin(Ti.App.Properties.getString('googleProviderIndex'));
// });
// 
// $.outlookLogin.addEventListener("click", function(e){
	// showLogin(Ti.App.Properties.getString('outlookProviderIndex'));
// });
// 
// // Window open
// $.index.open();
// 
// // Set parent for next window
// Alloy.Globals.previousWindow = $.index;

var first_window = Alloy.createController("home/tab_home").getView();
first_window.open();

