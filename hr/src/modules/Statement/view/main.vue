<!--
* @Created Date       : 2016-10-12T15:01:43+08:00
* @Last Modified time : 2016-12-03T15:58:10+08:00
 -->


<template>
<!-- 模块示例 -->
<div class="ui-module">
    <!-- 模块功能条 -->
    <header class="ui-module-navbar pos-topbar-fixed">
        <app-modulenavbar :show="showNavbar">
            <div class="back-btn">
                <!--<span class="icon icon-tool icon-tool-back pull-left"></span>-->
                <ui-search v-show="toggleSearch" :value.sync="userName" :search-callback="searchAtt"></ui-search>
            </div>
            <!-- 左侧按钮组 -->
            <!-- <div class="pull-left emp-center-tab">
          <ui-buttongroup active-class="btn-primary">
            <button type="button" class="btn btn-primary" v-link="{path:'/Statement/demissionAnalysis', activeClass:'btn-primary', replace:true }">
              离职分析
            </button>
            <button type="button" class="btn btn-default" v-link="{path:'/Statement/storeList', activeClass:'btn-primary', replace:true }">门店列表
            </button>
            <button type="button" class="btn btn-default" v-link="{path:'/Statement/employeeCount', activeClass:'btn-primary', replace:true }">员工人数统计
            </button>
            <button type="button" class="btn brn-default" v-link="{path:'/Statement/attendance', activeClass: 'btn-primary', replace: true}">考勤</button>
          </ui-buttongroup>
        </div> -->
            <!-- 右侧按钮组 -->
            <div class="pull-right">
                <button class="ui-tool-button" @click="toggleSearchBar" v-show="showSearchBar">
                <span class="icon icon-tool icon-tool-filter pull-left"></span>
                <span class="_name pull-left">筛选</span>
                </button>
                <button class="ui-tool-button" @click="exportFn()">
                <span class="icon icon-tool icon-tool-export pull-left"></span>
                <span class="_name pull-left">导出</span>
                </button>
            </div>
        </app-modulenavbar>
    </header>
    <router-view class="view" transition="main" transition-mode="out-in" keep-alive></router-view>
</div>
</template>
<script type="text/javascript">
import store from '../store';
export default {
    data() {
        return {
            state: store.state,
            showNavbar: false,
            toggleSearch: false,
            showSearchBar:false,
            userName: '',
        }
    },
    props: {},
    filters: {
        isShow(value) {
            return !!value ? 'display:block' : 'display:none';
        }
    },
    methods: {
        searchAtt() {
            this.$broadcast('searchAtt', this.userName)
        },
        exportFn() {
            // this.state.userTypeVal=['']
            this.$broadcast('exportFn')

        },
       toggleSearchBar(){
         this.$broadcast('toggleSearchBar')
       },
    },
    events: {
        'toggleSearch' (tableID) {
            console.log(tableID)
            if (tableID == 'attendanceDay' || tableID == 'attendanceMonth' || tableID == 'retroactiveCard'  ) {
                this.toggleSearch = true;
            } else {
                this.toggleSearch = false;
            }
            if(tableID == 'xzySalary' || tableID == 'huagongSalary'){
              this.showSearchBar=true;
            }else{
              this.showSearchBar=false;
            }
        },
    },
    created() {},
    watch: {},
    attached() {
        // 设置默认时间
        store.actions.defaultTime();
        store.actions.defaultTimeDay();
        //加载用工类型
        store.actions.findSystemConfig("100000", function(data) {}, function(error) {
            // this.$root.showTip({
            //     type: 'danger',
            //     msg: error,
            //     duration: 2000
            // });
        });
        //加载组织类型
        store.actions.loadOrgType((data) => {
            this.$broadcast('orgReady')
        }, error => {
            // this.$root.showTip({
            //     type: 'danger',
            //     msg: error,
            //     duration: 2000
            // });
        })
    },
    ready() {
        setTimeout(() => {
            this.showNavbar = true;
        }, 500)
        store.actions.load();
    }
};
</script>
<style scoped>
.back-btn {
    float: left;
}

.emp-center-tab {
    position: absolute;
    left: 50%;
    margin-left: -150px;
}

</style>
