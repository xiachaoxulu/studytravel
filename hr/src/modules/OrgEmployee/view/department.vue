<template>
  <div class="panel panel-default storedisplay">
    <div class="panel-heading">
      <h3 class="panel-title"><strong>{{dept.departmentName}}</strong>
      </h3>
    </div>
    <div class="panel-body">
      <table class="table">
        <tr>
          <td style="width: 40px;">
            <span class="label">负责人:</span>
          </td>
          <td>
            <span>{{dept.leadingName}}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span class="label">上级部门:</span>
          </td>
          <td>
            <span>{{dept.parentName}}</span>
          </td>
        </tr>
      </table>
      <div class="chart" v-el:hrleave></div>
      <div class="controls">
        <div>
          <button type="button" class="ui-tool-button" @click="editRelativeInfo" __code="org-orgTree-dept-edit/修改关联信息">修改关联信息</button>
        </div>
        <div>
          <v-dropdown placement="dropup">
            <button type="button" class="ui-tool-button" data-toggle="dropdown">
              更多操作
              <span class="caret"></span>
            </button>
            <ul slot="dropdown-menu" class="dropdown-menu">
              <li __code="org-orgTree-dept-addChildren/添加下级部门">
                <a href="javascript:void(0);" @click="addChildDept">添加下级部门</a>
              </li>
              <li __code="org-orgTree-dept-del/删除">
                <a href="javascript:void(0);" @click="removeDept">删除</a>
              </li>
            </ul>
          </v-dropdown>
        </div>
      </div>
    </div>
  </div>
  <ui-confirm confirm-button-text="是" deny-button-text="否" header="提示" type="danger" @confirmed="confirmed" :show.sync="showConfirm" close-on-confirm>
    确定要删除该部门吗？
  </ui-confirm>
</template>
<script>
// var echarts = require('echarts/lib/echarts');
// // 引入图
// require('echarts/lib/chart/line');
// // 引入提示框和标题组件
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');
// require('echarts/lib/component/legend');

import store from '../store'

export default {
  data() {
      return {
        store: store.state,
        dept: {},
        showConfirm: false
      };
    },
    ready() {
      this.$nextTick(function() {
        return;
        var myChart2 = echarts.init(this.$el.hrleave);
        myChart2.setOption({
          title: {
            text: '离职率',
            textStyle: {
              color: '#fff',
              fontStyle: 'normal',
              fontWeight: 'normal',
              fontSize: 14,
            },
            left: '10px',
            top: '10px'
          },
          legend: {
            data: ['本店', '北京地区均线'],
            textStyle: {
              color: '#fff'
            },
            y: 'bottom'
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              textStyle: {
                color: '#fff'
              },
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              },
            },
            axisTick: {
              lineStyle: {
                color: '#fff'
              },
              inside: true,
              length: 3
            },
            splitLine: {
              show: false
            },
            data: ['12月', '1月', '2月', '3月', '4月']
          },
          backgroundColor: '#27C9B4',
          yAxis: {
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
          },
          series: [{
            name: '本店',
            type: 'line',
            data: [5, 20, 36, 10, 10]
          }, {
            name: '北京地区均线',
            type: 'line',
            data: [15, 2, 30, 40, 10]
          }]
        });
      })
    },
    props: {
      addchilddeptclicked: {
        type: Function
      },
      editdeptrelativeclicked: {
        type: Function
      },
      ID: {}
    },
    methods: {
      editRelativeInfo() {
        if (this.editdeptrelativeclicked) this.editdeptrelativeclicked(this.dept.ID);
        this.$data.showSidebar = false;
      },
      addChildDept() {
        if (this.addchilddeptclicked) this.addchilddeptclicked(this.dept.ID);
        this.$data.showSidebar = false;
      },
      removeDept() {
        this.showConfirm = true;
      },
      confirmed() {
        var me = this;
        store.actions.removeDept(me.dept.ID, () => {
          store.actions.loadCompanyDeptStore();
          store.actions.loadDeptTree(); // 刷新组织树数据
          store.actions.loadDeptStoreTree();
          store.actions.loadOrgListTree();
          me.showSidebar = false;
        }, (error) => {
          me.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      }
    },
    created() {
      var me = this;
      if (me.ID) {
        store.actions.loadDept(me.ID, (data) => {
          me.dept = data;
        }, (error) => {
          me.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      }
    }
};
</script>
<style lang="css" scoped>
.storedisplay > a {
  text-decoration: none;
}

.more {
  display: inline-block;
  margin-bottom: 20px;
  cursor: pointer;
}

.detail {
  display: none;
}

.label {
  color: #787878;
}

.chart {
  margin: 0px -16px 0px -16px;
  /*width: 420px;*/
  height: 300px;
}

.controls {
  position: absolute;
  bottom: 0;
  left: 10px;
  right: 10px;
  color: #fe6d5a;
  display: flex;
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
