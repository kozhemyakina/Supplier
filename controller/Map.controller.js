sap.ui.define([
    'leverx/sap/kozhemyakina/Supplier/controller/BaseController',
    'jquery.sap.global',
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel'

], function(BaseController, jQuery, Controller, JSONModel) {
    "use strict";

    var PageController = BaseController.extend("leverx.sap.kozhemyakina.Supplier.controller.Map", {

        onInit: function () {
            var mythis = this;
            var suppliers;
            var view = this.getView();
            var suppliersCollection = new JSONModel(jQuery.sap.getModulePath("leverx.sap.kozhemyakina.Supplier.", "/LocalService/mockdata/suppliers.json"));

            suppliersCollection.attachRequestCompleted(function() {
                suppliers = suppliersCollection.getData();
                mythis.suppliers = suppliers;
                mythis.getView().setModel(new JSONModel(suppliers[0]), "SelectedSupplier");
                mythis.showAddressOnMap(mythis, suppliers[0].formatteAddress)
            })
        },

        findSupplier : function (suppliers, id){
            for (var i = 0; i < suppliers.length; i++){
                if (suppliers[i].Id == id){
                    return suppliers[i];
                }
            }
            return null;
        },


        onItemSelected: function(oEvent){
            var selectedItem = oEvent.getParameters().selectedItem;
            var context = selectedItem.getBindingContext();
            var oProduct = context.getObject();
            var supplierId = oProduct.SupplierId;
            var supplier = this.findSupplier(this.suppliers, supplierId);
            var oModel = new JSONModel(supplier);
            this.getView().setModel(oModel,"SelectedSupplier");
            this.showAddressOnMap(this, supplier.FormattedAddress)
        },

        onAfterRendering: function () {




            if (!this.initialized) {

                var mapOptions;

                this.initialized = true;
                this.geocoder = new google.maps.Geocoder();
                mapOptions = {
                    center: new google.maps.LatLng(53.9, 27.56),
                    zoom: 8,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                this.map = new google.maps.Map(this.getView().byId("map_canvas").getDomRef(),
                mapOptions);
            }
        },

        showAddressOnMap: function (self, address) {

            var marker;

            this.geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    self.map.setCenter(results[0].geometry.location);
                    marker = new google.maps.Marker({
                        map: self.map,
                        position: results[0].geometry.location
                    });
                }
            });
        },
    });


    return PageController;

});