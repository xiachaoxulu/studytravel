<template>
  <ui-modal :show.sync="visibility" hide-footer :header.sync="header" type="medium">
    <div class="panel panel-default">
      <div class="panel-body" style="padding-top: 30px">
        <ui-validator>
          <form class="form-horizontal container-fluid" role="form" vali-submit="submitBtn|submitedCall">
            <div class="row">
              <div class="col-sm-24">
                <div class="form-group row">
                  <label class="col-sm-6 control-label">区域名称</label>
                  <div class="col-sm-18">
                    <input type="text" v-model="area.areaName" vali="required" vali-msg="必填项" class="form-control" placeholder="请输入区域名称" />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-24">
                <div class="form-group row">
                  <label class="col-sm-6 control-label">负责人</label>
                  <div class="col-sm-18">
                    <input type="text" v-model="area.userName" readonly="readonly" @click="chooseLeading" class="form-control" placeholder="点击选择负责人">
                  </div>
                </div>
              </div>
            </div>
            <div class="form-actions">
              <div class="row">
                <div class="text-center">
                  <ui-button id="submitBtn" color="accent">保存</ui-button>
                  <ui-button color="default" @click="close">取消</ui-button>
                </div>
              </div>
            </div>
          </form>
        </ui-validator>
      </div>
    </div>
    <components is="appSelectEmployee" :display.sync="displayEmployeeSelect" v-if="displayEmployeeSelect" :callback="employeeSelected"></components>
  </ui-modal>
</template>
<script>
import store from '../store.js'
export default {
  data() {
      return {
        state: store.state,
        displayEmployeeSelect: false,
      };
    },
    props: {
      area: {
        twoWay: true,
        default: () => {
          return {};
        }
      },
      visibility: {
        twoWay: true,
        type: Boolean,
        default: false
      }
    },
    computed: {
      header() {
        return this.area.ID == null ? '添加区域' : '修改区域';
      }
    },
    methods: {
      chooseLeading() {
        this.displayEmployeeSelect = true;
      },
      employeeSelected(emp) {
        if (emp && emp.length > 0) {
          this.area.userName = emp[0].userName + "(" + emp[0].deptName + ")";
          this.area.userID = emp[0].ID;
        } else {
          this.area.userName = null;
          this.area.userID = null;
        }
      },
      close() {
        this.visibility = false;
        this.area = {};
      }
    },
    events: {
      submitedCall() {
        let me = this;
        delete me.area.userName;
        if (me.area.ID) {
          store.actions.editArea(this.area, () => {
            me.area = {};
            store.actions.loadAreaTree();
            // store.actions.loadBrandAreaStoreTree();
            me.visibility = false;
          }, (error) => {
            me.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          });
        } else {
          store.actions.addArea(this.area, () => {
            me.area = {};
            store.actions.loadAreaTree();
            // store.actions.loadBrandAreaStoreTree();
            me.visibility = false;
          }, (error) => {
            me.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          });
        }
      }
    }
};
</script>
<style lang="css" scoped>
</style>
