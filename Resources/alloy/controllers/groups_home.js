function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "groups_home";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.groups_home_win = Ti.UI.createWindow({
        height: Titanium.UI.FILL,
        id: "groups_home_win",
        layout: "vertical"
    });
    $.__views.groups_home_win && $.addTopLevelView($.__views.groups_home_win);
    $.__views.stateBar = Alloy.createController("includes/custom_state_bar", {
        id: "stateBar",
        back: "false",
        title: L("groups_title"),
        __parentSymbol: $.__views.groups_home_win
    });
    $.__views.stateBar.setParent($.__views.groups_home_win);
    var __alloyId1 = {};
    var __alloyId4 = [];
    var __alloyId6 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "50dp",
            height: "50dp",
            left: 0,
            bindId: "pic"
        }
    };
    __alloyId4.push(__alloyId6);
    var __alloyId8 = {
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
    __alloyId4.push(__alloyId8);
    var __alloyId3 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId4
    };
    __alloyId1["template"] = __alloyId3;
    var __alloyId9 = [];
    $.__views.myGroupsListSection = Ti.UI.createListSection({
        id: "myGroupsListSection",
        headerTitle: "Tus grupos"
    });
    __alloyId9.push($.__views.myGroupsListSection);
    $.__views.starredGroupsListSection = Ti.UI.createListSection({
        id: "starredGroupsListSection",
        headerTitle: "Grupos destacados"
    });
    __alloyId9.push($.__views.starredGroupsListSection);
    $.__views.listView = Ti.UI.createListView({
        sections: __alloyId9,
        templates: __alloyId1,
        id: "listView",
        defaultItemTemplate: "template"
    });
    $.__views.groups_home_win.add($.__views.listView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.App.Properties.setString("restAPIKey", "hOMXEuoZRU09Ij4WG9IZ4A");
    var user = Alloy.createModel("user");
    user.set("legacyId", 3130);
    user.getGroups({
        success: function(data) {
            var responseObj = data.responseJSON;
            if (Alloy.Globals.verifyAPICall(responseObj.code)) {
                var message = responseObj.message;
                var myGroupsDataArray = [];
                for (i = 0; message.length > i; i++) {
                    var obj = message[i];
                    var temp = {
                        name: {
                            text: obj.name
                        },
                        pic: {
                            image: "/test.png"
                        }
                    };
                    myGroupsDataArray.push(temp);
                }
                $.myGroupsListSection.setItems(myGroupsDataArray);
            } else Titanium.API.info("SUCCESS WITH ERRORS" + JSON.stringify(data));
        },
        error: function(data) {
            alert("No se pudieron obtener los grupos");
            Titanium.API.info("ERROR " + JSON.stringify(data));
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;