Ext.define('Web.view.main.container.Container', {
    extend: 'Ext.container.Container',
    requires: [
        'Web.view.main.container.ContainerController',
        'Web.view.main.nav.Nav',
        'Web.view.main.tabpanel.TabPanel',
        'Web.view.main.topnav.TopNav'
    ],
    xtype: 'main-container',
    controller: 'main-container',
    layout: {
        type: 'border'
    },
    initComponent: function() {
        //设置图标文件，设置后可以使用glyph属性
        Ext.setGlyphFontFamily('FontAwesome');
        this.callParent();
    },
    items: [{
        region: 'north',
        xtype: 'main-topnav',
        reference: 'topnavpanel',
    }, {
        region: 'west',
        xtype: 'main-nav',
        itemId: 'mainnav',
    }, {
        xtype: 'main-tabpanel',
        reference: 'maintabpanel',
        region: 'center'
    }, {
        region: 'south',
        xtype: 'container',
        html: '<div style="color:white;line-height:2em;text-align:center">Copyright ©2016 奥琦玮-云人力</div>'
    }]
});
