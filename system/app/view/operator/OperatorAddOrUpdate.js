Ext.define('Web.view.operator.OperatorAddOrUpdate', {
    extend: 'Ext.window.Window',
    title: '管理员详情',
    requires: ['Web.view.operator.OperatorAddOrUpdateController'],
    controller: 'operatoraddorupdatecontroller',
    modal: true,
    resizable: false,
    layout: {
        type: 'hbox'
    },
    items: {
        xtype: 'form',
        reference: 'myform',
        bodyPadding: 10,
        defaultType: 'textfield',
        items: [{
            fieldLabel: '登录名',
            labelWidth: 60,
            reference: 'loginname',
            allowBlank: false,
            maxLength: 50,
            emptyText: '请输入登录名'
        }, {
            fieldLabel: '登录密码',
            labelWidth: 60,
            reference: 'password',
            allowBlank: false,
            maxLength: 50,
        }, {
            fieldLabel: '描 述',
            labelWidth: 60,
            reference: 'des',
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