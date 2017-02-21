/**
 * @class Web.view.page.PageAddOrUpdateController
 * @extends Ext.app.ViewController
 * Description
 */
Ext.define('Web.view.page.PageAddOrUpdateController', {
	extend: 'Ext.app.ViewController',
	requires: ['Web.config.Tool', 'Web.config.Config'],
	alias: 'controller.pageaddorupdatecontroller',
	afterRender: function() {
		var self = this;
		var modelID = this.getView().modelID;
		self.modelID = modelID;
		var moduleID = this.getView().moduleID;
		self.moduleID = moduleID;
		self.txtPageName = self.getView().lookupReference('pagename');
		self.txtDes = self.getView().lookupReference('des');
		if (modelID) {
			self.getView().setTitle('修改页面信息');
			var myMask = new Ext.LoadMask({
				msg: '加载中...',
				shadow: false,
				target: this.getView().lookupReference('pageform')
			});
			myMask.show();
			Web.config.Tool.ajaxPost(Web.config.Config.selectByPageID, {
				ID: modelID
			}).then(function(result) {
				self.txtPageName.setValue(result.pageName);
				self.txtDes.setValue(result.des);
			}).always(function() {
				myMask.hide();
			});
		} else {
			self.getView().setTitle('新增页面信息');
		}
	},
	onsubmit: function() {
		var self = this;
		if (!self.getView().lookupReference('pageform').isValid()) {
			Ext.Msg.alert('提示', '请输入必填信息！');
			return false;
		}
		var params = {};
		var url;
		params.moduleID = self.moduleID;
		params.pageName = self.txtPageName.getValue();
		params.des = self.txtDes.getValue();
		if (self.modelID) {
			params.ID = self.modelID;
			url = Web.config.Config.updatePage;
		} else {
			url = Web.config.Config.insertPage;
		}
		var myMask = new Ext.LoadMask({
			msg: '加载中...',
			shadow: false,
			target: this.getView().lookupReference('pageform')
		});
		myMask.show();
		Web.config.Tool.ajaxPost(url, params).then(function(result) {
			self.getView().state = 1;
			self.getView().close();
		}).always(function() {
			myMask.hide();
		});
	},
	onexit: function() {
		this.getView().state = 0;
		this.getView().close();
	}
});