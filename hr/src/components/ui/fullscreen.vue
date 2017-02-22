<template lang="html">
<div :class="['ui-fullscreen',open ? 'isFullscreen':'']" >
    <slot></slot>
</div>
</template>
<script>
export default {
    props:{
        // 全屏
        open:{
            type:Boolean,
            // twoWay: true,
            default:false
        },
        // 变化回调
        changed:{
            type:Function,
            default(){}
        }
    },
}
</script>

<style scoped>
.isFullscreen{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 10000;
}
</style>
