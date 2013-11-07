// function showLogin(providerIndexValue) {
	// var provider_auth_window = Alloy.createController("provider_auth", 
						       // {providerIndex: providerIndexValue}).getView();
// 						   
	// provider_auth_window.open();
	// $.index.close();
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
// Alloy.Globals.parent = $.index;

var tabs_home_window = Alloy.createController("tab_home").getView();
tabs_home_window.open();