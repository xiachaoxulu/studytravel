Ext.define('Web.view.superadmin.SuperAdminAddOrUpdate', {
    extend: 'Ext.window.Window',
    title: '管理员详情',
    requires: ['Web.view.superadmin.SuperAdminAddOrUpdateController'],
    controller: 'superadminaddorupdatecontroller',
    modal: true,
    resizable:false,
    layout: {
        type: 'hbox'
    },
    items: {
        xtype: 'form',
        reference: 'myform',
        bodyPadding: 10,
        defaultType: 'textfield',
        items: [{
            fieldLabel: '用户名',
            reference: 'username',
            allowBlank: false,
            labelWidth: 60,
            maxLength: 50,
            emptyText: '请输入用户名'
        }, {
            fieldLabel: '密 码',
            labelWidth: 60,
            reference: 'password',
            inputType: 'password',
            allowBlank: false,
            emptyText: '请输入密码'
        }, {
            fieldLabel: '描 述',
            labelWidth: 60,
            reference: 'desc',
            emptyText: '请输入描述'
        }],
        buttons: [{
            text: '提交',
            formBind: true, //only enabled once the form is valid
            disabled: true,
            handler: 'onsubmit'
        }, {
            text: '退出',
            handler: 'onexit'
        }]
    }
});
