Ext.define('Web.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.controller-login',
    loginText: '登录中...',
    afterRender: function() {
        var self = this
        document.onkeydown = function(event) {
            e = event ? event : (window.event ? window.event : null);
            if (e.keyCode == 13) {
                self.loginsubmit()
            }
        }
    },
    loginsubmit: function() {
        var form = this.lookupReference('loginform');
        var data = {};
        var self = this;
        data.username = form.getValues().username;
        data.password = form.getValues().password;
        Web.config.Tool.ajaxPost(Web.config.Config.onLogin, {
            userName: data.username,
            password: data.password
        }).then(function(success) {
            self.fireViewEvent('login', data.username);

        }).always(function() {
//            myMask.hide();
        });

    }



});