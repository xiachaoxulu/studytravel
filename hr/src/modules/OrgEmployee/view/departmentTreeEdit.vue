<template>
  <header class="ui-module-navbar pos-topbar-fixed">
    <div class="ui-module-navbar-content">
      <div class="pull-left">
        <h4><strong>修改组织树</strong></h4>
      </div>
    </div>
  </header>
  <div class="ui-panel ui-module-row">
    <ui-scrollview>
      <div class="ui-module-row pos-fullHeight">
        <div>
          <ui-tree idprop="organizeID" textprop="departmentName" :data="state.deptTree" :root="state.deptTree" :menulist.sync="menuList" :beforemenushown="beforeMenuShown" :menuitemclicked="menuItemClicked" :rootvisible="true"></ui-tree>
        </div>
      </div>
    </ui-scrollview>
  </div>
  <add-department :display.sync="showAddDepartment" v-if="showAddDepartment" :dept.sync="editDept"></add-department>
  <ui-confirm confirm-button-text="是" deny-button-text="否" header="提示" type="danger" @confirmed="confirmed" :show.sync="showConfirm" close-on-confirm>
    确定要删除该组织吗？（该组织下的所有子组织也将会删除！）
  </ui-confirm>
</template>
<script>
import store from '../store'
import addDepartment from './addDepartment'
export default {
  data() {
      return {
        state: store.state, // 全局数据
        showNavbar: false, // 默认不显示页面上部
        // 部门树节点单击的菜单配置
        menuList: [{
            text: '添加同级部门',
            event: 'addOrgSibling',
            show: true,
            __code: 'org-orgTree-dept-addBrother/添加同级部门'
          }, {
            text: '添加子部门',
            event: 'addOrgChild',
            show: true,
            __code: 'org-orgTree-dept-addChildren/添加子部门'
          }, {
            text: '修改',
            event: 'editOrgName',
            show: true,
            __code: 'org-orgTree-dept-edit/修改'
          }
          // , { // text: '修改关联信息', // event: 'editRelativeInfo', // show: true // }
          , {
            text: '删除',
            event: 'deleteOrg',
            show: true,
            __code: 'org-orgTree-dept-del/删除'
          }
        ],
        // 每个菜单项对应本组件的事件
        menuEventList: {
          'addOrgSibling': this.addOrgSibling,
          'addOrgChild': this.addOrgChild,
          'editOrgName': this.editOrgName,
          'editRelativeInfo': this.editRelativeInfo,
          'deleteOrg': this.deleteOrg
        },
        // 是否显示部分编辑界面
        showAddDepartment: false,
        // 是否显示确认弹出框
        showConfirm: false,
        // 存储删除部门的ID
        delDeptID: null,
        editDept: {},
      };
    },
    components: {
      addDepartment
    },
    methods: {
      beforeMenuShown(data) {
        this.menuList[0].show = data.ID != -1;
        this.menuList[2].show = data.ID != -1;
        this.menuList[3].show = data.ID != -1;
        return true;
      },
      // 菜单项单击回调方法
      //    menuName: 点击的菜单名称
      //    data:
      menuItemClicked(menuName, data) {
        // 调用相应的菜单项处理方法
        this.menuEventList[menuName](data);
      },
      // 添加同级部门
      addOrgSibling(data) {
        this.editDept = {
          parentID: data.parentID
        };
        this.showAddDepartment = true;
      },
      // 添加子部门
      addOrgChild(data) {
        this.editDept = {
          parentID: data.ID
        };
        this.showAddDepartment = true;
      },
      // 编辑部门名称
      editOrgName(data) {
        var me = this;
        store.actions.loadDept(data.ID, (item) => {
          delete item.createTime;
          this.editDept = item;
          this.showAddDepartment = true;
        });
      },
      // 编辑关联信息
      editRelativeInfo(data) {
        console.log('editRelativeInfo')
      },
      // 删除部门
      deleteOrg(data) {
        this.delDeptID = data.ID;
        this.showConfirm = true;
      },
      // 删除确认处理
      confirmed() {
        var me = this;
        store.actions.removeDept(this.delDeptID, () => {
          // 重新加载部门树
          store.actions.loadDeptTree();
          store.actions.loadOrgListTree();
          store.actions.loadCompanyDeptStore();
        }, (res) => {
          me.$root.showTip({
            type: 'danger',
            msg: res,
            duration: 2000
          });
        });
      }
    },
    ready() {
      // 加载
      store.actions.loadDeptTree();
      var vm = this;
      // 500ms 显示页面头部
      setTimeout(function() {
        vm.showNavbar = true;
      }, 500);
    }
};
</script>
<style lang="css" scoped>
</style>
