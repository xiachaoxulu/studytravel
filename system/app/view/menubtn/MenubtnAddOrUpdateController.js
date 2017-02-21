Ext.define('Web.view.menubtn.MenubtnAddOrUpdateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.menubtnaddorupdatecontroller',
    requires: ['Web.config.Tool', 'Web.config.Config'],

    afterRender: function() {
        var self = this;
        var moduleID = this.getView().moduleID;
        var thisID = this.getView().thisID;
        var parentID = this.getView().parentID;
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
        store.on('load', function() {
            if (!store.getCount()) {
                return;
            }
            var select;
            if (self.getView().type) {
                for (var i = 0; i < store.getCount(); i++) {
                    if (store.getAt(i).get('value') == self.getView().type) {
                        select = store.getAt(i);
                        break;
                    }
                }
            } else {
                select = store.getAt(0);
            }
            type.setValue(select);
        });
        store.load();
        self.parentID=parentID;
        self.moduleID = moduleID;
        self.txt_menuName = this.getView().lookupReference('menuName');
        self.txt_url = this.getView().lookupReference('url');
        self.txt_des = this.getView().lookupReference('des');
         if (thisID) {
            if(parentID !== 0){
                this.getView().lookupReference('moduleSelect').setVisible(false)
            }
            this.getView().setTitle('菜单修改');
            var myMask = new Ext.LoadMask({
                msg: '加载中...',
                shadow: false,
                target: this.getView().lookupReference('myform')
            });
            myMask.show();
            Web.config.Tool.ajaxPost(Web.config.Config.selectBySysMenu, {
                ID: moduleID,
                moduleID: recordMoudle,
            }).then(function(result) {
                var info = result[0];
                self.txt_menuName.setValue(info.menuName);
                self.txt_url.setValue(info.url);
                self.txt_des.setValue(info.des);
            }).always(function() {
                myMask.hide();
            });

        } else if(moduleID){
            this.getView().setTitle('菜单新增');
            if(parentID >= 0){
                self.getView().lookupReference('moduleSelect').setVisible(false)
            }
        }
    },
    onsubmit: function(id) {
        var self = this;
        if (self.getView().lookupReference('myform').isValid()) {
            var params = {};
            var url;
            params.ID = self.modelID;
            params.menuName = self.txt_menuName.getValue();
            params.des = self.txt_des.getValue();
            params.url = self.txt_url.getValue();
            if (self.modelID) {
			    params.ID = self.modelID;
                url = Web.config.Config.updateSysMenu;
            } else {
                url = Web.config.Config.insertSysMenu;
            }
            var myMask = new Ext.LoadMask({
                msg: '加载中...',
                shadow: false,
                target: this.getView().lookupReference('myform')
            });
            myMask.show();
            Web.config.Tool.ajaxPost(url, params).then(function(result) {
                self.getView().state = 1;
                self.getView().close();
            }).always(function() {
                myMask.hide();
            });
        } else {
            Ext.Msg.alert('提示', "请输入必备信息");
        }

    },
    onexit: function() {

        this.getView().state = 0;
        this.getView().close();
    }
});
