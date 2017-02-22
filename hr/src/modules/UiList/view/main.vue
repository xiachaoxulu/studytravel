<!--
* @Created Date       : 2016-09-24T14:43:50+08:00
* @Last Modified time : 2016-10-21T10:59:54+08:00
 -->


<template>

        <!-- 模块主内容 -->
        <section class="ui-module-content pos-content demoShow">


            <div class="ui-panel">
                <v-dropdown class="btn-group" :dropdownvalue.sync="dropvalue" :dropdownname.sync="dropname">

                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    选择组件: {{dropname}}  <span class="caret"></span>
                    </button>

                    <ul slot="dropdown-menu" class="dropdown-menu" style="height:400px;overflow-y: auto;">
                        <li><a name="dropdown-item" href="javascript:;" value="demoTags">标签 Tags</a></li>
                        <!-- <li><a name="dropdown-item" href="javascript:;" value="demoNotification">通知 Notification</a></li> -->
                        <li><a name="dropdown-item" href="javascript:;" value="demoIcon">图标 Icon</a></li>
                        <li><a name="dropdown-item" href="javascript:;" value="demoButton">按钮 Button</a></li>
                        <li><a name="dropdown-item" href="javascript:;" value="demoAlert">提醒 Alert</a></li>
                        <li><a name="dropdown-item" href="javascript:;" value="demoModal">弹出框 Modal</a></li>
                        <li><a name="dropdown-item" href="javascript:;" value="demoConfirm">确认框 Confirm</a></li>

                        <li><a name="dropdown-item" href="javascript:;" value="demoRadio">单选 Radio</a></li>
                        <li><a name="dropdown-item" href="javascript:;" value="demoCheckbox">多选 Checkbox</a></li>
                        <li><a name="dropdown-item" href="javascript:;" value="demoSwitch">开关 Switch</a></li>
                        <li><a name="dropdown-item" href="javascript:;" value="demoSelect">下拉选择 Select</a></li>
                        <li><a name="dropdown-item" href="javascript:;" value="demoDatepicker">日期选择 Datepicker</a></li>
                        <li><a name="dropdown-item" href="javascript:;" value="demoTimepicker">时间选择 Timepicker</a></li>
                        <li><a name="dropdown-item" href="javascript:;" value="demoUpload">文件上传 Upload</a></li>


                        <li><a name="dropdown-item" href="javascript:;" value="demoForm">表单 Form</a></li>
                        <li><a name="dropdown-item" href="javascript:;" value="demoValidator">表单验证 Validator</a></li>

                        <li><a name="dropdown-item" href="javascript:;" value="demoCollapsible">折叠 Collapsible</a></li>
                        <li><a name="dropdown-item" href="javascript:;" value="demoTabs">标签页 Tabs</a></li>
                        <li><a name="dropdown-item" href="javascript:;" value="demoDropdown">下拉框 Dropdown</a></li>
                        <li><a name="dropdown-item" href="javascript:;" value="demoTree">树 Tree</a></li>
                        <li><a name="dropdown-item" href="javascript:;" value="demoTable">表格 Table</a></li>
                        <li><a name="dropdown-item" href="javascript:;" value="demoGrid">网格 Grid</a></li>
                        <li><a name="dropdown-item" href="javascript:;" value="demoPagination">分页 Pagination</a></li>

                        <li><a name="dropdown-item" href="javascript:;" value="demoSidebar">侧栏  Sidebar</a></li>
                        <li><a name="dropdown-item" href="javascript:;" value="demoSidecontent">侧页 SideContent</a></li>
                        <li><a name="dropdown-item" href="javascript:;" value="demoScrollview">滚动条 Scrollview</a></li>
                        <li><a name="dropdown-item" href="javascript:;" value="demoDragdrop">拖动 Dragdrop</a></li>
                        <li><a name="dropdown-item" href="javascript:;" value="demoTransfer">Transfer</a></li>
                        <li><a name="dropdown-item" href="javascript:;" value="demoCollapse">折叠面板 collapse</a></li>

                        <li><a name="dropdown-item" href="javascript:;" value="demoAppDistrictSelect">行政区域选择</a></li>
                        <li><a name="dropdown-item" href="javascript:;" value="demoAppApprovalTimeline">行政区域选择</a></li>
                        <li><a name="dropdown-item" href="javascript:;" value="demoReport">report表格</a></li>
                    </ul>
                </v-dropdown>

            </div>




            <ui-scrollview>

                <component :is="dropvalue"  style="padding-bottom: 50px;"></component>

                <!-- <div class="ui-panel">

                    <div class="ui-panel-title">Cascader   级联选择</div>
                    <div class="ui-panel-content">
                        <table class="table table-bordered">
                            <thead>
                                <td colspan="2">组件说明</td>
                            </thead>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>


                    </div>
                </div>

                <div class="ui-panel">

                    <div class="ui-panel-title">Transfer 穿梭框  </div>
                    <div class="ui-panel-content">
                        <div class="api"><a href="" target="_blank">组件说明</a></div>



                    </div>
                </div>


                <div class="ui-panel">
                    <div class="ui-panel-title">Slider滑动输入条</div>
                    <div class="ui-panel-content">
                        <div class="api"><a href="" target="_blank">组件说明</a></div>



                    </div>
                </div>
                <div class="ui-panel">

                    <div class="ui-panel-title">Badge徽标数</div>
                    <div class="ui-panel-content">
                        <div class="api"><a href="" target="_blank">组件说明</a></div>



                    </div>
                </div>
                <div class="ui-panel">

                    <div class="ui-panel-title">Progress进度条</div>
                    <div class="ui-panel-content">
                        <div class="api"><a href="" target="_blank">组件说明</a></div>



                    </div>
                </div>
                <div class="ui-panel">

                    <div class="ui-panel-title">Popconfirm气泡确认框</div>
                    <div class="ui-panel-content">
                        <div class="api"><a href="" target="_blank">组件说明</a></div>



                    </div>
                </div>
                <div class="ui-panel">

                    <div class="ui-panel-title">Popover气泡卡片</div>
                    <div class="ui-panel-content">
                        <div class="api"><a href="" target="_blank">组件说明</a></div>



                    </div>
                </div>
                <div class="ui-panel">

                    <div class="ui-panel-title">Timeline时间轴</div>
                    <div class="ui-panel-content">
                        <div class="api"><a href="" target="_blank">组件说明</a></div>



                    </div>
                </div>
                <div class="ui-panel">

                    <div class="ui-panel-title">Tooltip文字提示</div>
                    <div class="ui-panel-content">
                        <div class="api"><a href="" target="_blank">组件说明</a></div>



                    </div>
                </div>
                <div class="ui-panel">

                    <div class="ui-panel-title">Tag标签</div>
                    <div class="ui-panel-content">
                        <div class="api"><a href="" target="_blank">组件说明</a></div>



                    </div>
                </div> -->

            </ui-scrollview>




        </section>


