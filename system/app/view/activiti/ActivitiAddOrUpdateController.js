/**
 * Created by Dylan on 2016/3/8.
 */
Ext.define('Web.view.activiti.ActivitiAddOrUpdateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.activitiaddorupdatecontroller',
    requires: ['Web.config.Tool', 'Web.config.Config'],
    afterRender: function() {
        this.inModuleSelect();
        this.addOrUpdateActbill();
    },
    inModuleSelect: function() {
        var self = this;
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
        store.load();
    },
    onModuleSelect: function(grid, record, index, eOpts) {
        var moduleID = record.data.ID
        this.addOrUpdateActbill(moduleID);
    },
    addOrUpdateActbill: function(moduleID) {
        var self = this;
        var billID = this.getView().billID;
        // var moduleID = this.lookupReference('moduleSelect').getSelectionModel().getSelection();
        self.billID = billID;
        self.moduleID = moduleID;
        self.txt_formAll = this.getView().lookupReference('formAll');
        self.txt_formName = this.getView().lookupReference('formName');
        self.txt_des = this.getView().lookupReference('des');
        self.txt_module = this.getView().lookupReference('moduleSelect');
        if (billID) {
            this.getView().setTitle('工作流修改');
            var myMask = new Ext.LoadMask({
                msg: '加载中...',
                shadow: false,
                target: this.getView().lookupReference('myform')
            });
            myMask.show();
            Web.config.Tool.ajaxPost(Web.config.Config.selectActbill, {
                ID: billID
            }).then(function(result) {
                var moduleinfo = '';
                for (var i = 0; i < result.length; i++) {
                    if (result[i].ID == billID) {
                        moduleinfo = result[i];
                    }
                }
                self.txt_formAll.setValue(moduleinfo.billTable);
                self.txt_formName.setValue(moduleinfo.billName);
                self.txt_des.setValue(moduleinfo.des);
                self.txt_module.setValue(moduleinfo.moduleName);
                self.moduleID = moduleinfo.moduleID;
                self.txt_module.setReadOnly(true);
            }).always(function() {
                myMask.hide();
            });
        } else {
            this.getView().setTitle('工作流新增')
            self.getView().lookupReference('des').setVisible(false)
        }
    },
    onsubmit: function() {
        var self = this;
        if (self.getView().lookupReference('myform').isValid()) {
            var params = {};
            var url;
            params.moduleID = self.moduleID;
            params.ID = self.billID;
            params.billTable = self.txt_formAll.getValue();
            params.billName = self.txt_formName.getValue();
            params.des = self.txt_des.getValue();
            if (self.billID) {
                // params.ID = self.modelID;
                url = Web.config.Config.updateActbill;
            } else {
                url = Web.config.Config.insertActbill;
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