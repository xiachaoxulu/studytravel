/**
 * @class MyApp.view.main.nav.Nav MyApp.view.main.nav.Nav
 * @extends Ext.tree.Panel
 * @xtype app-main-nav
 * @mixins Gearbox.mixin.ModelInfo,
 * @mixins Gearbox.mixin.Logger
 * @requires 
 */
Ext.define('Web.view.main.nav.Nav', {
    extend: 'Ext.tree.Panel',
    xtype: 'main-nav',

    //依赖关系
    requires: [
        'Web.view.main.nav.NavController'
    ],
    controller: 'main-nav',
    //viewModel: { type: 'main-navmodel' },
    //基本配置
    title: '功能菜单',
    width: 230,
    split: true,
    collapsible: true,
    listeners: {
        itemclick: 'onItemClick'
    },
    rootVisible: true,

    root: {
        text: '管理菜单',
        glyph: 0xf0f8,
        expanded: true,
        children: [
            { text: '管理员管理', leaf: true, iconCls: 'fa fa-star', viewName: 'Web.view.superadmin.SuperAdmin' },
            { text: '模块管理', leaf: true, iconCls: 'fa fa-film' ,viewName: 'Web.view.module.Module'},
            { text: '菜单管理', leaf: true, iconCls: 'fa fa-navicon' ,viewName: 'Web.view.menu.Menu'},
            { text: '系统编码', leaf: true, iconCls: 'fa fa-barcode', viewName: 'Web.view.code.Code' },
            { text: '页面注册', leaf: true, iconCls: 'fa fa-flag', viewName: 'Web.view.page.Page' },
            { text: '企业管理', leaf: true, iconCls: 'fa fa-fire', viewName:'Web.view.company.Company' },
            { text: '企业超管管理', leaf: true, iconCls: 'fa fa-user', viewName: 'Web.view.operator.Operator' },
            { text: '企业授权管理', leaf: true, iconCls: 'fa fa-pie-chart', viewName: 'Web.view.company.CompanyModule'},
            { text: '按钮管理', leaf: true, iconCls: 'fa fa-twitch', viewName: 'Web.view.button.Button'},
            { text: '菜单按钮管理', leaf: true, iconCls: 'fa fa-credit-card', viewName: 'Web.view.menubtn.Menubtn'},
            { text: '工作流管理', leaf: true, iconCls: 'fa fa-soccer-ball-o (alias)', viewName: 'Web.view.activiti.Activiti'}
        ]

    }
});
