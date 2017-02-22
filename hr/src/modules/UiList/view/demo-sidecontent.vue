<template>
<div class="ui-panel">

    <div class="ui-panel-title">侧页</div>
    <div class="ui-panel-content">

        <table class="table table-bordered">
            <tr>
                <td>参数</td>
                <td>类型</td>
                <td>说明</td>
            </tr>
            <tr>
                <td>show</td>
                <td>Boolean</td>
                <td>【必填，双向】显隐</td>
            </tr>
            <tr>
                <td>width</td>
                <td>String</td>
                <td>自定义宽度，默认充满右侧内容区如 with="900px"</td>
            </tr>
            <tr>
                <td>background</td>
                <td>String</td>
                <td>自定义背景色，默认透明，如 background="#fff"</td>
            </tr>
            <tr>
                <td>slot</td>
                <td></td>
                <td>组件内只包含ui-module，其他的结构需要根据自己需要添加</td>
            </tr>
        </table>


        <div class="text-center"><button @click="show1=true">展开1</button></div>

        <ui-sidecontent :show.sync="show1" background="#fff">

            <div class="text-center"><button @click="show2=true">展开2</button></div>

            <ui-sidecontent :show.sync="show2" background="#fff">


                <div class="text-center"><button @click="show3=true">展开3</button></div>

                <ui-sidecontent :show.sync="show3" background="#fff">


                </ui-sidecontent>


            </ui-sidecontent>


        </ui-sidecontent>

    </div>
</div>
</template>
<script>
export default {

    data(){
        return {
            show1:false,
            show2:false,
            show3:false,
        }
    },
    methods:{},
    attached(){
        // 组件插入dom时进行授权检测
        this.$root.checkAuthority(this.$el);
    }
}
</script>
