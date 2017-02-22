<template>
    <div class="ui-collapse-info border-wrap {{noBorder}} {{mt20}}" >
        <div class="ui-collapse-info-tit" @click="show=!show">
            <span class="ui-collapse-info-more material-icons" >{{show?iconOpen:iconClose}}</span>
            <p class="ui-collapse-info-tit-icon"><span class="{{icon}}"></span></p>
            <h2 class="ui-collapse-info-tit-name">{{title}}</h2>
        </div>
        <div class="ui-collapse-info-list" v-show="show">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export  default{
        data(){
            return {
                show: false,
            }
        },
        props: {
            toggle: {
                type: Boolean
            },
            title: {
                type: String,
                default: ''
            },
            icon: {
                type: String,
                default: ''
            },
            noBorder:{
                type: String,
                default: ''
            },
            mt20:{
                type: String,
                default: ''
            },
            iconOpen:{
                type:String,
                default:'keyboard_arrow_down'
            },
            iconClose:{
                type:String,
                default:'keyboard_arrow_up'
            }
        },
        methods: {
            toggleBarFn(index){
                console.log(index);
                this.$data.toggleBar.$set(index, !this.$data.toggleBar[index]);
            },
        },
        created(){
            this.show = this.toggle;
        },
        ready(){

        }
    }

</script>
<style>
    .border-wrap {
        overflow: hidden;
        padding: 20px;
        border-bottom: 1px solid #e5e5e5;
    }

    .border-wrap:first-child {
        border-top: 1px solid #e5e5e5;
    }

    .ui-collapse-info-tit {
        overflow: hidden;
        height: 28px;
        cursor: pointer;
    }

    .ui-collapse-info-tit .ui-collapse-info-tit-icon {
        float: left;
        width: 30px;
        height: 28px;
        margin-right: 24px;
    }

    .ui-collapse-info-tit .ui-collapse-info-tit-name {
        height: 28px;
        line-height: 28px;
        margin: 0 !important;
        font-size: 14px;
    }

    .ui-collapse-info-more {
        display: inline-block;
        float: right;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
    }


</style>
