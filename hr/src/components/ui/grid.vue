<template>
<div :id="id" class="ui-tablebox ui-grid" :class="{'auto':height==='auto'}" :style="{'height': height==='auto' ? '' : height}">
    <!-- 单元格高度控制 -->
    <style type="text/css">
        {{style}}
    </style>
    <div class="ui-table">
        <div class="ui-table-header-wrap">
            <div class="ui-table-title" v-if="!!title">
                <div class="text-center">{{title}}</div>
            </div>
            <!-- 头部 -->
            <div class="ui-table-header">
                <!-- 选择列 -->
                <div class="ui-table-checkbox" v-if="!!selectable">
                    <div class="ui-table-box text-center">
                        <table class="table table-bordered">
                            <colgroup>
                                <col width="50px"></col>
                            </colgroup>
                            <thead>
                                <tr>
                                    <td>
                                        <input v-if="selectable!='single'" name="__selectAll" type="checkbox" value="true" @click="clickSelectAll"></input>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <!-- 锁定列 -->
                <div class="ui-table-locked-front">
                    <div class="ui-table-box">{{{headerTpl('first')}}}</div>
                </div>
                <!-- 正常列 -->
                <div class="ui-table-normal ui-table-scrollable">
                    <div class="ui-table-box">{{{headerTpl('normal')}}}</div>
                </div>
                <!-- 锁定列 -->
                <div class="ui-table-locked-last">
                    <div class="ui-table-box">{{{headerTpl('last')}}}</div>
                </div>
            </div>
        </div>
        <div class="ui-table-content-wrap" @click="clickEvents" @dblclick="dbclickEvents">
            <!-- 选择列 -->
            <div class="ui-table-checkbox ui-table-checkboxList" v-if="!!selectable">
                <div class="ui-table-box text-center">{{{bodyTpl('checkbox')}}}</div>
            </div>
            <!-- 锁定列 前 -->
            <div class="ui-table-body ui-table-locked-front">
                <div class="ui-table-box">{{{bodyTpl('first')}}}</div>
            </div>
            <!-- 正常 -->
            <div class="ui-table-body ui-table-content ui-table-normal ui-table-scrollable">
                <div class="ui-table-box">{{{bodyTpl('normal')}}}</div>
            </div>
            <!-- 锁定列 后 -->
            <div class="ui-table-body ui-table-locked-last">
                <div class="ui-table-box">{{{bodyTpl('last')}}}</div>
            </div>
            <div class="ui-table-ybar">
                <div class="_bar"></div>
            </div>
        </div>
        <div class="ui-table-xline">
            <div class="ui-table-xbar">
                <div class="_bar"></div>
            </div>
        </div>
        <!-- 页脚 -->
        <div class="ui-table-pager text-center">
            <div class="ui-table-pager-content" v-if="!disablePage && !(tableType==='authColumTable' && hasUserFields==='empty')">
                <ui-pagination v-if="!disablePage" active="success" :total="dataCount" :perpage.sync="pagination.perpage" :current.sync="pagination.current" :pages="pages" :refresh="btrefresh" :nobg="true" @refresh="refreshCurrentPage" :disable="editing"></ui-pagination>
            </div>
        </div>
    </div>
    <v-spinner :size="md" :fixed="false" text="" v-ref:spinner ></v-spinner>

    <!-- 列菜单项 -->

    <div class="ui-grid-fieldmenu" v-show="editField" transition="flipY" transition-mode="out-in">
        <ul>
            <li @click="fieldCtrl('column')">列选设置</li>
            <!-- <li @click="fieldCtrl('toggle')">隐藏该列</li> -->
            <li @click="fieldCtrl('lockedLeft')">冻结列：左</li>
            <li @click="fieldCtrl('lockedRight')">冻结列：右</li>
            <li @click="fieldCtrl('lockedNone')">解除冻结</li>
        </ul>
    </div>

	<ui-modal header="列选" :show.sync="showColumnMenu" type="normal" >

        <div class="ui-tablebox-columnMenu--header">
            <strong>共有{{userFieldsOrder.length}}列, 已选{{fieldsHasChecked()}}列</strong>
            <button type="button" class="btn btn-default" @click="changeFieldsDisable('all')">全选</button>
            <button type="button" class="btn btn-default" @click="changeFieldsDisable('reverse')">反选</button>
        </div>
        <!-- <ui-dragdrop v-if="userFieldsOrder.length>0" :order.sync="userFieldsOrder" itemselector="li"> -->
            <ul class="ui-tablebox-columnMenu--list" style="max-height:400px;overflow-y:auto;">
                <li v-for="field in userFieldsOrder" orderid="{{field}}">
                    <ui-checkbox v-if="fieldsDataTemp[field]" :value.sync="fieldsDataTemp[field].disable | transferDisable" >[{{$index+1}}]  {{userFieldsData[field].title}}</ui-checkbox>
                </li>
            </ul>
        <!-- </ui-dragdrop> -->

        <div style="text-align:center;">
            <ui-button @click="saveFieldsDisable">保存</ui-button>
            <ui-button @click="cancelSaveFieldsDisable">取消</ui-button>
        </div>

		<div slot="footer"></div>
	</ui-modal>


    <!-- 就地编辑数据类型 -->

    <!-- input -->

    <!-- checkbox -->

    <!-- radio -->

    <!-- select -->

    <!-- tree -->

    <!--  -->
</div>
</template>
<script type="text/javascript">
import Vue from 'vue'
import uitable from 'libs/ui-table'
import drag from 'libs/drag'

/*

1. tableName 控制是否开启自定义字段数据保存

2. 默认可调整宽度，顺序，锁定，是否保存根据talbeName判断

3. columnConfig 列选配置信息 包含查询和保存方法

4.


TODO:

1. 是否将字段权限部分独立拆分，作为扩展载入

2. 调整宽度时父层是否同时表换宽度

3.

 */


