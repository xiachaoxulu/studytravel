<!--
* @Created Date       : 2016-09-24T14:43:43+08:00
* @Last Modified time : 2016-12-27T11:35:12+08:00
 -->


<template>
  <ui-modal :show.sync="display" header="扩展字段" hide-footer>
    <ui-validator name="validation1">
      <form class="form-horizontal  warp" role="form" vali-submit="submitBt|submitInfo">
        <ui-table v-ref:table height="400px" style="margin-bottom:10px;">
          <template slot="headerNormal">
            <table class="table table-bordered">
              <colgroup>
                <col width="100px"></col>
                <col width="100px"></col>
                <col width="200px"></col>
              </colgroup>
              <thead>
                <tr>
                  <th>字段名称</th>
                  <th>是否为空</th>
                  <th>字段值</th>
                </tr>
              </thead>
            </table>
          </template>
          <template slot="bodyNormal">
            <table class="table table-bordered">
              <colgroup>
                <col width="100px"></col>
                <col width="100px"></col>
                <col width="200px"></col>
              </colgroup>
              <tbody>
                <template v-for="extendinfo in copyextendList">
                  <tr v-if="$root.getTableField().employeeTable[extendinfo.dbName].auth != 0">
                    <td>{{extendinfo.showName}}</td>
                    <td>{{extendinfo.dbNullable==1?'是':'否'}}</td>
                    <td>
                      <input type="text" v-model="extendinfo.des" class="form-control" placeholder="请填写字段值" :disabled="$root.getTableField().employeeTable[extendinfo.dbName].auth==1" >
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </template>
        </ui-table>
        <div class="form-actions">
          <div class="row">
            <div class="text-center">
              <ui-button id="submitBt" color="accent">保存</ui-button>
              <ui-button color="default" @click="close">取消</ui-button>
            </div>
          </div>
        </div>
      </form>
    </ui-validator>
  </ui-modal>
</template>
<script>
import Store from '../store'

export default {
  data() {
      return {
        copyextendList: []
      }
    },
    events: {
      submitInfo() {
        var self = this;
        var len = this.copyextendList.length;
        for (var i = 0; i <= len - 1; i++) {
          if (this.copyextendList[i].dbNullable == 0 && this.copyextendList[i].des == "") {
            this.$root.showTip({
              type: 'danger',
              msg: this.copyextendList[i].showName + ",值不能为空！",
              duration: 2000
            });
            return;
          }
        };

        self.componentCallBack(this.copyextendList);
        self.display = false;
      }
    },
    methods: {
      close() {
        this.display = false;
      }
    },
    ready() {
      this.copyextendList = JSON.parse(JSON.stringify(this.extendList));
      console.log(this.extendList)
      this.$nextTick(()=>{
        this.$refs.table.refresh();
      });
      console.log(this.$root.getTableField().employeeTable)
    },
    props: {
      display: {
        type: Boolean,
        default: false,
        twoWay: true,
      },
      id: {
        type: String,
        default: ""
      },
      extendList: {
        type: Array,
        default: []
      },
      componentCallBack: {
        type: Function,
        default: function() {}
      }
    }
};
</script>
<style lang="css" scoped>
.must {
  color: red;
}

.choose-input {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  font-family: 'Microsoft YaHei', serif;
  width: 100%;
}

.disabled {
  pointer-events: none;
}
</style>
