<template>

    <div id="app-fn" class="ui-module-aside pos-r-aside">

        <div class="ui-panel app-fn">
            <header class="ui-panel-header">
                <h2 class="ui-panel-title">常用功能</h2>
            </header>
            <section class="ui-panel-content app-fn-list">

                <ui-scrollview>
                    <ui-dragdrop v-if="state.userAuthority.userCommonFn.length>0"
                                 :order.sync="state.userAuthority.userCommonFn" itemselector="li">
                        <ul class="app-functionList clear-both">
                            <li v-for="f in $root.state.userAuthority.userCommonFn" v-if="$root.state.userAuthority.userMenus[f]"
                                @click="$root.openFn($root.state.userAuthority.userMenus[f].type,$root.state.userAuthority.userMenus[f].url,$root.state.userAuthority.userMenus[f].menuName)"
                                orderid="{{f}}" class="dragitem">
                                <div class="_content">


                                    <template v-if="$root.state.userAuthority.userMenus[f].icon=='custom'">
                                        <ui-avatar :username="$root.state.userAuthority.userMenus[f].menuName"
                                                   :size="60"></ui-avatar>
                                    </template>
                                    <template v-else>
                                        <span class="icon icon-fn icon-{{$root.state.userAuthority.userMenus[f].icon}}"></span>
                                    </template>

                                    <span class="_name">{{$root.state.userAuthority.userMenus[f].menuName}}</span>


                                </div>
                            </li>

                        </ul>
                    </ui-dragdrop>
                    <ul class="app-functionList clear-both">
                        <li @click="addFn()">
                            <div class="_content">
                                <span class="icon icon-fn icon-add"></span>
                                <span class="_name">添加</span>
                            </div>
                        </li>
                    </ul>

                </ui-scrollview>

            </section>
        </div>

    </div>

</template>
<script>
    import globalStore from 'src/store'
    export default {
        data(){
            return {
                state: globalStore.state,
            }
        },
        components: {},
        watch: {
            "state.userAuthority.userCommonFn"(){
                this.$root.saveUserCommonFn();
            }
        },
        methods: {

            // 添加新功能
            addFn(){
                this.$root.editFuns = true;
                this.$root.showFuns = true;

            }
        },
        ready(){


        }
    }
</script>
<style type="text/css" scoped>
    .app-fn {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
    }

    .app-fn-list {
        position: absolute;
        top: 50px;
        bottom: 10px;
        left: 0;
        right: 0;
        overflow: hidden;
    }
</style>
