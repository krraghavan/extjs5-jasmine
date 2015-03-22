Ext.define('KRR.view.login.LoginPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.loginpanel',
    data: {
        userName: undefined,
        password: undefined
    },
    requires : [
        "KRR.API"
    ],
    initViewModel: function () {
        var me = this,
            viewModel = me.getViewModel();

        viewModel.set('userName', '');
        viewModel.set('password', '');

        me.callParent(arguments);
    },
    loginUser: function () {
        var me = this,
            viewModel = me.getViewModel(),
            params = {"username": viewModel.get("userName"), "password": viewModel.get("password")};
        KRR.API.doLogin(params, function(success, msg){
            viewModel.set("isLoginSuccessful", !success);
            if(success === false) {
                viewModel.set("loginErrorMessage", msg);
            }
            else {
                viewModel.set("loginErrorMessage", "");
            }
        }, me);
    }
});
