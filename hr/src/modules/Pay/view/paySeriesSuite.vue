<template>
    <div class="mod-paySeriesSuite">
        <pay-suite-list v-ref:paysuitelist @selectsuite="showSuiteData"></pay-suite-list>
        <div class="com-col-m1-middle ui-panel" v-if="state.paySuiteList.length">

            <ui-scrollview v-ref:scrollview>

                <div class="mod-suite">

                    <div class="mod-suite-cont mod-suite-info">

                        <div class="form-horizontal container-fluid">
                            <div class="form-body">
                                <div class="row">
                                    <div class="col-sm-14">
                                        <div class="form-group row">
                                            <label class="col-sm-6 control-label" style="text-align: left;">工资套名称</label>
                                            <div class="col-sm-18">

                                                <div class="_infoText">{{state.paySuiteInfo.suiteName}}</div>
                                                <!-- <input type="text" class="form-control" placeholder="" readonly v-model=""> -->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-10">
                                        <div class="pull-right" style="margin-top: 5px;">
                                            <ui-switch name="s1" :value.sync="suiteValid">开启工资套</ui-switch>
                                        </div>
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col-sm-14">
                                        <div class="form-group row">
                                            <label class="col-sm-6 control-label" style="text-align: left;">员工范围</label>
                                            <div class="col-sm-18">

                                                <div class="_infoText" style="text-indent: -5px;">{{showEmpScope()}}</div>
                                                <!-- <input type="text" class="form-control" placeholder="" readonly value="{{showEmpScope()}}"> -->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-10 text-left">
                                        <ui-button class="pull-right" @click="$emit('showModalOfSuite','showPersons','large')">查看所选人员</ui-button>
                                        <ui-button class="pull-right" @click="$emit('showModalOfSuite','update')" style="margin-right: 10px;">修改工资套</ui-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mod-suite-cont">
                        <div class="_suiteItemsTool">
                            <div class="_tipmsg pull-left">
                                提示：请务必保证所有工资套项目计算顺序的正确
                            </div>
                            <button class="ui-tool-button pull-right" @click="saveCountOrder">
                                <span class="icon icon-tool icon-tool-save pull-left"></span>
                                <span class="_name pull-left">保存计算顺序</span>
                            </button>
                            <button class="ui-tool-button pull-right" @click="$emit('showModalOfSuite','addSuiteItem','large')">
                                <span class="icon icon-tool icon-tool-add2 pull-left"></span>
                                <span class="_name pull-left">添加工资项目</span>
                            </button>
                        </div>
                        <template v-if="state.paySuiteInfo.ID">
                            <ui-grid v-ref:paysuiteitemstable class="ui-table-simple gridTable"
                                title="工资项目"
                                :fields="fieldsOfPaySuiteItems"
                                url="api.Pay.selectPaySuiteItems"
                                :append-params="{'ID':state.paySuiteInfo.ID}"
                                :perpage="30"
                                :pages="[10,20,30,50]"
                                :btrefresh="true"
                                :selected.sync="selected"
                                :selected-data.sync="selectedData"
                                height="300px"
                                :alldata.sync = 'paysuiteItemsLoaded'
                                :auto-refresh-dely="100"
                                @trclick="suiteItemsClickHandler"
                                table-title="工资套工资项目"  table-name="paySeriesSuitesItemsTable" :column-config="$root.columnConfig"
                            ></ui-grid>
                        </template>
                    </div>
                    <div class="mod-suite-cont">
                        <template v-if="state.paySuiteInfo.ID">
                            <ui-grid v-ref:paysuiteformulatable class="ui-table-simple gridTable"
                                title="公式套"
                                :fields="fieldsOfPaySuiteFormula"
                                url="api.Pay.selectPaySuiteFormula"
                                :append-params="{'ID':state.paySuiteInfo.ID}"
                                :perpage="30"
                                :pages="[10,20,30,50]"
                                :btrefresh="true"
                                :selected.sync="selected2"
                                :selected-data.sync="selectedData2"
                                height="200px"
                                :auto-refresh-dely="100"
                                table-title="工资套公式套"  table-name="paySeriesSuitesSuiteTable" :column-config="$root.columnConfig"
                            ></ui-grid>
                        </template>
                    </div>

                </div>

            </ui-scrollview>

        </div>

        <!-- 添加，修改，删除，导入 -->
        <ui-modal :header="modalTitle" :show.sync="modalShow" :type="modalType"  v-if="modalShow">
            <components v-if="modalShow" :is="modalComponents" :ctrltype="ctrltype" @close="modalShow=false" @callback="ctrlCallback"></components>
            <div slot="footer"></div>
        </ui-modal>

    </div>
