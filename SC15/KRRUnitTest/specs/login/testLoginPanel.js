
var KRR = KRR || {};
KRR.API = KRR.API || {};
describe("Unit tests for Login Panel", function() {

    beforeAll(function() {
        Ext.Loader.syncRequire("KRR.util.StringUtils");
        Ext.Loader.syncRequire("KRR.view.login.LoginPanel");
    });

    var goodUsername,
        unauthzUserName,
        loginPanel,
        invalidUserNameOrPasswordMessage = "Username or password is invalid",
        accessDeniedMessage = "Access denied";

    KRR.API.doLogin = function(params, cbFn, scope) {
        var userName = params.username,
            password = params.password;
        if(!Ext.isEmpty(userName) && !Ext.isEmpty(password)) {
            if(userName === goodUsername) {
                if(password === userName) {
                    // successful login
                    Ext.callback(cbFn, scope, [true]);
                }
                else {
                    // unsuccessful login
                    Ext.callback(cbFn, scope, [false, invalidUserNameOrPasswordMessage]);
                }
            }
            else {
                Ext.callback(cbFn, scope, [false, accessDeniedMessage]);
            }
        }
    };
    beforeEach(function() {
        goodUsername = KRR.util.StringUtils.generateRandomStr(10);
        unauthzUserName = KRR.util.StringUtils.generateRandomStr(10);
        loginPanel = Ext.create('KRR.view.login.LoginPanel', {
            width : 0,
            height : 0
        });
    });

    afterEach(function() {
        loginPanel.destroy();
        loginPanel = undefined;
    });

    it("Login button should be disabled when username and password is empty", function(done) {
        expect(loginPanel).toBeDefined();
        var userName = loginPanel.getUserNameField(),
            loginButton = loginPanel.getLoginButton(),
            passwordField = loginPanel.getPasswordField();
        loginPanel.on('afterrender', function(view){
            expect(userName).toBeDefined();
            userName.setValue("");
            expect(userName.getValue()).toEqual("");
            expect(loginButton.isDisabled()).toBeTruthy();
            passwordField.setValue("");
            expect(passwordField.getValue()).toEqual("");
            expect(loginButton.isDisabled()).toBeTruthy();
            done();
        });
        loginPanel.render(Ext.getBody());
    });

    it("Login button should be disabled when username is not empty and password is empty", function(done) {
        expect(loginPanel).toBeDefined();
        var userName = loginPanel.getUserNameField(),
            loginButton = loginPanel.getLoginButton(),
            passwordField = loginPanel.getPasswordField();
        loginPanel.on('afterrender', function(view){
            expect(userName).toBeDefined();
            userName.setValue(goodUsername);
            passwordField.setValue("");
            setTimeout(function(){
                expect(loginButton.isDisabled()).toBeTruthy();
                done();
            },100);
        });
        loginPanel.render(Ext.getBody());
    });

    it("Login button should be disabled when username is empty and password is not empty", function(done) {
        expect(loginPanel).toBeDefined();
        var userName = loginPanel.getUserNameField(),
            loginButton = loginPanel.getLoginButton(),
            passwordField = loginPanel.getPasswordField();
        loginPanel.on('afterrender', function(view){
            expect(userName).toBeDefined();
            userName.setValue("");
            passwordField.setValue(KRR.util.StringUtils.generateRandomStr(10));
            expect(loginButton.isDisabled()).toBeTruthy();
            done();
        });
        loginPanel.render(Ext.getBody());
    });

    it("Login button should be enabled when username or password is not empty", function(done) {
        expect(loginPanel).toBeDefined();
        var userName = loginPanel.getUserNameField(),
            loginButton = loginPanel.getLoginButton(),
            passwordField = loginPanel.getPasswordField();
        loginPanel.on('afterrender', function(view){
            userName.setValue(goodUsername);
            passwordField.setValue(KRR.util.StringUtils.generateRandomStr(10));
            setTimeout(function(){
                expect(loginButton.isDisabled()).toBeFalsy();
                done();
            },100);
        });
        loginPanel.render(Ext.getBody());
    });

    it("Must return an error when the authentication fails", function(done) {

        expect(loginPanel).toBeDefined();
        var errorHTML = "",
            loginButton = loginPanel.getLoginButton(),
            userNameField = loginPanel.getUserNameField(),
            passwordField = loginPanel.getPasswordField();

        loginPanel.on('afterrender', function(view){
            // error message is hidden when we start
            userNameField.setValue(goodUsername);
            // authc fails if username != password
            passwordField.setValue(KRR.util.StringUtils.generateRandomStr(10));
            expect(loginPanel.getErrorMsgCmp().isVisible()).toBeFalsy();
            loginButton.fireHandler();
            setTimeout(function(){
                errorHTML = loginPanel.getErrorMsgCmp().html;
                expect(errorHTML).toEqual(invalidUserNameOrPasswordMessage);
                expect(loginPanel.getErrorMsgCmp().isVisible()).toBeTruthy();
                done();
            },100);
        });
        loginPanel.render(Ext.getBody());
    });

    it("Must return an error when access is denied", function(done) {
        expect(loginPanel).toBeDefined();
        var errorHTML = "",
            userNameField = loginPanel.getUserNameField(),
            passwordField = loginPanel.getPasswordField(),
            loginButton = loginPanel.getLoginButton();

        loginPanel.on('afterrender', function(view){
            // authz fails if userName !== password
            userNameField.setValue(unauthzUserName);
            passwordField.setValue(KRR.util.StringUtils.generateRandomStr(10));
            expect(loginPanel.getErrorMsgCmp().isVisible()).toBeFalsy();
            loginButton.fireHandler();
            setTimeout(function(){
                errorHTML = loginPanel.getErrorMsgCmp().html;
                expect(errorHTML).toEqual(accessDeniedMessage);
                expect(loginPanel.getErrorMsgCmp().isVisible()).toBeTruthy();
                done();
            },100);
        });
        loginPanel.render(Ext.getBody());
    });

    it("Must not have an error when the authentication succeeds", function(done) {
        expect(loginPanel).toBeDefined();
        var errorHTML = "",
            userNameField = loginPanel.getUserNameField(),
            passwordField = loginPanel.getPasswordField(),
            loginButton = loginPanel.getLoginButton();

        loginPanel.on('afterrender', function(view){
            userNameField.setValue(goodUsername);
            passwordField.setValue(goodUsername);
            loginButton.fireHandler();
            setTimeout(function(){
                errorHTML = loginPanel.getErrorMsgCmp().html;
                expect(errorHTML).toEqual("");
                expect(loginPanel.getErrorMsgCmp().isVisible()).toBeFalsy();
                done();
            },100);
        });
        loginPanel.render(Ext.getBody());
    });
});
