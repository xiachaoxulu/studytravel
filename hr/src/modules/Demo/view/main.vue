<!--
* @Created Date       : 2016-08-28T15:36:04+08:00
* @Last Modified time : 2016-12-02T17:31:33+08:00
 -->


<template>
    <!-- 模块 vue -->
    <div class="ui-module" >

        <!-- 模块功能条 -->
        <header class="ui-module-navbar pos-topbar-fixed">

            <app-modulenavbar :show="showNavbar">

                <!-- 左侧按钮组 -->

                <div class="pull-left">

                    <ui-buttongroup active-class="btn-primary">

                        <button type="button" class="btn btn-default" v-link="{path:'/Demo/buttons', replace:true }">按钮权限</button>
                        <button type="button" class="btn btn-default" v-link="{path:'/Demo/ui', replace:true }">UI规范</button>
                        <button type="button" class="btn btn-default" v-link="{path:'/Demo/uilist', replace:true }">组件列表</button>

                    </ui-buttongroup>


                </div>


                <!-- 右侧按钮组 -->
                <div class="pull-right">

                    <!-- 添加 -->
                    <button code="demo-com-add/添加/" class="ui-tool-button" @click="showSidebarView('sliderView1')"><span class="icon icon-tool icon-tool-add pull-left"></span><span class="_name pull-left">添加</span></button>

                    <!-- 编辑 -->
                    <button code="demo-com-edit/编辑/disabled" class="ui-tool-button" @click="showSidebarView('sliderView2')"><span class="icon icon-tool icon-tool-edit pull-left"></span><span class="_name pull-left">编辑</span></button>

                    <!-- 筛选 -->
                    <button code="demo-com-filters/筛选/" class="ui-tool-button" @click="showSidebarView('sliderView3')"><span class="icon icon-tool icon-tool-filter pull-left"></span><span class="_name pull-left">筛选</span></button>

                    <v-dropdown class="ui-tool-dropdown" trigger="hover">

                        <button data-toggle="dropdown" class="ui-tool-button"><span class="icon icon-tool icon-tool-more pull-left"></span><span class="_name pull-left">更多</span></button>

                        <ul slot="dropdown-menu" class="dropdown-menu">
                          <li code="demo-com-import/导入/disabled">
                              <a name="dropdown-item" href="javascript:;">导入</a>
                          </li>
                          <li code="demo-com-export/导出" >
                              <a name="dropdown-item" href="javascript:;">导出</a>
                          </li>
                          <li code="demo-com-del/删除">
                              <a name="dropdown-item" href="javascript:;">删除</a>
                          </li>
                          <li role="separator" class="divider"></li>
                          <li code="demo-com-hview/横向视图">
                              <a name="dropdown-item" href="javascript:;">横向视图</a>
                          </li>
                        </ul>
                    </v-dropdown>


                </div>

            </app-modulenavbar>

        </header>

        <router-view class="view" transition="view" transition-mode="out-in" ></router-view>


        <!-- 模块右侧划入栏 vue-->
        <ui-sidebar :show.sync="showSidebar" :title="sliderViewTitle" :layout="sliderViewLayOut" >

            <!-- 可在此设置动态组件，动态展示不同内容，不过要相应的改变 -->

            <component slot="content" :is="sliderView" keep-alive>
                <!-- 非活动组件将被缓存 -->
            </component>


        </ui-sidebar>

    </div>
</template>

<script>

import store from '../store'

import sliderView1 from './sliderView1'
import sliderView2 from './sliderView2'
import sliderView3 from './sliderView3'

export default {
    data(){
        return{
            state:store.state,
            showNavbar:false,
            showSidebar:false,
            sliderView:'',
            sliderViewTitle:'',
            sliderViewLayOut:'header-content'
        }
    },
    components:{

        sliderView1,
        sliderView2,
        sliderView3,

    },
    methods:{
        showSidebarView(viewID){

            if(viewID=='sliderView1'){
                this.sliderViewTitle="添加"
                this.sliderViewLayOut = 'header-content'
            }
            if(viewID=='sliderView2'){
                this.sliderViewTitle="编辑"
                this.sliderViewLayOut = 'header-content'
            }
            if(viewID=='sliderView3'){
                this.sliderViewTitle="筛选"
                this.sliderViewLayOut = 'header-content'
            }

            this.sliderView = viewID

            this.showSidebar = true;
        }
    },
    ready(){
        var vm = this;
        setTimeout(function(){
            vm.showNavbar = true;
        },500)
    },
    attached(){
        // 组件插入dom时进行授权检测

        this.$root.checkAuthority(this.$el);

    }
}
</script>
