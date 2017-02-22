<!--
* @Created Date       : 2016-09-28T11:12:27+08:00
* @Last Modified time : 2016-12-02T16:49:51+08:00
 -->
<template>
<!-- 模块主内容 -->
<section class="ui-module-content pos-content demoShow">
    <div class="ui-module-row">
        <!--  -->
        <div class="com-col-m1-left ui-panel">
            <div class="demi-analy-wrap">
                <div class="report-title" v-if="orgReportTitle">
                    <i :class="toggleOrg?'icon-tool icon-tool-keyboardarrowdown':'icon-tool icon-tool-keyboardarrowright'" @click="toggleOrg = !toggleOrg"></i>
                    <!--keyboard_arrow_down  keyboard_arrow_right -->
                    <h2 >组织与员工</h2>
                </div>
                <ul v-el:org-report-list v-show="toggleOrg">
                    <li __code="commonreport-dimiCount/离职人数统计" @click="anaTabFn" data-index="0" :class="{'cur-bg':selectedTabIndex==0}"><i class="icon-tool icon-tool-arrowRight"></i><a href="javascript:void(0)">离职人数统计</a></li>
                    <li __code="commonreport-leaveCause/离职员工分析" @click="anaTabFn" data-index="1" :class="{'cur-bg':selectedTabIndex==1}"><i class="icon-tool icon-tool-arrowRight"></i><a href="javascript:void(0)">离职员工分析</a></li>
                    <li __code="commonreport-move/员工异动报表" @click="anaTabFn" data-index="2" :class="{'cur-bg':selectedTabIndex==2}"><i class="icon-tool icon-tool-arrowRight"></i><a href="javascript:void(0)">员工异动统计</a></li>
                    <li __code="commonreport-userType/用工类型人数统计" @click="anaTabFn" data-index="3" :class="{'cur-bg':selectedTabIndex==3}"><i class="icon-tool icon-tool-arrowRight"></i><a href="javascript:void(0)">用工类型人数统计</a></li>
                    <li __code="commonreport-leaveRate/离职率" @click="anaTabFn" data-index="4" :class="{'cur-bg':selectedTabIndex==4}"><i class="icon-tool icon-tool-arrowRight"></i><a href="javascript:void(0)">离职率</a></li>
                    <li __code="commonreport-onlineCause/在职员工分析" @click="anaTabFn" data-index="5" :class="{'cur-bg':selectedTabIndex==5}"><i class="icon-tool icon-tool-arrowRight"></i><a href="javascript:void(0)">在职员工分析</a></li>
                    <li __code="commonreport-employeeCount/员工人数统计" @click="anaTabFn" data-index="6" :class="{'cur-bg':selectedTabIndex==6}"><i class="icon-tool icon-tool-arrowRight"></i><a href="javascript:void(0)">员工人数统计</a></li>
                </ul>
                <div class="report-title" v-if="attendanceReportTitle">
                    <i :class="toggleAtd? 'icon-tool icon-tool-keyboardarrowdown':'icon-tool icon-tool-keyboardarrowright'" @click="toggleAtd = !toggleAtd"></i>
                    <h2 >考勤</h2>
                </div>

                <ul v-el:attendance-report-list v-show="toggleAtd">
                    <li __code="mwreport-day/出勤日报表" @click="anaTabFn" data-index="7" :class="{'cur-bg':selectedTabIndex==7}"><i class="icon-tool icon-tool-arrowRight"></i><a href="javascript:void(0)">出勤日报表</a></li>
                    <li __code="mwreport-month/出勤月报表" @click="anaTabFn" data-index="8" :class="{'cur-bg':selectedTabIndex==8}"><i class="icon-tool icon-tool-arrowRight"></i><a href="javascript:void(0)">月考勤明细报表</a></li>
                    <li __code="xzyreport-day/出勤日报表" @click="anaTabFn" data-index="12" :class="{'cur-bg':selectedTabIndex==12}"><i class="icon-tool icon-tool-arrowRight"></i><a href="javascript:void(0)">新煮意出勤日报表</a></li>
                    <li __code="xzyreport-month/出勤月报表" @click="anaTabFn" data-index="13" :class="{'cur-bg':selectedTabIndex==13}"><i class="icon-tool icon-tool-arrowRight"></i><a href="javascript:void(0)">新煮意月考勤明细报表</a></li>
                    <li __code="mwreport-reCard/补签卡记录" @click="anaTabFn" data-index="9" :class="{'cur-bg':selectedTabIndex==9}"><i class="icon-tool icon-tool-arrowRight"></i><a href="javascript:void(0)">补签卡记录</a></li>
                    <!-- <li @click="anaTabFn(9)" :class="{'cur-bg':selectedTabIndex==9}"><i class="icon-tool icon-tool-arrowRight"></i><a href="javascript:void(0)">打卡记录报表</a></li> -->
                </ul>
                <div class="report-title"  v-if="salaryReportTitle">
                    <i :class="togglePay? 'icon-tool icon-tool-keyboardarrowdown':'icon-tool icon-tool-keyboardarrowright'" @click=togglePay=!togglePay></i>
                    <h2>薪酬</h2>
                </div>

                <ul v-el:salary-report-list v-show="togglePay">
                    <li __code="hgreport-pay/工资发放报表" @click="anaTabFn" data-index="10" :class="{'cur-bg':selectedTabIndex==10}"><i class="icon-tool icon-tool-arrowRight"></i><a href="javascript:void(0)">华工工资发放报表</a></li>
                    <li __code="xzyreport-pay/工资发放报表" @click="anaTabFn" data-index="11" :class="{'cur-bg':selectedTabIndex==11}"><i class="icon-tool icon-tool-arrowRight"></i><a href="javascript:void(0)">新煮意工资发放报表</a></li>
                </ul>
                <!-- __code="xzyreport-pay/工资发放报表" -->
                <!-- <h2 v-if="holidayRulesTitle">假期规则</h2>
          <ul v-el:attendance-report-list>
            <li __code="mwreport-day/假期余额" @click="anaTabFn" data-index="11" :class="{'cur-bg':selectedTabIndex==11}"><i class="icon-tool icon-tool-arrowRight"></i><a href="javascript:void(0)">假期余额</a></li>
          </ul> -->
            </div>
        </div>
        <div class="com-col-m1-middle ui-panel">
            <!-- 缓存已加载组件 减少数据请求次数 -->
            <components :is="what" keep-alive>
            </components>
            <!--<router-view class="main" transition="main" transition-mode="out-in"></router-view>-->
        </div>
    </div>
    <ui-sidecontent :show.sync="bigPostReleaseShow">
        <components :is="bigwhat" v-if="bigPostReleaseShow">
        </components>
    </ui-sidecontent>
