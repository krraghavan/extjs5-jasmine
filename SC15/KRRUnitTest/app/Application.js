/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.Loader.setPath({
    KRR: '../KRR/app'
});

Ext.define('UT.Application', {
    extend: 'Ext.app.Application',

    requires: [
    ],
    name: 'UT',

    stores: [
        // TODO: add global / shared stores here
    ],

    launch: function () {
        var jasmineEnv = jasmine.getEnv();
        jasmine.htmlReporter.initialize();
        jasmineEnv.execute();
    }
});
