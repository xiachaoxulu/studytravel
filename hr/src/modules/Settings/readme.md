二、考勤
------考勤规则-----
1.不分页查询考勤规则，不带休息设置，专门为下拉列表显示准备,只显示启用的
http://localhost:8090/acewill/checkwork/checkworkrule/selectall.htm?orgID=92&orgType=store
2.保存考勤规则
http://localhost:8090/acewill/checkwork/checkworkrule/insert.htm?orgID=92&orgType=store
3.根据id批量删除考勤规则，删除前先判断是否已经使用，如果已经使用则不让删除
http://localhost:8090/acewill/checkwork/checkworkrule/deletebyids.htm?IDs=[42]
4.修改考勤规则
http://localhost:8090/acewill/checkwork/checkworkrule/update.htm?orgID=92&orgType=store
5.分页查询考勤规则，带休息设置
http://localhost:8090/acewill/checkwork/checkworkrule/selectbypage.htm?orgID=92&orgType=store&pageNum=1&pageSize=10
6.启用/停用数据考勤规则
http://localhost:8090/acewill/checkwork/checkworkrule/updatevalid.htm?IDs=[42]&valid=0
7.根据考勤规则id查询考勤规则
http://localhost:8090/acewill/checkwork/checkworkrule/findbyid.htm?ID=42
8.根据用户id查询考勤规则
http://localhost:8090/acewill/checkwork/checkworkrule/findbyuserid.htm?ID=6
---考勤调拨---
9.多条件查询考勤调拨确认页面人员，带分页
http://localhost:8090/acewill/checkwork/checkworkrule/selectTransferworkCheckwork.htm?pageNum=1&pageSize=10&dateStr=2016-6-21&orgID1=73&orgType1=storeID
10.多条件查询考勤调拨历史记录页面人员，带分页
http://localhost:8090/acewill/checkwork/checkworkrule/selectTransferworkCheckworkHis.htm?pageNum=1&pageSize=10&orgID1=73&orgType1=storeID
11.保存或更新调入/调出门店的调拨确认
http://localhost:8090/acewill/checkwork/checkworktransfer/insertOrUpdate.htm?userID=1&dateStr=2016-6-21




### TODO

1. 职级工资，岗位工资接口优化，只传更改的数据。
