<template>
    <!-- 模块主内容 -->
    <section class="ui-module-content pos-content demoShow">
        <div class="ui-module-row ">
            <div class="delegation">
                <div class="delegation-t">
                    <div class="delegation-time">
                        <p>过期日期：</p>
                        <div class="datepicker">
                            <!--<button class="before-day" @click="changeDayBtn(-1)"></button>-->
                            <!--<p>{{time}}</p>-->
                            <ui-datepicker format="yyyy/MM/dd" :time.sync="time"></ui-datepicker>
                            <!--<button class="after-day" @click="changeDayBtn(1)"></button>-->
                        </div>
                    </div>
                    <div class="procurator-wrap">
                        <div class="procurator">
                            <p>代理人：</p>
                            <div class="procurator-input">
                                <input type="text" value="包子" readonly="readonly">
                            </div>
                        </div>
                        <div class="procurator">
                            <p>代理人：</p>
                            <div class="procurator-input">
                                <input type="text" @click="showAddRoleModal" value="{{state.procurator.name}}">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="delegation-l">
                    <div class="select-role-tree">
                        <div class="sml-tit">
                            <p>选择角色</p>
                            <div class="border-line short"></div>
                        </div>
                        <ui-tree :data="state.systemTreeData" textprop="roleName" idprop="ID"></ui-tree>
                    </div>
                </div>
                <div class="delegation-l">
                    <div class="select-role-tree">
                        <div class="sml-tit">
                            <p>选择角色</p>
                            <div class="border-line short"></div>
                        </div>
                        <ui-tree :data="state.systemTreeData" textprop="roleName" idprop="ID"></ui-tree>
                    </div>
                </div>
            </div>
        </div>
        <!-- 新增人员弹窗 -->
        <ui-modal :show.sync="show.modal1" type="large" header="选择人员" body="">
            <div class="black-person">
                <div class="black-person-l">
                    <div class="search">
                        <div class="search-bar">
                            <input type="text" placeholder="搜索员工"/>
                        </div>
                    </div>
                    <div class="search-tree">
                        <ui-scrollview>
                            <ui-tree
                                    :data="state.systemTreeData"
                                    :checkable="true"
                                    textprop="roleName"
                                    idprop="ID"></ui-tree>
                        </ui-scrollview>
                    </div>
                </div>
                <div class="black-person-r">
                    <ui-scrollview>
                        <div class="check-field">
                            <ul>
                                <li v-for=" item in state.roleList ">
                                    <span @click="addRolePerson($index,item)">
                                         <i class="material-icons tree-checkbox {{item.checked?'':'uncheck'}}">check</i>
                                        <a href="javascipt:void(0)">{{item.name}}</a>
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div class="check-field">
                        </div>
                    </ui-scrollview>
                </div>
            </div>
            <div slot="footer" class="footer">
                <ui-button color="success" @click="addRolePersonBtn">确定</ui-button>
            </div>
        </ui-modal>
    </section>
</template>
<script type="text/javascript">
    import store from '../store';
    import Vue from 'vue';
    const Tool = Vue.tool;
    export default {
        data() {
            return {
                state: store.state,
                time: '2016-07-03',
                show: {
                    modal1: false
                }
            }
        },
        methods: {
            changeDayBtn(n) {
                let now = Tool.iDate(this.time);
                // 前一月
                if (now.d + n < 1) {
                    if (now.m == 1) {

                    }
                    var next = (now.y) + '-' + (now.m - 1) + '-' + now.lastDay;
                }
                // 后一月
                else if (now.d + n > now.lastDay) {
                    var next = (now.y) + '-' + ( now.m + 1) + '-01';
                }
                //
                else {
                    if (now.m < 10) {
                        now.m = ('0' + now.m);
                    }
                    var dd = '';
                    if (now.d < 9) {
                        dd = '0'
                    }
                    var next = now.y + '-' + (now.m) + '-' + ( dd + (now.d + n));
                }
                this.time = next;
                console.log(this.time);
            },
            showAddRoleModal() {
                this.show.modal1 = true;
                store.actions.loadRoleList();
            },
            addRolePerson(index, item) {
                store.actions.addForProcurator(index, item)
            },
            addRolePersonBtn() {
                this.show.modal1 = false;
            }
        },
        created() {
            store.actions.loadSystemTreeData();
        }
    };
</script>
<style type="text/css">
    .delegation {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
    }

    .delegation-t {
        height: 210px;
    }

    .procurator-wrap {
        width: 100%;
        height: 50px;
        margin-top: 50px;
    }

    .procurator {
        float: left;
        box-sizing: border-box;
        width: 50%;
        padding-left: 130px;
    }

    .procurator p {
        float: left;
        height: 35px;
        line-height: 35px;
        margin-right: 10px;
    }

    .procurator .procurator-input {
        float: left;
        box-sizing: border-box;
        width: 160px;
        height: 35px;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 0 8px;
    }

    .procurator .procurator-input input {
        width: 100%;
        height: 33px;
        border: none;
    }

    .procurator .procurator-input input:focus {
        outline: none;
    }

    .delegation-time {
        padding: 24px 0 0 37px;
    }

    .delegation-time p {
        float: left;
        height: 30px;
        line-height: 30px;
        margin-right: 20px;
    }

    .delegation-l {
        float: left;
        width: 50%;
        min-height: 680px;
        box-sizing: border-box;
        border-right: 1px #ccc dashed;
        padding: 0 120px;
    }

    .delegation-l:last-child {
        border: none;
    }

    .select-role-tree .sml-tit {
        overflow: hidden;
        margin-bottom: 30px;
    }

    .select-role-tree .sml-tit p {
        float: left;
        margin: 10px;
        color: #999;
    }

    .select-role-tree .sml-tit .short {
        width: 150px !important;
    }

    .before-day,
    .after-day {
        display: inline-block;
        width: 30px;
        height: 30px;
        border: none;
        vertical-align: middle;
        padding: 0;
        font-size: 0;
    }

    .before-day {
        background: url(../../../assets/images/before-day-btn.png);
    }

    .after-day {
        background: url(../../../assets/images/after-day-btn.png);
    }

    .mz-datepicker {
        height: 30px;
        font-size: 0;
    }

    .mz-datepicker .form-control {
        height: 30px;
    }

    .mz-datepicker .material-icons {
        display: none;
    }
</style>
