Ext.define('Web.view.main.topnav.TopNavController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-topnav',
    requires: ['Web.config.Tool', 'Web.config.Config', 'Web.model.SystemInfo'], //,'Web.view.workflow.WorkFlow'
    config: {
        self: this
    },
    onWfClick: function() {
        // var ss=new Web.view.workflow.WorkFlow();
        // ss.show();
    },
    onEditPwdClick: function() {
        var self = this;
        self.winEditPwd = Ext.create('Ext.window.Window', {
            title: '修改密码',
            modal: true,
            width: 300,
            layout: 'fit',
            reference: 'changePwd',
            items: { // Let's put an empty grid in just to illustrate fit layout
                xtype: 'form',
                bodyPadding: 5,
                defaultType: 'textfield',
                items: [{
                    fieldLabel: '原始密码',
                    name: 'oldpwd',
                    inputType: 'password',
                    allowBlank: false
                }, {
                    fieldLabel: '重设密码',
                    name: 'newpwd',
                    inputType: 'password',
                    allowBlank: false
                }, {
                    fieldLabel: '再次输入',
                    name: 'newpwd2',
                    inputType: 'password',
                    allowBlank: false
                }],
                // Reset and Submit buttons
                buttons: [{
                    text: '重置',
                    handler: function() {
                        this.up('form').getForm().reset();
                    }
                }, {
                    text: '提交',
                    formBind: true, //only enabled once the form is valid
                    disabled: true,
                    handler: function() {
                        var form = this.up('form').getForm();
                        var url = Web.config.Tool.parseApiUrl(Web.config.Config.updateSystemAdmin);
                        var submitValues = form.getValues();
                        submitValues.userName = Ext.user
                        if (submitValues.newpwd != submitValues.newpwd2) {
                            Ext.Msg.alert('提示', '两次密码不一致');
                        } else {
                            Web.config.Tool.ajaxPost(url, submitValues).then(function(result) {
                                Ext.Msg.alert('提示', '密码修改成功请重新登陆');
                                self.winEditPwd.close();
                                Web.logout();
                            });
                        };
                    }
                }],
            }
        }).show();
    },
    onExitClick: function() {
        var self = this;
        Ext.Msg.show({
            title: '提示',
            message: '正在试图注销系统.是否继续?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'ok') {
                    Web.logout();
                } else if (btn === 'cancel') {
                }
            }
        });
    },
    onAboutClick: function(btn) {
        Ext.create('Ext.window.Window', {
            title: '关于',
            modal: true,
            width: 380,
            glyph: 0xf1f9,
            layout: {
                type: 'hbox'
            },
            items: { // Let's put an empty grid in just to illustrate fit layout
                xtype: 'form',
                bodyPadding: 10,
                defaultType: 'textfield',
                items: [{
                    xtype: 'label',
                    html: "<p><span>公司主页:</span><a href='" + self.systemInfo.data.website + "' target='_blank'>奥琦玮信息科技（北京）有限公司</a></p>"
                }, {
                    xtype: 'label',
                    html: "<p><span>服务热线:</span><a href='javascript:void(0)'>" + self.systemInfo.data.helpphone + "</a></p>"
                }, {
                    xtype: 'label',
                    html: "<p><span>公司地址:</span><a href='javascript:void(0)'>" + self.systemInfo.data.address + "</a></p>"
                }]
            }
        }).show();
    },
    init: function(view) {
        view.lookupReference('curUserName').text = Ext.user;
        //         Ext.getBody().mask("加载中..."); //加载层
        //         Web.config.Tool.ajaxPost(Web.config.Config.systeminf).then(
        //             function(result) {
        //                 self.systemInfo = new Web.model.SystemInfo(result);
        //                 view.lookupReference('txtVersion').setText(self.systemInfo.data.version);
        //             }).always(function() {
        //             Ext.getBody().unmask();
        //         });
    },
});