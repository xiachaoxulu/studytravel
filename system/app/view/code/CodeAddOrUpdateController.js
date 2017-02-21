Ext.define('Web.view.code.CodeAddOrUpdateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.codeaddorupdatecontroller',
    requires: ['Web.config.Tool', 'Web.config.Config'],

    afterRender: function() {
        var self = this;
        var modelID = this.getView().modelID;
        self.modelID = modelID;
        self.txt_difintionName = this.getView().lookupReference('difintionName');
        self.txt_viewType = this.getView().lookupReference('viewType');
        self.txt_desc = this.getView().lookupReference('desc');
        if (modelID) {
            this.getView().setTitle('编码定义信息修改');

            var myMask = new Ext.LoadMask({
                msg: '加载中...',
                shadow: false,
                target: this.getView().lookupReference('myform')
            });
            myMask.show();
            Web.config.Tool.ajaxPost(Web.config.Config.selectbyidCodeDefintion, {
                ID: modelID
            }).then(function(result) {
                 
                self.txt_difintionName.setValue(result.difintionName);
                self.txt_viewType.setValue(result.viewType);
                self.txt_desc.setValue(result.des);
            }).always(function() {
                myMask.hide();
            });

        } else {
            this.getView().setTitle('编码定义新增');
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
                params.difintionName = self.txt_difintionName.getValue();
                params.viewType = self.txt_viewType.getValue();

                url = Web.config.Config.updateByCodeDefintion;
            } else {
                params.des = self.txt_desc.getValue();
                params.difintionName = self.txt_difintionName.getValue();
                params.viewType = self.txt_viewType.getValue();
                url = Web.config.Config.insertCodeDefintion;
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
