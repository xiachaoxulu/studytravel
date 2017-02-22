<template>
    <!-- 模块主内容 -->
    <section class="ui-module-content pos-content mod-resume">
        <div class="ui-module-row">
            <div class="com-col-m1-middle ui-panel">
                <ui-grid v-ref:table :total.sync="total" class="testtable"
                         :url="url"
                         :append-params="searchFor"
                         :fields="fields"
                         :perpage="30"
                         :pages="[10,20,30,50]"
                         selectable="multi"
                         :reader="reader"
                         :btrefresh="true" checked="multi" :selected.sync="selected" height="auto"
                         tdheight="50px"></ui-grid>

                <ui-button color="success" @click="goDeleteResume()" class="large releaseBtn" __code="recruitment-resume-del/删除">删除</ui-button>

            </div>
        </div>
        <ui-sidebar :show.sync="show" title="个人简历" layout="header-content-footer">
            <div slot="content">
                <ui-collapse :toggle="true" title="基本信息" icon="icon-grpj" mt20="mt20">
                    <ul class="info-list">
                        <li>
                            <span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span><b>{{state.resumeMoreData.name}}</b>
                        </li>
                        <li><span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</span><b>{{state.resumeMoreData.sex}}</b>
                        </li>
                        <li><span>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄</span><b>{{state.resumeMoreData.age
                            }}</b></li>
                        <li><span>学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历</span><b>{{state.resumeMoreData.education}}</b>
                        </li>
                        <li>
                            <span>民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族</span><b>{{state.resumeMoreData.nation}}</b>
                        </li>
                        <li><span>婚姻状况</span><b>{{state.resumeMoreData.marriage}}</b></li>
                    </ul>
                </ui-collapse>
                <ui-collapse title="就业信息" icon="icon-jyxx" no-border="borderNone">
                    <ul class="info-list">
                        <li><span>申请岗位</span><b>{{state.resumeMoreData.postname}}</b></li>
                        <li><span>到岗时间</span><b>{{state.resumeMoreData.workdate}}</b></li>
                        <li><span>用工类型</span><b>{{state.resumeMoreData.worktype}}</b></li>
                    </ul>
                </ui-collapse>
                <ui-collapse title="联系方式" icon="icon-lxfs" no-border="borderNone">
                    <ul class="info-list">
                        <li><span>手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</span><b>{{state.resumeMoreData.phone}}</b>
                        </li>
                        <li><span>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱</span><b>{{state.resumeMoreData.email}}</b>
                        </li>
                        <li><span>紧&nbsp;&nbsp;急&nbsp;&nbsp;联&nbsp;&nbsp;系&nbsp;人</span><b>{{state.resumeMoreData.othername}}</b>
                        </li>
                        <li><span>紧急联系人电话</span><b>{{state.resumeMoreData.otherphone}}</b></li>
                    </ul>
                </ui-collapse>
                <ui-collapse title="居住信息" icon="icon-jzxx" no-border="borderNone">
                    <ul class="info-list">
                        <li><span>居&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;住&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地</span><b>{{state.resumeMoreData.address}}</b>
                        </li>
                        <li><span>目前所在城市</span><b>{{state.resumeMoreData.city}}</b></li>
                        <li><span>理想就职城市</span><b>{{state.resumeMoreData.dreamcity}}</b></li>
                    </ul>
                </ui-collapse>
                <ui-collapse title="个人评价" icon="icon-grpj" no-border="borderNone">
                    <ul class="info-list">
                        <li><span class="my-evaluate-span">自我评价</span><b class="my-evaluate-b">{{state.resumeMoreData.des}}</b>
                        </li>
                    </ul>
                </ui-collapse>
                <ui-collapse title="工作经历" icon="icon-gzjl" no-border="borderNone">
                    <ul class="info-list">
                        <li v-for="item in state.resumeMoreData.workexperience"><span>{{item.startdate}}  到  {{item.enddate}}</span><b>{{item.des}}</b>
                        </li>
                    </ul>
                </ui-collapse>
                <ui-collapse title="教育培训" icon="icon-jypx" no-border="borderNone">
                    <ul class="info-list">
                        <li v-for="item in state.resumeMoreData.studyexperience"><span>{{item.startdate}}  到  {{item.enddate}}</span><b>{{item.des}}</b>
                        </li>
                    </ul>
                </ui-collapse>
            </div>
            <div slot="footer">
                <ui-button color="success" @click="exportRecurit" class=" export-recurit">导出</ui-button>
            </div>
        </ui-sidebar>
    </section>
