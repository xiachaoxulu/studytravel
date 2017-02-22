<template>
    <div class="pull-right">
        <!--<button class="ui-tool-button">-->
        <!--<span class="icon icon-tool icon-tool-add2 pull-left"></span>-->
        <!--<span class="_name pull-left">保存</span>-->
        <!--</button>-->
        <button __code="pay-user-apply/应用" class="ui-tool-button" @click="applyBtn" v-show="state.showApplyBtn">
            <span class="icon icon-tool icon-tool-save pull-left"></span>
            <span class="_name pull-left">应用</span>
        </button>
        <button __code="pay-user-shelve/搁置" class="ui-tool-button" @click="shelveBtn" v-show="state.showShelveBtn">
            <span class="icon icon-tool icon-tool-save pull-left"></span>
            <span class="_name pull-left">搁置</span>
        </button>
    </div>
</template>
<script>
import store from '../store'
export default {
    data() {
            return {
                state: store.state,
            }
        },
        methods: {
            applyBtn() {
                // 父子组件通信
                this.$parent.$parent.$broadcast('applyBtnFn');
            },
            shelveBtn() {
                //  父子组件通信
                this.$parent.$parent.$broadcast('shelveBtnFn');
            }

        }
}
</script>
