<template>
  <div class="panel panel-default storedisplay">
    <div class="panel-heading">
      <h3 class="panel-title"> <strong>{{post.postName}}</strong>
      </h3>
    </div>
    <div class="panel-body">
      <table class="table">
        <tr>
          <td style="width: 40px;">
            <span class="label">最低职级</span>
          </td>
          <td>
            <span>{{post.minlevelName}}</span>
          </td>
        </tr>
        <tr>
          <td> <span class="label">最高职级</span></td>
          <td>
            <span>{{post.maxlevelName}}</span>
          </td>
        </tr>
        <tr>
          <td> <span class="label">上级岗位</span></td>
          <td>
            <span>{{post.uppostName}}</span>
          </td>
        </tr>
        <tr>
          <td> <span class="label">岗位分类</span></td>
          <td>
            <span>{{post.postTypeName}}</span>
          </td>
        </tr>
        <tr>
          <td> <span class="label">定编</span></td>
          <td>
            <span>{{post.authorized}}</span>
          </td>
        </tr>
        <tr>
          <td> <span class="label">在岗</span></td>
          <td>
            <span>{{post.atPost}}</span>
          </td>
        </tr>
        <tr>
          <td> <span class="label">缺编</span></td>
          <td>
            <span>{{post.lossPost}}</span>
          </td>
        </tr>
      </table>
      <p>
        <a v-if="post.postContent" href="{{post.postContent}}">岗位说明书 ></a>
      </p>
      <p>
        <a v-if="post.postDuty" href="{{post.postDuty}}">岗位职责 ></a>
      </p>
      <p>
        <a v-if="post.postDemand" href="{{post.postDemand}}">任职要求 ></a>
      </p>
      <p>组织 > {{post.organizeName}}</p>
      <div class="chart" id="hr"></div>
      <div class="controls">
        <div>
          <button type="button" class="ui-tool-button" @click="editPost" __code="org-postTree-post-edit/编辑">编辑</button>
        </div>
      </div>
    </div>
  </div>
  <post-dialog :post.sync="post" v-if="showEditPost" :visibility.sync="showEditPost"></post-dialog>
</template>
<script>
// // 引入 ECharts 主模块
// var echarts = require('echarts/lib/echarts');
// // 引入图
// require('echarts/lib/chart/line');
// // 引入提示框和标题组件
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');
// require('echarts/lib/component/legend');

import store from '../store'
import postDialog from './postDialog'

export default {
  data() {
      return {
        post: {},
        showEditPost: false
      };
    },
    props: {
      ID: {}
    },
    created() {
      if (!this.ID) return;
      store.actions.loadPost(this.ID, (data) => {
        this.post = data;
      }, (error) => {
        this.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
    },
    watch: {
      'ID': function(newVal, oldVal) {
        if (newVal === oldVal) return;
        store.actions.loadPost(this.ID, (data) => {
          this.post = data;
          console.log('this.post ', JSON.stringify(this.post));
        }, (error) => {
          this.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      }
    },
    ready() {
      // this.$nextTick(function() {
      //   return;
      //   var myChart = echarts.init(this.$el.querySelector('#hr'));
      //   // 绘制图表
      //   myChart.setOption({
      //     title: {
      //       text: '薪水概览',
      //       textStyle: {
      //         color: '#fff',
      //         fontStyle: 'normal',
      //         fontWeight: 'normal',
      //         fontSize: 14,
      //       },
      //       left: '10px',
      //       top: '10px'
      //     },
      //     legend: {
      //       show: true,
      //       data: ['王经理', '宋经理', '李经理', '苏经理', '均线'],
      //       textStyle: {
      //         color: '#fff'
      //       },
      //       y: 'bottom'
      //     },
      //     tooltip: {
      //       trigger: 'axis'
      //     },
      //     xAxis: {
      //       type: 'category',
      //       boundaryGap: false,
      //       axisLabel: {
      //         textStyle: {
      //           color: '#fff'
      //         },
      //       },
      //       axisTick: {
      //         lineStyle: {
      //           color: '#fff'
      //         },
      //         inside: true,
      //         length: 3
      //       },
      //       axisLine: {
      //         lineStyle: {
      //           color: '#fff'
      //         },
      //       },
      //       splitLine: {
      //         show: false
      //       },
      //       data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
      //     },
      //     backgroundColor: '#27C9B4',
      //     yAxis: {
      //       axisLine: {
      //         show: false
      //       },
      //       axisLabel: {
      //         show: false
      //       },
      //       axisTick: {
      //         show: false
      //       },
      //       splitLine: {
      //         show: false
      //       }
      //     },
      //     series: [{
      //       name: '王经理',
      //       type: 'line',
      //       data: [10, 15, 20, 25, 30, 35]
      //     }, {
      //       name: '宋经理',
      //       type: 'line',
      //       data: [15, 20, 30, 35, 40, 45]
      //     }, {
      //       name: '李经理',
      //       type: 'line',
      //       data: [12, 18, 22, 26, 28, 40]
      //     }, {
      //       name: '苏经理',
      //       type: 'line',
      //       data: [16, 18, 20, 26, 30, 32]
      //     }, {
      //       name: '均线',
      //       type: 'line',
      //       data: [15, 20, 25, 30, 36, 40]
      //     }]
      //   });

      // })
    },
    methods: {
      editPost() {
        if (!this.ID) return;
        this.showEditPost = true;
      }
    },
    components: {
      postDialog
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
