<!--
* @Created Date       : 2016-11-10T18:31:55+08:00
* @Last Modified time : 2016-12-02T16:01:48+08:00
 -->


<template>
<div class="editPaySuite">
    <!-- 添加修改工资套 人员范围 -->
    <template v-if="ctrltype=='add' || ctrltype=='update'">
        <!-- <div class="form-horizontal container-fluid" role="form"> -->
        <ui-validator @successed="updatePaysuite">
        <div validator="form" class="form-horizontal container-fluid" vali-submit="editPaySuiteSubmit1" >
            <div class="form-body" style="padding-bottom: 20px;">
                <div class="row">
                    <div class="col-sm-24">
                        <div class="form-group row">
                            <label class="col-sm-6 control-label">工资套名称</label>
                            <div class="col-sm-18">
                                <div class="input-inline input-medium">
                                    <input type="text" class="form-control" placeholder="工资套名称" v-model="suiteInfo.suiteName" vali="required" vali-msg="必填项">
                                </div>
                                <!-- <span class="help-block">必填项</span> -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-24">
                        <div class="form-group row">
                            <label class="col-sm-6 control-label">员工范围</label>
                            <div class="col-sm-18">
                                <div class="input-inline input-medium">
                                    <combo-tree
                                        :treedata="org"
                                        :multiple="true"
                                        idprop="ID"
                                        :rootvisible="false"
                                        :nodeclicked="nodeClicked"
                                        :checkable="true"

                                        :ancestorcheck="true"
                                        :checkstrict="false"

                                    >
                                        <div data-toggle="dropdown">
                                            <div class="input-group">
                                                <input type="text" class="form-control" value="{{suiteInfo.orgDisplayName}}" placeholder="请选择组织" readonly>
                                                <span class="input-group-addon">
                                                    <i class="icon-tool icon-tool-search"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </combo-tree>

                                </div>
                                <!-- <span class="help-block">必填项</span> -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-24">
                        <div class="form-group row">
                            <label class="col-sm-6 control-label">员工状态</label>
                            <div class="col-sm-18">
                                <!-- <div class="input-inline input-medium">
                                    <select v-model="suiteInfo.userType" class="form-control">
                                      <option value="">请选择用工类型</option>
                                      <template v-for="item in state.commonData.userTypes">
                                        <option value="{{item.code}}" :selected="item.code==suiteInfo.userType">{{item.codeName}}</option>
                                      </template>
                                    </select>
                                </div> -->
                                <!-- {{suiteInfo.userType}} -->
                                <v-select :options="state.commonData.userTypeOptions" :value.sync="suiteInfo.userType" :fluid="true" :multiple="true" placeholder="请选择用工类型">
                                </v-select>

                                <!-- <span class="help-block">必填项</span> -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <div class="row">
                        <div class="text-center">
                            <ui-button id="editPaySuiteSubmit1" color="accent">提交</ui-button>
                            <ui-button color="default" @click="$emit('close')">取消</ui-button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </ui-validator>
        <!-- </div> -->
    </template>
    <!-- 复制工资套 -->
    <template v-if="ctrltype=='copy'">
        <ui-validator @successed="copyPaysuite">
        <div validator="form" class="form-horizontal container-fluid" vali-submit="copyPaysuiteBtn" >
            <div class="form-body">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-5 control-label">
                            工资套
                        </div>
                        <div class="col-sm-18 control-label" style="text-align: left;">
                            <strong>{{suiteInfo.suiteName}}</strong>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-sm-5 control-label">
                            复制给
                        </div>
                        <div class="col-sm-18">
                            <div class="input-inline input-medium">
                                <input type="name" class="form-control" placeholder="工资套名称" v-model="copyNameOfSuite" vali="required" vali-msg="必填项">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="_copyTip">提示：只复制了工资项目，请给新工资套添加员工</div>
                <div class="form-actions">
                    <div class="row">
                        <div class="text-center">
                            <ui-button id="copyPaysuiteBtn" color="accent">确定</ui-button>
                            <ui-button color="default" @click="$emit('close')">取消</ui-button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </ui-validator>
    </template>
    <!-- 删除 -->

    <!-- 导入 -->
    <template v-if="ctrltype=='import'">
        <ui-simpleupload
            url="api.Pay.paySeriesImport"
            fileparam="file"
            uploading-msg="导入进度"
            :params="{imptype:'suite'}"
            :complete="importPaysuite"
            filetype="xls,xlsx"
            >
        </ui-simpleupload>
    </template>
    <!-- 导出 -->
    <template v-if="ctrltype=='export'">
        <div class="_tipMsg text-center">导出</div>
        <div class="text-center">
            <ui-button id="submitBtn" color="accent" @click="exportPaysuite">确定</ui-button>
            <ui-button color="default" @click="$emit('close')">取消</ui-button>
        </div>
    </template>

    <!-- 查看工资套人员 -->
    <template v-if="ctrltype=='showPersons' || ctrltype=='showSearchPersons' ">

        <!-- <div class="form-horizontal" style="margin-bottom: 20px;">
            <div class="form-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="input-group" >
                            <input type="text" class="form-control"  placeholder="请输入员工姓名搜索" readonly>
                            <span class="input-group-addon" style="cursor:pointer;" @click="">
                                <i class="material-icons">search</i>
                            </span>
                        </div>
                    </div>
                    <div class="col-sm-12 form-group">
                        <div class="control-label" style="text-align: left;">共有 {{totalPeople}} 人</div>
                    </div>
                </div>
            </div>
        </div> -->

        <ui-grid v-ref:table class="ui-table-simple gridTable"
            url='api.Pay.selectEmployeeBySuite'
            :fields="fields"
            :append-params="searchParams"
            :perpage="30"
            :pages="[10,20,30,50]"
            :btrefresh="true"
            :total.sync = "totalPeople"
            height="500px"
        ></ui-grid>

    </template>


