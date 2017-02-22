<template>
  <div class="roster-page">
    <header class="ui-module-navbar pos-topbar-fixed">
      <div class="ui-module-navbar-content">
        <div class="pull-left">
          <h4><strong>出勤人数</strong></h4>
        </div>
        <div class="input-group search">
          <ui-search :value.sync="searchFor.userName" :search-callback="searchAtt"></ui-search>
        </div>
      </div>
    </header>
    <section class="warp">
      <main class="main-content">
        <ui-grid :total.sync="total" v-ref:table class="testtable" :append-params="queryParam" selectable="multi" :fields="fields" :perpage="30" :pages="[10,20,30,50]" :btrefresh="true" checked="multi" :selected.sync="selected" height="auto" :url="url" tdheight="60px"></ui-grid>
      </main>
    </section>
  </div>
</template>
<script>
import Vue from 'vue'
import store from '../store'
export default {
  data() {
      return {
        total: 0,
        url: 'api.AttendanceEntire.getAttendanceMan',
        selected: [],
        chooseShow: false,
        searchFor: {
          userName: '',
        },
        fields: [{
          name: 'userName',
          title: '姓名',
          width: '100px',
          locked: 'first'
        }, {
          name: 'userNum',
          title: '员工工号',
          width: '150px',
        }, {
          name: 'userType',
          title: '用工类型',
          width: '100px',
        }, {
          name: 'ctrl',
          title: '排班时间',
          width: '200px',
          formater: function(value, data, index) {
            if (!data.banci) {
              return "";
            }
            try {
              var banci = JSON.parse(data.banci);
              var html = "";
              if (!Array.isArray(banci)) {
                return "";
              }
              banci.forEach((item) => {
                html += '<span>' + item + '</span>;';
              });
              return html;
            } catch (e) {
              return data.banci;
            }
          }
        }, {
          name: 'ctrl1',
          title: '打卡时间',
          width: '240px',
          tdClass: 'showTip',
          formater: function(value, data, index, lastIndex) {

            let dataTimes = data.times;

            // 容错处理以下情况

            // dataTimes = "[\"2016-09-14 02:57:18 上班打卡\",\"2016-09-14 15:26:49 下班打卡\"]";
            // dataTimes = "[\"2016-09-14 02:57:18 上班打卡\",]";
            // dataTimes = "2016-09-14 02:57:18 上班打卡";
            // dataTimes = "";


            // replace \"[]' 不使用JSON.parse 容错处理各种情况
            dataTimes = dataTimes.replace(/[\[\\"\]\']/ig, '');


            let timeList = dataTimes.split(','),
              arrow = lastIndex - index <= 2 ? 'top' : 'bottom',
              tList = '';
            if (lastIndex <= 5) {
              arrow = 'bottom';
            }


            timeList = timeList.filter(t => {
              return !!t;
            })

            if (timeList.length <= 1) {
              return timeList[0] || '';
            } else {
              var rightIndex = 0;
              var isflag=false;
              timeList.forEach((t, index) => {
                if (/(上班|下班)/.test(t)) {
                  if (!isflag) {
                    isflag=true;
                    rightIndex = index;
                  }
                }
                tList += t + '<br/>';
              })

              return timeList[rightIndex] + `
                    <i class="material-icons">error_outline</i>
                    <div class="tooltip ${arrow}" role="tooltip">
                        <div class="tooltip-arrow"></div>
                        <div class="tooltip-inner">
                            ${tList}
                        </div>
                    </div>
                    `

            }

            return '';


            /*if (!data.times) {
              return "";
            }
            try {
              var times = JSON.parse(data.times);
              var html = "";
              if (!Array.isArray(times) || times.length==0) {
                return "";
              }
              if (times.length == 1) {
                return times[0];
              } else {
                let arrow = lastIndex - index <= 2 ? 'top' : 'bottom'
                var content = "";
                for (var i = 0; i < times.length; i++) {
                  content += times[i] + `<br/>`
                }
                let timeList = times[0] + `
                        <i class="material-icons">error_outline</i>
                        <div class="tooltip ${arrow}" role="tooltip">
                            <div class="tooltip-arrow"></div>
                            <div class="tooltip-inner">
                                ${content}
                            </div>
                        </div>
                        `
                return timeList;
              }
            } catch (e) {
              return data.times;
            }*/
          }
        }]
      }
    },
    computed: {
      queryParam: {
        get: function() {
          let p = {};
          Object.assign(p, this.query, this.searchFor)
          return p;
        }
      }
    },
    methods: {
      chooseCallBack(data) {
        this.$set('searchFor.organizeID', data.organizeID);
        this.$set('searchFor.state', data.state);
        this.$set('searchFor.userType', data.userType);

        this.$refs.table.refresh();
      },
      choose() {
        this.chooseShow = true;
      },
      searchAtt() {
        this.refreshTable();
      },
      //刷新表格
      refreshTable() {
        this.$refs.table.refresh();
      }
    },
    ready() {

    },
    props: {
      query: {
        type: Object,
        default: () => {
          return {}
        }
      }
    }
}
</script>
<style lang="css" scoped>
.roster-page {
  margin-top: -8px;
}

.roster-page,
.warp {
  height: 100%;
  overflow: hidden;
}

.roster-page .warp {
  background-color: #fff;
  position: relative;
}

.roster-page .list-group {
  text-align: center;
  cursor: pointer;
  overflow-x: hidden;
}

.roster-page .search {
  float: left;
  margin-left: 50px;
  width: 300px;
}

.roster-page .toolbar {
  position: absolute;
  height: 50px;
  left: 0;
  width: 100%;
  padding-left: 20px;
  background-color: #e8eaef;
  line-height: 50px;
}

.inline {
  margin-top: 6px;
}

.roster-page .tool {
  float: right;
  width: 275px;
  color: red;
  padding-right: 10px;
  text-align: right;
}

.roster-page .main-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.testtable {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 0px;
}

.dialog-content {
  position: relative;
}

.control-label {
  padding-left: 0px;
}

.buttons {
  margin-top: 30px;
  text-align: center;
}

.toolbar-item {
  float: left;
  margin-right: 40px;
}

.toolbar-item:last-child {
  margin-right: 0px;
  width: 100px;
}
</style>
