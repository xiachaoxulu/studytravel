Ext.define('Web.view.menu.MenuAddOrUpdateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.menuaddorupdatecontroller',
    requires: ['Web.config.Tool', 'Web.config.Config'],
    afterRender: function () {
        this.showAddOrUpdate();
    },
    showAddOrUpdate: function () {
        var self = this;
        var moduleID = this.getView().moduleID;
        var thisID = this.getView().thisID;
        var parentID = this.getView().parentID;
        var flag = this.getView().flag;
        var index = this.getView().index;
        var treeData = this.getView().treeData;
        self.txt_menuName = this.getView().lookupReference('menuName');
        self.txt_url = this.getView().lookupReference('url');
        self.txt_des = this.getView().lookupReference('des');
        self.moduleID = moduleID;
        self.thisID = thisID;
        self.parentID = parentID;
        self.flag = flag;
        self.treeData = treeData;
        if (flag) {
            self.getView().lookupReference('menuNameSelect').setVisible(false);
            if (parentID > 0) {
                this.initRootComBox(moduleID);
                self.getView().lookupReference('menuNameSelect').setVisible(true);
                self.getView().lookupReference('moduleSelect').setVisible(false);
            }
            self.initModuleComBox(index);
            this.getView().setTitle('菜单修改');
            var myMask = new Ext.LoadMask({
                msg: '加载中...',
                shadow: false,
                target: this.getView().lookupReference('myform')
            });
            myMask.show();
            Web.config.Tool.ajaxPost(Web.config.Config.selectbyid, {
                ID: thisID,
            }).then(function (result) {
                self.txt_menuName.setValue(result.menuName);
                self.txt_url.setValue(result.url);
                self.txt_des.setValue(result.des);
            }).always(function () {
                myMask.hide();
            });
        } else {
            if (thisID >= 0) {
                self.getView().lookupReference('moduleSelect').setVisible(false)
                self.parentID = thisID;
            }
            this.getView().setTitle('菜单新增');
            self.getView().lookupReference('menuNameSelect').setVisible(false)
            self.initModuleComBox(index);
            // self.getView().lookupReference('moduleSelect').setVisible(true)
            // if (parentID >= 0) {
            //     self.getView().lookupReference('moduleSelect').setVisible(false)
            // }
        }
    },
    onsubmit: function () {
        var self = this;
        if (self.getView().lookupReference('myform').isValid()) {
            var params = {};
            var url;

            if (self.flag) {
                if (self.parentID > 0) {
                    params.IDs=[];
                    params.IDs.push(self.thisID)
                    params.IDs = JSON.stringify(params.IDs);
                    params.moduleID = self.moduleID;
                    params.menuName = self.txt_menuName.getValue();
                    params.des = self.txt_des.getValue();
                    params.url = self.txt_url.getValue();
                    params.parentID = this.selectMenuID;
                    url = Web.config.Config.updateSysMenu;
                    console.log('修改子')
                } else {
                    // 没有更改模块，正常
                    console.log(self.treeData.moduleID,self.moduleID);
                    console.log(self.treeData.moduleID,this.selectID);
                    //self.moduleID=this.selectID;
                    if (self.treeData.moduleID == self.moduleID) {
                        params.IDs=[];
                        params.IDs.push(self.thisID);
                        params.IDs = JSON.stringify(params.IDs);
                        params.moduleID = self.moduleID;
                        params.parentID = self.parentID;
                        params.menuName = self.txt_menuName.getValue();
                        params.des = self.txt_des.getValue();
                        params.url = self.txt_url.getValue();
                        url = Web.config.Config.updateSysMenu;
                        console.log(params.moduleID);
                        console.log(self.moduleID);
                        console.log('修改当前模块内容')
                    } else {// 需要级联修改其所有子节点的moduleID
                        self.alterModuleID(self.treeData);
                        params.parentID = self.parentID;
                        params.menuName = self.txt_menuName.getValue();
                        params.des = self.txt_des.getValue();
                        params.url = self.txt_url.getValue();
                        params.IDs=[];
                        for(var i=0;i<self.arrMenu.length;i++){
                            params.IDs.push(self.arrMenu[i].ID);
                        }
                        console.log('修改模块')
                        params.IDs=JSON.stringify(params.IDs);
                        params.moduleID = this.selectID;
                        url = Web.config.Config.updateSysMenu;
                    }
                    //params.moduleID = this.selectID;
                    //url = Web.config.Config.updateSysMenu;
                }
            } else {
                params.ID = self.thisID;
                params.moduleID = self.moduleID;
                params.parentID = self.parentID;
                params.menuName = self.txt_menuName.getValue();
                params.des = self.txt_des.getValue();
                params.url = self.txt_url.getValue();
                url = Web.config.Config.insertSysMenu;
            }
            var myMask = new Ext.LoadMask({
                msg: '加载中...',
                shadow: false,
                target: this.getView().lookupReference('myform')
            });
            myMask.show();
            Web.config.Tool.ajaxPost(url, params).then(function (result) {
                self.getView().state = 1;
                self.getView().close();
            }).always(function () {
                myMask.hide();
            });

        } else {
            Ext.Msg.alert('提示', "请输入必备信息");
        }
    },
    initRootComBox: function (moduleID) {
        var self = this;
        Web.config.Tool.ajaxPost(Web.config.Config.selectBySysMenu, {
            moduleID: moduleID
        }).then(function (result) {
            var roots = self.convertToTreeArchitect(result);

            var treeGrid = self.getView().lookupReference('menuNameSelect');
            var gridStore = Ext.create('Ext.data.TreeStore', {
                root: {
                    children: roots
                },
                proxy: {
                    type: 'memory',
                    reader: {
                        typeProperty: 'mtype'
                    }
                },
            });
            treeGrid.setStore(gridStore);
        });
    },
    convertToTreeArchitect: function (arrMenuNode) {
        var map = {};
        var node;
        var roots = [];
        for (var i = 0; i < arrMenuNode.length; i++) {
            node = arrMenuNode[i];
            node.children = [];
            node.leaf = true;
            map[node.ID] = i;
        }
        for (var i = 0; i < arrMenuNode.length; i++) {
            node = arrMenuNode[i];
            if (node.parentID != 0) {
                arrMenuNode[map[node.parentID]].children.push(node);
                arrMenuNode[map[node.parentID]].leaf = false;
            } else {
                roots.push(node);
            }
        }
        return roots;
    },
    initModuleComBox: function (index) {
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
        store.on('load', function () {
            if (!store.getCount()) {
                return;
            }
            var select;
            if (self.getView().type) {
                select = store.getAt(index)
            } else {
                select = store.getAt(index)
            }
            type.setValue(select);
        });
        store.load();
    },
    onexit: function () {
        this.getView().state = 0;
        this.getView().close();
    },
    onModuleSelect: function (grid, record, index, eOpts) {
        var self=this;
        this.selectID = record.data.ID;
        self.moduleID=record.data.ID
        //console.log(self.moduleID)
    },
    onMenuNameSelect: function (grid, record, index, eOpts) {
        this.selectMenuID = record.data.ID;
    },
    alterModuleID: function (treeNode) {
        var self = this;
        if (treeNode.ID == self.thisID) {   //说明当前遍历的是根节点，也就是编辑的节点
            console.log(1);
            self.arrMenu = [];
            self.arrMenu.push({
                ID: treeNode.ID,
                moduleID: treeNode.moduleID
            });
        }
        if (treeNode.children) {
            for (var i = 0; i < treeNode.children.length; i++) // 遍历其直接子节点，进行同样的操作
            {
                // 1. 修改自己的 moduleID 值
                self.arrMenu.push({
                    ID: treeNode.children[i].ID,
                    moduleID: treeNode.children[i].moduleID
                });
                // 2. 修改其子代节点的 moduleID 值
                this.alterModuleID(treeNode.children[i]);
            }

        }
    }
});