</section>
</template>
<script>
import store from '../store';
import dimissionCount from './dimissionCount';
import leaveEmployeeCause from './leaveEmployeeCause';
import moveEmployee from './moveEmployee';
import userTypeEmployee from './userTypeEmployee';
import leaveRateEmployee from './leaveRateEmployee';
import onlineEmployeeCause from './onlineEmployeeCause';
import employeeCount from './employeeCount';
import attendanceDay from './attendanceDay';
import attendanceMonth from './attendanceMonth';
import attendanceDayxzy from './attendanceDayxzy';
import attendanceMonthxzy from './attendanceMonthxzy';
import retroactiveCard from './retroactiveCard';
import huagongSalary from './huagongSalary';
import xzySalary from './xzySalary';
import holidayBalance from './holidayBalance';
export default {
    data() {
        return {
            state: store.state,
            bigPostReleaseShow: false,
            bigwhat: '',
            selectedTabIndex: 0,
            showLoading: false,
            what: '', //动态组件名称
            attendanceReportTitle: false,
            orgReportTitle: false,
            holidayRulesTitle: false,
            salaryReportTitle: false,
            toggleOrg: true,
            toggleAtd:true,
            togglePay:true,
            arrWhat: ['dimissionCount', 'leaveEmployeeCause', 'moveEmployee', 'userTypeEmployee', 'leaveRateEmployee', 'onlineEmployeeCause', 'employeeCount', 'attendanceDay', 'attendanceMonth', 'retroactiveCard', 'huagongSalary', 'xzySalary',
                'attendanceDayxzy', 'attendanceMonthxzy', 'holidayBalance'
            ]
        }
    },
    components: {
        dimissionCount,
        leaveEmployeeCause,
        moveEmployee,
        userTypeEmployee,
        leaveRateEmployee,
        onlineEmployeeCause,
        employeeCount,
        attendanceDay,
        attendanceMonth,
        retroactiveCard,
        holidayBalance,
        huagongSalary,
        xzySalary,
        attendanceDayxzy,
        attendanceMonthxzy
    },
    methods: {
        anaTabFn(event) {
            var target = event.target || event.srcElement;
            var index = target.getAttribute('data-index') || target.parentNode.getAttribute('data-index');
            this.openPage(index);
        },
        openPage(index) {
            this.selectedTabIndex = index;
            this.what = this.arrWhat[index];
            this.$parent.$parent.$broadcast('toggleSearch', this.what)
        },
    },
    watch: {
        'selectedTabIndex' () {
            store.actions.clearSearchConditions();
        }
    },
    events: {
        'exportFn' () {
            var broadcastArray = ['exportFnDimission', 'exportFnCause', 'exportFnMove', 'exportFnType', 'exportFnRate', 'exportFnOnline', 'exportFnCount', 'exportFnDay', 'exportFnMonth', 'exportFnCard', 'exportFnhg', 'exportFnxzy','exportFnDayxzy', 'exportFnMonthxzy','exportFnHoliday']
            this.$broadcast(broadcastArray[this.selectedTabIndex])
            console.log(broadcastArray[this.selectedTabIndex])
        }
    },
    attached() {},
    // events:{
    //   "searchAttAll"(userName){
    //
    //   }
    // },
    ready() {
        var attendanceReportList = this.$els.attendanceReportList;
        var orgReportList = this.$els.orgReportList;
        var salaryReportList = this.$els.salaryReportList;
        this.$nextTick(() => {
            this.orgReportTitle = orgReportList.children.length != 0;
            this.attendanceReportTitle = attendanceReportList.children.length != 0;
            this.salaryReportTitle = salaryReportList.children.length != 0;
            var firstli = this.$el.querySelector('li');
            if (firstli) {
                this.openPage(firstli.getAttribute('data-index'));
            }
        })
    }
}
</script>
<style scoped>

