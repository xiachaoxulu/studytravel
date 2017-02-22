<template>
  <ui-modal :show.sync="display" header="宿舍查询" type="large" hide-footer>
    <div class="wrap">
      <div class="tool">
        <div class="input-group search">
          <input v-model="searchFor.dormitoryCode" class="form-control" placeholder="请输入关键字查询">
          <span class="input-group-btn">
                    <button @click="refreshTable" class="btn btn-primary" code="setting-roster-search/花名册查询/disabled">搜索</button>
          </span>
        </div>
      </div>
      <ui-grid v-ref:table :url="url" :append-params="searchFor" :nopaging="true" class="testtable" :fields="fields" :perpage="30" :selectable="checktype" :pages="[10,20,30,50]" :btrefresh="true" checked="multi" :selected.sync="selected" height="auto"></ui-grid>
      <div class="form-actions">
        <div class="row">
          <div class="text-center">
            <ui-button color="accent" @click="confirm">确定</ui-button>
            <ui-button color="default" @click="close">关闭</ui-button>
          </div>
        </div>
      </div>
    </div>
  </ui-modal>
</template>
<script>
import store from '../store'

export default {
  data() {
      return {

        url: "api.OrgEmployee.getDormitory",
        selected: [],
        searchFor: {
          dormitoryCode: ''
        },
        fields: [{
          name: 'dormitoryCode',
          title: '宿舍编码',
          locked: 'first'
        }, {
          name: 'address',
          title: '地址'
        }, {
          name: 'bedCount',
          title: '床位数'
        }, {
          name: 'inNum',
          title: '入住人数'
        }, {
          name: 'surplusNum',
          title: '剩余床位'
        }]
      };
    },
    methods: {
      refreshTable() {
        this.$refs.table.refresh();
      },
      //选择确定
      confirm() {
        let arr = this.$refs.table.getSelections();
        if (arr.surplusNum <= 0) {
          this.$root.showTip({
              type: 'danger',
              msg: '所分配宿舍已满员',
              duration: 2000
            });
          return;
        } else {
          this.display = false;
          this.callback(arr);
        }
      },
      //关闭窗体
      close() {
        this.display = false;
      }
    },
    props: {
      display: {
        type: Boolean,
        twoWay: true,
        default: false
      },
      checktype: {
        type: String,
        default: 'single' //single multi
      },
      //查询值回调
      callback: {
        type: Function,
        default: function() {}
      }
    }
};
</script>
<style lang="css" scoped>
.wrap {
  position: relative;
  height: 500px;
  overflow: hidden;
}

.tool {
  /*overflow: hidden;*/
}

.search {
  width: 400px;
}

.testtable {
  position: absolute;
  top: 50px;
  bottom: 50px;
}

.form-actions {
  width: 100%;
  position: absolute;
  text-align: center;
  bottom: 0px;
}
</style>
