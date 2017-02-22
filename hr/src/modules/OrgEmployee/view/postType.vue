<template>
  <header class="ui-module-navbar pos-topbar-fixed">
    <div class="ui-module-navbar-content">
      <div class="pull-left">
        <h4><strong>管理岗位分类</strong></h4>
      </div>
    </div>
  </header>
  <div class="ui-panel ui-module-row">
    <ui-scrollview>
      <ui-tree :data="state.postTypeTree" :root="state.postTypeTree" idprop="ID" textprop="postType" :menulist="menuList" :expandedall="true" :beforemenushown="beforeMenuShown" :menuitemclicked="menuItemClicked"></ui-tree>
    </ui-scrollview>
  </div>
  <post-type-edit :visibility.sync="showEdit" :posttype.sync="postType" :header="editHeader"></post-type-edit>
</template>
<script>
import store from '../store'
import postTypeEdit from './postTypeEdit'
export default {
  data() {
      return {
        state: store.state,
        postType: {},
        showNavbar: false,
        showEdit: false,
        menuList: [{
          text: '添加同级分类',
          event: 'addSibling',
          show: true,
          __code: 'org-postTree-postClass-addBrother/添加同级分类'
        }, {
          text: '添加子分类',
          event: 'addChild',
          show: true,
          __code: 'org-postTree-postClass-addChildren/添加子分类'
        }, {
          text: '修改名称',
          event: 'editPostType',
          show: true,
          __code: 'org-postTree-postClass-edit/修改'
        }, {
          text: '删除',
          event: 'delPostType',
          show: true,
          __code: 'org-postTree-postClass-del/删除'
        }],
        editHeader: ''
      };
    },
    methods: {
      beforeMenuShown(data) {
        this.menuList[0].show = data != -1;
        this.menuList[2].show = data != -1;
        this.menuList[3].show = data != -1;
        return true;
      },
      menuItemClicked(menuName, data) {
        console.log(menuName)
        console.log(this[menuName])
        this[menuName](data);
      },
      addSibling(data) {
        store.actions.clearPostType();
        this.postType = {
          parentID: data.parentID
        };
        this.editHeader = '添加同级分类';
        this.showEdit = true;
      },
      addChild(data) {
        store.actions.clearPostType();
        this.postType = {
          parentID: data.ID
        };
        this.editHeader = '添加子分类';
        this.showEdit = true;
      },
      editPostType(data) {
        let me = this;
        store.actions.loadPostType(data.ID, (data) => {
          me.postType = {
            ID: me.state.postType.ID,
            parentID: me.state.postType.parentID,
            postType: me.state.postType.postType,
            mngType: me.state.postType.mngType
          };
          this.editHeader = '编辑分类';
          me.showEdit = true;
        });
      },
      delPostType(data) {
        let me = this;
        store.actions.removePostType(data.ID, (data) => {
          store.actions.loadPostTypeTree();
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
      store.actions.loadPostTypeTree();
      var vm = this;
      setTimeout(function() {
        vm.showNavbar = true;
      }, 500);
    },
    components: {
      postTypeEdit
    }
};
</script>
<style lang="css" scoped>
</style>
