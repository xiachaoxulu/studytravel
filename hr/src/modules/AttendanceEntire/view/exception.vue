<!--
* @Created Date       : 2016-10-09T09:32:19+08:00
* @Last Modified time : 2016-12-02T16:44:11+08:00
 -->
<template>
  <div class="panel warp" @click="adjuststatuDisplay">
    <div class="content">
      <ui-scrollview>
      <div class="chooseCondition" v-show="extend">
        <form class="form-horizontal container-fluid" role="form">
          <div class="row">
            <div class="col-sm-24">
              <div class="form-group   row">
                <label class="col-sm-6 control-label">姓名</label>
                <div class="col-sm-18">
                  <div class="choose-input">
                    <input type="text" class="form-control" v-model="searchFor.userName" placeholder="请选择员工姓名">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-24">
              <div class="form-group  row">
                <label class="col-sm-6  control-label">异常类型</label>
                <div class="col-sm-18">
                  <select v-model="searchFor.erroType" class="form-control">
                    <option value="">请选择异常类型</option>
                    <template v-for="item in erroTypes">
                      <option value="{{item.code}}" :selected="item.code==info.reason">{{item.codeName}}</option>
                    </template>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-24">
              <div class="form-group  row">
                <label class="col-sm-6 control-label">组织</label>
                <div class="col-sm-18">
                  <combo-tree :treedata="org" :multiple="true" :checkable="true" idprop="ID" :rootvisible="false" :nodeclicked="nodeClicked">
                    <div data-toggle="dropdown">
                      <div class="choose-input">
                        <input type="text" class="form-control" v-model="orgDisplayName" placeholder="请选择组织" readonly>
                        <i class="icon-tool icon-tool-search"></i>
                      </div>
                    </div>
                  </combo-tree>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="form-actions">
        <div class="extendChange">
          <p v-if="extend" @click="extend=!extend">收起<span><i class="material-icons _icon_more" style="vertical-align:middle">expand_less</i></span></p>
          <p v-else @click="extend=!extend">筛选<span><i class="icon-tool icon-tool-expandmore" style="vertical-align:middle"></i></span></p>
        </div>
      </div>
        <div class="exceptionContainer">
          <div class="exceptionItem" v-for="item in employees">
            <div class="more-check-in-list" v-show="showMoreCheckIn[$index].show" @mouseleave="hideCheckIn($index)">
              <ul>
                <li v-if="state.pushcardtimeData.length < 0" style="text-align:center;line-height:200px;">
                  <p>没有异常打卡数据！</p>
                </li>
                <!--  <li v-else v-for="item in state.pushcardtimeData">
                                    <p style="text-align:center;line-height:45px;" >{{item.date}}&nbsp;&nbsp;&nbsp;{{new Date(item.pushCardTime).getHours()+':'+new Date(item.pushCardTime).getMinutes()+':'+new Date(item.pushCardTime).getSeconds()}}&nbsp;&nbsp;&nbsp;{{item.bz}}</p>
                                </li> -->
                <li v-else v-for="item in state.pushcardtimeData[$index]">
                  <p style="text-align:center;line-height:45px;">{{item.date}}&nbsp;&nbsp;&nbsp;{{item.pushCardTime}}&nbsp;&nbsp;&nbsp;{{item.bz}}</p>
                </li>
              </ul>
            </div>
            <div class="statu">
              <div class="note">{{item.erroTypeDetails}}</div>
            </div>
            <div class="left">
              <div class="control"><span><ui-checkbox :value.sync="item.ischeck"></ui-checkbox></span></div>
              <div class="img">
                <img v-if="item.photourl==undefined || item.photourl==''" src="../../../assets/images/avatar.png" class="img">
                <img v-else :src="item.photourl" class="img">
              </div>
            </div>
            <div class="right">
              <div class="info">
                <div class="detail">
                  <div class="name"><strong>{{item.userName}} </strong><span v-if="item.jiediao">(借调)</span></div>
                  <div class="num">{{item.userNum}}</div>
                </div>
                <div class="reason">
                  <select v-model="item.reason" class="form-control">
                    <option value="">请选择异常原因</option>
                    <template v-for="reasonitem in reasons">
                      <option value="{{reasonitem.code}}" :selected="reasonitem.code==item.reason">{{reasonitem.codeName}}</option>
                    </template>
                  </select>
                </div>
              </div>
              <div class="cardContainer">
                <table class="mytable">
                  <tbody>
                    <tr>
                      <td>排班:</td>
                      <td v-for="item2 in item.banci"><span>{{item2 | firstfilter}}</span>
                        
                        <span class="link">{{ item2 | linkfilter }}</span>

                      <span>{{item2 | lastfilter}}</span></td>
                    </tr>
                    <tr>
                      <td>打卡:</td>
                      <td v-for="item3 in item.dakaTime"><span>{{item3 | firstfilter}}</span><span class="link">-</span><span>{{item3 | lastfilter}}</span></td>
                      <td><span @click="moreCheckIn(item,$index)" class="material-icons" style="cursor:pointer">error_outline</span></td>
                    </tr>
                    <tr>
                      <td>调整后打卡:</td>
                      <td class="adjust" v-for="adjustitem in item.tiaozhengTime">
                        <template v-if="adjustitem.adjuststatu">
                          <div @click.stop="adjustitem.adjuststatu=false">
                            <template v-if="adjustitem.firsttime=='' && adjustitem.lasttime==''">
                              <span>{{adjustitem | firstfilter}}</span><span class="link">{{ adjustitem | linkfilter}}</span><span>{{adjustitem | lastfilter}}</span>
                            </template>
                            <template v-else>
                              <span :title="adjustitem.firsttime">{{adjustitem.firsttime}}</span><span class="link">{{ adjustitem | linkfilter}}</span>
                              <span :title="adjustitem.lasttime">{{adjustitem.lasttime}}</span>
                            </template>
                          </div>
                        </template>
                        <template v-else>
                          <div class="adjustdiv" @click.stop="">
                            <input type="text" v-model="adjustitem.firsttime" @change="valitorfirsttime(adjustitem)">:
                            <input type="text" v-model="adjustitem.lasttime" @change="valitorlasttime(adjustitem)">
                          </div>
                        </template>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </ui-scrollview>
    </div>
    <div class="footer">
      <ui-checkbox :value.sync="onekey" class="handle">全选</ui-checkbox>
      <ui-button color="danger" @click="handler" __code="attendanceEntire-day-capacity/补卡">补卡</ui-button>
      <ui-button color="success" @click="submit" __code="attendanceEntire-day-confirm/确定">确定</ui-button>
    </div>
  </div>
