Ext.define('Web.view.menubtn.MenubtnAddOrUpdate', {
    extend: 'Ext.window.Window',
    title: '按钮新增',
    requires: ['Web.view.menubtn.MenubtnAddOrUpdateController'],
    controller: 'menubtnaddorupdatecontroller',
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
            fieldLabel: '菜单名称',
            reference: 'menuName',
            allowBlank: false,
            labelWidth: 60,
            maxLength: 50,
            emptyText: '请输入菜单名称'
        },{
            fieldLabel: 'url',
            labelWidth: 60,
            reference: 'url',
            allowBlank: false,
            emptyText: '请输入url'
        },{
            fieldLabel: '描 述',
            labelWidth: 60,
            reference: 'des',
            emptyText: '请输入描述'
        },{
            fieldLabel: '选择模块',
            labelWidth: 60,
            emptyText: '请输入描述',
            xtype: 'combobox',
            displayField: 'moduleName',
            valueField: 'ID',
            editable: false,
            reference: 'moduleSelect',
            queryMode: 'local',
            listeners: {
                select: 'onModuleSelect'
            },
            store: Ext.create('Ext.data.Store', {
                field: ['ID', 'moduleName'],
                proxy: {
                    type: 'ajax',
                    url: Web.config.Tool.parseApiUrl(Web.config.Config.selectByModule),
                    useDefaultXhrHeader: false,
                    reader: {
                        type: 'json',
                        successProperty: 'success',
                        messageProperty: 'err_msg',
                        rootProperty: 'result'
                    }
                }
            })

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
