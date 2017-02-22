<template>
  <ui-modal :show.sync="display" :header="header" type="large" hide-footer>
    <ui-validator>
      <form class="form-horizontal container-fluid" role="form" vali-submit="submitBtn|submitedCall">
        <div class="row divider">
          <div>基本信息</div>
          <div></div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group row">
              <label class="col-sm-6 control-label">门店名称</label>
              <div class="col-sm-18">
                <input type="text" v-model="store.storeName" class="form-control" placeholder="请输入门店名称" vali="required" vali-msg="必填项" autocomplete="off">
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group row">
              <label class="col-sm-6 control-label">编码</label>
              <div class="col-sm-18">
                <input type="text" v-model="store.storeCode" class="form-control" placeholder="请输入编码" vali="required" vali-msg="必填项" autocomplete="off">
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group row">
              <label class="col-sm-6 control-label">面积</label>
              <div class="col-sm-18">
                <input type="text" v-model="store.acreage" class="form-control" placeholder="请输入面积" vali="required|minNum:1" vali-msg="必填项|面积应为数字" autocomplete="off">
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group row">
              <label class="col-sm-6 control-label">负责人</label>
              <div class="col-sm-18">
                <input type="text" v-model="store.leadingName" readonly="readonly" @click="showEmployeeSelect" class="form-control" placeholder="点击选择负责人">
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group   row">
              <label class="col-sm-6 control-label">营业时间</label>
              <div class="col-sm-8">
                <ui-timepicker :time.sync="store.businessStartTime"></ui-timepicker>
              </div>
              <div class="col-sm-2">
                <label class="control-label">到</label>
              </div>
              <div class="col-sm-8">
                <ui-timepicker :time.sync="store.businessEndTime"></ui-timepicker>
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group  row">
              <label class="col-sm-6 control-label">经营类型</label>
              <div class="col-sm-18">
                <select vali="required" vali-msg='必填项' v-model="store.manageType" class="form-control">
                  <option value="">请选择经营类型</option>
                  <template v-for="item in manageType">
                    <option value="{{item.code}}" :selected="item.code==store.manageType">{{item.codeName}}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group   row">
              <label class="col-sm-6 control-label">餐厅类型</label>
              <div class="col-sm-18">
                <select vali="required" vali-msg='必填项' v-model="store.storeType" class="form-control">
                  <option value="">请选择餐厅类型</option>
                  <template v-for="item in restaurantType">
                    <option value="{{item.code}}" :selected="item.code==store.storeType">{{item.codeName}}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group  row">
              <label class="col-sm-6 control-label">商圈类型</label>
              <div class="col-sm-18">
                <select vali="required" vali-msg='必填项' v-model="store.cbdID" class="form-control">
                  <option value="">请选择商圈类型</option>
                  <template v-for="item in bdType">
                    <option value="{{item.code}}" :selected="item.code==store.cbdID">{{item.codeName}}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-24">
            <div class="form-group row">
              <label class="col-sm-3 control-label">所属城市</label>
              <div class="col-sm-18">
                <app-district-select :province.sync="store.province" :city.sync="store.city" :use-value="true" :required="true"></app-district-select>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-24">
            <div class="form-group row">
              <label class="col-sm-3 control-label">地址：</label>
              <div class="col-sm-18">
                <input type="text" v-model="store.address" class="form-control">
              </div>
            </div>
          </div>
        </div>
        <div class="row divider">
          <div>组织信息</div>
          <div></div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group row">
              <label class="col-sm-6 control-label">所属品牌</label>
              <div class="col-sm-18">
                <select vali="required" vali-msg='必填项' v-model="store.brandID" class="form-control">
                  <option value="">请选择品牌</option>
                  <template v-for="item in state.brandList">
                    <option value="{{item.ID}}" :selected="item.ID==store.brandID">{{item.brandName}}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group row">
              <label class="col-sm-6 control-label">所属区域</label>
              <div class="col-sm-18">
                <combo-tree :treeData="state.areaTree" idprop="ID" :nodeclicked="areaClicked" textprop="areaName" :multiple="false" :rootvisible="false">
                  <div data-toggle="dropdown">
                    <input type="text" readonly="readonly" v-model="store.areaName" vali="required" vali-msg="必填项" class="form-control" placeholder="点击选择区域">
                  </div>
                </combo-tree>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-24">
            <div class="form-group  row">
              <label class="col-sm-3 control-label">所属部门</label>
              <div class="col-sm-21">
                <combo-tree :treeData="state.deptTree" idprop="ID" :nodeclicked="deptClicked" textprop="departmentName" :multiple="false" :rootvisible="false">
                  <div data-toggle="dropdown">
                    <input type="text" v-model="store.deptName" readonly="readonly" vali="required" vali-msg="必填项" class="form-control" placeholder="点击选择部门">
                  </div>
                </combo-tree>
              </div>
            </div>
          </div>
        </div>
        <!--<div class="row divider">
          <div>门店小组</div>
          <div></div>
        </div>
        <div class="row">
          <div class="col-sm-24">
            <div class="form-group  row" style="padding-left:20px">
              <input type="checkbox" />炒菜组
              <input type="checkbox" />迎宾组
              <input type="checkbox" />备菜组
              <button class="btn btn-default">+ 新建小组</button>
            </div>
          </div>
        </div>-->
        <div class="row divider">
          <div>员工宿舍</div>
          <div></div>
        </div>
        <div class="row">
          <div class="col-sm-24">
            <div class="col-sm-5">
              <button type="button" class="btn btn-default" @click="showDormitorySelect">+ 添加员工宿舍</button>
            </div>
            <div class="col-sm-19">
              <template v-for="item in store.dormitoryStore">
                <button class="btn btn-sm btn-success">地址：{{item.addr}},床位数：{{item.bedCount}}</button>
              </template>
            </div>
          </div>
        </div>
        <div class="form-actions">
          <div class="row">
            <div class="text-center">
              <ui-button color="accent" id="submitBtn">提交</ui-button>
              <ui-button color="default" @click="close">取消</ui-button>
            </div>
          </div>
        </div>
      </form>
    </ui-validator>
    <components :is="selectEmployee" :display.sync="displayEmployeeSelect" :callback="employeeSelected"></components>
    <components :is="selectDormitory" :display.sync="displayDormitorySelect" :callback="dormitorySelected" checktype="multi"></components>
  </ui-modal>
