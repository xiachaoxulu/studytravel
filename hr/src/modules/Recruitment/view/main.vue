<template>
    <!-- 模块示例 -->
    <div class="ui-module app-permisson">
        <!-- 模块功能条 -->
        <header class="ui-module-navbar pos-topbar-fixed">
            <app-modulenavbar :show="showNavbar">
                <div class="back-btn pull-left">
                    <strong class="app-schedule-title" v-if="$route.path == '/Recruitment/postRelease'">招聘</strong>
                    <ui-search v-if="$route.path == '/Recruitment/postRelease'" :value.sync="empKey" :search-callback="searchEmp" placeholder="搜索岗位"></ui-search>
                    <!--<ui-search :value.sync="state.searchPostName"-->
                               <!--:search-callback="searchCall"></ui-search>-->
                </div>
                <!-- 左侧按钮组 -->
                <div class="pull-left emp-center-tab">
                    <ui-buttongroup active-class="btn-primary">
                        <button type="button" class="btn btn-primary"
                                v-link="{path:'/Recruitment/postRelease', activeClass:'btn-primary', replace:true }"
                                __code="recruitment-post/岗位发布">
                            岗位发布
                        </button>
                        <button type="button" class="btn btn-default"
                                v-link="{path:'/Recruitment/resume', activeClass:'btn-primary', replace:true }"
                                __code="recruitment-posted/简历">简历
                        </button>
                        <!--<button type="button" class="btn btn-default"-->
                        <!--v-link="{path:'/Recruitment/archives', replace:true }">人才档案-->
                        <!--</button>-->
                    </ui-buttongroup>
                </div>
                <!-- 右侧按钮组 -->
                <div class="pull-right">
                    <v-dropdown class="ui-tool-dropdown" trigger="click">
                        <button type="button" data-toggle="dropdown" class="ui-tool-button">
                            <span class="icon icon-tool icon-tool-more pull-left"></span>
                            <span class="_name pull-left">更多</span>
                        </button>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="javascript:void(0)" @click="goPostedRelease" name="dropdown-item">已发布岗位</a>
                            </li>
                            <li>
                                <!--<a href="javascript:void(0)" @click="" name="dropdown-item">撤回</a>-->
                            </li>
                            <li>
                                <!--<a href="javascript:void(0)" @click="exportPost" name="dropdown-item">导出</a>-->
                            </li>
                        </ul>
                    </v-dropdown>
                </div>
            </app-modulenavbar>
        </header>
        <router-view class="view" transition="main" transition-mode="out-in"></router-view>
        <ui-sidecontent :show.sync="bigPostReleaseShow">
            <components :is="bigwhat" v-if="bigPostReleaseShow">
            </components>
        </ui-sidecontent>
    </div>
</template>
<script type="text/javascript">
    import store from '../store';
    import postedRelease from './postedRelease';

    export default {
        data() {
            return {
                state: store.state,
                showNavbar: false,
                bigPostReleaseShow: false,
                bigwhat: '',
                empKey:'',
            }
        },
        props: {},
        components: {
            postedRelease,
        },
        filters: {
            isShow(value) {
                return !!value ? 'display:block' : 'display:none';
            }
        },
        methods: {
            goPostedRelease(){
                this.bigwhat = 'postedRelease';
                this.bigPostReleaseShow = true;
            },
            searchEmp(){
                // 父子组件通信
                this.$broadcast('searchPost',this.empKey)
            },
            exportPost(){
                this.$broadcast('exportPostFn')
            }
        },
        created() {
        },
        watch: {},
        ready() {
            var vm = this;
            setTimeout(function () {
                vm.showNavbar = true;
            }, 500)
        }
    };
</script>
<style scoped>
    .back-btn {
        float: left;
    }
    .emp-center-tab{
        position: absolute;
        left:50%;
        margin-left:-75px;
    }
    .app-schedule-title{
        margin-right: 20px;
    }
</style>