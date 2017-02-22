export default {

	// 上传文件 ?type=contract
	uploadFile:     'acewill/uploadFile.htm',
	// 获取门店列表
    getStore:       'acewill/store/selectStore.htm',
    // 获取部门列表
    getDepartment:  'acewill/department/select.htm',


    /*
      *获取用户单个表的字段权限+字段的列选内容 【刘春霖】
      *参数说明：tableName 表名称，可不传 ，不传查询所有表。
    */
    getUserTableData  : 'acewill/roleAuthority/selectTableFieldList.htm',
    // 保存列选数据
    saveUserTableData : 'acewill/roleAuthority/insertTableFieldList.htm',
}
