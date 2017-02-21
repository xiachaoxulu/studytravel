/**
 * Created by Dylan on 2016/3/8.
 */
Ext.define('Web.view.activiti.ActivitiAddOrUpdate',{
    extend:'Ext.window.Window',
    title: '工作流新增',
    requires: ['Web.view.activiti.ActivitiAddOrUpdateController'],
    controller: 'activitiaddorupdatecontroller',
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
            fieldLabel: '选择模块',
            labelWidth: 100,
            emptyText: '请选择模块',
            xtype: 'combobox',
            displayField: 'moduleName',
            valueField: 'ID',
            editable: false,
            reference: 'moduleSelect',
            queryMode: 'local',
            listeners: {
                select: 'onModuleSelect'
            }
        },{
            fieldLabel: '表单名（入职、请假等）',
            labelWidth: 100,
            reference: 'formAll',
            emptyText: '请输入按钮编码'
        },{
            fieldLabel: '表单表名',
            labelWidth: 100,
            reference: 'formName',
            emptyText: '请输入按钮编码'
        },{
            fieldLabel: '描述',
            labelWidth: 100,
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

