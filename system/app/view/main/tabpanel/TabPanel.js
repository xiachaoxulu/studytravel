Ext.define('Web.view.main.tabpanel.TabPanel', {

    extend: 'Ext.tab.Panel',

    requires: [
        'Web.view.main.tabpanel.TabPanelController',
        'Web.view.welcome.Welcome'
    ],
    xtype: 'main-tabpanel',
    controller: 'main-tabpanel',
    listeners: {
        /*
            navNode:导航树中的treenode，附加它到tab项中，用来标识其与navNode
         */
        openTab: 'openTab'
    },

    activeTab: 0,
    cls: 'mainTab',

    items: [{
        glyph: 0xf015,
        closable: false,
        region: 'center',
        xtype: 'welcome'
    }],
    plugins:new Ext.ux.TabCloseMenu()
});
