<template>
    <!-- 模块 vue -->
    <div class="ui-module" >

        <!-- 模块功能条 -->
        <header class="ui-module-navbar pos-topbar-fixed">

            <app-modulenavbar :show="showNavbar">

                <!-- 左侧按钮组 -->

                <div class="pull-left">
                    <div class="btn-group btn-group-circle pull-left" role="group">
                      <button type="button" class="btn btn-default">日考勤</button>
                      <button type="button" class="btn btn-primary">月考勤</button>
                    </div>
                </div>


                <!-- 右侧按钮组 -->
                <div class="pull-right">

                    <!-- 添加 -->
                    <button class="ui-tool-button" @click="showSidebarView('sliderView1')"><span class="icon icon-tool icon-tool-add pull-left"></span><span class="_name pull-left">添加</span></button>

                    <!-- 编辑 -->
                    <button class="ui-tool-button" @click="showSidebarView('sliderView2')"><span class="icon icon-tool icon-tool-edit pull-left"></span><span class="_name pull-left">编辑</span></button>

                    <!-- 筛选 -->
                    <button class="ui-tool-button" @click="showSidebarView('sliderView3')"><span class="icon icon-tool icon-tool-filter pull-left"></span><span class="_name pull-left">筛选</span></button>


                    <div class="ui-tool-dropdown dropdown " style="">
                        <button class="ui-tool-button"><span class="icon icon-tool icon-tool-more pull-left"></span><span class="_name pull-left">更多</span></button>

                        <ul class="dropdown-menu">
                            <li ><a href="javascript:;">导入</a></li>
                            <li ><a href="javascript:;">导出</a></li>
                            <li ><a href="javascript:;">删除</a></li>
                        </ul>
                    </div>

                </div>

            </app-modulenavbar>

        </header>

        <!-- 模块主内容 -->
        <section class="ui-module-content pos-content demoShow">

            <!--  -->
            <div class="ui-module-col ui-panel">列内容1</div>
            <div class="ui-module-col ui-panel">列内容2</div>
            <div class="ui-module-col ui-panel">列内容3</div>


        </section>



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
    }
}
</script>