export default {

    ready() {

        this.theadCol           = []; // 头部col
        this.tbodyCol           = []; // 内容col
        this.tableColWidth      = []; // col宽度列表
        this.userFields         = []; // 用户字段
        this.userFieldsData     = {}; // 用户字段表
        this.fieldsDataRecorder = {}; // 记录初始化时设置的fields字段数据，用于再次加载数据时进行比对

        this.id = 'table' + parseInt(Math.random() * 1000000);

        /* 创建唯一的全局方法 ，用于就地编辑 */
        this.uid = `table${new Date().getTime()+parseInt(Math.random(10000000))}`;
        // console.log('this.uid',this.uid);
        window[this.uid] = {
            valueChanged:(input,index,fieldName)=>{

                // console.log('valueChanged')

                if(input.getAttribute('field')!==fieldName){
                    return;
                }

                // 时间节流
                clearTimeout(window[this.uid+'timer']);
                window[this.uid+'timer'] = setTimeout(()=>{
                    this.editing = true;
                    let field = this.fieldsData[fieldName];
                    // console.log(this.fieldsData,field)
                    !!field.editable && field.editHandler && field.editHandler(input.value,this.tableData[index],index,fieldName);
                },100)

                // console.log(input.value,this.tableData[index])

            }
        };

        if (this.selectable == 'multi') {
            this.selectAllCheckbox = this.$el.querySelector('[name="__selectAll"]')
        }

        this.table = uitable(this);
        this.table.init({
            selected: !!this.selectable
        });

        this.hasAddColumnEvent = false; // 是否添加了列选事件
        this.init();

        this.$refs.spinner.show();

    },
    attached() {
        setTimeout(()=> {
            this.table.refresh();
            this.$refs.spinner.hide();
        }, this.autoRefreshDely)
    },
    detached(){
        console.log('detached')
        this.resizeDrag.unbindEvents();
    },
    props: {

        // 表名
        tableName:{
            type:String
        },
        // 列选配置
        columnConfig:{
            type:Object,
            default(){
                return {
                    select(tableName,type,callback){ return false}, // 查询
                    save(){ return false} // 保存
                }
            }
        },
        // 强制每次初始化的时候都重新加载所有字段数据
        savedRefresh:{
            type:String,
            default:'',
        },
        // 标题
        title: {
            type: String,
        },
        // 字段列表
        fields: {
            type: Array,
            default () {
                return [];
            }
        },
        // 数据列表
        datalist: {
            type: Array,
            default () {
                return [];
            }
        },
        // 数据地址
        url: {
            type: String
        },
        // 设置返回数据的属性
        reader: {
            type: Object,
            default () {
                return {
                    idProperty: 'ID',
                    successProperty: 'success', // 成功
                    errmsgProperty: 'err_msg', // 失败提示
                    totalProperty: 'result.recordCount', // 数据总量
                    rootProperty: 'result.recordList', // 数据
                }
            }
        },
        // 参数
        pageParams: {
            type: Object,
            default () {
                return {
                    page: 'pageNum', // 当前页
                    limit: 'pageSize', // 每页数量
                }
            }
        },
        /* 查询参数 */
        queryParams: {
            type: Object,
            default () {
                return {
                    sort: 'sort',
                    page: 'page',
                    perPage: 'per_page'
                }
            }
        },
        /* 其他参数 */
        'appendParams': {
            type: Object,
            default: function() {
                return {}
            }
        },
        // 是否开启选择, 默认关闭，开启后默认多选模式，如果设置为single，则为单选模式
        selectable: {
            default: false
        },

        /* 已选ID列表 */
        selected: {
            twoWay: true,
            type: Array,
            default () {
                return []
            }
        },
        // 已选数据列表
        selectedData: {
            twoWay: true,
            type: Object,
            default () {
                return {};
            }
        },
        // 每页数量
        perpage: {
            type: Number,
            default: 20
        },
        // 可选每页数量
        pages: {
            type: Array,
            default () {
                return [10, 20, 50, 100];
            }
        },
        // 数据总数量，用来向外传
        total: {
            type: Number,
            twoWay: true,
            default: 0
        },
        // 禁止分页
        nopaging: {
            type: Boolean,
            default: false
        },
        // 是否显示刷新按钮
        btrefresh: {
            type: Boolean,
            default: false
        },

        // 设置表格高度，默认为600px
        height: {
            type: String,
            default: '600px'
        },
        // 设置单元格高度，例如 '50px'
        tdheight: {
            type: String,
            default: '50px'
        },
        // 表头高度
        thheight: {
            type: String
        },
        showTipCall: {
            type: Function,
            default () {}
        },
        // 从返回数据中自动拿字段，可以用传入的部分字段覆盖相应的id
        customFields: {
            type: Boolean,
            default: false,
        },

        // 已加载的所有数据
        alldata: {
            type: Object,
            twoWay: true,
            default () {
                return {};
            }
        },
        // 数据加载后的预处理
        beforeRender: {
            type: Function,
            default (data) {
                return data;
            }
        },
        // attached时候自动刷新间隔
        autoRefreshDely: {
            type: Number,
            default: 1000
        },
        // 初始化后自动加载数据
        autoLoad: {
            type: Boolean,
            default: true
        },
        // 自动加载数据延迟
        autoLoadDely:{
            type:Number,
            default:0
        },
        // 调整列尺寸
        resizable:{
            type: Boolean,
            default: true
        },
        // 字段重新排序
        reorderable:{
            type: Boolean,
            default: true
        },
        // 显示列选弹窗
        showColumnMenu:{
            type:Boolean,
            default:false
        }

    },
    data() {
        return {
            id: '', //table id random
            pagination: {
                total   : 1, // 分页 数据总量
                perpage : this.perpage, // 分页 每页数量
                current : 1, // 分页 当前页数
                last    : 1, // 分页 最后一页
                from    : 1, //
                to      : 1, //
            },

            disablePage : false, // 是否真的关闭分页，nopaging时数据量不超过1000条可以关闭
            dataCount   : 0, // 表格数据总数
            tableData   : [], // 表格数据

            fieldsOrder : [], // 预设字段顺序
            fieldsData  : {}, // 预设字段数据 name:{formater等}

            // userFields         : [], // 用户列选字段 [{name,title,isShow,order,width,fixed,colType,colValue}]
            userFieldsOrder    : [], // 用户字段顺序 [name...]
            userFieldsOrderCached:[],
            // userFieldsData     : {}, // 用户字段数据

            fieldsDataTemp     : {}, // 用于列选显隐设置等 name:{disable}

            clickEventsItems   : [],    // 单击事件特殊元素
            dbclickEventsItems : [],    // 双击事件特殊元素
            selectAll          : false, // 全选
            selectAllCheckbox  : null,  // 全选checkbox
            editing            : false, // 编辑中...不能切换页
            currentFieldIndex  : {},    // 当前操作的字段对象
            editField          : false, // 是否编辑字段
            tableType          : 'normalTable', //表格类型 normalTable:正常表  authColumnTable:字段权限列选表  columnTable:列选表
            hasUserFields      : 'none',        // 是否有用户自定义字段  yes 有用户字段，empty: 用户字段为空， none 无自定义字段，使用默认字段 , default 使用默认字段
        }
    },

    filters:{
        transferDisable:{
            read(val){
                return !val;
            },
            write(val){
                return !val;
            }
        }
    },
    computed: {
        style() {


            this.$nextTick(()=> {
                this.table && this.table.refresh();
            })


            let style = '';


            if (this.thheight) {
                if(this.thheight.indexOf('px')>-1) this.thheight = (this.thheight.replace('px','')-0)/20+'rem';
                style +=
                    `
                    #${this.id} .ui-table-header{
                        min-height:${this.thheight}!important;
                    }
                    #${this.id} .ui-table-header th,
                    #${this.id} .ui-table-header .ui-table-checkbox td{
                        height:${this.thheight}!important;
                    }
                    `
            }

            if (this.tdheight) {
                if(this.tdheight.indexOf('px')>-1) this.tdheight = (this.tdheight.replace('px','')-0)/20+'rem';
                style += `
                    #${this.id} .ui-table-body td,
                    #${this.id} .ui-table-checkboxList td{
                        height:${this.tdheight};
                    }
                    `
            }

            // console.log(this.thheight,this.tdheight)

            return style;
        }
    },

    watch: {

        tableName(val){
            console.warn('table change : ',val)
            val && this.initFields('init');
            // 列选监听
            this.addColumnEvent();
        },

        // 监测传入字段变化
        fields(data) {

            console.log('监测传入字段变化')

            this.initFields('fieldchange');

            this.$nextTick(this.table.refresh)

        },
        // 检测传入数据变化
        datalist(data) {

            if (!this.url) {
                this.loadData();

                this.datalist.forEach(function(item, index) {

                    // console.log(item.userName)

                });

            }

        },
        // 分页改变
        'pagination.current': function() {
            if(this.editing){
                this.$root.showTip({
                    msg:'编辑未完成不能切换页码',
                    type:'warning'
                })
                return;
            }
            // this.selectAll = false;
            this.loadData();
        },
        'pagination.perpage': function() {
            if(this.editing){
                this.$root.showTip({
                    msg:'编辑未完成不能切换页码',
                    type:'warning'
                })
                return;
            }
            // this.selectAll = false;
            this.loadData();
        },

        // 全选
        selectAll(val) {

            // 数据项checkbox点击时，屏蔽对selectAll的监视，防止非全选状态下selectAll=false后已选数据被清空
            if (this.clickCheckbox) return;

            if (val) {
                if (this.selectAllCheckbox) this.selectAllCheckbox.checked = true;
                this.selected = [];
                this.selectedData = {};
                Array.from(this.$el.querySelectorAll('[name="__checkbox"]')).forEach((item)=> {
                    this.selected.push(item.value)

                    Vue.set(this.selectedData, item.value, this.tableData[item.getAttribute('_index') - 0])

                    item.checked = true;
                })

                // console.log('全选')
            } else {
                this.clearSelections();

                // console.log('反选')
            }

        },
        // 监视选项状态，用于默认全选或取消全选
        selected(val) {

            if (this.selectable != 'single') {
                if (val.length == this.tableData.length && val.length > 0) {
                    this.selectAll = true;
                    if (this.selectAllCheckbox) this.selectAllCheckbox.checked = true;
                } else if (val.length < this.tableData.length) {
                    this.selectAll = false;
                    if (this.selectAllCheckbox) this.selectAllCheckbox.checked = false;
                }

                // 延迟释放数据checkbox点击状态，用于解决selectAll状态监测冲突
                setTimeout(()=> {
                    this.clickCheckbox = false;
                }, 100)
            }

        },
        // 检测是否分页，nopaing最多支持1000条，超过1000条则强制开启分页
        nopaging(val) {

            if (val) {
                // this.pagination.perpage = 1000;
                this.disablePage = this.pagination.total > 10000000000 ? false : true;

            } else {
                this.pagination.perpage = this.perpage;
                this.disablePage = false;
            }

            this.loadData();

        },
        //
        tableData(val) {
            this.alldata = {};
            if (Array.isArray(this.tableData)) {
                this.tableData.forEach(item => {
                    let key = item[this.reader.idProperty]
                    this.alldata[key] = item;
                })
            }
        }

    },

    methods: {
        /**
         * 初始化
         * @return {[type]} [description]
         */
        init() {

            // // 初始化字段
            // this.initFields('init');
            //
            // /* 载入数据 */
            // if (this.autoLoad) {
            //
            //     // 开启用户自定义字段后，延迟加载数据，
            //     // 解决频繁修改fields造成的渲染卡顿问题
            //     if(this.tableName) this.autoLoadDely = this.autoLoadDely || 3000;
            //
            //     // 延迟加载
            //     setTimeout(()=>{
            //         this.loadData()
            //     },this.autoLoadDely)
            // }

            // 开启用户自定义字段后，延迟加载数据，
            // 解决频繁修改fields造成的渲染卡顿问题
            if(this.tableName) this.autoLoadDely = this.autoLoadDely || 500;

            // 延迟加载
            // setTimeout(()=>{
                // 初始化字段
                this.initFields('init');
                // 载入数据
                this.autoLoad && this.loadData();

            // },this.autoLoadDely)


            /* resize事件监听 */
            if(this.resizable){
                this.addResizeEvent();
            }

            /* 字段拖拽排序事件 */
            if(this.reorderable){
                this.addReorderEvent();
            }

            /* 列选菜单 */
            if(this.tableName){
                this.addColumnEvent();
            }

        },

        // 尺寸变化事件
        addResizeEvent(){
            this.resizeDrag = new drag({
                elements:`#${this.id} .ui-table-box thead th span.ui-grid-resizeHandler`,
                start:(data,actived)=>{

                    this.theadCol = Array.from(document.querySelectorAll(`#${this.id} .ui-table-header col`));
                    this.tbodyCol = Array.from(document.querySelectorAll(`#${this.id} .ui-table-content-wrap col`));

                    // 如果可选择状态，则将checkbox列的col删掉
                    if(this.selectable){
                        this.theadCol.shift();
                        this.tbodyCol.shift();
                    }

                },
                move:(data,actived)=>{
                    // console.log('moveing');
                    this.theadCol[actived.index].width = this.tableColWidth[actived.index]+data.dx < 50 ? 50 : this.tableColWidth[actived.index]+data.dx;

                    this.tbodyCol[actived.index].width = this.tableColWidth[actived.index]+data.dx < 50 ? 50 : this.tableColWidth[actived.index]+data.dx;

                },
                end:(data,actived)=>{

                    this.tableColWidth[actived.index] = this.theadCol[actived.index].width.replace(/px/g,'')-0;

                    this.updateUserFieldsData(actived.index);

                    this.refreshTable();

                    this.saveUserData();
                }
            })
        },

        // 顺序变化事件
        addReorderEvent(){
            let tableNormalBody,
                tableNormalHead,
                tableXbar;
            this.fieldSortDrag = new drag({
                parent     : `#${this.id} .ui-table-header-wrap .ui-table-normal`,
                elements   : `#${this.id} .ui-table-box thead th.reorderable`,
                dragable   : true,
                hitCheck   : true,
                hitClass   : 'canReorder',
                dragScroll : true,
                dragClass  : '__draghandler',
                moveStep   : 20,

                start:(data,actived)=>{
                    tableNormalBody = document.querySelector(`#${this.id} .ui-table-content`);
                    tableNormalHead = document.querySelector(`#${this.id} .ui-table-header-wrap .ui-table-normal`);
                    tableXbar       = document.querySelector(`#${this.id} .ui-table-xbar`);
                },
                move:(data,actived,elements)=>{
                    tableXbar.scrollLeft = tableNormalBody.scrollLeft = tableNormalHead.scrollLeft;
                },
                end:(data,actived,elements)=>{
                    tableXbar.scrollLeft = tableNormalBody.scrollLeft = tableNormalHead.scrollLeft;

                    if(actived.hitElement && actived.hitElement!==actived.element && actived.index-actived.hitIndex!==1){
                        console.warn(actived.element.getAttribute('index')-0,actived.hitElement.getAttribute('index')-0)
                        this.reorderField(actived.element.getAttribute('index')-0,actived.hitElement.getAttribute('index')-0);
                        this.saveUserData();
                    }
                    this.refreshTable();
                }
            })
        },

        // 列选菜单
        addColumnEvent(){

            if(this.hasAddColumnEvent) return;

            this.hasAddColumnEvent = true;

            this.fieldMenu = this.$el.querySelector('.ui-grid-fieldmenu');
            this.fieldMenuHandler = this.$el.querySelector('.ui-table-header');
            this.fieldMenuHandler.addEventListener('click',e=>{

                if(!this.tableName) return;

                if(e.target.classList.contains('ui-grid-editHandler')){

                    // 获取当前字段
                    this.currentFieldIndex = e.target.getAttribute('index')-0;
                    // 显示操作菜单
                    this.fieldMenu.style.left = e.pageX-50+'px';
                    this.fieldMenu.style.top = e.pageY-5+'px';
                    this.editField = true;
                }
            });

            this.$el.addEventListener('click',e=>{

                if(!this.tableName) return;

                if(!this.fieldMenu.contains(e.target) && !e.target.classList.contains('ui-grid-editHandler')){
                    this.editField = false;
                }
            })
        },

        /**
         * 初始化字段，fields变化或者刷新时都会重新执行
         * @param [String] type 类型 [init:初始化, fieldchange:预设字段变化]
         */
        initFields(type){

            let data  = {},
                order = [];

            console.info('tableName>> ',this.tableName,type)

            // 创建预设字段数据表
            this.fieldsDataRecorder = {};
            this.fields.forEach(field=>{
                this.fieldsData[field.name] = field;
                // 缓存字段数据表 用于loadData中使用后端传递的字段作为列字段时进行相关校验
                this.fieldsDataRecorder[field.name] = Object.assign({},field);
            })

            // 如果设置了tableName 则尝试获取用户字段
            if(type==='init' && this.tableName){
                this.userFields      = [];
                this.userFieldsOrder = [];
                this.userFieldsData  = {};
                this.userFieldsDataCached = {};
                this.getUserTableFields();

                // 缓存用户字段，用于过滤，防止过滤次数太多影响最初的用户字段。
                // this.userFieldsOrderCached = [...this.userFieldsOrder];
            }

            // 如果有用户字段
            // if(this.userFields.length>0){
            if(this.hasUserFields==='yes' || this.hasUserFields==='empty' || this.hasUserFields==='default'){

                console.log('init userFields', type)

                // 暂时以预设字段为准筛选用户字段
                // 反复变化预设字段，会导致用户字段反复过滤，范围会越来越小，因为每次过滤后的结果都会赋给用户字段列表
                this.userFieldsOrder = this.filterUserFields();

                // 将锁定列抽离，并重新排序
                this.userFieldsOrder = this.reorderLockedField(this.userFieldsOrder,this.userFieldsData,this.fieldsData)

                // console.log('用户字段',this.userFieldsOrder.join(','))

                // 以用户字段顺序为准进行排序
                order = this.userFieldsOrder.map(name=>{
                    // 以用户字段配置为准 width,locked,disable
                    // TODO:此处的disable是否会影响预设disable实现的功能
                    // let field = Object.assign({},this.fieldsData[name]);

                    console.log(name,this.userFieldsData[name].disable)

                    let title = this.fieldsData[name].title; // 缓存原始title
                    if(!this.fieldsData[name]){
                        data[name] = Object.assign({},this.userFieldsData[name])
                    }
                    else{
                        data[name] = Object.assign(this.fieldsData[name],this.userFieldsData[name])
                    }

                    console.log(name,this.userFieldsData[name].disable)
                    data[name].ID = this.userFieldsData[name].ID;
                    data[name].title = title;


                    // name==='hoursForDay' && console.log(this.userFieldsData[name].title)

                    return name;
                })

                // console.log('init userFields',this.userFieldsOrder)

            }

            // 无用户字段，将预设字段初始化为用户字段
            else if(this.hasUserFields==='none'){

                console.log('无用户字段，将预设字段初始化为用户字段')

                this.fields.forEach(item=>{
                    data[item.name] = item;
                    order.push(item.name);
                })

                // 将锁定列抽离，并重新排序
                order = this.reorderLockedField(order,data,this.fieldsData)

                // 创建用户数据
                this.userFieldsOrder      = order;
                // this.userFieldsOrderCached = [...this.userFieldsOrder];
                this.userFieldsData       = data;
                this.userFieldsDataCached = data;

                // 创建后有用户字段了
                this.hasUserFields = 'default';

            }

            // 创建列选状态缓存数据
            for( let key in this.userFieldsData){
                Vue.set(this.fieldsDataTemp,key,{
                    disable: !!this.userFieldsData[key].disable
                })
            };

            // console.log('this.fieldsDataTemp',JSON.stringify(this.fieldsDataTemp))

            // 设定列宽度
            this.tableColWidth = [];
            this.userFieldsOrder.forEach(name=>{
                // console.log('name>',name)
                let colWidth = this.userFieldsData[name].width;
                if(colWidth) {
                    colWidth = (colWidth+'').replace('px','')-0;
                }
                // console.log(colWidth)
                this.tableColWidth.push(colWidth || 100)

            })

            // console.log(data)
            // console.log(order)


            // 更新列数据 触发GRID更新
            this.fieldsData = data;
            this.fieldsOrder = [...order];


            this.$nextTick(()=>{
                this.refreshTable();
                this.updateUserFieldsData();
            });



        },

        // 字段操作
        fieldCtrl(type){


            let field = this.fieldsData[this.fieldsOrder[this.currentFieldIndex]];

            console.log(type,field,this.currentFieldIndex,this.fieldsOrder[this.currentFieldIndex])

            if(field){
                console.log(field.disable)

                if(type==='toggle'){
                    field.disable = !field.disable;
                    console.log(field.disable)
                }
                else if(type==='lockedLeft'){
                    field.locked = 'first'
                }
                else if(type==='lockedRight'){
                    field.locked = 'last'
                }
                else if(type==='lockedNone'){
                    field.locked = ''
                }
                else if(type==='column'){
                    this.showColumnMenu = true;
                }

                console.log(this.fieldsData[this.fieldsOrder[this.currentFieldIndex]])
                this.updateUserFieldsData();
                this.initFields('fieldchange')

                this.saveUserData();
            }
            else {

            }

            this.editField = false;



        },

        // 根据索引值获取字段数据
        getFieldDataByIndex(index){
            return this.fieldsData[this.fieldsOrder[index]];
        },

        // 获取用户字段
        getUserTableFields(){

            // 获取用户列选字段
            let tableData = this.columnConfig.select(this.tableName);

            console.log('获取用户列选字段',tableData)


            // 表字段存在则进行处理
            if(tableData && tableData.fieldsData){

                for(let key in tableData.fieldsData){
                    this.userFields.push(tableData.fieldsData[key]);
                }

                let locked = ['','first','last']

                this.userFields.forEach((field,index)=>{

                    console.info(field.title,field.isShow)

                    // 向字段顺序数组中插入字段名
                    if(!this.userFieldsOrder[field.orderNum]){
                        this.userFieldsOrder[field.orderNum] = field.name;
                    }
                    // 如果位置重复，则插入为后一项
                    else{
                        this.userFieldsOrder.splice(field.orderNum,0,field.name)
                    }

                    // 转换数据
                    this.userFieldsData[field.name] = {
                        ID       : field.ID,
                        name     : field.name,
                        title    : field.title,
                        orderNum : field.orderNum,
                        width    : field.width-0,
                        locked   : locked[field.fixed || 0],
                        disable  : typeof field.isShow === 'undefined' ? false : !field.isShow
                    };

                    console.warn(field.title,this.userFieldsData[field.name].disable)

                    // 备份数据，用于保存数据时使用原始值，目前针对于title，因为前端有可能修改title
                    this.userFieldsDataCached[field.name] = {
                        title:field.title
                    }
                })

                // 去除undefined
                this.userFieldsOrder = this.userFieldsOrder.filter(name=>!!name);


                // 获取表类型 1: 含权限的列选表  0:不含权限的列选表
                if(tableData.tableType===1){
                    this.tableType = 'authColumTable'
                    // 用户字段状态，权限表中即使获取到的字段为空，也算用户字段，说明没有任何字段权限。
                    this.hasUserFields = this.userFields.length>0 ? 'yes' : 'empty';
                }
                else if(tableData.tableType===0){
                    this.tableType = 'columnTable'
                    // 用户字段状态，列选表中字段为空则使用预设字段。
                    this.hasUserFields = this.userFields.length>0 ? 'yes' : 'none';
                }

            }

            // 没获取到，尝试延迟获取，适用于直接刷新，全局数据尚未加载完成前
            else{

                this.hasUserFields = 'none';

                let _this = this,
                    count = 3; // 尝试3次
                function tryReload(){

                    console.log('没获取到，尝试延迟获取')

                    count--;
                    if(count<0) return;

                    let tableData = _this.columnConfig.select(_this.tableName);

                    if(tableData && tableData.fieldsData){
                        console.log('重新获取到数据',tableData.fieldsData)
                        _this.initFields('init');
                        return;
                    }

                    setTimeout(()=>{
                        tryReload()
                    },1000)

                }

                tryReload();
            }

        },

        /**
         * 重新排序锁定列
         * @param [Array] order 字段顺序列表
         * @param [Object] data 字段数据表
         * @return [Array] 新的顺序列表
         */
        reorderLockedField(order,userData,fieldData){

            let lockedFirst = [],
                normalField = [],
                lockedLast  = [],
                newOrder = [],
                group = {};


            //
            newOrder = order.filter(name=>{
                let parentKey = fieldData[name].parent;
                // 分组
                // TODO: 此处的判断也需要确定，究竟是按照预设 还是用户字段 如果是按照用户字段，则组长元素也必须在用户字段权限内
                // 暂时按照预设字段处理
                if(parentKey && fieldData[parentKey]){
                    // 创建分组
                    if(!group[parentKey]){
                        group[parentKey] = [];
                    }
                    // 添加元素
                    group[parentKey].push(name);

                    // 整理locked 组元素必须与父元素相同
                    if(userData[name] && userData[parentKey] ){
                        userData[name].locked = userData[parentKey].locked;
                    }
                    // else if(fieldData[name] && fieldData[parentKey] ){
                    //     fieldData[name].locked = fieldData[parentKey].locked;
                    // }

                    return false;
                }

                return true;
            });

            let newOrderCopy = [...newOrder];
            newOrder.forEach((name,index)=>{
                if(group[name]){

                    let parentIndex = index;

                    // 重新定位父元素位置，因为子元素添加后数组已改变
                    newOrderCopy.forEach((f,i)=>{
                        if(f===name) parentIndex = i;
                    })

                    group[name].forEach((f,i)=>{
                        newOrderCopy.splice(parentIndex+1+i,0,f)
                    })
                }
            })

            console.error('group >> ',group)

            // 筛选排序锁定列
            newOrderCopy.forEach(name=>{
                if(!!name){

                    // 固定列
                    if(userData[name] && userData[name].locked==='first'){
                        lockedFirst.push(name);
                    }
                    else if(userData[name] && userData[name].locked==='last'){
                        lockedLast.push(name);
                    }
                    // 正常列
                    else {
                        normalField.push(name);
                    }

                }
            });
            // 合并后的数组
            return (lockedFirst.concat(normalField)).concat(lockedLast);

        },

        // 以预设字段为准筛选用户字段
        filterUserFields(){

            // 混合用户字段和预设字段数据，
            // TODO: 以用户为准预设没有的字段默认显示，则会影响功能预设的字段显隐控制
            // TODO: 已预设为准，则新增的预设范围外的字段，无法显示。
            // TODO: 有权限查看某字段，但数据表不一定要显示该字段的话，则以预设为准

            // 暂时以预设字段的范围为准
            let authStr='',
                userStr=this.userFieldsOrder.join(',')+',';

            console.error(this.userFieldsOrder)

            // 以用户字段为最大范围，去除权限外的字段。
            this.fields.forEach((field,index)=>{

                // 如果用户字段存在，则属于权限范围内
                // required 必须显示 不受权限和列选控制 慎用，常用与保持功能完整性的关键性字段
                // TODO:是否有必要 required [当用户字段为空时，此时required的字段在后续处理中会报错，因为userFieldsData中没有此字段，且不贴合用户实际]
                // 如果是单纯的列选，那么在添加新的预设字段时，需要将预设字段加入到用户列选字段中
                if(this.userFieldsData[field.name] || this.tableType === 'columnTable' /*|| field.required*/){

                    let userField = this.userFieldsData[field.name];

                    authStr+=field.name+','

                    // 如果用户字段列表中不存在该字段，则加入用户字段列表
                    // 适用于纯列选表，新增预设字段不在用户列选数据中的情况
                    // 以及之前被过滤掉的用户字段需要重新添加回来
                    if(userStr.indexOf(field.name+',')<0){
                        console.log(field.name,userStr.indexOf(field.name+','))
                        this.userFieldsOrder.splice(index,0,field.name);

                        // 如果没有用户字段数据，则用预设字段数据进行添加
                        console.log('新增字段',field.name,!!field.disable)
                        if(!userField){
                            this.userFieldsData[field.name] = {
                                ID       : '', //
                                name     : field.name,
                                title    : field.title,
                                orderNum : index,
                                width    : field.width-0 || 100,
                                locked   : field.locked,
                                disable  : !!field.disable
                            };
                        }

                    }
                }
            });

            console.log('authFields',this.userFieldsOrder)

            // 剔除不在fields范围内的字段
            return this.userFieldsOrder.filter(name=>{
                return authStr.indexOf(name+',')>-1;
            })

        },

        /**
         * 重新排序字段
         * 原位置
         * 新位置
         */
        reorderField(currentIndex,targetIndex){

            // 锁定列和普通列之间不可互相拖拽
            // if(this.fieldsData[this.fieldsOrder[currentIndex]].locked !== this.fieldsData[this.fieldsOrder[targetIndex]].locked){
            //     this.$root.showTip({
            //         type:'warning',
            //         msg:'锁定列和普通列之间不可互相拖拽排序'
            //     });
            //     return;
            // }



            // 改变列 锁定状态
            this.fieldsData[this.fieldsOrder[currentIndex]].locked = this.fieldsData[this.fieldsOrder[targetIndex]].locked;

            function reorder(list,si,ti){
                let data = [...list],
                    current = data[si],
                    target  = data[ti],
                    tIndex = si < ti ? ti-1 : ti;
                ;
                // 先删除
                data.splice(si,1);
                // console.log(data)
                // 后添加
                data.splice(tIndex,1,target,current);
                // console.log(data)
                return data;
            };

            // 改变顺序
            this.theadCol      = reorder(this.theadCol,currentIndex,targetIndex);
            this.tbodyCol      = reorder(this.tbodyCol,currentIndex,targetIndex);
            this.tableColWidth = reorder(this.tableColWidth,currentIndex,targetIndex);

            console.log(this.userFieldsOrder)

            // 记录变更
            this.userFieldsOrder = reorder(this.fieldsOrder,currentIndex,targetIndex);
            this.fieldsOrder     = [...this.userFieldsOrder];

            console.log(this.fieldsOrder)

            this.updateUserFieldsData();

            this.$nextTick(this.table.refresh);

        },

        // 重置字段数据
        resetFieldData(fields) {

            return;

            let data = {},
                order = [];

            /* 检测传入字段变化，清空原始字段数据 */

            // userFieldsOrder
            // userFieldsData

            // 数据筛选
            // let newFields = [];
            // newFields = fields.filter(item=>!this.userFieldsData[item.name]);


            // 排序 合并
            if(this.userFieldsOrder.length>0){
                order = this.userFieldsOrder.map(name=>{
                    data[name] = Object.assign(this.fieldsData[name],this.userFieldsData[name])
                    return name;
                })
            }
            else{
                fields.forEach(item=>{
                    data[item.name] = item;
                    order.push(item.name);
                })
                this.userFieldsOrder = order;
                this.userFieldsData = data;

                for( let key in this.userFieldsData){

                    Vue.set(this.fieldsDataTemp,key,{
                        disable: this.userFieldsData[key].disable
                    })

                }

            }

            this.fieldsData = data;
            this.fieldsOrder = order;


        },

        // 更新用户字段数据
        updateUserFieldsData(index){

            // 更新指定索引的字段
            if(index>=0){
                let name = this.userFieldsOrder[index];
                this.userFieldsData[name].width = this.tableColWidth[index];
                this.userFieldsData[name].orderNum = index;
                this.userFieldsData[name].locked = this.fieldsData[name].locked;
                return;
            }

            // 默认更新所有
            this.userFieldsOrder.forEach((name,index)=>{
                this.userFieldsData[name].width = this.tableColWidth[index];
                this.userFieldsData[name].orderNum = index;
                this.userFieldsData[name].locked = this.fieldsData[name].locked;
            });

        },

        /**
         * 确认列选
         */
        saveFieldsDisable(){

            if(this.fieldsHasChecked()===0){

                this.$root.showTip({
                    msg:'请至少显示一列',
                    type:'error'
                })
                return;
            }

            for(let key in this.userFieldsData){
                // console.info(key,this.userFieldsData[key],this.fieldsDataTemp[key])
                Vue.set(this.userFieldsData[key],'disable',!!this.fieldsDataTemp[key].disable)
                this.fieldsData[key] && Vue.set(this.fieldsData[key],'disable',!!this.fieldsDataTemp[key].disable)
                this.fieldsOrder = [...this.userFieldsOrder]
            }

            this.$nextTick(()=>{
                this.refreshTable();
            })

            this.showColumnMenu = false;

            this.saveUserData();

        },

        // 保存自定义数据
        saveUserData(){

            console.log('保存自定义',this.tableName)

            // 未定义表名，不能保存
            // 权限表 权限为空，不能保存
            if(!this.tableName || (this.tableType==='authColumTable' && this.hasUserFields==='empty') ) return;

            let saveList = this.userFieldsOrder.map((name,index)=>{
                let item = this.userFieldsData[name],
                    itemCached = this.userFieldsDataCached[name] || {};
                ;
                // console.log(item.title,item.ID)
                return {
                    ID       : item.ID || '',
                    title    : itemCached.title || item.title, // 使用缓存的title数据，防止title被前端修改的状况
                    name     : name,//'userType', //
                    isShow   : item.disable ? 0 : 1,       // 显隐
                    width    : item.width+'',      // 宽度
                    orderNum : index,          // 顺序
                    fixed    : item.locked==='first'? 1 : (item.locked==='last' ? 2 :0)
                }
            })

            console.log('saveList',saveList)
            console.log('userFieldsData',this.userFieldsData)

            this.columnConfig.save(this.tableName,saveList,saveData=>{

                // 保存成功后更新ID,下次保存附加ID
                if(saveData){
                    for(let key in saveData){
                        // 只有当存在此field时才更新
                        if(this.userFieldsData[key]){
                            // console.log(key,this.userFieldsData[key],saveData[key])
                            this.userFieldsData[key].ID = saveData[key].ID;
                        }
                    }

                    console.log('this.savedRefresh',this.savedRefresh)
                    // 如果设置了保存后刷新
                    if(this.savedRefresh==='all'){
                        this.columnConfig.select('','loadAll')
                    }
                    else if(this.savedRefresh==='single'){
                        this.columnConfig.select(this.tableName,'loadSingle')
                    }

                }
            });

        },

        /**
         * 取消保存列选
         */
        cancelSaveFieldsDisable(){
            for(let key in this.userFieldsData){
                // Vue.set(this.fieldsDataTemp[key],'disable',this.userFieldsData[key].disable ? true :false)
                this.fieldsDataTemp[key] = {
                    disable:!!this.userFieldsData[key].disable
                }
                // Vue.set(this.fieldsDataTemp,key,{
                //     disable:!this.userFieldsData[key].disable
                // })
            }
            this.showColumnMenu = false;
        },

        /**
         * 获取已选中项数目
         */
        fieldsHasChecked(){

            let num = 0;

            this.userFieldsOrder.forEach(name=>{
                if(!this.fieldsDataTemp[name].disable){
                    num++;
                }
            })

            return num;

        },
        /**
         * 全选 反选 列选状态
         */
        changeFieldsDisable(type){

            if(type==='all'){
                for(let key in this.fieldsDataTemp){
                    // Vue.set(this.fieldsDataTemp[key],'disable',false)

                    this.fieldsDataTemp[key] = {
                        disable:false
                    }

                }
            }
            else if(type==='reverse'){
                for(let key in this.fieldsDataTemp){

                    this.fieldsDataTemp[key] = {
                        disable:!this.fieldsDataTemp[key].disable
                    }

                    // Vue.set(this.fieldsDataTemp[key],'disable',!this.userFieldsData[key].disable)
                }
            }

        },
        /**
         * 获取列选字段
         */
        getColumnFields(){

        },

        /**
         * 解析数据链
         * @param  {object} data     数据对象
         * @param  {string} property 属性链字符串，例如 result.data.item
         * @return {[type]}          [description]
         */
        getPropertyData(data, property) {

            let _data = data;

            // // console.log(_data)
            let props = property.split('.');

            props.forEach(function(item) {
                // // console.log(item)
                _data = _data[item]

                // // console.log(_data)
            })

            return _data;

        },

        /**
         * 获取本地分页数据
         * @return {[type]}      [description]
         */
        getLocalDataOfPage() {

            return this.datalist.slice((this.pagination.current - 1) * this.pagination.perpage, this.pagination.current * this.pagination.perpage);

        },

        /**
         * 加载数据
         * @return {[type]} [description]
         */
        loadData() {

            // if(this.selectAllCheckbox)this.selectAllCheckbox.checked = false;
            this.clearSelections();

            // 检测是否分页，nopaing最多支持1000条，超过1000条则强制开启分页，此处改变pagination.perpage会触发重新加载数据
            if (this.nopaging) {
                // this.pagination.perpage = 1000;
                this.disablePage = this.pagination.total > 1000 ? false : true;
            }

            if (!this.url) {

                // 设置数据
                this.tableData = this.getLocalDataOfPage()
                this.dataCount = this.datalist.length || 0;
                this.setPage();

                // 刷新表格
                this.$nextTick(this.table.refresh);

            } else {

                this.$refs.spinner.show();

                let data = {}

                data[this.pageParams.page] = this.pagination.current;
                data[this.pageParams.limit] = this.pagination.perpage;

                //添加查询参数,简单object类型
                Object.assign(data, this.appendParams);
                // console.log(data)

                // 加载数据
                this.$Tool.ajax({
                    type: 'GET',
                    url: this.url,
                    data: data,
                    success: (data, res) => {

                        res.data.result.recordList = this.beforeRender(res.data.result.recordList);

                        // console.log(res.data,res.data.result.recordList);

                        if (!!this.getPropertyData(res.data, this.reader.successProperty)) {
                            //不分页直接读取result数据
                            if (this.nopaging) {
                                // console.log(res.data.result);
                                this.tableData = res.data.result || [];
                                this.dataCount = res.data.result.length || 0;

                                // 强制转换为数组
                                if (!Array.isArray(this.tableData)) {
                                    this.tableData = Array.from(this.tableData) || [];
                                }

                            } else {
                                // 设置数据
                                this.tableData = this.getPropertyData(res.data, this.reader.rootProperty) || [];
                                this.dataCount = this.getPropertyData(res.data, this.reader.totalProperty) || 0;

                                // 强制转换为数组
                                if (!Array.isArray(this.tableData)) {
                                    this.tableData = Array.from(this.tableData) || [];
                                }

                                //如果当前表头列为空，则取数据第一行的keys作为列
                                if (this.customFields) {
                                    let _fieldsTemp = [];
                                    if (this.tableData.length > 0) {
                                        let prefields = this.tableData[0];
                                        if (!prefields) return;
                                        Object.keys(prefields).forEach((key) => {
                                            _fieldsTemp.push(Object.assign({
                                                title: key,
                                                name: key,
                                                width: 100,
                                            }, this.fieldsDataRecorder[key]));
                                        });
                                    } else {
                                        Object.keys(this.fieldsDataRecorder).forEach((key) => {
                                            _fieldsTemp.push(Object.assign({
                                                title: key,
                                                name: key,
                                                width: 100,
                                            }, this.fieldsDataRecorder[key]))
                                        })
                                    }
                                    var len = _fieldsTemp.length;
                                    for (var i = len - 1; i >= 0; i--) {
                                        if (this.fieldsDataRecorder[_fieldsTemp[i].name]) {
                                            // 如果字段设置了disable:true，则忽略该元素
                                            if (this.fieldsDataRecorder[_fieldsTemp[i].name].disable) {
                                                _fieldsTemp.splice(i, 1);
                                            }
                                        }
                                    }
                                    // console.log(_fieldsTemp)
                                    //
                                    if (_fieldsTemp[-1]) _fieldsTemp[-1].locked = "last";
                                    this.resetFieldData(_fieldsTemp);
                                }
                            }
                            this.setPage();
                        } else {
                            // console.warn(this.getPropertyData(res.data, this.reader.errmsgProperty))
                        }
                        // 刷新表格
                        this.$nextTick(this.table.refresh);
                        this.$refs.spinner.hide();

                    },
                    error: (msg) => {
                        this.showTipCall && this.showTipCall({
                            type: 'warning',
                            msg: msg
                        });
                        this.$refs.spinner.hide();
                    }
                })

            }
        },
        /**
         * 数据分页
         */
        setPage() {

            this.total = this.dataCount;
            this.pagination.total = this.dataCount;
            this.pagination.last = Math.ceil(this.pagination.total / this.pagination.perpage);
            this.pagination.from = 1 + this.pagination.perpage * (this.pagination.current - 1);
            this.pagination.to = this.pagination.perpage * this.pagination.current;
            // console.log(this.pagination)
        },

        /**
         * 生成表头
         * @param  {string} type 表头类型  first:固定列 前，normal:正常列，last:固定列 后
         * @return {string}      返回html
         */
        headerTpl(type) {

            let html = '',
                col  = '',
                td   = '';

            // 用户字段权限有，但是为空时，提示无权限
            if(this.tableType==='authColumTable' && this.hasUserFields==='empty'){
                if(type==='normal'){
                    td = '<th style="text-align:center;">您没有字段权限，请联系管理员为您分配</th>'
                }
            }
            else{

                this.fieldsOrder.forEach((name, index)=> {

                    let field = this.fieldsData[name];

                    if (field.disable) return false;

                    // console.log(field)
                    field.title = typeof(field.title) == "undefined" ? '' : field.title;

                    let resizableElm = this.resizable ? `<span class="ui-grid-resizeHandler"></span>` : '';

                    if(this.tableName){
                        resizableElm+=`<span class="ui-grid-editHandler icon icon-tool icon-tool-menu" index="${index}"></span>`
                    }

                    if (field.locked == type) {

                        // if(!this.tableColWidth[index]){
                        //     console.log(field.width)
                        //     this.tableColWidth[index] = (field.width+'').replace(/px/g)-0 || 100;
                        // }



                        col += `<col width="${this.tableColWidth[index]}" />`;
                        td += `<th index="${index}" name="${field.name}" class="${this.reorderable ? 'reorderable' : ''}" >${field.title}${resizableElm}</th>`;

                    } else if (!field.locked && type == 'normal') {
                        // if(!this.tableColWidth[index]){
                        //     this.tableColWidth[index] = (field.width+'').replace(/px/g)-0 || 150;
                        // }
                        col += `<col width="${this.tableColWidth[index]}" />`;
                        td += `<th index="${index}" name="${field.name}" class="${this.reorderable ? 'reorderable' : ''}" >${field.title}${resizableElm}</th>`;
                    }


                })

            }

            html += '<table class="table table-bordered">'
            html += '<colgroup>'

            html += col

            html += '</colgroup>'
            html += '<thead>'
            html += '    <tr>'

            html += td

            html += '    </tr>'
            html += '</thead>'
            html += '</table>'

            return html;

        },
        /**
         * 生成表内容
         * @param  {string} type 表头类型  first:固定列 前，normal:正常列，last:固定列 后
         * @return {string}      返回html
         */
        bodyTpl(type) {

            let html = '',
                col  = '',
                tr   = '';

            // 用户字段权限有，但是为空时，不渲染
            if(this.tableType==='authColumTable' && this.hasUserFields==='empty'){
                return;
            }

            // first normal last
            if (type !== 'checkbox') {
                this.fieldsOrder.forEach((name, index)=> {

                    let field = this.fieldsData[name];
                    if (field.disable) return false;
                    if (field.locked == type) {
                        // if(!this.tableColWidth[index]){
                        //     this.tableColWidth[index] = (field.width+'').replace(/px/g)-0 || 100;
                        // }
                        col += `<col width="${this.tableColWidth[index]}" />`;
                    } else if (!field.locked && type == 'normal') {

                        // if(!this.tableColWidth[index]){
                        //     this.tableColWidth[index] = (field.width+'').replace(/px/g)-0 || 150;
                        // }
                        col += `<col width="${this.tableColWidth[index]}" />`;
                    }

                })

                // tr
                this.tableData.forEach((_data, _index) => {

                    let td = '';
                    let isLast = _index == this.tableData.length - 1 ? true : false;
                    let lastIndex = this.tableData.length - 1;

                    this.fieldsOrder.forEach((name, i) => {


                        let field = this.fieldsData[name],
                            fieldValue = typeof(_data[field.name]) == "undefined" ? '' : _data[field.name];

                        if (field.disable) return false;

                        // 前后锁定列相互过滤 || 正常列过滤非正常列
                        if (type !== 'normal' && field.locked != type || type == 'normal' && (field.locked == 'first' || field.locked == 'last')) return;

                        console.log('bodyTpl  ' + type)

                        let fieldHtml = '',
                            fieldTitle = fieldValue;

                        // 格式化value
                        if (field.formater && typeof(field.formater) == 'function') {
                            fieldValue = field.formater(_data[field.name], _data, _index, lastIndex);
                            fieldTitle = '';
                        }

                        // 可编辑状态
                        if(field.editable){
                            console.log(name)
                            fieldHtml=`
                                <value class="_showElement" editable="true" >${fieldValue}</value>
                                <input class="_editElement" value="${fieldValue}" field="${name}" oninput="window.${this.uid}.valueChanged(this,${_index},'${name}')" ${new Date().getTime()}/>
                            `
                        }
                        else{
                            fieldHtml = `${fieldValue}`;
                        }

                        // 默认宽度
                        let defaultTdWidth = '150px';

                        if (field.locked == type) {
                            defaultTdWidth = '100px';
                        } else if (!field.locked && type == 'normal') {
                            defaultTdWidth = '150px';
                        }

                        field.tdClass = field.tdClass || '';

                        td+=`<td ${field.editable ? 'editable="true"' : ''} ${new Date().getTime()} width="${field.width || defaultTdWidth}" title="${fieldTitle}" class="${field.tdClass}">${fieldHtml}</td>`

                    })

                    // tr += '<tr name="trHandler">'
                    // tr += td
                    // tr += '</tr>'

                    tr += `
                        <tr name="trHandler" _index="${_index}">
                            ${td}
                        </tr>`

                })
            } else {
                // checkbox
                col = '<col width="50px"></col>'

                // tr
                this.tableData.forEach((_data, _index)=> {

                    let _isChecked = this.selected.indexOf(_data[this.reader.idProperty] + '') > -1 ? true : false;

                    // tr += '<tr name="trHandler" >'
                    // tr += '<td><input name="__checkbox" type="checkbox" _index="' + _index + '" value="' + _data[this.reader.idProperty] + '" ' + (_isChecked ? 'checked' : '') + '/></td>'
                    // tr += '</tr>'

                    tr +=
                        `
                        <tr name="trHandler" _index="${_index}">
                            <td>
                                <input name="__checkbox" type="checkbox" _index="${_index}" value="${_data[this.reader.idProperty]}" ${(_isChecked ? 'checked' : '')}/>
                            </td>
                        </tr>
                        `
                })

            }


            html += '<table class="table table-bordered">'
            html += '<colgroup>'

            html += col

            html += '</colgroup>'
            html += '<tbody>'

            html += tr

            html += '</tbody>'
            html += '</table>'

            return html;
        },
        /**
         * 添加特殊事件
         */
        setEvents() {

            this.clickEventsItems = [];
            this.dbclickEventsItems = [];
            this.fieldsOrder.forEach((name)=> {

                let field = this.fieldsData[name];

                // 判断是否存在子元素
                if (field.items && field.items.length > 0) {

                    field.items.forEach((item)=> {

                        // 判断元素是否绑定事件
                        if (item.events && item.events.length > 0) {


                            item.events.forEach((e)=> {

                                if (e.type == 'click') {

                                    let d = {
                                        name: item.name,
                                        callback: e.callback
                                    };

                                    this.clickEventsItems.push(d)

                                } else if (e.type == 'dbclick') {

                                    let d = {
                                        name: item.name, //'"[data-name=' + item.name + ']"',
                                        callback: e.callback
                                    };

                                    this.dbclickEventsItems.push(d)

                                }
                            })
                        }
                    })
                }
            })
        },

        /**
         * 点击全选按钮
         * @return {[type]} [description]
         */
        clickSelectAll(e) {

            if (e.target.checked) {
                /* Todo: 如果this.selectAll 原本就是true，此时在其他分页多选后，selectAll无变化，不会触发多选，且多选方式需要改变，不能清空后再多选，需要判断是否已经存在被选元素。防止错选漏选，如果需要支持分页多选，需要进行修改*/
                this.selectAll = true;
            } else {
                this.selectAll = false;
            }

        },

        /**
         * 单击事件
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        clickEvents(e) {

            if (e.target.getAttribute('name') == '__checkbox') {
                e.stopPropagation(); // 停止事件传递

                this.clickCheckbox = true;

                // // console.log(e.target.checked)

                if (e.target.checked) {
                    // // console.log(this.checked)
                    if (this.selectable == 'single') {

                        this.clearSelections();
                    }

                    e.target.checked = true;
                    this.selected.push(e.target.value)

                    Vue.set(this.selectedData, e.target.value, this.tableData[e.target.getAttribute('_index') - 0])

                } else {
                    this.selected.$remove(e.target.value);

                    Vue.delete(this.selectedData, e.target.value)

                }

            }

            else {

                // 双击事件
                this.dbclickTimer && clearTimeout(this.dbclickTimer);
                this.dbclickTimer = setTimeout(() => {
                    this.triggerTREvent(e, 'click');
                }, 200)

            }


        },
        /**
         * 双击事件
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        dbclickEvents(e) {
            if (e.target.getAttribute('editable') === 'true'){
                if(e.target.tagName.toLowerCase()==='value'){
                    e.target.parentNode.classList.add('_editing');
                    return;
                }
                e.target.classList.add('_editing')
            }

            this.dbclickTimer && clearTimeout(this.dbclickTimer);
            this.triggerTREvent(e, 'dbclick');

        },

        // 触发TR事件
        triggerTREvent(e, type) {

            let eventName = type === 'dbclick' ? 'trdbclick' : 'trclick'

            if (e.target.getAttribute('name') === 'trHandler') {
                // console.log(eventName)
                this.$emit(eventName, e, this.tableData[e.target.getAttribute('_index') - 0]);
            } else {
                var elParents = e.path;

                for (let i = 0, len = elParents.length; i < len; i++) {

                    let el = elParents[i];

                    if (el.getAttribute && el.getAttribute('name') === 'trHandler') {
                        // console.log(eventName)
                        this.$emit(eventName, e, this.tableData[el.getAttribute('_index') - 0]);
                        break;
                    }

                    // console.log(1)

                }

            }

        },
        // 刷新当前分页数据
        refreshCurrentPage() {
            this.loadData();
            this.clearSelections();
        },
        /**
         * 刷新当前数据，默认返回第一页刷新整个请求
         * @return {[type]} [description]
         */
        refresh() {
            this.pagination.current = 1;
            this.loadData();
            this.clearSelections();
        },

        // 刷新表格UI
        refreshTable() {
            this.table.refresh();
            this.$refs.spinner.hide();
        },

        /**
         * 清空已选项
         * @return {[type]} [description]
         */
        clearSelections() {
            this.selected = [];
            this.selectedData = {};
            if (this.selectAllCheckbox) this.selectAllCheckbox.checked = false;
            Array.from(this.$el.querySelectorAll('[name="__checkbox"]')).forEach(function(item) {
                item.checked = false;
            })
        },

        /**
         * 获取当前选中项
         * @return {[type]}
         */
        getSelections() {
            var self = this;
            var data = self.tableData.filter((item) => {
                if (self.selected.indexOf(item[self.reader.idProperty] + "") != -1) {
                    return true;
                }
            });
            return data;
        },

    },
    events: {
        /**
         * 刷新当前数据
         * @return {[type]} [description]
         */
        refresh() {
            this.refresh();
        },
        // 刷新表格UI
        refreshTable() {
            this.table.refresh();
        },
    }

}
</script>
<style >
.ui-tablebox ._showElement{
    display: table-cell;
    height: 100%;
    vertical-align: middle;
}
.ui-tablebox ._editElement{
    max-width: 100%;
    display: none;
}
.ui-tablebox ._editing ._showElement{
    display: none;
}
.ui-tablebox ._editing ._editElement{
    display: block;
}

/* */
.ui-grid thead th{
    position: relative;
}
.ui-grid .ui-grid-resizeHandler{
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    overflow: hidden;
    display: inline-block;
    cursor: col-resize;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
}
.ui-grid th:hover .ui-grid-resizeHandler{
    display: border-box;
    /*border-left:1px solid #495264;*/
    background: #495264;
}
.ui-grid {
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
}
.ui-grid .ui-table td{
    -webkit-user-select: text;
       -moz-user-select: text;
        -ms-user-select: text;
            user-select: text;
}

.ui-grid .ui-table th.canReorder:after{
    display: block;
    content:'';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    background: #fd6551;
}
.__draghandler{
    background: #5d677c;
    border: 1px solid #fff !important;
    opacity: 0.8;
    color: #fff;
    padding: 10px;
    box-sizing: border-box;
}
</style>
