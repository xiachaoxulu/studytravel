<template>
    <div v-el:scorllview class="scorllView">
        <slot></slot>
    </div>
</template>

<script>

import 'libs/jquery.slimscroll.js'

export default {
    data(){
        return {
        }
    },
    props: {
        show:{
            type:Boolean,
            default:false
        },
        scrollType:{
            default:'Y'
        },
        opacity:{
            type:Number,
            default:.1,
        }
    },
    methods:{
        init(){
            // 初始化滚动条
            if(this.scrollType=='Y'){
                this.scorllview.slimScroll({        
                    height: 'auto',
                    opacity:this.opacity,
                });
            }

        },
        refresh(){
            this.scorllview = $(this.$els.scorllview);
            this.init();
        },
    },
    watch: {
        show(val){
            if(val){
                this.init();
            }
        }
    },
    ready(){
        this.scorllview = $(this.$els.scorllview);

        setTimeout(()=>{
            this.init();
        },500)


        $(window).on('resize',()=>{

            // console.log(this.scorllview.is(':visible'))

            if(!this.scorllview.is(':visible')) return;

            this.init();

            // console.log(this.scorllview.height())
        })
    },
    events:{

        refreshScrollView(){
            console.log('refreshScrollView')
            this.refresh();
        }

    }
}
</script>
<style type="text/css">
.scorllView{
    padding-bottom: 25px;
}
</style>
