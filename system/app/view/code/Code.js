Ext.define('Web.view.code.Code', {
    extend: 'Ext.container.Container',
    requires: ['Web.view.code.CodeController'],
    controller: 'codecontroller',
    style: { backgroundColor: '#3892d3' },
    xtype: 'widget.code',
    layout: {
        type: 'border'
    },
    items: [{
        region: 'west',
        xtype: 'treepanel',
        width: 200,
        split: true,
        animate: true,
        reference: 'codetree',
        style: { borderRight: '1px solid #c2c2c2' },
        listeners: {
            itemclick: 'onTreeItemClick',
            rowcontextmenu: 'onTreeContextMenu'
        },
        columns: [
            { text: '编码定义', dataIndex: 'difintionName', flex: 1 },
            { text: '编号', dataIndex: 'ID', flex: 1 },
        ]

    }, {
        region: 'center',
        xtype: 'gridpanel',
        reference: 'codecontentgrid',
        stripeRows: true,
        rowNumberer: true,
        trackMouseOver: true,
        columnLines: true,
        selModel: {
            injectCheckbox: 0,
            mode: "SIMPLE", //"SINGLE"/"SIMPLE"/"MULTI"
            checkOnly: true //只能通过checkbox选择
        },
        selType: "checkboxmodel",
        tbar: [
            { text: '新增', glyph: 0xf0fe, listeners: { click: 'onGridbtnAddclick' } }, "-",
            { text: '编辑', glyph: 0xf013, listeners: { click: 'onGridbtneditclick' } }, "-",
            { text: '删除', glyph: 0xf014, listeners: { click: 'onGridbtndeleteclick' } }
        ],
        listeners: {
            rowcontextmenu: 'onGridContextMenu'
        },
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
            { text: '编码内容', dataIndex: 'codeName', flex: 1 },
            { text: '编码', dataIndex: 'code', flex: 1 },
            { text: '排序', dataIndex: 'orderNum', flex: 1 },
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
    }]
});
