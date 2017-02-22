<!--
* @Created Date       : 2016-09-08T11:20:18+08:00
* @Last Modified time : 2016-12-27T14:41:47+08:00
 -->


<template>
    <!-- 模块主内容 -->
    <section class="ui-module-content pos-content">
        <div class="ui-module-row">
            <!--  -->
            <div class="com-col-m1-left ui-panel">
                <ui-scrollview>
                    <ui-tree :data="state.systemTreeData" textprop="roleName" idprop="ID" :menulist.sync="menuList"
                             :menuitemclicked="menuItemClicked"
                             :nodeclicked="nodeClicked" menuplacement="dropdown-dropleft"
                             :beforemenushown="beforeMenuShown"
                             :root="state.systemTreeData">
                    </ui-tree>
                </ui-scrollview>
            </div>
            <div class="com-col-m1-middle ui-panel">
                <!-- 中间菜单管理 -->
                <div class="menu-manage-nav">
                    <div class="btn-group btn-group-circle pull-left" role="group">
                        <button type="button" class="btn"
                                :class="{'btn-primary':state.tabCurIdx==0, 'btn-default': state.tabCurIdx!= 0}"
                                @click="tabFn(0)"
                                __code="permission-role-manage-fn/功能权限">功能权限
                        </button>
                        <button type="button" class="btn"
                                :class="{'btn-primary':state.tabCurIdx==1, 'btn-default': state.tabCurIdx!= 1}"
                                @click="tabFn(1)"
                                __code="permission-role-manage-personnel/人员权限">人员权限
                        </button>
                        <!--<button type="button" class="btn btn-default" @click="tabFn(2)">字段权限</button>-->
                        <button type="button" class="btn"
                                :class="{'btn-primary':state.tabCurIdx==2, 'btn-default': state.tabCurIdx!= 2}"
                                @click="tabFn(2)"
                                __code="permission-role-manage-grade/分级授权">分级授权
                        </button>
                        <!-- <button type="button" class="btn"
                                :class="{'btn-primary':state.tabCurIdx==3, 'btn-default': state.tabCurIdx!= 3}"
                                @click="tabFn(3)"
                                __coxxde="permission-roleMage-btn/按钮权限">按钮权限
                        </button> -->
                        <button type="button" class="btn"
                                :class="{'btn-primary':state.tabCurIdx==3, 'btn-default': state.tabCurIdx!= 3}"
                                @click="tabFn(3)"
                                __code="permission-role-manage-card/卡片权限"
                        >卡片权限
                        </button>
                        <button type="button" class="btn"
                                :class="{'btn-primary':state.tabCurIdx==4, 'btn-default': state.tabCurIdx!= 4}"
                                @click="tabFn(4)"
                                _1_code="permission-role-manage-paysuite/工资套"
                        >工资套
                        </button>
                        <button type="button" class="btn"
                                :class="{'btn-primary':state.tabCurIdx==5, 'btn-default': state.tabCurIdx!= 5}"
                                @click="tabFn(5)"

                        >字段权限
                        </button>
                        <!-- __code="permission-role-manage-field/字段权限" -->
                    </div>
                </div>
                <!-- 功能权限，人员权限，字段权限，分级授权 卡片权限-->
                <div class="tab-content">
                    <!-- 功能权限 -->
                    <div class="fn-accredit"
                         v-if="state.tabCurIdx == 0 && $root.checkAuthorityByID('permission-role-manage-fn')">
                        <!--<div class="cur-role">-->
                        <!--<p></p>-->
                        <!--</div>-->
                        <!--<div class="border-line"></div>-->
                        <div class="sml-tit">
                            <p style="margin:0px;">{{state.showSystemRoleItemName}}管理员</p>
                            <div class="border-line short"></div>
                        </div>
                        <div class="menu-tree">
                            <ui-scrollview :show="state.tabCurIdx == 0">
                                <ui-tree :data="state.funTreeData" :checkable="true" textprop="name"
                                         idprop="ID"
                                         :root="state.funTreeData"
                                         :rootvisible="false"
                                         :ancestorcheck="true"
                                         :multiple="true" :checkstrict="false"
                                         :nodeclicked="menuTreeClicked"></ui-tree>
                            </ui-scrollview>
                        </div>
                    </div>
                    <!-- 人员权限 -->
                    <div class="person-accredit"
                         v-if="state.tabCurIdx == 1 && $root.checkAuthorityByID('permission-role-manage-personnel')">
                        <div class="sml-tit">
                            <p  style="margin:0px;">按员工状态</p>
                            <div class="border-line short"></div>
                        </div>
                        <div class="check-field">
                            <h3 style="font-size:14px;font-weight:normal;" @click="toggleFieldBar"><a
                                    href="javascript:void(0)" class="material-icons">{{showFieldBar?'keyboard_arrow_down':'keyboard_arrow_right'}}</a>员工状态
                            </h3>
                            <div class="employment-type-wrap">
                                <ui-scrollview>
                                    <ui-checkboxgroup :style="showFieldBar | isShow" :list="state.employmentType"
                                                      id="ID" name="codeName"
                                                      :value.sync="state.employmentTypeChecked"></ui-checkboxgroup>
                                    <!--<ul >-->
                                    <!--<li v-for=" text in state.employmentType ">-->
                                    <!--&lt;!&ndash;<ui-checkbox :value.sync="area[0]" checked>朝阳</ui-checkbox>&ndash;&gt;-->
                                    <!--<span @click="checkEmploymentType($index,text)">-->
                                    <!--<i class="material-icons tree-checkbox {{text.checked?'':'uncheck'}}">check</i>-->
                                    <!--<a href="javascipt:void(0)">{{text.codeName}}</a>-->
                                    <!--</span>-->
                                    <!--</li>-->
                                    <!--</ul>-->
                                </ui-scrollview>
                            </div>
                        </div>
                        <div class="sml-tit">
                            <p  style="margin:0px;">按组织架构</p>
                            <div class="border-line short"></div>
                        </div>
                        <div class="organization-chart">
                            <ui-scrollview :show="state.tabCurIdx == 1">
                                <ui-tree :data="state.orgChartTree" :checkable="true"
                                         :nodeclicked="OrgChartTreeClicked"
                                         :root="state.orgChartTree"
                                         :multiple="true"
                                         :rootvisible="false" :checkstrict="false"></ui-tree>
                            </ui-scrollview>
                        </div>
                        <!--<div class="sml-tit">-->
                        <!--<p>屏蔽人员</p>-->
                        <!--<div class="border-line short"></div>-->
                        <!--</div>-->
                        <!--<div class="black-list check-field">-->
                        <!--<ul>-->
                        <!--<li v-for=" text in state.employmentType ">-->
                        <!--<i @click="cascadeCheck($index,text)"-->
                        <!--class="material-icons tree-checkbox {{text.checked?'':'uncheck'}}">check</i>-->
                        <!--<a href="javascipt:void(0)">{{text.text}}</a>-->
                        <!--</li>-->
                        <!--</ul>-->
                        <!--</div>-->
                    </div>
                    <!-- 字段权限 -->
                    <!--<div class="field-accredit" :class=" tabCurIdx == 2 ? 'display-block':'display-none' ">-->
                    <!--<div class="cur-role">-->
                    <!--<p>鸟巢店管理员</p>-->
                    <!--</div>-->
                    <!--<div class="border-line"></div>-->
                    <!--<div class="menu-tree">-->
                    <!--<ui-tree :data="state.treeData3" :checkable="true"></ui-tree>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!-- 分级授权 -->
                    <div class="level-accredit"
                         v-if="state.tabCurIdx == 2 && $root.checkAuthorityByID('permission-role-manage-grade')">
                        <!--<div class="cur-role">-->
                        <!--<p>{{state.showSystemRoleItemName}}管理员</p>-->
                        <!--</div>-->
                        <!--<div class="border-line"></div>-->
                        <div class="sml-tit">
                            <p  style="margin:0px;">{{state.showSystemRoleItemName}}管理员</p>
                            <div class="border-line short"></div>
                        </div>
                        <div class="menu-tree">
                            <ui-scrollview :show="state.tabCurIdx == 2">
                            <ui-tree :data="state.systemAccreditTreeData" :checkable="true"
                                     textprop="roleName"
                                     :root="state.systemAccreditTreeData"
                                     :rootvisible="false"
                                     :multiple="true" :checkstrict="false"
                                     :nodeclicked="accreditTreeClicked"></ui-tree>
                            </ui-scrollview>
                        </div>
                    </div>
                    <!-- 按钮权限  -->
                    <!-- <div class="fn-accredit"
                         v-if="state.tabCurIdx == 3 && $root.checkAuthorityByID('permission-roleMage-btn')">
                        <div class="sml-tit">
                            <p>按钮权限</p>
                            <div class="border-line short"></div>
                        </div>
                        <div class="menu-btn-tree">
                            <ui-scrollview :show="state.tabCurIdx == 3">
                                <ui-tree :data="state.menuBtnTree" :checkable="true" :multiple="true"
                                         :root="state.menuBtnTree"
                                         :rootvisible="false" :checkstrict="false"></ui-tree>
                            </ui-scrollview>
                        </div>
                    </div> -->
                    <!-- 卡片权限  -->
                    <div class="fn-accredit"
                         v-if="state.tabCurIdx == 3 && $root.checkAuthorityByID('permission-role-manage-card')">
                        <!--<div class="cur-role">-->
                        <!--<p></p>-->
                        <!--</div>-->
                        <!--<div class="border-line"></div>-->
                        <div class="sml-tit">
                            <p  style="margin:0px;">卡片权限</p>
                            <div class="border-line short"></div>
                        </div>
                        <div class="menu-btn-tree">
                            <ui-scrollview :show="state.tabCurIdx == 3">
                                <ui-tree :data="state.cardTree" :checkable="true" :multiple="true"
                                         :root="state.cardTree"
                                         textprop="alias"
                                         :rootvisible="false" :checkstrict="false"
                                         :nodeclicked="cardTreeClicked"></ui-tree>
                            </ui-scrollview>
                        </div>
                    </div>

                    <!-- 工资套权限 -->
                    <div class="fn-accredit"
                         v-if="state.tabCurIdx == 4">
                        <!--<div class="cur-role">-->
                        <!--<p></p>-->
                        <!--</div>-->
                        <!--<div class="border-line"></div>-->
                        <div class="sml-tit">
                            <p  style="margin:0px;">工资套权限</p>
                            <div class="border-line short"></div>
                        </div>
                        <div class="menu-btn-tree">
                            <ui-scrollview :show="state.tabCurIdx == 4">
                                <ui-tree :data="state.paySuiteTree" :checkable="true" :multiple="true"
                                         :root="state.paySuiteTree"
                                         textprop="suiteName"
                                         :rootvisible="false" :checkstrict="false"
                                         :nodeclicked="paySuiteTreeClicked"></ui-tree>
                            </ui-scrollview>
                        </div>
                    </div>
                    <!-- 字段权限 -->
                    <div class="fn-accredit"
                         v-if="state.tabCurIdx == 5">
                        <div class="sml-tit">
                            <p  style="margin:0px;">字段权限</p>
                            <div class="border-line short"></div>
                        </div>
                        <div class="menu-btn-tree">
                            <ui-scrollview :show="state.tabCurIdx == 5">

                                <ui-tree :data="state.fieldTree" :checkable="true" :multiple="true"
                                         :root="state.fieldTree" idprop="ID"
                                         :rootvisible="false" :checkstrict="false"

                                         :ancestorcheck="true"
                                         :nodeclicked="fieldTreeClicked"></ui-tree>
                            </ui-scrollview>
                        </div>
                        <!--<h5 class="point">*注：绿色字段表示可修改，红色字段表示只可查看不能修改</h5>-->
                    </div>
                </div>
            </div>
            <div class="com-col-m1-right ui-panel">
                <div class="ui-module-aside-top">
                    <div class="attr-or-edit">
                        <p __code="permission-role-manage-userEdit/编辑角色人员">
                            <button @click="goEdit" :class="isShowItem?'display-block':'display-none' "></button>
                        </p>
                        <h3>属性</h3>
                    </div>
                    <div class="attr-msg">
                        <ul>
                            <li><span>角色名称</span><b>{{state.showSystemRoleItemName?state.showSystemRoleItemName:'暂无'}}</b>
                                <!-- <input type="text" value="" :disabled="isDisabled.disabled1">  -->
                            </li>
                            <li><span>角色说明</span><b>{{state.showSystemRoleItemDes?state.showSystemRoleItemDes:'暂无'}}</b>
                            </li>
                            <li><span>角色组</span><b>{{state.showSystemRoleItemGroup?state.showSystemRoleItemGroup:'暂无'}}</b></li>
                        </ul>
                    </div>
                </div>
                <div class="ui-module-aside-content">
                    <div class="role-person-tit">
                        <h3>角色人员</h3></div>
                    <div class="role-content">
                        <ui-scrollview>
                            <ul>
                                <li v-for="item in state.personRoleList">

                                    <div class="role-delete" :class="isShowItem?'display-none':'display-block' ">
                                        <button @click="deleteRole($index,item)"></button>
                                    </div>
                                    <div class="role-content-pic">
                                        <img src="../../../assets/images/avatar.png">
                                    </div>
                                    <div class="role-content-text">
                                        <p><b>{{item.userName}}</b></p>
                                        <p><span>员工工号：{{item.userNum}}</span></p>
                                        <div class="role-edit">
                                            <div class="date-wrap" :class="isShowItem?'left-70':'left-100' ">
                                                <ui-datepicker format="yyyy/MM/dd"
                                                               :start-time.sync="item.startTime"
                                                               :end-time.sync="item.endTime"
                                                               :callback="updateDate"
                                                               :disabled="isShowItem?true:false"
                                                               ID="{{item.userRoleID}}"
                                                               range></ui-datepicker>
                                            </div>
                                            <!-- <p>{{item.date}}</p> -->
                                            <button :class="isShowItem?'display-none':'display-block' "></button>
                                        </div>
                                    </div>
                                </li>
                                <!--<li>-->
                                <!--<div class="add-role-btn" :class="isShowItem?'display-none':'display-block' ">-->
                                <!--<button @click="addRole"></button>-->
                                <!--</div>-->
                                <!--</li>-->
                            </ul>
                        </ui-scrollview>
                    </div>
                    <div class="commit-or-cancel " :class="isShowItem?'display-none':'display-block' ">
                        <ui-button raised color="success" @click='addRole'>添加</ui-button>
                        <ui-button raised color="primary" @click='isShowItem=true'>返回</ui-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 新增人员弹窗 -->
        <ui-modal v-if="show.modal1" :show.sync="show.modal1" type="large" header="选择人员" body="">
            <div class="black-person">
                <div class="black-person-l">
                    <div class="search">
                        <div class="search-bar">
                            <input type="text" placeholder="搜索员工" v-model="state.searchRoleName"
                                   @keyup="onKeyup(state.searchRoleName) | debounce 500"/>
                        </div>
                    </div>
                    <div class="search-tree">
                        <ui-scrollview>
                            <ui-tree :data="state.showEmployeeForAutTree"
                                     :multiple="false"
                                     idprop="ID"
                                     :nodeclicked="EmployeeTreeClicked"
                                     :root="state.showEmployeeForAutTree"
                                     :rootvisible="false"></ui-tree>
                        </ui-scrollview>
                    </div>
                </div>
                <div class="black-person-r ">
                    <ui-scrollview class="_offsetParent_">
                        <div class="check-field ">
                            <ui-peoplecheck :list="state.roleList" name="userName" id="ID"
                                            :value.sync="state.checkRoleList"></ui-peoplecheck>
                        </div>
                        <div class="check-field">
                        </div>
                    </ui-scrollview>
                </div>
            </div>
            <div slot="footer" class="footer text-center">
                <ui-button color="success" @click="addRolePersonBtn" class="large ">确定</ui-button>
            </div>
            <!-- 提示框 -->
        </ui-modal>
        <ui-modal v-if="show.modal2" :show.sync="show.modal2" header="提示" body="确定删除当前选中元素吗？">
            <div slot="footer" class="footer text-center">
                <ui-button color="success" @click="onSystemTreeDelete" class="large ">确定</ui-button>
                <ui-button @click="show.modal2 = false">关闭</ui-button>
            </div>
        </ui-modal>
        <!-- 添加item -->
        <ui-modal v-if="show.modal3" :show.sync="show.modal3">
            <div slot="header">
                {{state.roleAddOrUpdateFlag}}
            </div>
            <div class="input-wrap">
                <ui-validator name="validation1">
                    <form class="form-horizontal container-fluid" role="form" vali-submit="submitBt|submit">
                        <div class="row">
                            <div class="col-sm-24">
                                <div class="form-group  row">
                                    <label class="col-sm-6 control-label">{{state.roleAddOrUpdateText}}：</label>
                                    <div class="col-sm-18">
                                        <div class="choose-input">
                                            <input type="text" v-model="state.addSystemTreeItemVal" vali="required"
                                                   vali-msg='必填项' class="form-control" placeholder="请输入角色名称">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row"
                             v-if="state.roleAddOrUpdateFlag == '添加角色'  || state.roleAddOrUpdateFlag == '修改角色' ">
                            <div class="col-sm-24">
                                <div class="form-group  row">
                                    <label class="col-sm-6 control-label">角色说明：</label>
                                    <div class="col-sm-18">
                                        <input type="text" v-model="state.addSystemTreeItemValDes" class="form-control"
                                               vali="required"
                                               vali-msg='必填项'
                                               placeholder="请输入角色说明">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-actions">
                            <div class="row">
                                <div class="text-center">
                                    <ui-button color="success" class="large " id="submitBt">确定</ui-button>
                                </div>
                            </div>
                        </div>
                    </form>
                </ui-validator>
                <!--<div class="input-wrap_role"><p></p><div class="input-wrap_role_input"><input type="text" v-model="state.addSystemTreeItemVal"></div></div>-->
                <!--<div class="input-wrap_role"><p>：</p><div class="input-wrap_role_input"><input type="text" v-model="state.addSystemTreeItemValDes"></div></div>-->
            </div>
            <div slot="footer" class="footer text-center">
                <!--<ui-button color="success" @click="addSystemTreeItem" class="large " id="submitBt">确定</ui-button>-->
            </div>
        </ui-modal>
        <!--提示-->
        <ui-modal v-if="show.modal4" :show.sync="show.modal4" header="提示" body="请选择左侧角色">
            <div slot="footer" class="footer text-center">
                <ui-button color="success" @click="show.modal4=false" class="large ">确定</ui-button>
            </div>
        </ui-modal>
        <ui-modal v-if="show.modal5" :show.sync="show.modal5" header="删除角色人员" body="你确定要删除角色人员吗？">
            <div slot="footer" class="footer text-center">
                <ui-button color="success" @click="goDeleteRole()" class="large ">确定</ui-button>
                <ui-button @click="show.modal5 = false">关闭</ui-button>
            </div>
        </ui-modal>
        <ui-confirm
                header="提示" confirm-button-text="确定" deny-button-text="不保存"
                @confirmed="confirmed" @denied="denied" :show.sync="showConfirm"
                autofocus="confirm-button" close-on-confirm
        >
            <div class="text-center">当前功能没有保存，请点击右上角保存按钮保存！</div>
        </ui-confirm>
    </section>
