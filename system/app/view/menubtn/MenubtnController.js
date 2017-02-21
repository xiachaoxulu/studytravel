Ext.define('Web.view.menubtn.MenubtnController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.menubtncontroller',
    requires: ['Web.config.Tool', 'Web.config.Config'], //
    afterRender: function() {
        this._initModuleCombox();
        this._initBtnsStore();
        // this._initMenuStore();
    },
    onModuleSelect: function(grid, record, index, eOpts) {
        var moduleID = record.data.ID
        this._initMenuStore(moduleID)
    },
    _initModuleCombox: function() {
        var self = this;
        var recordMoudle = this.getView().recordMoudle;
        var store = new Ext.data.SimpleStore({
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
        });
        var type = self.getView().lookupReference('moduleSelect');
        type.setStore(store);
        store.load();
        store.on('load', function() {
            if (!store.getCount()) {
                return;
            }
        });
    },
    _refreshMenu: function() {
        this.lookupReference('menulist').store.currentPage = 1;
        this.lookupReference('menulist').store.load();
    },
    _initMenuStore: function(moduleID) {
        var self = this;
        Web.config.Tool.ajaxPost(Web.config.Config.selectBySysMenu, {
            moduleID: moduleID
        }).then(function(result) {
            var roots = self.convertToTreeArchitect(result);
            var treeGrid = self.getView().lookupReference('menulist');
            var gridStore = Ext.create('Ext.data.TreeStore', {
                root: {
                    children: roots,
                },
                proxy: {
                    type: 'memory',
                    reader: {
                        typeProperty: 'mtype'
                    }
                },
            });
            treeGrid.setStore(gridStore);
        });
    },
    convertToTreeArchitect: function(arrMenuNode) {
        var map = {};
        var node;
        var roots = [];
        for (var i = 0; i < arrMenuNode.length; i++) {
            node = arrMenuNode[i];
            node.children = [];
            node.leaf = true;
            map[node.ID] = i;
        }
        for (var i = 0; i < arrMenuNode.length; i++) {
            node = arrMenuNode[i];
            if (node.parentID != 0) {
                arrMenuNode[map[node.parentID]].children.push(node);
                arrMenuNode[map[node.parentID]].leaf = false;
            } else {
                roots.push(node);
            }
        }
        return roots;
    },
    _initBtnsStore: function(flag, menuIDS) {
        // btns 数据sotre
        var self = this;
        var codecontenturl = Web.config.Tool.parseApiUrl(Web.config.Config.selectButton);
        var datastore = Ext.create('Ext.data.Store', {
            pageSize: Web.config.Config.pageNum,
            fields: [{
                name: 'checked',
                type: 'bool',
                defaultValue: false
            }, ],
            proxy: {
                type: 'ajax',
                url: codecontenturl,
                useDefaultXhrHeader: false,
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    messageProperty: 'err_msg',
                    rootProperty: 'result' // see json output                   
                }
            }
        });
        datastore.on('load', function(store, records, successful, operation, eOpts) {
            // 显示当前menu含有的btnID并勾选;
            var btnIDS = [];
            for (var j = 0; j < menuIDS.length; j++) {
                if (menuIDS[j].menuID == self._menuId) {
                    btnIDS.push(menuIDS[j].btnID)
                }
            }
            for (var i = 0; i < store.getCount(); i++) {
                if (Ext.Array.indexOf(btnIDS, store.getAt(i).data.ID) != -1) {
                    store.getAt(i).data.checked = true;
                }
            }
            self.getView().lookupReference('btnlist').setStore(datastore);
            if (!successful) {
                var error;
                if ((typeof operation.getError()) == 'object') {
                    error = '服务器异常';
                } else {
                    error = operation.getError();
                }
            };
        });
        if (flag = true) {
            self.getView().lookupReference('btnlist').setStore(datastore);
        }
    },
    _refreshOperator: function() {
        var menuID = this.lookupReference('menulist').getSelectionModel().getSelection();
        var params = {};
        var url = Web.config.Tool.parseApiUrl(Web.config.Config.selectMenubtn);
        var flagP = true;
        var self = this;
        this.menuIDS = [];
        this._menuId = menuID[0].data.ID;
        Web.config.Tool.ajaxPost(url, {
            menuID: menuID[0].data.ID
        }).then(function(result) {
            for (var i = 0; i < result.length; i++) {
                self.menuIDS.push(result[i])
            }
            self._initBtnsStore(flagP, self.menuIDS);
            self.lookupReference('btnlist').store.load();
        })
    },
    onMenubtnSelect: function() {
        this._refreshOperator();
    },
    onBtnSearchClick: function() {
        var menuStore = this.getView().lookupReference('menulist').store;
    },
    onCompanyModuleBtnSaveClick: function() {
        var self = this;
        var menuID = this.lookupReference('menulist').getSelectionModel().getSelection()[0].data.ID;
        Ext.Msg.show({
            title: '提示',
            message: '确认保存当前企业对应的操作模块?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'ok') {
                    Ext.getBody().mask("正在处理..."); //加载层
                    var checked = [];
                    Ext.each(self.lookupReference('btnlist').getStore().data.items, function(item, index) {
                        if (item.data.checked == true) {
                            checked.push(item.data.ID);
                        }
                    }, this);
                    Web.config.Tool.ajaxPost(Web.config.Config.insertMenubtn, {
                        btnIDs: JSON.stringify(checked),
                        menuID: menuID,
                    }).then(function(result) {
                        self._refreshModule();
                    }).always(function() {
                        Ext.getBody().unmask();
                    });
                }
            }
        });
    }
});