sap.ui.require(
    [
        "leverx/sap/kozhemyakina/Supplier/model/formatter",
        "sap/ui/thirdparty/sinon",
        "sap/ui/thirdparty/sinon-qunit"
    ],
    function (formatter) {
        "use strict";
        QUnit.module("Formatting functions",{
            setup: function(){

            },
            teardown: function(){

            }
        });
        QUnit.test("Should return the translated texts", function(assert){
            var fnFormatter = formatter.floatFormatter;
            assert.strictEqual(fnFormatter("3.5"), 3.5, "Correct");
            assert.strictEqual(fnFormatter("9.2"), 9.2, "Correct");
            assert.strictEqual(fnFormatter("3.5"), "3.5", "Correct");
            assert.strictEqual(fnFormatter("2.5"), 6.5, "Correct");
        });
    }
)