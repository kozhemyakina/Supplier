sap.ui.define([
    'leverx/sap/kozhemyakina/Supplier/controller/BaseController',
    'jquery.sap.global',
    'sap/m/MessageToast',
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel'
], function(BaseController, jQuery, MessageToast, Controller, JSONModel) {
    "use strict";

    var ListController = BaseController.extend("leverx.sap.kozhemyakina.Supplier.controller.Review", {

        onInit: function () {
        }
    });
    return ListController;

});