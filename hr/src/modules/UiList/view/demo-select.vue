<template>
<div class="ui-panel">

    <div class="ui-panel-title">Selection 下拉选择框 支持单选，多选</div>
    <div class="ui-panel-content">
        <div class="api">

            <table class="table table-bordered">
                <thead>
                    <td colspan="3">组件说明</td>
                </thead>
                <tr>
                    <td>value</td>
                    <td>Array</td>
                    <td>数据，双向绑定</td>
                </tr>
                <tr>
                    <td>optionList</td>
                    <td>Array</td>
                    <td>可选，下拉列表数据，数组形式 [{value:'1',label:'选项'}]</td>
                </tr>
                <tr>
                    <td>multiple</td>
                    <td>Boolean</td>
                    <td>开启多选</td>
                </tr>
                <tr>
                    <td>placeholder</td>
                    <td>String</td>
                    <td>默认显示的文字</td>
                </tr>

                <tr>
                    <td>fluid</td>
                    <td>Boolean</td>
                    <td>是否宽度100%，默认false</td>
                </tr>

                <tr>
                    <td>overflow</td>
                    <td>String</td>
                    <td>选项超出一行是否隐藏，默认显示 visible 隐藏 hidden</td>
                </tr>
                <tr>
                    <td>toolbar</td>
                    <td>Boolean</td>
                    <td>多选是否显示工具条 默认显示，包括： 全选 反选 清空</td>
                </tr>


            </table>

        </div>


        <h4>单选 已选id：{{selected1}}</h4>
        <v-select :value.sync="selected1">
            <v-option v-for="item in optionList" :value="item.value" :name="item.name">{{item.name}}</v-option>
        </v-select>

        <h4>禁用</h4>
        <v-select :value.sync="selected1" :disabled="true">
            <v-option value="1" name="Apple">Apple</v-option>
            <v-option value="2" name="Banana">Banana</v-option>
            <v-option value="3" name="Cherry">Cherry</v-option>
            <v-option value="4" name="Orange">Orange</v-option>
            <v-option value="5" name="Grape">Grape</v-option>
        </v-select>

        <h4>多选 限制5条 已选id：{{selected2}}</h4>
        <button @click="selected2 = ['3','4']">选中数据</button>
        <v-select :options="optionList" :value.sync="selected2" :multiple="true" :limit="5" placeholder="请选择门店">
        </v-select>

        <h4>多选 全显 </h4>
        <v-select :options="optionList" :value.sync="selected3" :multiple="true" placeholder="请选择门店" style="width:500px;">
        </v-select>

        <h4>多选 超出一行 隐藏</h4>
        <div class="clear-both">
            <v-select :options="optionList" :value.sync="selected3" :multiple="true" overflow="hidden" placeholder="请选择门店" style="width:300px;">
            </v-select>
        </div>

        <h4>多选默认显示工具条  </h4>
        <div class="clear-both" style="height: 500px;">
            <v-select :options="optionList" :value.sync="selected3" :multiple="true" overflow="hidden" placeholder="请选择门店" style="width:300px;">
            </v-select>
        </div>


    </div>
</div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            /* select */

            optionList: [{
                value: '1',
                name: '门店1'
            }, {
                value: '2',
                name: '门店2'
            }, {
                value: '3',
                name: '门店3'
            }, {
                value: '4',
                name: '门店4'
            }, {
                value: '5',
                name: '门店5'
            }, {
                value: '6',
                name: '门店6'
            }, {
                value: '7',
                name: '门店7'
            }, {
                value: '8',
                name: '门店8'
            }, {
                value: '9',
                name: '门店9'
            }, {
                value: '10',
                name: '门店10'
            }, {
                value: '11',
                name: '门店11'
            }, {
                value: '12',
                name: '门店12'
            }, {
                value: '13',
                name: '门店13'
            }, {
                value: '14',
                name: '门店14'
            }, {
                value: '15',
                name: '门店15'
            }, ],

            selected1: [],
            selected2: ['1','2'],
            selected3: [],

        }
    },


}
</script>
