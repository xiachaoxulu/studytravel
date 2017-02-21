Ext.define('Web.view.operator.OperatorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.operatorcontroller',
    requires: ['Web.config.Tool', 'Web.config.Config', 'Web.view.operator.OperatorAddOrUpdate'],

    afterRender: function() {
        this._initCompanyStore();
        this._initOperatorStore();
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
        self.lookupReference('operatorcompanylist').setStore(store);
        self.lookupReference('pagetoolbar').setStore(self.lookupReference('operatorcompanylist').store);
        self._refreshCompany();
    },
    _refreshCompany: function() {
        this.lookupReference('operatorcompanylist').store.currentPage = 1;
        this.lookupReference('operatorcompanylist').store.load();
    },
    _initOperatorStore: function() {
        var self = this;
        var url = Web.config.Tool.parseApiUrl(Web.config.Config.selectByOperator);
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
            var company = self.lookupReference('operatorcompanylist').getSelectionModel().getSelection();
            if (company.length <= 0) {
                return false;
            }
            self.lookupReference('companyoperatorlist').setTitle('「' + (company[0].data.companyName || '') + '」企业管理员');
            Ext.apply(store.proxy.extraParams, {
                companyID: company[0].data.ID
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
        self.lookupReference('companyoperatorlist').setStore(store);
    },
    _refreshOperator: function() {
        this.lookupReference('companyoperatorlist').store.load();
    },
    showAddOrUpdate: function(data) {
        var self = this;
        new Web.view.operator.OperatorAddOrUpdate(data).show().on('close', function(w, options) {
            if (w.state && w.state == 1) {
                self._refreshOperator();
            }
        });
    },
    deleteOperator: function(id) {
        var self = this;
        Ext.Msg.show({
            title: '提示',
            message: '数据删除后不可恢复，是否继续？',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn == 'ok') {
                    Ext.getBody().mask("正在处理...");
                    Web.config.Tool.ajaxPost(Web.config.Tool.parseApiUrl(Web.config.Config.deleteOperator), {
                        ID: id
                    }).then(
                        function(result) {
                            self._refreshOperator();
                        }
                    ).always(function() {
                        Ext.getBody().unmask();
                    });
                }
            }
        });
    },
    editOperator: function() {
        var self = this;
        var operator = self.lookupReference('companyoperatorlist').getSelectionModel().getSelection();
        if (operator.length <= 0) {
            Ext.Msg.alert('提示', '请先在界面右侧管理员列表中选择要编辑的管理员！');
            return;
        }
        this.showAddOrUpdate({
            modelID: operator[0].data.ID
        });
    },
    getOperatorContextMenu: function() {
        var self = this;
        if (!this.operatorMenu) {
            var menu = new Ext.menu.Menu();
            menu.add({
                text: '编辑',
                glyph: 0xf013,
                handler: function() {
                    self.editOperator();
                }
            });
            menu.add({
                text: '删除',
                glyph: 0xf014,
                handler: function() {
                    var id = self.lookupReference('companyoperatorlist').getView().getSelectionModel().getSelection()[0].data.ID;
                    self.deleteOperator(id);
                }
            });
            this.operatorMenu = menu;
        }
        return this.operatorMenu;
    },
    getCompanyContextMenu: function() {
        var self = this;
        if (!this.companyMenu) {
            var menu = new Ext.menu.Menu();
            menu.add({
                text: '新增企业管理员',
                glyph: 0xf013,
                handler: function() {
                    self.addOperator();
                }
            });
            this.companyMenu = menu;
        }
        return this.companyMenu;
    },
    onBtnSearchClick: function() {
        this._refreshCompany();
    },
    onCompanySelect: function() {
        this._refreshOperator();
    },
    onOperatorBtnAddClick: function() {
        this.addOperator();
    },
    addOperator: function() {
        var self = this;
        var company = self.lookupReference('operatorcompanylist').getSelectionModel().getSelection();
        if (company.length <= 0) {
            Ext.Msg.alert('提示', '请先在界面左侧企业列表中点击要添加管理员所在的企业！');
            return;
        }
        this.showAddOrUpdate({
            companyID: company[0].data.ID
        });
    },
    onOperatorBtnEditClick: function() {
        this.editOperator();
    },
    onOperatorBtnDeleteClick: function() {
        var self = this;
        var operator = self.lookupReference('companyoperatorlist').getSelectionModel().getSelection();
        if (operator.length <= 0) {
            Ext.Msg.alert('提示', '请先在界面右侧管理员列表中选择要删除的管理员！');
            return;
        }
        this.deleteOperator(operator[0].data.ID);
    },
    onOperatorItemDblClick: function(view, record, tr, rowIndex, e, eOpts) {
        if (record) {
            view.getSelectionModel().select(rowIndex);
            this.editOperator();
        }
    },
    onOperatorContextMenu: function(view, record, tr, rowIndex, e, eOpts) {
        if (record) {
            view.getSelectionModel().select(rowIndex);
            this.ContextMenuTargetNode = record;
            this.getOperatorContextMenu().showAt(e.getXY());
        }
    },
    onCompanyContextMenu: function(view, record, tr, rowIndex, e, eOpts) {
        if (record) {
            view.getSelectionModel().select(rowIndex);
            this.ContextMenuTargetNode = record;
            this.getCompanyContextMenu().showAt(e.getXY());
        }
    }
});