<template>
  <!-- 模块主内容 -->
  <section class="ui-module-content pos-content demoShow">
    <div class="ui-module-row">
      <!--  -->
      <div class="com-col-m1-left ui-panel">
        <div class="pos-l-aside-fixed">
          <div class="role-tree">
            <ui-tree :data="treeData" :root="treeData"></ui-tree>
          </div>
        </div>
      </div>
      <div class="com-col-m1-middle ui-panel">
        <!-- 中间菜单管理 -->
        <div class="cur-role">
          <p>新奥店管理员</p>
        </div>
        <div class="border-line"></div>
        <div class="context-menu">
          <!-- <ul>
                  <li><a href="#">添加角色组</a></li>
                  <li><a href="#">添加角色</a></li>
                  <li><a href="#">添加角色组</a></li>
              </ul> -->
        </div>
        <div class="menu-tree">
          <ui-tree :data="treeData2" :checkable="true" ></ui-tree>
        </div>
      </div>
      <div class="com-col-m1-right ui-panel">
        <div class="ui-module-aside-top">
          <div class="attr-or-edit">
            <p>
              <button @click="goEdit" :class="isShowItem?'display-block':'display-none' "></button>
            </p>
            <h3>属性</h3>
          </div>
          <div class="attr-msg">
            <ul>
              <li><span>角色名称</span><b>新奥店管理员</b></li>
              <li><span>角色说明</span><b>新奥店管理员</b></li>
              <li><span>角色组</span><b>门店管理员组</b></li>
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
                  <div class="role-edit" :class="isShowItem?'display-none':'display-block' ">
                    <div class="date-wrap">
                      <ui-datepicker format="yyyy/MM/dd" :time.sync="item.date"></ui-datepicker>
                    </div>
                    <!-- <p>{{item.date}}</p> -->
                    <button></button>
                  </div>
                  <div class="role-delete" :class="isShowItem?'display-none':'display-block' ">
                    <button @click="deleteRole($index,item)"></button>
                  </div>
                  <div class="role-content-pic">
                    <img src="../../../assets/images/avatar.png">
                  </div>
                  <div class="role-content-text">
                    <p>{{item.name}}</p>
                    <p><span>员工编号：{{item.userCode}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="add-role-btn" :class="isShowItem?'display-none':'display-block' ">
                    <button @click="addRole">添加</button>
                  </div>
                </li>
              </ul>
            </ui-scrollview>
          </div>
          <div class="commit-or-cancel " :class="isShowItem?'display-none':'display-block' ">
            <ui-button raised color="success" @click='isShowItem=true'>确定</ui-button>
            <ui-button raised color="danger" @click='isShowItem=true'>取消</ui-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script type="text/javascript">
  import store from '../store';
  export default {
    data() {
      return {
        treeData: {
          id: 1,
          text: '系统角色树',
          children: [{
            id: 2,
            text: '系统管理人员',
            children: [{
              id: 7,
              text: '新奥店管理员'
            }, {
              id: 8,
              text: '鸟巢店管理员'
            }, {
              id: 9,
              text: '水立方店管理员'
            }]
          }, {
            id: 5,
            text: '分公司管理人员',
            children: [{
              id: 10,
              text: '新奥店管理员'
            }, {
              id: 11,
              text: '鸟巢店管理员'
            }, {
              id: 12,
              text: '水立方店管理员'
            }]
          }, {
            id: 6,
            text: '门店管理员组',
            children: [{
              id: 13,
              text: '新奥店管理员'
            }, {
              id: 14,
              text: '鸟巢店管理员'
            }, {
              id: 15,
              text: '水立方店管理员'
            }]
          }]
        },
        treeData2: {
          id: 1,
          text: '系统角色树',
          children: [{
            id: 2,
            text: '系统管理人员',
            children: [{
              id: 7,
              text: '新奥店管理员'
            }, {
              id: 8,
              text: '鸟巢店管理员'
            }, {
              id: 9,
              text: '水立方店管理员'
            }]
          }, {
            id: 5,
            text: '分公司管理人员',
            children: [{
              id: 10,
              text: '新奥店管理员'
            }, {
              id: 11,
              text: '鸟巢店管理员'
            }, {
              id: 12,
              text: '水立方店管理员'
            }]
          }, {
            id: 6,
            text: '门店管理员组',
            children: [{
              id: 13,
              text: '新奥店管理员'
            }, {
              id: 14,
              text: '鸟巢店管理员'
            }, {
              id: 15,
              text: '水立方店管理员'
            }]
          }]
        },
        isShow: true,
        state: store.state,
        isShowItem: true,
      };
    },
    methods: {
      deleteRole(index, item){
        this.show.modal2 = true;
        store.actions.deleteRole(item);
      },
      addRole() {
        this.show.modal1 = true;
        store.actions.loadRoleList();
      },
      goEdit () {
        this.isShowItem = false;
      }
    },
    created(){
      store.actions.loadPersonRoleList();
    },
  };
</script>
<style type="text/css">

  /*.pos-r-aside-fixed {*/
  /*overflow: hidden !important;*/
  /*}*/

  /*.role-content {*/
  /*position: absolute;*/
  /*top: 200px;*/
  /*bottom: 100px;*/
  /*left: 10px;*/
  /*right: 10px;*/
  /*}*/
  /*.date-wrap {*/
  /*position: absolute;*/
  /*right: 0px;*/
  /*top: 0;*/
  /*!*z-index:1;*!*/
  /*}*/

  /*.date-wrap .mz-datepicker {*/
  /*width: 100px !important;*/
  /*height: 20px;*/
  /*}*/

  /*.date-wrap .form-control {*/
  /*height: 20px;*/
  /*padding: 0;*/
  /*background: none !important;*/
  /*border: none;*/
  /*}*/

  /*.date-wrap .material-icons {*/
  /*display: none !important;*/
  /*}*/

  /*.role-edit {*/
  /*position: relative;*/
  /*}*/

  /*.role-edit button {*/
  /*position: absolute;*/
  /*right: 0;*/
  /*top: 3px;*/
  /*}*/
</style>
