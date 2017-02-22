<template>

    <!-- 模块主内容 -->
    <section class="ui-module-content pos-content demoShow">

        // 父组件
        <components is="test" :params="{a:123}" :callbackname="callbackName" @componentcallback="componentCallback"></components>


    </section>


</template>
<script>
import test from './test'
export default {
    components:{
        test
    },
    events:{
        submitedCall(){
            alert('提交')
            console.log('sex='+this.sex,'area='+this.area)
        },
        resetedCall(){
            console.warn('sex='+this.sex,'area='+this.area)
        }
    },
    data(){
        return {
            show1:false,
            show2:false,
            show3:false,
            /* select */
            sex:'2',
            area:[],
            selected1:[],
            callbackName:'test',
        }
    },
    methods:{
        test(){
            alert('回调成功')
        },
        componentCallback(type,params){

            console.log(type,params)

            this[type]();

        }
    },
    attached(){
        // 组件插入dom时进行授权检测
        this.$root.checkAuthority(this.$el);
    }
}
</script>
<style type="text/css" scoped>

</style>
