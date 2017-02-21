Ext.define('Web.view.company.CompanyAddOrUpdateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.companyaddorupdatecontroller',
    requires: ['Web.config.Tool', 'Web.config.Config'],

    afterRender: function() {
        var self = this;
        var modelID = this.getView().modelID;
        self.modelID = modelID;
        self.txtCompanyName = this.getView().lookupReference('companyname');
        self.txtCompanyCode = this.getView().lookupReference('companycode');
        self.txtLinkMan = this.getView().lookupReference('linkman');
        self.txtPhone = this.getView().lookupReference('phone');
        self.txtDes = this.getView().lookupReference('des');
        if (modelID) {
            this.getView().setTitle('修改企业');
            var myMask = new Ext.LoadMask({
                msg: '加载中...',
                shadow: false,
                target: this.getView().lookupReference('myform')
            });
            myMask.show();
            Web.config.Tool.ajaxPost(Web.config.Config.selectByCompanyID, {
                ID: modelID
            }).then(function(result) {
                console.log(result);
                self.txtCompanyCode.setValue(result.companyCode);
                self.txtCompanyName.setValue(result.companyName);
                self.txtLinkMan.setValue(result.linkMan);
                self.txtPhone.setValue(result.phone);
                self.txtDes.setValue(result.des);
            }).always(function() {
                myMask.hide();
            });
        } else {
            this.getView().setTitle('新增企业');
        }
    },
    onsubmit: function() {
        var self = this;
        if (self.getView().lookupReference('myform').isValid()) {
            var params = {};
            var url;
            params.companyCode = self.txtCompanyCode.getValue();
            params.companyName = self.txtCompanyName.getValue();
            params.linkMan = self.txtLinkMan.getValue();
            params.phone = self.txtPhone.getValue();
            params.des = self.txtDes.getValue();
            if (self.modelID) {
                params.ID = self.modelID;
                url = Web.config.Config.updateCompany;
            } else {
                url = Web.config.Config.insertCompany;
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