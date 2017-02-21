Ext.define('Web.config.Config', {
    statics: {
        flagDebug: true,
        apiBasicUrl: 'http://127.0.0.1:8080', //api路径
        systeminf: '~/api/system',
        selectBySystemAdmin: '~/api/superadmin', //查询系统管理员
        detectBySystemAdmin: '~/api/cud', //删除系统管理员
        updateSystemAdmin: '~/api/cud',
        insertSystemAdmin: '~/api/cud',
        
        selectByModule:'~/api/selectByModule',
        
        selectByMenuDefintion:'~/api/menudef',
        insertMenuDefintion:'~/api/menuinsert',
        
        selectByMenuContent:'~/api/selectByMenuContent',

        selectByCodeDefintion: '~/api/codedef',
        insertCodeDefintion: '~/api/cud',
        updateByCodeDefintion: '~/api/cud',
        deleteCodeDefintion: '~/api/cud',

        onLogin:'~/api/onLogin',

        selectByCodeContent: '~/api/selectByCodeContent',
        updateCodeContent: '~/api/cud',
        insertCodeContent: '~/api/cud',
        deleteCodeContent: '~/api/cud',

        //企业管理
        selectByCompany: '~/api/selectByCompany',
        updateCompany: '~/api/cud',
        insertCompany: '~/api/cud',
        deleteCompany: '~/api/cud',

        //企业超管
        selectByOperator: '~/api/selectByOperator',
        updateOperator: '~/api/cud',
        insertOperator: '~/api/cud',
        deleteOperator: '~/api/cud',

        selectByModule: '~/api/selectByModule',
        //模块管理
        selectByCompanyModule: '~/api/selectByCompanyModule',
        updateCompanyModule: '~/api/cud',

        //视图管理
        selectByPage: '~/api/selectByPage',
        updatePage: '~/api/cud',
        insertPage: '~/api/cud',
        deletePage: '~/api/cud',

        //列名管理
        selectByColumn: '~/api/selectByColumn',
        updateColumn:'~/api/cud',
        insertColumn:'~/api/cud',
        deleteColumn:'~/api/cud',

         //按钮
        selectButton: '~/api/selectButton',
        insertButton: '~/system/button/insert.htm',
        deleteButton: '~/system/button/delete.htm',
        updateButton: '~/system/button/update.htm',

        //菜单
        selectChildrenBySysMenu: '~/api/selectChildrenBySysMenu',
        selectBySysMenu: '~/system/sysmenu/selectall.htm',

        //菜单按钮
        insertMenubtn: '~/system/menuBtn/insert.htm',
        selectMenubtn: '~/api/selectMenubtn',
        deleteMenubtn: '~/system/menuBtn/delete.htm',
        updateMenubtn: '~/system/menuBtn/update.htm',


        //工作流测试
        wftest:'~/api/wftest',
        pageNum: 50
            //htmlFileBasicPath:'http://192.168.199.156:81/HtmlFileEditor/HtmlFileUploadFolder',//html访问路径
    }
});