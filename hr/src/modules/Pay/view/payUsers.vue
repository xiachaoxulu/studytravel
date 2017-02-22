<template>
    <!-- 模块主内容 -->
    <section class="ui-module-content pos-content module-payUsers">
        <div class="ui-module-row">
            <!--  -->
            <pay-suite-list @selectsuite="showPayUserData"></pay-suite-list>
            <div class="com-col-m1-middle ui-panel">
                <div>
                    <ui-buttongroup active-class="btn-primary" class="payUsersTab">
                        <button type="button" class="btn"
                                :class="{'btn-primary':girdMenuIndex==0, 'btn-default': girdMenuIndex!= 0}"
                                @click="changeBigWhat(0)">变动员工
                        </button>
                        <button type="button" class="btn"
                                :class="{'btn-primary':girdMenuIndex==1, 'btn-default': girdMenuIndex!= 1}"
                                @click="changeBigWhat(1)">应用员工
                        </button>
                        <button type="button" class="btn"
                                :class="{'btn-primary':girdMenuIndex==2, 'btn-default': girdMenuIndex!= 2}"
                                @click="changeBigWhat(2)">搁置员工
                        </button>
                    </ui-buttongroup>
                    <ui-search style="margin-left:20px;" placeholder="输入员工姓名" :value.sync="state.payUserSearch" :search-callback="searchPayUser"></ui-search>
                    <template v-if="showFindAllUser">
                        <button type="button" class="btn btn-default" @click="searchAllPayUser">查看所有</button>
                    </template>

                </div>
                <components v-if="state.paySuiteList" :is="bigwhat">
                </components>

                <!-- <components :is="what"></components> -->
                <!--<router-view class="main" transition="main" transition-mode="out-in"></router-view>-->
            </div>
        </div>
    </section>
</template>
<script>
    import store from '../store';
    import changeUsers from './payUsersChangeUsers';
    import applyUsers  from './payUsersApplyUsers';
    import shelveUsers from './payUsersShelveUsers';
    import paySuiteList from './paySuiteList'
    export default {
        data(){
            return {
                state: store.state,
                bigwhat: 'changeUsers',
                isShow: false,
                girdMenuIndex: '',
                suiteIndex:0,
                showFindAllUser:false
            }
        },
        methods: {
            changeBigWhat(index){
                if (index == 0) {
                    store.actions.changeShowShelveBtn(true);
                    store.actions.changeShowApplyBtn(true);
                } else if (index == 1) {
                    store.actions.changeShowShelveBtn(true);
                    store.actions.changeShowApplyBtn(false);
                } else if (index == 2) {
                    store.actions.changeShowShelveBtn(false);
                    store.actions.changeShowApplyBtn(true);
                }
                var url = ['changeUsers', 'applyUsers', 'shelveUsers'];
                this.bigwhat = url[index];
                this.girdMenuIndex = index;
            },
            showPayUserData(index){
                this.suiteIndex = index;
                this.$broadcast('loadPayUsersData',this.state.paySuiteList[index].ID)
            },
            // 搜索员工
            searchPayUser(){
                this.showFindAllUser = this.state.payUserSearch.length>0 ? true : false;
                this.$broadcast('loadPayUsersData',this.state.paySuiteList[this.suiteIndex].ID)
            },

            // 取消搜索，显示所有
            searchAllPayUser(){
                this.showFindAllUser = false;
                store.actions.clearSearchUser();
                this.$broadcast('loadPayUsersData',this.state.paySuiteList[this.suiteIndex].ID)
            },

        },
        components: {
            changeUsers,
            applyUsers,
            shelveUsers,
            paySuiteList
        },
        attached(){
            // 切换头部菜单
            this.$parent.changeHeaderMenu('PayUser');
        },
        ready(){
            store.actions.getSuiteList(()=>{
                this.showPayUserData(0)
            });
        }
    }
</script>
<style lang="scss">
.module-payUsers{
    .divider {
        border-top: 1px solid #ccc;
    }

    .gird-menu ul li {
        float: left;
        width: 150px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #333333;
        background-color: #dadbdd;
        border-color: #dadbdd;
        border-radius: 5px;
        margin-right: 10px;
        cursor: pointer;
    }

    .primary {
        color: #ffffff !important;
        background-color: #5d677c !important;
        border-color: #5d677c !important;
    }

    .grid-wrap {
        position: relative;
    }

    .payUsersTab{

    }

    .module-payUsersSub{

        .dataTable {
            left: 10px !important;
            top: 110px !important;
            right: 10px !important;
            bottom: 10px !important;
        }

        .date-search {
            width: 100%;
            height: 40px;
            margin: 15px 0;
        }

        .date-search ul li {
            float: left;
        }

        .date-search ul li p {
            float: left;
            height: 40px;
            line-height: 40px;
            margin: 0 10px;
        }

        .combo-tree-box {
            margin-left: 65px;
        }
    }

}
</style>

