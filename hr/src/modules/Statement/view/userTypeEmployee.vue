<!--
* @Created Date       : 2016-10-12T15:01:43+08:00
* @Last Modified time : 2016-11-24T16:06:04+08:00
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
            <!-- <li>
                <p>用工类型：</p>
                <div style="float:left;width:120px;">
                    <v-select :options="state.userTypes" :value.sync="state.userTypeVal" :multiple="true" placeholder="请选择用工类型" overflow="hidden" style="width:200px;">
                    </v-select>
                </div>
            </li> -->
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
        <ui-report v-ref:report :data-list="state.userTypeEmployeeNumberReportDataList" :titles="state.userTypeEmployeeNumberReportTitleList" :multi-titles="multiTitles" :row-total="rowTotal" :group-infos="groupColumns" :total-ignore='totalIgnore' :progress-show="processShow"
            :lorder="lorder" :column-total="true" :td-height="70">
        </ui-report>
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
            userName: '',
            groupColumns: [],
            rowTotal: false,
            processShow: true,
            timeMonth: false,
            timeDay: true,

            titles: [{
                name: "orgName",
                title: "组织名称",
                width: '300px'
            }, {
                name: "total",
                title: "合计",
            }, ],

            timeCondition: 'day',
            orgTypeList: '',
            compare: false,
            groupColumns: ['orgName'],
            lorder: [],
            totalIgnore: []
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

        nodeClicked(data) {
            store.actions.setOrgDisplayName(data);
        },
        loadData(userName) {
            var self = this;
            this.state.userTypeVal = [1]
            if (store.actions.checkConditions()) {
                if (self.state.flag) {
                    self.processShow = true;
                    store.actions.setLoadParams(this.timeCondition, userName);
                    store.actions.loadUserTypeEmployeeNumberReport(function(data) {
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
            this.userName = userName;
            this.loadData(userName)
        },
        'exportFnType' () {
            if (store.actions.checkConditions2()) {
                if (this.state.flag) {
                    store.actions.setLoadParams(this.timeCondition, this.userName);
                    this.$nextTick(function() {
                        var param = Object.keys(this.state.searchFor).map((item) => {
                            if (item != 'userName') {
                                return item + "=" + this.state.searchFor[item];
                            }
                        }).join('&');
                        window.location.href = Vue.__Basepath + 'acewill/common/exportUserTypeEmployeeNumberReport.htm?' + param;
                    })
                }
            }

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
</style>
