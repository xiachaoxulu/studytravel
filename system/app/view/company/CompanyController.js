Ext.define('Web.view.company.CompanyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.companycontroller',
    requires: ['Web.config.Tool', 'Web.config.Config', 'Web.view.company.CompanyAddOrUpdate'],
    //右键node节点事件  
    onContextMenu: function(view, record, tr, rowIndex, e, eOpts) {
        // debugger;
        //弹出右键
        if (record) { //若是目录
            view.getSelectionModel().select(rowIndex);
            this.ContextMenuTargetNode = record; //当前触发右键的record
            this.getContextMenu().showAt(e.getXY()); //显示contextmenu
        }
    },
    onrender: function(combo) {
        combo.setValue(Web.config.Config.pageNum);
    },
    onselect: function(combo) {
        this.getView().store.pageSize = parseInt(combo.getValue());
        this.getView().store.currentPage = 1;
        this.getView().store.load();
    },
    afterRender: function() {
        var self = this;
        var url = Web.config.Tool.parseApiUrl(Web.config.Config.selectByCompany);
        var store = Ext.create('Ext.data.Store', {
            pageSize: Web.config.Config.pageNum,
            proxy: {
                type: 'ajax',
                url: url,
                pageParam: "pageNum",
                limitParam: "pageSize",
                startParam: "",
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
            };
        });
        self.getView().setStore(store);
        self.lookupReference('pagetoolbar').setStore(self.getView().store);
        self._refresh();
    },
    _refresh: function() {
        this.getView().store.currentPage = 1;
        this.getView().store.load();
    },
    onbtnAddclick: function() {
        var self = this;
        new Web.view.company.CompanyAddOrUpdate().show().on('close', function(w, options) {
            if (w.state && w.state == 1) {
                self._refresh();
            }
        });
    },
    onbtneditclick: function() {
        this.edit();
    },
    onbtndeleteclick: function() {
        if (this.getView().getSelectionModel().getSelection().length !== 0) {
            var ids = [];
            var canDelete = true;
            Ext.each(this.getView().getSelectionModel().getSelection(), function(item, index) {
                if (item.data.valid == 1) {
                    canDelete = false;
                    return false;
                }
                ids.push(item.data.ID);
            });
            if (!canDelete) {
                Ext.Msg.alert('提示', "删除失败！选择的记录包含已启用的企业!");
                return;
            }
            this.delete2(ids);
        } else {
            Ext.Msg.alert('提示', "请选择需删除的数据行!");
        }
    },
    onbtnsearchclick: function() {
        this._refresh();
    },
    edit: function() {
        var company = this.getView().getSelectionModel().getSelection();
        if (company.length !== 0) {
            if (company.length > 1) {
                Ext.Msg.alert('提示', "请选择一行进行编辑!");
            } else {
                var self = this;
                new Web.view.company.CompanyAddOrUpdate({
                    modelID: company[0].data.ID
                }).show().on('close', function(w, options) {
                    if (w.state && w.state == 1) {
                        self._refresh();
                    }
                });
            }
        } else {
            Ext.Msg.alert('提示', "请选择需编辑的数据行!");
        }
    },
    delete2: function(ids) {
        var self = this;
        Ext.Msg.show({
            title: '提示',
            message: '数据删除后不可恢复.是否继续?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'ok') {
                    Ext.getBody().mask("正在处理..."); //加载层
                    Web.config.Tool.ajaxPost(Web.config.Config.deleteCompany, {
                        IDs: JSON.stringify(ids)
                    }).then(function(result) {
                        self._refresh();
                    }).always(function() {
                        Ext.getBody().unmask();
                    });
                }
            }
        });
    },
    getContextMenu: function() {
        var self = this;
        var company = self.getView().getSelectionModel().getSelection()[0].data;
        if (!this.menu) {
            var menu = new Ext.menu.Menu();
            menu.add({
                text: '编辑',
                glyph: 0xf013,
                handler: function() {
                    self.edit();
                }
            });
            menu.add({
                text: '删除',
                glyph: 0xf014,
                handler: function() {
                    var ids = [];
                    ids.push(self.getView().getSelectionModel().getSelection()[0].data.ID);
                    self.delete2(ids);
                }
            });
            menu.add({
                text: '禁用',
                iconCls: 'fa fa-toggle-off',
                handler: function() {
                    self._setEnable(0);
                }
            });
            menu.add({
                text: '启用',
                iconCls: 'fa fa-toggle-on',
                handler: function() {
                    self._setEnable(1);
                }
            });
            this.menu = menu;
        }
        if (company.valid) {
            this.menu.items.items[2].setVisible(true);
            this.menu.items.items[3].setVisible(false);
        } else {
            this.menu.items.items[2].setVisible(false);
            this.menu.items.items[3].setVisible(true);
        }
        return this.menu;
    },
    onItemdbClick: function(view, record, tr, rowIndex, e, eOpts) {
        if (record) {
            view.getSelectionModel().select(rowIndex);
            this.edit();
        }
    },
    onDisableClick: function() {
        var self = this;
        var company = self.getView().getSelectionModel().getSelection();
        if (company.length <= 0) {
            Ext.Msg.alert('提示', "请至少选择一条记录进行禁用操作!");
            return false;
        }
        self._setEnable(0);
    },
    onEnableClick: function() {
        var self = this;
        var company = self.getView().getSelectionModel().getSelection();
        if (company.length <= 0) {
            Ext.Msg.alert('提示', "请至少选择一条记录进行启用操作!");
            return false;
        }
        self._setEnable(1);
    },
    _setEnable: function(enable) {
        var self = this;
        var setEnable = false;
        Ext.each(self.getView().getSelectionModel().getSelection(), function(item, index) {
            if (item.data.valid != enable) {
                setEnable = true;
                return false;
            }
        });
        if (!setEnable) {
            Ext.Msg.alert('提示', "选择的企业已" + (enable == 0 ? '禁用' : '启用') + "!");
            return false;
        }
        Ext.Msg.show({
            title: '提示',
            message: '确认' + (enable == 0 ? '禁用' : '启用') + '选中的企业？',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'ok') {
                    var ids = [];
                    Ext.each(self.getView().getSelectionModel().getSelection(), function(item, index) {
                        ids.push(item.data.ID);
                    });
                    Ext.getBody().mask("正在处理..."); //加载层
                    var url = Web.config.Tool.parseApiUrl(Web.config.Config.updateCompanyValid);
                    Web.config.Tool.ajaxPost(url, {
                        IDs: JSON.stringify(ids),
                        valid: enable
                    }).then(function(result) {
                        self._refresh();
                    }).always(function() {
                        Ext.getBody().unmask();
                    });
                }
            }
        });
    }
});