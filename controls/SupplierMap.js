sap.ui.define([
    "sap/ui/core/Control"
], function (Control) {
    "use strict";
    return Control.extend("leverx.sap.kozhemyakina.Supplier.controls.SupplierMap", {
        metadata : {
        },
        init : function () {
        },
        renderer : function (oRm, oControl) {
            oRm.write('<VBox fitContainer="true" justifyContent="Center" alignItems="Center">');
            oRm.write('<HBox id="map_canvas" fitContainer="true" justifyContent="Center" alignItems="Center" class="myMap"/>');
            oRm.write("</VBox>");
        }
    });
});

