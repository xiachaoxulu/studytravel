/**
 * Created by Dylan on 2016/3/8.
 */
Ext.define('Web.view.menu.Menu',{
    extend: 'Ext.container.Container',
    requires: ['Web.view.menu.MenuController'],
    xtype: 'widget.menu',
    controller: 'menucontroller',
    style: { backgroundColor: '#666' },
    layout: {
        type: 'border'
    }, 
    items: [{
        region:'west',
        xtype: 'treepanel',
        width:200,
        //useArrows:true,
        animate: true,
        reference: 'menutree',
        style: { borderRight: '1px solid #c2c2c2' },
        listeners: {
            itemclick: 'onTreeItemClick'
//            rowcontextmenu: 'onTreeContextMenu'
        }
    },{
        region:'center',
        xtype: 'treepanel',
        reference: 'menutreegrid',
        rootVisible: false,
        selType: "checkboxmodel",
        tbar: [
            { text: '新增根节点', glyph: 0xf0fe, listeners: { click: 'onbtnAddclick' } }, "-",
            { text: '编辑', glyph: 0xf013, listeners: { click: 'onbtneditclick' } }, "-",
            { text: '删除', glyph: 0xf014, listeners: { click: 'onbtndeleteclick' } }
            // { xtype: 'textfield', reference: 'menuName', fieldLabel: '菜单名', labelWidth: 50 },
            // { text: '查询', glyph: 0xf002, listeners: { click: 'onbtnsearchclick' } }
        ],
        columns: [{
            xtype: 'treecolumn', 
            text: '菜单名',
            flex: 2,
            sortable: true,
            dataIndex: 'menuName',
            
        },{
            text: '模块名',
            flex: 1,
            sortable: true,
            dataIndex: 'moduleID',
            align: 'center',
        }, {
            text: '父菜单',
            align: 'center',
            dataIndex:'parentID',
            reference: 'menutreegridParentID'
        },{
            text: '排序',
            flex: 1,
            dataIndex: 'orderNum',
            align: 'center',
            sortable: true
        }, {
            dataIndex: '链接地址',
            align: 'center',
            text:'url'
        }, {
            text: '描述',
            align: 'center',
            dataIndex:'des'
        }],
        listeners: {
//            itemclick: 'onTreeItemClick',
            rowcontextmenu: 'onTreeContextMenu'
        }

    
    }]



})



