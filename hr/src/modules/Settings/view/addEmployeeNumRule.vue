<!--
* @Created Date       : 2016-09-27T19:07:25+08:00
* @Last Modified time : 2016-12-26T17:07:25+08:00
 -->
<template>
    <section class="ui-module-content ui-panel" :show.sync="display">
        <ui-validator name="validation1" v-ref:validator>
            <form class="form-horizontal container-fluid warp" role="form" vali-submit="submitBt|submitInfo">
                <div class="photo-wrap" style="margin-top:20px;">
<div class="photo-wrap-left" style="width: 100%;">
<div class="row">
    <div class="col-sm-24">
        <div class="form-group   row">
            <label style="width:200px;" class="col-sm-3 control-label">员工工号规则名称：</label>
<template v-if='type !="edit" || editState'>
    <div style="width:300px;" class="col-sm-16" >
<input type="text" v-model="info.ruleName" class="form-control" placeholder="请输入编号规则" vali="required" vali-msg='必填项'>
</div>
</template>
<template v-else>
    <div style="width:300px;" class="col-sm-16 nostyle">
<input type="text" v-model="state.ruleData.ruleName" class="form-control" readonly="readonly">
</div>
</template>

</div>
</div>
</div>
<div class="row">
    <div class="col-sm-24">
        <div class="form-group   row">
            <label style="width:200px;" class="col-sm-8 control-label"> 适用组织：</label>
<template v-if='type !="edit" || editState'>
    <div style="width:300px;" class="col-sm-16">
<combo-tree vali="required" vali-msg='必填项' :treedata="state.orgComboTree" :nodeclicked="nodeClicked" :dropdownvalue.sync="state.dropvalue"
    :dropdownname.sync="state.dropname" :checkable="true" :multiple="true" :rootvisible="false" idprop="ID">
    <div data-toggle="dropdown">
        <input type="text" class="form-control" placeholder="请选择组织" readonly value="{{info.orgDisplayName}}" title='{{info.orgDisplayName}}'>
    </div>
</combo-tree>
</div>
</template>
<template v-else>
    <div style="width:300px;" class="col-sm-16 nostyle">
<input type="text" v-model="state.ruleData.orgName" class="form-control" readonly="readonly">
</div>
</template>

</div>
</div>
</div>
<div class="row">
    <div class="col-sm-24">
        <div class="form-group   row">
            <label style="width:200px;" class="col-sm-8 control-label"> 员工状态：</label>
<template v-if='type !="edit" || editState'>
    <div style="width:300px;" class="col-sm-16">
<v-select vali="required" vali-msg='必填项' :options="userTypes" :value.sync="info.state" :multiple="true" placeholder="请选择用工类型"
    overflow="hidden">
</v-select>
</div>
</template>
<template v-else>
    <div style="width:300px;" class="col-sm-16 nostyle">
<input type="text" v-model="state.ruleData.stateName" class="form-control" readonly="readonly">
</div>
</template>

</div>
</div>
</div>
<div class="row" v-show='type !="edit" || editState'>
    <div class="col-sm-24">
        <div class="form-group   row">
            <label style="width:200px;" class="col-sm-8 control-label"> 员工工号规则：</label>
<div style="width:400px;margin-top:7px;" class="col-sm-16">
<ui-radio name="radio" value="1" :model.sync="numRuleRadio" label="自动生成" checked></ui-radio>
<ui-radio name="radio" value="2" :model.sync="numRuleRadio" label="自定义规则" checked></ui-radio>
</div>
</div>
</div>
</div>

<div class="row" v-show='type =="edit"'>
    <div class="col-sm-24">
        <div class="form-group   row">
            <label style="width:200px;" class="col-sm-8 control-label"> 员工工号规则：</label>
<div style="width:400px;margin-top:7px;margin-left: 10px;color:#555555; " class="col-sm-16">
<p v-show='numRuleRadio == 1'>自动生成</p>
<p v-show='numRuleRadio == 2'>自定义规则</p>
</div>
</div>
</div>
</div>

<div class="row" v-show='numRuleRadio == 2'>
    <div class="col-sm-24">
        <div class="form-group   row">
            <label style="width:200px;" class="col-sm-8 control-label"> 员工工号组成：</label>
<template v-if='type !="edit" || editState'>
    <div v-for="item in info.employeeNumRuleDetail" style="width:500px;float:none;margin-left:200px;margin-bottom:30px;" class="col-sm-16">
