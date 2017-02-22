<template>

<!-- 模块 vue -->
<div class="ui-module app-schedule" >

    <!-- 模块功能条 -->
    <header class="ui-module-navbar pos-topbar-fixed">

        <app-modulenavbar :show="showNavbar">


			<div class="pull-left">

                <strong class="app-schedule-title">{{!$route.query.storeID && $route.params.type=='department' ? '部门' : '门店'}}排班</strong>

                <ui-search placeholder="搜索员工" :value.sync="state.searchInput" :search-callback="searchCall" style="margin-right:0;"></ui-search>

                <div style="display:inline-block;width:80px;">
                    <button v-if="state.searchInput.length>0&&showClearSearch" type="button" class="btn btn-default" @click="clearSearch">清除</button>
                </div>

                <ui-buttongroup active-class="btn-primary" class="app-schedule-tabs">

                    <button __code="schedule-manager/管理组排班" type="button" class="btn btn-primary" v-link="{path:'/Schedule/manager/store/manager',    activeClass:'btn-primary', replace:true }">管理组排班</button>
                    <button __code="schedule-service/服务组排班" type="button" class="btn btn-default" v-link="{path:'/Schedule/service/store/service',    activeClass:'btn-primary', replace:true }">服务组排班</button>
                    <button __code="schedule-department/部门排班" type="button" class="btn btn-default" v-link="{path:'/Schedule/department/department/department', activeClass:'btn-primary', replace:true }">部门排班&nbsp;&nbsp;</button>

                </ui-buttongroup>


			</div>

            <!-- 右侧按钮组 -->
            <div class="pull-right">

                <!-- <button __code="schedule-menu-submit/提审" class="ui-tool-button" @click="$broadcast('toSubmitSechedule')" ><span class="icon icon-tool icon-tool-work pull-left"></span><span class="_name pull-left">提审</span></button> -->

                <!-- 班次 -->
                <button __code="schedule-menu-workClass/班次" class="ui-tool-button" @click="toggleListWorkClass(true)"><span class="icon icon-tool icon-tool-sechedule pull-left"></span><span class="_name pull-left">班次</span></button>


                <v-dropdown class="ui-tool-dropdown" trigger="click">
                    <button data-toggle="dropdown" class="ui-tool-button"><span class="icon icon-tool icon-tool-more pull-left"></span><span class="_name pull-left">更多</span></button>
                    <ul slot="dropdown-menu" class="dropdown-menu">
                      <li __code="schedule-menu-modifyRecord/修改记录">
                          <a name="dropdown-item" href="javascript:;" @click="showEditHistory=true">修改记录</a>
                      </li>

                      <li role="separator" class="divider"></li>

                      <li __code="schedule-menu-import/预估人数导入">
                          <a name="dropdown-item" href="javascript:;" @click="showUploadExcel=true">预估人数导入</a>
                      </li>
                      <li __code="schedule-menu-export/导出排班表">
                          <a name="dropdown-item" href="javascript:;" @click="$broadcast('toDownloadExcel')">导出排班表</a>
                      </li>
                      <li __code="schedule-menu-export/导出数据模板">
                          <a name="dropdown-item" href="javascript:;" @click="$broadcast('toExportDataTpl')">导出排班模板</a>
                      </li>
                      <li __code="schedule-menu-export/导入排班数据">
                          <a name="dropdown-item" href="javascript:;" @click="$broadcast('toImportData')">导入排班数据</a>
                      </li>
                      <!-- <li __code="schedule-menu-print/打印排班表">
                          <a name="dropdown-item" href="javascript:;" @click="">打印排班表</a>
                      </li> -->
                    </ul>
                </v-dropdown>


            </div>

        </app-modulenavbar>

    </header>

    <router-view transition="main" transition-mode="out-in"  keep-alive></router-view>

    <!-- 修改记录 -->
    <ui-sidecontent :show.sync="showEditHistory">

        <edithistory v-if="showEditHistory"></edithistory>

    </ui-sidecontent>


	<!-- 班次列表 -->
    <ui-sidebar :show.sync="showListWorkClass" title="班次列表" layout="header-content" :width="500">
	    <div slot="content">
	    	<listWorkClass v-if="showListWorkClass"></listWorkClass>
	    </div>
    </ui-sidebar>

	<!-- 添加班次 -->
	<ui-modal :header="showAddWorkClassTitle" :show.sync="showAddWorkClassModal" type="large" >
		<addWorkClass v-if="showAddWorkClassModal"></addWorkClass>
		<div slot="footer"></div>
	</ui-modal>

	<!-- 导入预估需求人数 modal -->
	<ui-modal header="导入预估需求人数" :show.sync="showUploadExcel" v-if="showUploadExcel">

		<div>
			<form id="excelForm" enctype="multipart/form-data" method="post">
    			<div class="form-group">
    		  		<a class="btn btn-default" href="/static/template.xlsx" target="_blank">下载模板文件</a>
    			</div>
    			<div class="form-group">
    			    <label for="excelFile">请下载模板文件，填好信息后上传，请确保信息的正确性</label>
    			    <input id="excelFile" type="file" style="padding: 10px 0;" >
    			    <div id="excelMsg"></div>
    			</div>
			</form>
		</div>

		<div slot="footer" class="text-center">
			<ui-button @click="submitExcel" color="success">上传</ui-button>
		</div>
	</ui-modal>


