Ext.define('Web.view.company.CompanyAddOrUpdate', {
    extend: 'Ext.window.Window',
    title: '管理员详情',
    requires: ['Web.view.company.CompanyAddOrUpdateController'],
    controller: 'companyaddorupdatecontroller',
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
            fieldLabel: '公司编码',
            reference: 'companycode',
            allowBlank: false,
            labelWidth: 60,
            maxLength: 50,
            emptyText: '请输入公司编码'
        }, {
            fieldLabel: '公司名',
            labelWidth: 60,
            reference: 'companyname',
            allowBlank: false,
            emptyText: '请输入公司名'
        }, {
            fieldLabel: '联系人',
            labelWidth: 60,
            reference: 'linkman',
            emptyText: '请输入联系人'
        }, {
            fieldLabel: '电话',
            labelWidth: 60,
            reference: 'phone',
            emptyText: '请输入电话'
        }, {
            fieldLabel: '备注',
            labelWidth: 60,
            reference: 'des',
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