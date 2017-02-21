Ext.define('Web.view.login.Login', {
    extend: 'Ext.container.Container',
    requires: [
        'Web.view.login.LoginController'
    ],

    controller: 'controller-login',
    layout: {
        type: 'hbox',
        align: 'middle',
        pack: 'center'
    },
    cls: 'system-login',
    items: [{
        glyph: 0xf007,
        xtype: 'form',
        reference: 'loginform',
        bodyPadding: 20, // Don't want content to crunch against the borders
        width: 280,
        title: '人力管家-后台系统入口',
        items: [{
            xtype: 'textfield',
            fieldLabel: '用户名',
            allowBlank: false,
            labelWidth: 60,
            maxLength: 50,
            name: 'username',
            id: 'username',
            emptyText: '请输入用户名'
        }, {
            fieldLabel: '登录密码',
            allowBlank: false,
            maxLength: 50,
            labelWidth: 60,
            name: 'password',
            id: 'password',
            inputType: 'password',
            xtype: 'textfield',
            emptyText: '请输入密码'
        }],
        // Reset and Submit buttons
        buttons: [{
            text: '重置',
            glyph: 0xf118,
            handler: function() {
                this.up('form').getForm().reset();
            }
        }, {
            text: '提交',
            formBind: true, //only enabled once the form is valid
            disabled: true,
            glyph: 0xf110,
            handler: 'loginsubmit'
        }]
    }]

});
