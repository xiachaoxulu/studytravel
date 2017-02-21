Ext.define('Web.config.Config', {
    statics: {
        flagDebug: true,
        //apiBasicUrl: 'http://192.168.2.172:9118', //system路径
        // apiBasicUrl: 'http://43.241.222.216:8091', //system路径
 
        apiBasicUrl: 'http://192.168.1.78:8081', //system路径
<<<<<<< .mine
 
 
=======
        // apiBasicUrl: 'http://192.168.1.24:8080', //system路径
>>>>>>> .r716
        flagDebug: false,
        systeminf: '~/system/system',
        selectBySystemAdmin: '~/system/sysadmin/selectbypage.htm', //查询系统管理员
        insertSystemAdmin: '~/system/sysadmin/insert.htm',
        deleteSystemAdmin: '~/system/sysadmin/deletebyids.htm', //删除系统管理员
        updateSystemAdmin: '~/system/sysadmin/update.htm',
        selectbyidSystemAdmin: '~/system/sysadmin/selectbyid.htm',

        //模块管理
        selectByModule: '~/system/sysmodule/selectall.htm',
        deleteSysModule: '~/system/sysmodule/deletebyids.htm',
        insertSysModule: '~/system/sysmodule/insert.htm',
        updateSysModule: '~/system/sysmodule/update.htm',
        selectModulebypage: '~/system/sysmodule/selectbypage.htm',

        //菜单管理
        selectBySysMenu: '~/system/sysmenu/selectall.htm',
        selectbyid: '~/system/sysmenu/selectbyid.htm',
        insertSysMenu: '~/system/sysmenu/insert.htm',
        deleteSysMenu: '~/system/sysmenu/deletebyids.htm',
        updateSysMenu: '~/system/sysmenu/update.htm',
        selectChildrenBySysMenu: '~/system/sysmenu/selectchildren.htm',

        //CodeDefintion
        selectByCodeDefintion: '~/system/codedefintion/selectall.htm',
        insertCodeDefintion: '~/system/codedefintion/insert.htm',
        updateByCodeDefintion: '~/system/codedefintion/update.htm',
        deleteCodeDefintion: '~/system/codedefintion/deletebyids.htm',
        selectbyidCodeDefintion: '~/system/codedefintion/selectbyid.htm',


        selectByCodeContent: '~/system/codecontent/selectbypage.htm',
        deleteCodeContent: '~/system/codecontent/deletebyids.htm',
        updateCodeContent: '~/system/codecontent/update.htm',
        insertCodeContent: '~/system/codecontent/insert.htm',
        selectbyidCodeContent: '~/system/codecontent/selectbyid.htm',

        //按钮
        selectButton: '~/system/button/selectall.htm',
        insertButton: '~/system/button/insert.htm',
        deleteButton: '~/system/button/deletebyids.htm',
        updateButton: '~/system/button/update.htm',
        selectbypage: '~/system/button/selectbypage.htm',


        //菜单按钮
        insertMenubtn: '~/system/menubtn/edit.htm',
        selectMenubtn: '~/system/menubtn/selectall.htm',
        deleteMenubtn: '~/system/menubtn/delete.htm',
        updateMenubtn: '~/system/menubtn/update.htm',

        //登录
        onLogin: '~/system/sysadmin/login.htm',

        //企业管理
        selectByCompany: '~/system/company/selectbypage.htm',
        updateCompany: '~/system/company/update.htm',
        insertCompany: '~/system/company/insert.htm',
        deleteCompany: '~/system/company/deletebyids.htm',
        selectByCompanyID: '~/system/company/selectbyid.htm',

        //企业超管
        selectByOperator: '~/system/operator/select.htm',
        updateOperator: '~/system/operator/update.htm',
        insertOperator: '~/system/operator/insert.htm',
        deleteOperator: '~/system/operator/delete.htm',
        selectByOperatorID: '~/system/operator/selectByID.htm',

        //模块管理
        selectByCompanyModule: '~/system/companymodule/selectall.htm',
        updateCompanyModule: '~/system/sysmodule/modulecompany/insert.htm',

        //视图管理
        selectByPage: '~/system/pageregister/selectall.htm',
        updatePage: '~/system/pageregister/update.htm',
        insertPage: '~/system/pageregister/insert.htm',
        deletePage: '~/system/pageregister/deletebyid.htm',
        selectByPageID: '~/system/pageregister/selectbyid.htm',
        //列名管理

        selectByColumn: '~/system/columnregister/selectall.htm',
        updateColumn: '~/system/columnregister/update.htm',
        insertColumn: '~/system/columnregister/insert.htm',
        deleteColumn: '~/system/columnregister/deletebyid.htm',
        selectByColumnID: '~/system/columnregister/selectbyid.htm',

        // actbill

        insertActbill: '~/system/actbill/insert.htm',
        updateActbill: '~/system/actbill/update.htm',
        selectActbill: '~/system/actbill/selectall.htm',
        deleteActbill: '~/system/actbill/deletebyids.htm',



        pageNum: 50
            //htmlFileBasicPath:'http://192.168.199.156:81/HtmlFileEditor/HtmlFileUploadFolder',//html访问路径
    }
});