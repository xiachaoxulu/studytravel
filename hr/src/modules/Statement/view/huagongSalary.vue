<!--
* @Created Date       : 2016-11-11T10:09:04+08:00
* @Last Modified time : 2016-11-24T16:06:41+08:00
 -->


<template>
<div style="background: #fff;">
    <div class="date-search" v-if='toggleSearchBar'>
        <ul>
            <!-- <li>
                <p>时间条件：</p>
                <div style="float:left;width:120px;">
                    <select class="form-control" v-model="timeCondition">
            <option v-for="item in state.timeCondition" :value="item.value" :selected="item.value==timeCondition">{{item.codeName}}</option>
          </select>
                </div>
            </li> -->
            <!-- <li v-if="timeDay">
                <p>开始时间：</p>
                <ui-datepicker format="yyyy-MM-dd" :time.sync="state.startTimeDay" width="120px"></ui-datepicker>
            </li>
            <li v-if="timeDay">
                <p>结束时间：</p>
                <ui-datepicker format="yyyy-MM-dd" :time.sync="state.endTimeDay" width="120px"></ui-datepicker>
            </li> -->
            <li>
                <p>开始时间：</p>
                <ui-datepicker format="yyyy-MM" show-type="mm" :time.sync="state.startTime" width="120px"></ui-datepicker>
            </li>
            <li>
                <p>结束时间：</p>
                <ui-datepicker format="yyyy-MM" show-type="mm" :time.sync="state.endTime" width="120px"></ui-datepicker>
            </li>
            <li>
                <p>用工类型：</p>
                <div style="float:left;width:120px;">
                    <v-select :options="state.userTypes" :value.sync="state.userTypeVal" :multiple="true" placeholder="请选择用工类型" overflow="hidden" style="width:200px;">
                    </v-select>
                </div>
            </li>
    </div>
    <div class="date-search2" v-if='toggleSearchBar'>
        <ul>
            <li style="float:right">
                <ui-button color="primary " @click="loadData()" style="margin-left: 10px;background:#0ed185;width:82px !important;height:40px;border-radius:3px !important;">查询</ui-button>
            </li>
            <li style="float:left;margin-left:10px;">
                <p>组织：</p>
                <div class="combo-tree-box">
                    <combo-tree :treedata="state.orgComboTree" :nodeclicked="nodeClicked" :dropdownvalue.sync="state.dropvalue" :dropdownname.sync="state.dropname" :checkable="true" :multiple="true" :rootvisible="false" idprop="ID">
                        <div data-toggle="dropdown">
                            <input type="text" class="form-control" placeholder="请选择组织" readonly value="{{state.orgDisplayName}}" title='{{state.orgDisplayName}}'>
                        </div>
                    </combo-tree>
                </div>
            </li>
            <li style="float:left;margin-left:10px;" class='username'>
                <p>姓名：</p>
                <div style="float:left">
                    <p><input type="text" value="" v-model="userName"></p>
                </div>
            </li>
        </ul>
    </div>
    <div :class="toggleSearchBar ? 'wrap':'none'">
        <ui-report v-ref:report :column-total='false' :data-list="state.huagongPayMonthReportList" :titles="titles" :row-total="rowTotal" :group-infos="groupColumns" :total-ignore='totalIgnore' :progress-show="processShow" :multi-titles="multiTitles" :lorder="lorder">
        </ui-report>
    </div>
    <ui-sidebar :show.sync="show" title="门店数量" layout="header-content">
        <div slot="content">
            <div class="num-count">
                <div class="city-store">
                    <p>
                        <b>23</b>
                        <span>城市</span>
                    </p>
                    <p>
                        <b>23</b>
                        <span>门店</span>
                    </p>
                </div>
                <div class="new-store">
                    <p>
                        <b>3</b>
                        <span>本月新开门店</span>
                    </p>
                    <p>
                        <b>3</b>
                        <span>本月关闭门店</span>
                    </p>
                </div>
            </div>
            <div class="line-count">
                <h2>目前各城市门店数量</h2>
            </div>
        </div>
    </ui-sidebar>
