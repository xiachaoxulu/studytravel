/**
 * @class Web.view.page.PageAddOrUpdate
 * @extends Ext.window.Window
 * Description
 */
Ext.define('Web.view.page.PageAddOrUpdate', {
	extend: 'Ext.window.Window',
	requires: ['Web.view.page.PageAddOrUpdateController'],
	controller: 'pageaddorupdatecontroller',
	modal: true,
	resizable: false,
	layout: {
		type: 'hbox'
	},
	items: {
		xtype: 'form',
		reference: 'pageform',
		bodyPadding: 10,
		defaultType: 'textfield',
		items: [{
			fieldLabel: '视图名称',
			reference: 'pagename',
			allowBlank: false,
			labelWidth: 60,
			maxLength: 50,
			emptyText: '请输入视图名称'
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