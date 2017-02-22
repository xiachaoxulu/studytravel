<template>
  <div v-show="display" class="condition">
    <div>
      <label>用工类型</label>
      <ul class="list">
        <li v-for="code in state.commonData.EmployeeType" :class="{'chosen': employeeType.indexOf(code.code)>=0}" @click="chooseEmployeeType(code.code)">{{code.codeName}}</li>
      </ul>
    </div>
    <div class="clear-both"></div>
    <div>
      <label>业务类型</label>
      <ul class="list">
        <li v-for="code in state.commonData.BizType" :class="{'chosen': bizType==code.code}" @click="chooseBizType(code.code)">{{code.codeName}}</li>
      </ul>
    </div>
    <div class="clear-both"></div>
    <div v-if="dictWorkflowStatus && dictWorkflowStatus.length>0">
      <label>审批状态</label>
      <ul class="list">
        <!-- <li v-for="code in state.commonData.WorkflowStatus" :class="{'chosen': approvalStatus.indexOf(code.code)>=0}" @click="chooseApprovalStatus(code.code)">{{code.codeName}}</li> -->
        <li v-for="code in dictWorkflowStatus" :class="{'chosen': approvalStatus.indexOf(code.code)>=0}" @click="chooseApprovalStatus(code.code)">{{code.codeName}}</li>
      </ul>
    </div>
    <div class="clear-both"></div>
    <div>
      <label>{{bizTimeName[bizType]}}</label>
      <ul>
        <li>
          <ui-datepicker :HHMM="true" :time.sync="startDate" width="150px"></ui-datepicker>
        </li>
        <li>——</li>
        <li>
          <ui-datepicker :HHMM="true" :time.sync="endDate" width="150px"></ui-datepicker>
        </li>
      </ul>
    </div>
    <div class="clear-both"></div>
    <div>
      <label>组织</label>
      <ul class="list">
        <li>
          <combo-tree :treedata="state.orgTree" :dropdownvalue.sync="selectedOrgs" :dropdownname.sync="dropdownOrgs" :checkable="true" :multiple="true" :rootvisible="false" idprop="organizeID" :nodeclicked="orgClicked">
            <div data-toggle="dropdown">
              <input type="text" class="form-control" placeholder="请选择组织" readonly v-model="selectedOrgName" :title="selectedOrgName" style="width: 350px">
            </div>
          </combo-tree>
        </li>
        <li>
          <button type="button" class="btn-basis btn-confirm" @click="fixedConditions">确定</button>
        </li>
        <li>
          <button type="button" class="btn-basis btn-cancel" @click="clearConditions">取消</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import store from '../store'
import vue from 'vue'
export default {
  data() {
      return {
        state: store.state,

        selectedOrgs: [],
        dropdownOrgs: [],
        selectedOrgName: null,

        startDate: vue.Tool.iDate(new Date(), 'yy-mm-dd').string + ' 00:00:00',
        endDate: null,

        bizTimeName: {
          "actovertime": "申请时间",
          "actleave": "申请时间",
          "employeeEntry": "生效时间",
          "leaveoffice": "生效时间",
          "official": "生效时间",
          "transferwork": "生效时间",
          "actbustrip": "出差时间"
        }
      };
    },
    ready() {
      store.actions.loadOrgTree();
      let arrCode = ['EmployeeType', 'BizType', 'WorkflowStatus'];
      let cnt = 0;
      arrCode.forEach((item) => {
        store.actions.getSystemCode(item, store.config[item], (data) => {
          if (Array.isArray(data) && data.length > 0) {
            if (item == 'BizType') {
              this.bizType = data[0].code;
            } else if (item == 'WorkflowStatus') {
              data = data.filter((elem) => {
                return elem.code != "150006"; // 移除保存未提交选项
              });
              store.mutations.SetCommonData(item, data);
            }
          }
          if (++cnt == arrCode.length) this.fixedConditions();
        });
      });
    },
    methods: {
      chooseEmployeeType(code) {
        if (this.employeeType.indexOf(code) == -1) {
          this.employeeType.$set(this.employeeType.length, code);
        } else {
          this.employeeType.$remove(code);
        }
      },
      chooseBizType(code) {
        this.bizType = code;
      },
      chooseApprovalStatus(code) {
        if (this.approvalStatus.indexOf(code) == -1) {
          this.approvalStatus.$set(this.approvalStatus.length, code);
        } else {
          this.approvalStatus.$remove(code);
        }
      },
      orgClicked(data) {
        var orgNames = data.map((item) => {
          return item.text
        }).join(',');
        this.selectedOrgName = orgNames;
      },
      fixedConditions() {
        if (!this.startDate) {
          this.$root.showTip({
            type: 'warning',
            msg: '请选择申请开始时间！'
          });
          return;
        }
        if (this.startDate >= this.endDate) {
          this.$root.showTip({
            type: 'warning',
            msg: '结束日期需要大于开始日期！'
          });
          return;
        }
        if (this.refreshConditions) {
          // 查询参数
          // state, userType, organizeID, sDate, eDate
          // 审批状态, 用工类型, 组织, 开始时间, 结束时间
          var conditions = {
            state: JSON.stringify(this.approvalStatus),
            userType: JSON.stringify(this.employeeType),
            bizType: this.bizType,
            organizeID: JSON.stringify(this.selectedOrgs.map(item => {
              return item.organizeID;
            })),
            sDate: this.startDate,
            eDate: this.endDate
          };
          this.refreshConditions(conditions);
        }
      },
      clearConditions() {
        this.selectedOrgs = [];
        this.dropdownOrgs = [];
        this.selectedOrgName = null;
        this.startDate = null;
        this.endDate = null;

        this.employeeType = [];
        this.approvalStatus = [];
      },
      getConditions() {
        // 查询参数
        // state, userType, organizeID, sDate, eDate
        // 审批状态, 用工类型, 组织, 开始时间, 结束时间
        var conditions = {
          state: JSON.stringify(this.approvalStatus),
          userType: JSON.stringify(this.employeeType),
          bizType: this.bizType,
          organizeID: JSON.stringify(this.selectedOrgs.map(item => {
            return item.organizeID;
          })),
          sDate: this.startDate,
          eDate: this.endDate
        };
        return conditions;
      }
    },
    events: {
      refreshApproval() {
        this.fixedConditions();
      }
    },
    props: {
      display: {
        type: Boolean,
        default: true
      },
      dictWorkflowStatus: {
        type: Array,
        default: () => {
          return [];
        }
      },
      employeeType: {
        type: Array,
        twoWay: true,
        default: () => {
          return [];
        }
      },
      bizType: {
        type: String,
        twoWay: true,
        default: null
      },
      approvalStatus: {
        type: Array,
        twoWay: true,
        default: () => {
          return [];
        }
      },
      refreshConditions: {
        type: Function,
        default: function() {}
      }
    }
};
</script>
<style lang="css" scoped>
.condition {
  padding: 5px 5px 5px 18px;
}

li {
  float: left;
  height: 40px;
  line-height: 40px;
  padding-left: 24px;
}

.list li:hover {
  cursor: pointer;
  color: #fd6d5a;
}

.chosen {
  color: #fd6d5a;
}

label {
  float: left;
  height: 40px;
  line-height: 40px;
  width: 60px;
}

.btn-basis {
  width: 80px;
  height: 38px;
  line-height: 38px;
  font-size: 15px;
  border: none;
  border-radius: 5px;
  color: #fff;
}

.btn-confirm {
  background-color: #25cf88;
}

.btn-cancel {
  background-color: #c8c9ce;
}
</style>
