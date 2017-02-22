<!--
* @Created Date       : 2016-12-02T11:08:37+08:00
* @Last Modified time : 2016-12-02T16:13:09+08:00
 -->
<template>
    <!-- 模块主内容 -->
    <section class="ui-module-content pos-content app-schedule-week" :class="{isFullscreen:baseState.fullscreen}">

        <div class="ui-module-row ui-panel app-schedulebody">

            <div class="text-center" style="position: relative;">
                <div class="pull-left" style="margin-right: 20px;">
                    <div class="btn-group btn-dropgroup" style="margin-right: 20px;">

                        <!-- 周 -->
                        <template v-if="state.dateType=='month' ? false :true">
                            <button type="button" class="btn btn-default" @click="changeWeek(-1)"><i class="icon-tool icon-tool-keyboardarrowleft" style="font-size:14px;"></i></button>
                            <v-dropdown  btngroup="btn-group">
                                <button type="button" class="btn btn-default _dateList" data-toggle="dropdown">
                                    {{duration}}
                                    <span class="caret"></span>
                                </button>
                                <ul name="dropdown-menu" class="dropdown-menu">
                                    <li v-for="date in state.durationList" class="{{date.isNow ? 'currentDuration' : ''}}"><a name="dropdown-item" class="dropdown-item" href="javascript:;"  @click="selectStartDate" date="{{date.start}}-{{date.end}}">{{date.startCN}}-{{date.endCN}}  (第{{date.week}}周)</a></li>
                                </ul>
                            </v-dropdown>
                            <button type="button" class="btn btn-default" @click="changeWeek(1)"><i class="icon-tool icon-tool-keyboardarrowright" style="font-size:14px;"></i></button>
                        </template>
                        <!-- 月 -->
                        <template v-else>
                            <button type="button" class="btn btn-default" @click="changeMonth(-1)"><i class="icon-tool icon-tool-keyboardarrowleft" style="font-size:14px;"></i></button>
                            <v-dropdown  btngroup="btn-group">
                                <button type="button" class="btn btn-default _dateList" data-toggle="dropdown">
                                    {{monthNow}}
                                    <span class="caret"></span>
                                </button>
                                <ul name="dropdown-menu" class="dropdown-menu" style="text-align: center;">
                                    <li><a name="dropdown-item" class="dropdown-item" href="javascript:;"  @click="selectStartMonth(-12)" >上一年</a></li>
                                    <li v-for="i in yearLen"><a name="dropdown-item" class="dropdown-item" href="javascript:;"  @click="selectStartMonth(i+1)" >{{yearNow}}年{{i | getMonth}}月</a></li>
                                    <li><a name="dropdown-item" class="dropdown-item" href="javascript:;"  @click="selectStartMonth(13)" >下一年</a></li>
                                </ul>
                            </v-dropdown>
                            <button type="button" class="btn btn-default" @click="changeMonth(1)"><i class="icon-tool icon-tool-keyboardarrowright" style="font-size:14px;"></i></button>
                        </template>


                    </div>


                    <button v-if="state.dateType=='month' ? false :true" type="button" class="btn btn-default" @click="changeWeek(0)">回到本周</button>
                    <button v-else type="button" class="btn btn-default" @click="changeMonth(0)">回到本月</button>
                </div>

                <div class="pull-left">

                    <!-- 部门 -->
                    <v-dropdown v-if="!$route.query.storeID && $route.params.type=='department'" class="pull-left">
                        <button type="button" class="btn btn-default" data-toggle="dropdown" style="width:200px;">
                            {{deptName=='' ? '请选择部门':deptName}}
                            <span class="caret"></span>
                        </button>
                        <ul name="dropdown-menu" class="dropdown-menu"  style="max-height: 300px; overflow: hidden; overflow-y: auto;">
                            <ui-scrollview>
                                <ui-treeshow
                                    :treedata="baseState.orgList.dept"
                                    :selectedvalue.sync="deptValue"
                                    :selectedname.sync="deptName"
                                    :callback="deptSelect"
                                    rootid="-1"
                                    idprop="ID"
                                    parentidprop="parentID"
                                    nameprop="departmentName"
                                    valueprop="ID"
                                >
                                </ui-treeshow>
                            </ui-scrollview>
                        </ul>
                    </v-dropdown>

                    <!-- 门店 -->
                    <v-dropdown v-if="!$route.query.storeID && $route.params.type=='store'" class="pull-left" :dropdownvalue.sync="storeValue" :dropdownname.sync="storeName">
                        <button type="button" class="btn btn-default" data-toggle="dropdown" style="width:200px;">
                            {{storeName=='' ? '请选择门店':storeName}}
                            <span class="caret"></span>
                        </button>
                        <ul name="dropdown-menu" class="dropdown-menu">
                            <li v-for="item in baseState.orgList.store"><a name="dropdown-item" class="dropdown-item" href="javascript:;" dropdown-value="{{item.ID}}" @click="storeSelect(item.ID)" >{{item.storeName}}</a></li>
                        </ul>
                    </v-dropdown>

                </div>

                <div class="pull-right">
                    <button v-else type="button" class="btn btn-default" @click="toggleFullscreen">{{baseState.fullscreen ? '关闭全屏' : '全屏排班'}}</button>
                </div>

            </div>

            <!-- 排班表 -->

            <ui-table class="tableDays" v-ref:table height="auto" :loading="tableLoading">

                <template slot="headerLockedFirst">

                    <table class="table table-bordered">
                        <colgroup>
                            <col width="100px"></col>
                            <col width="100px"></col>
                            <col width="100px"></col>
                        </colgroup>
                        <thead class="ui-table-headerInfo" v-if="$route.params.group!='manager'">
                            <!-- 预估排班人数 -->
                            <tr v-if="$route.params.type=='store'">
                                <th colspan="3">预估人数(人/天)</th>
                            </tr>
                            <!-- 实际排班人数 -->
                            <tr>
                                <th colspan="3">实际排班人数(人/天)</th>
                            </tr>
                        </thead>
                        <thead>
                            <tr>
                                <th v-if="$route.params.type=='department'" >部门</th>
                                <th v-if="$route.params.type=='store'" >门店小组</th>
                                <th>姓名</th>
                                <th>岗位</th>
                            </tr>
                        </thead>
                    </table>
                </template>
                <template slot="headerNormal">

                    <table class="table table-bordered">
                        <colgroup>
                            <col v-for="i in state.dateLength" width="110px"></col>
                        </colgroup>
                        <thead class="ui-table-headerInfo" v-if="$route.params.group!='manager'">
                            <!-- 预估排班人数 -->
                            <tr v-if="$route.params.type=='store'">
                                <th class="peopelCountCell" v-for="i in state.dateLength">
                                    {{ state.requiredNumber.day | getRequireCount state.workTimeDays[i].time}}
                                </th>
                            </tr>
                            <!-- 实际排班人数 -->
                            <tr>
                                <th class="peopelCountCell" v-for="i in state.dateLength">
                                    {{ state.workDataDaysActualNumber[i] | countActualNumber}}
                                </th>

                            </tr>

                        </thead>
                        <thead>
                            <!-- 日期 -->
                            <tr>
                                <th class="tableDate" v-for="i in state.dateLength" @click="selectDay(state.workTimeDays[$index].time)">
                                    <div :class="{'_weekday':state.workTimeDays[$index].week=='周六' || state.workTimeDays[$index].week=='周日' ? true :false}">
                                        <span class="_week">{{state.workTimeDays[$index].week}}</span>
                                        <span class="_weather"><i class="icon-weather {{$root.state.weatherData[state.workTimeDays[$index].date] && $root.state.weatherData[state.workTimeDays[$index].date].icon}}"></i></span>
                                        <br>
                                        <span class="_date">{{state.workTimeDays[$index].date}}</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </template>
                <template slot="headerLockedLast">
                    <table class="table table-bordered">
                        <colgroup>
                            <col width="130px"></col>
                            <!-- <col width="130px"></col> -->
                        </colgroup>
                        <thead class="ui-table-headerInfo" v-if="$route.params.group!='manager'">
                            <tr v-if="$route.params.type=='store'">
                                <th></th>
                            </tr>
                            <tr>
                                <th></th>
                            </tr>
                        </thead>
                        <thead>
                            <tr>
                                <!-- <th class="text-center">累积工时（时）</th> -->
                                <th class="text-center">实休/应休（天）</th>
                            </tr>
                        </thead>
                    </table>
                </template>

                <template slot="bodyLockedFirst">

                    <table class="table table-bordered">
                        <colgroup>
                            <col width="100px"></col>
                            <col width="100px"></col>
                            <col width="100px"></col>
                        </colgroup>
                        <tbody>
                            <!-- 部门 -->
                            <tr v-if="state.orgType=='department'" v-for="people in state.workDayByRow | limitBy state.personPagenation.perpage state.personPagenation.currentindex">
                                <td style="overflow: hidden!important;" class="departmentCell" v-if="$index==0?true:false" rowspan="{{state.workDayByRow.length}}">
                                    <span v-if="$route.params.type=='department'">{{people.deptName}}</span>
                                    <span v-if="$route.params.type=='store'">{{people.storeName}}</span>
                                </td>
                                <td style="overflow: hidden!important;" title="{{people.userName}}">
                                    <span>{{people.userName}}</span>
                                </td>
                                <td style="overflow: hidden!important;" title="{{people.postName}}">
                                    <span>{{people.postName}}</span>
                                </td>
                            </tr>

                            <!-- 门店小组 -->
                            <tr v-if="state.orgType=='store'" v-for="people in state.workDayByRow | limitBy state.personPagenation.perpage state.personPagenation.currentindex">
                                <td style="overflow: hidden!important;" class="departmentCell" title="{{people.teamName}}" >
                                    <span>{{people.teamName}}</span>
                                </td>

                                <td style="overflow: hidden!important;" title="{{people.userName}}">
                                    <span>{{people.userName}}</span>
                                </td>
                                <td style="overflow: hidden!important;" title="{{people.postName}}">
                                    <span>{{people.postName}}</span>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </template>
                <template slot="bodyNormal">

                    <table class="table table-bordered">
                        <colgroup>
                            <col v-for="i in state.dateLength" width="110px"></col>
                        </colgroup>
                        <tbody class="ui-table-body" @mousedown="mousedown" @mouseover="mouseover" @mouseout="mouseout" @mouseup="mouseup" @contextmenu="contextmenu">

                            <tr v-for="people in state.workDayByRow | limitBy state.personPagenation.perpage state.personPagenation.currentindex" v-html="createTD(people,$index,state.personPagenation.perpage)">
                            </tr>

                        </tbody>
                    </table>
                </template>
                <template slot="bodyLockedLast">

                    <table class="table table-bordered">
                        <colgroup>
                            <col width="130px"></col>
                            <col width="130px"></col>
                        </colgroup>
                        <tbody>
                            <tr v-for="people in state.workDayByRow | limitBy state.personPagenation.perpage state.personPagenation.currentindex">
                                <!-- 周排班 显示休息日 -->
                                <!-- <td class="text-center">{{people.totalWorkHour}}时</td> -->
                                <td class="text-center">{{people.totalRest}}天/{{state.config.holiday}}天</td>
                            </tr>
                        </tbody>
                    </table>
                </template>

                <template slot="footer">

                    <div class="ui-table-pager-content">
                        <!--  -->
                        <div class="text-center pull-right">
                            <button __code="schedule-menu-clear/清空本次排班" class="btn btn-default" style="margin-right:20px;" @click="clearSchedule">清空本次排班</button>
                            <button __code="schedule-menu-smart/一键智能排班" class="btn btn-default" style="margin-right:20px;" @click="showSmartScheduleModal=true">一键智能排班</button>
                            <ui-button __code="schedule-menu-save/保存排班表" color="success" @click="saveSchedule" class="large">保存排班表</ui-button>
                        </div>

                        <ui-pagination
                            class="pull-left"
                            active="success"
                            :total="state.personPagenation.total"
                            :perpage.sync="state.personPagenation.perpage"
                            :current.sync="state.personPagenation.current"
                            :currentindex.sync="state.personPagenation.currentindex"
                            :pages = "state.personPagenation.pages"
                            :nobg = "true"
                            :change = "tableChange"
                        >
                        </ui-pagination>


                    </div>
                </template>

            </ui-table>

            <div class="ui-table-status-wrap" v-if="state.scheduleStatusShow"><div class="ui-table-status _{{state.scheduleStatus}}"></div></div>

            <!-- 导出excel -->
            <div id="excelTable" style="display:none;" >
            <table class="table table-bordered disableSelect workTable">
                <tbody v-html="exportWorkClass(3)">

                    <!-- <tr v-for="citem in baseState.workClass" v-show="citem.type-0==state.workClassType-0 ? (state.exportWorkClass.day.indexOf(citem.ID+'')>-1 ?true :false) :false"> -->
                    <!-- <tr v-for="citem in baseState.workClass" v-show="citem.valid==0 ? false : true">
                            <td colspan="3" :style="{'background':citem.bgcolor,'color':citem.fontcolor,border:'2px solid #fff'}" align="center">
                                {{citem.name}}{{citem.valid==0?'【已删除】':''}}
                            </td>
                            <td colspan="3">
                                <span v-for="time in citem.time">【 {{time}} 】</span>
                            </td>
                    </tr> -->

                    <!-- <tr v-for="citem in baseState.workClass" v-show="citem.valid==1?(citem.type-0==state.workClassType-0 ?true :false):false">
                        <td colspan="3" :style="{'background':citem.bgcolor,'color':citem.fontcolor,border:'2px solid #fff'}" align="center">
                            {{citem.name}}
                        </td>
                        <td colspan="3">
                            <span v-for="time in citem.time">【 {{time}} 】</span>
                        </td>
                    </tr> -->
                </tbody>
                <tbody>
                    <tr>
                        <td colspan="3"></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <table class="table table-bordered disableSelect workTable" v-if="initExportExcel" >
                <thead>
                    <tr>
                        <th colspan="3" class="table-cell-1" v-if="$route.params.type=='department'">部门排班</th>
                        <th colspan="3" class="table-cell-1" v-if="$route.params.type=='store'">门店排班</th>
                        <th class="tableDate" v-for="i in state.dateLength" @click="selectDay(state.workTimeDays[$index].time)">
                            {{state.workTimeDays[$index].date}}  {{state.workTimeDays[$index].week}}
                        </th>
                        <th class="table-cell-last"></th>
                        <th class="table-cell-last"></th>
                    </tr>
                </thead>
                <!-- <tbody v-if="$route.params.type=='store'">
                    <tr>
                        <td colspan="3" class="peopelCountCell">预估人数</td>
                        <td class="peopelCountCell" v-for="i in state.dateLength">
                            {{ state.requiredNumber.day | getRequireCount state.workTimeDays[i].time}}
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody> -->
                <tbody>
                    <tr>
                        <td colspan="3" class="peopelCountCell">实际人数</td>
                        <td class="peopelCountCell" v-for="i in state.dateLength">
                            {{ state.workDataDaysActualNumber[i] | countActualNumber}}
                        </td>
                        <td>预估休息</td>
                        <td>累积休息</td>
                    </tr>
                </tbody>
                <tbody @mousedown="mousedown" @mouseover="mouseover" @mouseout="mouseout" @mouseup="mouseup" @contextmenu="contextmenu">
                    <!-- 部门 -->
                    <template v-if="state.orgType=='department'">
                        {{{createExportTR('department')}}}
                    </template>
                    <!-- 门店 -->
                    <template v-if="state.orgType=='store'">
                        {{{createExportTR('store')}}}
                    </template>
                </tbody>
            </table>
            </div>
            <!-- 导出excel end -->

            <!-- 菜单 -->
            <ul id="rightMenu" class="rightMenu dropdown-menu">
                <li class="dropdown-submenu">
                    <a tabindex="-1" href="javascript:;">班次</a>
                    <ul class="dropdown-menu" @click.stop="eSelectWorkClass">
                        <li class="searchWorkClassBox">
                            <input @input="filterWorkClass" v-model="filterValue" class="searchWorkClass" type="text" placeholder="搜索 例如9空格12">
                            <button @click="clearFilterWorkClass" class="searchWorkClassBtn">清空</button>
                        </li>
                        <li v-for="item in baseState.workClassFilted" v-show="item.valid==1?(item.type-0==state.workClassType-0 ?true :false):false">
                            <a href="javascript:;" workTime="{{item.ID}}" workTimeType="{{item.timeType}}" >{{item.name}}: [<template v-for="t in item.time">{{$index==0?'':'-'}}{{t}}</template>]</a>
                        </li>
                        <li><a id="btAddCustomWork" href="javascript:;">自定义</a></li>
                        <!-- <li><a id="btAddOffDay" href="javascript:;">休息</a></li> -->
                    </ul>
                </li>
                <li><a href="javascript:;" @click.stop="eCopy">复制</a></li>
                <li><a href="javascript:;" @click.stop="ePaste">粘贴</a></li>
                <li><a href="javascript:;" @click.stop="eCrop">剪切</a></li>
                <li><a href="javascript:;" @click.stop="eClear">清空</a></li>
            </ul>

            <!-- 自定义班次 modal -->
            <ui-modal header="自定义班次" :show.sync="showAddCustomWorkModal" >

                <div style="padding-left:20px;">跨天时段格式：[23:00](今天&gt;24:00) 大于 [05:00](明天&lt;00:00) <br>支持存在一个跨天时间段</div>
                <ul class="customList" style="padding-top: 0px;">
                    <li v-for="citem in state.customWorkClass" class="customItem">
                        工作时段{{$index+1}}  ：
                        <ui-timepicker :time.sync="citem.startTime"></ui-timepicker>
                        <ui-timepicker :time.sync="citem.endTime"></ui-timepicker>
                        <button type="button" class="btn btn-default" @click="customWorkCtrl('delete',$index)">删除</button>
                    </li>
                </ul>
                <div style="padding-left: 20px;">
                    <button class="btn btn-default" @click="customWorkCtrl('add')">增加时段</button>
                </div>

                <div slot="footer" class="text-center">
                    <ui-button @click="customWorkCtrl('submit')" color="success">确定添加</ui-button>
                </div>
            </ui-modal>
            <!-- 智能排班介绍 -->
            <ui-modal header="提示" :show.sync="showSmartScheduleModal" >

                <div class="smartTip">
                <p>智能排班能够基于预估需求人数，预估营业额和排班规则等信息帮助您一键快速排班，提高工作效率。敬请期待吧！</p>
                </div>
                <div slot="footer" class="text-center">
                    <ui-button @click="showSmartScheduleModal=false" color="success">确定</ui-button>
                </div>
            </ui-modal>
        </div>

        <ui-modal :show.sync="showImportModal" header="导入排班数据" >
            <div class="import-modal">
                <ui-simpleupload
                    url="api.schedule.importDataDay"
                    fileparam="file"
                    uploading-msg="导入进度"
                    :params="{deptID:state.deptID,storeID:state.storeID,group:state.orgGroupID}"
                    :complete="importDataDayComplete"
                    filetype="xls,xlsx"
                    >
                </ui-simpleupload>
                <div class="text-center">
                    <ui-button v-if="uploaded" color="success" @click="$emit('close')">确定</ui-button>
                </div>
            </div>
            <div slot="footer" class="footer text-center"></div>
        </ui-modal>

    </section>

