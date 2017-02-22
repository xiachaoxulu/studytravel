   <template>
    <!-- 模块主内容 -->
    <section class="posted-page">
        <header class="ui-module-navbar pos-topbar-fixed">
            <div class="ui-module-navbar-content">
                <div class="back-btn pull-left">
                    <strong class="app-schedule-title">已发布岗位</strong>
                    <ui-search  :value.sync="empKey" :search-callback="searchEmp" placeholder="搜索岗位"></ui-search>
                </div>
                <div class="back-btn pull-right" style="margin-right: 30px;">
                    <button class="ui-tool-button" @click="goRevocationPost()" >
                        <span class="icon icon-tool icon-tool-save pull-left"></span>
                        <span class="_name pull-left" __code="recruitment-posted-revoke/撤回">撤回</span>
                    </button>
                    <!--<div class="revocation"><a href="javascript:void(0)" @click="goRevocationPost()">撤回</a></div>-->
                </div>
            </div>


        </header>
        <div class="ui-module-row wrap">
            <!--  -->
            <div class="com-col-m1-left ui-panel">
                <ui-scrollview>
                    <!--<ui-tree :data="state.brandAreaStoreTree" :root="state.brandAreaStoreTree" :nodeclicked="orgClicked"-->
                             <!--:idprop="ID" :rootvisible="false"></ui-tree>-->
                    <ui-tree :data="state.companyDeptStoreTree" :root="state.companyDeptStoreTree"
                             :nodeclicked="orgClicked" :idprop="ID" :rootvisible="false"></ui-tree>
                </ui-scrollview>
            </div>
            <div class="com-col-m1-middle ui-panel">
                <ui-grid v-ref:table :total.sync="total" class="testtable"
                         :url="url"
                         :append-params="searchFor"
                         :fields="fields"
                         :perpage="30"
                         :pages="[10,20,30,50]"
                         selectable="multi"
                         :reader="reader"
                         :btrefresh="true" checked="multi" :selected.sync="selected":selected-data.sync="selectedData"  height="auto"
                         tdheight="50px"></ui-grid>

                <ui-button color="success" @click="goExportPost()" class="large releaseBtn" __code="recruitment-posted-export/导出">导出</ui-button>

            </div>
        </div>
    </section>
</template>
<script>
    import store from '../store'
    export  default{
        data(){
            return {
                state: store.state,
                showLoading: false,
                empKey:'',

                total: 0, //员工总数
                editId: '', //编辑的ID
                chooseShow: false, //筛选
                whatShow: false, //控制动态组件显示与否
                what: '', //动态组件名称
                selected: [], //表格选中IDs
                selectedData:{},
                searchFor: {
                    postName: '',
                    type: 1
                }, //查询关键字
                url: 'api.Recruitment.listPost', //访问花名册后台接口
                queryParams: {}, //查询参数
                fields: [{
                    name: 'postName',
                    title: '岗位名称',
                    width: '100px',
                    locked: 'first'
                }, {
                    name: 'authorized',
                    title: '定编',
                    width: '100px',
                }, {
                    name: 'personnum',
                    title: '招聘人数',
                    width:'100px'
//                    formater(value, data, index) {
//                        return '<div ><input type="number"  value="' + value + '" onblur="postRelease.editPersonnum(this.value,\'' + data.ID + '\')"></div>';
//                    },
                },{
                    name: 'postContent',
                    title: '岗位说明书',
                    width: '100px',
                    formater(value, data, index) {
                        if(value){
                            return '<a href="' + value + '" target="_blank">点击下载</a>';
                        }else{
                            return '<a href="javascript:void(0)" target="_blank">暂无</a>';
                        }
                    },
                }, {
                    name: 'postDuty',
                    title: '岗位职责',
                    width: '100px',
                    formater(value, data, index) {
                        if(value){
                            return '<a href="' + value + '" target="_blank">点击下载</a>';
                        }else{
                            return '<a href="javascript:void(0)" target="_blank">暂无</a>';
                        }
                    },
                }, {
                    name: 'postDemand',
                    title: '岗位要求',
                    width: '100px',
                    formater(value, data, index) {
                        if(value){
                            return '<a href="' + value + '" target="_blank">点击下载</a>';
                        }else{
                            return '<a href="javascript:void(0)" target="_blank">暂无</a>';
                        }                    },
                }, {
                    name: 'type',
                    title: '岗位状态',
                    width: '100px',
                    formater(value, data, index){
                        if (value == 1) {
                            return '<div style="color: #0ed185;">已发布</div>';
                        } else {
                            return '<div>未发布</div>';
                        }
                    }
                }],
            }
        },
        methods: {
            orgClicked(data){
                Object.assign(this.searchFor, {
                    organizeID: JSON.stringify(data.organizeID),
                });
                this.$refs.table.refresh();
            },
            goExportPost(){
            },
            goRevocationPost(){
                var self=this;
                store.actions.goRevocationPost(this.selected,this.selectedData,function (data) {
                    if (data){
                        self.$refs.table.refresh();
                        self.$parent.$parent.$broadcast('refreshPostGrid')
                    }
                });
            },
            searchEmp(){
                Object.assign(this.searchFor,{
                    postName:this.empKey
                })
                this.$refs.table.refresh();
            }
        },
        watch: {},
        ready() {
            var self = this;
            store.actions.loadCompanyDeptStore();
//            self.searchFor.startDate = (self.state.startTime.replace('/', '-'));
//            self.searchFor.endDate = (self.state.endTime.replace('/', '-'));
//            self.searchFor.organizeIDs = [];
//            self.searchFor.IDs = JSON.stringify(self.state.orgDisplayID);
            self.$refs.table.refresh();
        },
        created(){

        }
    }

</script>
<style scoped>
    .posted-page {
        height: 100%;
        overflow: hidden;
        background: #fff;
    }

    .posted-page .wrap {

    }

    .com-col-m1-middle {
        right: 0 !important;
        left: 207px !important;
    }

    .ui-tablebox {
        left: 20px !important;
        top: 20px !important;
        right: 20px !important;
        bottom: 80px !important;
    }

    .releaseBtn {
        position: absolute;
        bottom: 20px;
        left: 50%;
        margin-left: -100px;
    }

    .revocation {
        position: absolute;
        bottom: 20px;
        left: 50%;
        height: 40px;
        line-height: 40px;
        margin-left: 150px;
    }
    .app-schedule-title{
        margin-right: 20px;
    }
</style>

