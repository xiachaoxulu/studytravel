<!--
* @Created Date       : 2016-11-30T15:29:19+08:00
<<<<<<< .mine
* @Last Modified time : 2016-12-27T11:55:39+08:00
||||||| .r7161
* @Last Modified time : 2016-12-27T11:55:39+08:00
=======
* @Last Modified time : 2016-12-27T11:55:39+08:00
>>>>>>> .r7204
 -->
<template>
  <ui-modal :show.sync="display" :header="employeeID==''?'添加员工':'员工详情'" type="large" hide-footer>
    <ui-validator name="validation1" v-ref:validator>
      <form class="form-horizontal container-fluid warp" role="form" vali-submit="submitBt|submitInfo">
        <div class="row text-center block">
          <span class="block-content">基本信息</span>
        </div>
        <div class="photo-wrap">
          <div class="photo-wrap-left">
            <div class="row">
              <div class="col-sm-24">
                <div class="form-group   row" v-if="$root.getTableField().employeeTable['userName'].auth != 0">
                  <template v-if="tableColumnList['userName'] == 1">
                    <label class="col-sm-8 control-label">姓名</label>
                    <div class="col-sm-16">
                      <input type="text" :disabled="$root.getTableField().employeeTable['userName'].auth==1" v-model="info.employee.userName" class="form-control" placeholder="请输入员工姓名">
                    </div>
                  </template>
                  <template v-else>
                    <label class="col-sm-8 control-label"><span class="must">*</span>姓名</label>
                    <div class="col-sm-16">
                      <input type="text" :disabled="$root.getTableField().employeeTable['userName'].auth==1" v-model="info.employee.userName" class="form-control" placeholder="请输入员工姓名" vali="required" vali-msg='必填项'>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-24">
                <div class="form-group   row" v-if="$root.getTableField().employeeTable['countryName'].auth != 0">
                  <template v-if="tableColumnList['country'] == 1">
                    <label class="col-sm-8 control-label">国籍</label>
                    <div class="col-sm-16">
                      <select v-model="info.employee.country" class="form-control" :disabled="$root.getTableField().employeeTable['countryName'].auth==1">
                        <option value="">请选择国籍</option>
                        <template v-for="item in countrys">
                          <option value="{{item.code}}" :selected="item.code==info.employee.country">{{item.codeName}}</option>
                        </template>
                      </select>
                    </div>
                  </template>
                  <template v-else>
                    <label class="col-sm-8 control-label"><span class="must">*</span>国籍</label>
                    <div class="col-sm-16">
                      <select v-model="info.employee.country" class="form-control" vali="required" vali-msg='必填项' :disabled="$root.getTableField().employeeTable['countryName'].auth==1">
                        <option value="">请选择国籍</option>
                        <template v-for="item in countrys">
                          <option value="{{item.code}}" :selected="item.code==info.employee.country">{{item.codeName}}</option>
                        </template>
                      </select>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-24">
                <div class="form-group   row" v-if="$root.getTableField().employeeTable['idCardTypeName'].auth != 0">
                  <template v-if="tableColumnList['idCardType'] == 1">
                    <label class="col-sm-8 control-label">证件类型</label>
                    <div class="col-sm-16">
                      <select v-model="info.employee.idCardType" class="form-control" :disabled="$root.getTableField().employeeTable['idCardTypeName'].auth==1">
                        <option value="">请选择证件类型</option>
                        <template v-for="item in idCardTypes">
                          <option value="{{item.code}}" :selected="item.code==info.employee.idCardType">{{item.codeName}}</option>
                        </template>
                      </select>
                    </div>
                  </template>
                  <template v-else>
                    <label class="col-sm-8 control-label"><span class="must">*</span>证件类型</label>
                    <div class="col-sm-16">
                      <select v-model="info.employee.idCardType" class="form-control" vali="required" vali-msg='必填项' :disabled="$root.getTableField().employeeTable['idCardTypeName'].auth==1">
                        <option value="">请选择证件类型</option>
                        <template v-for="item in idCardTypes">
                          <option value="{{item.code}}" :selected="item.code==info.employee.idCardType">{{item.codeName}}</option>
                        </template>
                      </select>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-24">
                <div class="form-group   row" v-if="$root.getTableField().employeeTable['userIDCard'].auth != 0">
                  <template v-if="tableColumnList['userIDCard'] == 1">
                    <label class="col-sm-8 control-label">证件号码</label>
                    <div class="col-sm-16">
                      <input type="text" v-model="info.employee.userIDCard" :disabled="$root.getTableField().employeeTable['userIDCard'].auth==1" class="form-control" placeholder="请输入证件号码" vali="required|maxStr:18" readonly="{{info.employee.idCardType == ''}}" @input="IDChange">
                    </div>
                  </template>
                  <template v-else>
                    <label class="col-sm-8 control-label"><span class="must">*</span>证件号码</label>
                    <div class="col-sm-16">
                      <input type="text" :disabled="$root.getTableField().employeeTable['userIDCard'].auth==1" v-model="info.employee.userIDCard" class="form-control" placeholder="请输入证件号码" vali="required|maxStr:18" vali-msg='必填项' readonly="{{info.employee.idCardType == ''}}" @input="IDChange">
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-24">
                <div class="form-group row" v-if="$root.getTableField().employeeTable['birthDay'].auth != 0">
                  <template v-if="tableColumnList['birthDay'] == 1">
                    <label class="col-sm-8 control-label">出生日期</label>
                    <div class="col-sm-16">
                      <ui-datepicker :disabled="info.employee.idCardType == '149001' || $root.getTableField().employeeTable['birthDay'].auth==1" :time.sync="info.employee.birthDay" format="yyyy-MM-dd" width="232px"></ui-datepicker>
                    </div>
                  </template>
                  <template v-else>
                    <label class="col-sm-8 control-label"><span class="must">*</span>出生日期</label>
                    <div class="col-sm-16">
                      <ui-datepicker :disabled="info.employee.idCardType == '149001' || $root.getTableField().employeeTable['birthDay'].auth==1" :time.sync="info.employee.birthDay" format="yyyy-MM-dd" width="232px" vali="required" vali-msg='必填项'></ui-datepicker>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <div class="photo-wrap-right">
            <template v-if="imgSrc">
              <img :src="imgSrc" alt="" class="img">
            </template>
            <template v-else>
              <img v-if="employeeID&&info.employee.photourl" :src="'acewill/employee/getHeadImag.htm?userId=' + employeeID" alt="" class="img">
              <img v-else src="../../../assets/images/avatar.png" alt="" class="img">
            </template>
          </div>
          <div class="photo-wrap-attach">
            <a href="javascript:void(0)" @click="uploadImg">+上传头像</a>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group   row" v-if="$root.getTableField().employeeTable['hukouAddress'].auth != 0">
              <template v-if="tableColumnList['hukouAddress'] == 0">
                <label class="col-sm-8 control-label"><span class="must">*</span>户口所在地</label>
                <div class="col-sm-16">
                  <input type="text" :disabled="$root.getTableField().employeeTable['hukouAddress'].auth==1" v-model="info.employee.hukouAddress" class="form-control" placeholder="请输入户口所在地" vali="required" vali-msg='必填项'>
                </div>
              </template>
              <template v-else>
                <label class="col-sm-8 control-label">户口所在地</label>
                <div class="col-sm-16">
                  <input type="text" v-model="info.employee.hukouAddress" :disabled="$root.getTableField().employeeTable['hukouAddress'].auth==1" class="form-control" placeholder="请输入户口所在地">
                </div>
              </template>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group  row" v-if="$root.getTableField().employeeTable['userNum'].auth != 0">
              <template v-if="tableColumnList['userNum'] == 1">
                <label class="col-sm-8 control-label">员工工号</label>
                <div class="col-sm-16">
                  <input type="text" :disabled="$root.getTableField().employeeTable['userNum'].auth==1" v-model="info.employee.userNum" class="form-control" placeholder="请输入员工编码" readonly="{{employeeID!==''}}">
                </div>
              </template>
              <template v-else>
                <label class="col-sm-8 control-label"><span class="must">*</span>员工工号</label>
                <div class="col-sm-16">
                  <input type="text" :disabled="$root.getTableField().employeeTable['userNum'].auth==1" v-model="info.employee.userNum" class="form-control" placeholder="请输入员工编码" vali="required" vali-msg='必填项' readonly="{{employeeID!==''}}">
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group   row" v-if="$root.getTableField().employeeTable['isMarriedName'].auth != 0">
              <template v-if="tableColumnList['isMarried'] == 0">
                <label class="col-sm-8 control-label"><span class="must">*</span>婚姻状况</label>
                <div class="col-sm-16">
                  <select :disabled="$root.getTableField().employeeTable['isMarriedName'].auth==1" v-model="info.employee.isMarried" class="form-control" vali="required" vali-msg='必填项'>
                    <option value="">请选择婚姻状况</option>
                    <template v-for="item in marriedtypes">
                      <option value="{{item.code}}" :selected="item.code==info.employee.isMarried">{{item.codeName}}</option>
                    </template>
                  </select>
                </div>
              </template>
              <template v-else>
                <label class="col-sm-8 control-label">婚姻状况</label>
                <div class="col-sm-16">
                  <select v-model="info.employee.isMarried" class="form-control" :disabled="$root.getTableField().employeeTable['isMarriedName'].auth==1">
                    <option value="">请选择婚姻状况</option>
                    <template v-for="item in marriedtypes">
                      <option value="{{item.code}}" :selected="item.code==info.employee.isMarried">{{item.codeName}}</option>
                    </template>
                  </select>
                </div>
              </template>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group   row" v-if="$root.getTableField().employeeTable['genderName'].auth != 0">
              <template v-if="tableColumnList['gender'] == 1">
                <label class="col-sm-8 control-label">性别</label>
                <div class="col-sm-16">
                  <select :disabled="$root.getTableField().employeeTable['genderName'].auth==1" v-model="info.employee.gender" class="form-control">
                    <option value="">请选择性别</option>
                    <template v-for="item in genders">
                      <option value="{{item.code}}" :selected="item.code==info.employee.gender">{{item.codeName}}</option>
                    </template>
                  </select>
                </div>
              </template>
              <template v-else>
                <label class="col-sm-8 control-label"><span class="must">*</span>性别</label>
                <div class="col-sm-16">
                  <select :disabled="$root.getTableField().employeeTable['genderName'].auth==1" v-model="info.employee.gender" class="form-control" vali="required" vali-msg='必填项'>
                    <option value="">请选择性别</option>
                    <template v-for="item in genders">
                      <option value="{{item.code}}" :selected="item.code==info.employee.gender">{{item.codeName}}</option>
                    </template>
                  </select>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group  row" v-if="$root.getTableField().employeeTable['dormName'].auth != 0">
              <template v-if="tableColumnList['dormistory'] == 0">
                <label class="col-sm-8 control-label"><span class="must">*</span>员工宿舍</label>
                <div class="col-sm-16">
                  <div class="choose-input" @click="selectDormitory">
                    <input :disabled="$root.getTableField().employeeTable['dormName'].auth==1" readonly type="text" v-model="info.dormitory.address" class="form-control" placeholder="请选择员工宿舍" vali="required" vali-msg='必填项'>
                    <i class="icon-tool-search icon-tool"></i>
                  </div>
                </div>
              </template>
              <template v-else>
                <label class="col-sm-8 control-label">员工宿舍</label>
                <div class="col-sm-16">
                  <div class="choose-input" @click="selectDormitory">
                    <input :disabled="$root.getTableField().employeeTable['dormName'].auth==1" readonly type="text" v-model="info.dormitory.address" class="form-control" placeholder="请选择员工宿舍">
                    <i class="icon-tool-search icon-tool"></i>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group  row" v-if="$root.getTableField().employeeTable['nationName'].auth != 0">
              <template v-if="tableColumnList['nation'] == 0">
                <label class="col-sm-8 control-label"><span class="must">*</span>民族</label>
                <div class="col-sm-16">
                  <select :disabled="$root.getTableField().employeeTable['nationName'].auth==1" v-model="info.employee.nation" class="form-control" vali="required" vali-msg='必填项'>
                    <option value="">请选择民族</option>
                    <template v-for="item in nations">
                      <option value="{{item.code}}" :selected="item.code==info.employee.nation">{{item.codeName}}</option>
                    </template>
                  </select>
                </div>
              </template>
              <template v-else>
                <label class="col-sm-8 control-label">民族</label>
                <div class="col-sm-16">
                  <select :disabled="$root.getTableField().employeeTable['nationName'].auth==1" v-model="info.employee.nation" class="form-control">
                    <option value="">请选择民族</option>
                    <template v-for="item in nations">
                      <option value="{{item.code}}" :selected="item.code==info.employee.nation">{{item.codeName}}</option>
                    </template>
                  </select>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group  row" v-if="$root.getTableField().employeeTable['hukouTypeName'].auth != 0">
              <template v-if="tableColumnList['hukouType'] == 0">
                <label class="col-sm-8 control-label"><span class="must">*</span>户口类型</label>
                <div class="col-sm-16">
                  <select :disabled="$root.getTableField().employeeTable['hukouTypeName'].auth==1" v-model="info.employee.hukouType" class="form-control" vali="required" vali-msg='必填项'>
                    <option value="">请选择户口类型</option>
                    <template v-for="item in hukoutypes">
                      <option value="{{item.code}}" :selected="item.code==info.employee.hukouType">{{item.codeName}}</option>
                    </template>
                  </select>
                </div>
              </template>
              <template v-else>
                <label class="col-sm-8 control-label">户口类型</label>
                <div class="col-sm-16">
                  <select :disabled="$root.getTableField().employeeTable['hukouTypeName'].auth==1" v-model="info.employee.hukouType" class="form-control">
                    <option value="">请选择户口类型</option>
                    <template v-for="item in hukoutypes">
                      <option value="{{item.code}}" :selected="item.code==info.employee.hukouType">{{item.codeName}}</option>
                    </template>
                  </select>
                </div>
              </template>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group   row" v-if="$root.getTableField().employeeTable['healthEndTime'].auth != 0">
              <template v-if="tableColumnList['healthEndTime'] == 1">
                <label class="col-sm-8 control-label">健康证</label>
                <div class="col-sm-16">
                  <ui-datepicker :disabled="$root.getTableField().employeeTable['healthEndTime'].auth==1" :time.sync="info.employee.healthEndTime" format="yyyy-MM-dd" width="232px"></ui-datepicker>
                </div>
              </template>
              <template v-else>
                <label class="col-sm-8 control-label"><span class="must">*</span>健康证</label>
                <div class="col-sm-16">
                  <ui-datepicker :disabled="$root.getTableField().employeeTable['healthEndTime'].auth==1" :time.sync="info.employee.healthEndTime" format="yyyy-MM-dd" width="232px" vali="required" vali-msg='必填项'></ui-datepicker>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group  row" v-if="$root.getTableField().employeeTable['bankNameName'].auth != 0">
              <template v-if="tableColumnList['bankName'] == 1">
                <label class="col-sm-8 control-label">发卡银行</label>
                <div class="col-sm-16">
                  <select :disabled="$root.getTableField().employeeTable['bankNameName'].auth==1" v-model="info.employee.bankName" class="form-control">
                    <option value="">请选择发卡银行</option>
                    <template v-for="item in banks">
                      <option value="{{item.code}}" :selected="item.code==info.employee.bankName">{{item.codeName}}</option>
                    </template>
                  </select>
                </div>
              </template>
              <template v-else>
                <label class="col-sm-8 control-label"><span class="must">*</span>发卡银行</label>
                <div class="col-sm-16">
                  <select :disabled="$root.getTableField().employeeTable['bankNameName'].auth==1" v-model="info.employee.bankName" class="form-control" vali="required" vali-msg='必填项'>
                    <option value="">请选择发卡银行</option>
                    <template v-for="item in banks">
                      <option value="{{item.code}}" :selected="item.code==info.employee.bankName">{{item.codeName}}</option>
                    </template>
                  </select>
                </div>
              </template>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group   row" v-if="$root.getTableField().employeeTable['bankCard'].auth != 0">
              <template v-if="tableColumnList['bankCard'] == 1">
                <label class="col-sm-8 control-label">银行卡号</label>
                <div class="col-sm-16">
                  <input :disabled="$root.getTableField().employeeTable['bankCard'].auth==1" type="text" v-model="info.employee.bankCard" class="form-control" placeholder="请输入银行卡号">
                </div>
              </template>
              <template v-else>
                <label class="col-sm-8 control-label"><span class="must">*</span>银行卡号</label>
                <div class="col-sm-16">
                  <input type="text" :disabled="$root.getTableField().employeeTable['bankCard'].auth==1" v-model="info.employee.bankCard" class="form-control" placeholder="请输入银行卡号" vali="required|maxStr:50" vali-msg='必填项||最大长度50'>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="row text-center block">
          <span class="block-content">联系方式</span>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group  row" v-if="$root.getTableField().employeeTable['phone'].auth != 0">
              <template v-if="tableColumnList['phone'] == 0">
                <label class="col-sm-8 control-label"><span class="must">*</span>手机号</label>
                <div class="col-sm-16">
                  <input :disabled="$root.getTableField().employeeTable['phone'].auth==1" type="text" vali="required|format:mobile" vali-msg='必填项|手机号错误' v-model="info.employee.phone" class="form-control" placeholder="请输入手机号">
                </div>
              </template>
              <template v-else>
                <label class="col-sm-8 control-label">手机号</label>
                <div class="col-sm-16">
                  <input :disabled="$root.getTableField().employeeTable['phone'].auth==1" type="text" vali="format:mobile" vali-msg='手机号错误' v-model="info.employee.phone" class="form-control" placeholder="请输入手机号">
                </div>
              </template>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group   row" v-if="$root.getTableField().employeeTable['weChat'].auth != 0">
              <template v-if="tableColumnList['weChat'] == 0">
                <label class="col-sm-8 control-label"><span class="must">*</span>微信</label>
                <div class="col-sm-16">
                  <input :disabled="$root.getTableField().employeeTable['weChat'].auth==1" type="text" vali="required" vali-msg='必填项' v-model="info.employee.weChat" class="form-control" placeholder="请输入微信">
                </div>
              </template>
              <template v-else>
                <label class="col-sm-8 control-label">微信</label>
                <div class="col-sm-16">
                  <input :disabled="$root.getTableField().employeeTable['weChat'].auth==1" type="text" v-model="info.employee.weChat" class="form-control" placeholder="请输入微信">
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group  row" v-if="$root.getTableField().employeeTable['mail'].auth != 0">
              <template v-if="tableColumnList['mail'] == 0">
                <label class="col-sm-8 control-label"><span class="must">*</span>邮箱</label>
                <div class="col-sm-16">
                  <input :disabled="$root.getTableField().employeeTable['mail'].auth==1" type="text" v-model="info.employee.mail" vali="required|format:email" vali-msg="必填项|email格式错误" class="form-control" placeholder="请输入邮箱">
                </div>
              </template>
              <template v-else>
                <label class="col-sm-8 control-label">邮箱</label>
                <div class="col-sm-16">
                  <input :disabled="$root.getTableField().employeeTable['mail'].auth==1" type="text" v-model="info.employee.mail" vali="format:email" vali-msg="email格式错误" class="form-control" placeholder="请输入邮箱">
                </div>
              </template>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group   row" v-if="$root.getTableField().employeeTable['qq'].auth != 0">
              <template v-if="tableColumnList['qq'] == 0">
                <label class="col-sm-8 control-label"><span class="must">*</span>QQ号</label>
                <div class="col-sm-16">
                  <input :disabled="$root.getTableField().employeeTable['qq'].auth==1" type="text" v-model="info.employee.qq" class="form-control" placeholder="请输入QQ号" vali="required" vali-msg='必填项'>
                </div>
              </template>
              <template v-else>
                <label class="col-sm-8 control-label">QQ号</label>
                <div class="col-sm-16">
                  <input :disabled="$root.getTableField().employeeTable['qq'].auth==1" type="text" v-model="info.employee.qq" class="form-control" placeholder="请输入QQ号">
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group   row" v-if="$root.getTableField().employeeTable['urgentPerson'].auth != 0">
              <template v-if="tableColumnList['urgentPerson'] == 0">
                <label class="col-sm-8 control-label"><span class="must">*</span>紧急联系人</label>
                <div class="col-sm-16">
                  <input :disabled="$root.getTableField().employeeTable['urgentPerson'].auth==1" type="text" v-model="info.employee.urgentPerson" class="form-control" placeholder="请输入紧急联系人" vali="required" vali-msg='必填项'>
                </div>
              </template>
              <template v-else>
                <label class="col-sm-8 control-label">紧急联系人</label>
                <div class="col-sm-16">
                  <input :disabled="$root.getTableField().employeeTable['urgentPerson'].auth==1" type="text" v-model="info.employee.urgentPerson" class="form-control" placeholder="请输入紧急联系人">
                </div>
              </template>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group   row" v-if="$root.getTableField().employeeTable['urgentPhone'].auth != 0">
              <template v-if="tableColumnList['urgentPhone'] == 0">
                <label class="col-sm-8 control-label"><span class="must">*</span>联系电话</label>
                <div class="col-sm-16">
                  <input :disabled="$root.getTableField().employeeTable['urgentPhone'].auth==1" type="text" v-model="info.employee.urgentPhone" class="form-control" placeholder="请输入联系电话" vali="required" vali-msg='必填项'>
                </div>
              </template>
              <template v-else>
                <label class="col-sm-8 control-label">联系电话</label>
                <div class="col-sm-16">
                  <input :disabled="$root.getTableField().employeeTable['urgentPhone'].auth==1" type="text" v-model="info.employee.urgentPhone" class="form-control" placeholder="请输入联系电话">
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="row text-center block">
          <span class="block-content">职业信息</span>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group  row" v-if="$root.getTableField().employeeTable['userTypeName'].auth != 0">
              <template v-if="tableColumnList['userType'] == 1">
                <label class="col-sm-8 control-label">用工类型</label>
                <div class="col-sm-16">
                  <select v-model="info.employee.userType" class="form-control" :disabled="$root.getTableField().employeeTable['userTypeName'].auth==1">
                    <option value="">请选择用工类型</option>
                    <template v-for="item in userTypes">
                      <option value="{{item.code}}" :selected="item.code==info.employee.userType">{{item.codeName}}</option>
                    </template>
                  </select>
                </div>
              </template>
              <template v-else>
                <label class="col-sm-8 control-label"><span class="must">*</span>用工类型</label>
                <div class="col-sm-16">
                  <select :disabled="$root.getTableField().employeeTable['userTypeName'].auth==1" v-model="info.employee.userType" class="form-control" vali="required" vali-msg='必填项'>
                    <option value="">请选择用工类型</option>
                    <template v-for="item in userTypes">
                      <option value="{{item.code}}" :selected="item.code==info.employee.userType">{{item.codeName}}</option>
                    </template>
                  </select>
                </div>
              </template>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group   row" v-if="$root.getTableField().employeeTable['firstWorkTime'].auth != 0">
              <template v-if="tableColumnList['firstWorkTime'] == 0">
                <label class="col-sm-8 control-label"><span class="must">*</span>首次工作日期</label>
                <div class="col-sm-16">
                  <ui-datepicker :disabled="$root.getTableField().employeeTable['firstWorkTime'].auth==1" :time.sync="info.employee.firstWorkTime" format="yyyy-MM-dd" width="232px" vali="required" vali-msg='必填项'></ui-datepicker>
                </div>
              </template>
              <template v-else>
                <label class="col-sm-8 control-label">首次工作日期</label>
                <div class="col-sm-16">
                  <ui-datepicker :disabled="$root.getTableField().employeeTable['firstWorkTime'].auth==1" :time.sync="info.employee.firstWorkTime" format="yyyy-MM-dd" width="232px"></ui-datepicker>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group  row" v-if="$root.getTableField().employeeTable['orgName'].auth != 0">
              <template v-if="tableColumnList['deptID'] == 1">
                <label class="col-sm-8 control-label">组织</label>
                <div class="col-sm-16">
                  <combo-tree :treedata="org" :multiple="false" idprop="ID" :rootvisible="false" :nodeclicked="nodeClicked" :enabledrop="(employeeID=='' || second) && $root.getTableField().employeeTable['orgName'].auth!=1">
                    <div data-toggle="dropdown">
                      <div class="choose-input">
                        <input type="text" class="form-control" v-model="orgDisplayName" placeholder="请选择组织" readonly @focus="orgfocus">
                        <i class="icon-tool-search icon-tool"></i>
                      </div>
                    </div>
                  </combo-tree>
                </div>
              </template>
              <template v-else>
                <label class="col-sm-8 control-label"><span class="must">*</span>组织</label>
                <div class="col-sm-16">
                  <combo-tree :treedata="org" :multiple="false" idprop="ID" :rootvisible="false" :nodeclicked="nodeClicked" :enabledrop="(employeeID=='' || second) && $root.getTableField().employeeTable['orgName'].auth!=1">
                    <div data-toggle="dropdown">
                      <div class="choose-input">
                        <input type="text" class="form-control" v-model="orgDisplayName" placeholder="请选择组织" vali="required" vali-msg='必填项' readonly @focus="orgfocus">
                        <i class="icon-tool-search icon-tool"></i>
                      </div>
                    </div>
                  </combo-tree>
                </div>
              </template>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group  row" v-if="$root.getTableField().employeeTable['postName'].auth != 0">
              <template v-if="tableColumnList['postID'] == 1">
                <label class="col-sm-8 control-label">岗位</label>
                <div class="col-sm-16">
                  <combo-tree :treedata="postTree" :multiple="false" idprop="ID" textprop="postName" :enabledrop="(employeeID=='' || second) && $root.getTableField().employeeTable['postName'].auth!=1" :rootvisible="false" :nodeclicked="postnodeClicked">
                    <div data-toggle="dropdown">
                      <div class="choose-input">
                        <input :disabled="" type="text" class="form-control" v-model="postDisplayName" placeholder="请选择岗位" readonly @focus="orgfocus">
                        <i class="icon-tool-search icon-tool"></i>
                      </div>
                    </div>
                  </combo-tree>
                </div>
              </template>
              <template v-else>
                <label class="col-sm-8 control-label"><span class="must">*</span>岗位</label>
                <div class="col-sm-16">
                  <combo-tree :treedata="postTree" :multiple="false" idprop="ID" textprop="postName" :enabledrop="(employeeID=='' || second) && $root.getTableField().employeeTable['postName'].auth!=1" :rootvisible="false" :nodeclicked="postnodeClicked">
                    <div data-toggle="dropdown">
                      <div class="choose-input">
                        <input :disabled="$root.getTableField().employeeTable['postName'].auth==1" type="text" class="form-control" vali="required" vali-msg='必填项' v-model="postDisplayName" placeholder="请选择岗位" readonly @focus="orgfocus">
                        <i class="icon-tool-search icon-tool"></i>
                      </div>
                    </div>
                  </combo-tree>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group   row" v-if="$root.getTableField().employeeTable['rankName'].auth != 0">
              <template v-if="tableColumnList['rankID'] == 1">
                <label class="col-sm-8 control-label">职级</label>
                <div class="col-sm-16">
                  <select v-bind:disabled="(employeeID!='' && !second) || $root.getTableField().employeeTable['rankName'].auth==1" v-model="info.employee.rankID" class="form-control">
                    <option value="">请选择职级</option>
                    <template v-for="item in ranks">
                      <option value="{{item.ID}}" :selected="item.ID==info.employee.rankID">{{item.rankName}}</option>
                    </template>
                  </select>
                </div>
              </template>
              <template v-else>
                <label class="col-sm-8 control-label"><span class="must">*</span>职级</label>
                <div class="col-sm-16">
                  <select v-bind:disabled="(employeeID!='' && !second) || $root.getTableField().employeeTable['rankName'].auth==1" v-model="info.employee.rankID" class="form-control" vali="required" vali-msg='必填项'>
                    <option value="">请选择职级</option>
                    <template v-for="item in ranks">
                      <option value="{{item.ID}}" :selected="item.ID==info.employee.rankID">{{item.rankName}}</option>
                    </template>
                  </select>
                </div>
              </template>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group  row" v-if="$root.getTableField().employeeTable['startTime'].auth != 0">
              <template v-if="tableColumnList['startTime'] == 1">
                <label class="col-sm-8 control-label">入职日期</label>
                <div class="col-sm-16">
                  <ui-datepicker :disabled="$root.getTableField().employeeTable['startTime'].auth==1" :time.sync="info.employee.startTime" format="yyyy-MM-dd" width="232px"></ui-datepicker>
                </div>
              </template>
              <template v-else>
                <label class="col-sm-8 control-label"><span class="must">*</span>入职日期</label>
                <div class="col-sm-16">
                  <ui-datepicker :disabled="$root.getTableField().employeeTable['startTime'].auth==1" :time.sync="info.employee.startTime" format="yyyy-MM-dd" width="232px" vali="required" vali-msg='必填项'></ui-datepicker>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group   row" v-if="$root.getTableField().employeeTable['offerTime'].auth != 0">
              <template v-if="tableColumnList['offerTime'] == 0">
                <label class="col-sm-8 control-label"><span class="must">*</span>转正日期</label>
                <div class="col-sm-16">
                  <ui-datepicker :disabled="$root.getTableField().employeeTable['offerTime'].auth==1" :time.sync="info.employee.offerTime" format="yyyy-MM-dd" width="232px" vali="required" vali-msg='必填项'></ui-datepicker>
                </div>
              </template>
              <template v-else>
                <label class="col-sm-8 control-label">转正日期</label>
                <div class="col-sm-16">
                  <ui-datepicker :disabled="$root.getTableField().employeeTable['offerTime'].auth==1" :time.sync="info.employee.offerTime" format="yyyy-MM-dd" width="232px"></ui-datepicker>
                </div>
              </template>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group  row" v-if="$root.getTableField().employeeTable['expiryDate'].auth != 0">
              <template v-if="tableColumnList['expiryDate'] == 0">
                <label class="col-sm-8 control-label"><span class="must">*</span>合同到期日</label>
                <div class="col-sm-16">
                  <ui-datepicker :disabled="$root.getTableField().employeeTable['expiryDate'].auth==1" :time.sync="info.employee.expiryDate" format="yyyy-MM-dd" width="232px" vali="required" vali-msg='必填项'></ui-datepicker>
                </div>
              </template>
              <template v-else>
                <label class="col-sm-8 control-label">合同到期日</label>
                <div class="col-sm-16">
                  <ui-datepicker :disabled="$root.getTableField().employeeTable['expiryDate'].auth==1" :time.sync="info.employee.expiryDate" format="yyyy-MM-dd" width="232px"></ui-datepicker>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group   row" v-if="$root.getTableField().employeeTable['stateName'].auth != 0">
              <template v-if="tableColumnList['state'] == 0">
                <label class="col-sm-8 control-label"><span class="must">*</span>员工状态</label>
                <div class="col-sm-16">
                  <select @change='stateChange' :disabled="(employeeID!='' && !second) || $root.getTableField().employeeTable['stateName'].auth==1" v-model="info.employee.state" class="form-control" vali="required" vali-msg='必填项'>
                    <option value="">请选择员工状态</option>
                    <template v-for="item in stateEmployee">
                      <option value="{{item.ID}}" :selected="item.ID==info.employee.state">{{item.name}}</option>
                    </template>
                  </select>
              </template>
              <template v-else>
                <label class="col-sm-8 control-label">员工状态</label>
                <div class="col-sm-16">
                  <select @change='stateChange' :disabled="(employeeID!='' && !second) || $root.getTableField().employeeTable['stateName'].auth==1" v-model="info.employee.state" class="form-control">
                    <option value="">请选择员工状态</option>
                    <template v-for="item in stateEmployee">
                      <option value="{{item.ID}}" :selected="item.ID==info.employee.state">{{item.name}}</option>
                    </template>
                  </select>
              </template>
              </div>
              </div>
            </div>
            <div class="row text-center block">
              <span class="block-content">考勤信息</span>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group   row" v-if="$root.getTableField().employeeTable['checkworkcode'].auth != 0">
                  <template v-if="tableColumnList['checkworkcode'] == 0">
                    <label class="col-sm-8 control-label"><span class="must">*</span>考勤卡号</label>
                    <div class="col-sm-16">
                      <input type="text" v-bind:disabled="type==2 || $root.getTableField().employeeTable['checkworkcode'].auth==1 " v-model="info.employee.checkworkcode" class="form-control" vali="required|maxStr:45" vali-msg="必填项|最大长度45" placeholder="请输入考勤卡号">
                    </div>
                  </template>
                  <template v-else>
                    <label class="col-sm-8 control-label">考勤卡号</label>
                    <div class="col-sm-16">
                      <input type="text" v-bind:disabled="type==2 || $root.getTableField().employeeTable['checkworkcode'].auth==1" v-model="info.employee.checkworkcode" class="form-control" vali="maxStr:45" vali-msg="最大长度45" placeholder="请输入考勤卡号">
                    </div>
                  </template>
                </div>
              </div>
              <!-- 考勤规则隐藏 -->
              <div class="col-sm-12">
                <div class="form-group  row" v-if="$root.getTableField().employeeTable['checkworkName'].auth != 0">
                  <template v-if="tableColumnList['checkworkid'] == 1">
                    <label class="col-sm-8 control-label">考勤规则</label>
                    <div class="col-sm-16">
                      <select v-model="info.employee.checkworkid" class="form-control" :disabled="$root.getTableField().employeeTable['checkworkName'].auth==1">
                        <option value="">请选择考勤规则</option>
                        <template v-for="item in rules">
                          <option value="{{item.ID}}" :selected="item.ID==info.employee.checkworkid">{{item.checkworkName}}</option>
                        </template>
                      </select>
                    </div>
                  </template>
                  <template v-else>
                    <label class="col-sm-8 control-label"><span class="must">*</span>考勤规则</label>
                    <div class="col-sm-16">
                      <select :disabled="$root.getTableField().employeeTable['checkworkName'].auth==1" v-model="info.employee.checkworkid" class="form-control" vali="required" vali-msg='必填项'>
                        <option value="">请选择考勤规则</option>
                        <template v-for="item in rules">
                          <option value="{{item.ID}}" :selected="item.ID==info.employee.checkworkid">{{item.checkworkName}}</option>
                        </template>
                      </select>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12" v-if="$root.getTableField().employeeTable['checkWorkNo'].auth != 0">
                <div class="form-group   row">
                  <label class="col-sm-8 control-label">考勤ID</label>
                  <div class="col-sm-16">
                    <input type="text" v-bind:disabled="true" v-model="info.employee.checkWorkNo" class="form-control" placeholder="自动生成考勤编号">
                  </div>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group  row" v-if="$root.getTableField().employeeTable['orgName'].auth != 0">
                  <template v-if="tableColumnList['deptID'] == 1">
                    <label class="col-sm-8 control-label">打卡组织</label>
                    <div class="col-sm-16">
                      <combo-tree :treedata="org2" :nodeclicked="nodeClickedCheck" :checkable="true" :multiple="true" :rootvisible="false" idprop="ID">
                        <div class="choose-input" data-toggle="dropdown">
                          <input type="text" vali="required" vali-msg='必填项' class="form-control" placeholder="请选择组织"  value="{{checkOrgName}}" title='{{checkOrgName}}'>
                           <i class="icon-tool-search icon-tool" ></i>
                        </div>
                      </combo-tree>
                    </div>
                  </template>
                  <template v-else>
                    <label class="col-sm-8 control-label"><span class="must">*</span>打卡组织</label>
                    <div class="col-sm-16">
                      <combo-tree :treedata="org2" :nodeclicked="nodeClickedCheck" :checkable="true" :multiple="true" :rootvisible="false" idprop="ID">
                        <div class="choose-input" data-toggle="dropdown">
                          <input type="text" vali="required" vali-msg='必填项' class="form-control" placeholder="请选择组织"  value="{{checkOrgName}}" title='{{checkOrgName}}'>
                          <i class="icon-tool-search icon-tool" ></i>
                        </div>
                      </combo-tree>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div class="row text-center block">
              <span class="block-content">附件上传</span>
            </div>
            <div class="row">
              <div class="col-sm-24">
                <div class="form-group   row">
                  <label class="col-sm-4 control-label">身份证</label>
                  <div class="col-sm-4">
                    <button type="button" class="btn btn-default" @click="uploadAttach('identityUrl')">+ {{ info.empaccessory &&info.empaccessory.identityUrl!=null && info.empaccessory.identityUrl.length>0 ? '重新上传':'上传附件'}}</button>
                  </div>
                  <div class="col-sm-12">
                    <template v-if="info.empaccessory && info.empaccessory.identityUrl!=null && info.empaccessory.identityUrl.length>0">
                      <span class="label label-success">
                    <i class="material-icons">check_circle</i>上传成功</span>
                    </template>
                  </div>
                  <div class="col-sm-4">
                    <a href="javascript:void(0)" v-if="info.empaccessory && info.empaccessory.identityUrl!=null && info.empaccessory.identityUrl.length>0" @click="lookAttach('identityUrl')">查看</a>
                    &nbsp;&nbsp;
                    <a href="javascript:void(0)" v-if="info.empaccessory && info.empaccessory.identityUrl!=null && info.empaccessory.identityUrl.length>0" @click="removeAttach('identityUrl')">删除</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-24">
                <div class="form-group   row">
                  <label class="col-sm-4 control-label">健康证</label>
                  <div class="col-sm-4">
                    <button type="button" class="btn btn-default" @click="uploadAttach('healthUrl')">+ {{info.empaccessory && info.empaccessory.healthUrl!=null && info.empaccessory.healthUrl.length>0 ? '重新上传':'上传附件'}}</button>
                  </div>
                  <div class="col-sm-12">
                    <template v-if="info.empaccessory && info.empaccessory.healthUrl!=null && info.empaccessory.healthUrl.length>0">
                      <span class="label label-success">
                    <i class="material-icons">check_circle</i>上传成功</span>
                    </template>
                  </div>
                  <div class="col-sm-4">
                    <a href="javascript:void(0)" v-if="info.empaccessory && info.empaccessory.healthUrl!=null && info.empaccessory.healthUrl.length>0" @click="lookAttach('healthUrl')">查看</a>
                    &nbsp;&nbsp;
                    <a href="javascript:void(0)" v-if="info.empaccessory && info.empaccessory.healthUrl!=null && info.empaccessory.healthUrl.length>0" @click="removeAttach('healthUrl')">删除</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-24">
                <div class="form-group   row">
                  <label class="col-sm-4 control-label">银行卡</label>
                  <div class="col-sm-4">
                    <button type="button" class="btn btn-default" @click="uploadAttach('bankUrl')">+ {{info.empaccessory && info.empaccessory.bankUrl!=null && info.empaccessory.bankUrl.length>0 ? '重新上传':'上传附件'}}</button>
                  </div>
                  <div class="col-sm-12">
                    <template v-if="info.empaccessory && info.empaccessory.bankUrl!=null && info.empaccessory.bankUrl.length>0">
                      <span class="label label-success">
                    <i class="material-icons">check_circle</i>上传成功</span>
                    </template>
                  </div>
                  <div class="col-sm-4">
                    <a href="javascript:void(0)" v-if="info.empaccessory && info.empaccessory.bankUrl!=null && info.empaccessory.bankUrl.length>0" @click="lookAttach('bankUrl')">查看</a>
                    &nbsp;&nbsp;
                    <a href="javascript:void(0)" v-if="info.empaccessory && info.empaccessory.bankUrl!=null && info.empaccessory.bankUrl.length>0" @click="removeAttach('bankUrl')">删除</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-24">
                <div class="form-group   row">
                  <label class="col-sm-4 control-label">合同</label>
                  <div class="col-sm-4">
                    <button type="button" class="btn btn-default" @click="uploadAttach('contractUrl')">+ {{info.empaccessory && info.empaccessory.contractUrl!=null && info.empaccessory.contractUrl.length>0 ? '重新上传':'上传附件'}}</button>
                  </div>
                  <div class="col-sm-12">
                    <template v-if="info.empaccessory && info.empaccessory.contractUrl!=null && info.empaccessory.contractUrl.length>0">
                      <span class="label label-success">
                    <i class="material-icons">check_circle</i>上传成功</span>
                    </template>
                  </div>
                  <div class="col-sm-4">
                    <a href="javascript:void(0)" v-if="info.empaccessory && info.empaccessory.contractUrl!=null && info.empaccessory.contractUrl.length>0" @click="lookAttach('contractUrl')">查看</a>
                    &nbsp;&nbsp;
                    <a href="javascript:void(0)" v-if="info.empaccessory && info.empaccessory.contractUrl!=null && info.empaccessory.contractUrl.length>0" @click="removeAttach('contractUrl')">删除</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="row text-center block">
              <span class="block-content">工作经历</span>
            </div>
            <template v-for="item in info.jobexperienceList">
              <div class="selfDefined">
                <div class="row ">
                  <div class="col-sm-12">
                    <div class="form-group   row">
                      <label class="col-sm-8 control-label">开始日期</label>
                      <div class="col-sm-16">
                        <ui-datepicker :time.sync="item.startTime" format="yyyy-MM-dd" width="232px" vali="required" vali-msg='必填项'></ui-datepicker>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-12">
                    <div class="form-group  row">
                      <label class="col-sm-8 control-label">结束日期</label>
                      <div class="col-sm-16">
                        <ui-datepicker :time.sync="item.endTime" format="yyyy-MM-dd" width="232px" vali="required" vali-msg='必填项'></ui-datepicker>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-24">
                    <input type="text" vali="required" vali-msg='必填项' v-model="item.unitName" class="form-control" placeholder="请输入公司名称或其他">
                  </div>
                </div>
                <div class="delete" @click="deletejobexperienceList(item.index)">
                  <i class="icon-tool icon-tool-close"></i>
                </div>
              </div>
            </template>
            <div class="row">
              <div class="col-sm-24">
                <ui-button icon="add" color="primary" class="large" @click="addWork">添加工作经历</ui-button>
              </div>
            </div>
            <div class="row text-center block">
              <span class="block-content">教育经历</span>
            </div>
            <template v-for="item in info.educateList">
              <div class="selfDefined">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group   row">
                      <label class="col-sm-8 control-label">开始日期</label>
                      <div class="col-sm-16">
                        <ui-datepicker :time.sync="item.startTime" format="yyyy-MM-dd" width="232px" vali="required" vali-msg='必填项'></ui-datepicker>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-12">
                    <div class="form-group  row">
                      <label class="col-sm-8 control-label">结束日期</label>
                      <div class="col-sm-16">
                        <ui-datepicker :time.sync="item.endTime" format="yyyy-MM-dd" width="232px" vali="required" vali-msg='必填项'></ui-datepicker>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-24">
                    <input type="text" vali="required" vali-msg='必填项' v-model="item.schooleName" class="form-control" placeholder="请输入学校名称">
                  </div>
                </div>
                <div class="delete" @click="deleteeducateList(item.index)">
                  <i class="icon-tool icon-tool-close"></i>
                </div>
              </div>
            </template>
            <div class="row">
              <div class="col-sm-24">
                <ui-button icon="add" color="primary" class="large" @click="addeducateList">添加教育经历</ui-button>
              </div>
            </div>
            <br>
            <div class="row">
              <div class="col-sm-24">
                <ui-button icon="add" color="primary" class="large" @click="addOrUpdateExtendInfo">
                  编辑扩展信息
                </ui-button>
              </div>
            </div>
            <div class="row">
              <div class="text-center">
                <ui-button color="accent" id="submitBt">提交</ui-button>
                <ui-button color="default" @click="close">取消</ui-button>
              </div>
            </div>
            <v-spinner :size="md" :fixed="false" text="" v-ref:spinner></v-spinner>
      </form>
    </ui-validator>
    <ui-modal :show.sync="uploadShow" header="上传头像" hide-footer type="large">
      <ui-upload :filecountlimit="filecountlimit" filetypelimit="png,jpg,jpeg" :submiturl="photoUrl" :callback="uploadDone"></ui-upload>
    </ui-modal>
    <ui-modal :show.sync="attachuploadShow" header="上传附件" hide-footer type="large">
      <ui-upload :filecountlimit="filecountlimit" filetypelimit="png,jpg,jpeg" :submiturl="attachUrl" :callback="attachuploadDone"></ui-upload>
    </ui-modal>
    <components :is="what" :display.sync="showSelect" :callback="dormitorycallback">
    </components>
    <extend-employee-info :extend-list="info.extendList" v-if="extendShow" :display.sync="extendShow" :id="employeeID" :component-call-back="extendCallBack"></extend-employee-info>
    <ui-modal :show.sync="lookattached" v-if="lookattached" header="查看附件" hide-footer type="large">
      <ui-image-view :imgurls="imgurls" :curimg-index="curimgIndex"></ui-image-view>
    </ui-modal>
  </ui-modal>
