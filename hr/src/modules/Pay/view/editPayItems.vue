<template>
<div class="editPayItems">
    <!-- 添加，修改 -->
    <template v-if="ctrltype=='add' || ctrltype=='update'">
        <ui-validator @successed="toUpdatePayItems">
        <div validator="form" class="form-horizontal container-fluid" vali-submit="editPayItemsBtn" >
            <div class="form-body">
                <div class="row">
                    <div class="col-sm-24">
                        <div class="form-group row">
                            <label class="col-sm-7 control-label"><span style="color:red">*</span>工资项目名称</label>
                            <div class="col-sm-17">
                                <div class="input-inline input-medium">
                                    <input type="text" class="form-control" placeholder="工资项目名称" v-model="payItemInfo.itemName" vali="required" vali-msg="必填项">
                                </div>
                                <!-- <span class="help-block">必填项</span> -->
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-24">
                        <div class="form-group row">
                            <label class="col-sm-7 control-label"><span style="color:red">*</span>数值类型</label>
                            <div class="col-sm-17">
                                <div class="input-inline input-medium">
                                    <select v-model="payItemInfo.valueType" class="form-control"  vali="required" vali-msg="必填项">
                                      <option value="">请选择</option>
                                      <template v-for="item in state.commonData.payItemDataType">
                                        <option value="{{item.code}}" :selected="item.code==payItemInfo.valueType">{{item.codeName}}</option>
                                      </template>
                                    </select>
                                </div>
                                <!-- <span class="help-block">必填项</span> -->
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-24">
                        <div class="form-group row">
                            <label class="col-sm-7 control-label">所属类别</label>
                            <div class="col-sm-17">
                                <div class="input-inline input-medium">
                                    <select v-model="payItemInfo.category" class="form-control">
                                      <option value="">请选择</option>
                                      <template v-for="item in state.commonData.payItemTypes">
                                        <option value="{{item.code}}" :selected="item.code==payItemInfo.category">{{item.codeName}}</option>
                                      </template>
                                    </select>
                                </div>
                                <!-- <span class="help-block">必填项</span> -->
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-24">
                        <div class="form-group row">
                            <label class="col-sm-7 control-label">备注</label>
                            <div class="col-sm-17">
                                <div class="input-inline input-medium">
                                    <input type="text" class="form-control" placeholder="备注" v-model="payItemInfo.des">
                                </div>
                                <!-- <span class="help-block">必填项</span> -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <div class="row">
                        <div class="text-center">
                            <ui-button id="editPayItemsBtn" color="accent">提交</ui-button>
                            <ui-button color="default" @click="$emit('close')">取消</ui-button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </ui-validator>
    </template>
    <!-- 删除 -->
    <template v-if="ctrltype=='delete'">
        <div class="deleteTip text-center">您确定要删除当前工资项目吗？</div>
        <div class="text-center">
            <ui-button id="submitBtn" color="accent" @click="toDeletePayItems">删除</ui-button>
            <ui-button color="default" @click="$emit('close')">取消</ui-button>
        </div>
    </template>
    <!-- 导入 -->
    <template v-if="ctrltype=='import'">
        <ui-simpleupload
            url="api.Pay.paySeriesImport"
            fileparam="file"
            uploading-msg="导入进度"
            :params="{imptype:'item'}"
            :complete="importPayItems"
            filetype="xls,xlsx"
            >
        </ui-simpleupload>
        <div class="text-center">
            <ui-button v-if="uploaded" color="success" @click="$emit('close')">确定</ui-button>
        </div>
    </template>
</div>
</template>
<script>
import store from '../store'
export default {
    data(){
        return {
            state:store.state,
            payItemInfo:{
                ID:'',
                itemName:'',
                category:'',
                valueType:'',
                des:'',
            },
            uploaded:false,
        }
    },
    props:{
        ctrltype:{
            type:String
        }
    },
    attached(){
        this.initModal();
    },

    methods:{

        initModal(){
            console.log(this.ctrltype)

            if(this.ctrltype=='add'){
                for(let key in this.state.payItemInfo){
                    this.payItemInfo[key] = '';
                }
            }
            // 更新信息
            else if(this.ctrltype=='update'){
                for(let key in this.state.payItemInfo){
                    this.payItemInfo[key] = this.state.payItemInfo[key];
                }
                // Object.assign(this.payItemInfo,this.state.payItemInfo)
            }

        },

        /* 添加，修改工资套 */
        toUpdatePayItems(){

            let data = {}

            for(let key in this.payItemInfo){
                data[key] = this.payItemInfo[key];
            }


            if(this.ctrltype=='add'){
                store.actions.addPayItems(data,()=>{
                    this.$emit('close');
                    this.$emit('callback','add',true)
                })
            }
            else if(this.ctrltype=='update'){
                store.actions.updatePayItems(data,()=>{

                    this.$emit('close');
                    this.$emit('callback','update',true)

                })
            }

        },
        // 删除工资套
        toDeletePayItems(){
            store.actions.deletePayItems(()=>{

                this.$emit('close');
                this.$emit('callback','delete',true)

            })
        },
        // 导入工资套
        importPayItems(){
            this.uploaded = true;
        },
        // 导出工资套
        exportPayItems(){

        },


    }

}
</script>
<style lang="scss">
.editPayItems {
    .deleteTip{
        padding: 10px 0 30px;
    }
    .form-actions{
        padding-top: 30px;
    }
    ._tipMsg{
        padding: 10px 0 30px;
        font-size: 14px;
    }
    ._copyTip{
        color: #fd6551;
        text-indent: 20px;
        padding-top: 10px;
    }
    .form-actions{
        padding-top: 30px;
    }
}
</style>
