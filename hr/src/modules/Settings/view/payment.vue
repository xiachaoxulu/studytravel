<!-- 系统配置页面，用户配置离职原因等各种 -->
<template>
    <header class="ui-module-navbar pos-topbar-fixed mod-payment-header">
        <div class="ui-module-navbar-content">
            <div class="pull-left _title">
                <h4><strong>薪酬规则</strong></h4>
            </div>
            <div class="pull-left emp-center-tab">
                <ui-buttongroup active-class="btn-primary">
                    <button type="button" class="btn btn-primary" @click="rankSalary">职级工资</button>
                    <button type="button" class="btn btn-default" @click="postSalary">岗位工资</button>
                </ui-buttongroup>
            </div>
            <div class="pull-right _menuMore">
                <!--<button type="button " class="ui-tool-button" @click="save">-->
                    <!--<span class="icon icon-tool icon-tool-edit pull-left"></span>-->
                    <!--<span class="_name pull-left">修改</span>-->
                <!--</button>-->
                <v-dropdown class="ui-tool-dropdown" trigger="click">
                    <button type="button" data-toggle="dropdown" class="ui-tool-button">
                        <span class="icon icon-tool icon-tool-more pull-left"></span>
                        <span class="_name pull-left">更多</span>
                    </button>
                    <ul class="dropdown-menu">
                        <li __coxde="setting-vacation-import/导入">
                            <a href="javascript:void(0)" @click="modalShow=true" name="dropdown-item">导入</a>
                        </li>
                        <li __coxde="setting-vacation-export/导出">
                            <a href="javascript:void(0)" @click="exportexcel" name="dropdown-item">导出</a>
                        </li>
                    </ul>
                </v-dropdown>
            </div>
        </div>
    </header>
    <section class="ui-module-content ui-panel mod-payment-content">
        <components :is="what">
        </components>
    </section>


    <ui-modal header="数据导入" :show.sync="modalShow" :type="modalType"  v-if="modalShow">

        <ui-simpleupload
            url="api.common.uploadFile"
            fileparam="file"
            :params="{type:'temp'}"
            uploading-msg="导入进度"
            :upload-status="importStatus"
            :complete="importexcel"
            filetype="xls,xlsx"
            >
        </ui-simpleupload>
        <div class="text-center">
            <ui-button v-if="uploaded" color="success" @click="modalShow=false">确定</ui-button>
        </div>

        <div slot="footer"></div>
    </ui-modal>

</template>
<script>
    import storeCom from 'src/store'
    import store from '../store'
    import paymentRank from './paymentRank'
    import paymentPost from './paymentPost'
    export default {

        attached(){
        },
        data(){
            return {
                state:store.state,
                what:'paymentRank',
                modalShow:false,
                uploaded:false,
                importStatus:'',
            }
        },
        components:{
            paymentRank,
            paymentPost,
        },
        events:{

        },
        methods:{
            rankSalary(){
                this.what='paymentRank';
            },
            postSalary(){
                this.what='paymentPost';
            },
            importexcel(data){

                console.log(data)

                let filePath = data.path || '';

                // if(!!filePath) this.uploaded = true;

                this.importStatus = '上传成功，正在导入...'

                // 职级
                if(this.what=='paymentRank'){
                    store.actions.importRankData({
                        filePath:filePath
                    },(msg)=>{
                        this.importStatus = '导入成功。'+msg
                        this.uploaded = true;
                        store.actions.loadPayRank()
                    },err_msg=>{
                        this.importStatus = `<span style="color:red;">导入失败：<br>${err_msg}</span>`;
                    })
                }
                // 岗位
                else if(this.what=='paymentPost'){
                    store.actions.importPostData({
                        filePath:filePath
                    },(msg)=>{
                        this.importStatus = '导入成功。'+msg
                        this.uploaded = true;
                        store.actions.loadPayPost()
                    },err_msg=>{
                        this.importStatus = `<span style="color:red;">导入失败：<br>${err_msg}</span>`;
                    })
                }
            },
            exportexcel(){

                let params = '';
                if(this.what=='paymentRank'){

                    let fileName = '职级工资导出';
                    let tableTitle = '职级,职级工资';
                    let tableID = 'rankName,salary';

                    params = `expType=rank&fileName=${fileName}&titles=${tableTitle}&fields=${tableID}`
                }
                else if(this.what=='paymentPost'){

                    let fileName = '岗位工资导出';
                    let tableTitle = '职位,岗位,岗位工资';
                    let tableID = 'positionName,postName,salary';

                    params = `expType=post&fileName=${fileName}&titles=${tableTitle}&fields=${tableID}`

                }
                this.$root.downloadFile('acewill/pay/export.htm',params)

            }

        }

    }
</script>
<style lang="scss">
.mod-payment-header{
    ._menuMore {
        margin-right: 30px;
    }
    ._title {
        margin-right: 20px;
    }
}
.mod-payment-content{

    .paymentSubview{

        .paymentStatus{

            ._status{
                float: left;
                margin-left: 20px;
                margin-right: 20px;
            }
            ._statusTip{
                height: 32px;
                line-height: 32px;
                color: red;
            }

        }

        .col-title {
            background-color: #9096a6;
            color: #fff;
            border: 1px solid #6d6f7c !important;
        }

        .col-title:hover {
            background-color: #9096a6 !important;
            color: #fff;
        }

        .paymentTable {
            left: 10px !important;
            top: 120px !important;
            right: 10px !important;
            bottom: 10px !important;
            z-index: 1;
        }

    }

}
</style>