</div>

</template>

<script>
import store from '../store'

import addworkclass from './addWorkClass'
import listworkclass from './listWorkClass'
import edithistory from './edithistory'
export default {
    ready(){
        store.actions.init();
    },
	data(){
		return{
			state:store.state,
			showAddWorkClassTitle:'',
			showAddWorkClassModal:false,
			showListWorkClass:false,
			showUploadExcel:false,
            showEditHistory:false,
			showNavbar:false,
			showSideContent:false,
            showClearSearch:false,
		}
	},
	methods:{

		// 显隐添加班次
		toggleAddWorkClass(show){
			this.$data.showAddWorkClassTitle = '添加班次';
			this.$data.showAddWorkClassModal = show;
			// 初始化数据
			this.$broadcast('initWorkClassData')
		},
		// 显隐班次列表
		toggleListWorkClass(show){
			this.$data.showListWorkClass = show;
		},
		// 提交excel
		submitExcel(){

			var formData = new FormData();
			var excelMsg = document.getElementById("excelMsg");
			formData.append("file", document.getElementById('excelFile').files[0]);
			formData.append("type", 'temp');

			// ///console.log.log(formData)

			store.actions.uploadExcel(formData,function(msg){
				excelMsg.innerHTML = msg || "上传完成，解析中，请稍后...";
			},function(msg){
				excelMsg.innerHTML = msg;
			});

		},
        // 按员工搜索排班
        searchCall(){
            this.showClearSearch = true;
            console.log(this.state.searchInput)
            this.$broadcast('searchByUserName',this.state.searchInput);
        },
        // 清空搜索
        clearSearch(){
            this.showClearSearch = false;
            this.$broadcast('clearSearch');
        },
        clearSearchStatus(){
            this.showClearSearch = false;
        },

	},
	components:{
		addworkclass,
		listworkclass,
        edithistory
	},
	events:{
		// 关闭添加窗口并且打开列表
		hideAddWorkClass(){
			this.$data.showAddWorkClassModal = false;
			this.$data.showListWorkClass = true;
		},
		// 显示添加班次
		showAddWorkClass(){
			this.toggleAddWorkClass(true);
		},
		// 显示编辑
		showEditWorkClass(id,index){
			this.$data.showAddWorkClassTitle = '编辑班次';
			this.$data.showAddWorkClassModal = true;

            this.$nextTick(function(){
                this.$broadcast('changeAddWorkClass',id,index)
            })

		}
	},
    attached(){
        setTimeout(()=>{
            this.showNavbar = true;
        },500)
    },
    detached(){
        this.showNavbar = false;
    }
}
</script>


