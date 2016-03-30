sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/Device"

], function(UIComponent, ResourceModel, Device) {
    "use strict";

    return UIComponent.extend("leverx.sap.kozhemyakina.Supplier.Component", {

        metadata: {
            manifest: "json"
        },


        init: function() {
            UIComponent.prototype.init.apply(this, arguments);

            this.getRouter().initialize();
        },



        createContent: function() {
            var oRootView = UIComponent.prototype.createContent.apply(this, arguments);
            oRootView.addStyleClass(this.getContentDensityClass());
            return oRootView;
        },


        destroy: function() {
            UIComponent.prototype.destroy.apply(this, arguments);
        },

        getContentDensityClass: function() {
            if (!this._sContentDensityClass) {
                if (!Device.support.touch) { // apply compact mode if touch is not supported; this could me made configurable for the user on "combi" devices with touch AND mouse
                    this._sContentDensityClass = "sapUiSizeCompact";
                } else {
                    this._sContentDensityClass = "sapUiSizeCozy"; // needed for desktop-first controls like sap.ui.table.Table
                }
            }
            return this._sContentDensityClass;
        }

    });

});