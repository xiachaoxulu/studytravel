<template>
<div class="ui-panel">

    <div class="ui-panel-title">表单验证</div>
    <div class="ui-panel-content">

        <table class="table table-bordered">
            <tr>
                <td>元素</td>
                <td>说明</td>
            </tr>
            <tr>
                <td>form</td>
                <td>
                    <p><strong>ui-validator 内表单元素必须用form元素包裹，</strong></p>
                    <p>form 可设置属性</p>
                    <p><code>vali-submit="submitBt|submitedCall"</code></p>
                    <p><code>vali-reset="resetBt|resetedCall"</code></p>
                    <p>用 | 分割， </p>
                    <p>vali-submit ：|前为提交按钮id，<strong>|后为验证通过后 提交的回调事件，此事件需要在 events中定义，可为空</strong></p>
                    <p>vali-reset  ：|后为取消或重置按钮id，<strong>|后为重置的回调事件，此事件需要在 events中定义，可为空</strong></p>

                </td>
            </tr>
            <tr>
                <td>vali="required|maxNum:5"</td>
                <td>
                    <p>验证表达式，作为属性添加到验证元素上，<strong>多个表达式用 | 分割</strong></p>

                    <p>支持：input/textarea/ui-checkbox/ui-radio/ui-select/ui-upload</p>

                    <p>对一组元素进行验证时，根据元素的name来进行判断分组，<strong style="color: red;">同name的元素，只能在第一个元素上添加表达式</strong></p>

                    <table class="table table-bordered">
                        <tr>
                            <td>表达式</td>
                            <td>说明</td>
                        </tr>
                        <tr>
                            <td>required</td>
                            <td>必填。作为一组元素验证时只需有一个填写，则验证通过</td>
                        </tr>
                        <tr>
                            <td>maxNum:5</td>
                            <td>数值最大值</td>
                        </tr>
                        <tr>
                            <td>minNum:1</td>
                            <td>数值最小值</td>
                        </tr>
                        <tr>
                            <td>maxStr:100</td>
                            <td>字符串最大长度</td>
                        </tr>
                        <tr>
                            <td>minStr:1</td>
                            <td>字符串最小长度</td>
                        </tr>
                        <tr>
                            <td>float:n</td>
                            <td>最大允许n位小数</td>
                        </tr>
                        <tr>
                            <td>floatStep:.5</td>
                            <td>floatStep的倍数 1.5, 2 , 2.5</td>
                        </tr>
                        <tr>
                            <td>format:email</td>
                            <td>
                                <p>格式判断，可判断以下格式：</p>
                                <p>email(邮箱) ，</p>
                                <p>phone(固定电话)，</p>
                                <p>mobile(手机)，</p>
                                <p>id(身份证)，</p>
                                <p>en(英文)，</p>
                                <p>cn(中文)，</p>
                                <p>time[hh:mm:ss](时间格式)，</p>
                                <p>date[yy-mm-dd](日期格式，支持yy-mm-dd , yy/mm/dd , yy.mm.dd , yymmdd)</p>
                            </td>
                        </tr>
                        <tr>
                            <td>multi:3-5</td>
                            <td>多选，最少3个，最多5个</td>
                        </tr>
                        <tr>
                            <td>refresh()方法  添加ref  直接可以调用</td>
                            <td>该方法是用来解决 表单input元素 动态修改时,validator产生的bug</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>

                </td>
            </tr>
            <tr>
                <td>vali-msg="必填项，请认真填写||格式错误"</td>
                <td>提示文字，|| 分割，||前 为focus提示， ||后为验证失败提示，提示和失败提示相同时，则不需要||</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
            </tr>
        </table>

        <ui-validator>
            <div style="margin: 50px auto 0; width: 700px; border: 1px solid #ddd; border-radius: 10px;padding: 30px;">
            <form class="form-horizontal container-fluid" vali-submit="submitBt|submitedCall" vali-reset="resetBt|resetedCall">
                <div class="form-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group row">
                                <label class="col-sm-6 control-label">姓名</label>
                                <div class="col-sm-18">
                                    <input type="text" class="form-control" placeholder="您的姓名" vali="required" vali-msg="必填项，请认真填写">
                                    <!-- <span class="help-block">必填项，请认真填写</span> -->
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group row">
                                <label class="col-sm-6 control-label">年龄</label>
                                <div class="col-sm-18">
                                    <input type="text" class="form-control input-inline input-medium" placeholder="您的年龄" vali="required|maxNum:120|minNum:10" vali-msg="必填项，10-120岁之间？">
                                    <!-- <span class="help-block">必填项</span> -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group row">
                                <label class="col-sm-6 control-label">邮件</label>
                                <div class="col-sm-18">
                                    <input type="text" class="form-control" placeholder="Email Address" vali="required|format:email" vali-msg="必填项||email格式错误">
                                    <!-- <span class="help-block">必填项</span> -->
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3 control-label">手机号</label>
                        <div class="col-sm-21">
                            <input type="text" class="form-control" placeholder="手机号" vali="required|format:mobile" vali-msg="必填项||手机号错误">
                            <!-- <span class="help-block">必填项，请认真填写</span> -->
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3 control-label">组验证</label>
                        <div class="col-sm-21">
                            <div class="radio-group">
                                <input type="checkbox" name="t1" vali="checkbox|required"  vali-msg="必填项||验证失败">选项1</input>
                                <input type="checkbox" name="t1" >选项2</input>
                                <input type="checkbox" name="t1" >选项3</input>
                                <input type="checkbox" name="t1" >选项4</input>
                                <input type="checkbox" name="t1" >选项5</input>
                            </div>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3 control-label">性别{{sex}}</label>
                        <div class="col-sm-21">
                            <div class="radio-group">
                                <ui-radio name="sex" value="1" :model.sync="sex" vali="radio|required" vali-msg="必填项||验证失败" label="男" ></ui-radio>
                                <ui-radio name="sex" value="2" :model.sync="sex" label="女" ></ui-radio>
                                <ui-radio name="sex" value="3" :model.sync="sex" label="其他" disabled></ui-radio>
                                <!-- <span class="help-block">必填项</span> -->
                            </div>

                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 control-label">技能</label>
                        <div class="col-sm-21">
                            <div class="radio-group">
                                <ui-checkbox name="cc" :value.sync="area[0]" checked vali="checkbox|required" vali-msg="必填项||验证失败">朝阳</ui-checkbox>
                                <ui-checkbox name="cc" :value.sync="area[1]">丰台</ui-checkbox>
                                <ui-checkbox name="cc" :value.sync="area[2]" disabled>西城</ui-checkbox>
                                <!-- <span class="help-block">必填项</span> -->
                            </div>

                        </div>
                    </div>


                    <div class="form-group row">
                        <label class="col-sm-3 control-label">简介</label>
                        <div class="col-sm-21">
                            <textarea class="form-control" rows="3" vali="required|maxStr:100|minStr:10" vali-msg="请输入10-100字"></textarea>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 control-label">下拉框</label>
                        <div class="col-sm-21">
                            <v-select :value.sync="selected1" :multiple="true" :fluid="true" vali="required" vali-msg="必选,最多3项">
                                <v-option value="1" name="Apple" >Apple</v-option>
                                <v-option value="2" name="Banana" >Banana</v-option>
                                <v-option value="3" name="Cherry" >Cherry</v-option>
                                <v-option value="4" name="Orange" >Orange</v-option>
                                <v-option value="5" name="Grape" >Grape</v-option>
                            </v-select>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <div class="row">
                        <div class="text-center">
                            <ui-button id="submitBt" color="accent">提交</ui-button>
                            <ui-button id="resetBt" color="default">取消</ui-button>
                        </div>
                    </div>
                </div>
            </form>

            </div>

        </ui-validator>
    </div>
</div>



</template>

<script>
export default {
    events:{
        submitedCall(){
            alert('提交')
            console.log('sex='+this.sex,'area='+this.area)
        },
        resetedCall(){
            console.warn('sex='+this.sex,'area='+this.area)
        }
    },
    data(){
        return {
            show1:false,
            show2:false,
            show3:false,
            /* select */
            sex:'',
            area:[],
            optionList:[
              {value:'1', name:'门店1'},
              {value:'2', name:'门店2'},
              {value:'3', name:'门店3'},
              {value:'4', name:'门店4'},
              {value:'5', name:'门店5'},
              {value:'6', name:'门店6'},
              {value:'7', name:'门店7'},
              {value:'8', name:'门店8'},
              {value:'9', name:'门店9'},
              {value:'10', name:'门店10'},
              {value:'11', name:'门店11'},
              {value:'12', name:'门店12'},
              {value:'13', name:'门店13'},
              {value:'14', name:'门店14'},
              {value:'15', name:'门店15'},
            ],

            selected1:[],
            selected2:[],

        }
    },
    methods:{},
    attached(){
        // 组件插入dom时进行授权检测
        this.$root.checkAuthority(this.$el);
    }
}
</script>
