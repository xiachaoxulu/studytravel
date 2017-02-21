Ext.define('Web.view.main.tabpanel.TabPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-tabpanel',
    requires: [
        'Web.view.main.nav.Nav'
    ],

    openTab: function(relatedRecord) {

        //====================================================>获取所有tab项
        var cView = this.getView(); //获取控制器视图
        var tabItems = cView.items.items; //获取所有tab项
        //====================================================>验证viewName不为空
        var viewName = relatedRecord.data.viewName; //获取加载的视图名称
        if (!viewName) return;
        //====================================================>遍历所有tab项
        for (var i = 0; i < tabItems.length; i++) {
            var currentRelatedRecord = tabItems[i].relatedRecord;
            if (currentRelatedRecord == relatedRecord) { //若已存在
                cView.setActiveTab(tabItems[i]); //获取焦点
                return; //直接返回
            }
        }
        //====================================================>若不存在,添加一个panel
        var viewName = relatedRecord.data.viewName;
        var text = relatedRecord.data.text;
        //开启加载loadmask
        if (!this.tabLoadMask) { //初次创建
            this.tabLoadMask = Ext.create('Ext.LoadMask', {
                target: this.getView(),
                msg: '页面加载中'
            });
        }
        this.tabLoadMask.show();
        var _this = this;
        //关闭加载loadmask
        _this.tabLoadMask.hide();
        //requrie视图
        Ext.require(viewName, function() {
            //创建视图
            var newView = Ext.create(viewName, {
                title: text,
                closable: true,
                autoDestroy: true,
                destroy: function() { //销毁tabpanel
                    if (this.fireEvent("destroy", this) != false) {
                        this.el.remove();
                        if (Ext.isIE) {
                            CollectGarbage();
                        }
                    }
                },
            });
            newView.relatedRecord = relatedRecord;
            //创建视图tab
            var newTab = cView.add(newView);
            cView.setActiveTab(newTab);
        })
    },
});
