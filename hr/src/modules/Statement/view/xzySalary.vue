<!--
* @Created Date       : 2016-11-11T10:09:04+08:00
* @Last Modified time : 2016-12-23T12:46:32+08:00
 -->


<template>
<div style="background: #fff;">
    <div class="date-search" v-if='toggleSearchBar'>
        <ul>
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

            <li style="float:left;margin-left:10px;">
                <p>岗位名称：</p>
                <div style="float:left;">
                    <v-select :options="state.postNameList" :value.sync="state.postNameListVal" :multiple="true" placeholder="请选择岗位名称" overflow="hidden" style="width:200px;">
                    </v-select>
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
        <ui-report v-ref:report :column-total=false :data-list="state.xzyPayReportList" :titles="state.xzyTitles" :row-total="rowTotal" :group-infos="groupColumns" :total-ignore='totalIgnore' :progress-show="processShow" :multi-titles="multiTitles" :lorder="lorder" :td-height="70">
        </ui-report>
    </div>
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
            toggleSearchBar: true,
            userName: '',
            rowTotal: false,
            processShow: true,
            timeCondition: 'month',
            orgTypeList: '',
            //固定分组
            groupColumns: ['serialNum', 'suiteName', 'userNum', 'userName'],
            lorder: ['date'],
            totalIgnore: ['startTime', 'userIDCard','银行代码','银行账号'],
            //多表头
            multiTitles: []
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

        nodeClicked(data) {
            store.actions.setOrgDisplayName(data);
        },
        loadData() {
            var self = this;
            if (store.actions.checkConditions3()) {
                if (self.state.flag) {
                    self.processShow = true;
                    store.actions.setLoadParams(this.timeCondition, this.userName);
                    store.actions.loadxzyPayReport(function(data) {
                        self.rowTotal = true;
                        self.processShow = false;
                        self.$nextTick(() => {
                            self.$refs.report.refresh();
                        })
                        console.log(self.state.xzyPayReportList)
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
        },
    },
    ready() {
        store.actions.loadOrgListTree();
        store.actions.loadPostNameList();
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
        'toggleSearchBar' () {
            this.toggleSearchBar = !this.toggleSearchBar;
        },
        'exportFnxzy' () {
            this.$refs.report.exportExcel('工资发放报表', '工资单');
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

.none {
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

.date-search ul li p,
.date-search2 ul li p {
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

.username div p {
    width: 120px;
    height: 42px;
    border: 1px solid rgba(34, 36, 38, 0.15);
    border-radius: 3px;
    line-height: 0 !important;
    padding: 0 3px;
}

.username div p input {
    border: none;
    width: 100%;
    height: 38px;
    outline: inherit;
}
</style>
