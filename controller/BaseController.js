sap.ui.define([
		"sap/ui/core/mvc/Controller",
        "leverx/sap/kozhemyakina/Supplier/model/formatter"
	], function(Controller, Formatter) {
	"use strict";

	return Controller.extend("leverx.sap.kozhemyakina.Supplier.controller.BaseController", {

        formatter: Formatter,

		onNavBack: function() {
			var oHistory = sap.ui.core.routing.History.getInstance(),
				sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				history.go(-1);
			}
		},

		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		getModel: function(sName) {
			return this.getView().getModel(sName);
		},

		setModel: function(oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		getResourceBundle: function() {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},
	});

});