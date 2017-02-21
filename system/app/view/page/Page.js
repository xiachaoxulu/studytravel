/**
 * @class Web.view.page.Page
 * @extends Ext.container.Container
 * Description
 */
Ext.define('Web.view.page.Page', {
	extend: 'Ext.container.Container',
	requires: ['Web.config.Tool', 'Web.config.Config', 'Web.view.page.PageController'],
	xtype: 'widget.page',
	controller: 'pagecontroller',
	layout: {
		type: 'border'
	},
	items: [{
		region: 'west',
		xtype: 'grid',
		title: '页面列表',
		reference: 'pagelist',
		width: 600,
		animate: true,
		style: {
			borderRight: '1px solid #c2c2c2'
		},
		listeners: {
			select: 'onPageSelect',
			itemdblclick: 'onPageItemDblClick',
			rowcontextmenu: 'onPageContextMenu'
		},
		columns: [{
			xtype: 'rownumberer',
			text: "序号",
			width: 50,
			align: 'center'
		}, {
			text: '页面视图名',
			dataIndex: 'pageName',
			flex: 1,
			width: 100
		}, {
			text: '描述',
			dataIndex: 'des',
			flex: 1
		}, {
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
		}],
		tbar: [{
			xtype: 'combobox',
			reference: 'module',
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
			}),
			fieldLabel: '选择模块',
			displayField: 'moduleName',
			valueField: 'ID',
			editable: false,
			queryMode: 'remote'
		}, "-", {
			text: '新增页面',
			glyph: 0xf0fe,
			listeners: {
				click: 'onBtnPageAddClick'
			}
		}, "-", {
			text: '编辑页面',
			glyph: 0xf013,
			listeners: {
				click: 'onBtnPageEditClick'
			}
		}, "-", {
			text: '删除页面',
			glyph: 0xf014,
			listeners: {
				click: 'onBtnPageDeleteClick'
			}
		}]
	}, {
		region: 'center',
		xtype: 'grid',
		title: '列名列表',
		reference: 'columnlist',
		animate: true,
		listeners: {
			itemdblclick: 'onColumnItemDblClick',
			rowcontextmenu: 'onColumnContextMenu'
		},
		columns: [{
			xtype: 'rownumberer',
			text: '序号',
			width: 50,
			align: 'center'
		}, {
			text: '列字段',
			dataIndex: 'columnID',
			flex: 1,
			width: 100
		}, {
			text: '列名',
			dataIndex: 'columnCN',
			flex: 1,
			width: 100
		}, {
			text: '描述',
			dataIndex: 'des',
			flex: 1,
			width: 100
		}, {
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
		}],
		tbar: [{
			text: '新增列',
			glyph: 0xf0fe,
			listeners: {
				click: 'onBtnColumnAddClick'
			}
		}, "-", {
			text: '编辑列',
			glyph: 0xf013,
			listeners: {
				click: 'onBtnColumnEditClick'
			}
		}, "-", {
			text: '删除列',
			glyph: 0xf014,
			listeners: {
				click: 'onBtnColumnDeleteClick'
			}
		}]
	}]
});