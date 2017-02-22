<template>

    <!-- 模块主内容 -->
    <section class="ui-module-content pos-content demoShow">

        <div class="ui-module-row">
            <!--  -->
            <div class="ui-panel">

            </div>

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
