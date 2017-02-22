<template>
<div>
    <button @click="changeMonth(-1)">prev</button>
    <button>当前时间：{{deteSelectedString}}</button>
    <button @click="changeMonth(1)">next</button>
    <button @click="changemonth(0)">回到当前</button>
</div>
</template>
<script>
export default {
    data(){
        return {
            type:'day', // month
            dateNow:'',//当前系统时间
            dateSelected:'', // 当前选中时间对象
            deteSelectedString:'',//页面显示的时间
        }
    },
    ready(){
        this.dateNow = this.$Tool.iDate(new Date(),'yy-mm-dd');//获取当前时间
        this.dateSelected = this.dateNow;//把当前时间赋给选择中的时间对象
        this.deteSelectedString = this.dateSelected.string;
    },
    methods:{
        changeDate(diff){
            // 日
            if(this.type=='day'){
                if(diff==0){
                    this.dateSelected = this.dateNow;
                }
                else if(diff<0){
                    this.dateSelected = this.$Tool.iDate(this.dateSelected.time,'yy-mm-dd',-1);
                }
                else if(diff>0){
                    this.dateSelected = this.$Tool.iDate(this.dateSelected.time,'yy-mm-dd',1);
                }
            }
            // 月
            else if(this.type=='month'){
            }
            this.deteSelectedString = this.dateSelected.string;
        },
        // // 切换月份 >> 更新时间列表 >> 设置当前时间 >> 初始化新数据
        // changeMonth(n){
        //
        //     // 当前时间表开始时间
        //     let now = Tool.iDate(this.dateSelected);
        //
        //     console.log(now.string)
        //
        //     // 前一年
        //     if(now.m+n <=0){
        //
        //         var next = (now.y-1)+'/'+'12/01'
        //
        //     }
        //     // 后一年
        //     else if(now.m+n>12){
        //
        //         var next = (now.y+1)+'/'+'01/01'
        //
        //     }
        //     else{
        //
        //         var next = now.y+'/'+(now.m+n)+'/01'
        //
        //     }
        //
        //     // 如果==0，则回到今日
        //     if(n==0){
        //         store.actions.initDateSelectList();
        //         store.actions.setStartDate(state.dateStart);
        //     }else{
        //         store.actions.initDateSelectList(next);
        //         store.actions.setStartDate(next);
        //     }
        //
        //
        // },

    }

}

</script>
