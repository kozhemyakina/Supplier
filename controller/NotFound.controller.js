sap.ui.define([
    "leverx/sap/kozhemyakina/Supplier/controller/BaseController"
], function(BaseController) {
    "use strict";

    return BaseController.extend("leverx.sap.kozhemyakina.Supplier.controller.NotFound", {
        onLinkPressed: function() {
            this.getRouter().navTo("table");
        }

    });

});