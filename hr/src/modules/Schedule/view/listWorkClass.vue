<template>
<div style="padding: 10px;">

    <div v-if="showMsg" style="padding:15px 0 0;text-align: center;">请先选择要排班的门店或部门，然后再添加相应的班次</div>

    <!-- <div v-if="!hasWorkClass" style="padding:15px 0 0;text-align: center;">您还没有为本部门或门店添加班次，请添加班次</div> -->

    <ul class="_banciList">
        <!-- <li v-for="citem in state.workClass" v-if="citem.valid==1?(citem.type-0==type ? true :false):false"> -->
        <li v-for="citem in state.workClass" v-if="!!citem.valid && (citem.type-0==type)" >

            <div class="pull-left _banciName" ><span :style="{'background':citem.bgcolor,'color':citem.fontcolor}">{{citem.name}}</span></div>
            <div class="pull-left _banciType">{{citem.type-0==1 ? '部门' : citem.type-0==2 ? '管理组': '服务组'}}</div>
            <div class="pull-left _banciTtype">{{citem.timeType-0==1 ? '上班' : '休息'}}</div>
            <div class="pull-left _banciTime">
                <span v-for="time in citem.time" track-by="$index">
                    {{citem.timeType-0==1 ? time : ''}}
                    <br>
                </span>
            </div>
            <div class="pull-right _banciEdit">
                <i __code="schedule-menu-workClass-edit/编辑班次" class="material-icons _eidtIcon" @click="updateWorkClass(citem.ID,$index)">edit</i>
                <i __code="schedule-menu-workClass-del/删除班次" class="material-icons _eidtIcon" @click="deleteWorkClassTip($index)">delete_forever</i>
            </div>
        </li>
    </ul>

    <div class="text-center">
        <ui-button color="success" @click="addWorkClass" __code="schedule-menu-workClass-add/添加班次">添加班次</ui-button>
    </div>

	<!-- modal -->

    <ui-modal :show.sync="showCustomModal" header="提示" v-if="showCustomModal" >
    	<p>是否确认删除该班次？</p>
        <div slot="footer">
            <ui-button color="success" @click='deleteWorkClass($index)'>确定</ui-button>
            <ui-button @click='showCustomModal = false'>取消</ui-button>
        </div>
    </ui-modal>

</div>
</template>

<script>
import store from '../store';

export default {
    data() {
        return {
            type:0,
        	state:store.state,
        	showCustomModal:false,
        	itemIndex:'',
            showMsg:false,
            hasWorkClass:true,
        }
    },


    attached(){

        // 判断是否已选择组织，否则提示

        let orgID = '';

        if(this.state.orgType=='department'){
            orgID = this.state.orgData['department'];
        }
        else if(this.state.orgType=='store'){
            orgID = this.state.orgData[this.state.orgGroup];
        }

        if(!orgID){

            this.showMsg = true

        }
        else {
            this.showMsg = false;
        }

        console.log(Array.from(this.state.workClass))

        // 已选组织的情况下，判断班次是否为空，否则提示
        if(!this.showMsg && Array.from(this.state.workClass).length==0){
            this.hasWorkClass = false;
        }
        else{
            this.hasWorkClass = true;
        }

        //
        this.type = this.state.workClassType;
    },
    methods:{
    	// 删除提示确定
    	deleteWorkClassTip(index){
    		this.$data.itemIndex = index;
    		this.$data.showCustomModal = true;
    	},
    	// 删除
    	deleteWorkClass(){
    		store.actions.eidtWorkClass('delete',{},this.$data.itemIndex)
    		this.$data.showCustomModal = false;
    	},
    	// 修改班次
    	updateWorkClass(id,index){

    		this.$dispatch('showEditWorkClass',id,index)
    		console.log(id,index)
    	},
    	//
    	addWorkClass(){

            if(this.showMsg){

                this.$root.showTip({
                    type: 'warning',
                    msg: '请先选择要排班的门店或部门，然后再添加相应的班次'
                })

                return;
            }

    		this.$dispatch('showAddWorkClass')
    	}

    }
}

</script>

<style scoped>
._banciList{
    padding:0 5px;
    padding-bottom: 30px;
}
._banciList li{
    overflow: hidden;
    /*height: 60px;*/
    padding: 10px 0;
    line-height: 40px;
    border-bottom:  1px solid #eee;
}
._banciName{
    padding-right: 20px;
}
._banciName span{
    padding: 0 10px;
    border-radius: 6px;
    display: inline-block;
    width: 120px;
    text-align: center;
}
._banciType{
    width: 80px;
}
._banciTtype{
    width: 60px;
}
._banciTime{
    width: 100px;
    vertical-align: middle;
    padding-top: 6px;
}
._banciTime span{
    display: block;
    line-height: 25px;
}
._banciEdit{
    text-align: center;
}

._eidtIcon{
    position: relative;
    top: 5px;
    color: #565c6c;
    cursor:pointer;
}
._eidtIcon:hover{
    color: #fd6551;
}


</style>
