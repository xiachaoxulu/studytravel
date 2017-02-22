<template>
  <header class="ui-module-navbar pos-topbar-fixed">
    <div class="ui-module-navbar-content">
      <div class="pull-left">
        <h4><strong>修改区域树</strong></h4>
      </div>
    </div>
  </header>
  <div class="ui-panel ui-module-row">
    <ui-scrollview>
      <div class="ui-module-row pos-fullHeight">
        <div>
          <ui-tree idprop="ID" textprop="areaName" :data="state.areaTree" :root="state.areaTree" :menulist.sync="menuList" :menuitemclicked="menuItemClicked" :beforemenushown="beforeMenuShown" :rootvisible="true"></ui-tree>
        </div>
      </div>
    </ui-scrollview>
  </div>
  </div>
  <components is="areaEdit" :area="area" :visibility.sync="showAreaEdit" v-if="showAreaEdit"></components>
  <ui-confirm confirm-button-text="是" deny-button-text="否" header="提示" type="danger" @confirmed="confirmed" :show.sync="showConfirm" close-on-confirm>
    确定要删除该区域吗？
  </ui-confirm>
</template>
<script>
import store from '../store'
import areaEdit from './areaEdit'
export default {
  data() {
      return {
        state: store.state, // 全局数据
        area: {},
        showNavbar: false, // 默认不显示页面上部
        // 区域树节点单击的菜单配置
        menuList: [{
            text: '添加同级区域',
            event: 'addAreaSibling',
            show: true,
            __code: 'org-area-addBrother/添加同级区域'
          }, {
            text: '添加子区域',
            event: 'addAreaChild',
            show: true,
            __code: 'org-area-addChildren/添加子区域'
          }, {
            text: '修改关联信息',
            event: 'editAreaName',
            show: true,
            __code: 'org-area-edit/修改关联信息'
          },
          // {
          //   text: '修改关联信息',
          //   event: 'editRelativeInfo',
          //   show: true
          // },
          {
            text: '删除',
            event: 'deleteArea',
            show: true,
            __code: 'org-area-del/删除'
          }
        ],
        // 每个菜单项对应本组件的事件
        menuEventList: {
          'addAreaSibling': this.addAreaSibling,
          'addAreaChild': this.addAreaChild,
          'editAreaName': this.editAreaName,
          'editRelativeInfo': this.editRelativeInfo,
          'deleteArea': this.deleteArea
        },
        // 是否显示部分编辑界面
        showAreaEdit: false,
        // 是否显示确认弹出框
        showConfirm: false
      };
    },
    components: {
      areaEdit
    },
    methods: {
      beforeMenuShown(data) {
        this.menuList[0].show = (data.ID != -1);
        this.menuList[2].show = (data.ID != -1);
        this.menuList[3].show = (data.ID != -1);
        return true;
      },
      // 菜单项单击回调方法
      //    menuName: 点击的菜单名称
      //    data:
      menuItemClicked(menuName, data) {
        // 调用相应的菜单项处理方法
        this.menuEventList[menuName](data);
      },
      // 添加同级区域
      addAreaSibling(data) {
        this.area = {
          parentID: data.parentID
        };
        this.showAreaEdit = true;
      },
      // 添加子区域
      addAreaChild(data) {
        this.area = {
          parentID: data.ID
        };
        this.showAreaEdit = true;
      },
      // 编辑区域名称
      editAreaName(data) {
        this.area = {
          ID: data.ID,
          areaName: data.areaName,
          parentID: data.parentID,
          userID: data.userID,
          userName: data.userName
        };
        this.showAreaEdit = true;
      },
      // 编辑关联信息
      editRelativeInfo(data) {
        console.log('editRelativeInfo')
      },
      // 删除区域
      deleteArea(data) {
        this.area.ID = data.ID;
        this.showConfirm = true;
      },
      // 删除确认处理
      confirmed() {
        store.actions.removeArea(this.area.ID, () => {
          this.area = {};
          // 重新加载区域树
          store.actions.loadAreaTree();
        }, (error) => {
          me.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      }
    },
    ready() {
      // 加载
      store.actions.loadAreaTree();
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
