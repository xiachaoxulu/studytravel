<template>
    <div class="paymentSubview">
        <div class="paymentStatus">
            <div class="_status">
                <ui-switch name="s1" :value.sync="switchState" checked>{{switchState? '启用中':'停用'}}</ui-switch>
            </div>
            <p class="_statusTip">状态开启表示在工资计算时直接使用下表的岗位工资</p>
        </div>
        <ui-table v-ref:table height="auto" :loading="showLoading" class="paymentTable">
            <template slot="headerLockedFirst">
                <table class="table table-bordered">
                    <colgroup>
                        <col width="200px"/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>职位</th>
                    </tr>
                    </thead>
                </table>
            </template>

            <!-- 表头-正常列 -->
            <template slot="headerNormal">
                <table class="table table-bordered">
                    <colgroup>
                        <col width="200px">
                        <col width="200px">
                    </colgroup>
                    <thead>
                    <tr>
                        <th name="positionRank">岗位</th>
                        <th name="positionRankPay">岗位工资</th>
                    </tr>
                    </thead>
                </table>
            </template>

            <template slot="bodyLockedFirst">
                <table class="table table-bordered">
                    <colgroup>
                        <col width="200px"/>
                    </colgroup>
                    <tbody>
                    <template v-for="position in state.payPostMap">
                        <tr>
                            <td rowspan="{{position.length+1}}" align="center" class="col-title">{{position[0].positionName}}</td>
                        </tr>

                          <tr v-for="idx in position.length">
                            <td></td>
                          </tr>

                    </template>
                    </tbody>
                </table>
            </template>

            <!-- 内容-正常列 -->
            <template slot="bodyNormal">

                <table class="table table-bordered">
                    <colgroup>
                        <col width="200px">
                        <col width="200px">
                    </colgroup>
                    <tbody>
                        <template v-for="position in state.payPostMap">

                            <tr  v-for="post in position">
                                <td>{{post.postName}}</td>
                                <td>

                                    <i @click="editPayPostInput(($parent.$index)+''+$index-0)" class="ui-icon material-icons" handletype="edit" style="position: relative; top:6px; color: #999; cursor:pointer; ">mode_edit</i>
                                    <span style="width:100%;line-height: 36px;padding:2px;" v-if="showPayPostEditBool != ($parent.$index)+''+$index-0"
                                          @dblclick="editPayPostInput(($parent.$index)+''+$index-0)">{{post.salary}}</span>
                                    <input style="position: relative; top:-2px;" v-if="showPayPostEditBool == ($parent.$index)+''+$index-0" type="number" min="0" v-model="post.salary">
                                </td>
                            </tr>

                        </template>


                    </tbody>
                </table>

            </template>

            <!-- 表格底部 -->
            <template slot="footer">
                <div class="ui-table-pager-content text-center">
                    <ui-button class="large" color="success" @click="savePayPost">保存</ui-button>
                </div>
            </template>

        </ui-table>
    </div>
</template>
<script>
    import store from '../store'
    export default{
        data(){
            return {
                state: store.state,
                switchState: true,
                showPayPostEditBool: -1,
            }
        },
        watch: {
            switchState(val){
                store.actions.changePayPostState(val);
            }
        },
//        events:{
//            saveRankPay(){
//                store.actions.saveRankPay();
//            }
//        },
        methods: {
            editPayPostInput(index){
                this.showPayPostEditBool = index;
            },
            savePayPost(){
                store.actions.savePayPost(()=>{
                    this.showPayPostEditBool = -2;
                });
            }
        },
        created(){
            var self = this;
            store.actions.loadPayPostState(function (data) {
                if (data[0]&&data[0].isOpen == 1) {
                    self.switchState = true;
                } else {
                    self.switchState = false;
                }
            });
        },
        ready(){
            store.actions.loadPayPost(()=>{
                this.$refs.table.refresh();
            })
        }
    }
</script>
