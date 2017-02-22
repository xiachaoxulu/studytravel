<template>
    <!-- 模块主内容 -->
    <section class="ui-module-content pos-content demoShow">
        <div class="ui-module-row">
            <!--  -->
            <div class="com-col-m1-left ui-panel">
                <ui-scrollview>
                    <!--<ui-tree :data="state.brandAreaStoreTree" :root="state.brandAreaStoreTree" :nodeclicked="orgClicked"-->
                    <!--:idprop="ID" :rootvisible="false"></ui-tree>-->
                    <!--<hr class="divider"/>-->
                    
                    <ui-tree :data="state.companyDeptStoreTree" :root="state.companyDeptStoreTree" :nodeclicked="orgClicked" idprop="ID" :rootvisible="false" :selectedvalue.sync="treeSelected"></ui-tree>
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
                         :btrefresh="true" checked="multi" :selected.sync="selected" :selected-data.sync="selectedData"
                         height="auto"
                         tdheight="50px"></ui-grid>

                <ui-button color="success" @click="goReleasePost()" class="large releaseBtn">发布</ui-button>

            </div>


        </div>
    </section>
</template>
<script>
    import store from '../store'
    import Vue from 'vue'
    export  default{
        data(){
            return {
                state: store.state,
                showLoading: false,
                treeSelected:[],

                organizeIDs:[],
                total: 0, //员工总数
                editId: '', //编辑的ID
                chooseShow: false, //筛选
                whatShow: false, //控制动态组件显示与否
                what: '', //动态组件名称
                selected: [], //表格选中IDs
                selectedData: {},
                searchFor: {
                    postName: '',
                    type: 0,
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
                    name: 'atPost',
                    title: '在岗人数',
                    width: '100px'
                }, {
                    name: 'lossPost',
                    title: '超缺编',
                    width: '100px'
                }, {
                    name: 'personnum',
                    title: '招聘人数',
                    formater(value, data, index) {
                        return '<div ><input @oninput="postRelease.onInputClear(this.value)" type="number" min="0" value="' + value + '" onblur="postRelease.editPersonnum(this.value,\'' + data.ID + '\')"></div>';
                    },
                },  {
                    name: 'postContent',
                    title: '岗位说明书',
                    width: '100px',
                    formater(value, data, index) {
                        if (value) {
                            return '<a href="' + value + '" target="_blank">点击下载</a>';
                        } else {
                            return '<a href="javascript:void(0)" target="_blank">暂无</a>';
                        }
                    },
                }, {
                    name: 'postDuty',
                    title: '岗位职责',
                    width: '100px',
                    formater(value, data, index) {
                        if (value) {
                            return '<a href="' + value + '" target="_blank">点击下载</a>';
                        } else {
                            return '<a href="javascript:void(0)" target="_blank">暂无</a>';
                        }
                    },
                }, {
                    name: 'postDemand',
                    title: '岗位要求',
                    width: '100px',
                    formater(value, data, index) {
                        if (value) {
                            return '<a href="' + value + '" target="_blank">点击下载</a>';
                        } else {
                            return '<a href="javascript:void(0)" target="_blank">暂无</a>';
                        }
                    },
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
                this.organizeIDs=[];
                this.organizeIDs.push(data.organizeID);
                this.traverseOrganizeID(data);
                Object.assign(this.searchFor, {
                    organizeID: JSON.stringify(this.organizeIDs),
                });
                console.log(this.organizeIDs);
                this.$refs.table.refresh();
            },
            traverseOrganizeID(data){
                if(data.children){
                    for(var i=0;i< data.children.length;i++){
                        this.organizeIDs.push(data.children[i].organizeID)
                        this.traverseOrganizeID(data.children[i])
                    }
                    return data.children;
                }
            },
            goReleasePost(){
                var self = this;
                store.actions.goReleasePost(this.selected, this.selectedData, function (data) {
                    if (data)self.$refs.table.refresh();
                });
            },
            editPersonnum(value, dataID){
                store.actions.editPersonnum(value, dataID);
            },
            onInputClear(value){
                if (value < 0) {
                    value = 0
                }
                return value;
            }
        },
        events: {
            searchPost(data){
                console.log(data);
                Object.assign(this.searchFor, {
                    postName: data,
                });
                this.$refs.table.refresh();
            },
            exportPostFn(){
                this.$root.downloadFile('acewill/pcrecruit/exportPost.htm','ids='+JSON.stringify(this.selected));
            },
            refreshPostGrid(){
                this.$refs.table.refresh();
            }
        },
        watch: {
            'selected'(){
                store.actions.setSelected(this.selected);
            }
        },
        ready() {
            window.postRelease = this;
            store.actions.loadCompanyDeptStore();
            this.$refs.table.refresh();
        },
        created(){

        }
    }

</script>
<style scoped>
    .com-col-m1-middle {
        left: 207px !important;
        right: 0 !important;
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
</style>