</template>
<script>
import store from '../store.js'
import Vue from 'vue'

export default {
  data() {
      return {
        extend: false,
        state: store.state,
        sslasttime: '',
        onekey: false,
        reasons: [],
        employees: [],
        showMoreCheckIn: [],
        showAbnAttenModal: false,
        erroTypes: [],
        orgDisplayName: '',
        org: {},
        searchFor: {
          organizeID: '',
          erroType: '',
          userName: ''
        },
        url: 'api.AttendanceEntire.getPushcardtime',
        fields: [{
          name: "date",
          title: "打卡日期",
          locked: 'first',
          width: '250px'
        }, {
          name: "pushCardTime",
          title: "打卡时间",
          locked: 'first',
          width: '250px'
        }, {
          name: "bz",
          title: "打卡状态",
          locked: 'first',
          width: '250px'
        }, ],

      };
    },
    filters: {

      linkfilter(value){
        if (value.time) {
          value = value.time;
        }
        if (value.split('/').length > 1) {
          return '-';
        } else {
          return '';
        }
      },
      firstfilter(value) {
        if (value.time) {
          value = value.time;
        }
        if (value.split('/').length > 0) {
          return value.split('/')[0]
        } else {
          return '';
        }
      },
      lastfilter(value) {
        if (value.time) {
          value = value.time;
        }
        if (value.split('/').length > 0) {
          return value.split('/')[1]
        } else {
          return '';
        }
      }
    },
    watch: {
      'searchFor.userName': function(a, b) {
        this.sslasttime = new Date();
        setTimeout(() => {
          var d = new Date();
          if (d - this.sslasttime >= 500) {
            this.searchException();
          }
        }, 500);
      },
      'searchFor.erroType': function(a, b) {
        this.searchException();
      },
      onekey(a, b) {
        this.employees.forEach((item) => {
          item.ischeck = a;
        });
      }
    },
    methods: {
      searchException() {

        var self = this;
        var ss = {};
        Object.assign(ss, this.query, this.searchFor);
        store.actions.getException(ss, function(data) {
          data.forEach((item) => {
            item.reason = "";
            if (!!item.banci) {
              item.banci = JSON.parse(item.banci);
            } else {
              item.banci = "";
            }
            if (!!item.dakaTime) {
              item.dakaTime = JSON.parse(item.dakaTime);

            } else {
              item.dakaTime = "";
            }
            var arr = [];
            if (!item.tiaozhengTime) {
              item.tiaozhengTime = '["08:00/18:00"]';
            }
            item.tiaozhengTime = JSON.parse(item.tiaozhengTime);
            item.tiaozhengTime.forEach((item2) => {
              arr.push({
                time: item2,
                firsttime: item2.split('/')[0],
                lasttime: item2.split('/')[1],
                adjuststatu: true
              })
            });
            item.tiaozhengTime = arr;
            item.ischeck = false;
          });
          self.employees = data;
        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        })

      },
      nodeClicked(data) {
        var self = this;
        this.orgDisplayName = data.map((item) => {
          return item.text
        }).join(',');
        this.searchFor.organizeID = JSON.stringify(data.map((item) => {
          return item.organizeID;
        }));
        this.searchException();
      },
      // 显示更多打卡
      moreCheckIn(item, index) {
        if (!this.showMoreCheckIn[index] || !this.showMoreCheckIn[index].hasData) {
          store.actions.getPushcardtime(item.userID, this.query.date, index, () => {
            this.showMoreCheckIn.$set(index, {
              show: true,
              hasData: true
            });
          });
        } else {
          this.showMoreCheckIn.$set(index, {
            show: true,
            hasData: true
          });
        }
      },
      hideCheckIn(index) {
        this.showMoreCheckIn.$set(index, {
          show: false,
          hasData: this.showMoreCheckIn[index].hasData
        });
      },
      //提交
      submit() {
        var self = this;
        if (self.employees.length == 0) {
          self.$root.showTip({
            type: 'danger',
            msg: "请选择要提交的异常",
            duration: 2000
          });
          return;
        }
        var arr = self.employees.filter((item) => {
          return item.ischeck;
        });
        if (arr.length == 0) {
          self.$root.showTip({
            type: 'danger',
            msg: "请选择要提交的异常",
            duration: 2000
          });
          return;
        }
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].reason == "") {
            self.$root.showTip({
              type: 'danger',
              msg: arr[i].userName + "异常原因为空",
              duration: 2000
            });
            return;
          }
          for (var j = 0; j < arr[i].tiaozhengTime.length; j++) {
            if (arr[i].tiaozhengTime[j].firsttime == "" || arr[i].tiaozhengTime[j].firsttime == "") {
              self.$root.showTip({
                type: 'danger',
                msg: arr[i].userName + "的排班调整输入不合法",
                duration: 2000
              });
              return;
            }
          };
        };
        var data = arr.map((item) => {
          return {
            ID: item.ID,
            reason: item.reason,
            dkbc: item.dakaTime,
            tzbc: item.tiaozhengTime.map((item2) => {
              return item2.firsttime + "/" + item2.lasttime
            })
          }
        })
        store.actions.submitException(data, function(data) {
          self.refresh();
          self.componentcallback('exception');

        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        })
      },
      refresh() {
        var self = this;
        store.actions.getException(this.query, function(data) {
          data.forEach((item) => {
            item.reason = "";
            if (!!item.banci) {
              item.banci = JSON.parse(item.banci);
            } else {
              item.banci = "";
            }
            if (!!item.dakaTime) {
              item.dakaTime = JSON.parse(item.dakaTime);

            } else {
              item.dakaTime = "";
            }
            var arr = [];
            if (!item.tiaozhengTime) {
              item.tiaozhengTime = '["08:00/18:00"]';
            }
            item.tiaozhengTime = JSON.parse(item.tiaozhengTime);
            item.tiaozhengTime.forEach((item2) => {
              arr.push({
                time: item2,
                firsttime: item2.split('/')[0],
                lasttime: item2.split('/')[1],
                adjuststatu: true
              })
            });
            item.tiaozhengTime = arr;
            item.ischeck = false;
          });
          self.employees = data;

          self.employees.forEach((item) => {
            switch (item.erroTypeDetails) {
              case '迟到打卡':
                item.reason = '104016';
                break;
              case '早退打卡':
                item.reason = '104017';
                break;
              case '旷工打卡':
                item.reason = '104018';
                break;
              case '排班未打卡':
                item.reason = '104019';
                break;
              case '打卡未排班':
                item.reason = '104020';
                break;
              default:
                item.reason = '104003';
            }
            item.tiaozhengTime.forEach((item2) => {
              if (item2.time.split('/').length > 0) {
                item2.firsttime = item2.time.split('/')[0];
                item2.lasttime = item2.time.split('/')[1];
              }

            })
          })

        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        })
      },
      valitorfirsttime(item) {
        var reg = /^(([01][0-9])|(2[0-3])):[0-5][0-9]$/g;
        if (!reg.test(item.firsttime)) {
          item.firsttime = "06:00";
          this.$root.showTip({
            type: 'danger',
            msg: "请按xx:xx格式输入",
            duration: 2000
          });
        }
      },
      valitorlasttime(item) {
        var reg = /^(([01][0-9])|(2[0-3])):[0-5][0-9]$/g;
        if (!reg.test(item.lasttime)) {
          item.lasttime = "23:00";
          this.$root.showTip({
            type: 'danger',
            msg: "请按xx:xx格式输入",
            duration: 2000
          });
        }
      },
      handler() {
        this.employees.filter((item) => {
          return item.ischeck;
        }).forEach((item) => {
          if (this.reasons.length > 0) {
            item.reason = '104019'; //补卡的编码
          }

          item.tiaozhengTime.forEach((item2) => {
            if (item2.time.split('/').length > 0) {
              item2.firsttime = item2.time.split('/')[0];
              item2.lasttime = item2.time.split('/')[1];
            }

          })
        })

        this.submit();
      },
      adjuststatuDisplay() {
        this.employees.forEach((item) => {
          item.tiaozhengTime.forEach((item2) => {
            item2.adjuststatu = true;
          })
        })
      }
    },
    ready() {
      var self = this;

      this.refresh();

      store.actions.findSystemConfig("104000", function(data) {
        self.reasons = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      })

      store.actions.findSystemConfig("146000", function(data) {
        self.erroTypes = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      })

      //加载组织树
      store.actions.loadOrgListTree(function(data) {
        self.org = data;
        if (self.query.organizeID && self.org && self.org.children) {

          var orgarr = JSON.parse(self.query.organizeID);
          if (orgarr.length > 0) {
            function checkedChoose(arr) {
              arr.forEach((item) => {
                if (orgarr.indexOf(item.organizeID) !== -1) {
                  self.orgDisplayName += item.text + ",";
                  Vue.set(item, 'checked', true);
                }
                if (item.children && item.children.length > 0) {
                  checkedChoose(item.children);
                }
              });
            }

            checkedChoose(self.org.children);
          }
        }
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
    },
    props: {
      query: {
        type: Object,
        default: () => {
          return {}
        }
      },
      componentcallback: {
        type: Function,
        default: () => {}
      }
    }
};
</script>
<style lang="css" scoped>
.warp {
  top: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
}

.content {
  position: absolute;
  bottom: 65px;
  left: 0px;
  right: 0px;
  top: 0px;
}

.exceptionContainer {
  height: 100%;
  padding: 10px;
}

.footer {
  position: absolute;
  bottom: 0px;
  left: 0px;
  padding: 10px 15px;
}

.handle {
  vertical-align: text-top;
  margin-right: 20px;
}

.exceptionItem {
  position: relative;
  border-radius: 3px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

.exceptionItem:after {
  content: '';
  overflow: hidden;
  clear: both;
  display: block;
}

.exceptionItem:hover {
  background: #eee;
}

.statu {
  height: 60px;
}

.note {
  display: inline-block;
  vertical-align: middle;
  padding: 8px 30px;
  background: #FF494a;
  color: white;
  border-bottom-right-radius: 5px;
}

.left {
  float: left;
  width: 110px;
  padding-left: 15px;
}

.right {
  float: left;
  width: 288px;
  padding: 0px 10px;
}

.cardContainer {
  overflow: auto;
}

.control {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  vertical-align: middle;
}

.img {
  border-radius: 30px;
  width: 60px;
  height: 60px;
  vertical-align: middle;
  display: inline-block;
}

.info {
  border-bottom: 1px dashed #ccc;
  margin-bottom: 10px;
  padding-bottom: 10px;
}

.detail {
  display: inline-block;
  width: 114px;
  vertical-align: middle;
}

.name {
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.num {
  margin-top: 3px;
  font-size: 12px;
  color: #ccc;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.reason {
  display: inline-block;
  width: 150px;
}

.mytable {
  width: 268px;
  table-layout: fixed;
}

.mytable td {
  padding: 5px;
  color: black;
  /*font-weight: bold;*/
}

.mytable tr td {
  width: 110px;
}

.mytable tr td span {
  display: inline-block;
  width: 45px;
  text-align: center;
  float: left;
}

.link {
  width: 7px !important;
}

.mytable tr td:first-child {
  width: 95px;
}

.adjust {
  color: #ccc !important;
  cursor: pointer;
}

.adjust span {
  display: inline-block;
  float: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.adjustdiv {
  width: 102px;
  text-align: center;
}

.adjustdiv input {
  width: 47px;
}

.more-check-in-list {
  position: absolute;
  left: 40px;
  top: 125px;
  z-index: 9999;
  width: 245px;
  height: 200px;
  background: #fff;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  line-height: 30px;
  padding: 10px 0;
  overflow-y: auto;
}

.choose-input {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  font-family: 'Microsoft YaHei', serif;
  width: 100%;
}

.choose-input > input {
  font-family: 'Microsoft YaHei', serif;
  color: #666;
  box-sizing: border-box;
  outline: none;
  padding: 0 30px 0 7px;
  font-size: 13px;
  width: 100%;
  cursor: pointer;
  background: #fff;
}

.choose-input > i {
  display: inline-block;
  position: absolute;
  width: 30px;
  height: 30px;
  top: 4px;
  right: 0;
  color: #999;
}

.chooseCondition {
  padding: 10px;
  padding-bottom: 0px;
}

.extendChange {
  text-align: right;
  padding-top: 10px;
  padding-right: 50px;
  font-size: 14px;
  color: blue;
  cursor: pointer;
}
</style>
