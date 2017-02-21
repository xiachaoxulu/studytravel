Ext.define('Web.view.code.CodeAddOrUpdate', {
    extend: 'Ext.window.Window',
    title: '编码定义',
    requires: ['Web.view.code.CodeAddOrUpdateController'],
    controller: 'codeaddorupdatecontroller',
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
            fieldLabel: '定义名称',
            reference: 'difintionName',
            allowBlank: false,
            labelWidth: 60,
            maxLength: 50,
            emptyText: '请输入定义名'
        }, {
            fieldLabel: '视图类型',
            labelWidth: 60,
            reference: 'viewType',
            allowBlank: false,
            emptyText: '请输入视图类型'
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
