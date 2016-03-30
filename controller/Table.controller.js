
sap.ui.define([
    'leverx/sap/kozhemyakina/Supplier/controller/BaseController',
    'sap/m/Button',
    'sap/m/Dialog',
    'sap/m/Text',
    'jquery.sap.global',
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',

], function(BaseController, Button, Dialog, Text, jQuery, Controller, JSONModel) {
    "use strict";

    return BaseController.extend("leverx.sap.kozhemyakina.Supplier.controller.Table", {

        onInit : function () {
        },


        /*onPressPageMap: function (oEvent){
            this.getRouter().navTo("Map");
        },
*/
        onPressPageMap: function (oEvent){
            this.getRouter().navTo("Map");
        },

        goToSupplierPage:function (oEvent){
            this.getRouter().navTo("ProductInfo", {
                Id: oEvent.getSource().getBindingContext().getProperty("Id")
            });
        },


        onMessageDialogPress: function (oEvent) {
            var b = jQuery.sap.getModulePath("leverx.sap.kozhemyakina.Supplier", "/LocalService/mockdata/reviews.json");
            var oModel = new JSONModel(b);
            var context = oEvent.getSource().getBindingContext();
            var object = context.getObject();

            var searchReview = function(r, id)
            {

                var result = [];
                var rLength = r.length;
                for (var j=0; j<rLength; j++) {
                    if (r[j].ProductId == id) {
                        result.push(r[j]);
                    }
                } return result;
            };

            var view = this.getView();
            oModel.attachRequestCompleted(function() {
                var reviews = oModel.getData();
                var id = object.Id;

                var listReview = searchReview(reviews, id);
                var dialog = new Dialog({
                    title: "Comments",
                    type: 'Message',
                    content : sap.ui.xmlview({
                        viewName: "leverx.sap.kozhemyakina.Supplier.view.Review",
                    }),
                    beginButton: new Button({
                        text: 'OK',
                        press: function () {
                            dialog.close();
                        }
                    }),
                    afterClose: function() {
                        dialog.destroy();
                    }
                });
                dialog.setModel(new JSONModel(listReview));
                dialog.open();
            });
        },

        onPressAdd: function () {
            var self = this;
            var dialog = new Dialog({
                title: "New product",
                type: 'Message',
                content : [
                    new sap.m.Input({
                        type: "Text",
                        placeholder: "Id",
                        id: "idInput",
                        enabled: true
                    }),
                    new sap.m.Input({
                        type: "Text",
                        placeholder: "Product name",
                        id: "nameInput",
                        enabled: true
                    }),
                    new sap.m.Input({
                        type: "Text",
                        placeholder: "Supplier name",
                        id: "supplierInput",
                        enabled: true
                    }),
                    new sap.m.Input({
                        type: "Text",
                        placeholder: "Description",
                        id: "descriptionInput",
                        enabled: true
                    }),
                    new sap.m.Input({
                        type: "Text",
                        placeholder: "Price",
                        id: "priceInput",
                        enabled: true
                    }),
                    new sap.m.Input({
                        type: "Text",
                        placeholder: "Rating",
                        id: "ratingInput",
                        enabled: true
                    })
                ],
                beginButton: new Button({
                    text: 'Create',
                    press: function () {
                        self.onCreate();
                        dialog.close();
                    }
                }),
                endButton: new Button({
                    text: 'Exit',
                    press: function () {
                        dialog.close();}
                }),
                afterClose: function() {
                    dialog.destroy(); }
            });
//Bind Context to dialog popup

            dialog.open();

        },

        onCreate: function () {
            var core = sap.ui.getCore();
            var id = core.byId('idInput').getValue();
            var name = core.byId('nameInput').getValue();
            var supplier = core.byId('supplierInput').getValue();
            var descr = core.byId('descriptionInput').getValue();
            var price = core.byId('priceInput').getValue();
            var rating = core.byId('ratingInput').getValue();

            var newEntry = new sap.m.ColumnListItem({
                cells: [

// Contents of the columns (1)
                    new sap.m.ObjectIdentifier({
                        title: name,
                        text: id
                    }),

// (2)
                    new sap.m.Text({
                        text: supplier
                    }),

                    new sap.m.Text({
                        text: descr
                    }),

                    new sap.m.Text({
                        text: price
                    }),

                    new sap.m.RatingIndicator({
                        maxValue: 5,
                        value : parseFloat(rating)
                    }),

                    new sap.m.Button({
                        text: "Message Dialog",
                        class: "sapUiSmallMarginBottom",
                        press: this.onMessageDialogPress
                    })
                ]
            });
            this.getView().byId('idProductsTable').addItem(newEntry);
        },

        onSelectionChange: function(){
            var oTable = this.getView().byId('idProductsTable');
            var count = oTable.getSelectedItems().length;
            var btn = this.getView().byId('removeButton');
            if (count > 0){
                btn.setType('Emphasized');
            } else {
                btn.setType('Default');
            }
        },

        onPressDelete:function(oEvent) {
            var source = oEvent.getSource();
            var oTable = this.getView().byId('idProductsTable');
            var selectedItems = oTable.getSelectedItems();
            for (var i = 0; i < selectedItems.length; i++){
                oTable.removeItem(selectedItems[i]);
            }
            var btn = this.getView().byId('removeButton');
            btn.setType('Default');
        },


    });

});