<input style="width:150px;float:left;margin-right:10px" @blur='inputBlur' type="text" v-model="item.template" class="form-control" placeholder="{{item.type == 1?'请输入数字/字母':'请输入数字'}}"
:readonly='item.template == "YYYYMMDD"'>
<select style="width:150px;float:left;" v-model="item.type" class="form-control" @change='selectChange(item.type,$index)'>
<template v-for="option in item.c">
    <option value="{{option.code}}" :selected="option.code==item.type">{{option.name}}</option>
</template>
</select>
<a href="javascript:void(0)" class="addOrDelete" @click='addNumRule($index)'>+</a>
<a href="javascript:void(0)" class="addOrDelete" @click='deleteNumRule($index)'>-</a>
</div>
</template>
<div v-else class="col-sm-16 nostyle">
    <template v-for='item in info.employeeNumRuleDetail'>
        <div class="col-sm-16" style="margin-bottom:10px;margin-left:0;padding-left:0;">
<input style="width:150px;float:left;margin-right:10px" type="text" v-model="item.template" class="form-control" disabled='true'>
<select style="width:150px;float:left;" v-model="item.type" class="form-control" disabled="true">
<template v-for="option in item.c">
    <option value="{{option.code}}" :selected="option.code==item.type">{{option.name}}</option>
</template>
</select>
</div>
</template>
</div>
</div>
</div>
</div>
<div class="row" v-show='numRuleRadio == 2'>
    <div class="col-sm-24">
        <div class="form-group   row">
            <label style="width:200px;" class="col-sm-8 control-label"></label>
<div style="width:600px;margin-top:7px;color:#999;" class="col-sm-16">
<p>说明
    </br>
1.添加的规则中必须有一个为增量
</br>
2.如果输入的为数字且为增量，请输入与位数匹配的0替代
例如，位数为三位，且为增量，此时在输入框中输入000，系统会自动生成
</br>
3.如果输入的为数字且为固定，输入后所有的员工编号固定为这个数字
例如，位数为三位，且为固定，输入123，则所有员工编号都带有123</p>
</div>
</div>
</div>
</div>
<div class="row showNumRuleGather" v-show='numRuleRadio == 2'>
    <div class="">
        <template v-if='type !="edit" || editState'>
            <span v-for="item in info.employeeNumRuleDetail">
                  {{item.template}}
                </span>
        </template>
        <template v-else>
            <span v-for="item in state.ruleData.detailList">
                     {{item.template}}
                  </span>
        </template>
    </div>
</div>
</div>
</div>
<div class="row btn">
    <div class="text-center" v-show='type =="edit" && showEditBtn'>
        <template v-if="showBtn">
            <ui-button color="danger" @click='deleteFn' v-if="type =='edit'">
                删除</ui-button>
            <ui-button color="success" @click="edit" v-if="type =='edit'" style="background: #ffc000;">修改</ui-button>
        </template>
    </div>
    <div class="text-center" v-show='!(type =="edit" && showEditBtn) '>
        <ui-button color="success" class="large" id="submitBt">保存</ui-button>
    </div>
</div>
<v-spinner :size="md" :fixed="false" text="" v-ref:spinner></v-spinner>
</form>
</ui-validator>
<ui-confirm @confirmed="confirmed" confirm-button-text="是" deny-button-text="否" :show.sync="deletedialogShow" close-on-confirm
    header="提示">
    数据删除不可恢复,是否继续
