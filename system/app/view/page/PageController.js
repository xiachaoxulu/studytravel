/**
 * @class Web.view.page.PageController
 * @extends Ext.app.ViewController
 * Description
 */
Ext.define('Web.view.page.PageController', {
	extend: 'Ext.app.ViewController',
	requires: ['Web.config.Tool', 'Web.config.Config', 'Web.view.page.PageAddOrUpdate', 'Web.view.page.ColumnAddOrUpdate'],
	alias: 'controller.pagecontroller',
	afterRender: function() {
		this._initPageStore();
		this._initColumnStore();
	},
	_initPageStore: function() {
		var self = this;
		var url = Web.config.Tool.parseApiUrl(Web.config.Config.selectByPage);
		var store = Ext.create('Ext.data.Store', {
			proxy: {
				type: 'ajax',
				url: url,
				useDefaultXhrHeader: false,
				reader: {
					type: 'json',
					successProperty: 'success',
					messageProperty: 'err_msg',
					rootProperty: 'result'
				}
			}
		});
		store.on('beforeload', function(store, options) {
			var moduleID = self.lookupReference('module').getSelection().data.ID;
			console.log(self.lookupReference('module').getSelection());
			Ext.apply(store.proxy.extraParams, {
				moduleID: moduleID
			});
		});
		store.on('load', function(store, records, successful, operation, eOpts) {
			if (!successful) {
				var error;
				if ((typeof operation.getError()) == 'object') {
					error = '服务器异常';
				} else {
					error = operation.getError();
				}
			}
		});
		self.lookupReference('pagelist').setStore(store);
	},
	_initColumnStore: function() {
		var self = this;
		var url = Web.config.Tool.parseApiUrl(Web.config.Config.selectByColumn);
		var store = Ext.create('Ext.data.Store', {
			proxy: {
				type: 'ajax',
				url: url,
				useDefaultXhrHeader: false,
				reader: {
					type: 'json',
					successProperty: 'success',
					messageProperty: 'err_msg',
					rootProperty: 'result'
				}
			}
		});
		store.on('beforeload', function(store, options) {
			var page = self.lookupReference('pagelist').getSelectionModel().getSelection();
			var pageID;
			if (page.length <= 0) {
				pageID = -1;
			} else {
				pageID = page[0].data.ID;
			}
			Ext.apply(store.proxy.extraParams, {
				pageID: pageID
			});
		});
		store.on('load', function(store, records, successful, operation, eOpts) {
			if (!successful) {
				var error;
				if ((typeof operation.getError()) == 'object') {
					error = '服务器异常';
				} else {
					error = operation.getError();
				}
			}
		});
		self.lookupReference('columnlist').setStore(store);
	},
	_refreshPage: function() {
		this.lookupReference('pagelist').store.load();
	},
	_refreshColumn: function() {
		this.lookupReference('columnlist').store.load();
	},
	_clearColumn: function() {
		this.lookupReference('columnlist').store.removeAll();
		this.lookupReference('columnlist').setTitle('列名列表');
	},
	onModuleSelect: function(combo, record, eOpts) {
		this.lookupReference('pagelist').setTitle('「' + record.data.moduleName + '」页面列表')
		this._refreshPage();
	},
	onPageSelect: function(grid, record, index, eOpts) {
		this.lookupReference('columnlist').setTitle('「' + record.data.pageName + '」列名列表')
		this._refreshColumn();
	},
	onBtnPageAddClick: function() {
		var module = this.lookupReference('module').getSelection();
		if (!module) {
			Ext.Msg.alert('提示', '请先在下拉框中选择要操作的模块！');
			return false;
		}
		var moduleID = module.data.ID;
		this.showPageAddOrUpdate({
			moduleID: moduleID
		});
	},
	onBtnPageEditClick: function() {
		this.editPage();
	},
	editPage: function() {
		var page = this.lookupReference('pagelist').getSelectionModel().getSelection();
		if (page.length <= 0) {
			Ext.Msg.alert('提示', '请先在页面列表中要编辑的记录！');
			return false;
		}
		var module = this.lookupReference('module').getSelection();
		var moduleID = module.data.ID;
		this.showPageAddOrUpdate({
			moduleID: moduleID,
			modelID: page[0].data.ID
		});
	},
	onBtnPageDeleteClick: function() {
		this.deletePage();
	},
	deletePage: function() {
		var page = this.lookupReference('pagelist').getSelectionModel().getSelection();
		if (page.length <= 0) {
			Ext.Msg.alert('提示', '请先在页面列表中要删除的记录！');
			return false;
		}
		var self = this;
		Ext.Msg.show({
			title: '提示',
			message: '确认要删除吗？删除后该页面下所有列信息也将删除！',
			buttons: Ext.Msg.OKCANCEL,
			icon: Ext.Msg.QUESTION,
			fn: function(btn) {
				if (btn == 'ok') {
					Ext.getBody().mask("正在处理...");
					var url = Web.config.Tool.parseApiUrl(Web.config.Config.deletePage);
					Web.config.Tool.ajaxPost(url, {
						ID: page[0].data.ID
					}).then(
						function(result) {
							self._refreshPage();
							self._clearColumn();
						}
					).always(function() {
						Ext.getBody().unmask();
					});
				}
			}
		});
	},
	showPageAddOrUpdate: function(data) {
		var self = this;
		new Web.view.page.PageAddOrUpdate(data).show().on('close', function(w, options) {
			if (w.state && w.state == 1) {
				self._refreshPage();
			}
		});
	},
	onBtnColumnAddClick: function() {
		var page = this.lookupReference('pagelist').getSelectionModel().getSelection();
		if (page.length <= 0) {
			Ext.Msg.alert('提示', '请先在页面列表中选择页面记录！');
			return false;
		}
		this.showColumnAddOrUpdate({
			pageID: page[0].data.ID
		});
	},
	onBtnColumnEditClick: function() {
		this.editColumn();
	},
	editColumn: function() {
		var column = this.lookupReference('columnlist').getSelectionModel().getSelection();
		if (column.length <= 0) {
			Ext.Msg.alert('提示', '请先在列列表中要编辑的记录！');
			return false;
		}
		var page = this.lookupReference('pagelist').getSelectionModel().getSelection()[0].data;
		this.showColumnAddOrUpdate({
			pageID: page.ID,
			modelID: column[0].data.ID
		});
	},
	onBtnColumnDeleteClick: function() {
		this.deleteColumn();
	},
	deleteColumn: function() {
		var column = this.lookupReference('columnlist').getSelectionModel().getSelection();
		if (column.length <= 0) {
			Ext.Msg.alert('提示', '请先在列列表中要删除的记录！');
			return false;
		}
		var self = this;
		Ext.Msg.show({
			title: '提示',
			message: '数据删除后不可恢复，是否继续？',
			buttons: Ext.Msg.OKCANCEL,
			icon: Ext.Msg.QUESTION,
			fn: function(btn) {
				if (btn == 'ok') {
					Ext.getBody().mask("正在处理...");
					var url = Web.config.Tool.parseApiUrl(Web.config.Config.deleteColumn);
					Web.config.Tool.ajaxPost(url, {
						ID: column[0].data.ID
					}).then(
						function(result) {
							self._refreshColumn();
						}
					).always(function() {
						Ext.getBody().unmask();
					});
				}
			}
		});
	},
	showColumnAddOrUpdate: function(data) {
		var self = this;
		new Web.view.page.ColumnAddOrUpdate(data).show().on('close', function(w, options) {
			if (w.state && w.state == 1) {
				self._refreshColumn();
			}
		});
	},
	onPageContextMenu: function(view, record, tr, rowIndex, e, eOpts) {
		if (record) {
			view.getSelectionModel().select(rowIndex);
			this.ContextMenuTargetNode = record;
			this.getPageContextMenu().showAt(e.getXY());
		}
	},
	onColumnContextMenu: function(view, record, tr, rowIndex, e, eOpts) {
		if (record) {
			view.getSelectionModel().select(rowIndex);
			this.ContextMenuTargetNode = record;
			this.getColumnContextMenu().showAt(e.getXY());
		}
	},
	onPageItemDblClick: function(view, record, tr, rowIndex, e, eOpts) {
		if (record) {
			view.getSelectionModel().select(rowIndex);
			this.editPage();
		}
	},
	onColumnItemDblClick: function(view, record, tr, rowIndex, e, eOpts) {
		if (record) {
			view.getSelectionModel().select(rowIndex);
			this.editColumn();
		}
	},
	getPageContextMenu: function() {
		var self = this;
		if (!this.pageMenu) {
			var menu = new Ext.menu.Menu;
			menu.add({
				text: '编辑',
				glyph: 0xf013,
				handler: function() {
					self.editPage();
				}
			});
			menu.add({
				text: '删除',
				glyph: 0xf014,
				handler: function() {
					self.deletePage();
				}
			});
			this.pageMenu = menu;
		}
		return this.pageMenu;
	},
	getColumnContextMenu: function() {
		var self = this;
		if (!this.columnMenu) {
			var menu = new Ext.menu.Menu;
			menu.add({
				text: '编辑',
				glyph: 0xf013,
				handler: function() {
					self.editColumn();
				}
			});
			menu.add({
				text: '删除',
				glyph: 0xf014,
				handler: function() {
					self.deleteColumn();
				}
			});
			this.columnMenu = menu;
		}
		return this.columnMenu;
	}
});