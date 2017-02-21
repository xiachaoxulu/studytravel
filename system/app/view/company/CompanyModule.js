/**
 * @class Web.view.company.CompanyModule
 * @extends Ext.container.Container
 * Description
 */
Ext.define('Web.view.company.CompanyModule', {
	extend: 'Ext.container.Container',
	requires: [
		'Web.view.company.CompanyModuleController'
	],
	controller: 'companymodulecontroller',
	xtype: 'widget.companymodule',
	layout: {
		type: 'border'
	},
	items: [{
		region: 'west',
		xtype: 'grid',
		title: '企业列表',
		reference: 'companylist',
		width: 600,
		animate: true,
		style: {
			borderRight: '1px solid #c2c2c2'
		},
		listeners: {
			select: 'onCompanySelect'
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
			width: 50
		}, {
			text: '公司名',
			dataIndex: 'companyName',
			flex: 1,
			width: 150
		}, {
			text: '联系人',
			dataIndex: 'linkMan',
			flex: 1,
			width: 70
		}, {
			text: '电话',
			dataIndex: 'phone',
			flex: 1,
			width: 100
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
		title: '该企业对应操作模块',
		reference: 'modulelist',
		listeners: {},
		columns: [{
			xtype: 'rownumberer',
			text: '序号',
			width: 50,
			align: 'center'
		}, {
			xtype: 'checkcolumn',
			text: '可操作',
			dataIndex: 'checked'
		}, {
			text: '模块名称',
			dataIndex: 'moduleName',
			flex: 1
		}],
		tbar: [{
			text: '保存',
			iconCls: 'fa fa-save',
			listeners: {
				click: 'onCompanyModuleBtnSaveClick'
			}
		}]
	}]
});