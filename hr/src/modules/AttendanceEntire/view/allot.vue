<template>
  <div class="panel warp">
    <div class="content">
      <ui-scrollview>
        <div class="exceptionContainer">
          <div class="top">
            <strong>目前调拨人数:&nbsp;&nbsp;{{allotcount}}</strong>
            <div class="tool">
              <button type="button" class="btn btn-default" @click="allotHistory">查询调拨历史</button>
            </div>
          </div>
          <div class="exceptionItem" v-for="item in employees">
            <div class="left">
              <div class="control"><span><ui-checkbox :value.sync="item.ischeck"></ui-checkbox></span></div>
            </div>
            <div class="right">
              <div class="info">
                <div class="detail">
                  <div class="name"><strong>{{item.userName}}</strong>&nbsp;&nbsp;({{item.userNum}})</div>
                </div>
                <div class="statu" v-show="item.list.length>1"  @click="item.showall=!item.showall">
                  <span v-if="!item.showall"><ui-icon icon="keyboard_arrow_down"></ui-icon></span>
                  <span v-else><ui-icon icon="keyboard_arrow_up"></ui-icon></span>
                </div>
              </div>
              <div class="cardContainer">
                <div v-for="(index,item2) in item.list">
                  <p v-show="item.showall || index==0">
                    <span>{{item2.effectiveTime | datefilter}}&nbsp;-&nbsp;{{item2.endTime | datefilter}}</span>;
                    <span>{{item2.endDate}}天</span>
                    <span class="statu">{{item2.transferworkState}}</span>
                  </p>
                  <p v-show="item.showall || index==0">
                    由&nbsp;&nbsp;<strong title="{{item2 | orgfilter}}">{{item2 | orgfilter}}</strong>&nbsp;&nbsp;调入&nbsp;&nbsp;<strong title="{{item2 | toOrgfilter}}">{{item2 | toOrgfilter }}</strong>
                  </p>
                </div>
                <p>日总工时:&nbsp;&nbsp;<strong>{{item.hoursForDay}}</strong>
                  <button type="button" class="btn btn-default allothistory" @click="allotall(item.userID)">调拨总工时</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </ui-scrollview>
    </div>
    <div class="footer">
      <ui-checkbox :value.sync="onekey" class="handle">全选</ui-checkbox>
      <ui-button color="success" @click="confirm">确认</ui-button>
      <ui-button color="danger" @click="edit">修改</ui-button>
    </div>
    <ui-sidebar :show.sync="showSidebar " :title="title" layout="header-content">
      <div slot="content">
        <components :is="what" v-if="showSidebar" :userid="userid" :ids="ids" :date="query.date" :componentcallback="componentcallbackallot">
      </div>
    </ui-sidebar>
    <ui-sidecontent :show.sync="bigdymicshow">
      <components :is="bigwhat" v-if="bigdymicshow">
      </components>
    </ui-sidecontent>
  </div>
</template>
<script>
import store from '../store.js'
import totalAllot from './totalAllot'
import allotHistory from './allotHistory'
import exceptionFromAllot from './exceptionFromAllot'

