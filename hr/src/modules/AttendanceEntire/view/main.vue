<template>
  <div class="ui-module" @click="tipshow=false">
    <header class="ui-module-navbar pos-topbar-fixed">
      <app-modulenavbar :show="showNavbar">
        <div class="pull-left">
          <ui-search :value.sync="searchFor.userName" :search-callback="searchAtt"></ui-search>
          <!-- <div v-show="tipshow" class="tiptableP">
            <table class="tiptable table table-striped table-hover">
              <tr v-for="item in suggestList" @click="tipRowClick(item)">
                <td>{{item.userName}}</td>
                <td>{{item.userNum}}</td>
                <td>{{item.userTypeName}}</td>
                <td>{{item.postName}}</td>
                <td>{{item | orgFilter}}</td>
              </tr>
            </table>
          </div> -->
        </div>
        <div class="pull-left att-center-tab">
          <ui-buttongroup active-class="btn-primary">
            <button type="button" class="btn btn-primary" v-link="{path: '/AttendanceEntire/Day', activeClass:'btn-primary',replace:true}" @click="displayrule=1">日考勤</button>
            <button type="button" class="btn btn-default" v-link="{path: '/AttendanceEntire/Month',activeClass:'btn-primary', replace:true}" @click="displayrule=2">月考勤</button>
          </ui-buttongroup>
        </div>
        <div class="pull-right">
          <button type="button" class="ui-tool-button" @click="cardRefresh" __code="attendanceEntire-refresh/刷新按钮">
            <span class="icon icon-tool icon-tool-refresh pull-left"></span>
            <span class="_name pull-left">刷新</span>
          </button>
          <button type="button" class="ui-tool-button" @click="otherclick" __code="attendanceEntire-bulu/补录按钮">
            <span class="icon icon-tool icon-tool-add2 pull-left"></span>
            <span class="_name pull-left">补录</span>
          </button>
          <button type="button" class="ui-tool-button" @click="choose" __code="attendanceEntire-choose/筛选按钮">
            <span class="icon icon-tool icon-tool-filter pull-left"></span>
            <span class="_name pull-left">筛选</span>
          </button>
          <v-dropdown class="ui-tool-dropdown" trigger="click">
            <button type="button" data-toggle="dropdown" class="ui-tool-button">
              <span class="icon icon-tool icon-tool-more pull-left"></span>
              <span class="_name pull-left">更多</span>
            </button>
            <ul class="dropdown-menu">
              <li __code="attendanceEntire-import-importExcel/导入">
                <a href="javascript:void(0)" name="dropdown-item" @click="importExcel">导入</a>
              </li>
              <li __code="attendanceEntire-import-exportExcel/导出">
                <a href="javascript:void(0)" name="dropdown-item" @click="exportExcel">导出</a>
              </li>
              <li>
                <div class="border"></div>
              </li>
              <li __code="attendanceEntire-import-other/查看其它工时">
                <a href="javascript:void(0)" name="dropdown-item" @click="otherClick">查看补录工时</a>
              </li>
              <li __code="attendanceEntire-import-allot/查看调拨员工">
                <a href="javascript:void(0)" name="dropdown-item" @click="allotClick">查看调拨员工</a>
              </li>
              <li __code="attendanceEntire-import-evection/查看出差员工">
                <a href="javascript:void(0)" name="dropdown-item" @click="evectionClick">查看出差员工</a>
              </li>
              <li __code="attendanceEntire-import-vacation/查看休假员工">
                <a href="javascript:void(0)" name="dropdown-item" @click="vacationClick">查看休假员工</a>
              </li>
            </ul>
          </v-dropdown>
        </div>
      </app-modulenavbar>
    </header>
    <router-view class="main" transition="main" transition-mode="out-in"></router-view>
    <app-employee-choose :display.sync="chooseShow" :choose-call-back="chooseCallBack" :displayrule="displayrule"></app-employee-choose>
    <otherentry :display.sync="otherentyshow" v-if="otherentyshow" :componentscallback="componentscallback"></otherentry>
    <ui-sidecontent :show.sync="bigdymicshow">
      <components :is="bigwhat" v-if="bigdymicshow" :user="currentChooseUser" :date="datetime">
      </components>
    </ui-sidecontent>
    <ui-modal :show.sync="uploadShow" v-if="uploadShow" header="上传文件" hide-footer type="large">
      <ui-upload :filecountlimit="filecountlimit" filetypelimit="xlsx,xls" :submiturl="fileUrl" :callback="uploadDone" :errortime="1000*60"></ui-upload>
    </ui-modal>
  </div>
