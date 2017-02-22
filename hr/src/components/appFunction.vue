<template>
    <div>
        <ui-sidebar :show.sync="show" :title="title" layout="header-content">

            <div slot="content" :class="{'editable':editable}">
                <!-- 内容 -->

                <div v-if="$root.state.userAuthority.userModules.length>0" class="ui-panel"
                     v-for="module in $root.state.userAuthority.userModules" v-if="module.valid==1">
                    <header class="ui-panel-header" v-if="module.menus.length>0">
                        <h2 class="ui-panel-title">{{module.moduleName}}</h2>
                    </header>
                    <section class="ui-panel-content" v-if="module.menus.length>0">
                        <ul class="app-functionList clear-both">
                            <li v-if="module.menus.length>0" v-for="fn in module.menus"
                                @click="addThis(fn) && hide() && $root.openFn($root.state.userAuthority.userMenus[fn].type,$root.state.userAuthority.userMenus[fn].url,$root.state.userAuthority.userMenus[fn].menuName)">
                                <div class="_content">
                                    <template v-if="$root.state.userAuthority.userMenus[fn].icon=='custom'">
                                        <ui-avatar :username="$root.state.userAuthority.userMenus[fn].menuName"
                                                   :size="60"></ui-avatar>
                                    </template>
                                    <template v-else>
                                        <span class="icon icon-fn icon-{{$root.state.userAuthority.userMenus[fn].icon}}"></span>
                                    </template>

                                    <span class="_name">{{$root.state.userAuthority.userMenus[fn].menuName}}</span>

                                <span class="_editableIcon" v-if="$root.state.userAuthority.userCommonFn | isChecked fn"
                                      transition="zoom">
                                    <i class="material-icons _valid">check</i>
                                </span>
                                </div>
                            </li>
                        </ul>
                    </section>
                </div>

            </div>
        </ui-sidebar>
    </div>
</template>
<script>

    export default {
        props: {
            show: {
                type: Boolean,
                require: true,
                twoWay: true
            },
            editable: {
                type: Boolean,
                twoWay: true,
                default: false
            }
        },
        data(){
            return {
                title: '所用功能',
            }
        },
        attached(){

        },
        watch: {
            show(val){

                if (!val) {
                    this.editable = false;
                }
            },
            editable(val){
                if (val) {
                    this.title = '添加至常用菜单'
                }
                else {
                    this.title = '所用功能'
                }
            }
        },
        filters: {
            // 检测是否在常用列表
            isChecked(data, id){
                if (this.$root.state.userAuthority.userCommonFn.indexOf(id) > -1) {
                    return true
                } else {
                    return false;
                }
            }
        },
        methods: {
            // 添加或删除 常用列表
            addThis(id){
                if (this.editable) {
                    if (this.$root.state.userAuthority.userCommonFn.indexOf(id) > -1) {
                        this.$root.state.userAuthority.userCommonFn.$remove(id);
                    } else {
                        this.$root.state.userAuthority.userCommonFn.push(id);
                    }
                }

                return !this.editable;

            },
            hide(){
                this.show = false;
                return true;
            }
        }
    }
</script>
