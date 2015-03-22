Ext.define('KRR.view.login.LoginPanelModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.loginpanel',
    parent : 'main',
    data: {
        userName: undefined,
        password: undefined,
        loginErrorMessage: undefined,
        isLoginSuccessful: false
    },
    formulas: {
        canLogin: function (get) {
            return !Ext.isEmpty(Ext.String.trim(get('userName'))) && !Ext.isEmpty(Ext.String.trim(get('password')));
        }
    }

});
