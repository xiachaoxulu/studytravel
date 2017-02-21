
Ext.define('Web.view.main.nav.NavController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-nav',

    //点击节点
    onItemClick:function(view,record,item,index,e) {
        //非叶子节点无效
        if (!record.isLeaf()) {

            return;
        }
        //在view中抛出event供监听
        this.fireViewEvent('navSelect', record);
    }
});