</template>
<script type="text/javascript">
    import uiPeoplecheck from './uiPeoplecheck'
    import store from '../store';
    import Vue from 'Vue';
    export default {
        components: {
            uiPeoplecheck
        },
        data() {
            return {
                state: store.state,
                isShowItem: true,
                showFieldBar: true,
                dateDisabled: false,
                show: {
                    modal1: false,
                    modal2: false,
                    modal3: false,
                    modal4: false,
                    modal5: false,
                },
                modal3ShowMsg: '',
                menuList: [{
                    text: '添加角色',
                    event: 'itemAddRole',
                    show: true,
                    __code: 'permission-role-tree-addRole/添加角色'
                }, {
                    text: '添加角色组',
                    event: 'itemAddGroup',
                    show: true,
                    __code: 'permission-role-tree-addGroup/添加角色组'
                }, {
                    text: '修改',
                    event: 'itemEdit',
                    show: true,
                    __code: 'permission-role-tree-edit/修改'
                }, {
                    text: '删除',
                    event: 'deleteItem',
                    show: true,
                    __code: 'permission-role-tree-del/删除'
                }],
                showConfirm: false,
                fnTreeArray: [
                    store.actions.loadFnTree,
                    store.actions.loadRole,
                    store.actions.loadLevelTree,
                    store.actions.loadCardTree,
                    store.actions.loadPaySuiteTree,
                    store.actions.loadFieldTree,
                ],
                tabIdx:'',
//                selectedFields: []
        }
            ;
        },
        events: {
            submit(){
                // 新增角色或者角色组
                store.actions.addSystemTreeItem();
                this.show.modal3 = false;
            },
        },
        filters: {
            isShow(value) {
                return !!value ? 'display:block' : 'display:none';
            }
        },
        watch: {
            'state.updateDateRolePerson'(){
            },
            'state.checkRoleList'(){
               // store.state.checkRoleList = this.state.checkRoleList;
            },
            'state.employmentTypeChecked'(){
            },
            fieldTree(){
                console.log('this.fieldTree')
            }

        },
        methods: {
            updateDate(data, item){

                store.actions.updateDate(data, item.id);
            },
            //onKeyup
            onKeyup(data){
                store.actions.searchRoleNameFn(data)
            },

            //EmployeeTreeClicked  选择人员树点击
            EmployeeTreeClicked(data){
                store.actions.showEmployeeForAutTreeRole(data);
            },
            //删除角色或者角色组
            onSystemTreeDelete(){
                this.show.modal2 = false;
                store.actions.deleteSystemTreeItem();
            },
            beforeMenuShown(data) {
                this.menuList[0].show = true;
                this.menuList[1].show = true;
                this.menuList[2].show = true;
                this.menuList[3].show = true;
                if (data.roleName == "系统角色树") {
                    this.menuList[2].show = false;
                    this.menuList[3].show = false;
                }
                if (data.type == 1) {
                    this.menuList[1].show = false;
                }
                if (data.type == 2) {
                    console.log('type 2');
                    this.menuList[0].show = false;
                    this.menuList[1].show = false;
                }
                return true;
            },

            menuItemClicked: function (menuName, data) {
                if (menuName == 'deleteItem') this.show.modal2 = true;
                if (menuName != 'deleteItem') {
                    this.show.modal3 = true;
                }
                store.actions.setMenuItemClicked(data, menuName);
                store.actions.editSystemTree(menuName, data);
            },
            nodeClicked: function (data) {
                if (data.ID == -1) {
                    store.actions.clearAll();
                } else {
                    store.actions.setNodeClickedID(data.ID);
                    store.actions.setAddOrUpdateRole(data);
                    store.actions.onSystemTreeShow();
                    store.actions.loadEmploymentType();
                }

            },
            //添加角色人员确认
            addRolePersonBtn() {
                var self = this;
                store.actions.addRolePersonBtn(function (data) {
                    if (data)self.show.modal1 = false;
                });
            },
            //显示添加角色人员弹窗
            addRole() {
                if (this.state.addOrUpdateRole && this.state.addOrUpdateRole.type == 2) {
                    this.show.modal1 = true;
                    store.actions.loadRoleList();
                    store.actions.clearCheckRoleList();
                } else {
                    this.show.modal4 = true;
                }
            },
            //添加角色人员
            addRolePerson(index, person) {
                store.actions.addRolePerson(index, person)
            },
            goDeleteRole(){
                this.show.modal5 = false;
                store.actions.goDeleteRole();
            },
            // 删除角色人员
            deleteRole(index, item){
                this.show.modal5 = true;
                store.state.deleteRole = item;
            },
            checkEmploymentType(index, text) {
                store.actions.addEmploymentType(index, text);
            },
            toggleFieldBar() {
                this.showFieldBar = !this.showFieldBar
            },

            //修改人员按钮
            goEdit() {
                if (this.state.addOrUpdateRole && this.state.addOrUpdateRole.type == 2) {
                    this.isShowItem = false;
                } else {
                    this.show.modal4 = true;
                }
            },
            tabFn(index) {
                // 如果没有选中左侧角色树，则提示
                if(!this.state.nodeClickedID){

                    this.$root.showTip({
                        type:'warning',
                        msg:'请先选择要操作的角色'
                    })

                    return;
                }


                this.tabIdx=index;
                if (this.state.treeClickedBool) {
                    this.state.tabCurIdx = index;
                    this.fnTreeArray[index]();

                } else {
                    this.showConfirm = true;
                }


            },
            confirmed(){

            },
            denied(){
               // this.state.tabCurIdx = this.tabIdx;
                this.state.treeClickedBool=true;
                this.fnTreeArray[this.tabIdx]();
            },
            //功能权限树点击
            menuTreeClicked(data){
                if (data) this.state.treeClickedBool = false;
            },
            //人员权限  组织架构树点击
            OrgChartTreeClicked(data){
                if (data) this.state.treeClickedBool = false;
            },
            //分级授权树点击
            accreditTreeClicked(data){
                if (data) this.state.treeClickedBool = false;
            },
            //卡片树点击
            cardTreeClicked(data){
                if (data) this.state.treeClickedBool = false;
            },
            // 工资套树点击
            paySuiteTreeClicked(data){
                if (data) this.state.treeClickedBool = false;
            },
            //字段权限
            fieldTreeClicked(data, currentNode){
              console.log(new Date().getTime())
                if(!currentNode.checked){
                  console.log(new Date().getTime())
                  return; // 无需更改末节点状态
                }
                if(typeof currentNode.ID != 'string' || currentNode.ID.indexOf('_') < 0) { // 点击的不是末节点
                    console.log(99999, currentNode.text)
                    this.alterOperationChecked(currentNode);
                } else { // 点击的是末节点
                    this.state.listOperationNodes.forEach(p=>{
                        if(p.ID.substring(0, p.ID.lastIndexOf('_')) == currentNode.ID.substring(0, currentNode.ID.lastIndexOf('_'))) {
                            if(p.ID !== currentNode.ID) {
                                p.checked = false;
                            }
                        }
                    })
                }
              if (data) this.state.treeClickedBool = false;
              console.log(new Date().getTime())
            },
            alterOperationChecked(node) {
                if(typeof node.ID == 'string' && node.ID.indexOf('_') > 0) {
                    if(node.ID.substr(node.ID.lastIndexOf('_')+1) != "2") {
                        node.checked = false;
                    }
                    return;
                }
                if(!node.children || node.children.length <= 0) return;
                node.children.forEach(p => {
                    this.alterOperationChecked(p);
                })
            }

        },
        created() {

            //加载默认数据
            store.actions.loadSystemTreeData();

            // 如果没有选中左侧角色树，则提示
            if(!this.state.nodeClickedID){

                this.$root.showTip({
                    type:'warning',
                    msg:'请先选择要操作的角色'
                })

                return;
            }

        },
        ready() {

            console.log(this.state.orgChartTree)
        },
        attached(){
            var codeBtnArr = [
                'permission-role-manage-fn',
                'permission-role-manage-personnel',
                'permission-role-manage-grade',
                'permission-role-manage-card',
            ];
            for (var i = 0; i < codeBtnArr.length; i++) {
                if (this.$root.checkAuthorityByID(codeBtnArr[i])) {
                    this.state.tabCurIdx = i;
                    console.log(i)
                    break;
                }
            }
            console.log(this.$root.checkAuthorityByID('permission-roleMage-fun'))
        }
    };
</script>
<style scoped>
    /*.fn-accredit,.person-accredit,.level-accredit{*/
    /*position: relative;*/
    /*}*/
    .menu-tree, .menu-btn-tree {
        position: absolute;
        top: 130px;
        bottom: 20px;
        left: 20px;
        right: 20px;
        overflow: hidden;
        padding-bottom: 10px;
    }

    .dropdown-menu {
        min-width: 130px;
    }

    .input-wrap {
        width: 100%;
    }

    .fn-accredit .tree-box {
        padding-left: 24px !important;
    }
    .point{
      position: absolute;
      bottom: 0px;
      width: 100%;
      text-align: center;
      color: #fe6d5a;
    }
</style>
