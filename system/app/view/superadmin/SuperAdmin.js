Ext.define('Web.view.superadmin.SuperAdmin', {
    extend: 'Ext.grid.Panel',
    requires: ['Web.view.superadmin.SuperAdminController'],
    xtype: 'widget.superadminlist',
    controller: 'superadmincontroller',
    stripeRows: true,
    rowNumberer: true,
    trackMouseOver: true,
    columnLines: true,
    selModel: {
        injectCheckbox: 0,
        mode: "SIMPLE", //"SINGLE"/"SIMPLE"/"MULTI"
        checkOnly: true //只能通过checkbox选择
    },
    listeners: {
        rowcontextmenu: 'onContextMenu'
    },
    selType: "checkboxmodel",
    tbar: [
        { text: '新增', glyph: 0xf0fe, listeners: { click: 'onbtnAddclick' } }, "-",
        { text: '编辑', glyph: 0xf013, listeners: { click: 'onbtneditclick' } }, "-",
        { text: '删除', glyph: 0xf014, listeners: { click: 'onbtndeleteclick' } }, "-",
        { xtype: 'textfield', reference: 'username', fieldLabel: '用户名', labelWidth: 50 },
        { text: '查询', glyph: 0xf002, listeners: { click: 'onbtnsearchclick' } } 
    ],

    bbar: [{
        xtype: 'pagingtoolbar',
        pageSize: 50,
        reference: 'pagetoolbar',
        displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
        emptyMsg: "没有数据",
        beforePageText: "当前页",
        afterPageText: "共{0}页",
        displayInfo: true,
        items: [
            '-',
            '每页显示', {
                xtype: 'combobox',
                store: new Ext.data.SimpleStore({
                    fields: ['text', 'value'],
                    data: [
                        ['50', 50],
                        ['200', 200],
                        ['500', 500]
                    ]
                }),
                mode: 'local',
                displayField: 'text',
                valueField: 'value',
                editable: false,
                allowBlank: false,
                triggerAction: 'all',
                width: 60,
                listeners: {
                    render: 'onrender',
                    select: 'onselect'
                }
            },
            '条'
        ],
    }],
    columns: [
        { xtype: 'rownumberer', text: '序号', width: 50, align: 'center' },
        { text: '用户名', dataIndex: 'userName', flex: 1 },
        { text: '描述', dataIndex: 'des', flex: 1 }, {
            text: '创建时间',
            dataIndex: 'createTime',
            flex: 1,
            renderer: function(value) {
                if (value == null || value == 0) {
                    return 'null'
                } else {
                    return Ext.util.Format.date(new Date(parseInt(value)), "Y-m-d H:i:s");
                }
            }
        }
    ]

});
