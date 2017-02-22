<!--
* @Created Date       : 2016-11-07T10:07:25+08:00
* @Last Modified time : 2016-12-02T16:09:56+08:00
 -->


<!--
@Author: Yang
@Date:   2016-08-28 12:47:52
@Project: 人力管家
@Last modified by:   Yang
@Last modified time: 2016-09-02 05:08:35
@License: copyright@acewill
-->
<template>
<div class="editPaySuiteItems">
    <!-- 添加修改工资套项目 -->
    <template v-if="ctrltype=='addSuiteItem' || ctrltype=='updateSuiteItem'">

        <div class="form-horizontal container-fluid" role="form">
            <div class="form-body">
                <div class="row">
                    <div class="col-sm-24">
                        <div class="form-group row">
                            <label class="col-sm-4 control-label">工资项目</label>
                            <div class="col-sm-6">
                                <div class="input-inline input-medium">

                                    <input v-if="ctrltype=='updateSuiteItem'" type="name" class="form-control" :value="paySuiteItem.name" readonly>

                                    <select v-else v-model="setPayItemName" class="form-control">
                                        <option value="">请选择工资项目</option>
                                        <template v-for="item in payItemList">
                                            <option value="{{item.ID}}">{{item.itemName}}</option>
                                        </template>
                                    </select>

                                </div>
                                <!-- <span class="help-block">必填项</span> -->
                            </div>
                            <label class="col-sm-4 control-label">小数点位数</label>
                            <div class="col-sm-6">
                                <div class="input-inline input-medium">
                                    <input type="number" max="4" class="form-control" placeholder="小数点位数" v-model="paySuiteItem.float" @input="paySuiteItem.float>4?paySuiteItem.float=4:1">
                                </div>
                                <!-- <span class="help-block">必填项</span> -->
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-24">
                        <div class="form-group row">
                            <label class="col-sm-4 control-label">计算公式</label>
                            <div class="col-sm-20">
                                <div class="formulaBox">
                                    <div class="formulaState" @click="formulaHandler">
                                        <ui-scrollview>
                                            <ui-dragdrop v-if="formulaList.length" itemselector="div._formula" :order.sync="formulaOrder">
                                                <div class="_formula" v-for="f in formulaList" orderid="{{$index}}" v-if="f.valid">
                                                    {{{createFormula('html',f,$index)}}}
                                                    <strong class="_close" @click="delFormula($index)"><i class="ui-icon icon-tool icon-tool-close"></i></strong>
                                                </div>
                                            </ui-dragdrop>
                                        </ui-scrollview>
                                    </div>
                                    <div class="formulaEditorBox" v-show="formulaEditorShow">
                                        <div id="formulaEditor" class="_show" contenteditable="plaintext-only" @mouseup="getCusor"></div>
                                        <button class="_ok" @click="updateFormulaItems">确定</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-24">
                        <div class="form-group row">
                            <label class="col-sm-4 control-label"></label>
                            <div class="col-sm-20">
                                <div class="keyborad" @click="keyboradHandler">
                                    <ul class="clear-both">
                                        <li keyEvent="formula|then"   class="_db">等式</li>
                                        <li keyEvent="formula|if"  class="_db3">如果..则</li>
                                        <li keyEvent="formula|else" class="_db">否则</li>
                                        <li keyEvent="formula|elseif"   class="_db3">否则..如果</li>
                                        <li keyEvent="key| 且 " >且</li>
                                        <li keyEvent="key| 或 " >或</li>

                                        <li keyEvent="key|1" >1</li>
                                        <li keyEvent="key|2" >2</li>
                                        <li keyEvent="key|3" >3</li>
                                        <li keyEvent="key|4" >4</li>
                                        <li keyEvent="key|5" >5</li>
                                        <li keyEvent="key|6" >6</li>
                                        <li keyEvent="key|7" >7</li>
                                        <li keyEvent="key|8" >8</li>
                                        <li keyEvent="key|9" >9</li>
                                        <li keyEvent="key|0" >0</li>
                                        <li keyEvent="key|+" >+</li>
                                        <li keyEvent="key|-" >-</li>
                                        <li keyEvent="key|()|warp" >( )</li>
                                        <li keyEvent="key|*" >*</li>
                                        <li keyEvent="key|/" >/</li>
                                        <li keyEvent="key|=" >=</li>
                                        <li keyEvent="key|>" >&gt;</li>
                                        <li keyEvent="key|<" >&lt;</li>
                                        <li keyEvent="key|≥" >≥</li>
                                        <li keyEvent="key|≤" >≤</li>
                                        <li keyEvent="key|." >.</li>
                                        <li keyEvent="key|%" >%</li>


                                        <v-dropdown class="ui-tool-dropdown mathFunctions" trigger="click">
                                            <li data-toggle="dropdown" class="ui-tool-button _db">
                                                数学函数
                                            </li>
                                            <div slot="dropdown-menu" class="dropdown-menu">
                                                <span v-for="m in mathFunction" name="dropdown-item" keyEvent="{{m.val.replace('.','|')}}">{{m.name}}</span>
                                            </div>
                                        </v-dropdown>

                                        <li keyEvent="key|''|warp" class="_db">字符串</li>
                                        <li keyEvent="key|'20160101'" class="_db">日期格式</li>

                                        <li @click="clearFormula" class="_db primary">清空</li>
                                        <li @click="checkFormula" class="_db success">校验测试</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-24">
                        <div class="form-group row">
                            <label class="col-sm-4 control-label">参与计算项</label>
                            <div class="col-sm-20">

                                <ui-tabs v-ref:tabs v-if="countItems.length" class="calculationBox" type="text" background-color="clear" @active-tab-changed="tabChanged">

                                    <ui-tab v-for="group in countItems" :id="'_sview'+$index" :header="group.name">
                                        <ui-scrollview class="calculationList">
                                            <ul @click="formulaItemHandler">
                                                <li type="fItem" v-for="item in group.list" track-by="$index">{{item}}</li>
                                            </ul>
                                        </ui-scrollview>
                                    </ui-tab>

                                </ui-tabs>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-actions">
                    <div class="row">
                        <div class="text-center">
                            <ui-button id="submitBtn" color="accent" @click="toSavePaySuiteItem">保存</ui-button>
                            <ui-button color="default" @click="$emit('close')">取消</ui-button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- 公式验证 -->
        <ui-modal header="公式校验测试" :show.sync="modalCheckFormulaShow" v-if="modalCheckFormulaShow" type="large">

            <div class="form-horizontal container-fluid" role="form">
                <div class="form-body">
                    <div class="row">
                        <div class="col-sm-24">
                            <div class="form-group row">
                                <div class="col-sm-8">校验公式</div>
                                <div class="col-sm-16">
                                    <div class="checking_formula" v-for="ID in formulaOrder"  v-if="formulaList[ID].valid">
                                        {{{createFormula('html',formulaList[ID],$index)}}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-24">
                            <div class="form-group row">
                                <div class="col-sm-8">计算项赋值</div>
                                <div class="col-sm-16">
                                    <ul class="checking_inputs">
                                        <li v-if="formulaInputs.length>0" v-for="itemInput in formulaInputs">

                                            <label class="control-label pull-left">{{itemInput.name}}</label>
                                            <div class="input-inline input-medium pull-left ">
                                                <input type="name" class="form-control" placeholder="请输入" v-model="itemInput.val">
                                            </div>

                                        </li>
                                        <li v-if="formulaInputs.length===0">暂无参与计算项</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-24">
                            <div class="form-group row">
                                <div class="col-sm-8">计算结果</div>
                                <div class="col-sm-16">
                                    <div class="checking_result">{{fixedFormulaResult}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-actions">
                        <div class="row">
                            <div class="text-center">
                                <ui-button color="primary" @click="runCheck">开始测试</ui-button>
                                <ui-button color="success" @click="runCheckPassed">确认通过</ui-button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div slot="footer"></div>
        </ui-modal>
    </template>
    <!-- 删除工资套项目 -->
    <template v-if="ctrltype=='delSuiteItem'">
        <div class="_tipMsg text-center">
            当前工资套项目已经被其他项目引用，请解除引用后再删除</div>
        <div class="text-center">
            <ui-button id="submitBtn" color="accent" @click="$emit('close')">确定</ui-button>
        </div>
    </template>
</div>
</template>
<script>
import store from '../store'

function _toFixed(len) {

    let nums = (this+'').split('.');

    // 小数位数大于限定值，则四舍五入最后一位
    if(nums[1]&&nums[1].length>=len){
        // TODO: 需要考虑浮点运算不精确时对计算结果造成的影响
        var result  = Math.round(this*Math.pow(10, len))/Math.pow(10, len) +'';
        // console.log(Math.round(this*Math.pow(10, len))/Math.pow(10, len))
    }else{
        var result = this+'';
    }

    // 补全小数位数
    if(result.indexOf('.')<0){
        result = result+(len>0?'.':'')+(Math.pow(10, len)+'').substring(1,len+1);
    }else{
        result = result+ (Math.pow(10, len)+'').substring(1,len-(result.split('.')[1].length)+1);
    }

    return result;
}

window._Math = {
    float0(n) {
        return _toFixed.call(n, 0);
    },
    float1(n) {
        return _toFixed.call(n, 1);
    },
    float2(n) {
        return _toFixed.call(n, 2);
    },
    float3(n) {
        return _toFixed.call(n, 3);
    },
    getDayOfDate(date){
        date+='';
        return date.substring(date.length-2)-0;
    }
}
export default {
    data() {
        return {
            state: store.state,

            // 工资项目列表
            payItemList: [],

            // 工资项目
            paySuiteItem: {
                ID: '', // id]
                itemID: '',
                name: '', // 项目名称
                float: 0, // 小数点
                formula: '' // 公式
            },
            // 参与计算项
            countItems: [],

            // 公式列表
            formulaList: [],

            // 公式顺序
            formulaOrder: [],

            // 可赋值计算项列表
            formulaInputs: [],
            // 测试结果
            formulaResult: '',

            // 公式编辑框
            formulaEditor: null,

            // 显示编辑框
            formulaEditorShow: false,
            // 显示校验测试
            modalCheckFormulaShow: false,

            // 公式编辑器 光标
            cursorAtFormula: {
                selection: null,
                range: null,
                at: 0,
            },

            // 当前公式
            formulaEditing: null,

            // 数学公式
            mathFunction: [{
                name: '四舍五入',
                val: 'Math.round',
            }, {
                name: '向上取整',
                val: 'Math.ceil',
            }, {
                name: '向下取整',
                val: 'Math.floor',
            },{
                name: '取日期天数',
                val: '_Math.getDayOfDate',
            },
            /* {
            }, {
                name: '保留整数',
                val: 'Math.floor',
                name: '留1位小数',
                val: '_Math.float1',
            }, {
                name: '留2位小数',
                val: '_Math.float2',
            }, {
                name: '留3位小数',
                val: '_Math.float3',
            }, */],

            // 测试是否通过
            testSuccessed: false,


        }
    },
    props: {
        ctrltype: {
            type: String
        }
    },
    computed: {
        fixedFormulaResult:{
            get(){

                if(isNaN(this.formulaResult-0)){
                    return this.formulaResult
                }else{
                    return _toFixed.call(this.formulaResult,this.paySuiteItem.float);
                }

            }
        },
        setPayItemName: {
            set(val) {

                this.paySuiteItem.itemID = val;

                let selected = this.payItemList.filter(item => {
                    return item.ID == val;
                })

                this.paySuiteItem.name = selected[0] && selected[0].itemName ? selected[0].itemName : '';

                console.log(this.paySuiteItem.name)
            }
        }
    },
    attached() {

        this.formulaEditor = document.querySelector('#formulaEditor');

        // 新增
        if (this.ctrltype == 'addSuiteItem') {

            // 加载公式
            this.loadFormula();

            // 加载全局工资项目
            this.loadPayItems();

            // 加载参与计算项
            this.loadCountItems();

        }
        // 修改
        if (this.ctrltype == 'updateSuiteItem') {

            this.paySuiteItem.ID = this.state.paySuiteItemInfo.ID;
            this.paySuiteItem.name = this.state.paySuiteItemInfo.itemName;
            this.paySuiteItem.float = this.state.paySuiteItemInfo.pointNum;
            this.paySuiteItem.formula = this.state.paySuiteItemInfo.formula;


            console.log(this.paySuiteItem)


            // return;


            // 加载公式
            this.loadFormula(this.paySuiteItem.formula);

            // 加载全局工资项目
            this.loadPayItems();

            // 加载参与计算项
            this.loadCountItems();

        }


    },
    methods: {

        // 保存工资套项目
        toSavePaySuiteItem() {

            if(this.formulaOrder.length>0){
                if (!this.testSuccessed) {
                    this.$root.showTip({
                        type: 'warning',
                        msg: '公式未测试通过，请测试通过后提交'
                    })
                    return;
                }

            }
            if (!this.updateFormulaToData()) return;

            let data = {
                pointNum: this.paySuiteItem.float,
                formula: this.paySuiteItem.formula || '',
            }

            console.log(data)

            // 新增
            if (this.ctrltype == 'addSuiteItem') {

                data.itemID = this.paySuiteItem.itemID;

                if (!data.itemID) {
                    this.$root.showTip({
                        type: 'warning',
                        msg: '请选择工资项目'
                    })
                    return;
                }
                if (!data.formula&&data.formula!=='') {
                    this.$root.showTip({
                        type: 'warning',
                        msg: '计算公式不能为空'
                    })
                    return;
                }

                store.actions.addPaySuiteItems(data, () => {
                    this.$emit('close');
                    this.$emit('callback', 'addSuiteItem', true);
                });

            }
            // 修改
            else if (this.ctrltype == 'updateSuiteItem') {

                store.actions.updatePaySuiteItems(data, () => {
                    this.$emit('close');
                    this.$emit('callback', 'updateSuiteItem', true);
                });

            }


        },

        // 参与计算项 tab页切换
        tabChanged(tabID) {
            // console.log(tabID,this.$refs)

            this.$nextTick(() => {

                this.$refs.tabs.$broadcast('refreshScrollView')
                    // this.$refs[tabID] && this.$refs[tabID].refresh();

            })
        },

        // 加载全局工资项目
        loadPayItems() {
            store.actions.getPayItems(data => {
                this.payItemList = data;
            })
        },

        // 加载参与计算项目
        loadCountItems() {

            this.countItems = [];

            let existingItems;

            store.actions.selectPaySuiteCountItems(data => {
                // console.log(data)

                for (let key in data) {

                    let group = data[key];

                    console.log(group)

                    let g = {
                        name: group.name,
                        list: []
                    }

                    g.list = group.Items.map(item => {
                        return item.itemName;
                    })

                    if (key === 'countSuites') {
                        existingItems = g;
                        continue;
                    }

                    this.countItems.push(g)

                }

                this.countItems.unshift(existingItems);

                console.warn(this.countItems)


            });

        },

        // 加载公式数据
        loadFormula(formula) {

            let data = []

            if (formula) {
                data = formula.split(';')
            }

            data = data.filter(f => {
                return !!f;
            })

            this.formulaList = [];
            this.formulaOrder = [];

            data.forEach((f, index) => {

                let formula = f.replace(/\s/ig, '');

                let fobj = {
                    valid: 1,
                    type: '', // 公式类型 if , else , else if
                    formula: formula,
                    if: '', //
                    then: '',
                    else: ''
                }

                // 否则如果, 如果, 否则, 则
                let typeStr = ['\u5426\u5219\u5982\u679c', '\u5982\u679c', '\u5426\u5219', '\u5219']

                if (formula.indexOf(typeStr[0]) == 0) {
                    fobj.type = 'elseif'
                } else if (formula.indexOf(typeStr[1]) == 0) {
                    fobj.type = 'if'
                } else if (formula.indexOf(typeStr[2]) == 0) {
                    fobj.type = 'else'
                } else {
                    fobj.type = 'then'
                }

                // 否则如果
                formula = formula.replace(/\u5426\u5219\u5982\u679c/ig, '#')
                    // 如果
                formula = formula.replace(/\u5982\u679c/ig, '#')
                    // 否则
                formula = formula.replace(/\u5426\u5219/ig, '#')
                    // 则
                formula = formula.replace(/\u5219/ig, '#')

                console.log(formula)

                // 需要拆分
                if (formula.indexOf('#') > -1) {
                    let fList = formula.split('#');
                    fList.forEach(str => {
                        // 否则
                        if (fobj.type == 'else' && /[\{]|[\}]/.test(str)) {
                            fobj.else = str.substring(1, str.length - 1);
                            fobj.else = fobj.else.replace(this.paySuiteItem.name + '=', '')
                        }
                        // 则
                        else if (/[\{]|[\}]/.test(str)) {
                            fobj.then = str.substring(1, str.length - 1);
                        }
                        // 如果
                        else if (/[\()]|[\)]/.test(str)) {
                            fobj.if = str.substring(1, str.length - 1);
                        }
                    })
                }
                // 等式
                else {
                    fobj.then = formula.replace(/\{/ig, '');
                    fobj.then = fobj.then.replace(/\}/ig, '');
                }

                fobj.then = fobj.then.replace(this.paySuiteItem.name + '=', '')


                console.log(fobj)


                this.formulaList.push(fobj);
                this.formulaOrder.push(index);

                // let _then = formula.match(/[^\{]+[$\}]/ig);
                // if(_then){
                //     f.then = _then.join('').replace(/\}/ig,'');
                //     console.log(f.then)
                // }

                // let _if = formula.match(/[^\{]+[$\}]/ig);

            })

        },

        /* 计算公式编辑 */

        createFormula(type, formula, id, checking) {

            let strIF = formula.if;
            let strThen = formula.then;
            let strElse = formula.else;

            if (type == 'html') {

                if (formula.type == 'if') {
                    return `<strong fType="if">如果(</strong><span itemType="f" formulaID="${id}" strType="if">${strIF}</span><strong>)则{${this.paySuiteItem.name}=</strong><span itemType="f" formulaID="${id}" strType="then">${strThen}</span><strong>}</strong>`
                } else if (formula.type == 'else') {
                    return `<strong fType="else">否则{${this.paySuiteItem.name}=</strong><span itemType="f" formulaID="${id}" strType="else">${strElse}</span><strong>}</strong>`
                } else if (formula.type == 'elseif') {
                    return `<strong fType="elseif">否则如果(</strong><span itemType="f" formulaID="${id}" strType="if">${strIF}</span><strong>)则{${this.paySuiteItem.name}=</strong><span itemType="f" formulaID="${id}" strType="then">${strThen}</span><strong>}</strong>`
                } else if (formula.type == 'then') {
                    return `<strong fType="then">{${this.paySuiteItem.name}=</strong><span itemType="f" formulaID="${id}" strType="then">${strThen}</span><strong>}</strong>`
                } else {
                    return '';
                }

            } else if (type == 'string') {

                // 校验时，将判断条件中的=替换为==
                if (checking) {
                    strIF = strIF.replace(/=/ig, '==')
                }

                if (formula.type == 'if') {
                    return `如果(${strIF})则{${this.paySuiteItem.name}=${strThen}}`
                } else if (formula.type == 'else') {
                    return `否则{${this.paySuiteItem.name}=${strElse}}`
                } else if (formula.type == 'elseif') {
                    return `否则如果(${strIF})则{${this.paySuiteItem.name}=${strThen}}`
                } else if (formula.type == 'then') {
                    return `{${this.paySuiteItem.name}=${strThen}}`
                } else {
                    return '';
                }

            }

        },
        // 键盘
        keyboradHandler(e) {


            let keyEvent = e.target.getAttribute('keyEvent');

            if (!keyEvent) return;

            let type = keyEvent.split('|')[0],
                val = keyEvent.split('|')[1],
                cursorPos = keyEvent.split('|')[2]==='warp' ? 'warp' : 'after';

            // 添加公式
            if (type == 'formula') {
                this.addFormula(val);
                return;
            } else if (!this.formulaEditing) {

                this.$root.showTip({
                    type: 'warning',
                    msg: '请先选择要编辑的公式'
                })

                return;
            }
            //
            else if (type == 'key') {

                // 输入包裹光标
                if(cursorPos==='warp'){

                    let beforeStr = val.substring(0,1),
                        afterStr = val.substring(1);

                    this.insertAtCusor(beforeStr);
                    this.insertAtCusor(afterStr, 'before');
                }else{
                    this.insertAtCusor(val);
                }

            }

            // 数学公式
            else if (type == 'Math' || type == '_Math') {

                // console.log(e.target.textContent)

                this.insertAtCusor(e.target.textContent.replace(/\s/ig, "") + '(');
                this.insertAtCusor(')', 'before');
            }

        },
        // 点击公式 编辑公式
        formulaHandler(e) {

            let formula = e.target.getAttribute('itemType');
            if (formula != 'f') return;

            let fstr = e.target.textContent;
            let fID = e.target.getAttribute('formulaID') - 0;
            let strType = e.target.getAttribute('strType');

            this.formulaEditorShow = true;

            console.log(this.formulaEditor)

            this.formulaEditor.textContent = fstr == '点此编辑' ? '' : fstr;

            console.log(fID, strType)

            this.formulaEditing = {
                ID: fID,
                dataType: strType,
            };

            // 让公式获取焦点

            this.formulaEditor.focus();

            this.$nextTick(() => {
                this.formulaEditor.focus();
                this.getCusor();
            })

        },
        // 获取光标对象
        getCusor() {
            let range = window.getSelection().getRangeAt(0);
            this.cursorAtFormula.selection = window.getSelection();
            this.cursorAtFormula.range = range;
        },
        // 在光标位置插入内容
        insertAtCusor(text, pos) {

            console.log(this.cursorAtFormula.range)

            if (!this.cursorAtFormula.range) return;

            let textNode = document.createTextNode(text);

            // 插入文本
            this.cursorAtFormula.range.insertNode(textNode);

            // 复制range
            let range = this.cursorAtFormula.range.cloneRange();

            if (pos == 'before') {
                range.setStartBefore(textNode);
            } else {
                // 把光标设置为添加节点的尾部
                range.setStartAfter(textNode);
            }

            // 折叠范围，让边界重合
            range.collapse(true);
            // 清空
            this.cursorAtFormula.selection.removeAllRanges();
            // 添加复制的range
            this.cursorAtFormula.selection.addRange(range);
            // 更新引用
            this.cursorAtFormula.range = range;
        },
        // 点击参与计算项
        formulaItemHandler(e) {
            if (!this.paySuiteItem.name) {
                this.$root.showTip({
                    type: 'warning',
                    msg: '请先选择工资项目'
                })
                return;
            }
            if (!this.formulaEditing) {

                this.$root.showTip({
                    type: 'warning',
                    msg: '请先选择要编辑的公式'
                })

                return;
            }

            let type = e.target.getAttribute('type');
            if (type != 'fItem') return;

            this.insertAtCusor('【' + e.target.textContent.replace(/\s/ig, "") + '】');

        },
        // 添加公式
        addFormula(type) {

            if (!this.paySuiteItem.name) {
                this.$root.showTip({
                    type: 'warning',
                    msg: '请先选择工资项目'
                })
                return;
            }

            if (this.formulaEditing) {
                this.$root.showTip({
                    type: 'warning',
                    msg: '请先保存正在编辑的公式'
                })
                return;
            }

            let validFormula = 0;
            let validFormulaList = [];

            validFormulaList = this.formulaList.map(item => {
                if (item.valid) {
                    validFormula++;
                    return item;
                }
            })

            console.log(validFormulaList)

            // 等式不能与其他公式同时存在
            if (type == 'then' && validFormula > 0) {
                this.$root.showTip({
                    type: 'warning',
                    msg: '等式只能单独存在'
                })
                return;
            }

            if (validFormula == 1 && validFormulaList[0] && validFormulaList[0].type == 'then') {
                this.$root.showTip({
                    type: 'warning',
                    msg: '等式只能单独存在'
                })
                return;
            }

            let fm = {
                valid: 1,
                type: type,
                formula: '',
                if: '',
                then: '',
                else: ''
            }

            if (type == 'if') {
                fm.if = '点此编辑'
                fm.then = '点此编辑'
            } else if (type == 'else') {
                fm.else = '点此编辑'
            } else if (type == 'elseif') {
                fm.if = '点此编辑'
                fm.then = '点此编辑'
            } else if (type == 'then') {
                fm.then = '点此编辑'
            }

            // 更新data
            this.formulaList.push(fm)
                // 更新order
            this.formulaOrder.push(this.formulaList.length - 1);

            // 测试重置为未测试状态
            this.testSuccessed = false;

        },
        // 删除公式
        delFormula(ID) {

            if (this.formulaEditing) {
                this.$root.showTip({
                    type: 'warning',
                    msg: '请先保存正在编辑的公式'
                })
                return;
            }

            this.formulaList[ID].valid = 0;
            this.formulaOrder = this.formulaOrder.filter(i => {
                if (i != ID - 0) return true;
            })

            if (!this.formulaOrder.length) {
                this.formulaList = [];
            }

            // 测试重置为未测试状态
            this.testSuccessed = false;

        },
        // 清空公式列表
        clearFormula() {

            this.formulaEditing = null;
            this.formulaEditorShow = false;
            this.formulaOrder = [];
            this.formulaList = [];
            // this.$set('',[]);

            // 测试重置为未测试状态
            this.testSuccessed = false;

        },
        // 点击校验公式，整理公式中的参与计算项
        checkFormula() {

            let list = [];
            // 检测公式中有效公式数量，数量为0，则说明公式为空，因为编辑公式删除的时候是吧valid设置为false
            let hasValid = 0;
            // 提取公式中的参与计算项
            this.formulaList.forEach(f => {

                if (!f.valid) return;
                hasValid++;
                let str = f.if+f.then + f.else;
                // console.log(str)
                // 检索【参与计算项】
                let items = str.match(/[^\u3010]+[$\u3011]/ig);
                if (items) {
                    items.forEach(i => {
                        // 排重，当前计算项已存在则忽略
                        if (list.indexOf(i)<0) list.push(i);
                    })
                }

            })

            // //
            // if(hasValid==0){
            //     this.$root.showTip({
            //         type: 'warning',
            //         msg: '请先添加计算公式'
            //     })
            //     return;
            // }

            //
            this.formulaInputs = list.map(item => {
                return {
                    name: item.replace('】', ''),
                    val: ''
                }

            })

            console.log(this.formulaInputs)

            this.modalCheckFormulaShow = true;
        },

        // 编辑公式中的判断条件，或者结果
        updateFormulaItems() {

            // 验证 不能含有敏感字符，如果,否则，字母

            let str = this.formulaEditor.textContent.replace(/\s/ig, "");

            if (str.length == 0) {
                this.$root.showTip({
                    type: 'warning',
                    msg: '不能为空'
                })
                return;
            }

            let errMsg = '';

            // if (/[a-zA-Z]/.test(str)) {
            //     errMsg += '英文字母，'
            // }
            // 特殊符号
            var pattern = /[`~!@#\$\^\&_\?:"\{\},\\;\[\]]/im;
            if (pattern.test(str)) {
                errMsg += '特殊符号（`~!@#$^&?:";\',_[]{}\/）'
            }
            // 如果则（）
            if (/[\u5982\u679c\u5219\uff08\uff09\u201d\u201c\u2018\u2019]/.test(str)) {
                errMsg += '如果，否则，则，中文括号（）'
            }

            if (errMsg) {
                this.$root.showTip({
                    type: 'warning',
                    msg: '算式不能含有：' + errMsg,
                })
                return;
            }

            // update data
            // Vue.set(this.formulaList[this.formulaEditing.ID],this.formulaEditing.dataType, str);
            // let keys =
            // this.$set(,str)

            this.formulaList[this.formulaEditing.ID][this.formulaEditing.dataType] = str;

            this.formulaEditing = null;
            this.formulaEditorShow = false;

            // 测试重置为未测试状态
            this.testSuccessed = false;

        },

        // 根据参与计算项名字获取测试输入项
        getInputByName(name) {

            let inputItem;
            this.formulaInputs.forEach(item => {

                if (item.name == name) {
                    inputItem = item;
                }

            });

            return inputItem;

        },

        // 开始测试
        runCheck() {

            if (!this.formulaOrder.length) {

                this.$root.showTip({
                    type: 'warning',
                    msg: '公式为空请添加公式'
                })

                return;

            }

            // 判断公式格式 else 后面只能跟if

            // 拼接公式 去除空格
            let formula = '';
            let formatError = '';
            this.formulaOrder.forEach((ID, index) => {

                let f = this.formulaList[ID];

                if (!f.valid || !f) return;

                let prev = index > 0 ? this.formulaList[f - 1] : null;

                if (index == 0) {

                    if (f.type == 'else') {
                        formatError += '【否则】判断不能放在第一个'
                        return;
                    } else if (f.type == 'elseif') {
                        formatError += '【否则如果】判断不能放在第一个'
                        return;
                    }

                } else if (prev) {

                    if (prev.type == 'else' && f.type == 'else') {
                        formatError += '【否则】后面不能直接跟上【否则】'
                        return;
                    } else if (prev.type == 'else' && f.type == 'elseif') {
                        formatError += '【否则】后面不能直接跟上【否则如果】'
                        return;
                    }

                }

                formula += this.createFormula('string', f, '', true);
            })


            if (formatError) {
                console.log('formatError', formatError)
                this.$root.showTip({
                    type: 'warning',
                    msg: '公式格式不正确：' + formatError
                })
                return;
            }

            formula = formula.replace(/\s/ig, '')

            console.log(formula)

            // 替换逻辑关键字
            formula = formula.replace(/\u5426\u5219\u5982\u679c/ig, 'else if'); // 否则如果
            formula = formula.replace(/\u5982\u679c/ig, 'if'); // 如果
            formula = formula.replace(/\u5426\u5219/ig, 'else'); // 否则
            formula = formula.replace(/\u5219/ig, ''); // 则

            formula = formula.replace(/\u4e14/ig, '&&'); // 且
            formula = formula.replace(/\u6216/ig, '||'); // 或

            console.log(formula)

            // 替换数学符号 及 特殊符号
            this.mathFunction.forEach(m => {
                let reg = new RegExp(m.name, 'g')
                formula = formula.replace(reg, m.val)
            })

            console.log(formula)

            // 替换>= <= =
            formula = formula.replace(/\u2265/ig, '>=');
            formula = formula.replace(/\u2264/ig, '<=');

            // 替换%
            formula = formula.replace(/%/ig, '*0.01');

            console.log(formula)

            // 替换参与计算项，将参与计算项替换为测试中的输入对象 inputItem
            if (this.formulaInputs.length > 0) {

                let errMsg = '';

                this.countItems.forEach(group => {

                    group.list.forEach(item => {
                        // console.log(item)

                        if (formula.indexOf('【' + item + '】') > -1) {

                            let inputItem = this.getInputByName(item);

                            // console.log(inputItem)

                            if (isNaN(inputItem.val)) {
                                // let err = '【' + item + '】';
                                // if (errMsg.indexOf(err) < 0) {
                                //     errMsg += err
                                // }

                                let reg = new RegExp('【' + item + '】', 'g')
                                formula = formula.replace(reg, '"'+inputItem.val+'"');

                            } else {
                                let reg = new RegExp('【' + item + '】', 'g')
                                formula = formula.replace(reg, inputItem.val - 0);
                            }

                        }

                    })

                })

                if (errMsg) {
                    this.$root.showTip({
                        type: 'warning',
                        msg: '以下计算项赋值错误：' + errMsg
                    })
                    return;
                }


            }
            // 替换结果项
            this.formulaResult = '';
            formula = formula.split(this.paySuiteItem.name).join('this.formulaResult');
            console.log(formula)

            // 开始执行公式
            try {
                eval(formula)
                this.testSuccessed = true;
            } catch (e) {
                console.log(e)

                this.$root.showTip({
                    type: 'warning',
                    msg: '校验失败，请检查修改公式'
                })

            }
        },

        // 确认测试通过
        runCheckPassed() {

            this.modalCheckFormulaShow = false;
            this.testSuccessed = true;

        },

        // 更新公式到data
        updateFormulaToData() {

            console.log(this.formulaList)

            // 拼接公式 去除空格
            let formula = '';
            let formatError = '';
            this.formulaOrder.forEach((ID, index) => {

                let f = this.formulaList[ID];

                console.log(f)

                if (!f.valid || !f) return;

                let prev = index > 0 ? this.formulaList[f - 1] : null;

                if (index == 0) {

                    if (f.type == 'else') {
                        formatError += '【否则】判断不能放在第一个'
                        return;
                    } else if (f.type == 'elseif') {
                        formatError += '【否则如果】判断不能放在第一个'
                        return;
                    }

                } else if (prev) {

                    if (prev.type == 'else' && f.type == 'else') {
                        formatError += '【否则】后面不能直接跟上【否则】'
                        return;
                    } else if (prev.type == 'else' && f.type == 'elseif') {
                        formatError += '【否则】后面不能直接跟上【否则如果】'
                        return;
                    }

                }

                formula += this.createFormula('string', f, '') + ';';


                console.log(formula)
            })


            if (formatError) {
                console.log('formatError', formatError)
                this.$root.showTip({
                    type: 'warning',
                    msg: '公式格式不正确：' + formatError
                })
                return false;
            }

            formula = formula.replace(/\s/ig, '')

            console.log(formula)

            this.paySuiteItem.formula = formula;

            return true;
        }

    }
}
</script>
<style lang="scss">
.editPaySuiteItems {
    .form-actions {
        padding-top: 30px;
    }
    .calculationBox {
        margin-bottom: 0;
        width: 590px;
    }
    .calculationBox .ui-tabs-header.background-color-clear {
        border: 1px solid #eeeeee;
        border-radius: 6px 6px 0 0 ;
    }
    .calculationBox .ui-tabs-body {
        border-radius: 0 0 6px 6px;
        padding-right: 0;
        height: 160px;
    }
    .calculationBox .ui-tab {
        height: 100%;
    }
    .calculationList {
        /*
        border-radius: 6px;
        border: 1px solid #ddd;
        padding: 10px 0px 10px 10px;
        width: 590px;
        max-height: 200px;
        margin-top:10px;
        */
    }
    .calculationList ul {
        overflow: hidden;

        padding-right: 5px;
    }
    .calculationList li {
        float: left;

        margin: 0 10px 5px 0;
        border: 1px solid #dddddd;
        border-radius: 6px;
        padding: 8px 10px;
        width: 23%;

        cursor: pointer;
    }
    .calculationList li:hover {
        background: #eeeeee;
    }

    .formulaBox {
        position: relative;

        width: 590px;
    }

    /* 公式展示 */
    .formulaState {
        overflow: hidden;

        border: 1px solid #dddddd;
        border-radius: 6px;
        padding: 10px 0 10px 10px;
        width: 590px;
        height: 180px;

        user-select: none;
    }

    .formulaState ._formula {
        overflow: hidden;

        position: relative;

        padding: 5px 0 ;
        padding-right: 30px;

        line-height: 2;
    }

    .formulaState ._formula ._close {
        display: inline-block;

        position: absolute;
        top: 10px;
        right: 10px;

        border: 1px solid #999999;
        border-radius: 50%;
        width: 20px;
        height: 20px;

        line-height: 22px;
        text-align: center;

        color: #999999;

        cursor: pointer;
    }
    .formulaState ._formula ._close:hover {
        border: 1px solid #fd6d5a;

        color: #fd6d5a;
    }
    .formulaState ._formula ._close:hover .icon-tool-close{
        color: #fd6d5a;
    }
    .formulaState ._formula ._close .icon-tool-close {
      width: 20px;
      height: 20px;
      margin-top: -2px;
        font-size: 14px;
        color: #999;
    }


    .formulaState .ui-dragdrop {
        overflow: hidden;

        margin-right: 5px;
        border-bottom: 1px solid #dddddd;
    }
    .formulaState .ui-dragdrop:last-child {
        border: none;
    }

    .formulaState span, .formulaState strong {
        border: 1px solid #ffffff;

        font-weight: normal;
        letter-spacing: 2px;

        color: #333333;

        cursor: pointer;
    }

    .formulaState span {
        font-weight: 700;
        font-style: normal;

        color: #08c37a;
    }
    .formulaState span:hover, .formulaEditorBox span:hover {
        border: 1px solid #dddddd;
    }
    .formulaState span:active, .formulaEditorBox span.active {
        border: 1px solid red!important;
    }

    .formulaEditorBox span.dragHandler {
        float: left!important;

        margin: 5px!important;
        border: 1px solid red!important;
        min-width: 10px!important;
    }

    /* 公式编辑器 */
    .formulaEditorBox {
        overflow: hidden;

        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 100;

        border: 1px solid #cccccc;
        height: auto;
        min-height: 40px;

        background: #ffffff;

        box-shadow: 0 0 5px rgba(0,0,0,0.2);

        user-select: none;
    }

    .formulaEditorBox ._show {
        overflow-y: auto;

        margin: 0;
        padding: 10px;
        padding-right: 50px;
        width: 100%;
        height: 100%;
        max-height: 400px;

        color: #08c37a;
    }

    .formulaEditorBox ._ok {
        position: absolute;
        right: 10px;
        bottom: 10px;
    }
    .formulaEditorBox strong {
        font-weight: normal;
    }
    .formulaEditorBox span {
        display: block;
        float: left;

        margin: 5px 2px;
        border: 1px solid #ffffff;
        border-radius: 3px;
        padding: 0 2px;
        height: 30px;

        font-weight: bold;
        line-height: 30px;
        text-align: center;
        white-space: nowrap;

        cursor: pointer;
    }

    /* 公式校验 */
    .checking_formula {
        margin-bottom: 5px;
    }

    .checking_formula strong {
        font-weight: normal;
    }
    .checking_formula span {
        font-weight: bold;

        color: #08c37a;
    }

    .checking_inputs {
        overflow: hidden;
    }
    .checking_inputs li {
        float: left;
        overflow: hidden;

        margin-right: 50px;
        margin-bottom: 10px;
    }
    .checking_inputs label {
        margin-right: 20px;
    }
    .checking_inputs input {
        width: 120px;
    }

    .checking_result {
        border-bottom: 1px solid #666666;
        width: 80px;
        height: 20px;
    }


    /* 键盘 */

    .keyborad {
        margin-left: -5px;
        width: 600px;

        user-select: none;
    }
    .keyborad ul {
    }
    .keyborad li {
        float: left;

        margin: 5px;
        border-radius: 3px;
        padding: 0;
        width: 40px;
        height: 40px;

        font-size: 16px;
        line-height: 40px;
        text-align: center;

        box-shadow: 0 0 5px rgba(0,0,0,0.3);

        cursor: pointer;
    }

    .keyborad li.success{
        color: #fff;
        background: #08c37a;
    }
    .keyborad li.primary{
        color: #fff;
        background: #fd6551;
    }


    .keyborad li._db {
        width: 90px;
    }
    .keyborad li._db3 {
        width: 140px;
    }
    .keyborad li:hover {
        box-shadow: 0 0 5px rgba(0,0,0,0.5);
    }
    .keyborad li:active {
        box-shadow: 0 0 1px rgba(0,0,0,0.3);
    }
    .mathFunctions .dropdown-menu span {
        display: block;

        padding: 3px;

        text-indent: 10px;

        cursor: pointer;
    }
    .mathFunctions .dropdown-menu span:hover {
        background: #eeeeee;
    }
}

</style>
