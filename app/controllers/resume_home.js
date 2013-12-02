Ti.App.Properties.setString('restAPIKey', 'hOMXEuoZRU09Ij4WG9IZ4A');

var user = Alloy.createModel("user");
user.set("legacyId", 3130);

user.getGroups({
	success: function(data){
		Titanium.API.info("SUCCESS "+JSON.stringify(data));
	},
	error: function(data){
		Titanium.API.info("ERROR "+JSON.stringify(data));
	}
});