</div>
</template>
<script>
import store from '../store'
export default {
    data(){
        return {

            state:store.state,

            org: {},        // 组织树

            // 工资套数据
            suiteInfo:{
                suiteName:'',
                userType:[],
                dropname: [{
                    label: '选择组织'
                }],
                dropvalue: [],
                orgDisplayName: [],
                orgDisplayID: [],
            },

            // 复制工资套名字
            copyNameOfSuite:'',


            // selected: [],
            // selectedData:{},
            totalPeople:0,
            fields: [
                {
                    name: 'userNum',
                    title: '员工工号',
                    width: 100,
                    locked: 'first'
                },
                {
                    name: 'userName',
                    title: '姓名',
                    width: 100,
                    locked: 'first'
                },
                {
                    name: 'formulaName',
                    title: '所属公式套',
                    width: '150px'
                },
                // {
                //     name: 'genderName',
                //     title: '性别',
                //     width: '100px'
                // },
                // {
                //     name: 'nationName',
                //     title: '民族',
                //     width: '100px'
                // },
                {
                    name: 'orgData',
                    title: '组织',
                    formater: function(value, data, index) {
                        var org = data.deptName || '';
                        if (data.storeName) {
                            org += "/" + data.storeName;
                        }
                        if (data.teamName) {
                            org += "/" + data.teamName;
                        }
                        return org;
                    },
                    width: 200,
                },
                {
                    name: 'state',
                    title: '员工状态',
                },
                {
                    name: 'positionName',
                    title: '职位',
                },
                {
                    name: 'ranksalary',
                    title: '职级工资',
                },
                {
                    name: 'postName',
                    title: '岗位',
                },
                {
                    name: 'postsalary',
                    title: '岗位工资',
                },
            ],

            /* 查询人员附加参数 */
            searchParams:{
                suiteId:'',
                name:''
            },

        }
    },
    props:{
        ctrltype:{
            type:String
        }
    },
    attached(){
        this.initModal();
    },
    ready(){
    },
    methods:{
        initModal(){
            console.log(this.ctrltype)

            if(this.ctrltype=='add'){
                this.getOrgTree();
                this.suiteInfo.orgDisplayID = [];
                this.suiteInfo.orgDisplayName = [];
            }
            // 更新信息
            else if(this.ctrltype=='update'){


                this.suiteInfo.suiteName = this.state.paySuiteInfo.suiteName;

                if(this.state.paySuiteInfo.employeeType){

                    // userType
                    this.suiteInfo.userType = this.state.paySuiteInfo.employeeType.split(',');
                    this.suiteInfo.userType = this.suiteInfo.userType.filter(item=>{

                        // 清空旧数据
                        return !!item && this.state.commonData.userTypes[item];
                    })


                }else{
                    this.suiteInfo.userType = [];
                }

                // orgID 转 数组
                this.suiteInfo.orgDisplayID = this.state.paySuiteInfo.orgId ? JSON.parse(this.state.paySuiteInfo.orgId) : [];

                this.getOrgTree();

            }
            else if(this.ctrltype=='copy'){

                this.suiteInfo.suiteName = this.state.paySuiteInfo.suiteName;


                if(this.state.paySuiteInfo.employeeType){

                    // userType
                    this.suiteInfo.userType = this.state.paySuiteInfo.employeeType.split(',');
                    this.suiteInfo.userType = this.suiteInfo.userType.filter(item=>{
                        return !!item;
                    })

                }else{
                    this.suiteInfo.userType = [];
                }

                // orgID 转 数组
                this.suiteInfo.orgDisplayID = this.state.paySuiteInfo.orgId ? JSON.parse(this.state.paySuiteInfo.orgId) : [];

            }
            else if(this.ctrltype == 'showPersons'){
                this.searchParams.suiteId = this.state.paySuiteInfo.ID;
                this.searchParams.name = '';
            }

            else if(this.ctrltype == 'showSearchPersons'){
                this.searchParams.suiteId = this.state.paySuiteInfo.ID;
                this.searchParams.name = this.state.paySuiteSearchUser;
            }

        },
        getOrgTree(){

            //加载组织树
            store.actions.loadOrgListTree(data => {

                this.org = data;

                this.showOrgCheckedItem(this.org,this.suiteInfo.orgDisplayID);

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
                        this.suiteInfo.orgDisplayName.push(tree.children[i].text);
                        this.$root.Vue.set(tree.children[i],'checked',true);
                    }

                    this.showOrgCheckedItem(tree.children[i],selectedIDs);
                }
            }
        },
        /**
         * 点击组织树
         * [nodeClicked description]
         * @return {[type]} [description]
         */
        nodeClicked(data) {
            this.suiteInfo.orgDisplayName = [];
            this.suiteInfo.orgDisplayID = [];
            for (var i = 0; i < data.length; i++) {
                this.suiteInfo.orgDisplayName.$set(this.suiteInfo.orgDisplayName.length, data[i].text);
                this.suiteInfo.orgDisplayID.$set(this.suiteInfo.orgDisplayID.length, data[i].organizeID);
            }
            console.error(this.suiteInfo.orgDisplayID)

        },

        /* 添加，修改工资套 */
        updatePaysuite(){

            console.log('添加，修改工资套')

            let data = {
                suiteName:this.suiteInfo.suiteName,
                orgId:JSON.stringify(this.suiteInfo.orgDisplayID),
                employeeType:this.suiteInfo.userType.join(','),
            }

            // console.log(data)

            if(this.ctrltype=='add'){
                store.actions.addPaysuite(data,()=>{

                    this.$emit('close');
                    this.$emit('callback','add',true)

                })
            }
            else if(this.ctrltype=='update'){
                store.actions.updatePaysuite(data,()=>{

                    this.$emit('close');
                    this.$emit('callback','update',true)

                })
            }

        },

        // 复制工资套
        copyPaysuite(){

            if(!this.copyNameOfSuite.replace(/\s/ig,'')){

                this.$root.showTip({
                    type:'warning',
                    msg:'请填写新工资套名字'
                })

                return;
            }

            store.actions.copyPaysuite(this.copyNameOfSuite,()=>{
                this.$emit('close');
                this.$emit('callback','copy',true)
            })
        },

        // 删除工资套
        deletePaysuite(){
            store.actions.deletePaysuite(()=>{
                this.$emit('close');
                this.$emit('callback','delete',true)
            })
        },
        // 导入工资套
        importPaysuite(){
            this.$emit('close');
            this.$emit('callback','import',true)
        },
    }

}
</script>
<style lang="scss">
.editPaySuite {

    ._tipMsg{
        padding: 10px 0 30px;
        font-size: 14px;
    }
    ._copyTip{
        color: #fd6551;
        text-indent: 20px;
        padding-top: 10px;
    }
    .form-actions{
        padding-top: 30px;
    }
}
</style>