.com-col-m1-left {
    width: 230px !important;
}
.com-col-m1-middle {
    left: 237px !important;
    right: 0 !important;
}

.demi-analy-wrap {
    overflow: hidden;
}
.report-title{
}
.report-title i {
    display: block;
    float: left;
    cursor: pointer;
    vertical-align: middle;
    /*width: 20px;
    height: 20px;

    border-radius: 20px;
    border: 1px solid #959595;
    font-size: 20px!important;
    text-indent: -1px;
    line-height: 20px;*/
    margin-top: 5px;
    margin-right: 5px;
    width: 18px;
    height: 18px;
    border-radius: 18px;
    border: 1px solid #959595;
    font-size: 18px !important;
    text-indent: -1px;
    line-height: 18px;
}

.demi-analy-wrap h2 {
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    margin: 0;
}

.demi-analy-wrap ul li {
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    margin-left: 20px;
    cursor: pointer;
}

.demi-analy-wrap ul li i {
    float: right;
    color: #fff;
    font-size: 12px;
}

.demi-analy-wrap ul li a {
    color: #000000;
    display: block;
    outline: none;
    text-decoration: none;
}

.demi-analy-wrap ul li:hover {
    background: #f3f3f3;
}

.demi-analy-wrap ul li.cur-bg {
    background: #a9adb9;
}

.demi-analy-wrap ul li.cur-bg a {
    color: #fff;
}
</style>
