<!--
* @Created Date       : 2016-10-21T10:56:14+08:00
* @Last Modified time : 2016-10-21T14:11:45+08:00
 -->


<template>
<div class="ui-panel">

    <div class="ui-panel-title">table 组件</div>
    <div class="ui-panel-content" style="height: 100%;">
        <table class="table table-bordered">
            <tr>
                <td>参数</td>
                <td>类型</td>
                <td>说明</td>
            </tr>
            <tr>
                <td>title</td>
                <td>String</td>
                <td>表格标题</td>
            </tr>
            <tr>
                <td>tdheight</td>
                <td>String</td>
                <td>控制单元格高度</td>
            </tr>
            <tr>
                <td>dataList</td>
                <td>Array</td>
                <td>表格数据</td>
            </tr>
            <tr>
                <td>multiTitles</td>
                <td>Array</td>
                <td>呈现分组表头</td>
            </tr>
            <tr>
                <td>rowTotal</td>
                <td>Boolean</td>
                <td>行合计</td>
            </tr>
            <tr>
                <td>totalIgnore</td>
                <td>Array</td>
                <td>行合计忽略合计[]</td>
            </tr>
            <tr>
                <td>columnTotal</td>
                <td>Boolean</td>
                <td>列合计</td>
            </tr>
            <tr>
                <td>progressShow</td>
                <td>Boolean</td>
                <td>加载等待</td>
            </tr>
            <tr>
                <td>groupInfos</td>
                <td>Array</td>
                <td>分组</td>
            </tr>
            <tr>
                <td>lorder</td>
                <td>Array</td>
                <td>排序</td>
            </tr>

        </table>

        <div style="position: relative; height: 800px;">
            <ui-report v-ref:report :data-list="dataList" :titles="titles" :multi-titles="multiTitles" :row-total="rowTotal" :group-infos="groupColumns" :total-ignore='totalIgnore' :progress-show="processShow" :lorder="lorder">
            </ui-report>
        </div>

    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            multiTitles: [],
            groupColumns: [],
            rowTotal: false,
            titles: [{
                name: "userNum",
                title: "员工工号",
                width: '200px',
            }, {
                name: "userName",
                title: "姓名",
            }, {
                name: "orgName",
                title: "组织名称",
                width: '300px'
            }, {
                name: "positionName",
                title: "职位",
                width: '200px'
            }, {
                name: "postName",
                title: "岗位",
                width: '200px'
            }, {
                name: "trainWorkTime",
                title: "日期",
            }, {
                name: "transferWorkTime",
                title: "日期",
            }, {
                name: "week",
                title: "星期",
                width: '100px'
            }],
            dataList: [{
                "orgName": "正君餐饮-北京测试子公司-test公司1-门店1",
                "positionName": "专员",
                "postName": "专员（助理）",
                "trainWorkTime": 0,
                "transferWorkTime": 0,
                "userName": "彭洪果",
                "userNum": "t0013",
                "week": "周五"
            },{
                "orgName": "正君餐饮-北京测试子公司-test公司1-门店1",
                "positionName": "专员",
                "postName": "专员（助理）",
                "trainWorkTime": 0,
                "transferWorkTime": 0,
                "userName": "彭洪果",
                "userNum": "t0013",
                "week": "周五"
            },{
                "orgName": "正君餐饮-北京测试子公司-test公司1-门店1",
                "positionName": "专员",
                "postName": "专员（助理）",
                "trainWorkTime": 0,
                "transferWorkTime": 0,
                "userName": "彭洪果",
                "userNum": "t0013",
                "week": "周五"
            },{
              "orgName":"新奥店将就将就款京东方和就发的 的",
              "positionName":"新奥店将就将就款京东方和就发的 的",
              "postName":"新奥店将就将就款京东方和就发的 的",
              "trainWorkTime":"新奥店将就将就款京东方和就发的 的",
              "transferWorkTime":"新奥店将就将就款京东方和就发的 的",
              "userName":"新奥店将就将就款京东方和就发的 的",
              "userNum":"新奥店将就将就款京东方和就发的 的",
              "week":"新奥店将就将就款京东方和就发的 的",
            }],
            compare: false,
            groupColumns: ['userNum'],
            multiTitles: [{
                title: '年假',
                columns: ['week', 'trainWorkTime','transferWorkTime']
            }],
            lorder: ['userName', 'date'],
            totalIgnore: ['date', 'userNum']
        }
    },
}
</script>
<style scoped>
.wrap {
    /*position: absolute;
    overflow: hidden;*/
    /*left: 20px !important;
    top: 20px !important;
    right: 20px !important;
    bottom: 50px !important;*/
}
</style>
