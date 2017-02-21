Ext.define('Web.view.superadmin.SuperAdminAddOrUpdateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.superadminaddorupdatecontroller',
    requires: ['Web.config.Tool', 'Web.config.Config'],

    afterRender: function() {
        var self = this;
        var modelID = this.getView().modelID;
        self.modelID = modelID;
        self.txt_user = this.getView().lookupReference('username');
        self.txt_password = this.getView().lookupReference('password');
        self.txt_desc = this.getView().lookupReference('desc');
        if (modelID) {
            this.getView().setTitle('管理员信息修改');

            self.txt_password.setVisible(false);
            self.txt_user.setReadOnly(true);
            self.txt_password.allowBlank = true;
            var myMask = new Ext.LoadMask({
                msg: '加载中...',
                shadow: false,
                target: this.getView().lookupReference('myform')
            });
            myMask.show();
            Web.config.Tool.ajaxPost(Web.config.Config.selectbyidSystemAdmin, {
                ID: modelID
            }).then(function(result) {
                self.txt_user.setValue(result.userName);
                self.txt_desc.setValue(result.des);
            }).always(function() {
                myMask.hide();
            });

        } else {
            this.getView().setTitle('管理员信息新增');
        }
    },
    onsubmit: function() {
        var self = this;
        if (self.getView().lookupReference('myform').isValid()) {
            var params = {};
            var url;
            if (self.modelID) {
                params.ID = self.modelID;
                params.des = self.txt_desc.getValue();
                url = Web.config.Config.updateSystemAdmin;
            } else {
                params.password = self.txt_password.getValue();
                params.userName = self.txt_user.getValue();
                params.des = self.txt_desc.getValue();
                url = Web.config.Config.insertSystemAdmin;
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