</ui-confirm>
</section>
</template>
<script>
    import store from '../store'
    import Vue from 'vue'
    const tool = Vue.tool;
    export default {
        data() {
            return {
                state: store.state,
                numRuleRadio: 1,
                numRuleRadioFlag: false,
                saveed: false,
                deleteBtn: true,
                deletedialogShow: false,
                editState: false,
                showBtn: true,
                showEditBtn: false,
                flag: false,
                _flag: false,
                __flag: false,
                userTypes: [],
                info: {
                    ruleName: '',
                    org: [],
                    state: [],
                    orgDisplayName: [],
                    orgIDs: [],
                    employeeNumRuleDetail: [{
                        template: '',
                        c: [{
                            code: '1',
                            name: '固定'
                        }, {
                            code: '2',
                            name: '增量',
                        }, {
                            code: '3',
                            name: '时间',
                        }],
                        type: '1',
                        reg: '',
                    }],
                }
            };
        },
        components: {},
        filters: {

        },
        watch: {
            'type'() {
                console.log(this.type)
                if (this.type == 'add') {
                    this.editState = false;
                    this.info.ruleName = '';
                    this.info.state = [];
                    this.info.orgIDs = [];
                    this.info.orgDisplayName = [];
                    this.info.org = [];
                    this.info.employeeNumRuleDetail = [{
                        template: '',
                        c: [{
                            code: '1',
                            name: '固定'
                        }, {
                            code: '2',
                            name: '增量',
                        }, {
                            code: '3',
                            name: '时间',
                        }],
                        type: '1',
                        reg: '',
                    }];
                }
            },

        },
        methods: {
            deleteNumRule(index) {
                if (this.info.employeeNumRuleDetail.length <= 1) { } else {
                    this.info.employeeNumRuleDetail.$remove(this.info.employeeNumRuleDetail[index]);
                }
            },
            addNumRule(index) {
                if (this.$data.info.employeeNumRuleDetail.length < 3) {
                    this.$data.info.employeeNumRuleDetail.$set(this.$data.info.employeeNumRuleDetail.length, {
                        template: '',
                        c: [{
                            code: '1',
                            name: '固定'
                        }, {
                            code: '2',
                            name: '增量',
                        }, {
                            code: '3',
                            name: '时间',
                        }],
                        type: '1',
                        reg: '',
                    })
                    this.flag=false;
                    this._flag=false;
                    this.__flag=false;
                } else {
                    Vue.tool.showTip({
                        type: 'danger', // 提示类型 success,warning,info,danger
                        msg: '员工编号规则最多添加5条', // 提示文字
                        duration: 2000 // 自动消失时间
                    });
                }
            },
            selectChange(val, index) {
                if (val == '1') {
                    this.info.employeeNumRuleDetail[index].template = '';
                } else if (val == '2') {
                    this.info.employeeNumRuleDetail[index].template = '';
                } else if (val == '3') {
                    this.info.employeeNumRuleDetail[index].template = 'YYYYMMDD';
                }
            },
            deleteFn() {
                this.deletedialogShow = true;
            },
            confirmed() {
                var self = this;
                store.actions.deleteEmployeeNumberRule(this.numRuleID, () => {
                    self.display = false;
                    store.actions.loadEmployeeNumberRuleList(() => {

                    });
                });
            },
            edit() {
                var self = this;
                store.actions.isCanUpdateEmployeeNumberRule(this.numRuleID, (data) => {
                    if (data == '此规则下有员工使用,不允许修改') {
                        Vue.tool.showTip({
                            type: 'danger', // 提示类型 success,warning,info,danger
                            msg: '此规则下有员工使用,不允许修改', // 提示文字
                            duration: 2000 // 自动消失时间
                        });
                        return false;
                    } else {
                        self.editState = true;
                        self.saveed = true;
                        self.showBtn = false;
                        self.showEditBtn = false;
                        self.$nextTick(() => {
                            self.$refs.validator.refresh();
                        })
                    }

                });

            },
            nodeClicked(data) {
                this.info.orgDisplayName = [];
                this.info.orgIDs = [];
                for (var i = 0; i < data.length; i++) {
                    this.info.orgDisplayName.$set(this.info.orgDisplayName.length, data[i].text);
                    this.info.orgIDs.$set(this.info.orgIDs.length, data[i].organizeID);
                }
                // store.actions.setOrgDisplayName(data);
            },
            inputBlur() {
                this.info.employeeNumRuleDetail.forEach(item => {
                    if (!item.template || !item.type) {
                        this.$root.showTip({
                            type: 'danger',
                            msg: '请填写员工工号组成代码',
                            duration: 2000
                        });
                        this.flag = false;
                    } else {
                        var total = 0;

                        this.info.employeeNumRuleDetail.forEach(item => {
                            if (item.type == '2') {
                                total++;
                            }
                        })
                        if (total > 1) {
                            this.$root.showTip({
                                type: 'danger',
                                msg: '只能选择一个增量',
                                duration: 2000
                            });
                            this._flag = false;
                        } else if (total == 0) {
                            this.$root.showTip({
                                type: 'danger',
                                msg: '必须选择一个增量',
                                duration: 2000
                            });
                            this._flag = false;
                        } else {
                            this._flag = true;
                        }
                        if (item.type == '1') {
                            var reg = RegExp(/^[A-Za-z0-9]+$/);
                            if (!reg.test(item.template)) {
                                this.$root.showTip({
                                    type: 'danger',
                                    msg: '所选规则是固定，请输入数字或字母',
                                    duration: 2000
                                });
                                this.flag = false;
                            } else {
                                this.flag = true;
                            }
                        } else if (item.type == '2') {
                            var reg = RegExp(/^([0]|[0])*$/);
                            if (!reg.test(item.template) || item.template >= 1) {
                                console.log(item.template)
                                this.$root.showTip({
                                    type: 'danger',
                                    msg: '所选规则是增量，只能输入0',
                                    duration: 2000
                                });
                                this.__flag = false;
                            } else {
                                this.__flag = true
                            }
                        }
                        console.log(this.flag, this._flag, this.__flag)
                    }
                })
            }
        },
        events: {
            submitInfo() {
                var flag = false;
                var _flag = false;
                var __flag = false;
                var self = this;
                // if (this.numRuleRadio == 2) {
                //     this.info.employeeNumRuleDetail.forEach(item => {
                //         if (!item.template || !item.type) {
                //             this.$root.showTip({
                //                 type: 'danger',
                //                 msg: '请填写员工工号组成代码',
                //                 duration: 2000
                //             });
                //             flag = false;
                //         } else {
                //             var total = 0;

                //             this.info.employeeNumRuleDetail.forEach(item => {
                //                 if (item.type == '2') {
                //                     total++;
                //                 }
                //             })
                //             if (total > 1) {
                //                 this.$root.showTip({
                //                     type: 'danger',
                //                     msg: '只能选择一个增量',
                //                     duration: 2000
                //                 });
                //                 _flag = false;
                //             } else if (total == 0) {
                //                 this.$root.showTip({
                //                     type: 'danger',
                //                     msg: '必须选择一个增量',
                //                     duration: 2000
                //                 });
                //                 _flag = false;
                //             } else {
                //                 _flag = true;
                //             }
                //             if (item.type == '1') {
                //                 var reg = RegExp(/^[A-Za-z0-9]+$/);
                //                 if (!reg.test(item.template)) {
                //                     this.$root.showTip({
                //                         type: 'danger',
                //                         msg: '所选规则是固定，请输入数字或字母',
                //                         duration: 2000
                //                     });
                //                     flag = false;
                //                 } else {
                //                     flag = true;
                //                 }
                //             } else if (item.type == '2') {
                //                 var reg = RegExp(/^([0]|[0])*$/);
                //                 if (!reg.test(item.template) || item.template >= 1) {
                //                     console.log(item.template)
                //                     this.$root.showTip({
                //                         type: 'danger',
                //                         msg: '所选规则是增量，只能输入0',
                //                         duration: 2000
                //                     });
                //                     __flag = false;
                //                 } else {
                //                     __flag = true
                //                 }
                //             }
                //             console.log(flag, _flag, __flag)
                //         }
                //     })

                // } else {
                //     flag = true;
                //     _flag = true;
                //     __flag = true;
                // }
                if ((this.flag && this._flag) && this.__flag) {
                    console.log(this.flag, this._flag, this.__flag)
                    this.saveed = true;
                    this.submitb = true;
                    if (this.numRuleID) {
                        store.actions.updateEmployeeNumberRule(this.numRuleID, this.info, this.numRuleRadio, () => {
                            self.saveed = true;
                            self.deleteBtn = true;
                            self.submitb = false;
                            self.display = false;
                            store.actions.loadEmployeeNumberRuleList(() => {

                            });
                        });
                    } else {
                        store.actions.addEmployeeNumberRule(this.numRuleID, this.info, this.numRuleRadio, () => {
                            self.saveed = true;
                            self.deleteBtn = true;
                            self.submitb = false;
                            self.display = false;
                            store.actions.loadEmployeeNumberRuleList(() => {

                            });
                        });
                    }

                } else {
                    this.$root.showTip({
                        type: 'danger',
                        msg: '当前输入项有误请检查！',
                        duration: 2000
                    });
                }


            },
            loadRuleDetail() {
                var self = this;
                if (self.numRuleID) {
                    store.actions.loadEmployeeNumberRule(self.numRuleID, (data) => {
                        self.editState = false;
                        self.showBtn = true;
                        self.showEditBtn = true;
                        self.numRuleRadio = data.numberRule;
                        console.log(self.numRuleRadio, data.numberRule)
                        self.info.ruleName = data.ruleName;
                        self.info.employeeNumRuleDetail = [];
                        self.info.orgIDs = data.orgID.split(',');
                        self.info.state = data.state.split(',');
                        if (data.detailList.length >= 1) {
                            data.detailList.forEach(item => {
                                self.info.employeeNumRuleDetail.push({
                                    template: item.template,
                                    c: [{
                                        code: '1',
                                        name: '固定'
                                    }, {
                                        code: '2',
                                        name: '增量',
                                    }, {
                                        code: '3',
                                        name: '时间',
                                    }],
                                    type: item.type.toString(),
                                    reg: '',
                                })
                            });
                        } else {
                            self.info.employeeNumRuleDetail.push({
                                template: '',
                                c: [{
                                    code: '1',
                                    name: '固定'
                                }, {
                                    code: '2',
                                    name: '增量',
                                }, {
                                    code: '3',
                                    name: '时间',
                                }],
                                type: '1',
                                reg: '',
                            })
                        }
                        store.actions.loadOrgListTree(() => {
                            store.actions.checkedOrgComboTree(self.info.orgIDs);
                        });

                        // self.checkedOrgComboTree();
                    }, () => {
                        self.info.ruleName = '';
                        self.info.state = [];
                        self.info.orgIDs = [];
                        self.info.orgDisplayName = [];
                        self.info.org = [];
                        self.info.employeeNumRuleDetail = [{
                            template: '',
                            c: [{
                                code: '1',
                                name: '固定'
                            }, {
                                code: '2',
                                name: '增量',
                            }, {
                                code: '3',
                                name: '时间',
                            }],
                            type: '1',
                            reg: '',
                        }];
                    });
                    console.log(this.numRuleRadio)
                    console.log(self.numRuleRadio)
                }
            },
        },
        attached() { },
        ready() {
            var self = this;
            store.actions.loadOrgListTree();
            tool.ajax({
                url: 'api.Settings.getSystemConfigData',
                data: {
                    defintionCode: '120000',
                },
                success(data, res) {
                    data.forEach((item) => {
                        item.value = item.code;
                        item.name = item.codeName;
                    })
                    self.userTypes = data;
                },
                error(res) {
                    self.$root.showTip({
                        type: 'danger',
                        msg: res,
                        duration: 2000
                    });
                }
            });

        },
        props: {
            display: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: "add"
            },
            numRuleID: {
                type: String,
                default: ''
            },
            employeecallback: {
                type: Function,
                default: function () { }
            }
        }
    };
