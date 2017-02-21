Ext.define('Web.view.code.CodeContentAddOrUpdate', {
    extend: 'Ext.window.Window',
    title: '编码内容',
    requires: ['Web.view.code.CodeContentAddOrUpdateController'],
    controller: 'codecontentaddorupdatecontroller',
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
            fieldLabel: '编码值',
            reference: 'codeName',
            allowBlank: false,
            labelWidth: 60,
            maxLength: 50,
            emptyText: '请输入编码值'
        }, {
            fieldLabel: '编码',
            labelWidth: 60,
            reference: 'code',
            allowBlank: false,
            emptyText: '请输入编码'
        }, {
            xtype:'numberfield',
            fieldLabel: '排序',
            labelWidth: 60,
            reference: 'orderNum',
            emptyText: '请输入排序',
            minValue:1,
            allowBlank: false,
        }, {
            fieldLabel: '描述',
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
