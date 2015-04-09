
Ext.define('KRR.API', {
    singleton : true,

    /**
     * An actual login API function
     *
     * @param params
     */
    doLogin : function(params, cbFn, scope) {
        var userName = params["username"],
            password = params["password"];

        if(userName === password) {
            Ext.callback(cbFn, scope, [true, '']);
        }
        else {
            Ext.callback(cbFn, scope, [false, 'Invalid username or password']);
        }
    }
});