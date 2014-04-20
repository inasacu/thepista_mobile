// Initial
var Global = {};
var UI = {};
var Control = {};
Global.eventModel = Alloy.createModel("event");
Global.messageCollection = [];
Alloy.Globals.eventViewsControllers["event_forum"] = $;

UI = function(){
	return {
		pushDataIntoSection: function(collection, section, data){
			for(i=0;i<data.length;i++){
				var comment = data[i];
				var temp = {name: {text: comment.commenter.name},
					        message: {text: comment.text}};
				Global[collection].push(temp);
			}
			$[section].setItems(Global[collection]);
		},
		pushMessageIntoSection: function(section, message){
			msg = {template: "messageTemplate", info: {text: message}};
			$[section].setItems([msg]);
		},
		getPlayerView: function(){
			
		}
	};
}();

Control = function(){
	return {
		init: function(){
			Global.eventModel.getForumComments(Alloy.Globals.selectedEventObj.get("legacyId"), {
				success: function(data){
					Global.messageCollection = [];
					if(_.isEmpty(data)){
						UI.pushMessageIntoSection("messagesSection", "No se pudieron recuperar los mensajes");
					}else{
						UI.pushDataIntoSection("messageCollection", "messagesSection", data);
					}
				},
				error: function(data){
					UI.pushMessageIntoSection("messagesSection", "No se pudieron recuperar los mensajes");
				}
			});	
		},
		addComment : function(){
			var commentText = $.messageTextArea.getValue();
			if(!_.isEmpty()){
				Global.eventModel.addForumComment(Alloy.Globals.selectedEventObj.get("legacyId"), 
					Alloy.Globals.getLoggedUser().get("legacyId"), commentText, {
					success: function(data){
						Global.messageCollection = [];
						if(_.isEmpty(data)){
							UI.pushMessageIntoSection("messagesSection", "No se pudieron recuperar los mensajes");
						}else{
							UI.pushDataIntoSection("messageCollection", "messagesSection", data);
							alert("Mensaje publicado");
						}
						$.messageTextArea.setValue("");
					},
					error: function(data){
						alert("Error publicando mensaje");
					}
				});	
			}else{
				alert("El mensaje no puede ser vacío");
			}
		}	
	};
}();

// reload
exports.reload = function(){
	Control.init();
};

// Listeners
$.showMessageViewButton.buttonView.addEventListener("click", function(){
	$.messageView.show();
	$.messageView.height = Titanium.UI.SIZE;
	
	$.showMessageView.hide();
	$.showMessageView.height=0;
});

$.cancelMessageViewButton.buttonView.addEventListener("click", function(){
	$.messageView.hide();
	$.messageView.height = 0;
	
	$.showMessageView.show();
	$.showMessageView.height = Titanium.UI.SIZE;
});

$.sendMessageViewButton.buttonView.addEventListener("click", function(){
	Control.addComment();
});

Control.init();