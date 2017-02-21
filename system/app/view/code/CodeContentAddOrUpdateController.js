Ext.define('Web.view.code.CodeContentAddOrUpdateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.codecontentaddorupdatecontroller',
    requires: ['Web.config.Tool', 'Web.config.Config'],

    afterRender: function() {
        var self = this;
        var modelID = this.getView().modelID;
        self.modelID = modelID;
        self.difintionID=this.getView().difintionID;
        self.txt_codeName = this.getView().lookupReference('codeName');
        self.txt_code = this.getView().lookupReference('code');
        self.txt_orderNum = this.getView().lookupReference('orderNum');
        self.txt_desc = this.getView().lookupReference('desc');
        if (modelID) {
            this.getView().setTitle('编码值信息修改');

            var myMask = new Ext.LoadMask({
                msg: '加载中...',
                shadow: false,
                target: this.getView().lookupReference('myform')
            });
            myMask.show();
            Web.config.Tool.ajaxPost(Web.config.Config.selectbyidCodeContent, {
                ID: modelID
            }).then(function(result) {
                self.txt_codeName.setValue(result.codeName);
                self.txt_code.setValue(result.code);
                self.txt_orderNum.setValue(result.orderNum);
                self.txt_desc.setValue(result.des);
            }).always(function() {
                myMask.hide();
            });

        } else {
            this.getView().setTitle('编码值新增');
        }
    },
    onsubmit: function() {
        var self = this;
        if (self.getView().lookupReference('myform').isValid()) {
            var params = {};
            var url;
            if (self.modelID) {
                params.ID = self.modelID;
                params.codeName = self.txt_codeName.getValue();
                params.code = self.txt_code.getValue();
                params.orderNum = self.txt_orderNum.getValue();
                params.des=self.txt_desc.getValue();
                url = Web.config.Config.updateCodeContent;
            } else {
                params.difintionID = self.difintionID;
                params.codeName = self.txt_codeName.getValue();
                params.code = self.txt_code.getValue();
                params.orderNum = self.txt_orderNum.getValue();
                params.des = self.txt_desc.getValue();
                url = Web.config.Config.insertCodeContent;
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
