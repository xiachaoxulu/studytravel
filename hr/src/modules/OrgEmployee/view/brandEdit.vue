<template>
  <ui-modal :show.sync="display" hide-footer :header.sync="header" type="medium">
    <div class="panel panel-default">
      <div class="panel-body" style="padding-top: 30px">
        <ui-validator>
          <form class="form-horizontal container-fluid" role="form" vali-submit="submitBtn|submitedCall">
            <div class="row">
              <div class="col-sm-24">
                <div class="form-group row">
                  <label class="col-sm-6 control-label">品牌名称</label>
                  <div class="col-sm-18">
                    <input type="text" v-model="brand.brandName" vali="required" vali-msg="必填项" class="form-control" placeholder="请输入品牌名称" />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-24">
                <div class="form-group row">
                  <label class="col-sm-6 control-label">负责人</label>
                  <div class="col-sm-18">
                    <input type="text" v-model="brand.employeeName" readonly="readonly" @click="chooseLeading" class="form-control" placeholder="点击选择负责人" class="combo-input">
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
        <app-select-employee :display.sync="displayEmployeeSelect" v-if="displayEmployeeSelect" :callback="employeeSelected"></app-select-employee>
      </div>
    </div>
  </ui-modal>
</template>
<script>
import store from '../store.js'
export default {
  data() {
      return {
        displayEmployeeSelect: false,
        state: store.state
      };
    },
    props: {
      brand: {
        twoWay: true,
        default: () => {
          return {};
        }
      },
      display: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      header() {
        return this.brand.ID == null ? '添加品牌' : '修改品牌';
      }
    },
    methods: {
      employeeSelected(emp) {
        if (emp && emp.length > 0) {
          this.brand.employeeName = emp[0].userName;
          this.brand.employeeID = emp[0].ID;
        } else {
          this.brand.employeeName = null;
          this.brand.employeeID = null;
        }
      },
      chooseLeading() {
        this.displayEmployeeSelect = true;
      },
      close() {
        this.brand = {};
        this.display = false;
      }
    },
    events: {
      submitedCall() {
        let me = this;
        if (me.brand.ID) {
          store.actions.editBrand(this.brand, () => {
            store.actions.loadBrandList();
            // store.actions.loadBrandAreaStoreTree();
            me.brand = {};
            me.display = false;
          }, (error) => {
            me.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          });
        } else {
          store.actions.addBrand(this.brand, () => {
            store.actions.loadBrandList();
            // store.actions.loadBrandAreaStoreTree();
            me.brand = {};
            me.display = false;
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
.combo-input {
  background-color: #FFF;
}
</style>
