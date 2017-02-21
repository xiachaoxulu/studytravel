Ext.define('Web.view.main.topnav.TopNav', {
    extend: 'Ext.container.Container',
    xtype: 'main-topnav',
    requires: [
        'Web.view.main.topnav.TopNavController'
    ],
    controller: 'main-topnav',

    height: 35,
    padding: '5 10 5 10',
    items: [{
        //客户名称
        xtype: 'label',
        text: '人力管家-系统配置',
        cls: 'my-home-icon',
        style: {
            fontSize: '13px',
            fontWeight: 'bold',
            lineHeight: '28px',
            color: 'white',
            padding: '0 0 0 16px'
        }
    }, {
        //程序版本号
        xtype: 'label',
        reference: 'txtVersion',
        style: {
            fontSize: '12px',
            lineHeight: '28px',
            color: 'white',
            margin: '0 0 0 10px'
        }
    }, {
        xtype: 'toolbar',
        text: '退出',
        width: 300,
        style: {
            float: 'right',
            backgroundColor: 'transparent',
            padding: 0,
            color: 'white'
        },
        items: [{
                xtype: 'tbtext',
                text: '夏超',
                reference: 'curUserName',
                style: {
                    color: 'white'
                }

            },
            '-', {
                xtype: 'button', // default for Toolbars
                text: '修改密码',
                listeners: {
                    click: 'onEditPwdClick'
                },
                glyph: 0xf013
            },
            //{
            //    text: '关于',
            //    glyph: 0xf06a,
            //    listeners: {
            //        click: 'onAboutClick'
            //    },
            //},
            // begin using the right-justified button container
            '->', // same as { xtype: 'tbfill' }
            {
                xtype: 'button', // default for Toolbars
                text: '注销',
                listeners: {
                    click: 'onExitClick'
                },
                glyph: 0xf011
            }

        ]
    }]

});