<style lang="less">
.app-schedule{

    td>._className{
        overflow: hidden;
        text-overflow: ellipsis;
        pointer-events: none;
    }

    .searchWorkClassBox{
        width: 240px;
    }
    .searchWorkClass{
        width: 150px;
        margin:5px 5px 5px 20px;
    }
    .searchWorkClassBtn{

    }

    .app-schedule-title{
        font-weight: normal;
        font-size: 16px;
        margin-right: 20px;
    }
    .app-schedule-search{
        margin-right: 20px;
    }
    .app-schedule-tabs{

    }

	.app-schedulebody{
		padding: 20px;
        overflow: hidden;
	}
	.page-header{
		padding: 10px 0;
		margin: 0;
		/*overflow: hidden;*/
	}
	.page-header:after{
		display: block;
		content: '';
		clear: both;
	}

	/* work class style */

	.workLeave{
		background: red!important;
		color: white;
	}

	.workCustom{
        cursor: pointer;
        color: #33691E!important;
		background: #DCEDC8!important;
	}
	.workTimeout{
		background: #ccc;
	}
	.workLeave{
		background: red;
	}

	/* -- table style end */

	.disableSelect {
	    -moz-user-select: none;
	    /*火狐*/
	    -webkit-user-select: none;
	    /*webkit浏览器*/
	    -ms-user-select: none;
	    /*IE10*/
	    -khtml-user-select: none;
	    /*早期浏览器*/
	    user-select: none;
	}

	/**/

	.tableDate{
		cursor:pointer;
	}
	.tableDate:hover{
		/*background: #eee;*/
	}

	/* 自定义班次时间段 */

	.customList{
		list-style: none;
		padding: 20px;
	}
	.customList .customItem{
		padding: 10px 0;
	}

    .customItem .iTimePicker{
        top: 13px;
        margin-right: 10px;
    }

	/* 当前阶段 */
	.currentDuration a{
		color: green!important;
	}


	/*  */
	.rightMenu{
		position: fixed;
		z-index: 2000;
        min-width: auto!important;
        max-width: 250px;
	}
	.rightMenu .dropdown-submenu{
		position: relative;
	}
	.rightMenu .dropdown-submenu .dropdown-menu{
		top: -8px;
		left: 100%;
		display: none;
        max-height: 300px;
        padding-right: 10px;
        overflow-y: auto;
	}
	.rightMenu .dropdown-submenu:hover .dropdown-menu{
		display: block;
	}



	/* */
	.cellSelected{
        position: relative;
		/**/
	}
    .cellSelected:after{
        content: '';
        display: block;
        position: absolute;
        z-index: 100;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        border: 3px solid #fff;
        box-shadow: 0 0 10px rgba(0,0,0,0.8);
    }

	/* common */

	.componentBody{
		padding: 30px 0;
	}



    .departmentCell{
    	background: #9096a6;
    	border: 1px solid #818795!important;
    	color: #fff;
    }
    .tableDate:hover{
    	background: #7e8696;
    }


    .ui-modal-container{
    	overflow: visible!important;
    }


    .managerWorkListShow{
        width: 500px;
        padding: 20px 0;
    }
    .managerWorkListShow li{
        padding: 5px;
        margin: 0 20px;
        border-bottom: 1px dashed #ddd;
        overflow: hidden;
    }
    .managerWorkListShow li span{
        float: left;
        display: inline-block;
    }
    .managerWorkListShow li span._col-1{
        width: 20%;
    }
    .managerWorkListShow li span._col-2{
        width: 50%;
    }
    .managerWorkListShow li span._col-3{
        width: 30%;
    }



    /*  ui-table  */
    .ui-table-header th,.ui-table-header td{
        background: #5d677c;
        color: #fff;
        border: 1px solid #495264!important;
        font-weight: normal;
        height: 60px!important;
        position: relative;
        padding-top:5px;
        padding-bottom:5px;

    }

    .ui-table-headerInfo th,.ui-table-headerInfo td{
        background: #515b6f;
        color: #fff;
        border: 1px solid #495264!important;
        font-weight: normal;
        height: 40px!important;

        padding-top:5px;
        padding-bottom:5px;

        -moz-user-select: auto!important;
        -webkit-user-select: auto!important;
        -ms-user-select: auto!important;
        -khtml-user-select: auto!important;
        user-select: auto!important;

    }
    .ui-table-normal .ui-table-headerInfo th,
    .ui-table-normal .ui-table-headerInfo td{
        font-family: 'DINCond'!important;
        font-size: 20px;
        text-align: center;
    }

    .ui-table-header ._week{

    }
    .ui-table-header ._weather{
        color: #bec2cb;
    }
    .ui-table-header ._date{
        color: #a8afb9;
    }
    .ui-table-header ._weekday{
        color: #dbc467;
    }
    .tableDate .icon-weather{
        font-size: 20px;
        color: #bec2cb;
        margin-left: 20px;
    }

    .ui-table-header ._nextDay{
        color: #a5aab0;
    }

    .ui-table-content-wrap tr:nth-of-type(odd) td._nextDay{
        background: #eee;
    }
    .ui-table-content-wrap tr:nth-of-type(odd) td._nextDay:hover{
        background: #d9dae0;
    }

    .ui-table-header ._nextDay:first-child{
        border-left:1px solid red!important;
    }
    .ui-table-body td{
        position: relative;
    }
    .ui-table-body td .tooltip{
        left: 0;
        margin-top: -5px;
        margin-left: 0;
        width: 100%;
        display: none;
        opacity: 1;
    }
    .ui-table-body td .tooltip .tooltip-inner{
        padding: 5px;
    }
    .ui-table-body td:hover .tooltip{
        animation: flipInY .5s;
        display: block;
    }
    .ui-table-body td i.material-icons{
        position: relative;
        top: 4px;
        font-size: 20px;
    }

    .ui-table-body td,
    .ui-table-body th{
        overflow: visible!important;

    }

    .ui-table td{
        height:40px;
        padding-top:5px;
        padding-bottom:5px;
    }


    .ui-table td.departmentCell:hover{
        background: #9096a6!important;
    }


    /* app-schedule-week */
    .app-schedule-week .tableDays{
        left: 20px!important;
        right: 20px!important;
        top: 60px!important;
        bottom: 20px!important;
    }
    .app-schedule-week .ui-table-status-wrap{
        position: absolute;
        right: -10px;
        top: -10px;
        z-index: 100;
        /*transform: rotate(25deg);*/
    }
    .app-schedule-week .ui-table-status{
        animation: bounceZoomIn .2s;
    }
    .app-schedule-week .smartTip{
        line-height: 2;
        font-size: 1.75rem
    }

    ._dateList{
        width:210px;
    }


    .isFullscreen{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 10000;
        padding: 0;
    }

    .isFullscreen {
        .tableDays {
            left:10px!important;
            top:50px!important;
            right: 10px!important;
            bottom: 10px!important;
        }
        .tableHours {
            left:10px!important;
            top:50px!important;
            right: 10px!important;
            bottom: 10px!important;
        }
        .app-schedulebody{
            padding: 10px;
        }
    }

    .ui-table-body td._top .tooltip{
        bottom:80%!important;

        .tooltip-arrow {
            top:auto!important;
            bottom: 0!important;
            left: 50%!important;
            margin-left: -5px!important;
            border-width: 5px 5px 0!important;
            border-top-color: #000000!important;
        }

    }

}

