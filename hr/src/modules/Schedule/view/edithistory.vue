<template>
    <!-- 模块功能条 -->
    <header class="ui-module-navbar pos-topbar-fixed">

        <div class="ui-module-navbar-content">
            <div class="pull-left">
                <span class="ui-module-title">{{title}}修改记录</span>
            </div>

            <div class="text-center" style="position: absolute; left: 0; right: 0;">

                <ui-buttongroup v-ref:table active-class="btn-primary">

                    <button type="button" class="btn btn-primary" @click="order=1">按修改日期查看</button>
                    <button type="button" class="btn btn-default" @click="order=2">按修改人查看</button>

                </ui-buttongroup>

            </div>

        </div>

    </header>

    <!-- 模块主内容 -->
    <section class="ui-module-content pos-content schedule-history">

      <div class="ui-module-row ui-panel">

        <ui-grid v-if="showTable" v-ref:table
            :fields="fields"
            url="api.schedule.getUpdateHistory"
            :append-params="params"
            :perpage="30"
            :pages="[20,30,50,100]"
            :show-tip-call="showTipCall"
            height="auto"
            style="padding: 20px;"
            >
        </ui-grid>

      </div>

    </section>

</template>
<script>
import store from '../store'
import Vue from 'vue'
export default {
    ready(){
        this.hasReady = true;
    },
    methods:{
        showTipCall(data){
            console.log(data)
            this.$root.showTip(data)
        }
    },
    attached(){

        if(this.fields.length==0) this.fields = this.fields1;

        let orgType= this.$route.params.type;
        let group = this.$route.params.group;

        //
        if (orgType != 'department' && orgType != 'store') return;

        // 信息重复，则不更新参数
        // if (this.hasReady && orgType == this.params.orgType && orgID == this.params.orgID && group == this.params.group){
        //     return;
        // }

        let orgName = orgType=='department' ? orgType : group;
        let orgID = store.state.orgData[orgName];

        this.params = {
            orgID: orgID,
            orgType: orgType == 'department' ? 'dept' : orgType,
            orderType: this.order,
            group: this.state.orgGroupID?this.state.orgGroupID:'',
        }


        // console.warn(this.params)
    },
    watch:{
        params(){

            if(this.params.orgID==''){

                this.$root.showTip({
                    type: 'warning', // 提示类型 success,warning,info,danger
                    msg: '您尚未选择部门或门店', // 提示文字
                    duration: 3000 // 自动消失时间
                })
                return;
            }
            this.showTable = true;

            this.$nextTick(function(){
                this.$refs.table.refreshTable();
            })
        },
        order(val){

            if(this.params.orgID==''){

                this.$root.showTip({
                    type: 'warning', // 提示类型 success,warning,info,danger
                    msg: '您尚未选择部门或门店', // 提示文字
                    duration: 3000 // 自动消失时间
                })
                return;
            }

            if(val==1){
                this.fields = this.fields1;
            }
            else{
                this.fields = this.fields2;
            }

            this.$refs.table.refresh();

        }
    },
    data(){
        return {
            state:store.state,
            hasReady:false,
            showTable:false,
            title:'',
            fields:[],
            params:{},
            order:1,
            // 按修改时间排序
            fields1:[
                {
                    name:'createTime',
                    title:'修改日期',
                    locked:'first',
                    width:'200px',
                    formater:function(value,data,index){
                        return Vue.Tool.iDate(value,'yy-mm-dd hh:mm:ss').string
                    }
                },
                {
                    name:'operatorName',
                    title:'修改人',
                    locked:'first',
                    width:'100px'
                },
                {
                    name:'operatorPost',
                    title:'修改人岗位',
                    locked:'first',
                    width:'100px',
                    formater:(value,data,index)=>{
                        return `<div style="overflow:hidden;text-overflow:ellipsis;" title="${value || ''}">${value || ''}</div>`
                    }
                },
                {
                    name:'userName',
                    title:'被修改人',
                    width:'100px'
                },
                {
                    name:'userPost',
                    title:'被修改人岗位',
                    width:'100px',
                    tdClass:'text-hidden',
                    formater:(value,data,index)=>{
                        return `<div style="overflow:hidden;text-overflow:ellipsis;" title="${value || ''}">${value || ''}</div>`
                    }

                },
                {
                    name:'classDate',
                    title:'班表日期',
                    width:'150px',
                    formater:function(value,data,index){
                        return Vue.Tool.iDate(value,'yy-mm-dd').string
                    }
                },

                {
                    name:'oldClass',
                    title:'原班次',
                    width:'200px',
                    formater:function(value,data,index){
                        let html = '';
                        if(value){
                            let time = eval('('+value+')')
                            if(time && time.length>1){
                                html+='<i class="material-icons">error_outline</i>'+value.substring(0,20)+'...';
                                html+='<div class="tooltip bottom" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner">'+time.join('<br/>')+'</div></div>'
                            }else{
                                html+=value||'';
                            }

                        }


                        return html;
                    }
                },
                {
                    name:'newClass',
                    title:'新班次',
                    width:'200px',
                    formater:function(value,data,index){
                        let html = '';

                        if(value){
                            let time = eval('('+value+')')

                            if(time && time.length>1){
                                html+='<i class="material-icons">error_outline</i>'+value.substring(0,20)+'...';
                                html+='<div class="tooltip bottom" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner">'+time.join('<br/>')+'</div></div>'
                            }else{
                                html+=value||'';
                            }

                        }

                        return html;
                    }
                },
            ],
            // 按修改人排序
            fields2:[
                {
                    name:'operatorName',
                    title:'修改人',
                    locked:'first',
                    width:'100px'
                },
                {
                    name:'operatorPost',
                    title:'修改人岗位',
                    locked:'first',
                    width:'100px',
                    formater:(value,data,index)=>{
                        return `<div style="overflow:hidden;text-overflow:ellipsis;" title="${value || ''}">${value || ''}</div>`
                    }

                },
                {
                    name:'createTime',
                    title:'修改日期',
                    locked:'first',
                    width:'200px',
                    formater:function(value,data,index){
                        return Vue.Tool.iDate(value,'yy-mm-dd hh:mm:ss').string
                    }
                },
                {
                    name:'userName',
                    title:'被修改人',
                    width:'100px'
                },
                {
                    name:'userPost',
                    title:'被修改人岗位',
                    width:'100px',
                    formater:(value,data,index)=>{
                        return `<div style="overflow:hidden;text-overflow:ellipsis;" title="${value || ''}">${value || ''}</div>`
                    }

                },
                {
                    name:'classDate',
                    title:'班表日期',
                    width:'150px',
                    formater:function(value,data,index){
                        return Vue.Tool.iDate(value,'yy-mm-dd').string
                    }
                },

                {
                    name:'oldClass',
                    title:'原班次',
                    width:'200px',
                    formater:function(value,data,index){
                        let html = '';

                        if(value){
                            let time = eval('('+value+')')

                            if(time.length>1){
                                html+='<i class="material-icons">error_outline</i>'+value.substring(0,20)+'...';
                                html+='<div class="tooltip bottom" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner">'+time.join('<br/>')+'</div></div>'
                            }else{
                                html+=value || '';
                            }
                        }


                        return html;
                    }
                },
                {
                    name:'newClass',
                    title:'新班次',
                    width:'200px',
                    formater:function(value,data,index){
                        let html = '';

                        if(value){
                            let time = eval('('+value+')')

                            if(time.length>1){
                                html+='<i class="material-icons">error_outline</i>'+value.substring(0,20)+'...';
                                html+='<div class="tooltip bottom" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner">'+time.join('<br/>')+'</div></div>'
                            }else{
                                html+=value || '';
                            }
                        }


                        return html;
                    }
                },
            ]
        }
    }
}
</script>
<style scoped>
.ui-table-header th, .ui-table-header td{
    height: 50px!important;
}
</style>
<style>
.schedule-history .ui-table-body td:first-child, .schedule-history .ui-table-body th{
    overflow: hidden!important;
}
</style>
