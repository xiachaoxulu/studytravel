<template>

    <!-- 模块主内容 -->
    <section class="ui-module-content pos-content demoShow">

        <div class="ui-module-row">
            <!--  -->
            <div class="ui-module-col1 ui-panel">列内容1</div>
            <div class="ui-module-col2 ui-panel">



            </div>
            <div class="ui-module-col3 ui-panel">列内容3</div>

        </div>

    </section>


</template>
<script>
export default {
    attached(){
        // 组件插入dom时进行授权检测
        this.$root.checkAuthority(this.$el);
    }
}
</script>

<style type="text/css" scoped>
.ui-module-col1{
    position: absolute;
    width: 200px;
    left: 0;
    top: 0;
    bottom: 0;
}
.ui-module-col2{
    position: absolute;
    left: 205px;
    right: 205px;
    top: 0;
    bottom: 0;
}
.ui-module-col3{
    position: absolute;
    width: 200px;
    right: 0;
    top: 0;
    bottom: 0;
}
</style>