.app-schedulebody{
    ._holiday{
        position:absolute;
        right:2px;
        top:2px;
        width:20px;
        height:20px;
        border-radius:5px 0px 5px 0;
        background:#fd6d5a;
    }
    ._holiday > span{
        position: relative;
        z-index: 1;
        color: #fff;
        cursor:pointer;
    }
    ._holiday ul{
        visibility:hidden;
        opacity:0;
        position: absolute;
        z-index: 10001;
        width:260px;
        max-height: 160px;
        padding:0 10px;
        border-radius: 5px;
        box-shadow: 0 0 5px rgba(0,0,0,0.2);
        background:#fff;
        text-align: left;
        overflow-y:auto;
        transition: all .5s ease;
    }
    ._holiday:hover ul{
        opacity:1;
        visibility:visible;
    }
    ._holiday li{
        padding:10px 0;
        border-bottom: 1px dashed #ccc;
        color:#666;
    }
    ._holiday li:last-child{
        border:none;
    }


    ._holiday._center > ul{
        left:-120px;
    }
    ._holiday._left > ul{
        right:0;
    }
    ._holiday._right > ul{
        left:0;
    }
    ._holiday._bottom > ul{
        top:100%;
    }
    ._holiday._middle > ul{
        top:50%;
    }
    ._holiday._top > ul{
        bottom:100%;
        margin-bottom: 5px;
    }
}
</style>