</div>
</template>
<script>
import store from '../store';
import Vue from 'vue';
export default {
    data() {
        return {
            state: store.state,
            show: false,
            searchFor: {
                userName: ''
            }, //查询关键字
            orgDisplayName: '',
            multiTitles: [],
            toggleSearchBar:true,
            userName: '',
            groupColumns: [],
            rowTotal: false,
            processShow: true,
            titles: [{
                name: "serialNum",
                title: "序号",
                width: '60px',
            }, {
                name: "suiteName",
                title: "工资套名称",
            }, {
                name: "userName",
                title: "姓名",
            }, {
                name: "startTime",
                title: "入职时间",
            }, {
                name: "postName",
                title: "岗位",
            }, {
                name: "postTypeName",
                title: "岗位分类",
            }, {
                name: "organizeName",
                title: "班组",
            }, {
                name: "基本工资",
                title: "基本工资",
            }, {
                name: "天/小时标准",
                title: "天/小时标准",
            }, {
                name: "薪酬标准",
                title: "薪酬标准",
            }, {
                name: "本月调整",
                title: "本月调整",
            }, {
                name: "调整时间",
                title: "调整时间",
            }, {
                name: "早班费标准",
                title: "早班费标准",
            }, {
                name: "早班出勤",
                title: "早班出勤",
            }, {
                name: "外派补贴标准",
                title: "外派补贴标准",
                width: '200px'
            }, {
                name: "月度标准出勤",
                title: "月度标准出勤",
                width: '200px'
            }, {
                name: "全月考勤",
                title: "全月考勤",
            }, {
                name: "分值",
                title: "分值",
            }, {
                name: '早班补贴',
                title: '早班补贴'
            }, {
                name: '外派补贴',
                title: '外派补贴'
            }, {
                name: '天/小时工资',
                title: '天/小时工资'
            }, {
                name: '工龄津贴',
                title: '工龄津贴',
            }, {
                name: '值班费',
                title: '值班费'
            }, {
                name: '其他应发',
                title: '其他应发'
            }, {
                name: '其他应发情况说明',
                title: '其他应发情况说明',
                width: '200px'
            }, {
                name: '工资',
                title: '工资'
            }, {
                name: '工资日报表合计',
                title: '工资日报表合计',
                width: '200px'
            }, {
                name: '工资差额',
                title: '工资差额'
            }, {
                name: '工资备注',
                title: '工资备注',
            }, {
                name: '绩效奖金',
                title: '绩效奖金'
            }, {
                name: '奖金日报表合计',
                title: '奖金日报表合计',
                width: '200px'
            }, {
                name: '奖金差额',
                title: '奖金差额'
            }, {
                name: '奖金备注',
                title: '奖金备注'
            }, {
                name: '应发合计',
                title: '应发合计'
            }, {
                name: '代扣个人社保',
                title: '代扣个人社保',
                width: '200px'
            }, {
                name: '社保日报表合计',
                title: '社保日报表合计',
                width: '200px'
            }, {
                name: '社保差额',
                title: '社保差额'
            }, {
                name: '社保备注',
                title: '社保备注',
            }, {
                name: '福利',
                title: '福利'
            }, {
                name: '福利日报表合计',
                title: '福利日报表合计',
                width: '200px'
            }, {
                name: '福利差额',
                title: '福利差额'
            }, {
                name: '福利备注',
                title: '福利备注'
            }, {
                name: '福利说明',
                title: '福利说明'
            }, {
                name: '代扣伙食费',
                title: '代扣伙食费'
            }, {
                name: '代扣税',
                title: '代扣税'
            }, {
                name: '扣房租水电',
                title: '扣房租水电'
            }, {
                name: '其他扣款',
                title: '其他扣款'
            }, {
                name: '其他扣款情况说明',
                title: '其他扣款情况说明',
                width: '200px'
            }, {
                name: '实发合计',
                title: '实发合计'
            }],
            timeCondition: 'month',
            orgTypeList: '',
            groupColumns: ['serialNum', 'userName', 'startTime', 'postName', 'postTypeName', 'organizeName', ],
            lorder: ['date'],
            // totalIgnore: ['date', 'userNum'],
            multiTitles: [{
                title: '工资',
                columns: ['早班补贴', '外派补贴', '天/小时工资', '工龄津贴', '值班费', '其他应发', '其他应发情况说明', '工资', '工资日报表合计', '工资差额', '工资备注'],
            }, {
                title: '奖金',
                columns: ['绩效奖金', '奖金日报表合计', '奖金差额', '奖金备注'],
            }, {
                title: '社保',
                columns: ['代扣个人社保', '社保日报表合计', '社保差额', '社保备注'],
            }, {
                title: '福利',
                columns: ['福利', '福利日报表合计', '福利差额', '福利备注'],
            }],
            sortReport:'asc'
        }
    },
    methods: {
        //选择组织类型
        orgTypeChange(type) {
            store.actions.loadOrgName(type, (data) => {
                // resolve();
                this.$broadcast('orgReady')
            }, error => {
                this.$root.showTip({
                    type: 'danger',
                    msg: error,
                    duration: 2000
                });
                // reject(error);
            })
            console.log(type)
        },
        //搜索
        searchAtt() {

        },
        exportFn() {
            // var param = Object.keys(this.searchFor).map((item) => {
            //   return item + "=" + this.searchFor[item];
            // }).join('&');
            // window.location.href = Vue.__Basepath + 'acewill/common/exportStoreList.htm?' + param;
        },
        nodeClicked(data) {
            // console.log(data)
            // this.orgDisplayName=data.text;

            store.actions.setOrgDisplayName(data);
        },
        // nodeClicked(data) {
        //   var self = this;
        //   self.info.employee.organizeID = data.organizeID;
        //   self.orgDisplayName = data.text;
        // },
        loadData() {
            var self = this;
            // if (userName) {
            //     self.processShow = true;
            //     store.actions.setLoadParams(this.timeCondition, userName);
            //     store.actions.loadHuagongPayMonthReport(function(data) {
            //         self.rowTotal = true;
            //         self.processShow = false;
            //         self.$nextTick(() => {
            //             self.$refs.report.refresh();
            //         })
            //     }, function(error) {
            //         self.processShow = false;
            //     }, this.timeCondition, userName);
            // } else {
                if (store.actions.checkConditions3()) {
                    if (self.state.flag) {
                        self.processShow = true;
                        store.actions.setLoadParams(this.timeCondition, this.userName);
                        store.actions.loadHuagongPayMonthReport(function(data) {
                            self.rowTotal = true;
                            self.processShow = false;
                            self.$nextTick(() => {
                                self.$refs.report.refresh();
                            })
                        }, function(error) {
                            self.processShow = false;
                        }, this.timeCondition, this.userName);
                    } else {
                        Vue.Tool.showTip({
                            type: 'danger',
                            msg: '开始时间大于结束时间',
                            duration: 1000
                        });
                    }
                }
            // }
        },
    },
    ready() {
        store.actions.loadOrgListTree();
        this.processShow = false;
    },
    watch: {
        'state.startTime' () {
            if (Vue.Tool.iDate(this.state.startTime).time > Vue.Tool.iDate(this.state.endTime).time) {
                Vue.Tool.showTip({
                    type: 'danger',
                    msg: '开始时间大于结束时间',
                    duration: 1000
                });

                store.actions.ResetTime(false);
            } else {
                store.actions.ResetTime(true);
            }
        },
        'state.endTime' () {
            if (Vue.Tool.iDate(this.state.startTime).time > Vue.Tool.iDate(this.state.endTime).time) {
                Vue.Tool.showTip({
                    type: 'danger',
                    msg: '开始时间大于结束时间',
                    duration: 1000
                });
                store.actions.ResetTime(false);
            } else {
                store.actions.ResetTime(true);
            }
        }
    },
    created() {

    },
    events: {
        orgReady() {
            this.loadData();
        },
        // 'searchAtt' (userName) {
        //     this.userName = userName;
        //     this.loadData(userName)
        // },
        'toggleSearchBar'(){
          this.toggleSearchBar=!this.toggleSearchBar;
        },
        'exportFnhg' () {
            console.log(45654564)
            this.$refs.report.exportExcel('工资发放报表','工资单');
        }
    }
}
</script>
<style scoped>
.wrap {
    position: absolute;
    overflow: hidden;
    left: 20px !important;
    top: 140px !important;
    right: 20px !important;
    bottom: 20px !important;
}
.none{
  position: absolute;
  overflow: hidden;
  left: 20px !important;
  top: 0px !important;
  right: 20px !important;
  bottom: 20px !important;
}
.releaseBtn {
    position: absolute;
    bottom: 20px;
    left: 50%;
    margin-left: -100px;
}

