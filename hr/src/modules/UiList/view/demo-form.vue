<template>

            <div class="ui-panel ">

                <div class="ui-panel-title">表单</div>
                <div class="ui-panel-content">
                    <div class="api"><a href="http://vuejs.github.io/vue-validator/zh-cn/installation.html" target="_blank">表单验证使用说明</a></div>

                    <div style="max-width: 800px; margin: 0 auto;" >

                    <validator name="validation1">

                    <form class="form-horizontal container-fluid" role="form">
                        <div class="form-body">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group row" :class="{'has-success':$validation1.username.required,'has-error':!$validation1.username.required}">
                                        <label class="col-sm-6 control-label">姓名</label>
                                        <div class="col-sm-18">
                                            <input type="text" class="form-control" placeholder="您的姓名" v-validate:username="['required']">
                                            <span class="help-block">必填项，请认真填写</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-12">
                                    <div class="form-group has-warning row">
                                        <label class="col-sm-6 control-label">年龄</label>
                                        <div class="col-sm-18">
                                            <input type="text" class="form-control input-inline input-medium" placeholder="您的年龄">
                                            <span class="help-block">必填项</span>
                                        </div>
                                    </div>                                      
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group has-error row">
                                        <label class="col-sm-6 control-label">邮件</label>
                                        <div class="col-sm-18">
                                            <div class="input-inline input-medium">
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                        <i class="material-icons">account_circle</i>
                                                    </span>
                                                    <input type="email" class="form-control" placeholder="Email Address"> 
                                                </div>
                                            </div>
                                            <span class="help-block">必填项</span>
                                        </div>
                                    </div>                                     
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-3 control-label">手机号</label>
                                <div class="col-sm-21">
                                    <input type="text" class="form-control" placeholder="手机号">
                                    <span class="help-block">必填项，请认真填写</span>
                                </div>
                            </div>  

                            <div class="form-group row">
                                <label class="col-sm-3 control-label">验证码</label>
                                <div class="col-sm-21">
                                    <div class="input-group">
                                        <input id="newpassword" class="form-control" type="text" name="password" placeholder="验证码"> 
                                        <span class="input-group-btn">
                                            <button id="genpassword" class="btn btn-success" type="button">发送</button>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-3 control-label">性别</label>
                                <div class="col-sm-21">
                                    <div class="radio-group">
                                        <ui-radio name="sex" value="1" :model.sync="sex" label="男" checked></ui-radio>
                                        <ui-radio name="sex" value="2" :model.sync="sex" label="女" checked></ui-radio>
                                        <ui-radio name="sex" value="3" :model.sync="sex" label="其他" checked></ui-radio>
                                    </div>
                                    <span class="help-block">必填项</span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-3 control-label">技能</label>
                                <div class="col-sm-21">
                                    <div class="radio-group">
                                        <ui-checkbox :value.sync="area[0]" checked>朝阳</ui-checkbox>
                                        <ui-checkbox :value.sync="area[1]">丰台</ui-checkbox>
                                        <ui-checkbox :value.sync="area[2]" disabled>西城</ui-checkbox>
                                    </div>
                                    <span class="help-block">必填项</span>
                                </div>
                            </div>


                            <div class="form-group row">
                                <label class="col-sm-3 control-label">简介</label>
                                <div class="col-sm-21">
                                    <textarea class="form-control" rows="3"></textarea>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-3 control-label">下拉框</label>
                                <div class="col-sm-21">
                                    <v-select :value.sync="selected1" :multiple="true" :fluid="true">
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
                                    <ui-button color="accent">提交</ui-button>
                                    <ui-button color="default" @click="$resetValidation()">取消</ui-button>
                                </div>
                            </div>
                        </div>
                    </form>

                    </validator>
                    </div>

                </div>
                
            </div>
</template>
<script type="text/javascript">
export default{
    data(){
        return {
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


}
</script>