Ext.define('Web.view.menubtn.Menubtn', {
    extend: 'Ext.container.Container',
    requires: ['Web.view.menubtn.MenubtnController'],
    controller: 'menubtncontroller',
    xtype: 'widget.menubtn',
    layout: {
        type: 'border'
    },
    items: [{
        region: 'west',
        xtype: 'treepanel',
        title: '菜单列表',
        width: '50%',
        animate: true,
        style: {
            borderRight: '1px solid #c2c2c2'
        },
        emptyMsg: '没有选择任何模块',
        reference: 'menulist',
        listeners: {
            itemclick: 'onMenubtnSelect'
        },
        columns: [{
            xtype: 'treecolumn',
            text: '菜单名',
            flex: 2,
            sortable: true,
            dataIndex: 'menuName',
        }, {
            text: '模块名',
            flex: 1,
            sortable: true,
            dataIndex: 'moduleID',
            align: 'center',
        }, {
            text: '父菜单',
            align: 'center',
            dataIndex: 'parentID',
            reference: 'menutreegridParentID'
        }, {
            text: '排序',
            flex: 1,
            dataIndex: 'orderNum',
            align: 'center',
            sortable: true
        }, {
            dataIndex: '链接地址',
            align: 'center',
            text: 'url'
        }, {
            text: '描述',
            align: 'center',
            dataIndex: 'des'
        }],
        tbar: [{
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
        },{
            xtype: 'textfield',
            reference: 'companyname',
            fieldLabel: '菜单名',
            labelWidth: 50
        }, "-", {
            text: '查询',
            glyph: 0xf002,
            listeners: {
                click: 'onBtnSearchClick'
            }
        }]
    }, {
        region: 'center',
        xtype: 'grid',
        title: '按钮列表',
        reference: 'btnlist',
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            align: 'center',
            width: 60,
        }, {
            xtype: 'checkcolumn',
            text: '可操作',
            dataIndex: 'checked'
        }, {
            text: '按钮名称',
            dataIndex: 'btnName',
            flex: 1,
            width: 50
        }, {
            text: '描述',
            dataIndex: 'des',
            flex: 1,
            width: 150
        }, {
            text: 'valid',
            dataIndex: 'valid',
            flex: 1,
            width: 70
        },{
            text: 'btnID',
            dataIndex: 'btnID',
            flex: 1,
            width: 70
        }, {
            text: '创建日期',
            dataIndex: 'createTime',
            flex: 1,
            renderer: function(value) {
                if (value == null || value == 0) {
                    return 'null'
                } else {
                    return Ext.util.Format.date(new Date(parseInt(value)), "Y-m-d H:i:s");
                }
            }
        }],
        tbar: [{
            text: '保存',
            glyph: 0xf0fe,
            listeners: {
                click: 'onCompanyModuleBtnSaveClick'
            }
        }],
    }]
});