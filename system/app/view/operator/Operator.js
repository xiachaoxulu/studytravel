Ext.define('Web.view.operator.Operator', {
    extend: 'Ext.container.Container',
    requires: ['Web.view.operator.OperatorController'],
    controller: 'operatorcontroller',
    xtype: 'widget.operator',
    layout: {
        type: 'border'
    },
    items: [{
        region: 'west',
        xtype: 'grid',
        title: '企业列表',
        width: 600,
        animate: true,
        style: {
            borderRight: '1px solid #c2c2c2'
        },
        emptyMsg: '没有选择任何模块',
        reference: 'operatorcompanylist',
        listeners: {
            select: 'onCompanySelect',
            rowcontextmenu: 'onCompanyContextMenu'
        },
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 50,
            align: 'center'
        }, {
            text: '公司编码',
            dataIndex: 'companyCode',
            flex: 1,
            
        }, {
            text: '公司名',
            dataIndex: 'companyName',
            flex: 1,
           
        }, {
            text: '联系人',
            dataIndex: 'linkMan',
            flex: 1,
             
        }, {
            text: '电话',
            dataIndex: 'phone',
            flex: 1,
           
        }],
        tbar: [{
            xtype: 'textfield',
            reference: 'companyname',
            fieldLabel: '企业名',
            labelWidth: 50
        }, "-", {
            text: '查询',
            glyph: 0xf002,
            listeners: {
                click: 'onBtnSearchClick'
            }
        }],
        bbar: [{
            xtype: 'pagingtoolbar',
            pageSize: 50,
            reference: 'pagetoolbar',
            displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
            emptyMsg: "没有数据",
            beforePageText: "第",
            afterPageText: "页 共{0}页",
            displayInfo: false
        }]
    }, {
        region: 'center',
        xtype: 'grid',
        title: '该企业管理员列表',
        reference: 'companyoperatorlist',
        listeners: {
            itemdblclick: 'onOperatorItemDblClick',
            rowcontextmenu: 'onOperatorContextMenu'
        },
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 50,
            align: 'center'
        }, {
            text: '类型',
            dataIndex: 'type',
            flex: 1,
            renderer: function(value) {
                switch (value) {
                    case 1:
                        return "超级管理员";
                    case 2:
                        return "系统操作员";
                    default:
                        return "";
                }
            }
        }, {
            text: '登录名',
            dataIndex: 'loginName',
            flex: 1,
        }, {
            text: '描述',
            dataIndex: 'des',
            flex: 1,
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
            text: '新增',
            glyph: 0xf0fe,
            listeners: {
                click: 'onOperatorBtnAddClick'
            }
        }, "-", {
            text: '编辑',
            iconCls: 'fa fa-edit',
            listeners: {
                click: 'onOperatorBtnEditClick'
            }
        }, "-", {
            text: '删除',
            iconCls: 'fa fa-remove',
            listeners: {
                click: 'onOperatorBtnDeleteClick'
            }
        }],

    }]
});