/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.Loader.setPath({
    KRR: '../KRR/app'
});

//Ext.Loader.syncRequire("KRR.util.IPUtils");
//Ext.Loader.syncRequire("KRR.validator.HostIPAddressValidator");

Ext.define('UT.Application', {
    extend: 'Ext.app.Application',

    requires: [
        //"KRR.util.IPUtils",
        //"KRR.validator.HostIPAddressValidator"
    ],
    name: 'UT',

    stores: [
        // TODO: add global / shared stores here
    ],

    launch: function () {
        var jasmineEnv = jasmine.getEnv();
        if(KRR.jasmineSpecs.hasSpecs()) {
            var specs = KRR.jasmineSpecs.getSpecs(),
                count = specs.length,
                i;
            for(i = 0; i < count; i++) {
                specs[i]();
            }
        }
        jasmine.htmlReporter.initialize();
        jasmineEnv.execute();
    }
});