</script>
<style lang="css" scoped>
.block {
  border-bottom: 1px #ccc dashed;
  height: 12px;
  margin-bottom: 28px;
  text-align: center;
}

.block-content {
  display: inline-block;
  height: 30px;
  padding: 0px 10px;
  background-color: white;
  color: #ccc;
}

.must {
  color: red;
}

.photo-wrap {
  margin: 0 -15px;
}

.photo-wrap:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.photo-wrap-left {
  width: 50%;
  float: left;
  padding: 0 15px;
}

.photo-wrap-right {
  width: 50%;
  float: right;
  padding: 0 15px;
  height: 160px;
  text-align: center;
  line-height: 130px;
}

.img {
  border-radius: 50px;
  width: 100px;
  height: 100px;
  vertical-align: middle
}

.photo-wrap-attach {
  width: 50%;
  float: right;
  padding: 0 15px;
  height: 20px;
  text-align: center;
}

.selfDefined {
  border: 1px dashed #ccc;
  padding: 15px 5px;
  margin-bottom: 20px;
  position: relative;
}

.delete {
  position: absolute;
  right: -10px;
  top: -10px;
  display: inline-block;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  transition: all 0.2s ease;
  cursor: pointer;
  border-radius: 15px;
  opacity: 0.5!important;
}

