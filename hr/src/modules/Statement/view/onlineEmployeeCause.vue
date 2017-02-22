<!--
* @Created Date       : 2016-10-12T15:01:43+08:00
* @Last Modified time : 2016-11-24T16:05:37+08:00
 -->


<template>
<div style="background: #fff;">
    <div class="date-search">
        <ul>
            <li>
                <p>时间条件：</p>
                <div style="float:left;width:120px;">
                    <select class="form-control" v-model="timeCondition">
                      <option v-for="item in state.timeCondition" :value="item.value" :selected="item.value==timeCondition">{{item.codeName}}</option>
                    </select>
                </div>
            </li>
            <li v-if="timeDay">
                <p>开始时间：</p>
                <ui-datepicker format="yyyy-MM-dd" :time.sync="state.startTime" width="120px"></ui-datepicker>
            </li>
            <li v-if="timeDay">
                <p>结束时间：</p>
                <ui-datepicker format="yyyy-MM-dd" :time.sync="state.endTime" width="120px"></ui-datepicker>
            </li>
            <li v-if="timeMonth">
                <p>开始时间：</p>
                <ui-datepicker format="yyyy-MM" show-type="mm" :time.sync="state.startTime" width="120px"></ui-datepicker>
            </li>
            <li v-if="timeMonth">
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
    <div class="date-search">
        <ul>
            <li style="float:right">
                <ui-button color="primary " @click="loadData()" style="margin-left: 10px;background:#0ed185;width:82px !important;height:40px;border-radius:3px !important;">查询</ui-button>
            </li>
            <li>
                <p>组织类型：</p>
                <div style="float:left;width:120px;">
                    <select class="form-control" v-model="orgTypeList" @change="orgTypeChange(orgTypeList)">
              <option v-for="item in state.orgTypeList" :value="item.orgCode" :selected="item.orgCode==orgTypeList">{{item.orgName}}</option>
            </select>
                </div>
            </li>
            <li>
                <p>组织名称：</p>
                <div style="float:left;width:120px;">
                    <v-select :options="state.orgNameList" :value.sync="state.orgNameListVal" :multiple="true" placeholder="请选择组织名称" overflow="hidden" style="width:200px;">
                    </v-select>
                </div>
            </li>
        </ul>
    </div>
    <div class="wrap">
        <div class="tab_header">
            <h2>分析维度：</h2>
            <div class='radio_box'>
                <ui-radio name="tab" value="1" :model.sync="tab" label="员工籍贯" checked></ui-radio>
                <ui-radio name="tab" value="2" :model.sync="tab" label="员工年龄"></ui-radio>
                <ui-radio name="tab" value="3" :model.sync="tab" label="员工文化程度"></ui-radio>
                <ui-radio name="tab" value="4" :model.sync="tab" label="员工职级"></ui-radio>
            </div>
        </div>
        <div class="tab_content_list">
            <div v-if="tab == 1" class="tab_content_1">
                <ui-report v-ref:report :column-total="true" :data-list="state.onlineEmployeeNativeAgeAnalysisReportDataList" :titles="titles" :multi-titles="multiTitles" :row-total="rowTotal" :group-infos="groupColumns" :total-ignore='totalIgnore' :progress-show="processShow"
                    :lorder="lorder" :td-height="70">
                </ui-report>
            </div>
            <div v-if="tab == 2" class="tab_content_2">
                <ui-report v-ref:report :column-total="true" :data-list="state.onlineEmployeeAgeAnalysisReportDataList" :titles="titles2" :multi-titles="multiTitles" :row-total="rowTotal2" :group-infos="groupColumns" :total-ignore='totalIgnore' :progress-show="processShow"
                    :lorder="lorder" :td-height="70">
                </ui-report>
            </div>
            <div v-if="tab == 3" class="tab_content_3">
                <ui-report v-ref:report :column-total="true" :data-list="state.onlineEmployeeEducationAgeAnalysisReportDataList" :titles="state.onlineEmployeeEducationAgeAnalysisReportTitleList" :multi-titles="multiTitles" :row-total="rowTotal3" :group-infos="groupColumns"
                    :total-ignore='totalIgnore' :progress-show="processShow" :lorder="lorder" :td-height="70">
                </ui-report>
            </div>
            <div v-if="tab == 4" class="tab_content_4">
                <ui-report v-ref:report :column-total="true" :data-list="state.onlineEmployeeRankAnalysisReportDataList" :titles="state.onlineEmployeeRankAnalysisReportTitleList" :multi-titles="multiTitles" :row-total="rowTotal4" :group-infos="groupColumns" :total-ignore='totalIgnore'
                    :progress-show="processShow" :lorder="lorder" :td-height="70">
                </ui-report>
            </div>
        </div>

    </div>
    <!-- <ui-button color="success" @click="exportFn()" class="large releaseBtn">导出</ui-button> -->
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
            multiTitles: [],
            userName:'',
            groupColumns: [],
            rowTotal: true,
            rowTotal2: true,
            rowTotal3: true,
            rowTotal4: true,
            processShow: true,
            timeMonth: false,
            timeDay: true,
            tab: '',

            titles: [{
                name: "orgName",
                title: "组织名称",
                width: '300px'
            }, {
                name: "anhui",
                title: "安徽",
            }, {
                name: "beijing",
                title: "北京",
            }, {
                name: "chongqin",
                title: "重庆",
            }, {
                name: "fujian",
                title: "福建",
            }, {
                name: "ganshu",
                title: "甘肃",
            }, {
                name: "guangdong",
                title: "广东",
            }, {
                name: "guangxi",
                title: "广西",
            }, {
                name: "guizhou",
                title: "贵州",
            }, {
                name: "hainan",
                title: "海南",
            }, {
                name: "hebei",
                title: "河北",
            }, {
                name: "heilongjiang",
                title: "黑龙江",
            }, {
                name: "henan",
                title: "河南",
            }, {
                name: "hubei",
                title: "湖北",
            }, {
                name: "hunan",
                title: "湖南",
            }, {
                name: "jiangsu",
                title: "江苏",
            }, {
                name: "jiangxi",
                title: "江西",
            }, {
                name: "jiling",
                title: "吉林",
            }, {
                name: "liaoning",
                title: "辽宁",
            }, {
                name: "neimenggu",
                title: "内蒙古",
            }, {
                name: "ningxia",
                title: "宁夏",
            }, {
                name: "qinghai",
                title: "青海",
            }, {
                name: "shandong",
                title: "山东",
            }, {
                name: "shanghai",
                title: "上海",
            }, {
                name: "shanxi",
                title: "陕西",
            }, {
                name: "sichuan",
                title: "四川",
            }, {
                name: "tianjing",
                title: "天津",
            }, {
                name: "xinjiang",
                title: "新疆",
            }, {
                name: "xizang",
                title: "西藏",
            }, {
                name: "yunnan",
                title: "云南",
            }, {
                name: "zhejiang",
                title: "浙江",
            }],
            titles2: [{
                name: "orgName",
                title: "组织名称",
                width: '300px'
            }, {
                name: "oneAge",
                title: "16~19",
            }, {
                name: "twoAge",
                title: "20~23",
            }, {
                name: "threeAge",
                title: "24~25",
            }, {
                name: "fourAge",
                title: "26~27",
            }, {
                name: "fiveAge",
                title: "28~30",
            }, {
                name: "sixAge",
                title: "31~35",
            }, {
                name: "sevenAge",
                title: "36~40",
            }],


            timeCondition: 'day',
            orgTypeList: '',
            compare: false,
            groupColumns: ['orgName'],
            lorder: ['userName', 'date'],
            totalIgnore: ['date', 'userNum']
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
            store.actions.setOrgDisplayName(data);
        },
        loadData(userName) {
            var self = this;
            if (store.actions.checkConditions()) {
                if (self.state.flag) {
                    self.processShow = true;
                    store.actions.setLoadParams(this.timeCondition, userName);
                    store.actions.loadOnlineEmployeeNativeAgeAnalysisReport(function(data) {
                        self.rowTotal = true;
                        self.processShow = false;
                        self.$nextTick(() => {
                            self.$refs.report.refresh();
                        })
                    }, function(error) {
                        self.processShow = false;
                    }, this.timeCondition, userName);
                    store.actions.setLoadParams(this.timeCondition, userName);
                    store.actions.loadOnlineEmployeeAgeAnalysisReport(function(data) {
                        self.rowTotal = true;
                        self.processShow = false;
                        self.$nextTick(() => {
                            self.$refs.report.refresh();
                        })
                    }, function(error) {
                        self.processShow = false;
                    }, this.timeCondition, userName);
                    store.actions.setLoadParams(this.timeCondition, userName);
                    store.actions.loadOnlineEmployeeEducationAgeAnalysisReport(function(data) {
                        self.rowTotal = true;
                        self.processShow = false;
                        self.$nextTick(() => {
                            self.$refs.report.refresh();
                        })
                    }, function(error) {
                        self.processShow = false;
                    }, this.timeCondition, userName);
                    store.actions.setLoadParams(this.timeCondition, userName);
                    store.actions.loadOnlineEmployeeRankAgeAnalysisReport(function(data) {
                        self.rowTotal = true;
                        self.processShow = false;
                        self.$nextTick(() => {
                            self.$refs.report.refresh();
                        })
                    }, function(error) {
                        self.processShow = false;
                    }, this.timeCondition, userName);

                } else {
                    Vue.Tool.showTip({
                        type: 'danger',
                        msg: '开始时间大于结束时间',
                        duration: 1000
                    });
                }
            }
        },
    },
    ready() {
        this.processShow = false;
    },
    watch: {
        'timeCondition' (data) {
            if (data == 'day') {
                this.timeMonth = false;
                this.timeDay = true;
            } else {
                this.timeMonth = true;
                this.timeDay = false;
            }
        },
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
    attached() {


    },
    created() {

    },
    events: {
        orgReady() {
            this.loadData();
        },
        'searchAtt' (userName) {
          this.userName=userName;
            this.loadData(userName)
        },
        'exportFnOnline' () {
            if (store.actions.checkConditions()) {
                if (this.state.flag) {
                    store.actions.setLoadParams(this.timeCondition, this.userName);
                    this.$nextTick(function() {
                        var param = Object.keys(this.state.searchFor).map((item) => {
                            if (item != 'userName') {
                                return item + "=" + this.state.searchFor[item];
                            }
                        }).join('&');
                        if (this.tab == '1') {

                            window.location.href = Vue.__Basepath + 'acewill/common/exportOnlineEmployeeNativeAnalysisReport.htm?' + param;
                        } else if (this.tab == '2') {
                            window.location.href = Vue.__Basepath + 'acewill/common/exportOnlineEmployeeAgeAnalysisReport.htm?' + param;

                        } else if (this.tab == '3') {
                            window.location.href = Vue.__Basepath + 'acewill/common/exportOnlineEmployeeEducationAnalysisReport.htm?' + param;

                        } else if (this.tab == '4') {
                            window.location.href = Vue.__Basepath + 'acewill/common/exportOnlineEmployeeRankAnalysisReport.htm?' + param;
                        }
                    })

                }
            }
        }
    }
}
</script>
<style scoped>
.releaseBtn {
    position: absolute;
    bottom: 20px;
    left: 50%;
    margin-left: -100px;
}

.date-search {
    width: 880px;
    /*overflow: hidden;*/
}

.date-search {
    height: 40px;
    margin: 10px 0 20px;
}

.date-search ul li {
    float: left;
    margin-left: 10px;
}

.date-search ul li p {
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

.tab_header {
    height: 35px;
    background: #5d677c;
    margin: 0 10px;
    border-radius: 5px 5px 0 0;
}

.tab_header h2 {
    float: left;
    margin: 0;
    padding: 0;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    text-indent: 20px;
    color: #fff;
}

.tab_header .radio_box {
    float: left;
    margin-left: 20px;
}

.tab_header .radio_box .ui-radio {
    margin-top: 7px;
    color: #fff;
}
</style>