export default {
  data() {
      return {

        title: '调拨总工时',

        showSidebar: false,
        userid: '',
        what: '',

        ids: [],

        bigdymicshow: false,
        bigwhat: '',

        onekey: false,

        allotcount: 0, //调拨人数

        display: false,

        employees: []
      };
    },
    watch: {
      onekey(a, b) {
        this.employees.forEach((item) => {
          item.ischeck = a;
        });
      }
    },
    methods: {
      componentcallbackallot(len) {
        this.refresh();
        console.log(this.ids.length);
        if (this.ids.length == len) {
          this.showSidebar = false;
        }
      },
      //修改按钮
      edit() {
        var self = this;


        var arr = self.employees.filter((item) => {
          return item.ischeck;
        });
        if (arr.length == 0) {
          self.$root.showTip({
            type: 'danger',
            msg: "请选择要修改的项目",
            duration: 2000
          });
          return;
        }

        for (var i = 0; i < arr.length; i++) {
          if (!(arr[i].list[0].transferworkState.split('-').length > 1 && arr[i].list[0].transferworkState.split('-')[1] == "异常")) {
            self.$root.showTip({
              type: 'danger',
              msg: arr[i].userName + ",考勤不是异常状态不能编辑",
              duration: 2000
            });
            return;
          }
        };

        this.ids = arr.map((item) => {
          return item.userID
        });

        this.title = '考勤异常(' + this.ids.length + ')人';
        this.what = "exceptionFromAllot";
        this.showSidebar = true;
      },
      //确认按钮
      confirm() {
        var self = this;

        var arr = self.employees.filter((item) => {
          return item.ischeck;
        });
        if (arr.length == 0) {
          self.$root.showTip({
            type: 'danger',
            msg: "请选择要提交的项目",
            duration: 2000
          });
          return;
        }
        var IDs = arr.map((item) => {
          return item.userID
        });

        store.actions.submitAllot({
          userIDs: JSON.stringify(IDs),
          dateStr: self.query.date
        }, function(data) {
          self.$root.showTip({
            type: 'success',
            msg: "操作成功",
            duration: 2000
          });
          self.refresh();
          self.componentcallback('allot');
        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      },
      /**查询调拨历史
       * [allotHistory description]
       * @return {[type]} [description]
       */
      allotHistory() {
        this.bigwhat = 'allotHistory';
        this.bigdymicshow = true;
      },
      /**查询调拨总工时
       * [allotall description]
       * @return {[type]} [description]
       */
      allotall(data) {
        this.title = '调拨总工时';
        this.what = 'totalAllot';
        this.showSidebar = true;
        this.userid = data + '';
      },
      refresh() {
        var self = this;
        this.query.dateStr = this.query.date;
        store.actions.getAllot(this.query, function(data) {
          let keys = [];
          data.forEach((item) => {
            var flag = false;
            var index = 0;
            keys.forEach((i, j) => {
              if (i.userID == item.userID) {
                index = j;
                flag = true;
                return;
              }
            });
            var obj = {
              deptID: item.deptID,
              deptName: item.deptName,
              organizeID: item.organizeID,
              storeName: item.storeName,
              storeID: item.storeID,

              toDeptID: item.toDeptID,
              toDeptName: item.toDeptName,
              toOrganizeID: item.toOrganizeID,
              toStoreID: item.toStoreID,
              toStoreName: item.toStoreName,

              effectiveTime: item.effectiveTime,
              endDate: item.endDate ? item.endDate : '',
              endTime: item.endTime ? item.endTime : '',
              transferworkState: item.transferworkState,
            };
            if (!flag) {
              keys.push({
                userID: item.userID,
                userName: item.userName,
                userNum: item.userNum,
                hoursForDay: item.hoursForDay,
                list: [obj]
              });
            } else {
              if (keys.length > 0) {
                keys[index].list.push(obj)
              }
            }
          })
          data = keys;
          data.forEach((item) => {
            item.ischeck = false;
            item.showall = false;
          });
          self.employees = data;
        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        })
      }
    },
    filters: {
      datefilter(value) {
        return value.replace(/-/g, '/');
      },
      orgfilter(value) {
        var str = "";
        if (value.deptName && value.deptName != "") {
          str = value.deptName;
        }
        if (value.storeName && value.storeName != "") {
          str += "/" + value.storeName;
        }
        return str;
      },
      toOrgfilter(value) {
        var str = "";
        if (value.toDeptName && value.toDeptName != "") {
          str = value.toDeptName;
        }
        if (value.toStoreName && value.toStoreName != "") {
          str += "/" + value.toStoreName;
        }
        return str;
      }
    },
    ready() {
      var self = this;
      self.refresh();
      //获取调拨人数
      store.actions.selectAllotCount(this.query, function(data) {
        self.allotcount = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });


    },
    components: {
      totalAllot,
      allotHistory,
      exceptionFromAllot
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
        default: function() {}
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

.top {
  padding: 10px;
  margin-bottom: 10px;
}

.tool {
  float: right;
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

.allothistory {
  float: right;
}

.footer {
  position: absolute;
  bottom: 0px;
  left: 0px;
  padding: 10px 20px;
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

.left {
  float: left;
  width: 40px;
  padding-left: 15px;
  padding-top: 10px;
}

.right {
  float: left;
  width: 358px;
  padding: 10px;
}

.statu {
  display: inline-block;
  float: right;
  color: red;
}

.statu span {
  cursor: pointer;
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
  margin-bottom: 10px;
}

.detail {
  display: inline-block;
  vertical-align: middle;
}

.name {
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.showall {
  float: right;
  color: red;
}

.cardContainer p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
