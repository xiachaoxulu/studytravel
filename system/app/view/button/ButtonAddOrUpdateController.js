/**
 * Created by Dylan on 2016/3/8.
 */
Ext.define('Web.view.button.ButtonAddOrUpdateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.buttonaddorupdatecontroller',
    requires: ['Web.config.Tool', 'Web.config.Config'],
    afterRender: function() {
        var self = this;
        var modelID = this.getView().modelID;
        self.modelID = modelID;
        self.txt_user = this.getView().lookupReference('username');
        self.txt_desc = this.getView().lookupReference('desc');
        self.txt_valid = this.getView().lookupReference('valid');
        self.txt_valid.setVisible(false)
        if (modelID) {
            this.getView().setTitle('按钮修改');
            var myMask = new Ext.LoadMask({
                msg: '加载中...',
                shadow: false,
                target: this.getView().lookupReference('myform')
            });
            myMask.show();
            Web.config.Tool.ajaxPost(Web.config.Config.selectButton, {
                ID: modelID
            }).then(function(result) {
                var moduleinfo = '';
                for (var i = 0; i < result.length; i++) {
                    if (result[i].ID == modelID) {
                        moduleinfo = result[i];
                    }
                }
                self.txt_user.setValue(moduleinfo.btnName);
                self.txt_desc.setValue(moduleinfo.btnCode);
                self.txt_valid.setValue(moduleinfo.valid);
            }).always(function() {
                myMask.hide();
            });
        } else {
            this.getView().setTitle('按钮修改')
        }
    },
    onsubmit: function() {
        var self = this;
        if (self.getView().lookupReference('myform').isValid()) {
            var params = {};
            var url;
            params.ID = self.modelID;
            params.btnCode = self.txt_desc.getValue();
            params.btnName = self.txt_user.getValue();
            params.valid = self.txt_valid.getValue();
            if (self.modelID) {
                params.ID = self.modelID;
                url = Web.config.Config.updateButton;
            } else {
                url = Web.config.Config.insertButton;
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