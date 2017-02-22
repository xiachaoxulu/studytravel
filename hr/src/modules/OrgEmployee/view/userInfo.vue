<template>
  <div class="panel userInfo_warp">
    <ui-scrollview>
      <div class="userInfo_content">
        <div class="quickinfo">
          <img v-if="employee.photourl==''" src="../../../assets/images/avatar.png" class="photo">
          <img v-else :src="'/acewill/employee/getHeadImag.htm?userId='+userid" class="photo">
          <div class="info">
            <div>
              <span class="name">{{employee.userName}}</span>
            </div>
            <div>
              <span class="orgname">{{employee.deptName}}</span>
              <span class="split">|</span>
              <span class="postname">{{employee.postName}}</span>
            </div>
          </div>
        </div>
        <table class="table table-striped mylabel   table-hover ">
          <tr>
            <td>
              <span>国籍</span>
            </td>
            <td>
              <span>{{employee.countryName}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>员工工号</span>
            </td>
            <td>
              <span>{{employee.userNum}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>用工类型</span>
            </td>
            <td>
              <span>{{employee.userTypeName}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>职位</span>
            </td>
            <td>
              <span>{{employee.positionName}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>岗位</span>
            </td>
            <td>
              <span>{{employee.postName}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>职级</span>
            </td>
            <td>
              <span>{{employee.rankName}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>考勤ID</span>
            </td>
            <td>
              <span>{{employee.checkWorkNo}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>考勤卡号</span>
            </td>
            <td>
              <span>{{employee.checkworkcode}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>员工状态</span>
            </td>
            <td>
              <span>{{employee.stateName}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>户口类型</span>
            </td>
            <td>
              <span>{{employee.hukouTypeName}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>入职日期</span>
            </td>
            <td>
              <span>{{employee.startTime | filter}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>合同到期日</span>
            </td>
            <td>
              <span>{{employee.expiryDate | filter}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>性别</span>
            </td>
            <td>
              <span>{{employee.genderName}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>发卡银行</span>
            </td>
            <td>
              <span>{{employee.bankNameName}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>银行卡号</span>
            </td>
            <td>
              <span>{{employee.bankCard}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>证件类型</span>
            </td>
            <td>
              <span>{{employee.idCardTypeName}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>证件编号</span>
            </td>
            <td>
              <span>{{employee.userIDCard}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>工龄</span>
            </td>
            <td>
              <span>{{employee.gongling}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>司龄</span>
            </td>
            <td>
              <span>{{employee.siling}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>宿舍地址</span>
            </td>
            <td>
              <span>{{dormitory.address}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>手机号</span>
            </td>
            <td>
              <span>{{employee.phone}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>邮箱</span>
            </td>
            <td>
              <span>{{employee.mail}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>健康证到期日</span>
            </td>
            <td>
              <span>{{employee.healthEndTime}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>出生日期</span>
            </td>
            <td>
              <span>{{employee.birthDay}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>考勤规则</span>
            </td>
            <td>
              <span>{{employee.checkworkName}}</span>
            </td>
          </tr>
        </table>
      </div>
    </ui-scrollview>
    <div class="controls">
      <div __code="org-roster-edit/编辑">
        <button type="button" class="ui-tool-button" @click="editRelativeInfo('edit')">修改关联信息</button>
      </div>
      <div>
        <v-dropdown placement="dropup">
          <button type="button" class="ui-tool-button" data-toggle="dropdown">
            更多操作
            <span class="caret"></span>
          </button>
          <ul slot="dropdown-menu" class="dropdown-menu">
            <li __code="org-regular-add/添加">
              <a href="javascript:;" @click="editRelativeInfo('office')">转正</a>
            </li>
            <li __code="org-transaction-add/添加">
              <a href="javascript:;" @click="editRelativeInfo('transaction')">异动</a>
            </li>
            <li __code="org-dimission-add/添加">
              <a href="javascript:;" @click="editRelativeInfo('dimission')">离职</a>
            </li>
          </ul>
        </v-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import store from '../store'

export default {
  data() {
      return {
        employee: {
          photourl: '',
          userName: '',
          idCardTypeName: '',
          userIDCard: '',
          gongling: 0,
          siling: 0,
          rankName: '',
          countryName: '',
          positionName: '',
          postName: '',
          userNum: '', //员工编码
          state: '', //状态
          stateName: '',
          checkworkcode: '', //考勤卡号
          checkWorkNo: '', //pin
          birthDay: '',
          healthEndTime: '', //健康证
          userTypeName: '', //用工类型
          hukouTypeName: '', //户口类型
          startTime: '', //入职日期
          genderName: '', //性别
          bankNameName: '', //发卡银行
          bankCard: '', //银行卡号
          phone: '', //手机号
          mail: '', //邮箱
          deptName: '',
          storeName: '',
          teamName: '',
          checkworkName: '',
          expiryDate:''
        },
        dormitory: {
          address: ''
        }
      };
    },
    filters: {
      filter(value) {
        if (value.split(" ").length > 1) {
          return value.split(" ")[0];
        } else {
          return value;
        }

      }
    },
    methods: {
      editRelativeInfo(type) {
        var self = this;
        if (type == "office") {
          if (self.employee.state !== '120001') {
            self.$root.showTip({
              type: 'danger',
              msg: "已选员工为已转正状态",
              duration: 2000
            });
            return;
          }
        }
        if (type == "dimission" || type == "transaction") {
          if (self.employee.state !== '120001' && self.employee.state !== '120002') {
            self.$root.showTip({
              type: 'danger',
              msg: "已选员工为已离职状态",
              duration: 2000
            });
            return;
          }
        }

        if (type == "blacklist") {
          if (self.employee.state !== '120003') {
            self.$root.showTip({
              type: 'danger',
              msg: "加入黑名单必须为离职状态",
              duration: 2000
            });
            return;
          }
        }

        if (self.userinfocallback) self.userinfocallback(self.userid, type);
      }
    },
    ready() {
      var self = this;
      if (self.userid) {
        store.actions.getOneEmployeeInfo(self.userid, function(data) {

          for (var i in self.dormitory) {
            if (data.dormitory && data.dormitory[i] && data.dormitory[i] != "NULL") {
              self.dormitory[i] = data.dormitory[i];
            }
          }
          for (var i in self.employee) {
            if (data.employee[i] && data.employee[i] != "NULL" && i != "organizeID" && i != "postID" && i != "rankID") {
              self.employee[i] = data.employee[i];
            }
          }

          var val = "";
          if (self.employee.deptName) {
            val = self.employee.deptName;
          }
          if (self.employee.storeName) {
            val += "/" + self.employee.storeName;
          }
          if (self.employee.teamName) {
            val += "/" + self.employee.teamName;
          }
          self.employee.deptName = val;

        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        })
      }
    },
    created() {

    },
    props: {
      userid: {
        type: Number,
        default: 0
      },
      userinfocallback: {
        type: Function,
        default: function() {}
      }
    }
};
</script>
<style lang="css" scoped>
.userInfo_warp {
  top: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
}

.userinfo > a {
  text-decoration: none;
}

.header {
  font-family: '微软雅黑';
  font-size: 14px;
}

.header span {
  vertical-align: super;
}

.quickinfo {
  padding: 40px;
  height: 150px;
  background: url('../../../assets/images/userinfo_bg.png');
  background-size: cover;
}

.quickinfo>.photo {
  display: inline-block;
  height: 70px;
  width: 70px;
  border-radius: 35px;
  margin-right: 20px;
  outline: none;
}

.quickinfo>.info {
  display: inline-block;
  height: 70px;
  line-height: 35px;
  vertical-align: top;
  width: 240px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.orgname,
.split,
.postname {
  color: #fff;
  font-size: 14px;
}

.mylabel {
  color: #787878;
  font-family: '微软雅黑';
  font-weight: normal;
  padding-top: 10px;
  padding: .2em .6em .3em;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: .25em;
}

.name {
  color: #fff;
  font-size: 25px;
}

.controls {
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  color: #fe6d5a;
  display: flex;
  background-color: #fff;
  border-top: 1px solid #e5e5e5;
}

.controls > div {
  flex: 1;
  float: left;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
