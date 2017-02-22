<template>
    <div class="paymentSubview">
        <div class="paymentStatus">
            <div class="_status">
                <ui-switch name="s1" :value.sync="switchState" checked>{{switchState? '启用中':'停用'}}
                </ui-switch>
                <!--<v-select :value.sync="selectedInput" :disabled="false">-->
                <!--<v-option value="1" name="开启">开启</v-option>-->
                <!--<v-option value="2" name="关闭">关闭</v-option>-->
                <!--</v-select>-->
            </div>
            <p class="_statusTip">状态开启表示在工资计算时直接使用下表的职级工资</p>
        </div>
        <ui-table v-ref:table height="auto" :loading="showLoading" class="paymentTable">
            <!-- 表头-正常列 -->
            <template slot="headerNormal">
                <table class="table table-bordered">
                    <colgroup>
                        <col width="200px">
                        <col width="200px">
                    </colgroup>
                    <thead>
                    <tr>
                        <th name="positionRank">职级</th>
                        <th name="positionRankPay">职级工资</th>
                    </tr>
                    </thead>
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
                    <tr v-for="rank in state.payRankList">
                        <td>{{rank.rankName}}</td>
                        <td>
                            <!--  <span style="display: block;width:100%;height: 40px;line-height: 40px;"
                                  v-if="showPayRankEditBool != $index"
                                  @dblclick="editPayRankInput($index)">{{rank.salary}}</span>
                            <input
                                    v-if="showPayRankEditBool == $index" type="number" min="0" v-model="rank.salary"> -->

                            <i @click="editPayRankInput($index)" class="ui-icon material-icons" handletype="edit" style="position: relative; top:6px; color: #999; cursor:pointer; ">mode_edit</i>
                            <span style="width:100%;line-height: 36px;padding:2px;" v-if="showPayRankEditBool != $index"
                                  @dblclick="editPayRankInput($index)">{{rank.salary}}</span>
                            <input style="position: relative; top:-2px;" v-if="showPayRankEditBool == $index" type="number" min="0" v-model="rank.salary">

                        </td>
                    </tr>

                    </tbody>
                </table>

            </template>

            <!-- 表格底部 -->
            <template slot="footer">
                <div class="ui-table-pager-content text-center">
                    <ui-button class="large" color="success" @click="savePayRank">保存</ui-button>
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
                showPayRankEditBool: -1,
            }
        },
        watch: {
            switchState(val){
                store.actions.changePayRankState(val);
            }
        },
//        events: {
//            saveRankPay(){
//                store.actions.saveRankPay(this.postPay);
//            }
//        },
        methods: {
            editPayRankInput(index){
                this.showPayRankEditBool = index;
            },
            savePayRank(){
                store.actions.savePayRank(()=>{
                    this.showPayRankEditBool = -2;
                });
            }
        },
        created(){
            var self = this;
            store.actions.loadPayRankState(function (data) {
                if (data[0]&&data[0].isOpen == 1) {
                    self.switchState = true;
                } else {
                    self.switchState = false;
                }
            });
        },
        ready(){
            store.actions.loadPayRank();
        }
    }
</script>