</template>
<script>
import store from '../store'
import selectDormitory from './selectDormitory'
import extendEmployeeInfo from './extendEmployeeInfo'
import Vue from 'vue'
const tool = Vue.tool

export default {
  data() {
      return {
        state: store.state,
        imgSrc: null,
        tableColumnList: {}, //表单必填项信息
        tabelFields: {},

        postDisplayName: '',
        orgDisplayName: '',
        checkOrgName: [],

        last: '',
        lookattached: false, //查看附件
        extendShow: false,
        filecountlimit: 1, //上传文件个数限制
        uploadShow: false,
        what: '',
        showSelect: false, //显示宿舍列表

        attachuploadShow: false,
        attachUrl: '', //上传附件url
        photoUrl: 'api.OrgEmployee.photoUpload',
        generationFlag: false,

        second: false,
        org: {}, //组织树
        org2: {}, //组织树
        postTree: [], //岗位树
        hukoutypes: [], //户口类型
        marriedtypes: [], //婚姻类型
        nations: [], //民族
        genders: [], //性别
        sushe: [], //员工宿舍
        ranks: [], //职级
        rules: [], //考勤规则
        banks: [], //发卡银行
        userTypes: [], //用工类型
        idCardTypes: [], //证件类型
        countrys: [],
        stateEmployee: [{
          name: '试用',
          ID: '120001'
        }, {
          name: '在职',
          ID: '120002'
        }], //员工状态

        imgurls: [],
        curimgIndex: 0,
        //个人详细信息
        info: {
          employee: {
            userName: '', //名称idCardTypes
            userNum: '', //编码
            photourl: '', //头像路径
            checkWorkNo: '', //pin
            firstWorkTime: '', //首次参加工作日期
            country: '', //国籍
            idCardType: '', //证件类型
            userIDCard: '', //身份证号
            birthDay: '', //出生日期
            hukouAddress: '', //户口所在地
            isMarried: '', //婚姻状况
            gender: '', //性别
            nation: '', //民族
            hukouType: '', //户口类型
            healthEndTime: '', //健康证到期日
            phone: '', //手机号
            weChat: '', //微信
            mail: '', //邮箱
            userType: '', //用工类型
            qq: '', //qq号
            urgentPerson: '', //紧急联系人
            urgentPhone: '', //紧急联系人电话
            organizeID: '', //组织ID
            chcekOrgID: '', //打卡组织ID
            postID: '', //岗位
            rankID: '', //职级
            startTime: '', //入职日期
            offerTime: '', //转正日期
            // effectiveTime: '', //生效日期
            checkworkcode: '', //考勤卡号
            bankName: '', //发卡银行
            bankCard: '', //卡号
            checkworkid: '', //考勤规则1z
            expiryDate: '', //合同到期日
            state: '120001', //员工状态


          },
          jobexperienceList: [], //工作经历
          educateList: [], //教育经历
          dormitory: {
            ID: '', //
            address: '', //员工宿舍
          },
          empaccessory: {
            //附件
            identityUrl: '',
            healthUrl: '',
            contractUrl: '',
            bankUrl: ''
          },
          extendList: [],
          checkworkOrgList: [],
        },
      }
    },
    methods: {
      lookAttach(url) {
        if (this.info.empaccessory[url] !== "") {
          this.curimgIndex = this.imgurls.findIndex((item) => {
            if (item === Vue.__Basepath + 'acewill/employee/getAccessoryImag.htm?url=' + this.info.empaccessory[url]) {
              return true;
            } else {
              return false;
            }
          });
          this.lookattached = true;
        }
      },
      uploadAttach(url) {
        this.attachuploadShow = true;
        this.attachUrl = "api.OrgEmployee." + url;
      },
      removeAttach(url) {
        this.info.empaccessory[url] = "";
      },
      attachuploadDone(data) {
        if (this.attachUrl !== "") {
          this.info.empaccessory[this.attachUrl.split('.')[2]] = encodeURIComponent(data);
          var arr = [];
          for (var item in this.info.empaccessory) {
            if (this.info.empaccessory[item] !== "") {
              arr.push(Vue.__Basepath + 'acewill/employee/getAccessoryImag.htm?url=' + this.info.empaccessory[item]);
            }
          }
          this.imgurls = arr;
          this.attachuploadShow = false;
        }
      },
      //员工扩展回调
      extendCallBack(data) {
        console.log(data);
        this.info.extendList = data;
      },
      //员工扩展信息
      addOrUpdateExtendInfo() {
        this.extendShow = true;
      },
      orgfocus() {
        if (this.employeeID != "" && !this.second) {
          this.$root.showTip({
            type: 'danger',
            msg: "组织,岗位,职级信息更改,请走异动单据",
            duration: 2000
          });
        }
      },
      /**
       * 身份证验证
       * [selectDormitory description]
       * @return {[type]} [description]
       */
      IDChange(e) {

        var target = e.target || e.srcElement;
        var idCard = target.value;
        var self = this;

        if (this.info.employee.idCardType != "" && this.info.employee.idCardType !== '149001') {
          this.last = e.timeStamp;

          setTimeout(function() { //设时延迟1s执行
            if (self.last - e.timeStamp == 0) {
              checkrein(idCard);
            }
          }, 1000);

          return;
        }

        var obj = tool.IDCardResolve(idCard);
        if (obj !== false) {
          console.log(obj);
          this.info.employee.birthDay = obj.birthday;
          // this.info.employee.province=obj.provice;
          // 修改时，不检查重新加入
          if (this.employeeID != "") {
            return;
          }
          checkrein(idCard)
        } else {
          this.info.employee.birthDay = "";
        }

        function checkrein(idCard) {
          store.actions.selectEmployeeByIDCard(idCard, function(data) {
            if (data.employee && data.employee.ID) {
              self.second = true;
              self.loadUserInfo(data, data.employee.ID);
            }
          }, function(error) {
            self.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          });
        }
      },
      /**
       * 弹出选择宿舍选择框
       * [selectDormitory description]
       * @return {[type]} [description]
       */
      selectDormitory() {
        if (this.$root.getTableField().employeeTable['dormName'].auth == 1) {
          return;
        }
        this.what = "selectDormitory";
        this.showSelect = true;
      },
      /**
       * 点击组织树
       * [nodeClicked description]
       * @return {[type]} [description]
       */
      nodeClicked(data) {
        var self = this;
        self.info.employee.organizeID = data.organizeID;
        self.orgDisplayName = data.text;
        if (this.info.employee.organizeID && this.info.employee.state) {
          store.actions.createNumByEmployeeNumRule(this.info, (data) => {
            if (data.userNum) {
              self.info.employee.userNum = data.userNum;
              self.generationFlag = true;
            }

          }, (data) => {
            self.$refs.spinner.hide();
            self.$root.showTip({
              type: 'danger',
              msg: data,
              duration: 2000
            });
            console.log(data);
          });
        }

      },
      nodeClickedCheck(data) {
        var self = this;
        self.checkOrgName = [];
        self.info.checkworkOrgList = [];
        for (var i = 0; i < data.length; i++) {
          self.checkOrgName.$set(self.checkOrgName.length, data[i].text);
          self.info.checkworkOrgList.$set(self.info.checkworkOrgList.length, data[i].organizeID);
        }
      },
      stateChange() {
        var self = this;
        console.log(this.employeeID)
        if (!this.employeeID) {
          if (this.info.employee.organizeID && this.info.employee.state) {
            store.actions.createNumByEmployeeNumRule(this.info, (data) => {
              if (data.userNum) {
                self.info.employee.userNum = data.userNum;
                self.generationFlag = true;
              }

            }, (data) => {
              self.$refs.spinner.hide();
              self.$root.showTip({
                type: 'danger',
                msg: data,
                duration: 2000
              });
              console.log(data);
            });
          }
        }

      },
      /**
       * 岗位节点点击
       * [postnodeClicked description]
       * @return {[type]} [description]
       */
      postnodeClicked(data) {
        var self = this;
        self.info.employee.postID = data.ID;
        self.postDisplayName = data.postName;
      },
      /**
       * 选择宿舍回调
       */
      dormitorycallback(data) {
        console.log(data);
        if (data.length > 0) {
          this.info.dormitory.address = data[0].address;
          this.info.dormitory.ID = data[0].ID;
        } else {
          this.info.dormitory.address = "";
          this.info.dormitory.ID = "";
        }
      },
      //添加工作经历
      addWork() {
        var obj = {};
        obj.index = this.getMaxWorkIndex();
        obj.startTime = '';
        obj.endTime = '';
        obj.unitName = '';
        this.info.jobexperienceList.push(obj);
      },
      //获取工作经历中最大索引
      getMaxWorkIndex() {
        if (this.info.jobexperienceList.length == 0) {
          return 0;
        } else {
          return this.info.jobexperienceList.map((item) => {
            return item.index;
          }).sort().pop() - 0 + 1
        }
      },
      //删除某项工作经历
      deletejobexperienceList(index) {
        var length = this.info.jobexperienceList.length;
        for (var i = length - 1; i >= 0; i--) {
          if (this.info.jobexperienceList[i].index == index) {
            this.info.jobexperienceList.splice(i, 1);
          }
        };
      },
      //添加教育经历
      addeducateList() {
        var obj = {};
        obj.index = this.getMaxeducateListIndex();
        obj.startTime = '';
        obj.endTime = '';
        obj.schooleName = '';
        this.info.educateList.push(obj);
      },
      //获取工作经历中最大索引
      getMaxeducateListIndex() {
        if (this.info.educateList.length == 0) {
          return 0;
        } else {
          return this.info.educateList.map((item) => {
            return item.index;
          }).sort().pop() - 0 + 1
        }
      },
      //删除某项教育经历
      deleteeducateList(index) {
        var length = this.info.educateList.length;
        for (var i = length - 1; i >= 0; i--) {
          if (this.info.educateList[i].index == index) {
            this.info.educateList.splice(i, 1);
          }
        };
      },
      //上传头像
      uploadImg() {
        this.uploadShow = true;
      },
      //上传头像完成,修改人员信息的头像路径
      uploadDone(data, url) {
        this.info.employee.photourl = data;
        this.imgSrc = url;
        this.uploadShow = false;
      },

      //关闭窗体
      close() {
        this.display = false;
      },
      loadUserInfo(data, ID) {
        var self = this;

        data.jobexperienceList.forEach(function(value, index) {
          value.index = index;
        })
        data.educateList.forEach(function(value, index) {
          value.index = index;
        })

        self.info.jobexperienceList = data.jobexperienceList;
        self.info.educateList = data.educateList;
        self.info.empaccessory = data.empaccessory || {
          identityUrl: '',
          healthUrl: '',
          contractUrl: '',
          bankUrl: ''
        };
        // console.log(data)
        // console.log(this.state.checkedOrgTeamData)
        // console.log(self.state.checkedOrgTeamData)
        if (Array.isArray(self.state.checkedOrgTeamData)) {
          if (data.checkworkOrgList.teamIDList) {
            data.checkworkOrgList.teamIDList.forEach((item) => {
              var s = self.state.checkedOrgTeamData.find((team) => {
                return team.organizeID == item;
              });
              if (s) {
                self.checkOrgName.push(s.teamName)
                s.checked = true;
              }
            });
          }
          self.state.checkedOrgTeamData.forEach(function(elem) {
            elem.nodeType = "team";
            elem.text = elem.teamName;
            elem.organizeType = 'team'
          });
        };
        if (Array.isArray(self.state.checkedOrgStoreData)) {
          if (data.checkworkOrgList.storeIDList) {
            data.checkworkOrgList.storeIDList.forEach((item) => {
              var s = self.state.checkedOrgStoreData.find((store) => {
                return store.organizeID == item;
              });
              if (s) {
                self.checkOrgName.push(s.storeName)
                s.checked = true;
              }
            });
          }
          self.state.checkedOrgStoreData.forEach(function(elem) {
            if (Array.isArray(self.state.checkedOrgTeamData)) {
              var childrenButton = self.state.checkedOrgTeamData.filter(function(item) {
                return item.storeID == elem.ID;
              });
              elem.children = [];
              childrenButton.forEach(function(item) {
                elem.children.push(item);
              });
            }
          });
        };

        if (Array.isArray(self.state.checkedOrgDeptData)) {
          if (data.checkworkOrgList.deptIDList) {
            data.checkworkOrgList.deptIDList.forEach((item) => {
              var d = self.state.checkedOrgDeptData.find((dept) => {
                return dept.organizeID == item;
              });
              if (d) {
                self.checkOrgName.push(d.departmentName)
                d.checked = true;
              }
            });
          }
          self.state.checkedOrgDeptData.forEach(function(elem) {
            elem.nodeType = "department";
            elem.expanded = false;
            elem.text = elem.departmentName;
            if (Array.isArray(self.state.checkedOrgStoreData)) {
              var childrenButton = self.state.checkedOrgStoreData.filter(function(item) {
                return item.deptID == elem.ID;
              });
              elem.children = [];
              childrenButton.forEach(function(item) {
                item.nodeType = "store";
                item.text = item.storeName;
                elem.children.push(item);
              });
            }
          });
        };
        var treeData2 = tool.convertToTree(self.state.checkedOrgDeptData)

        var root = {
          ID: -1,
          pageName: '组织树',
          children: [],
          expanded: true
        };
        treeData2.forEach(function(item) {
          item.expanded = true;
          root.children.push(item);
        });
        // 处理没有挂载在部门的 store
        if (Array.isArray(self.state.checkedOrgStoreData)) {
          self.state.checkedOrgStoreData.forEach((elem) => {
            if (!elem.nodeType) {
              elem.text = elem.storeName;
              root.children.push(elem);
            }
          });
        };
        // 处理没有挂载在store的 小组
        if (Array.isArray(self.state.checkedOrgTeamData)) {
          self.state.checkedOrgTeamData.forEach((elem) => {
            if (!elem.nodeType) {
              elem.text = elem.teamName;
              root.children.push(elem);
            }
          });
        };
        
        self.org2 = JSON.parse(JSON.stringify(root));
        for (var i in self.info.dormitory) {
          if (data.dormitory && data.dormitory[i] && data.dormitory[i] != "NULL") {
            self.info.dormitory[i] = data.dormitory[i];
          }
        }
        for (var i in self.info.employee) {
          if (data.employee[i] && data.employee[i] != "NULL" && i != "organizeID" && i != "postID" && i != "rankID") {
            self.info.employee[i] = data.employee[i];
          }
        }

        if (ID != "") {
          self.employeeID = ID;
          self.info.employee.state = '120001';
        }

        self.info.employee.organizeID = data.employee.organizeID;

        setTimeout(() => {
          self.info.employee.postID = data.employee.postID;
        }, 200);
        setTimeout(() => {
          self.info.employee.rankID = data.employee.rankID;
        }, 200);


        if (data.employee.deptName) {
          self.orgDisplayName = data.employee.deptName;
        }
        if (data.employee.storeName) {
          self.orgDisplayName = data.employee.storeName;
        }
        if (data.employee.teamName) {
          self.orgDisplayName = data.employee.teamName;
        }
        if (data.employee.postName) {
          setTimeout(() => {
            self.postDisplayName = data.employee.postName;
          }, 200);

        }
      }
    },
    events: {
      //提交人员信息
      submitInfo() {
        var self = this;
        var flag = false;
        //验证时间
        // var oDate1 = new Date(self.info.employee.effectiveTime);
        // var oDate2 = new Date(self.info.employee.healthEndTime);
        // oDate1 = new Date(oDate1.getFullYear() + "-" + (oDate1.getMonth() + 1) + "-" + oDate1.getDate());
        // oDate2 = new Date(oDate2.getFullYear() + "-" + (oDate2.getMonth() + 1) + "-" + oDate2.getDate());

        // if (oDate2 < oDate1) {
        //   self.$root.showTip({
        //     type: 'danger',
        //     msg: '员工健康证已经过期',
        //     duration: 2000
        //   });
        //   return;
        // }
        // oDate1 = new Date(self.info.employee.startTime);
        // oDate2 = new Date(self.info.employee.offerTime);
        // oDate1 = new Date(oDate1.getFullYear() + "-" + (oDate1.getMonth() + 1) + "-" + oDate1.getDate());
        // oDate2 = new Date(oDate2.getFullYear() + "-" + (oDate2.getMonth() + 1) + "-" + oDate2.getDate());

        // if (oDate2 < oDate1) {
        //   self.$root.showTip({
        //     type: 'danger',
        //     msg: '员工转正日期不能小于入职日期',
        //     duration: 2000
        //   });
        //   return;
        // }
        // oDate2 = new Date(self.info.employee.effectiveTime);
        // oDate2 = new Date(oDate2.getFullYear() + "-" + (oDate2.getMonth() + 1) + "-" + oDate2.getDate());
        // if (oDate2 < oDate1) {
        //   self.$root.showTip({
        //     type: 'danger',
        //     msg: '生效日期不能小于入职日期',
        //     duration: 2000
        //   });
        //   return;
        // }

        // if (info.employee.firstWorkTime > info.employee.startTime) {
        //   self.$root.showTip({
        //     type: 'danger',
        //     msg: '参加工作日期不能大于入职日期',
        //     duration: 2000
        //   });
        //   return;
        // }

        // if(info.employee.startTime > info.employee.offerTime) {
        //   self.$root.showTip({
        //     type: 'danger',
        //     msg: '入职日期不能大于转正日期',
        //     duration: 2000
        //   });
        //   return;
        // }

        // if(info.employee.offerTime > info.employee.effectiveTime) {
        //   self.$root.showTip({
        //     type: 'danger',
        //     msg: '转正日期不能大于生效日期',
        //     duration: 2000
        //   });
        //   return;
        // }
        // if (!this.employeeID) {
        //   store.actions.createNumByEmployeeNumRule(this.info, (data) => {
        //     if (data.userNum) {
        //       self.info.employee.userNum = data.userNum;
        //     }

        //   }, (data) => {
        //     self.$refs.spinner.hide();
        //     self.$root.showTip({
        //       type: 'danger',
        //       msg: data,
        //       duration: 2000
        //     });
        //     console.log(data);
        //   });
        // } else {
        var copyInfo = {};
        copyInfo.employeeEntry = this.info.employee;
        copyInfo.jobexperienceList = this.info.jobexperienceList;
        copyInfo.educateList = this.info.educateList;
        copyInfo.dormitory = this.info.dormitory;
        copyInfo.extendList = this.info.extendList;
        copyInfo.checkworkOrgList = this.info.checkworkOrgList;
        copyInfo.empaccessory = this.info.empaccessory;
        self.$refs.spinner.show();
        if (self.employeeID == "") {
          store.actions.pushEmployee(copyInfo, function(data) {
            self.$refs.spinner.hide();
            self.$root.showTip({
              type: 'danger',
              msg: '添加员工成功',
              duration: 2000
            });
            self.employeecallback(self.info);
            store.actions.loadEmployeeByPostList();
            store.actions.loadEmployeeByTreeNodeList();
            self.display = false;
          }, function(error) {
            self.$refs.spinner.hide();
            self.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
            if (error == '员工工号重复') {
              if (self.generationFlag) {
                store.actions.createNumByEmployeeNumRule(self.info, (data) => {
                  if (data.userNum) {
                    self.info.employee.userNum = data.userNum;
                  }

                }, (data) => {
                  self.$refs.spinner.hide();
                  self.$root.showTip({
                    type: 'danger',
                    msg: data,
                    duration: 2000
                  });
                  console.log(data);
                });
              }
            }
          })
        } else {
          self.info.employee.ID = self.employeeID;
          store.actions.updateEmployee(this.info, function(data) {
            self.$refs.spinner.hide();
            var msg = "";
            if (self.second) {
              msg = "重新加入成功";
            } else {
              msg = "修改员工成功";
            }
            self.$root.showTip({
              type: 'danger',
              msg: msg,
              duration: 2000
            });
            self.employeecallback(self.info);
            store.actions.loadEmployeeByPostList();
            store.actions.loadEmployeeByTreeNodeList();
            self.display = false;
          }, function(error) {
            self.$refs.spinner.hide();
            self.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          })
        }
        // }


      }

    },
    watch: {
      // 'info.employee.organizeID': function () {
      //   var self=this;
      //   console.log(this.info.employee.organizeID,this.info.employee.state)
      //   if (this.info.employee.organizeID && this.info.employee.state) {
      //     store.actions.createNumByEmployeeNumRule(this.info, (data) => {
      //       if (data.userNum) {
      //         self.info.employee.userNum = data.userNum;
      //       }

      //     }, (data) => {
      //       self.$refs.spinner.hide();
      //       self.$root.showTip({
      //         type: 'danger',
      //         msg: data,
      //         duration: 2000
      //       });
      //       console.log(data);
      //     });
      //   }
      // },

      'info.employee.idCardType': function(a, b) {
        if (a && !b) return;
        this.info.employee.userIDCard = '';
        this.info.employee.birthDay = '';
      },
      //如果组织ID变化了,则更新岗位树
      'info.employee.organizeID': function(a, b) {
        if (a != "") {
          var self = this;
          //清空岗位选择
          self.postDisplayName = "";
          self.info.employee.postID = "";
          self.postTree = [];
          //清空职级选择和列表
          self.info.employee.rankID = "";
          self.ranks = [];
          store.actions.loadPostTreeByOrgID(self.info.employee.organizeID, function(data) {
            self.postTree = data;
          }, function(error) {
            self.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          })
        }
      },
      //如果岗位ID变化了，更新职级树
      'info.employee.postID': function(a, b) {
        if (a != "") {
          var self = this;
          //清空职级选择,职级列表
          self.info.employee.rankID = "";
          self.ranks = [];
          //加载联动职级
          store.actions.loadRankByPostID(self.info.employee.postID, function(data) {
            self.ranks = data;
          }, function(error) {
            self.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          })
        }
      }
    },
    ready() {
      // this.$root.getTableField((feildAuthData)=>{
      //   for (var i = 0; i < feildAuthData.length; i++) {
      //       this.tabelFields[feildAuthData[i].tableName] = feildAuthData[i].fields;
      //       if (Array.isArray(this.tabelFields.employeeTable)) {
      //           this.tabelFields.employeeTable = {};
      //           feildAuthData[i].fields.forEach((item) => {
      //               this.tabelFields.employeeTable[item.name] = item;
      //           })
      //       }
      //   }
      // })


      console.log(this.tabelFields)
      console.log(this.$root.getTableField().employeeTable)
      var self = this;
      if (self.employeeID != "") {
        //加载个人详细信息
        store.actions.getOneEmployeeInfo(self.employeeID, function(data) {

          self.loadUserInfo(data, '');

          if (self.info.employee.checkWorkNo == "") {
            store.actions.getMaxPin(function(data) {
              self.info.employee.checkWorkNo = data;
            }, function(error) {
              self.$root.showTip({
                type: 'danger',
                msg: error,
                duration: 2000
              });
            });
          }


          var arr = [];
          self.info.empaccessory && self.info.empaccessory.identityUrl && arr.push(Vue.__Basepath + 'acewill/employee/getAccessoryImag.htm?url=' + self.info.empaccessory.identityUrl);
          self.info.empaccessory && self.info.empaccessory.healthUrl && arr.push(Vue.__Basepath + 'acewill/employee/getAccessoryImag.htm?url=' + self.info.empaccessory.healthUrl);
          self.info.empaccessory && self.info.empaccessory.contractUrl && arr.push(Vue.__Basepath + 'acewill/employee/getAccessoryImag.htm?url=' + self.info.empaccessory.contractUrl);
          self.info.empaccessory && self.info.empaccessory.bankUrl && arr.push(Vue.__Basepath + 'acewill/employee/getAccessoryImag.htm?url=' + self.info.empaccessory.bankUrl);
          self.imgurls = arr;
        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        })
      }


      store.actions.getTableColumnInfo({
        tableNameEn: 'employee'
      }, function(data) {
        var obj = {};
        data.forEach((item) => {
          obj[item.fieldNameEn] = item.valid;
        });

        self.tableColumnList = obj;
        self.$nextTick(() => {
          self.$refs.validator.refresh();
        })

      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      })


      //加载组织树
      store.actions.loadOrgListTree(function(data) {
        self.org = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
       store.actions.loadOrgListTree(function(data) {
        self.org2 = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
      //加载婚姻状况
      store.actions.findSystemConfig("114000", function(data) {
        self.marriedtypes = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
      //加载性别
      store.actions.findSystemConfig("118000", function(data) {
        self.genders = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
      //加载国籍
      store.actions.findSystemConfig("151000", function(data) {
        self.countrys = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });

      //加载证件类型
      store.actions.findSystemConfig("149000", function(data) {
        self.idCardTypes = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });

      //加载民族
      store.actions.findSystemConfig("113000", function(data) {
        self.nations = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
      //加载户口类型
      store.actions.findSystemConfig("117000", function(data) {
        self.hukoutypes = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
      //加载发卡银行
      store.actions.findSystemConfig("116000", function(data) {
        self.banks = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
      //加载用工类型
      store.actions.findSystemConfig("100000", function(data) {
        self.userTypes = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
      //加载员工状态
      store.actions.findSystemConfig("120000", function(data) {
        // function isBigEnough(element, index, array) {
        //   return (element.codeName != '离职' || element.codeName != '退休');
        // }
        // var filtered = data.filter(isBigEnough);
        data.forEach(item => {
          item.name = item.codeName;
          item.ID = item.code;
          if (item.codeName == '离职') {
            data.$remove(item);
          }
        })
        for (var i = 0; i < data.length; i++) {
          if (data[i].codeName == '退休') {
            data.$remove(data[i]);
            continue;
          }
        }
        for (var i = 0; i < data.length; i++) {
          if (data[i].codeName == '正式') {
            data.$remove(data[i]);
            continue;
          }
        }
        console.log(data)
        self.stateEmployee = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
      //加载考勤规则
      store.actions.getAllRules(function(data) {
        self.rules = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });

      store.actions.getExtendInfo({
        id: this.employeeID
      }, function(data) {
        self.info.extendList = data.map((item) => {

          return {
            showName: item.showName,
            dbNullable: item.dbNullable,
            dbName: item.dbName,
            des: item.des ? item.des : ''
          }
        });
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      })

      if (self.employeeID == "") {
        //获取PIN号
        store.actions.getMaxPin(function(data) {
          self.info.employee.checkWorkNo = data;
        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      }

    },
    props: {
      display: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: "add"
      },
      employeeID: {
        type: String,
        default: ''
      },
      employeecallback: {
        type: Function,
        default: function() {}
      }
    },
    components: {
      selectDormitory,
      extendEmployeeInfo
    }
};
</script>
<style lang="css" scoped>
.warp {
  overflow: hidden;
  position: relative;
}

.block {
  border-bottom: 1px #ccc dashed;
  height: 12px;
  margin-bottom: 28px;
  text-align: center;
}

.block-content {
  display: inline-block;
  height: 30px;
  padding: 0px 10px;
  background-color: white;
  color: #ccc;
}

.must {
  color: red;
}

.photo-wrap {
  margin: 0 -15px;
}

.photo-wrap:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.photo-wrap-left {
  width: 50%;
  float: left;
  padding: 0 15px;
}

.photo-wrap-right {
  width: 50%;
  float: right;
  padding: 0 15px;
  height: 160px;
  text-align: center;
  line-height: 130px;
}

.img {
  border-radius: 50px;
  width: 100px;
  height: 100px;
  vertical-align: middle
}

.photo-wrap-attach {
  width: 50%;
  float: right;
  padding: 0 15px;
  height: 20px;
  text-align: center;
}

.selfDefined {
  border: 1px dashed #ccc;
  padding: 15px 5px;
  margin-bottom: 20px;
  position: relative;
}

.delete {
  position: absolute;
  right: -10px;
  top: -10px;
  display: inline-block;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  transition: all 0.2s ease;
  cursor: pointer;
  border-radius: 15px;
  opacity: 0.5!important;
}

.delete:hover {
  transform: rotate(90deg);
}

.choose-input {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  font-family: 'Microsoft YaHei', serif;
  width: 100%;
}

.choose-input > input {
  font-family: 'Microsoft YaHei', serif;
  color: #666;
  box-sizing: border-box;
  outline: none;
  padding: 0 30px 0 7px;
  font-size: 13px;
  width: 100%;
  cursor: pointer;
  background: #fff;
}

.choose-input > i {
  display: inline-block;
  position: absolute;
  width: 30px;
  height: 30px;
  font-size: 18px;
  top: 8px;
  right: 0;
  color: #999;
}
</style>
