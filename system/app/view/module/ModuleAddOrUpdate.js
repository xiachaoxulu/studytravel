/**
 * Created by Dylan on 2016/3/8.
 */
Ext.define('Web.view.module.ModuleAddOrUpdate',{
    extend:'Ext.window.Window',
    title: '模块详情',
    requires: ['Web.view.module.ModuleAddOrUpdateController'],
    controller: 'moduleaddorupdatecontroller',
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
            fieldLabel: '模块',
            reference: 'username',
            allowBlank: false,
            labelWidth: 60,
            maxLength: 50,
            emptyText: '请输入菜单'
        },{
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

