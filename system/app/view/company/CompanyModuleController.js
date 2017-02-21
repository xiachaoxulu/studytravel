/**
 * @class Web.view.CompanyModuleController
 * @extends Ext.app.ViewController
 * Description
 */
Ext.define('Web.view.company.CompanyModuleController', {
	extend: 'Ext.app.ViewController',
	requires: ['Web.config.Tool', 'Web.config.Config'],
	alias: 'controller.companymodulecontroller',
	afterRender: function() {
		this._initCompanyStore();
		this._getAllModule();
	},
	_getAllModule: function() {
		var url = Web.config.Tool.parseApiUrl(Web.config.Config.selectByModule);
		Web.config.Tool.ajaxPost(url).then(function(module) {
			this.allModule = module;
		});
	},
	_initCompanyStore: function() {
		var self = this;
		var url = Web.config.Tool.parseApiUrl(Web.config.Config.selectByCompany);
		var store = Ext.create('Ext.data.Store', {
			pageSize: Web.config.Config.pageNum,
			proxy: {
				type: 'ajax',
				url: url,
				pageParam: 'pageNum',
				limitParam: 'pageSize',
				startParam: '',
				useDefaultXhrHeader: false,
				reader: {
					type: 'json',
					successProperty: 'success',
					messageProperty: 'err_msg',
					totalProperty: 'result.recordCount', // total data, see json output
					rootProperty: 'result.recordList' // see json output  
				}
			}
		});
		store.on('beforeload', function(store, options) {
			var companyName = self.lookupReference('companyname').getValue();
			Ext.apply(store.proxy.extraParams, {
				companyName: companyName
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
		self.lookupReference('companylist').setStore(store);
		self.lookupReference('pagetoolbar').setStore(self.lookupReference('companylist').store);
		self._refreshCompany();
	},
	_refreshCompany: function() {
		this.lookupReference('companylist').store.currentPage = 1;
		this.lookupReference('companylist').store.load();
	},
	onCompanySelect: function(grid, record, index, eOpts) {
		if (record) {
			this._refreshModule(record.data.ID);
		}
	},
	_refreshModule: function(companyID) {
		var self = this;
		var url = Web.config.Tool.parseApiUrl(Web.config.Config.selectByCompanyModule);
		Web.config.Tool.ajaxPost(url, {
			companyID: companyID
		}).then(function(companyModule) {
			var arrModuleID = [];
			for (var i = 0; i < companyModule.length; i++) {
				arrModuleID.push(companyModule[i].moduleID);
			}
			var result = [];
			for (var i = 0; i < this.allModule.length; i++) {
				if (Ext.Array.indexOf(arrModuleID, allModule[i].ID) != -1) {
					result.push({
						moduleID: allModule[i].ID,
						moduleName: allModule[i].moduleName,
						checked: true
					});
				} else {
					result.push({
						moduleID: allModule[i].ID,
						moduleName: allModule[i].moduleName,
						checked: false
					});
				}
			}
			var store = Ext.create('Ext.data.Store', {
				autoSync: true,
				fields: ['moduleID', 'moduleName', 'checked'],
				data: result
			});
			self.lookupReference('modulelist').setStore(store);
		});
	},
	onBtnSearchClick: function() {
		this._refreshCompany();
	},
	onCompanyModuleBtnSaveClick: function() {
		var self = this;
		if (self.lookupReference('companylist').getSelectionModel().getSelection().length <= 0) {
			Ext.Msg.alert('提示', '请先在企业列表中选择企业！');
			return;
		}
		Ext.Msg.show({
			title: '提示',
			message: '确认保存当前企业对应的操作模块?',
			buttons: Ext.Msg.OKCANCEL,
			icon: Ext.Msg.QUESTION,
			fn: function(btn) {
				if (btn === 'ok') {
					// Ext.getBody().mask("正在处理..."); //加载层
					var companyID = self.lookupReference('companylist').getSelectionModel().getSelection()[0].data.ID;
					var module = [];
					Ext.each(self.lookupReference('modulelist').getStore().data.items, function(item, index) {
						if (item.data.checked) {
							module.push(item.data.moduleID);
						}
					}, this);
					Web.config.Tool.ajaxPost(Web.config.Config.updateCompanyModule, {
						companyID: companyID,
						moduleIDs: JSON.stringify(module)
					}).then(function(result) {
						self._refreshModule(companyID);
						Ext.Msg.show({
							title: '提示',
							message: '保存成功！',
							buttons: Ext.Msg.OK
						});
					}).always(function() {
						Ext.getBody().unmask();
					});
				}
			}
		});
	}
});