.delete:hover {
  transform: rotate(90deg);
}

.choose-input {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  font-family: 'Microsoft YaHei', serif;
  width: 100%;
}

.choose-input > input {
  font-family: 'Microsoft YaHei', serif;
  color: #666;
  box-sizing: border-box;
  outline: none;
  padding: 0 30px 0 7px;
  font-size: 13px;
  width: 100%;
  cursor: pointer;
  background: #fff;
}

.choose-input > i {
  display: inline-block;
  position: absolute;
  width: 30px;
  height: 30px;
  font-size: 18px;
  top: 8px;
  right: 0;
  color: #999;
}

.btn {
  position: absolute;
  left: 50%;
  bottom: 0px;
  margin-left: -150px;
  width: 300px;
}

.showNumRuleGather {
  position: absolute;
  /*left: 0%;*/
  bottom: 60px;
  width: 100%;
}

.showNumRuleGather div {
  height: 150px;
  line-height: 150px;
  text-align: center;
  font-size: 20px;
  /*background: #f5f5f5;*/
  border: 1px solid #ccc;
  border-radius: 10px;
}

.ui-validator {
  height: 100%;
}

.addOrDelete {
  display: inline-block;
  border: 1px solid red;
  background: none;
  width: 20px;
  height: 20px;
  line-height: 17px;
  border-radius: 20px;
  text-align: center;
  text-decoration: none;
  margin-top: 8px;
  margin-left: 10px;
}
.nostyle input,.nostyle select{
  background: none !important;
    border: none !important;
    list-style: none !important;
    appearance: none !important;
    -webkit-appearance: none !important;
}
.control-label{
    font-weight: normal;
}
</style>