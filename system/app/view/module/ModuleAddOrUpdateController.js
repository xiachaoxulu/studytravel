/**
 * Created by Dylan on 2016/3/8.
 */
Ext.define('Web.view.module.ModuleAddOrUpdateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.moduleaddorupdatecontroller',
    requires: ['Web.config.Tool', 'Web.config.Config'],
    afterRender: function() {
        var self = this;
        var modelID = this.getView().modelID;
        self.modelID = modelID;
        self.txt_user = this.getView().lookupReference('username');
        self.txt_desc = this.getView().lookupReference('desc');
        if (modelID) {
            this.getView().setTitle('模块信息修改');
            var myMask = new Ext.LoadMask({
                msg: '加载中...',
                shadow: false,
                target: this.getView().lookupReference('myform')
            });
            myMask.show();
            Web.config.Tool.ajaxPost(Web.config.Config.selectByModule, {
                ID: modelID
            }).then(function(result) {
                var moduleinfo = '';
                for (var i = 0; i < result.length; i++) {
                    if (result[i].ID == modelID) {
                        moduleinfo = result[i];
                    }
                }
                self.txt_user.setValue(moduleinfo.moduleName);
                self.txt_desc.setValue(moduleinfo.des);
            }).always(function() {
                myMask.hide();
            });
        } else {
            this.getView().setTitle('新增模块管理')
        }
    },
    onsubmit: function() {
        var self = this;
        if (self.getView().lookupReference('myform').isValid()) {
            var params = {};
            var url;
            params.ID = self.modelID;
            params.des = self.txt_desc.getValue();
            params.moduleName = self.txt_user.getValue();
            if (self.modelID) {
                url = Web.config.Config.updateSysModule;
            } else {
                url = Web.config.Config.insertSysModule;
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
            })
        } else {
            Ext.Msg.alert('提示', "请输入必备信息");
        }
    },
    onexit: function() {
        this.getView().state = 0;
        this.getView().close();
    }
});