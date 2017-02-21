Ext.define('Web.view.menu.MenuAddOrUpdate', {
    extend: 'Ext.window.Window',
    title: '菜单新增',
    requires: ['Web.view.menu.MenuAddOrUpdateController', 'Web.view.common.ComboTree'],
    controller: 'menuaddorupdatecontroller',
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
            fieldLabel: '菜单名称',
            reference: 'menuName',
            allowBlank: false,
            labelWidth: 60,
            maxLength: 50,
            emptyText: '请输入菜单名称'
        }, {
            fieldLabel: 'url',
            labelWidth: 60,
            reference: 'url',
            allowBlank: false,
            emptyText: '请输入url'
        }, {
            fieldLabel: '描 述',
            labelWidth: 60,
            reference: 'des',
            emptyText: '请输入描述'
        }, {
            fieldLabel: '选择模块',
            labelWidth: 60,
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
        }, {
            fieldLabel: '选择一个根节点',
            labelWidth: 60,
            emptyText: '请选择一个根节点',
            xtype: 'treepicker',
            displayField: 'menuName',
            valueField: 'ID',
            editable: false,
            reference: 'menuNameSelect',
            queryMode: 'local',
            animate: true,
            listeners: {
                select: 'onMenuNameSelect'
            },
            // store: '', // this field is required, paste the store object
            listConfig: { // config of gridpanel (full config of gridpanel)
                selModel: {
                    injectCheckbox: 0,
                    mode: "MULTI", //"SINGLE"/"SIMPLE"/"MULTI"
                    checkOnly: true //只能通过checkbox选择
                },
            }
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