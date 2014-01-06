function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "resume_home";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.resume_home_win = Ti.UI.createWindow({
        height: Titanium.UI.FILL,
        id: "resume_home_win",
        layout: "vertical"
    });
    $.__views.resume_home_win && $.addTopLevelView($.__views.resume_home_win);
    $.__views.stateBar = Alloy.createController("includes/custom_state_bar", {
        id: "stateBar",
        back: "false",
        title: L("home_title"),
        __parentSymbol: $.__views.resume_home_win
    });
    $.__views.stateBar.setParent($.__views.resume_home_win);
    var __alloyId13 = {};
    var __alloyId16 = [];
    var __alloyId18 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "50dp",
            height: "50dp",
            left: 0,
            bindId: "pic"
        }
    };
    __alloyId16.push(__alloyId18);
    var __alloyId20 = {
        type: "Ti.UI.Label",
        bindId: "name",
        properties: {
            color: "black",
            font: {
                fontWeight: "bold"
            },
            left: "60dp",
            top: 0,
            bindId: "name"
        }
    };
    __alloyId16.push(__alloyId20);
    var __alloyId22 = {
        type: "Ti.UI.Label",
        bindId: "group",
        properties: {
            color: "black",
            font: {
                fontFamily: "Arial",
                fontSize: "12dp"
            },
            left: "60dp",
            top: "15dp",
            bindId: "group"
        }
    };
    __alloyId16.push(__alloyId22);
    var __alloyId24 = {
        type: "Ti.UI.Label",
        bindId: "date",
        properties: {
            color: "gray",
            font: {
                fontFamily: "Arial",
                fontSize: "12dp"
            },
            left: "60dp",
            top: "28dp",
            bindId: "date"
        }
    };
    __alloyId16.push(__alloyId24);
    var __alloyId15 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId16
    };
    __alloyId13["template"] = __alloyId15;
    var __alloyId25 = [];
    $.__views.myEventsListSection = Ti.UI.createListSection({
        id: "myEventsListSection",
        headerTitle: "Tus eventos"
    });
    __alloyId25.push($.__views.myEventsListSection);
    $.__views.myGroupsEventsListSection = Ti.UI.createListSection({
        id: "myGroupsEventsListSection",
        headerTitle: "De tu interes"
    });
    __alloyId25.push($.__views.myGroupsEventsListSection);
    $.__views.listView = Ti.UI.createListView({
        sections: __alloyId25,
        templates: __alloyId13,
        id: "listView",
        defaultItemTemplate: "template"
    });
    $.__views.resume_home_win.add($.__views.listView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.App.Properties.setString("restAPIKey", "hOMXEuoZRU09Ij4WG9IZ4A");
    var user = Alloy.createModel("user");
    user.set("legacyId", 3130);
    user.getMyActiveEvents({
        success: function(data) {
            var responseObj = data.responseJSON;
            if (Alloy.Globals.verifyAPICall(responseObj.code)) {
                var message = responseObj.message;
                var myEventsDataArray = [];
                for (i = 0; message.length > i; i++) {
                    var obj = message[i];
                    var temp = {
                        name: {
                            text: obj.name
                        },
                        group: {
                            text: obj.group_name
                        },
                        date: {
                            text: obj.start_date
                        },
                        pic: {
                            image: "/test.png"
                        }
                    };
                    myEventsDataArray.push(temp);
                }
                $.myEventsListSection.setItems(myEventsDataArray);
            } else Titanium.API.info("SUCCESS WITH ERRORS" + JSON.stringify(data));
        },
        error: function(data) {
            Titanium.API.info("ERROR " + JSON.stringify(data));
        }
    });
    user.getMyGroupsEvents({
        success: function(data) {
            var responseObj = data.responseJSON;
            if (Alloy.Globals.verifyAPICall(responseObj.code)) {
                var message = responseObj.message;
                var groupsEventsDataArray = [];
                for (i = 0; message.length > i; i++) {
                    var obj = message[i];
                    var temp = {
                        name: {
                            text: obj.name
                        },
                        group: {
                            text: obj.group_name
                        },
                        date: {
                            text: obj.begin_date
                        },
                        pic: {
                            image: "/test.png"
                        }
                    };
                    groupsEventsDataArray.push(temp);
                }
                $.myGroupsEventsListSection.setItems(groupsEventsDataArray);
            } else Titanium.API.info("SUCCESS WITH ERRORS" + JSON.stringify(data));
        },
        error: function(data) {
            Titanium.API.info("ERROR " + JSON.stringify(data));
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;