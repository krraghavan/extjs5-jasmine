/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('KRR.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'KRR.view.main.MainController',
        'KRR.view.main.MainModel',
        "KRR.view.login.LoginPanel"
    ],

    xtype: 'app-main',

    controller: 'main',
    viewModel: {
        type: 'main'
    },
    layout : 'fit',
    items: [
        {
            xtype: 'loginpanel'
        }
    ]
});