</template>
<script>
import store from '../store.js'
import selectDormitory from './selectDormitory'
export default {
  data() {
      return {
        state: store.state,
        displayEmployeeSelect: false,
        displayDormitorySelect: false,
        selectEmployee: null,
        selectDormitory: null,
        manageType: [], // 经营类型
        restaurantType: [], // 餐厅类型
        bdType: [], // 商圈类型
      }
    },
    computed: {
      header() {
        return this.store.ID == null ? '添加门店' : '修改门店';
      }
    },
    methods: {
      employeeSelected(emp) {
        if (emp && emp.length > 0) {
          this.store.leadingName = emp[0].userName + "(" + emp[0].deptName + ")";
          this.store.leadingID = emp[0].ID;
        } else {
          this.store.leadingName = null;
          this.store.leadingID = null;
        }
      },
      showEmployeeSelect() {
        this.selectEmployee = 'appSelectEmployee';
        this.displayEmployeeSelect = true;
      },
      showDormitorySelect() {
        this.selectDormitory = "selectDormitory";
        this.displayDormitorySelect = true;
      },
      dormitorySelected(dors) {
        if (dors && dors.length > 0) {
          this.$set('store.dormitoryStore', []);
          dors.forEach((item) => {
            this.store.dormitoryStore.$set(this.store.dormitoryStore.length, {
              addr: item.address,
              bedCount: item.bedCount,
              dormitoryID: item.ID
            });
          });
        }
      },
      areaClicked(data) {
        this.store.areaName = data.areaName;
        this.store.areaID = data.ID;
      },
      deptClicked(data) {
        this.store.deptName = data.departmentName;
        this.store.deptID = data.ID;
      },
      close() {
        this.display = false;
        this.store = {};
      }
    },
    props: {
      display: {
        type: Boolean,
        default: false
      },
      store: {
        default: () => {
          return {};
        }
      }
    },
    events: {
      submitedCall() {
        let me = this;
        me.store.dormitoryStoreJSON = JSON.stringify(me.store.dormitoryStore);
        if (me.store.ID) {
          store.actions.editStore(this.store, () => {
            store.actions.loadCompanyDeptStore();
            // store.actions.loadBrandAreaStoreTree(); // 刷新品牌区域门店树数据
            store.actions.loadDeptTree(); // 刷新组织树数据
            store.actions.loadOrgListTree();
            this.store = {}; // 清空门店编辑数据
            this.display = false; // 隐藏编辑对话框
          }, (error) => {
            me.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          });
        } else {
          store.actions.addStore(this.store, () => {
            store.actions.loadCompanyDeptStore();
            // store.actions.loadBrandAreaStoreTree(); // 刷新品牌区域门店树数据
            store.actions.loadDeptTree(); // 刷新组织树数据
            store.actions.loadOrgListTree();
            store.actions.getStoreEmployeeCount();
            this.store = {}; // 清空门店编辑数据
            this.display = false; // 隐藏编辑对话框
          }, (error) => {
            me.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          });
        }
      }
    },
    ready() {
      var me = this;
      // 经营类型
      store.actions.findSystemConfig("106000", function(data) {
        me.manageType = data;
      }, function(error) {
        me.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
      // 餐厅类型
      store.actions.findSystemConfig("107000", function(data) {
        me.restaurantType = data;
      }, function(error) {
        me.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
      // 商圈类型
      store.actions.findSystemConfig("108000", function(data) {
        me.bdType = data;
      }, function(error) {
        me.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
      store.actions.loadBrandList();
      store.actions.loadAreaTree();
      store.actions.loadCompanyDeptStore();
      store.actions.loadDeptTree();
    },
    components: {
      selectDormitory
    }
};
</script>
<style lang="css" scoped>
.divider {
  height: 40px;
  line-height: 40px;
}

.divider div:nth-child(1) {
  text-align: center;
  position: absolute;
  left: 50%;
  width: 60px;
  margin-left: -25px;
  font-size: 12px;
  color: #737373;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}

.divider div:nth-child(2) {
  width: 100%;
  height: 21px;
  border-bottom: 1px dashed #737373;
}
</style>