</template>
<script>
import store from '../store'
import editPaySuite from './editPaySuite'
import editPaySuiteItems from './editPaySuiteItems'
import paySuiteList from './paySuiteList'

/* 工资项目顺序 */
window.orderData = {};
window.setOrder = (ID,val)=>{
    orderData[ID] = val;
}

export default {
    data() {
      return {
        state:store.state,

        org:[],
        orgSelectedName:[],
        orgSelectedID:[],

        modalShow:false,
        modalType:'normal',
        modalTitle:'',
        modalComponents:'',
        ctrltype:'',

        // 工资套开启状态
        suiteValid:false,
        // 修改工资套开启状态
        changeSuiteValid:false,

        // 用来标注当前工资套索引
        suiteIndex:0,

        /* 工资套项目 */
        paysuiteItemsLoaded:{},
        selected: [],
        selectedData:{},
        fieldsOfPaySuiteItems: [
            {
                name: 'order',
                title: '序号',
                locked: 'first',
                width:'60px',
                formater: function(value, data, index) {
                    return index+1
                }
            },
            {
                name: 'itemName',
                title: '工资项目名称',
                locked: 'first',
                width:'150px'
            },
            {
                name: 'orderNum',
                title: '计算顺序',
                width: '100px',
                formater: function(value, data, index) {
                    console.log('>>'+value)
                    window.orderData = {};//每次渲染清空数据
                    return `<input ${new Date() } style="width:100%;" type="number" min="0" value="${value||''}" oninput="setOrder(${data.ID},this.value)"/>`
                }
            },
            {
                name: 'type',
                title: '所属类别',
                width: '60px',
                formater: (value, data, index)=>{
                    let codeItem = this.state.commonData.payItemTypes[value];
                    return codeItem&&codeItem.codeName ? codeItem.codeName : '';
                }

            },
            {
                name: 'pointNum',
                title: '小数位数',
                width: '70px'
            },
            {
                name: 'formula',
                title: '工资项内容',
                width:'200px'
            },
            {
                name: 'tool',
                title:'操作',
                width:'100px',
                locked:'last',
                formater: (value, data, index)=> {
                    return `<div class="_tableTool">
                                <a href="javascript:;"><i class="ui-icon material-icons" handleType="edit">mode_edit</i></a>
                                <a href="javascript:;"><i class="ui-icon material-icons" handleType="delete">delete</i></a>
                            </div>`
                }
            }
        ],
        /* 公式套项目 */
        selected2: [],
        selectedData2:{},
        fieldsOfPaySuiteFormula: [
            {
                name: 'order',
                title: '序号',
                locked: 'first',
                width:'60px',
                formater: function(value, data, index) {
                    return index+1
                }
            },
            {
                name: 'formulaName',
                title: '公式套名称',
                locked: 'first',
                width:'150px'
            },
            {
                name: 'formula',
                title: '公式',
            },
            // {
            //     name: 'tool',
            //     title:'操作',
            //     width:'60px',
            //     formater: (value, data, index)=>{

            //         let _this = this;

            //         return '<div class="_tableTool"><a href="javascript:;" onclick="_this.$emit(\'showModalOfSuite\',\'delSuiteItem\')"><i class="ui-icon material-icons">mode_edit</i></a> </div>'
            //     }
            // }
        ],

      }
    },

    watch:{
        // 是否开启工资套
        suiteValid(val){

            if(this.changeSuiteValid) return;

            store.actions.togglePaysuite(!!val,()=>{

                store.actions.getSuiteList(()=>{
                    this.showSuiteData(this.$refs.paysuitelist.suiteIndex)
                });

            },()=>{

            })

            if(val){
                console.log('开启工资套')
            }
            else{
                console.log('关闭工资套')
            }

        },
    },

    components:{
        editPaySuite,
        editPaySuiteItems,
        paySuiteList
    },
    attached(){
        // this.$refs.scrollview.refresh();
            console.log(this.$refs)
    },
    ready() {

        store.actions.getSuiteList(()=>{
            this.getOrgTree(()=>{
                this.showSuiteData(0)
            });

        });
    },
    methods:{

        // 监听工资套项目点击事件
        suiteItemsClickHandler(e,data){

            if(e.target.getAttribute('handleType')==='edit'){
                this.selected = [data.ID];
                this.selectedData[data.ID] = this.paysuiteItemsLoaded[data.ID];
                this.$emit('showModalOfSuite','updateSuiteItem','large')
            }

            else if(e.target.getAttribute('handleType')==='delete'){

                this.$root.showConfirm({
                    msg:'是否确认删除该项目？',
                    textOK:'确认删除',
                    textCancel:'取消',
                    ok:()=>{
                        this.selected = [data.ID];
                        this.selectedData[data.ID] = this.paysuiteItemsLoaded[data.ID];
                        this.$emit('showModalOfSuite','delSuiteItem')
                    }
                })

            }

        },

        // 监听操作的成功回调
        ctrlCallback(ctrltype,resultType,callback){

            // 工资套 添加，复制
            if(ctrltype=='add' || ctrltype =='copy'){
                store.actions.getSuiteList(()=>{
                    this.$refs.paysuitelist.suiteIndex = this.state.paySuiteList.length-1;
                    this.showSuiteData(this.$refs.paysuitelist.suiteIndex)
                });
            }
            // 工资套 修改
            else if(ctrltype=='update'){
                store.actions.getSuiteList(()=>{
                    this.showSuiteData(this.$refs.paysuitelist.suiteIndex)
                });
            }

            // 工资套 删除 回调
            else if(ctrltype =='delete'){

                store.actions.getSuiteList(()=>{
                    this.$refs.paysuitelist.suiteIndex = 0;
                    this.showSuiteData(this.$refs.paysuitelist.suiteIndex)
                });

            }
            // 工资套项目 添加，删除，修改
            else if(ctrltype=='addSuiteItem' || ctrltype=='updateSuiteItem'){
                store.actions.getSuiteList(()=>{
                    this.showSuiteData(this.$refs.paysuitelist.suiteIndex)
                });
            }

        },
        getOrgTree(successed){

            //加载组织树
            store.actions.loadOrgListTree(data => {
                this.org = data;
                successed&&successed();
            }, error => {
                this.$root.showTip({
                    type: 'danger',
                    msg: error,
                    duration: 2000
                });
            });
        },

        showOrgCheckedItem(tree,selectedIDs) {

            if (tree.children) {
                for (var i = 0; i < tree.children.length; i++) {
                    if(selectedIDs.indexOf(tree.children[i].organizeID)>-1){
                        this.orgSelectedName.push(tree.children[i].text);
                    }
                    this.showOrgCheckedItem(tree.children[i],selectedIDs);
                }
            }
        },

        // 显示工资套数据
        showSuiteData(index){

            if(!this.state.paySuiteList.length) return;


            this.suiteIndex = index;

            // 显示工资套信息
            store.actions.getSuiteData(index);

            // 同步工资套开启状态
            this.changeSuiteValid = true;
            this.suiteValid = this.state.paySuiteInfo.valid;

            console.log(this.suiteValid,this.state.paySuiteInfo.valid)

            this.$nextTick(()=>{
                this.changeSuiteValid = false;
            })


            // console.error(this.state.paySuiteInfo.orgId)

            this.orgSelectedName = [];
            this.orgSelectedID = this.state.paySuiteInfo.orgId ? JSON.parse(this.state.paySuiteInfo.orgId) : [];
            this.showOrgCheckedItem(this.org,this.orgSelectedID);

            this.$nextTick(()=>{
                // 刷新工资项目表
                this.$refs.paysuiteitemstable && this.$refs.paysuiteitemstable.refresh();
                // 刷新公式套表
                this.$refs.paysuiteformulatable && this.$refs.paysuiteformulatable.refresh();
            })

        },

        // 展示员工范围
        showEmpScope(){

            let userTypeName = '';
            let userTypes = this.state.paySuiteInfo.employeeType.split(',');

            userTypes&&userTypes.forEach((item,index)=>{

                let t = this.state.commonData.userTypes[item];
                userTypeName += t ? t.codeName + (index == userTypes.length - 1 ? '' : ',') : '';
            })

            return '【类型】' + userTypeName + '【组织】' + this.orgSelectedName;

        },

        // 保存计算顺序
        saveCountOrder(){

            let data = {
                order:[]
            }

            console.log(window.orderData)

            for( let key in window.orderData){
                data.order.push({
                    ID:key,
                    orderNum:window.orderData[key]
                })
            }

            data.order = JSON.stringify(data.order);

            store.actions.savePaySuiteItemsOrder(data,()=>{

                // 刷新工资项目表
                this.$refs.paysuiteitemstable && this.$refs.paysuiteitemstable.refresh();


            },()=>{

                // 刷新工资项目表
                this.$refs.paysuiteitemstable && this.$refs.paysuiteitemstable.refresh();


            });

        },

    },
    events:{
        // 显示弹窗
        showModalOfSuite(type,isLarge){

            console.log(123)

            this.modalComponents = 'editPaySuite';

            if(type=='add'){
                this.modalTitle = '添加工资套';
            }
            else if(type=='update'){
                this.modalTitle = '修改工资套信息';
            }
            else if(type=='delete'){


                this.$root.showConfirm({
                    msg:'该工资套下还有员工未移除，确认删除将自动移除员工，您确定要删除吗？',
                    ok:()=>{
                        store.actions.deletePaysuite(()=>{

                            store.actions.getSuiteList(()=>{
                                this.$refs.paysuitelist.suiteIndex = 0;
                                this.showSuiteData(0)
                            });

                        })
                    }
                })

                return;
                // this.modalTitle = '删除工资套';
            }
            else if(type=='copy'){
                this.modalTitle = '复制工资套';
            }
            else if(type=='import'){
                this.modalTitle = '导入工资数据';
            }
            else if(type=='export'){

                if(!this.state.paySuiteInfo.ID){
                    this.$root.showTip({
                        type:'warning',
                        msg:'请先选择要操作的工资套'
                    })

                    return;
                };

                let fileName = '工资套导出';
                let tableTitle = '工资套名称,工资项目,类别,小数位数,计算顺序,工资项目内容';
                let tableID = 'suiteName,itemName,type,pointNum,orderNum,formula';

                let params = `suiteID=${this.state.paySuiteInfo.ID}&expType=suite&fileName=${fileName}&titles=${tableTitle}&fields=${tableID}`

                this.$root.downloadFile('Pay/export',encodeURI(params))

                return;

            }
            else if(type=='addSuiteItem'){

                this.modalTitle = '添加工资套项目';
                this.modalComponents = 'editPaySuiteItems';
            }
            else if(type=='updateSuiteItem'){


                if(this.selected.length==0){

                    this.$root.showTip({
                        type:'warning',
                        msg:'请先选择要操作的项目'
                    })

                    return;
                }
                else if(this.selected.length>1){

                    this.$root.showTip({
                        type:'warning',
                        msg:'只能针对一个工资项目进行修改操作'
                    })

                    return;
                }

                // 共享当前选中项信息
                store.actions.setPaySuiteItemInfo(this.selectedData[this.selected[0]]);

                console.log(this.selectedData[this.selected[0]])


                this.modalTitle = '修改工资套项目';
                this.modalComponents = 'editPaySuiteItems';
            }
            else if(type=='delSuiteItem'){

                let item = this.selectedData[this.selected[0]];
                store.actions.deletePaySuiteItems(this.state.paySuiteInfo.ID,[item.ID],()=>{
                    this.$refs.paysuiteitemstable && this.$refs.paysuiteitemstable.refresh();
                })

                return;

                // this.$root.showConfirm({
                //     msg:'确定要删除吗？'
                // })


                // return;


                // if(this.selected.length==0){

                //     this.$root.showTip({
                //         type:'warning',
                //         msg:'请先选择要操作的项目'
                //     })

                //     return;
                // }
                // // 系统内置项不能删除
                // if(this.selectedData[this.selected[0]].type=='142003'){

                //     this.$root.showTip({
                //         type:'warning',
                //         msg:'系统内置项目不能删除'
                //     })

                //     return;
                // }

                // this.modalTitle = '删除工资套项目';
                // this.modalComponents = 'editPaySuiteItems';
            }
            else if(type=='showPersons' || type=='showSearchPersons'){

                if(!this.state.paySuiteInfo.ID){

                    this.$root.showTip({
                        type:'warning',
                        msg:'请先选择要操作的工资套'
                    })

                    return;
                }

                this.modalTitle = '人员列表';
            }

            else{
                return;
            }

            this.modalType = isLarge ? 'large' : 'normal';
            this.modalShow = true;
            this.ctrltype = type;

        },


    }
}
</script>
<style lang="scss">
.mod-paySeriesSuite{
    height: 100%;

    .mod-suite{
        padding-right: 20px;
    }
    .com-col-m1-left{
        margin-top: 20px;
        margin-bottom: 20px;
        padding-top: 0;
        border-right: 1px solid #ddd;
    }
    .com-col-m1-middle{
        padding-right: 0;
    }

    .mod-suite-title{
        border-left: 6px solid #a9adb9;
        padding-left: 10px;
        margin: 20px 0;
        /*background: #eee;*/
        padding: 5px 10px;
    }
    .mod-suite-title ._tit{
        font-size: 18px;
    }
    .mod-suite-title ._tool{
        float: right;
        margin-left: 30px;
    }
    .mod-suite-cont{
        margin-bottom: 20px;
    }

    ._tableTool{
        text-align: center;
    }
    ._tableTool a{
        color: #666;
    }
    ._tableTool a:hover{
        color: #333;
    }
    .mod-suite-info {
        border-radius: 6px;
        border:1px solid #ddd;
        padding:20px 10px 5px 10px;
        margin-top:10px;
    }

    ._infoText{
        line-height: 36px;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow:hidden;
    }

    ._suiteItemsTool{
        line-height: 40px;
        margin-bottom:10px;
        overflow:hidden;

        ._tipmsg{
            color: #fd6551;
        }
    }

}

</style>
