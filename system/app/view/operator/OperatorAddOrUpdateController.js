Ext.define('Web.view.operator.OperatorAddOrUpdateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.operatoraddorupdatecontroller',
    requires: ['Web.config.Tool', 'Web.config.Config'],

    afterRender: function() {
        var self = this;
        var modelID = this.getView().modelID;
        self.modelID = modelID;
        self.companyID = this.getView().companyID;
        self.txtLoginName = this.getView().lookupReference('loginname');
        self.txtPassword = this.getView().lookupReference('password');
        self.txtDesc = this.getView().lookupReference('des');
        if (modelID) {
            this.getView().setTitle('修改企业管理员');
            var myMask = new Ext.LoadMask({
                msg: '加载中...',
                shadow: false,
                target: this.getView().lookupReference('myform')
            });
            myMask.show();
            Web.config.Tool.ajaxPost(Web.config.Config.selectByOperatorID, {
                ID: modelID
            }).then(function(result) {
                self.txtDesc.setValue(result.des);
                self.txtLoginName.setValue(result.loginName);
                self.txtPassword.setValue(result.password);
            }).always(function() {
                myMask.hide();
            });

        } else {
            this.getView().setTitle('新增企业管理员');
        }
    },
    onsubmit: function() {
        var self = this;
        if (self.getView().lookupReference('myform').isValid()) {
            var params = {};
            var url;
            params.des = self.txtDesc.getValue();
            params.loginName = self.txtLoginName.getValue();
            params.password = self.txtPassword.getValue();
            if (self.modelID) {
                params.ID = self.modelID;
                url = Web.config.Config.updateOperator;
            } else {
                params.type = 1;
                params.companyID = self.companyID;
                url = Web.config.Config.insertOperator;
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