</template>

<script>
import storeCom from '../store';
import store from '../store_service.js';
import EventListener from 'libs/utils/EventListener'

import 'libs/exportExcel.js';

let is_mousedown = false;
let selectedList = {
    order:[]
};
//已选元素列表
let selectedData = {
    order:[]
};
//缓存数据，用于复制，黏贴，剪切
let selectedCurrent;

export default {

    data(){
        return {
            baseState:storeCom.state,
            state:store.state,
            showAddCustomWorkModal:false,
            showSmartScheduleModal:false,
            initExportExcel:false,
            table:{},

            deptValue:'',
            deptName:'',

            storeValue:'',
            storeName:'',

            // orgType:'',
            // orgGroup:'',

            tableLoading:false,

            yearLen:12,

            showImportModal:false,

            hasAttached:false,   // 标记当前视图是否显示

            filterValue:'', //班次筛选

        }
    },

    attached(){

        this.hasAttached = true;

        console.error('attached')

        // 初始化状态
        this.setInitStatus();
        store.actions.resetDateStart();

        // 排班设置已更改则init
        // console.error(this.$root.state.secheduleConfigChanged)
        if(this.$root.state.secheduleConfigChanged){
            this.$root.state.secheduleConfigChanged = false;
            store.actions.hideHours(true);
            store.actions.init();
            return;
        }

        // 更新周排班数据
        if(this.state.toUpdateDay){
            store.actions.initWorkData();

            this.$nextTick(function(){
                store.state.toUpdateDay = false;
                this.$refs.table && this.$refs.table.refresh();
            })

        }

        store.actions.hideHours(true);
        // store.actions.setRouteFromWeek(false);

        this.$nextTick(function(){
            this.$refs.table && this.$refs.table.refresh();
        })


    },
    detached(){
        this.hasAttached = false;
        this.clearFilterWorkClass();
    },
    ready() {
        // store.actions.setRouteFromWeek(false);

        // 初始化状态
        this.setInitStatus();

        store.actions.init();

        this.$nextTick(function(){
            this.$refs.table && this.$refs.table.refresh();
        })

        // 点击其他地方隐藏TD右键菜单
        const rightMenu = this.$el.querySelector('#rightMenu');
        this._closeEvent = EventListener.listen(window, 'mouseup', (e) => {
            if (!rightMenu.contains(e.target) && (e.target.tagName != 'TD' || e.target.getAttribute('edit') != 'able')) {
                this.showRightmenu(false)
            }
        })
    },
    beforeDestroy() {
        // 销毁window.mouseup 事件
        if (this._closeEvent) this._closeEvent.remove()
    },
    events:{

        // 监听搜索
        searchByUserName(data){

            if(!this.hasAttached) return;


            if(this.hasEditedOfDay()) return;

            if(data=='' || this.state.userName == data) return;

            this.state.userName = data;

            console.log(data)

            store.actions.init(false,false,false,true);

            this.$nextTick(function(){
                this.$refs.table && this.$refs.table.refresh();
            })

        },
        // 清空搜索数据
        clearSearch(){
            this.state.userName = '';
            this.baseState.searchInput = '';
            this.clearSchedule();
        },

        // 监听导出excel
        toDownloadExcel(){

            if(!this.hasAttached) return;

            if (this.state.orgType == 'department' && this.state.deptID == '' || this.state.orgType == 'store' && this.state.storeID == '') {
                this.$root.showTip({
                    type: 'warning', // 提示类型 success,warning,info,danger
                    msg: '请先选择要导出的部门或者门店', // 提示文字
                    duration: 3000 // 自动消失时间
                })
                return;
            }

            if(this.$route.params.type==this.state.orgType && this.$route.params.group==this.state.orgGroup && !this.$route.query.storeID){
                this.initExportExcel = true;

                let name = this.state.orgType=='department' ? '部门' :(this.state.orgGroup=='manager' ? '管理组' : '服务组');
                this.$nextTick(function(){
                    var excelTable = this.$el.querySelector('#excelTable').innerHTML;

                    exportExcel({
                        html: excelTable,
                        style: '',
                        sheetName: '排班表',
                        fileName: name + '排班表'+ (this.state.dateType=='month' ? this.monthNow : this.duration)
                    })
                })

            }

        },

        // 监听提审
        toSubmitSechedule(){

            if(!this.hasAttached) return;


            if(this.hasEditedOfDay()) return;

            if(!!this.$route.query.storeID){

                this.$root.showTip({
                    type: 'warning', // 提示类型 success,warning,info,danger
                    msg: '只能提审月排班或周排班数据', // 提示文字
                    duration: 3000 // 自动消失时间
                })
                return;
            }

            if(this.$route.params.type==this.state.orgType && this.$route.params.group==this.state.orgGroup){

                store.actions.submitSechedule();

            }

        },
        // 导出数据模板
        toExportDataTpl(){

            if(!this.hasAttached) return;


            if (this.state.orgType == 'department' && this.state.deptID == '' || this.state.orgType == 'store' && this.state.storeID == '') {
                this.$root.showTip({
                    type: 'warning', // 提示类型 success,warning,info,danger
                    msg: '请先选择要导出的部门或者门店', // 提示文字
                    duration: 3000 // 自动消失时间
                })
                return;
            }

            if(this.$route.params.type==this.state.orgType && this.$route.params.group==this.state.orgGroup && !this.$route.query.storeID){
                let name = this.state.orgType=='department' ? '部门' :(this.state.orgGroup=='manager' ? '管理组' : '服务组'),
                    startDate = this.$root.Tool.iDate(this.state.dateStart,'yymmdd'),
                    endDate = this.$root.Tool.iDate(this.state.dateStart,'yymmdd',this.state.dateLength-1),
                    fileName = `${name}排班数据模板`,
                    params = `fileName=${fileName}&group=${this.state.orgGroupID}&deptID=${this.state.deptID}&storeID=${this.state.storeID}&startDate=${startDate.string}&endDate=${endDate.string}&type=day`
                ;

                this.$root.downloadFile('acewill/schedule/scheduleday/export.htm', encodeURI(params));

                return;
            }


        },
        // 导入排班数据
        toImportData(){

            if(!this.hasAttached) return;

            if (this.state.orgType == 'department' && this.state.deptID == '' || this.state.orgType == 'store' && this.state.storeID == '') {
                this.$root.showTip({
                    type: 'warning', // 提示类型 success,warning,info,danger
                    msg: '请先选择要导出的部门或者门店', // 提示文字
                    duration: 3000 // 自动消失时间
                })
                return;
            }

            if(this.$route.params.type==this.state.orgType && this.$route.params.group==this.state.orgGroup && !this.$route.query.storeID){
                this.showImportModal = true;
            }

        },
        //

    },
    components: {
    },

    props:{
        // type:'week'
    },

    computed:{

        // 是否周排班
        timeWeek:function(){
            // /////console.log.log(this.$data.state.type)
            if(this.$data.state.type=='week'){
                return true
            }
        },
        // 是否日排班
        timeDay:function(){
            // /////console.log.log(this.$data.state.type)
            if(this.$data.state.type=='day'){
                return true
            }
        },
        // 时间段计算
        duration:function(){

            var today = new Date(this.$data.state.dateStart);

            ///console.log.log(today)

            var nextDay = new Date(today.getTime()+(1000*60*60*24*6));

            return today.getFullYear()+'年'+(today.getMonth()+1)+'月'+today.getDate()+'日-'+(nextDay.getMonth()+1)+'月'+nextDay.getDate()+'日'

            // 2016年3月15日—3月22日（第8周）

        },
        // 当前月份
        monthNow(){

            var today = new Date(this.$data.state.dateStart);

            return today.getFullYear()+'年'+(today.getMonth()+1)+'月'

        },
        yearNow(){
            var today = new Date(this.$data.state.dateStart);

            return today.getFullYear()
        }

    },

    filters:{
        getMonth(i){
            return i+1<10?'0'+(i+1):i+1;
        },
        // 班次style
        workStyle:function(workDataDays){

            if(!workDataDays) return '';

            return workDataDays.workClass;

        },

        // 班次Name
        workName:function(workDataDays){

            if(!workDataDays) return '';

            return workDataDays.workName;

        },

        // 班次是否可编辑
        workEditalbe:function(workDataDays){

            if(!workDataDays) return 'able';

            return workDataDays.editable;

        },
        // 计算实际人数
        countActualNumber:function(workDataDaysActualNumber){


            let n = 0;

            for(var i in workDataDaysActualNumber){

                var dayData = workDataDaysActualNumber[i];

                // /////console.log.log(dayData.workTimeType,dayData.workTime)

                if(dayData.workTime!='' && dayData.workTimeType!='' && dayData.workTimeType-0!=3 && dayData.workTimeType-0!=4){
                    n++;
                }


            }

            return n;

        },
        // 所需人数
        getRequireCount(data,day){

            var id = 'date_'+day;

            if(data[id]){
                return data[id].personCount
            }else{
                return '';
            }

        }

    },
    methods:{

        exportWorkClass(colNum){
            return store.actions.exportWorkClass(colNum);
        },

        // 导入完成后刷新
        importDataDayComplete(){
            store.actions.initWorkData();
            store.mutations.SethasEditedOfDay(false);
        },

        // 设置初始化状态，必须在init之前执行
        setInitStatus() {

            if (this.$route.params.type == 'department') {
                this.orgType = 'department';
                this.orgGroup = 'department';
            } else if (this.$route.params.group == 'manager') {
                this.orgType = 'store';
                this.orgGroup = 'manager'
            } else if (this.$route.params.group == 'service') {
                this.orgType = 'store';
                this.orgGroup = 'service'
            }

            // 设置当前状态
            store.actions.setStatusNow({
                type:'week',
                orgType:this.orgType,
                orgGroup:this.orgGroup,
            });

        },
        // 清空尚未保存的排班数据
        clearSchedule(){
            store.actions.initWorkData();
            store.mutations.SethasEditedOfDay(false);
        },

        // 检查周排班数据是否被修改，如果被修改，则提示保存
        hasEditedOfDay(){

            if(store.state.hasEditedOfDay){
                this.$root.showTip({
                    type:'error',
                    msg:'此排班表您已修改，请先保存排班表'
                })

                return true;
            }

            return false;

        },
        // 刷新table
        tableChange(){
            this.$nextTick(function() {
                this.$refs.table && this.$refs.table.refresh()
            })
        },

        // 选择部门
        deptSelect(){
            if(this.hasEditedOfDay()) return;
            this.$parent.clearSearchStatus();
            store.actions.clearSearch();
            store.actions.setOrgData('department',this.deptValue);
            store.actions.init(false,false,false,true,this);
            // this.refreshTable()
        },
        // 选择门店
        storeSelect(value){
            if(this.hasEditedOfDay()) return;
            store.actions.setOrgData('store',value);
            store.actions.init(false,false,false,true,this);
            // this.refreshTable()
        },

        selectStartMonth(i){
            var monthNow = this.$Tool.iDate(this.$data.state.dateStart,'yymmdd').m;
            store.actions.changeMonth(i-monthNow);
        },

        // 切换月份
        changeMonth(n){

            if(this.hasEditedOfDay()) return;

            store.actions.changeMonth(n);

            // 清空，且关闭右键
            this.unSelectAll();
            this.showRightmenu(false)
        },
        // 切换周
        changeWeek(n){

            if(this.hasEditedOfDay()) return;

            store.actions.changeWeek(n);

            // 清空，且关闭右键
            this.unSelectAll();
            this.showRightmenu(false)
        },
        // 选择时间段
        selectStartDate(evt){

            if(this.hasEditedOfDay()) return;

            var dateStr = evt.srcElement.getAttribute('date')

            store.actions.setStartDate(dateStr.split('-')[0]);

            // 清空，且关闭右键
            this.unSelectAll();
            this.showRightmenu(false)

        },
        // 刷新表格
        refreshTable(){
            this.$nextTick(function(){
                this.$refs.table && this.$refs.table.refresh();
                this.tableLoading = false;
            })
        },

        // 导出表格tr
        createExportTR(type,normal){

            let _this = this;
            let html='';

            if(type=='department'){


                Array.from(this.state.workDayByRow).forEach(function(people,index){

                    let orgName = _this.$route.params.type=='department' ? people.deptName : people.storeName;

                    orgName = orgName || '';

                    html+='<tr>'


                    if(index==0){
                        html+='    <td class="departmentCell" rowspan="'+_this.state.workDayByRow.length+'">'
                        html+='        <span>'+orgName+'</span>'
                        html+='    </td>'
                    }

                    html+='    <td class="departmentCell" align="left">'
                    html+='        <span>'+(people.userName||'')+'</span>'
                    html+='    </td>'
                    html+='    <td class="departmentCell">'
                    html+='        <span>'+(people.postName||'')+'</span>'
                    html+='    </td>'
                    html+=''


                    for(var i=0;i<_this.state.dateLength;i++){
                        var id = 'user'+people.userID+'_date'+_this.state.workTimeDays[i].time;
                        var dayData = _this.state.workDataDays[id] || {};

                        var _class = dayData.workClass || '';
                        var _style = dayData.workStyle || {color:'',bgcolor:''};
                        var _eidtable = dayData.editable || '';
                        var _workName = dayData.workName || '';

                        var _border = _style.bgcolor.length>0 ? 'border:1px solid #fff;' :'';

                        html+='<td id="'+id+'" class="text-center '+_class+'" style="'+_border+'color:'+_style.color+';background:'+_style.bgcolor+';" >'+_workName+'</td>';
                    }

                    html+='    <td>'+people.restTime+'</td>'
                    html+='    <td>'+people.totalRest+'</td>'

                    html+='</tr>'

                });

            }

            if(type=='store'){

                Array.from(this.state.workDayByRow).forEach(function(people,index){


                    html+='<tr>'
                    if(people.isFirst){
                        html+='    <td class="departmentCell" rowspan="'+people.teamLength+'">'
                        html+='        <span>'+(people.teamName||'')+'</span>'
                        html+='    </td>'
                    }
                    html+='    <td class="departmentCell" align="left">'
                    html+='        <span>'+(people.userName||'')+'</span>'
                    html+='    </td>'
                    html+='    <td class="departmentCell">'
                    html+='        <span>'+(people.postName||'')+'</span>'
                    html+='    </td>'
                    html+=''


                    for(var i=0;i<_this.state.dateLength;i++){
                        var id = 'user'+people.userID+'_date'+_this.state.workTimeDays[i].time;
                        var dayData = _this.state.workDataDays[id] || {};

                        var _class = dayData.workClass || '';
                        var _style = dayData.workStyle || {color:'',bgcolor:''};
                        var _eidtable = dayData.editable || '';
                        var _workName = dayData.workName || '';

                        var _border = _style.bgcolor.length>0 ? 'border:1px solid #fff;' :'';

                        html+='<td id="'+id+'" class="text-center '+_class+'" style="'+_border+'color:'+_style.color+';background:'+_style.bgcolor+';" >'+_workName+'</td>';
                    }

                    html+='    <td>'+people.restTime+'</td>'
                    html+='    <td>'+people.totalRest+'</td>'

                    html+='</tr>'

                });


            }

            return html;

        },

        // 批量创建TDhtml ,解决性能问题
        createTD(people,trIndex,trTotal){

            console.warn('createTDDay',trIndex,trTotal)

            /*
            <td v-for="i in state.dateLength" id="{{'user'+people.userID+'_date'+state.workTimeDays[i].time}}"  :class="state.workDataDays['user'+people.userID+'_date'+state.workTimeDays[i].time] | workStyle" :edit="state.workDataDays['user'+people.userID+'_date'+state.workTimeDays[i].time] | workEditalbe">
                {{{ state.workDataDays['user'+people.userID+'_date'+state.workTimeDays[i].time] | workName }}}
            </td>
             */

            var html='';
            for(var i=0;i<this.state.dateLength;i++){
                var id = 'user'+people.userID+'_date'+this.state.workTimeDays[i].time;
                var dayData = this.state.workDataDays[id] || {};

                var _class = dayData.workClass || '';
                var _style = dayData.workStyle || {color:'',bgcolor:''};
                var _eidtable = dayData.editable || '';
                var _disableText = dayData.disableText || '';
                var _workName = dayData.workName || '';
                var _workNameHtml = (dayData.workNameHtml && dayData.workNameHtml.length>1) ? dayData.workNameHtml : _workName;

                let infoStr='';
                let holidayStr = '';

                dayData.holiday && dayData.holiday.forEach(item=>{
                    holidayStr+=`<li>
                        <div><span>${item.leaveType}</span><span>${item.leaveTime}${item.danwei}</span></div>
                        <div>开始时间：${item.startTime}</div>
                        <div>结束时间：${item.endTime}</div>
                    </li>`
                })

                let busTripStr = '';

                dayData.busTrip && dayData.busTrip.forEach(item=>{
                    busTripStr+=`<li>
                        <div>出差<span>${item.time}${item.danwei}</span></div>
                        <div>开始时间：${item.startTime}</div>
                        <div>结束时间：${item.endTime}</div>
                    </li>`
                })

                if(!!holidayStr || !!busTripStr){
                    let pos = this.state.dateLength-i<=3 ? '_left ' : '_right ';

                    pos += trIndex>=2 && trTotal-trIndex<=3 ? '_top' : '_bottom';

                    infoStr=`<div class="_holiday ${pos}">
                        <span>${(holidayStr && busTripStr) ? '事' : (holidayStr ? '假' : '差')}</span>
                        <ul>
                            ${holidayStr}
                            ${busTripStr}
                        </ul>
                    </div>`
                }

                let trIndexClass = trTotal-trIndex<=2 ? '_top' : '';

                html+=`<td id="${id}" class="text-center ${_class} ${trIndexClass}" style="color:${_style.color};background:${_style.bgcolor};" edit="${_eidtable}" disableText="${_disableText}"><div class="_className">${_workNameHtml}</div>${infoStr}</td>`;
            }

            return html;

        },

        // 设置展示格式 按月 按周
        setDateType(type){
            store.actions.setDateType(type);

            this.$nextTick(function(){
                this.$refs.table && this.$refs.table.refresh();
            })
        },


        // 点击日期，进入当天的日排班
        selectDay(date){

            // 检查周排班数据是否被修改，如果被修改，则提示保存后进入日排版

            if(this.hasEditedOfDay()) return;

            console.log(store.state.orgGroup)

            if(store.state.orgGroup!='service' || (this.state.workDayByRow.length==0)) return;

            //
            // ///console.log.log('--------------------'+this.state.storeID)

            this.$router.go({
                path:'/Schedule/service/store/service/24',
                query:{
                    date:date,
                    storeID:this.state.storeID || '000'
                }
            });

            // 标注此次路由跳转为人为操作，从week到day，state中有 workDataDays 数据
            store.actions.setRouteFromWeek(true);

            // 记录当前开始日期，以备返回时重新赋值
            store.actions.recorderDateStart();


        },

        // 保存排班
        saveSchedule(){

            store.actions.submitWorkDataOfDays();

        },

        // 显隐右键菜单
        showRightmenu(show,x,y){

            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;

            var rightmenu = this.$el.querySelector('#rightMenu');

            if(!rightmenu) return;

            var subMenu = rightmenu.getElementsByTagName('ul')[0];

            // ///console.log.log(scrollLeft)

            if(show){

                rightmenu.style.display = 'block';

                x = x-scrollLeft || 0;
                y = y-scrollTop || 0;

                // ///console.log.log(rightmenu.clientWidth)
                // ///console.log.log(document.body.offsetWidth)
                // ///console.log.log(x+rightmenu.offsetWidth*2)

                // 判断是否子菜单被遮挡 左右
                if(document.body.offsetWidth<(x+rightmenu.offsetWidth+250)){
                    subMenu.style.left='auto'
                    subMenu.style.right='100%'
                }else{
                    subMenu.style.left='100%'
                    subMenu.style.right='auto'
                }
                // 上下


                subMenu.style.display = 'block';


                var menuH = rightmenu.offsetHeight > subMenu.offsetHeight ? rightmenu.offsetHeight :subMenu.offsetHeight;
                subMenu.style.display = '';


                ///console.log.log(document.body.offsetHeight-scrollTop)
                ///console.log.log(y+menuH)

                if(document.body.offsetHeight-scrollTop<y+menuH){
                    subMenu.style.top='auto'
                    subMenu.style.bottom=-(rightmenu.offsetHeight-30)+'px'
                }else{
                    subMenu.style.top='-100%'
                    subMenu.style.bottom='auto'
                }



                rightmenu.style.left = x+'px';
                rightmenu.style.top=y+'px';

            }else{
                rightmenu.style.display = 'none';
            }

        },

        // cell是否已选
        hasSelected(el){
            if(!el) return;

            // /////console.log.log(el.getAttribute('selected'))

            return el.getAttribute('selected')=='true'?true:false
        },
        // 选择
        selectCell(el){

            if(!el) return;

            // /////console.log.log(el.tagName)

            el.className = el.className.replace('cellSelected','')+' cellSelected';
            el.setAttribute('selected',true);
            selectedList[el.getAttribute('id')] = el;
            selectedList.order.push(el.getAttribute('id'));
            selectedCurrent = el;
        },
        // 取消选择
        unselectCell(el){

            if(!el) return;

            let id = el.getAttribute('id');
            el.className = el.className.replace('cellSelected','');
            el.setAttribute('selected',false)
            delete selectedList[id]


            var order = selectedList.order.concat([])

            for(let i=0,len=order.length;i<len;i++){
                if(order[i]==id){

                    selectedList.order.splice(i,1);

                    return;
                }
            }

        },
        // 清空选择
        unSelectAll(){

            // 清空已选


            var order = selectedList.order.concat([])

            for(let i=0,len=order.length;i<len;i++){

                var id = order[i];

                this.unselectCell(selectedList[id]);
            }

            // selectedList = {
            //  order:[]
            // }

            // /////console.log.log(selectedList)
        },

        // 清空已选数据
        clearSelectData(id){

            if(!selectedList[id]) return;

            // selectedList[id].innerHTML = '';  !!!!! 切记，不能直接操作innerHTml，回造成vue dom绑定失效

        },

        // 屏蔽右键
        contextmenu(evt){
            window.event.returnValue=false;
            return false;
        },
        // down
        mousedown(evt){

            is_mousedown = true;
            // /////console.log.log(evt)
            // let el = evt.target.tagName==='TD' ? evt.target : (evt.target.parentNode.tagName==='TD' ? evt.target.parentNode : evt.target);
            let el = evt.target;


            if((el.tagName=='TD') && el.getAttribute('edit')=='disable'){

                this.$root.showTip({
                    type: 'warning', // 提示类型 success,warning,info,danger
                    msg: el.getAttribute('disableText') || '已过期不可编辑', // 提示文字
                    duration: 1000 // 自动消失时间
                })

            }

            else if((el.tagName=='TD') && el.getAttribute('edit')=='able'){

                this.unSelectAll();
                this.showRightmenu(false);


                // 屏蔽右键点选元素
                if (evt.button == 2) {

                    if(!selectedCurrent) return false;

                    if(this.hasSelected(el)){
                        this.showRightmenu(true,evt.pageX+10,evt.pageY-15);
                    }else{
                        this.showRightmenu(false)
                    }

                    return false;
                }

                // 点选新元素暂时关闭菜单
                this.showRightmenu(false);

                // 左键
                if(this.hasSelected(el)){
                    this.unselectCell(el);
                }else{
                    this.selectCell(el);
                }

            }else{
                this.showRightmenu(false);
            }

        },
        // over
        mouseover(evt){
            if(!is_mousedown) return;

            // /////console.log.log('over')
            // let el = evt.target.tagName==='TD' ? evt.target : (evt.target.parentNode.tagName==='TD' ? evt.target.parentNode : evt.target);
            let el = evt.target;

            if((el.tagName=='TD') && el.getAttribute('edit')=='able'){

                if(!!this.hasSelected(el)){
                    this.unselectCell(el);
                }else{
                    /////console.log.log('s')
                    this.selectCell(el);
                }

            }

        },
        // out
        mouseout(evt){
            if(!is_mousedown) return;

            // /////console.log.log('out')
            // let el = evt.target.tagName==='TD' ? evt.target : (evt.target.parentNode.tagName==='TD' ? evt.target.parentNode : evt.target);
            let el = evt.target;

            if((el.tagName=='TD') && el.getAttribute('edit')=='able'){

            }

        },
        // up
        mouseup(evt){

            is_mousedown = false;

            if (evt.button == 2) {
                return false;
            }

            // /////console.log.log('up')
            // let el = evt.target.tagName==='TD' ? evt.target : (evt.target.parentNode.tagName==='TD' ? evt.target.parentNode : evt.target);
            let el = evt.target;

            if((el.tagName=='TD') && el.getAttribute('edit')=='able'){

                // /////console.log.log(evt.pageX,evt.pageY,evt.offsetX,evt.offsetY)

                if(this.hasSelected(selectedCurrent)){
                    this.showRightmenu(true,evt.pageX+10,evt.pageY-15);
                }else{
                    this.showRightmenu(false)
                }

            }

        },


        // 自定义班次 操作
        customWorkCtrl(type,data){

            // 增加自定义班次 时间段
            if(type=='add'){
                store.actions.editCustomWork('add',{
                    startTime:'00:00',
                    endTime:'00:00'
                });
            }
            else if(type=='delete'){

                /////console.log.log(///console.log)

                var index = data;
                store.actions.editCustomWork('delete',{},index);
            }
            // 关闭
            else if(type=='close'){
                this.$data.showAddCustomWorkModal = false;
            }
            // 显示
            else if(type=='show'){
                this.$data.showAddCustomWorkModal = true;
            }
            // 提交自定义班次
            else if(type=='submit'){


                var workTime = [];

                let timeList = storeCom.actions.filterMutliWorkTime(this.state.customWorkClass);

                if(!timeList || timeList.length==0) return;
                timeList.forEach(time=>{
                    workTime.push(time.startTime+'/'+time.endTime)
                });

                // 开始按选择顺序添加
                for(let i=0,len=selectedList.order.length;i<len;i++){

                    var id = selectedList.order[i];

                    store.actions.editWorkDataDaysByID('add',{
                        workTimeType:2,
                        workTime:JSON.stringify(workTime)
                    },id)

                }

                /////console.log.log(/////console.log.log)


                this.customWorkCtrl('close');

                this.unSelectAll();
                this.showRightmenu(false)


                /////console.log.log(/////console.log.log)


            }
        },

        // 筛选班次
        filterWorkClass(){
            storeCom.actions.filterWorkClass(this.filterValue);
        },
        // 清空筛选
        clearFilterWorkClass(){
            this.filterValue = '';
            storeCom.actions.clearFilterWorkClass();
        },

        // 添加选择班次
        eSelectWorkClass(evt){

            // 搜索框
            if(evt.target.className==='searchWorkClass' || evt.target.className==='searchWorkClassBtn'){
                return;
            }

            // 显示自定义班次
            if(evt.target.id=='btAddCustomWork'){

                this.customWorkCtrl('show')

            }
            // 休息
            else if(evt.target.id=='btAddOffDay'){

                // 开始按选择顺序添加
                for(let i=0,len=selectedList.order.length;i<len;i++){

                    var id = selectedList.order[i];

                    store.actions.editWorkDataDaysByID('add',{
                        workTimeType:3,
                        workTime:''
                    },id)

                }

                this.unSelectAll();
                this.showRightmenu(false)

            }
            else{
            // 固定班次
                var workTime = evt.target.getAttribute('workTime')+'';
                var workTimeType = evt.target.getAttribute('workTimeType')+'';

                // /////console.log.log()

                if(!workTime || !workTimeType) return;

                // 开始按选择顺序添加
                for(let i=0,len=selectedList.order.length;i<len;i++){

                    var id = selectedList.order[i];

                    store.actions.editWorkDataDaysByID('add',{
                        workTimeType:workTimeType,
                        workTime:workTime
                    },id)

                }

                this.unSelectAll();
                this.showRightmenu(false)
            }
        },

        // 复制班次
        eCopy(evt,disUnselect){

            selectedData = {
                order :[]
            }

            // 开始按选择顺序复制
            for(let i=0,len=selectedList.order.length;i<len;i++){

                var id = selectedList.order[i];
                // 从store获取数据
                var data = store.actions.getWorkDataByID(id,{
                    workTimeType:'',
                    workTime:''
                })

                /////console.log.log(data)

                // 缓存数据及顺序
                selectedData[id] = {
                    workTimeType:data.workTimeType,
                    workTime:data.workTime
                }
                selectedData.order.push(id)

            }

            /////console.log.log(selectedData)

            // 如果不禁止清空，则执行清空
            if(!disUnselect){
                this.unSelectAll();
                this.showRightmenu(false)
            }


        },
        // 粘贴班次
        ePaste(evt){


            if(selectedData.order.length==0){
                alert('请先复制数据')
                return;
            }

            // 如果复制了一条数据，则循环粘贴到所有已选元素
            if(selectedData.order.length==1){

                var dataOne = selectedData[selectedData.order[0]];


                // 开始按选择顺序粘贴
                for(let i=0,len=selectedList.order.length;i<len;i++){

                    var id = selectedList.order[i];

                    store.actions.editWorkDataDaysByID('update', {
                        workTimeType: dataOne.workTimeType,
                        workTime: dataOne.workTime
                    }, id)

                }


            }
            // 多行数据，按照缓存数据，顺序复制
            else if(selectedData.order.length>1){

                // 开始按缓存顺序粘贴
                for(let i=0,len=selectedData.order.length;i<len;i++){

                    var currentID = selectedData.order[i];
                    var dataOne = selectedData[currentID];

                    /////console.log.log(dataOne)

                    var targetID = selectedList.order[i];

                    /////console.log.log('targetID——'+targetID)

                    if(!!targetID){
                        store.actions.editWorkDataDaysByID('update', {
                            workTimeType: dataOne.workTimeType,
                            workTime: dataOne.workTime
                        }, targetID)
                    }


                }

            }

            this.unSelectAll();
            this.showRightmenu(false)
        },
        // 剪切班次
        eCrop(evt){

            // 先copy
            this.eCopy(false,true);
            // 再清空
            this.eClear();
        },
        // 清空班次
        eClear(evt){

            for(let i=0,len=selectedList.order.length;i<len;i++){

                var id = selectedList.order[i];
                this.clearSelectData(id); // 清空数据
                store.actions.editWorkDataDaysByID('delete',{
                    workTimeType: '',
                    workTime: ''
                },id);

            }

            this.unSelectAll();
            this.showRightmenu(false)

        },

        // 全屏
        toggleFullscreen(){
            this.baseState.fullscreen=!this.baseState.fullscreen;
            this.$nextTick(function(){
                this.$refs.table && this.$refs.table.refresh();
            })
        }

    },

}
</script>