.date-search,
.date-search2 {
    width: 880px;
    height: 40px;
    margin: 10px 0 20px;
}

.date-search ul li {
    float: left;
    margin-left: 10px;
}

.tree-box li,
.tree-wrap li,
.none li {
    float: none !important;
    margin-left: 0 !important
}

.date-search ul li p,.date-search2 ul li p{
    float: left;
    height: 40px;
    line-height: 40px;
    margin: 0 10px;
}

.combo-tree-box {
    margin-left: 70px;
}

.num-count {
    padding: 50px;
}

.city-store {
    overflow: hidden;
}

.city-store p,
.new-store p {
    float: left;
    width: 160px;
}

.city-store p b,
.city-store p span,
.new-store p b,
.new-store p span {
    display: block;
    text-align: center;
    color: #3f3c59;
}

.city-store p b {
    font-size: 30px;
}

.city-store p span,
.new-store p span {
    color: #737373;
}

.new-store {
    overflow: hidden;
    margin-top: 30px;
}

.new-store p b {
    display: box;
    display: -webkit-box;
    display: -moz-box;
    box-sizing: border-box;
    width: 70px;
    height: 70px;
    border-radius: 70px;
    border: 3px solid #ff484a;
    margin: 0 auto 10px;
    font-size: 30px;
    -webkit-box-pack: center;
    -moz-box-pack: center;
    -webkit-box-align: center;
    -moz-box-align: center;
}

p {
    margin: 0 !important;
}
.username div p{
  width:200px;
  height:42px;
  border:1px solid rgba(34, 36, 38, 0.15);
  border-radius: 3px;
  line-height: 0 !important;
  padding: 0 3px;
}
.username div p input{
  border:none;
  width:100%;
  height:38px;
  outline: inherit;
}
</style>
