import Vue from 'vue'

const Tool = Vue.tool

// VUEX
// flux view>actions>mutations>state>view

// 数据、状态
const state = {}
    // 数据修改
const mutations = {}
    // 操作
const actions = {
    // ajax demo
    loadTest() {
        // 加载数据
        Tool.ajax({
            url: 'api.dashboard.getCardList',
            success(data, res) {
                console.log(data)
                mutations.SetRequireNumber(type, data)
            },
            error(res) {
                console.log(res)
            }
        })
    }
}

export default {
    state,
    mutations,
    actions
}