</template>
<script>
    import store from '../store'
    import Vue from 'vue'
    const Tool = Vue.tool;
    export  default{
        data(){
            return {
                state: store.state,
                show: false,
                toggleBar: [],

                showLoading: false,
                exportRecuritID:'',//导出简历ID
                selectedDataL: {},
                total: 0, //员工总数
                editId: '', //编辑的ID
                chooseShow: false, //筛选
                whatShow: false, //控制动态组件显示与否
                what: '', //动态组件名称
                selected: [], //表格选中IDs
                searchFor: {
                    userName: ''
                }, //查询关键字
                url: 'api.Recruitment.listRecurit', //访问花名册后台接口
                queryParams: {}, //查询参数
                fields: [{
                    name: 'name',
                    title: '姓名',
                    locked: 'first',
                    width: '150px',
                    formater: function (value, data, index) {
                        moreReseme.selectedDataL = data;
                        return '<div style="cursor: pointer;" onclick="moreReseme.showModalmoreResemeList(\'' + data.ID + '\')">' + value + '<span style="color: #0ed185;margin-left: 10px;">[查看]</span></div>';
                    },
                }, {
                    name: 'sex',
                    title: '性别',
                }, {
                    name: 'age',
                    title: '年龄',
                }, {
                    name: 'phone',
                    title: '手机号',
                }, {
                    name: 'email',
                    title: '邮箱',
                }, {
                    name: 'createTime',
                    title: '申请日期',
                    formater: function (value, data, index) {
                        return Tool.iDate(value, 'yy-mm-dd').string;
                    },
                }, {
                    name: 'worktype',
                    title: '用工类型',
                }, {
                    name: 'postName',
                    title: '申请岗位',
                }, {
                    name: 'type',
                    title: '简历状态',
                },
//                    {
//                    name: 'worktype',
//                    title: '编码',
//                }
//                    , {
//                    name: 'worktype',
//                    title: '申请岗位',
//                }, {
//                    name: 'worktype',
//                    title: '简历状态',
//                }, {
//                    name: 'worktype',
//                    title: '简历阶段',
//                }
                ],


            }
        },
        methods: {
            showModalmoreResemeList(id){
                this.exportRecuritID=id;
                this.show = true;
                store.actions.showModalmoreResemeList(id, function (data) {

                });
            },
            goDeleteResume(){
                var self = this;
                console.log(this);
                store.actions.goDeleteResume(this.selected, function (data) {
                    if (data)self.$refs.table.refresh();
                });
            },
            exportRecurit(){
                this.$root.downloadFile('acewill/pcrecruit/exportRecurit.htm','id='+this.exportRecuritID);
            }

        },
        created(){
            window.moreReseme = this;
        },
        ready(){
            this.$refs.table.refresh();
        }
    }

</script>
<style lang="scss">
    .mod-resume {

    .com-col-m1-middle {
        right: 0 !important;
        left: 0 !important;
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

    .ui-module-slider-footer {
        border-top:1px solid #ccc;
        background: #fff !important;
    }

    .export-recurit {
        float: left;
        margin-left: 20px;
        margin-top: 10px;
    }

    ul.info-list {
        margin-left: 54px;
    }

    ul.info-list li {
        line-height: 24px;
    }

    ul.info-list li span {
        color: #a2a2a2;
        margin-right: 15px;
    }

    ul.info-list li b {
        font-weight: normal;
        color: #000000;
    }

    .my-evaluate-span {
        display: block;
        float: left;
    }

    .my-evaluate-b {
        display: block;
        margin-left: 71px;
        margin-right: 10px;
    }

    .icon-jbxi, .icon-grpj, .icon-gzjl, .icon-jbxi, .icon-jypx, .icon-jyxx, .icon-jzxx, .icon-lxfs {
        display: block;
        float: left;
        width: 30px;
        height: 28px;
        margin-right: 24px;
    }

    .borderNone {
        border-top: none !important;
    }

    .mt20 {
        margin-top: 20px !important;
    }

    .icon-jbxi {
        background: url(../../../assets/images/jbxi.png) no-repeat;
    }

    .icon-grpj {
        background: url(../../../assets/images/grpj.png) no-repeat;
    }

    .icon-gzjl {
        background: url(../../../assets/images/gzjl.png) no-repeat;
    }

    .icon-jypx {
        background: url(../../../assets/images/jypx.png) no-repeat;
    }

    .icon-jyxx {
        background: url(../../../assets/images/jyxx.png) no-repeat;
    }

    .icon-jzxx {
        background: url(../../../assets/images/jzxx.png) no-repeat;
    }

    .icon-lxfs {
        background: url(../../../assets/images/lxfs.png) no-repeat;
    }

    }
</style>


