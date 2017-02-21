/**
 * @class Web.view.page.ColumnAddOrUpdate
 * @extends Ext.window.Window
 * Description
 */
Ext.define('Web.view.page.ColumnAddOrUpdate', {
	extend: 'Ext.window.Window',
	requires: ['Web.view.page.ColumnAddOrUpdateController'],
	controller: 'columnaddorupdatecontroller',
	modal: true,
	resizable: false,
	layout: {
		type: 'hbox'
	},
	items: {
		xtype: 'form',
		reference: 'columnform',
		bodyPadding: 10,
		defaultType: 'textfield',
		items: [{
			fieldLabel: '列编码',
			reference: 'columnID',
			allowBlank: false,
			labelWidth: 60,
			maxLength: 50,
			emptyText: '请输入列编码'
		}, {
			fieldLabel: '列名称',
			reference: 'columnCN',
			allowBlank: false,
			labelWidth: 60,
			maxLength: 50,
			emptyText: '请输入列名称'
		}, {
			fieldLabel: '描述',
			reference: 'des',
			labelWidth: 60,
			maxLength: 50,
			emptyText: '请输入描述'
		}],
		buttons: [{
			text: '提交',
			formBind: true,
			disabled: true,
			handler: 'onsubmit'
		}, {
			text: '退出',
			handler: 'onexit'
		}]
	}
});