</template>
<script>
import store from '../store.js'
import otherentry from './otherentry'
import allotHistory from './allotHistory'
import vacationHistory from './vacationHistory'
import evectionHistory from './evectionHistory'
import otherList from './otherList'
import dayDetailTip from './dayDetailTip'


export default {
  data() {
      return {
        showNavbar: false,
        bigwhat: '',
        bigdymicshow: false,
        displayrule: 1,
        tipshow: false,

        datetime: '',
        // userName: '',
        currentChooseUser: {},
        suggestList: [],
        fileUrl: '',
        filecountlimit: 1,
        uploadShow: false,

        searchFor: {
          userName:''
        },
        chooseShow: false,
        otherentyshow: false,
        lastTime: ""
      };
    },
    filters: {
      orgFilter(item) {
        var org = item.deptName;
        if (item.storeName) {
          org += "/" + item.storeName;
        }
        if (item.teamName) {
          org += "/" + item.teamName;
        }
        return org;
      }
    },
    watch: {
      // 'userName': function(a, b) {
      //   this.lastTime = new Date();
      //   if (a != "") {
      //     var self = this;
      //     setTimeout(() => {
      //       var d = new Date();
      //       if (d - this.lastTime >= 500) {
      //         store.actions.loadEmployeeByKey(a, function(data) {
      //           self.suggestList = data;
      //           if (self.suggestList.length > 0) {
      //             self.tipshow = true;
      //           }
      //         }, function(error) {
      //           self.$root.showTip({
      //             type: 'danger',
      //             msg: error,
      //             duration: 2000
      //           });
      //         })
      //       }
      //     }, 500);
      //   }
      // }
    },
    attached() {
      let _this = this;
      setTimeout(function() {
        _this.showNavbar = true;
      }, 500)

      this.hasReady = true;
    },
    detached() {
      this.showNavbar = false;
      this.hasReady = false;
    },
    events: {
      routerChange(goNow) {
        if (this.$route && this.$route.path == '/AttendanceEntire/Month') {
          this.displayrule = 2;
        }
      }
    },
    methods: {
      tipRowClick(item) {
        this.tipshow = false;
        if (item.userNum) {
          this.datetime = store.state.dayTime;
          this.currentChooseUser = item;
          this.bigwhat = 'dayDetailTip';
          this.bigdymicshow = true;
        }
      },
      importExcel() {
        if (this.displayrule == 1) {
          this.fileUrl = "api.AttendanceEntire.importDayRecord";
        } else {
          this.fileUrl = "api.AttendanceEntire.importMonthRecord";
        }
        this.uploadShow = true;
      },
      exportExcel() {
        store.actions.Setdownload(true);
      },
      uploadDone() {
        this.refresh();
        this.uploadShow = false;
      },
      otherClick() {
        this.bigwhat = "otherList";
        this.bigdymicshow = true;
      },
      allotClick() {
        this.bigwhat = "allotHistory";
        this.bigdymicshow = true;
      },
      vacationClick() {
        this.bigwhat = 'vacationHistory';
        this.bigdymicshow = true;
      },
      evectionClick() {
        this.bigwhat = "evectionHistory";
        this.bigdymicshow = true;
      },

      cardRefresh() {
        store.actions.SetRefresh(true);
      },

      refresh() {
        store.actions.Setsearchparam(this.searchFor);
      },
      searchAtt() {
        store.actions.Setsearchparam(this.searchFor);
        // var self = this;
        // if (this.userName == "") {
        //   return;
        // }
        // store.actions.loadEmployeeByKey(this.userName, function(data) {
        //   self.suggestList = data;
        //   if (self.suggestList.length > 0) {
        //     self.tipshow = true;
        //   }
        // }, function(error) {
        //   self.$root.showTip({
        //     type: 'danger',
        //     msg: error,
        //     duration: 2000
        //   });
        // })
      },
      //筛选人员
      choose() {
        this.chooseShow = true;
      },
      chooseCallBack(data) {
        Object.assign(this.searchFor, data);
        store.actions.Setsearchparam(this.searchFor);
      },
      otherclick() {
        this.otherentyshow = true;
      },
      //其他工时录入回调
      componentscallback() {
        this.refresh();
      }
    },
    components: {
      otherentry,
      allotHistory,
      vacationHistory,
      evectionHistory,
      otherList,
      dayDetailTip
    }
};
</script>
<style lang="css" scoped>
.att-center-tab {
  position: absolute;
  right: 50%;
}

.border {
  border-bottom: 1px solid #ccc;
  margin: 5px 0px;
}

.tiptableP {
  max-height: 400px;
  overflow-y: scroll;
}

.tiptable {
  cursor: pointer;
  /*position: absolute;*/
  background-color: #fff;
  border-radius: 10px;
}
</style>