</template>

<script>
import store from '../store'

import demoTags from './demo-tags'
import demoAlert from './demo-alert'
import demoNotification from './demo-notification'
import demoIcon from './demo-icon'
import demoButton from './demo-button'
import demoButtongroup from './demo-buttongroup'
import demoRadio from './demo-radio'
import demoCheckbox from './demo-checkbox'
import demoSwitch from './demo-switch'
import demoForm from './demo-form'
import demoCollapsible from './demo-collapsible'
import demoModal from './demo-modal'
import demoConfirm from './demo-confirm'
import demoTabs from './demo-tabs'
import demoSelect from './demo-select'
import demoSidebar from './demo-sidebar'
import demoSidecontent from './demo-sidecontent'
import demoScrollview from './demo-scrollview'
import demoTree from './demo-tree'
import demoDropdown from './demo-dropdown'
import demoTable from './demo-table'
import demoGrid from './demo-grid'
import demoPagination from './demo-pagination'
import demoDatepicker from './demo-datepicker'
import demoTimepicker from './demo-timepicker'
import demoDragdrop from './demo-dragdrop'
import demoUpload from './demo-upload'
import demoTransfer from './demo-transfer'
import demoValidator from './demo-validator'
import demoCollapse from './demo-collapse'
import demoReport from './demo-report'

import demoAppDistrictSelect from './demo-appdistrictselect'
import demoAppApprovalTimeline from './demo-appapprovaltimeline'


export default {
    data(){
        return{

            dropvalue:'demoTable',
            dropname:'表单验证 Validator',
            showNavbar:false,
            timePicker1:'',
            showSidebar:false,
        }
    },

    filters:{

    },
    methods: {
    },
    components:{
        demoTags,
        demoAlert,
        demoNotification,
        demoIcon,
        demoButton,
        demoButtongroup,
        demoRadio,
        demoCheckbox,
        demoSwitch,
        demoForm,
        demoCollapsible,
        demoModal,
        demoConfirm,
        demoTabs,
        demoSelect,
        demoSidebar,
        demoSidecontent,
        demoScrollview,
        demoTree,
        demoDropdown,
        demoTable,
        demoGrid,
        demoPagination,
        demoDatepicker,
        demoTimepicker,
        demoDragdrop,
        demoUpload,
        demoTransfer,
        demoValidator,
        demoCollapse,
        demoReport,

        demoAppDistrictSelect,
        demoAppApprovalTimeline
    },
    ready(){
        var vm = this;
        setTimeout(function(){
            vm.showNavbar = true;
        },500)
    }
}
</script>

<style scoped>
.ui-panel{
    margin-bottom: 10px;
}
.ui-panel-title{
    font-size: 16px;
}
.demoShow h4{
    font-size: 14px;
    margin: 20px 0;
}
.demoShow .api{
    margin-bottom: 20px;
}
</style>
