/**
 * Created by Dylan on 2016/3/8.
 */
Ext.define('Web.view.menu.MenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.menucontroller',
    requires: ['Web.config.Tool', 'Web.config.Config', 'Web.view.menu.MenuAddOrUpdate'],
    afterRender: function() {
        var self = this;
        var tree = this.getView().lookupReference('menutree');
        var url = Web.config.Tool.parseApiUrl(Web.config.Config.selectByModule);
        var oaStore = Ext.create('Ext.data.TreeStore', {
            root: {
                text: '模块列表',
                expanded: true,
                glyph: 0xf0f8,
                leaf: false
            },
            fields: [{
                name: 'text',
                mapping: 'moduleName'
            }, {
                name: 'leaf',
                type: 'bool',
                defaultValue: true
            }, ],
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
                    totalProperty: 'result.recordCount',
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
    },
    initGridStore: function(moduleID) {
        var self = this;
        Web.config.Tool.ajaxPost(Web.config.Config.selectBySysMenu, {
            moduleID: moduleID
        }).then(function(result) {
            console.log(result)
            var roots = self.convertToTreeArchitect(result);
            console.log(roots)
            var treeGrid = self.getView().lookupReference('menutreegrid');
            var gridStore = Ext.create('Ext.data.TreeStore', {
                root: {
                    children: roots
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
    onTreeItemClick: function(view, record) {
        //console.log(record)
        if (record.data.leaf) {
            var self = this;
            self.getView().menuDifintionID = record.data.ID;
            self.getView().lookupReference('menutreegrid').getStore().load();
            self.initGridStore(record.data.ID);
            this.index = record.data.index;
        }
    },
    onTreeContextMenu: function(view, record, tr, rowIndex, e, eOpts) {
        // if (rowIndex > 0) {
            var isroot = !record.data.leaf;
            view.getSelectionModel().select(rowIndex);
            this.getTreeContextMenu('tree', isroot).showAt(e.getXY()); //显示contextmenu
        // }
    },
    getTreeContextMenu: function(type, isroot) {
        var self = this;
        if (!this.menu) {
            var menu = new Ext.menu.Menu();
            menu.add({
                text: '新增',
                glyph: 0xf055,
                handler: function() {
                    self.GridAdd(self.getView().lookupReference('menutreegrid').getSelectionModel().getSelection()[0].data);
                }
            });
            menu.add({
                text: '编辑',
                glyph: 0xf013,
                handler: function() {
                    self.GridEdit(self.getView().lookupReference('menutreegrid').getSelectionModel().getSelection()[0].data);
                }
            });
            menu.add({
                text: '删除',
                glyph: 0xf014,
                handler: function() {
                    if (self.getView().lookupReference('menutreegrid').getSelectionModel().getSelection().length !== 0) {
                        var ids = [];
                        Ext.each(self.getView().lookupReference('menutreegrid').getSelectionModel().getSelection(), function(item, index) {
                            ids.push(item.data.ID);
                        });
                        self.GridDelete(ids);
                    } else {
                        Ext.Msg.alert('提示', "请选择需删除的数据行!");
                    }
                }
            });
            this.menu = menu;
        }

        return this.menu;
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
                        target: self.getView().lookupReference('menutreegrid')
                    });
                    myMask.show(); //加载层
                    Web.config.Tool.ajaxPost(Web.config.Config.deleteCodeContent, ids).then(function(result) {
                        self.GridRefresh();
                    }).always(function() {
                        myMask.hide();
                    });
                }
            }
        });
    },
    onrender: function(combo) {
        combo.setValue(Web.config.Config.pageNum);
    },
    onselect: function(combo) {
        this.getView().lookupReference('menucontentgrid').store.pageSize = parseInt(combo.getValue());
        this.getView().lookupReference('menucontentgrid').store.currentPage = 1;
        this.getView().lookupReference('menucontentgrid').store.load();
    },
    onbtnAddclick: function() {
        var self = this;
        var moduleID = self.getView().lookupReference('menutree').getSelectionModel().getSelection()[0].data.ID
        new Web.view.menu.MenuAddOrUpdate({
            moduleID: moduleID,
            index: self.index
        }).show().on('close', function(w, options) {
            if (w.state && w.state == 1) {
                self.GridRefresh();
            }
        });
    },
    onbtneditclick: function() {
        var seleteds = this.getView().lookupReference('menutreegrid').getSelectionModel().getSelection();
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
    onbtndeleteclick: function() {
        if (this.getView().lookupReference('menutreegrid').getSelectionModel().getSelection().length !== 0) {
            var ids = [];
            Ext.each(this.getView().lookupReference('menutreegrid').getSelectionModel().getSelection(), function(item, index) {
                ids.push(item.data.ID);
            });
            this.GridDelete(ids);
        } else {
            Ext.Msg.alert('提示', "请选择需删除的数据行!");
        }
    },
    GridAdd: function(record) {
        var self = this;
        var flag = false;
        new Web.view.menu.MenuAddOrUpdate({
            moduleID: record.moduleID,
            thisID: record.ID,
            flag: flag
        }).show().on('close', function(w, options) {
            if (w.state && w.state == 1) {
                self.GridRefresh();
            }
        });
    },
    GridEdit: function(record) {
        var self = this;
        var flag = true;
        new Web.view.menu.MenuAddOrUpdate({
            thisID: record.ID,
            parentID: record.parentID,
            moduleID: record.moduleID,
            flag: flag,
            index: self.index,
            treeData:record
        }).show().on('close', function(w, options) {
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
                        target: self.getView().lookupReference('menutreegrid')
                    });
                    myMask.show(); //加载层
                    Web.config.Tool.ajaxPost(Web.config.Config.deleteSysMenu, {
                        IDs: JSON.stringify(ids)
                    }).then(function(result) {
                        self.GridRefresh();
                    }).always(function() {
                        myMask.hide();
                    });
                }
            }
        });
    },
    onbtnsearchclick: function() {
        this._refresh();
    },
    onbtnsearchplusclick: function() {},
    onGridbtnAddclick: function(btn) {
        this.GridAdd();
    },
    // TreeRefresh: function() {
    //     this.getView().gridStore.currentPage = 1;
    //     this.getView().gridStore.load();
    // },
    GridRefresh: function() {
        var gridStore = this.getView().lookupReference('menutreegrid').store;
        gridStore.currentPage = 1;
        gridStore.load();
    }
});