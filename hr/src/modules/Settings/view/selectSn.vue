<template>
  <ui-modal :show.sync="display" v-if="display" header="选择考勤机" type="large" hide-footer>
    <div class="wrap">
      <div class="wrap-content">
        <div class="contentlist">
          <ui-grid v-ref:table :url="url" class="testtable" :append-params="searchFor" :fields="fields" :perpage="30" :selectable="checkType" :pages="[10,20,30,50]" :btrefresh="true" checked="checkType" :selected.sync="selected" height="auto"></ui-grid>
        </div>
      </div>
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
import Vue from 'vue'

export default {
  data() {
      return {
        selected:[],
        searchFor: {
          code: '143001'
        }, //查询关键字
        fields: [{
          name: 'sn',
          width: 150,
          title: '序列号',
          locked: 'first'
        }, {
          name: 'displayName',
          title: '设备别名',
          width: 100
        }, {
          name: 'address',
          title: '所在位置',
          width: 100
        }, {
          name: 'type',
          title: '类型',
          width: 100
        }, {
          name: 'vendor',
          title: '厂商',
          width: 100
        }]
      };
    },
    methods: {
      //选择确定
      confirm() {
        let arr = this.$refs.table.getSelections();
        this.display = false;
        this.sncallback(arr);
      },
      //关闭窗体
      close() {
        this.display = false;
      }
    },
    ready() {
    },
    props: {
      display: {
        type: Boolean,
        twoWay: true,
        default: false
      },
      url: {
        type: String,
        default: 'api.Settings.selecticlockpage'
      },
      checkType: {
        type: String,
        default: 'single' //multi
      },
      //查询值回调
      sncallback: {
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
  margin: -30px -24px -24px;
}

.wrap-content {
  position: absolute;
  bottom: 60px;
  top: 0px;
  left: 0px;
  right: 0px;
  border-bottom: 1px solid #ccc;
}

.choosecondition {
  position: absolute;
  left: 0px;
  width: 30%;
  height: 100%;
  box-sizing: border-box;
  border-right: 1px solid #ccc;
  overflow: hidden;
}

.contentlist {
  position: absolute;
  width: 100%;
  top: 0px;
  right: 0px;
  height: 100%;
}

.testtable {
  padding: 10px;
}

.scrollview {
  overflow: hidden;
}

.search {
  padding: 5px 15px 5px;
}

.module {
  padding: 5px 15px 5px;
}

.form-actions {
  width: 100%;
  position: absolute;
  text-align: center;
  bottom: 10px;
}
</style>
