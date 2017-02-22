<!--
@Author: Yang
@Date:   2016-08-28 12:47:52
@Project: 人力管家
@Last modified by:   Yang
@Last modified time: 2016-09-02 04:32:12
@License: copyright@acewill
-->
<template>
<!-- 模块主内容 -->
<section class="ui-module-content pos-content module-payItems">
    <div class="ui-module-row">
        <div class="ui-module-subTab">

            <ui-buttongroup active-class="btn-primary">
                <button __code="pay-series-items/工资项目" type="button" class="btn btn-default" :class="{'btn-primary':state.menuType=='items'}" @click="showSubView('items')">工资项目</button>
                <button __code="pay-series-suites/工资套" type="button" class="btn btn-default" :class="{'btn-primary':state.menuType=='suite'}" @click="showSubView('suite')">工资套</button>
            </ui-buttongroup>

            <!-- 工资项目 -->
            <template v-if="state.menuType=='items'">
                <ui-search __code="pay-series-items-search/搜索工资项目" class="ui-search" placeholder="搜索工资项目" :value.sync="payItemsSearch" :search-callback="searchPayItems"></ui-search>
                <template v-if="showFindAllItems">
                    <button type="button" class="btn btn-default" @click="searchAllPayItems">查看所有</button>
                </template>
            </template>
            <template v-if="state.menuType=='suite'">
                <ui-search __code="pay-series-suites-search/搜索员工" class="ui-search" placeholder="搜索员工" :value.sync="state.paySuiteSearchUser" :search-callback="searchPaySuiteUsers">
                </ui-search>
            </template>

        </div>
        <div class="ui-module-subPanel ui-panel">
            <components :is="subView" keep-alive></components>
        </div>
    </div>
</section>
</template>
<script>
import store from '../store'
import paySeriesItems from './paySeriesItems'
import paySeriesSuite from './paySeriesSuite'

export default {
    data() {
        return {
            state: store.state,
            subView: '',
            showFindAllItems: false,
            payItemsSearch: ''
        }
    },
    components: {
        paySeriesItems,
        paySeriesSuite,
    },
    attached() {
        // 切换头部菜单
        this.$parent.changeHeaderMenu('PaySeries');
    },
    ready() {
        // 默认显示工资项目菜单
        this.$set('state.menuType', 'items');

        // 默认显示工资项目
        this.showSubView('items');
    },
    methods: {
        showSubView(type) {
            this.$set('state.menuType', type)

            if (type == 'items' && this.$root.checkAuthorityByID('pay-series-items')) {
                this.subView = 'paySeriesItems';
            } else if (type == 'suite' && this.$root.checkAuthorityByID('pay-series-suites')) {
                this.subView = 'paySeriesSuite';
            }

        },

        // 搜索工资项目
        searchPayItems() {
            this.showFindAllItems = this.payItemsSearch.length > 0 ? true : false;
            this.$broadcast('searchPayItems', this.payItemsSearch)
        },
        // 搜索所有工资项目

        searchAllPayItems() {
            this.payItemsSearch = '';
            this.searchPayItems();
        },
        // 搜索工资套人员
        searchPaySuiteUsers(name) {
            this.$broadcast('showModalOfSuite', 'showSearchPersons', 'large')
        }
    },

}
</script>
<style scoped>

.ui-module-subTab {
    padding: 5px 15px 10px;
}
.ui-module-subPanel {
    position: absolute;
    top: 50px;
    right: 0;
    bottom: 0;
    left: 0;
}
.ui-search {
    margin-right: 0;
    margin-left: 20px;
}
</style>
