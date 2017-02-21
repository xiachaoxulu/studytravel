/**
 * @class Web.view.page.ColumnAddOrUpdateController
 * @extends Ext.app.ViewController
 * Description
 */
Ext.define('Web.view.page.ColumnAddOrUpdateController', {
	extend: 'Ext.app.ViewController',
	requires: ['Web.config.Tool', 'Web.config.Config'],
	alias: 'controller.columnaddorupdatecontroller',
	afterRender: function() {
		var self = this;
		var modelID = this.getView().modelID;
		self.modelID = modelID;
		var pageID = this.getView().pageID;
		self.pageID = pageID;
		self.txtColumnID = self.getView().lookupReference('columnID');
		self.txtColumnCN = self.getView().lookupReference('columnCN');
		self.txtDes = self.getView().lookupReference('des');
		if (modelID) {
			self.getView().setTitle('修改列信息');
			var myMask = new Ext.LoadMask({
				msg: '加载中...',
				shadow: false,
				target: this.getView().lookupReference('columnform')
			});
			myMask.show();
			Web.config.Tool.ajaxPost(Web.config.Config.selectByColumn, {
				ID: modelID
			}).then(function(result) {
				if (result.length > 0) {
					self.txtColumnID.setValue(result[0].columnID);
					self.txtColumnCN.setValue(result[0].columnCN);
					self.txtDes.setValue(result[0].des);
					self.pageID = result[0].pageID;
				}
			}).always(function() {
				myMask.hide();
			});
		} else {
			self.getView().setTitle('新增列信息');
		}
	},
	onsubmit: function() {
		var self = this;
		if (!self.getView().lookupReference('columnform').isValid()) {
			Ext.Msg.alert('提示', '请输入必填信息！');
			return false;
		}
		var params = {};
		var url;
		params.pageID = self.pageID;
		params.columnID = self.txtColumnID.getValue();
		params.columnCN = self.txtColumnCN.getValue();
		params.des = self.txtDes.getValue();
		if (self.modelID) {
			params.ID = self.modelID;
			url = Web.config.Config.updateColumn;
		} else {
			url = Web.config.Config.insertColumn;
		}
		var myMask = new Ext.LoadMask({
			msg: '加载中...',
			shadow: false,
			target: this.getView().lookupReference('columnform')
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