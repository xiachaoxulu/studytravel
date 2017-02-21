Ext.define('Web.view.module.ModuleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.modulecontroller',
    requires: ['Web.config.Tool', 'Web.config.Config', 'Web.view.module.ModuleAddOrUpdate'],
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
        var url = Web.config.Tool.parseApiUrl(Web.config.Config.selectModulebypage);
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
            var modulename = self.lookupReference('modulename').getValue();
            Ext.apply(store.proxy.extraParams, {
                moduleName: modulename
            });
        });
        store.on('load', function(store, records, successful, operation, eOpts) {
            if (!successful) {
                var error = operation.getError() || '服务器异常';
                Ext.Msg.alert('提示', error);
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
        new Web.view.module.ModuleAddOrUpdate().show().on('close', function(w, options) {
            if (w.state && w.state == 1) {
                self._refresh();
            }
        });
    },
    onbtneditclick: function() {

        if (this.getView().getSelectionModel().getSelection().length !== 0) {
            if (this.getView().getSelectionModel().getSelection().length > 1) {
                Ext.Msg.alert('提示', "请选择一行进行编辑!");
            } else {
                this.edit(this.getView().getSelectionModel().getSelection()[0].data);
            }
        } else {
            Ext.Msg.alert('提示', "请选择需编辑的数据行!");
        }
    },
    onbtndeleteclick: function() {
        if (this.getView().getSelectionModel().getSelection().length !== 0) {
            var ids = [];
            Ext.each(this.getView().getSelectionModel().getSelection(), function(item, index) {
                ids.push(item.data.ID);
            });
            this.delete2(ids);
        } else {
            Ext.Msg.alert('提示', "请选择需删除的数据行!");
        }
    },
    onbtnsearchclick: function() {
        this._refresh();
    },
    onbtnsearchplusclick: function() {},
    edit: function(moduleinfo) {
        var module = this.getView().getSelectionModel().getSelection()[0].data.ID;
        var self = this;
        new Web.view.module.ModuleAddOrUpdate({
            modelID: module
        }).show().on('close', function(w, options) {
            if (w.state && w.state == 1) {
                self._refresh();
            }
        });
    },
    onItemdbClick:function(view, record, tr, rowIndex, e, eOpts){
        if (record) {
            view.getSelectionModel().select(rowIndex);
            this.edit();
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
                    Web.config.Tool.ajaxPost(Web.config.Config.deleteSysModule,{
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
        if (!this.menu) {
            var menu = new Ext.menu.Menu();
            menu.add({
                text: '编辑',
                glyph: 0xf013,
                handler: function() {
                    self.edit(self.getView().getSelectionModel().getSelection()[0].data);
                }
            });
            menu.add({
                text: '删除',
                glyph: 0xf014,
                handler: function() {
                    self.delete2(self.getView().getSelectionModel().getSelection()[0].data.ID);
                }
            });
            this.menu = menu;
        }
        return this.menu;
    }
});