Ext.define("KRR.view.login.LoginPanel", {
    extend: "Ext.form.Panel",
    requires: [
        'KRR.view.login.LoginPanelController',
        'KRR.view.login.LoginPanelModel',
        'Ext.button.Button',
        'Ext.form.field.Text'
    ],
    controller: "loginpanel",
    alias: 'widget.loginpanel',
    viewModel: {
        type: "loginpanel"
    },
    layout : {
        type : 'vbox',
        align : 'middle',
        pack : 'center'
    },
    initComponent: function () {
        var me = this;

        me.defaults =  {
            labelAlign: 'top',
            hideEmptyLabel: true
        };
        me.items = [
            {
                xtype: 'component',
                hideMode: 'visibility',
                itemId: 'errorMsg',
                style : 'color:red;margin-bottom:5px;line-height:20px;',
                hidden: true,
                bind: {
                    visible: "{isLoginSuccessful}",
                    html: "{loginErrorMessage}"
                }
            },
            {
                xtype: 'textfield',
                itemId: 'userName',
                fieldLabel: "Username",
                emptyText: "Enter Username",
                //allowBlank: false,
                bind: {
                    'value': '{userName}'
                }
            },
            {
                xtype: 'textfield',
                inputType: 'password',
                itemId: 'password',
                fieldLabel: "Password",
                //allowBlank: false,
                emptyText: "Enter Password",
                bind: {
                    'value': '{password}'
                }
            },
            {
                xtype: 'container',
                cls: 'loginpanel-form-bbar',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'loginButton',
                        disabled: true,
                        text: "Login",
                        handler: 'loginUser',
                        bind: {
                            'disabled': '{!canLogin}'
                        }
                    }
                ]
            }
        ];
        me.callParent(arguments);
    },
    getUserNameField: function () {
        return this.down('#userName');
    },
    getPasswordField: function () {
        return this.down('#password');
    },
    getLoginButton: function () {
        return this.down('#loginButton');
    },
    getErrorMsgCmp: function () {
        return this.down("#errorMsg");
    }
});
