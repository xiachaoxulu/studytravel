<template>

    <!-- 模块主内容 -->
    <section class="ui-module-content pos-content demoShow" :class="{isFullscreen:baseState.fullscreen}">
        <div class="ui-module-row ui-panel app-schedulebody">

            <div class="text-center clear-both" style="position: relative;">

                <div class="tableHour-title">24小时排班 {{state.daySelected}}</div>

                <div class="pull-left" style="position: relative;" >
                    <button type="button" class="btn btn-default" onclick="javascript:history.go(-1)">返回</button>
                </div>

                <div v-if="false" class="pull-right" style="position: relative;">
                    <v-dropdown placement="dropleft">
                        <button type="button" class="btn btn-default" data-toggle="dropdown" style="width:200px;">
                            查看管理组班次
                            <span class="caret"></span>
                        </button>
                        <div name="dropdown-menu" class="dropdown-menu">

                            <div style="padding: 20px;">
                                <table class="table table-bordered" style="width: 600px; margin-bottom: 0;">
                                    <colgroup>
                                        <col width="100px"></col>
                                        <col width="100px"></col>
                                        <col width="100px"></col>
                                        <col width="300px"></col>
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>姓名</th>
                                            <th>岗位</th>
                                            <th>班次</th>
                                            <th>时间</th>
                                        </tr>
                                    </thead>
                                </table>
                                <div style="max-height:300px; overflow-y: auto; overflow-x: hidden;">
                                    <table class="table table-bordered" style="width: 600px; margin-bottom: 0;">
                                        <colgroup>
                                            <col width="100px"></col>
                                            <col width="100px"></col>
                                            <col width="100px"></col>
                                            <col width="300px"></col>
                                        </colgroup>
                                        <tbody>
                                            <tr v-for="data in state.workDataManagers">
                                                <td>{{data.userName}}</td>
                                                <td>{{data.postName}}</td>
                                                <td>{{data.workName}}</td>
                                                <td>{{data.dateString}} {{formatManagerTime(data.workTimeArray)}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </v-dropdown>
                </div>

                <div class="pull-right" style="position: relative;z-index: 100;" >
                    <button type="button" class="btn btn-default" @click="toggleFullscreen">{{baseState.fullscreen ? '关闭全屏' : '全屏排班'}}</button>
                </div>
                <div class="pull-right" style="position: relative; margin-right: 30px;" >
                    <ui-switch :value.sync="showOverDay">显示跨天排班</ui-switch>
                </div>
            </div>

			<!-- 排班表 -->
            <ui-table v-if="!state.hasHiddenHours" class="tableHours" v-ref:table height="auto" :loading="tableLoading">

                <template slot="headerLockedFirst">

                    <table class="table table-bordered">
                        <colgroup>
                            <col width="100px"></col>
                            <col width="100px"></col>
                            <col width="100px"></col>
                        </colgroup>
                        <thead class="ui-table-headerInfo">
                            <!-- 预估排班人数 -->
                            <tr v-if="$route.params.type=='store'">
                                <th colspan="3">预估人数</th>
                            </tr>
                            <!-- 实际排班人数 -->
                            <tr>
                                <th colspan="3">实际人数</th>
                            </tr>
                        </thead>
                        <thead>
                            <tr>
                                <th>门店小组</th>
                                <th>姓名</th>
                                <th>职位</th>
                            </tr>
                        </thead>
                    </table>
                </template>
                <template slot="headerNormal">
                    <table class="table table-bordered">
                        <colgroup>
                            <col v-for="i in state.hourLength" width="80px"></col>
                        </colgroup>
                        <thead class="ui-table-headerInfo">
                            <!-- 预估排班人数 -->
                            <tr>
                                <td v-for="i in state.hourLength">

                                    {{ state.requiredNumber.hour | getRequireCount state.workTimeHours[i].hour}}

                                </td>
                            </tr>
                            <!-- 实际排班人数 -->
                            <tr>
                                <td v-for="i in state.hourLength">

                                    {{ state.workDataHoursActualNumber[i] | countActualNumber}}

                                </td>
                            </tr>
                        </thead>
                        <thead>
                            <tr v-html="createTimeTD()"></tr>
                        </thead>
                    </table>
                </template>
                <!-- <template slot="headerLockedLast">
                    <table class="table table-bordered">
                        <colgroup>
                            <col width="100px"></col>
                            <col width="100px"></col>
                        </colgroup>
                        <thead class="ui-table-headerInfo">
                            <tr v-if="$route.params.type=='store'">
                                <th colspan="2"></th>
                            </tr>
                            <tr>
                                <th colspan="2"></th>
                            </tr>
                        </thead>
                        <thead>
                            <tr>
                                <th class="text-center">预估休息</th>
                                <th class="text-center">累积休息</th>
                            </tr>

                        </thead>
                    </table>

                </template> -->

                <template slot="bodyLockedFirst">
                    <table class="table table-bordered">
                        <colgroup>
                            <col width="100px"></col>
                            <col width="100px"></col>
                            <col width="100px"></col>
                        </colgroup>
                        <tbody v-if="startRender" @click="openWorkClassMenu">

                            <!-- 部门 -->
                            <tr v-if="state.orgType=='department'" v-for="people in state.workHourByRow | limitBy state.personPagenation.perpage state.personPagenation.currentindex">
                                <td class="departmentCell" v-if="$index==0?true:false" rowspan="{{state.workHourByRow.length}}">
                                    <span v-if="$route.params.type=='department'">{{people.deptName}}</span>
                                    <span v-if="$route.params.type=='store'">{{people.storeName}}</span>
                                </td>
                                <td userid="{{people.userID}}">
                                    {{people.userName}}
                                </td>
                                <td>
                                    <span>{{people.postName}}</span>
                                </td>
                            </tr>

                            <!-- 门店小组 -->
                            <tr v-if="state.orgType=='store'" v-for="people in state.workHourByRow | limitBy state.personPagenation.perpage state.personPagenation.currentindex">

                                <!-- <td class="departmentCell" v-if="people.isFirst" rowspan="{{people.teamLength}}">
                                    <span >{{people.teamName}}</span>
                                </td> -->

                                <td class="departmentCell" >
                                    <span>{{people.teamName}}</span>
                                </td>

                                <td userid="{{people.userID}}">
                                    {{people.userName}}
                                </td>
                                <td>
                                    <span>{{people.postName}}</span>
                                </td>
                            </tr>

                        </tbody>
                    </table>

                </template>
                <template slot="bodyNormal">
                    <table class="table table-bordered">
                        <colgroup>
                            <col v-for="i in state.hourLength" width="80px"></col>
                        </colgroup>
                        <tbody v-if="startRender" class="ui-table-body" @mousedown="mousedown" @mouseover="mouseover" @mouseout="mouseout" @mouseup="mouseup" @contextmenu="contextmenu" v-html="createTbody('normal')">
                        </tbody>
                    </table>
                </template>
                <!-- <template slot="bodyLockedLast">
                    <table class="table table-bordered">
                        <colgroup>
                            <col width="100px"></col>
                            <col width="100px"></col>
                        </colgroup>
                        <tbody v-if="startRender">
                            <tr v-for="people in state.workHourByRow | limitBy state.personPagenation.perpage state.personPagenation.currentindex">
                                <td class="text-center">{{ state.workDataHoursWorkHours[state.personPagenation.currentindex+$index] | countWorkHours}}</td>
                                <td class="text-center">{{ people.totalWorkHour }}</td>
                            </tr>

                        </tbody>
                    </table>

                </template> -->

                <template slot="footer">

                    <div class="ui-table-pager-content">
                        <!--  -->
                        <div class="text-center pull-right">
                        <ui-button color="success" @click="saveSchedule" class="large">保存排班表</ui-button>
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
			<!-- 导出excel -->
			<div id="excelTable" style="display: none;" v-if="initExportExcel && !state.hasHiddenHours">

                <table class="table table-bordered disableSelect workTable">

                    <tbody v-html="exportWorkClass(3)">
                        <!-- <tr v-for="citem in baseState.workClass" v-show="citem.type-0==state.workClassType-0 ? (state.exportWorkClass.hour.indexOf(citem.ID+'')>-1 ?true :false) :false">
                            <td colspan="3" :style="{'background':citem.bgcolor,'color':citem.fontcolor,border:'2px solid #fff'}" align="center">
                                {{citem.name}}{{citem.valid==0?'【已删除】':''}}
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

				<table class="table table-bordered disableSelect workTable">
					<thead>
						<tr v-html="createTimeTD('all')">

						</tr>
					</thead>
					<tbody v-if="$route.params.type=='store'">
						<tr>
							<td colspan="3">预估人数</td>
							<td v-for="i in state.hourLength">
								{{ state.requiredNumber.hour | getRequireCount state.workTimeHours[i].hour}}
							</td>
							<td></td>
							<td></td>
						</tr>
					</tbody>
					<tbody>
						<tr>
							<td colspan="3">实际人数</td>
							<td width="60" align="center" v-for="i in state.hourLength">
								{{ state.workDataHoursActualNumber[i] | countActualNumber}}
							</td>
							<td>工时</td>
							<td>累积工时</td>
						</tr>
					</tbody>
					<tbody v-html="createTbody('all')">

						<!-- 部门
						<tr v-if="state.orgType=='department'" v-for="people in state.workHourByRow">

							<td class="departmentCell" v-if="$index==0?true:false" rowspan="{{state.workHourByRow.length}}">
								<span v-if="$route.params.type=='department'">{{people.deptName}}</span>
								<span v-if="$route.params.type=='store'">{{people.storeName}}</span>
							</td>
							<td class="departmentCell" align="left">
								<span>{{people.userName}}</span>
							</td>
							<td class="departmentCell">
								<span>{{people.postName}}</span>
							</td>

							<td v-for="i in state.hourLength" id="{{'user'+people.userID+'_time'+state.workTimeHours[i].hour}}" :class="state.workDataHours['user'+people.userID+'_time'+state.workTimeHours[i].hour] | workStyle" :edit="state.workDataHours['user'+people.userID+'_time'+state.workTimeHours[i].hour] | workEditalbe">
									{{{ state.workDataHours['user'+people.userID+'_time'+state.workTimeHours[i].hour] | skillName }}}
							</td>

							<td>{{ state.workDataHoursWorkHours[$index] | countWorkHours}}</td>
							<td>{{people.totalWorkHour}}</td>
						</tr>-->
						<!-- 门店
						<tr v-if="state.orgType=='store'" v-for="people in state.workHourByRow">

							<td class="departmentCell" v-if="people.isFirst" rowspan="{{people.teamLength}}">
								<span >{{people.teamName}}</span>
							</td>
							<td class="departmentCell" align="left">
								<span>{{people.userName}}</span>
							</td>
							<td class="departmentCell">
								<span>{{people.postName}}</span>
							</td>

							<td v-for="i in state.hourLength" id="{{'user'+people.userID+'_time'+state.workTimeHours[i].hour}}" :class="state.workDataHours['user'+people.userID+'_time'+state.workTimeHours[i].hour] | workStyle" :edit="state.workDataHours['user'+people.userID+'_time'+state.workTimeHours[i].hour] | workEditalbe">
									{{{ state.workDataHours['user'+people.userID+'_time'+state.workTimeHours[i].hour] | skillName }}}
							</td>

							<td>{{ state.workDataHoursWorkHours[$index] | countWorkHours}}</td>
							<td>{{people.totalWorkHour}}</td>
						</tr>-->



					</tbody>
				</table>
			</div>
			<!-- 导出excel end -->

			<!-- 技能菜单 -->
			<ul id="rightMenu" class="rightMenu dropdown-menu">
				<li class="dropdown-submenu">
					<a tabindex="-1" href="javascript:;">任务</a>
					<ul class="dropdown-menu" @click.stop="eSetSkill">
						<li v-for="item in state.workSkills" v-if="item.valid==1">
							<a href="javascript:;" skillID="{{item.ID}}"  >{{item.codeName}}</a>
						</li>
					</ul>
				</li>
				<li><a href="javascript:;" @click.stop="eCopy">复制</a></li>
				<li><a href="javascript:;" @click.stop="ePaste">粘贴</a></li>
				<li><a href="javascript:;" @click.stop="eCrop">剪切</a></li>
				<li><a href="javascript:;" @click.stop="eClear">清空</a></li>
			</ul>

            <!-- 班次菜单 -->
            <ul id="rightMenu2" class="rightMenu dropdown-menu">
                <li class="dropdown-submenu">
                    <a tabindex="-1" href="javascript:;">班次</a>
                    <ul class="dropdown-menu" @click.stop="eSelectWorkClass">
                        <li v-for="item in baseState.workClass" v-show="item.valid==1?(item.type-0==state.workClassType-0 ?true :false):false">
                            <a href="javascript:;" workTime="{{item.ID}}" workTimeType="{{item.timeType}}" >{{item.name}}: {{item.time[0]}}-{{item.time[1]}}</a>
                        </li>
                    </ul>
                </li>
                <!-- <li><a href="javascript:;" @click.stop="eCopy">复制</a></li>
                <li><a href="javascript:;" @click.stop="ePaste">粘贴</a></li>
                <li><a href="javascript:;" @click.stop="eCrop">剪切</a></li>
                <li><a href="javascript:;" @click.stop="eClear">清空</a></li> -->
            </ul>

        </div>
        <ui-modal :show.sync="showImportModal" header="导入排班数据" >
            <div class="import-modal">
                <ui-simpleupload
                    url="api.schedule.importDataHour"
                    fileparam="file"
                    uploading-msg="导入进度"
                    :params="{deptID:state.deptID,storeID:state.storeID,group:state.orgGroupID}"
                    :complete="importDataHourComplete"
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
import store from '../store_service';
import EventListener from 'libs/utils/EventListener'

import 'libs/exportExcel.js';
import uitable from 'libs/ui-table'


let is_mousedown = false;
let selectedList = {
	order:[]
}; //已选元素列表
let selectedData = {
	order:[]
}; //缓存数据，用于复制，黏贴，剪切
let selectedCurrent;

let rightMenu;
let subMenu;

let rightMenu2;
let subMenu2;

let selectedUserID;

export default {

	data(){
		return {
            baseState:storeCom.state,
			state:store.state,
			showAddCustomWorkModal:false,
			initExportExcel:false,
			tableCell:'',
			table:{},
            showOverDay:store.state.showOverDay,
            tableLoading:false,
            startRender:false,
            showImportModal:false,
		}
	},

    watch:{
        showOverDay(val){

            this.tableLoading = true;

            store.actions.changeShowOverDay(val);

            this.$nextTick(function(){
                this.tableLoading = false;
            })

        }
    },

	components: {
	},

	props:{
		// type:'week'
	},

	computed:{
		// 是否周排班
		timeWeek(){
			// //console.log(this.$data.state.type)
			if(this.$data.state.type=='week'){

				return true
			}
		},
		// 是否日排班
		timeDay(){
			// //console.log(this.$data.state.type)
			if(this.$data.state.type=='day'){
				return true
			}
		},
		// 时间段计算
		duration(){

			var today = new Date(this.$data.state.dateStart);

			// //console.log(today)

			var nextDay = new Date(today.getTime()+(1000*60*60*24*7));

			return today.getFullYear()+'年'+(today.getMonth()+1)+'月'+today.getDate()+'日-'+(nextDay.getMonth()+1)+'月'+nextDay.getDate()+'日'

			// 2016年3月15日—3月22日（第8周）

		}

	},

	filters:{
		// 工作时间

		showWorkTime(index){

            index = index>=24? index-24 : index;

            var s = index < 10 ? '0' + index : index;
            var e = index + 1 < 10 ? '0' + (index + 1) : index + 1;

			return s+':00-'+e+':00';

		},

		// 过滤器-班次style
		workStyle(workDataHours){


			if(!workDataHours) return '';

			return workDataHours.workClass;

		},

		// 过滤器-班次Name
		skillName(data){

			if(!data) return '';

			if(data.workTimeType-0==4){
				return '排休'
			}

			return store.actions.getSkillNameByID(data.skillID);

		},

		// 过滤器-班次是否可编辑
		workEditalbe(workDataHours){

			if(!workDataHours) return 'able';

			return workDataHours.editable;

		},
		// 计算实际人数
		countActualNumber(workDataHoursActualNumber){

            // console.log('计算实际人数')

			let n = 0;

			for(var i in workDataHoursActualNumber){

				var dayData = workDataHoursActualNumber[i];

				if(!dayData) return;

				if(dayData.skillID!='' /*&& dayData.workTime!='' && dayData.workTimeType!=''*/ && dayData.workTimeType-0!=3 && dayData.workTimeType-0!=4){
					n++;
				}

			}

			return n;

		},
		// 计算工时
		countWorkHours(peopleWorkData){

            // console.log('计算工时')

			let n = 0;

			for(var i in peopleWorkData){

				var dayData = peopleWorkData[i];

				// //console.log("ActualNumber>>"+i)

				if(dayData.workTime!='' && dayData.workTimeType!='' && dayData.workTimeType-0!=3 && dayData.workTimeType-0!=4){
					n++;
				}

				//console.log('countWorkHours')


			}

			return n;

		},
		// 所需人数
		getRequireCount(data,hour){

            console.log('getRequireCount')

			var id = 'time_'+hour;

			if(data[id]){
				return data[id].personCount
			}else{
				return '';
			}

		}

	},

	events:{

        // 监听导出excel
        toDownloadExcel(){

            let _this = this;

            if(this.$route.params.type==this.state.orgType && this.$route.params.group==this.state.orgGroup && !!this.$route.query.storeID){

    			this.initExportExcel = true;

    			this.$nextTick(function(){

    				var excelTable = document.getElementById('excelTable').innerHTML;
    				// var tableStyle = document.getElementById('tableStyle').innerHTML;

    				exportExcel({
    					html: excelTable,
    					style: '',
    					sheetName: '排班表',
    					fileName: '24小时排班'+ this.state.daySelected.replace('/','-')
    				},function(){
                        _this.initExportExcel = false;
                    })
    			})

            }

		},
		refreshTable(){
			this.$nextTick(function(){
				this.$refs.table && this.$refs.table.refresh();
			})
		},
        // 导出数据模板
        toExportDataTpl(){

            if(!this.attachedHour) return;

            if (this.state.orgType == 'department' && this.state.deptID == '' || this.state.orgType == 'store' && this.state.storeID == '') {
                this.$root.showTip({
                    type: 'warning', // 提示类型 success,warning,info,danger
                    msg: '请先选择要导出的部门或者门店', // 提示文字
                    duration: 3000 // 自动消失时间
                })
                return;
            }

            // if(this.$route.params.type==this.state.orgType && this.$route.params.group==this.state.orgGroup && !this.$route.query.storeID){
                let name = this.state.orgType=='department' ? '部门' :(this.state.orgGroup=='manager' ? '管理组' : '服务组'),
                    startDate = this.$root.Tool.iDate(this.state.daySelected,'yymmdd'),
                    fileName = `${name}排班数据模板`,
                    params = `fileName=${fileName}&deptID=${this.state.deptID}&storeID=${this.state.storeID}&date=${startDate.string}&type=hour`
                ;

                this.$root.downloadFile('acewill/schedule/scheduleday/export.htm', encodeURI(params));

                return;
            // }


        },
        // 导入排班数据
        toImportData(){



            // if (this.state.orgType == 'department' && this.state.deptID == '' || this.state.orgType == 'store' && this.state.storeID == '') {
            //     this.$root.showTip({
            //         type: 'warning', // 提示类型 success,warning,info,danger
            //         msg: '请先选择要导出的部门或者门店', // 提示文字
            //         duration: 3000 // 自动消失时间
            //     })
            //     return;
            // }

            // if(this.$route.params.type==this.state.orgType && this.$route.params.group==this.state.orgGroup && !this.$route.query.storeID){
            this.showImportModal = true;
            // }

            console.log(this.showImportModal)

        }


	},

    attached(){

        let _this = this;

        this.attachedHour = true;

        store.actions.hideHours(false);
        store.actions.setStatusNow({
            type:'day',
            orgType:'store',
            orgGroup:'service',
        });


        if(this.state.hasCreatedHours){

            console.log('24小时排班已经ready')


            store.actions.setDaySelectedData({
                daySelected:this.$route.query.date,
                storeID:this.$route.query.storeID
            });


            this.tableLoading = true;
            setTimeout(function(){

                _this.setInitStatus();
                store.actions.init();

                _this.startRender = true;

                _this.$nextTick(function(){
                    _this.tableLoading = false;
                    // _this.$refs.table && _this.$refs.table.refresh();
                })

            },500)


        }

    },


    detached(){
        this.attachedHour = false;
        this.startRender = false;
        store.actions.hideHours(true);
    },

    ready() {
        let _this = this;
        this.state.hasCreatedHours = true;

        this.tableLoading = true;


        store.actions.setDaySelectedData({
            daySelected:this.$route.query.date,
            storeID:this.$route.query.storeID
        });


        // 延迟加载
        setTimeout(function(){

            _this.setInitStatus();
            store.actions.init();

            _this.startRender = true;

            _this.$nextTick(function(){
                _this.tableLoading = false;
                // _this.$refs.table && _this.$refs.table.refresh();
            })

        },500)

        rightMenu = document.querySelector('#rightMenu');
        subMenu = rightMenu.querySelector('ul');

        rightMenu2 = document.querySelector('#rightMenu2');
        subMenu2 = rightMenu2.querySelector('ul');

        // 点击其他地方隐藏TD右键菜单
        this._closeEvent = EventListener.listen(window, 'mouseup', (e) => {
            if (!rightMenu.contains(e.target) && (e.target.tagName != 'TD' || e.target.getAttribute('edit') != 'able')) {
                this.showRightmenu(false)
            }
            if (!rightMenu2.contains(e.target)) {
                this.showRightmenu2(false)
            }
        });



    },
    beforeDestroy() {
        // 销毁window.mouseup 事件
        if (this._closeEvent) this._closeEvent.remove()
    },

	methods:{

        exportWorkClass(colNum){
            return store.actions.exportWorkClass(colNum);
        },

        // 导入数据完成后刷新
        importDataHourComplete(){
            this.setInitStatus();
            store.actions.init();
        },

        // 设置初始化状态，必须在init之前执行
        setInitStatus() {

            if (this.$route.params.type == 'department') {
                this.orgType = 'department';
            } else if (this.$route.params.group == 'manager') {
                this.orgType = 'store';
                this.orgGroup = 'manager'
            } else if (this.$route.params.group == 'service') {
                this.orgType = 'store';
                this.orgGroup = 'service'
            }

            storeCom.mutations.SetOrgData('service',this.$route.query.storeID);

            // 设置当前状态
            store.actions.setStatusNow({
                type:'day',
                orgType:this.orgType,
                orgGroup:this.orgGroup,
            });

        },

        // 格式化管理组 班次

        formatManagerTime(time){

            let str = (time.join('  ')).replace(/\//g,'-')

            return str;
        },

        // 计算工时
        countWorkHours(peopleWorkData){

            // console.log('计算工时')

            let n = 0;

            for(var i in peopleWorkData){

                var dayData = peopleWorkData[i];

                // //console.log("ActualNumber>>"+i)

                if(dayData.workTime!='' && dayData.workTimeType!='' && dayData.workTimeType-0!=3 && dayData.workTimeType-0!=4){
                    n++;
                }

                //console.log('countWorkHours')


            }

            return n;

        },
        // 创建排班tbody
        createTbody(type){
            let _this = this;
            let personList = this.state.workHourByRow.concat([]);
            let persons = personList.splice(this.state.personPagenation.currentindex,this.state.personPagenation.perpage);
            let html='';

            persons.forEach(function(people,index){

                // first
                if(type=='all'){

                    html+='<tr>'

                    if(_this.state.orgType=='department'){


                        let orgName = people.deptName || '';

                        if(index==0){
                            html+='<td class="departmentCell" rowspan="'+persons.length+'">'
                            html+='    <span>'+orgName+'</span>'
                            html+='</td>'
                        }

                    }

                    else if(_this.state.orgType=='store'){

                        console.warn(people.isFirst)
                        if(people.isFirst){
                            html+='<td class="departmentCell" rowspan="'+people.teamLength+'">'
                            html+='    <span>'+(people.teamName ? people.teamName : '')+'</span>'
                            html+='</td>'
                        }

                    }

                    html+='<td>'
                    html+='    <span>'+people.userName || '' +'</span>'
                    html+='</td>'
                    html+='<td>'
                    html+='    <span>'+people.postName || '' +'</span>'
                    html+='</td>'
                }

                // all
                if(type=='all'){
                    html+=_this.createTD(people,'all');
                }

                // normal
                if(type=='normal'){
                    html+='<tr>'
                    html+=_this.createTD(people);
                    html+='</tr>'
                }

                // last
                if(type=='all'){

                    html+='    <td class="text-center">'+_this.countWorkHours(_this.state.workDataHoursWorkHours[index])+'</td>'
                    html+='    <td class="text-center">'+(people.totalWorkHour ? people.totalWorkHour : '')+'</td>'
                    html+='</tr>'

                }



            })
            this.$nextTick(function(){
                this.$refs.table && this.$refs.table.refresh();
            })

            return html;
        },

        // 创建时间
        createTimeTD(type){

            let _this = this;
            let td='';

            // let _showOverDay = type == 'all' ? false : _this.state.showOverDay;
            let _showOverDay = _this.state.showOverDay;

            let len =_this.state.hourLength/2;

            for(let i=0;i<len;i++){

                let index = i;
                let _time = '';
                let _class = '';
                let _day = '';

                // 跨天排班放在今天
                if(_showOverDay && _this.state.config.overDay==1){

                    index = index >= 24 ? index - 24 : index;

                    let s = index < 10 ? '0' + index : index;
                    let e = index + 1 < 10 ? '0' + (index + 1) : index + 1;
                    _time = s + ':00-' + s + ':59';

                    _class = i >= 24 ? '_nextDay' : '';

                    if(i>=24) _day = '<div class="text-center">'+_this.$Tool.iDate(_this.state.daySelected,'yy-mm-dd',1).string+'<span class="_overDayIcon">跨</span></div>'

                }
                // 跨天排版放在明天
                else if(_showOverDay && _this.state.config.overDay==2){

                    index = index < 12 ? index+12 : index - 12;

                    let s = index < 10 ? '0' + index : index;
                    let e = index + 1 < 10 ? '0' + (index + 1) : index + 1;
                    _time = s + ':00-' + s + ':59';

                    _class = i < 12 ? '_nextDay' : '';

                    if(i<12) _day = '<div class="text-center">'+_this.$Tool.iDate(_this.state.daySelected,'yy-mm-dd',-1).string+'<span class="_overDayIcon">跨</span></div>'

                }
                else if(!_showOverDay){

                    let s = index < 10 ? '0' + index : index;
                    let e = index + 1 < 10 ? '0' + (index + 1) : index + 1;
                    _time = s + ':00-' + s + ':59';
                }


                // html
                td+='    <th colspan="2" class="'+_class+'" >';
                td+=_day;
                td+='        <div class="text-center">'+_time+'</div>';
                td+='    </th>';

            }

            let html='';
            if(type=='all'){

                if(_this.$route.params.type=='store'){
                html+='<th colspan="3" class="table-cell-1">门店日排班 '+_this.state.daySelected+'</th>'
                }
                html+=td;
                html+='<th class="table-cell-last"></th>'
                html+='<th class="table-cell-last"></th>'

            }else{
                html = td;
            }

            return html;

        },

		// 批量创建TDhtml ,解决性能问题
		createTD(people,type){

            console.warn('createTDHour')
            // return '';

			/*<td v-for="i in state.hourLength" id="{{'user'+people.userID+'_time'+state.workTimeHours[i].hour}}" :class="state.workDataHours['user'+people.userID+'_time'+state.workTimeHours[i].hour] | workStyle" :edit="state.workDataHours['user'+people.userID+'_time'+state.workTimeHours[i].hour] | workEditalbe">
					{{{ state.workDataHours['user'+people.userID+'_time'+state.workTimeHours[i].hour] | skillName }}}
			</td>*/

			let html='';

			for(let i=0;i<this.state.hourLength;i++){

                if(!this.state.workTimeHours[i]) return '';

				let id = 'user'+people.userID+'_time'+this.state.workTimeHours[i].hour+'_date'+this.state.workTimeHours[i].time;

                // console.log(this.state.workDataHours[id])

				let hourData = this.state.workDataHours[id] || {workStyle:{color:'',bgcolor:''},workClass:'',editable:'able'};

                let _nextDay = '';

                if (i >= 48 && this.state.config.overDay == 1 && this.state.showOverDay || i < 24 && this.state.config.overDay == 2 && this.state.showOverDay) {
                    _nextDay = ' _nextDay'
                }


                var _overDay = hourData.overDay || '';

                let _class = hourData.workClass + _nextDay;
                var _style = hourData.workStyle;
				let _eidtable = hourData.editable;
				let _sikllName = hourData.workTimeType-0==4 ? '排休' : store.actions.getSkillNameByID(hourData.skillID);
                let _workClass = '';

                // if(type=='all'){

                //     _workClass = hourData.workTimeType-0==1 ? storeCom.actions.getWorkClassByID(hourData.workTime) : '';
                //     _workClass = _workClass.name ? '['+_workClass.name+']' : '';

                // }
                // console.log(_sikllName)

				html+='<td id="'+id+'" class="'+_class+'" style="color:'+_style.color+';background:'+_style.bgcolor+';" edit="'+_eidtable+'">'+_overDay+_workClass+_sikllName+'</td>';
			}


			return html;

		},

		// 分页
		changePage(index){
			store.actions.changePage(index);


			this.$nextTick(function(){
				this.$refs.table && this.$refs.table.refresh();
			})

		},

		// 保存排班
		saveSchedule(){

			store.actions.submitWorkDataOfHours();

		},

        openWorkClassMenu(evt){
            return;
            let userid = evt.target.getAttribute('userid');
            if(userid){
                selectedUserID = userid;
                this.showRightmenu2(true,evt.pageX+10,evt.pageY-15);
            }

        },
        // 显示班次菜单
        showRightmenu2(show,x,y){

            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;

            // console.log(scrollLeft)

            if(show){

                rightMenu2.style.display = 'block';

                x = x-scrollLeft || 0;
                y = y-scrollTop || 0;

                // console.log(rightMenu2.clientWidth)
                // console.log(document.body.offsetWidth)
                // console.log(x+rightMenu2.offsetWidth*2)

                // 判断是否子菜单被遮挡
                if(document.body.offsetWidth<x+rightMenu2.offsetWidth*2){
                    subMenu2.style.left='auto'
                    subMenu2.style.right='100%'
                }else{
                    subMenu2.style.left='100%'
                    subMenu2.style.right='auto'
                }

                rightMenu2.style.left = x+'px';
                rightMenu2.style.top=y+'px';

            }else{
                rightMenu2.style.display = 'none';
            }

        },
		// 显隐右键菜单
		showRightmenu(show,x,y){

			var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
			var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;

			// console.log(scrollLeft)

			if(show){

				rightMenu.style.display = 'block';

				x = x-scrollLeft || 0;
				y = y-scrollTop || 0;

				// console.log(rightMenu.clientWidth)
				// console.log(document.body.offsetWidth)
				// console.log(x+rightMenu.offsetWidth*2)

				// 判断是否子菜单被遮挡
				if(document.body.offsetWidth<x+rightMenu.offsetWidth*2){
					subMenu.style.left='auto'
					subMenu.style.right='100%'
				}else{
					subMenu.style.left='100%'
					subMenu.style.right='auto'
				}

				rightMenu.style.left = x+'px';
				rightMenu.style.top=y+'px';

			}else{
				rightMenu.style.display = 'none';
			}

		},

		// cell是否已选
		hasSelected(el){
			if(!el) return;

			// //console.log(el.getAttribute('selected'))

			return el.getAttribute('selected')=='true'?true:false
		},
		// 选择
		selectCell(el){

			if(!el) return;

			// //console.log(el.tagName)

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
			// 	order:[]
			// }

			// //console.log(selectedList)
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
			// //console.log(evt)
			let el = evt.target;


			if(el.tagName=='TD' && el.getAttribute('edit')=='able'){

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

			// //console.log('over')
			let el = evt.target;

			if(el.tagName=='TD' && el.getAttribute('edit')=='able'){

				if(!!this.hasSelected(el)){
					this.unselectCell(el);
				}else{
					//console.log('s')
					this.selectCell(el);
				}

			}

		},
		// out
		mouseout(evt){
			if(!is_mousedown) return;

			// //console.log('out')
			let el = evt.target;

			if(el.tagName=='TD' && el.getAttribute('edit')=='able'){

			}

		},
		// up
		mouseup(evt){

			is_mousedown = false;

			if (evt.button == 2) {
				return false;
			}

			// //console.log('up')
			let el = evt.target;

			if(el.tagName=='TD' && el.getAttribute('edit')=='able'){

				// //console.log(evt.pageX,evt.pageY,evt.offsetX,evt.offsetY)

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
				store.actions.editCustomWork('add',{});
			}
			else if(type=='delete'){

				//console.log(console)

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


				// window.log = //console.log;
				// //
				// setTimeout(function(){
				// 	//console.log = window.log;
				// 	//console.log(//console.log)
				// },0)


				var workTime = [];

				for(let i=0,len=this.$data.state.customWorkClass.length;i<len;i++){

					var item = this.$data.state.customWorkClass[i];

					// //console.log(item);

					if(!item.startTime || !item.endTime){

						alert('时间不能为空')

						return;
					}

					workTime.push(item.startTime+'/'+item.endTime)

				}

				// //console.log(//console.log)


				// 开始按选择顺序添加
				// for(let i=0,len=selectedList.order.length;i<len;i++){

				// 	var id = selectedList.order[i];

				// 	store.actions.editWorkSkillsByID('add',{
				// 		workTimeType:2,
				// 		workTime:JSON.stringify(workTime)
				// 	},id)

				// }

                store.actions.editWorkSkills('add',selectedList.order,skillID);

				// //console.log(//console.log)


				this.customWorkCtrl('close');

				this.unSelectAll();
				this.showRightmenu(false)


				// //console.log(//console.log)


			}
		},


		// 添加选择班次
		eSetSkill(evt){

            var skillID = evt.target.getAttribute('skillID')+'';

            console.log(skillID)

            if(!skillID) return;

            // 开始按选择顺序添加
            // for(let i=0,len=selectedList.order.length;i<len;i++){

            //     var id = selectedList.order[i];

            //     store.actions.editWorkSkillsByID('add',{
            //         skillID:skillID
            //     },id)

            // }


            store.actions.editWorkSkills('add',selectedList.order,skillID);

            this.unSelectAll();
            this.showRightmenu(false)
		},

        // 添加选择班次
        eSelectWorkClass(evt){

            // 显示自定义班次
            if(evt.target.id=='btAddCustomWork'){

                this.customWorkCtrl('show')

            }
            else{
            // 固定班次
                var workTime = evt.target.getAttribute('workTime')+'';
                var workTimeType = evt.target.getAttribute('workTimeType')+'';

                // /////console.log.log()

                if(!workTime || !workTimeType) return;

                // 添加班次数据
                store.actions.addWorkClassInHour(selectedUserID, {
                    workTime:workTime,
                    workTimeType: workTimeType,
                });

                this.showRightmenu2(false)
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
					skillID:''
				})

				//console.log(data)

				// 缓存数据及顺序
				selectedData[id] = {
					skillID:data.skillID
				}
				selectedData.order.push(id)

			}

			//console.log(selectedData)

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

					store.actions.editWorkSkillsByID('update', {
						skillID: dataOne.skillID
					}, id)

				}


			}
			// 多行数据，按照缓存数据，顺序复制
			else if(selectedData.order.length>1){

				// 开始按缓存顺序粘贴
				for(let i=0,len=selectedData.order.length;i<len;i++){

					var currentID = selectedData.order[i];
					var dataOne = selectedData[currentID];

					//console.log(dataOne)

					var targetID = selectedList.order[i];

					//console.log('targetID——'+targetID)

					if(!!targetID){
						store.actions.editWorkSkillsByID('update', {
							skillID: dataOne.skillID
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
				store.actions.editWorkSkillsByID('delete',{
					skillID: ''
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
<style>
.tableHours{
    top: 60px!important;
    left: 20px!important;
    right: 20px!important;
    bottom: 20px!important;
}
.tableHour-title{
    position: absolute;
    left: 0;
    right: 0;
    height: 100%;
    font-size: 20px;
}
._overDayIcon{
    color: #fc615f;
    position: absolute;
    right: 10px;
    top: 10px;
}
</style>
