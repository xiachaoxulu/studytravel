<template>
  <div class="panel warp" @click="adjuststatuDisplay">
    <div class="content">
      <ui-scrollview>
        <div class="exceptionContainer">
          <div class="exceptionItem" v-for="item in employees">
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
                      <td v-for="item2 in item.banci"><span>{{item2 | firstfilter}}</span><span class="link">-</span><span>{{item2 | lastfilter}}</span></td>
                    </tr>
                    <tr>
                      <td>打卡:</td>
                      <td v-for="item3 in item.dakaTime"><span>{{item3 | firstfilter}}</span><span class="link">-</span><span>{{item3 | lastfilter}}</span></td>
                    </tr>
                    <tr>
                      <td>调整:</td>
                      <td class="adjust" v-for="adjustitem in item.tiaozhengTime">
                        <template v-if="adjustitem.adjuststatu">
                          <div @click.stop="adjustitem.adjuststatu=false">
                            <template v-if="adjustitem.firsttime=='' && adjustitem.lasttime==''">
                              <span>{{adjustitem | firstfilter}}</span><span class="link">-</span><span>{{adjustitem | lastfilter}}</span>
                            </template>
                            <template v-else>
                              <span :title="adjustitem.firsttime">{{adjustitem.firsttime}}</span><span class="link">-</span>
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
      <ui-button color="danger" @click="handler">一键智能处理</ui-button>
      <ui-button color="success" @click="submit">确定</ui-button>
    </div>
  </div>
</template>
<script>
import store from '../store.js'

export default {
  data() {
      return {
        onekey: false,
        reasons: [],
        employees: []
      };
    },
    filters: {
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
    watch:{
      onekey(a, b) {
        this.employees.forEach((item) => {
           item.ischeck = a;
        });
      }
    },
    methods: {
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
          self.componentcallback(arr.length);

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
        store.actions.getAllotException({
          userIDs: JSON.stringify(self.ids),
          date: self.date
        }, function(data) {
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
            if(!item.tiaozhengTime){
              item.tiaozhengTime='["08:00/18:00"]';  
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
      valitorfirsttime(item) {
        var reg = /^(([01]?[0-9])|(2[0-3])):[0-5]?[0-9]$/g;
        if (!reg.test(item.firsttime)) {
          item.firsttime = "06:00";
          this.$root.showTip({
            type: 'danger',
            msg: "请按08:00格式输入",
            duration: 2000
          });
        }
      },
      valitorlasttime(item) {
        var reg = /^(([01]?[0-9])|(2[0-3])):[0-5]?[0-9]$/g;
        if (!reg.test(item.lasttime)) {
          item.lasttime = "23:00";
          this.$root.showTip({
            type: 'danger',
            msg: "请按08:00格式输入",
            duration: 2000
          });
        }
      },
      handler() {
        this.employees.filter((item)=>{
          return item.ischeck;
        }).forEach((item) => {
          item.tiaozhengTime.forEach((item2) => {
            if(this.reasons.length>0)
            {
              item.reason=this.reasons[0].code;
            }
            if (item2.time.split('/').length > 0) {
              item2.firsttime = item2.time.split('/')[0];
              item2.lasttime = item2.time.split('/')[1];
            }

          })
        })
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

    },
    props: {
      ids: {
        type: Array,
        default: []
      },
      date: {
        type: String,
        default: ''
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
  font-weight: bold;
}

.mytable tr td {
  width: 107px;
}

.mytable tr td span {
  display: inline-block;
  width: 45px;
  text-align: center;
}

.link {
  width: 7px !important;
}

.mytable tr td:first-child {
  width: 54px;
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
</style>
