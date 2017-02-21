Ext.define('Web.view.code.CodeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.codecontroller',
    requires: ['Web.config.Tool', 'Web.config.Config', 'Web.view.code.CodeAddOrUpdate', 'Web.view.code.CodeContentAddOrUpdate'],

    afterRender: function() {
        var self = this;
        var tree = this.getView().lookupReference('codetree');
        var url = Web.config.Tool.parseApiUrl(Web.config.Config.selectByCodeDefintion);
        var oaStore = Ext.create('Ext.data.TreeStore', {
            root: {
                difintionName: '编码定义',
                expanded: true,
                glyph: 0xf0f8,
                ID:'(右键新增)',
                leaf: false
            },
            rootVisible:false,
            fields: [
                { name: 'id', type: 'string', mapping: 'ID' },
                { name: 'text', mapping: 'difintionName' },
                { name: 'leaf', type: 'bool', defaultValue: true },
            ],
            // 数据代理
            proxy: {
                // 请求方式
                type: 'ajax',
                // 请求网址
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
        oaStore.on('load', function(store, records, successful, operation, eOpts) {
            if (!successful) {
                var error;
                if ((typeof operation.getError()) == 'object') {
                    error = '服务器异常';
                } else {
                    error = operation.getError();
                }
                Ext.Msg.alert('提示', error);
            } else {
                //默认加载第一条
                tree.getSelectionModel().select(tree.getRootNode().firstChild);
                tree.fireEvent('itemclick', tree, tree.getRootNode().firstChild);
            }

        });
        tree.setStore(oaStore);

        //数据sotre
        var codecontenturl = Web.config.Tool.parseApiUrl(Web.config.Config.selectByCodeContent);
        var datastore = Ext.create('Ext.data.Store', {
            pageSize: Web.config.Config.pageNum,
            proxy: {
                type: 'ajax',
                url: codecontenturl,
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
        datastore.on('beforeload', function(store, options) {
            var difintionID = self.getView().difintionID;
            Ext.apply(store.proxy.extraParams, { difintionID: difintionID });
        });
        datastore.on('load', function(store, records, successful, operation, eOpts) {
            if (!successful) {
                var error;
                if ((typeof operation.getError()) == 'object') {
                    error = '服务器异常';
                } else {
                    error = operation.getError();
                }
            };

        });
        self.getView().lookupReference('codecontentgrid').setStore(datastore);
        self.getView().lookupReference('pagetoolbar').setStore(datastore);


    },
    onrender: function(combo) {
        combo.setValue(Web.config.Config.pageNum);
    },
    onselect: function(combo) {
        this.getView().lookupReference('codecontentgrid').store.pageSize = parseInt(combo.getValue());
        this.getView().lookupReference('codecontentgrid').store.currentPage = 1;
        this.getView().lookupReference('codecontentgrid').store.load();
    },
    onTreeItemClick: function(view, record) {
        if (record) {
            if (record.data.leaf) {
                var self = this;
                self.getView().difintionID = record.data.ID;
                self.getView().lookupReference('codecontentgrid').getStore().load();
            }
        }
    },
    onTreeContextMenu: function(view, record, tr, rowIndex, e, eOpts) {
        var isroot = !record.data.leaf;
        view.getSelectionModel().select(rowIndex);
        this.getTreeContextMenu('tree', isroot).showAt(e.getXY()); //显示contextmenu

    },
    TreeRefresh: function() {

        this.getView().lookupReference('codetree').getStore().load();
    },
    TreeAdd: function() {
        var self = this;
        new Web.view.code.CodeAddOrUpdate().show()
            .on('close', function(w, options) {
                if (w.state && w.state == 1) {
                    self.TreeRefresh();
                }
            });
    },
    TreeEdit: function(record) {
        var self = this;
        new Web.view.code.CodeAddOrUpdate({
                modelID: record.ID
            }).show()
            .on('close', function(w, options) {
                if (w.state && w.state == 1) {

                    self.TreeRefresh();
                }
            });
    },
    TreeDelete: function(ids) {
        var self = this;
        Ext.Msg.show({
            title: '提示',
            message: '数据删除后不可恢复.是否继续?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'ok') {
                    var myMask = new Ext.LoadMask({
                        msg: '加载中...',
                        shadow: false,
                        target: self.getView().lookupReference('codetree')
                    });
                    myMask.show(); //加载层
                    Web.config.Tool.ajaxPost(Web.config.Config.deleteCodeDefintion, {
                        IDs: JSON.stringify(ids)
                    }).then(
                        function(result) {
                            self.TreeRefresh();
                        }).always(function() {
                        myMask.hide();
                    });
                }
            }
        });
    },
    onGridbtnAddclick: function(btn) {
        this.GridAdd();
    },
    onGridbtneditclick: function(btn) {
        var seleteds = this.getView().lookupReference('codecontentgrid').getSelectionModel().getSelection();
        if (seleteds.length !== 0) {
            if (seleteds.length > 1) {
                Ext.Msg.alert('提示', "请选择一行进行编辑!");
            } else {
                this.GridEdit(seleteds[0].data);
            }
        } else {

            Ext.Msg.alert('提示', "请选择需编辑的数据行!");
        }
    },
    onGridbtndeleteclick: function(btn) {
        var seleteds = this.getView().lookupReference('codecontentgrid').getSelectionModel().getSelection();
        if (seleteds.length !== 0) {
            var ids = [];
            Ext.each(seleteds, function(item, index) {
                ids.push(item.data.ID);
            });
            this.GridDelete(ids);
        } else {
            Ext.Msg.alert('提示', "请选择需删除的数据行!");
        }
    },
    onGridbtnexportclick: function(btn) {

    },
    GridRefresh: function() {

        this.getView().lookupReference('codecontentgrid').getStore().load();
    },
    GridAdd: function() {
        var self = this;
        new Web.view.code.CodeContentAddOrUpdate({
                difintionID: self.getView().difintionID
            }).show()
            .on('close', function(w, options) {
                if (w.state && w.state == 1) {
                    self.GridRefresh();
                }
            });
    },
    GridEdit: function(record) {
        var self = this;
        new Web.view.code.CodeContentAddOrUpdate({
                modelID: record.ID
            }).show()
            .on('close', function(w, options) {
                if (w.state && w.state == 1) {

                    self.GridRefresh();
                }
            });
    },
    GridDelete: function(ids) {
        var self = this;
        Ext.Msg.show({
            title: '提示',
            message: '数据删除后不可恢复.是否继续?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'ok') {
                    var myMask = new Ext.LoadMask({
                        msg: '加载中...',
                        shadow: false,
                        target: self.getView().lookupReference('codecontentgrid')
                    });
                    myMask.show(); //加载层
                    Web.config.Tool.ajaxPost(Web.config.Config.deleteCodeContent, {
                        IDs: JSON.stringify(ids)
                    }).then(
                        function(result) {
                            self.GridRefresh();
                        }).always(function() {
                        myMask.hide();
                    });
                }
            }
        });
    },
    getTreeContextMenu: function(type, isroot) {
        var self = this;

        var menu = new Ext.menu.Menu();
        menu.add({
            text: '新增',
            glyph: 0xf055,
            handler: function() {
                if (type == "tree") {
                    self.TreeAdd();
                } else {
                    self.GridAdd();
                }
            }
        });
        menu.add({
            text: '编辑',
            glyph: 0xf013,
            handler: function() {
                if (type == "tree") {
                    self.TreeEdit(self.getView().lookupReference('codetree').getSelectionModel().getSelection()[0].data);
                } else {
                    self.GridEdit(self.getView().lookupReference('codecontentgrid').getSelectionModel().getSelection()[0].data);
                }
            }
        });
        menu.add({
            text: '删除',
            glyph: 0xf014,
            handler: function() {
                if (type == "tree") {
                    var ids = []; 
                    ids.push(self.getView().lookupReference('codetree').getSelectionModel().getSelection()[0].data.ID);
                    self.TreeDelete(ids);
                } else {
                    if (self.getView().lookupReference('codecontentgrid').getSelectionModel().getSelection().length !== 0) {
                        var ids = [];
                        Ext.each(self.getView().lookupReference('codecontentgrid').getSelectionModel().getSelection(), function(item, index) {
                            ids.push(item.data.ID);
                        });
                        self.GridDelete(ids);
                    } else {
                        Ext.Msg.alert('提示', "请选择需删除的数据行!");
                    }
                }
            }
        });
        this.menu = menu;

        if (type == "tree") {
            Ext.each(this.menu.items.items, function(item, index) {
                if (isroot) {
                    if (item.text === "新增") {
                        item.setVisible(true);
                    } else {
                        item.setVisible(false);
                    }
                } else {
                    if (item.text === "新增") {
                        item.setVisible(false);
                    } else {
                        item.setVisible(true);
                    }
                }
            })
        } else {
            Ext.each(this.menu.items.items, function(item, index) {
                if (item.text === "新增") {
                    item.setVisible(false);
                } else {
                    item.setVisible(true);
                }
            })
        }

        return this.menu;
    },
    onGridContextMenu: function(view, record, tr, rowIndex, e, eOpts) {
        view.getSelectionModel().select(rowIndex);
        this.getTreeContextMenu('grid').showAt(e.getXY()); //显示contextmenu

    }

});
