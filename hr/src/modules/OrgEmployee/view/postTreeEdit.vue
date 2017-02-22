<template>
  <header class="ui-module-navbar pos-topbar-fixed">
    <div class="ui-module-navbar-content">
      <div class="pull-left">
        <h4><strong>岗位修改</strong></h4>
      </div>
    </div>
  </header>
  <div class="ui-panel ui-module-row">
    <ui-table v-ref:table height="auto" class="com-table-wrap">
      <template slot="headerLockedFirst">
        <table class="table table-bordered">
          <colgroup>
            <col width="200px" />
            <col width="0px" />
            <!-- 为实现表头跨行，添加一列空列 -->
          </colgroup>
          <thead>
            <tr>
              <th rowspan="2">职位</th>
              <th></th>
            </tr>
            <tr>
              <!-- 添加的一行 -->
              <th></th>
            </tr>
          </thead>
        </table>
      </template>
      <template slot="headerNormal">
        <table class="table table-bordered">
          <colgroup>
            <col width="200px"></col>
            <col width="100px"></col>
            <col width="100px"></col>
            <col width="200px"></col>
            <col width="200px"></col>
            <col width="100px"></col>
            <col width="80px"></col>
            <col width="80px"></col>
            <col width="80px"></col>
            <col width="100px"></col>
            <col width="100px"></col>
            <col width="100px"></col>
          </colgroup>
          <thead>
            <tr>
              <th rowspan="2">岗位</th>
              <th colspan="2" align="center">职级 <i @click="showComponent('rank')" class="ui-icon material-icons" __code="org-postTree-rank/职级">mode_edit</i></th>
              <th rowspan="2">组织</th>
              <th rowspan="2">上级岗位</th>
              <th rowspan="2">岗位分类 <i @click="showComponent('postType')" class="ui-icon material-icons" __code="org-postTree-postClass/岗位分类">mode_edit</i></th>
              <th rowspan="2">定编</th>
              <th rowspan="2">在岗</th>
              <th rowspan="2">超缺编</th>
              <th rowspan="2">岗位说明书</th>
              <th rowspan="2">岗位职责</th>
              <th rowspan="2">任职要求</th>
            </tr>
            <tr>
              <th>最高职级</th>
              <th>最低职级</th>
            </tr>
          </thead>
        </table>
      </template>
      <template slot="headerLockedLast">
        <table class="table table-bordered">
          <colgroup>
            <col width="70px" />
            <col width="70px" />
            <col width="0px"></col>
          </colgroup>
          <thead>
            <tr>
              <th rowspan="2"></th>
              <th rowspan="2"></th>
              <th></th>
            </tr>
            <tr>
              <th></th>
            </tr>
          </thead>
        </table>
      </template>
      <template slot="bodyLockedFirst">
        <table class="table table-bordered">
          <colgroup>
            <col width="200px" />
            <col width="50px" />
          </colgroup>
          <tbody>
            <template v-for="position in state.positionList">
              <tr>
                <!-- 跨行数为 position.postPojoList.length+1，包括职位包含的岗位数和一行添加岗位为 -->
                <td class="col-title" rowspan="{{position.postPojoList ? (position.postPojoList.length+1) : 1}}">
                  {{position.positionName}}&nbsp;&nbsp;&nbsp;&nbsp;
                  <a href="javascript:void(0)" @click="editPosition(position.ID)" style="color:rgb(49,126,243)" v-if="$root.checkAuthorityByID('org-postTree-position-edit')" __code="org-postTree-position-edit/编辑">编辑</a>&nbsp;
                  <a href="javascript:void(0)" @click="removePositionConfirm(position.ID)" style="color:rgb(49,126,243)" v-if="$root.checkAuthorityByID('org-postTree-position-del')" __code="org-postTree-position-del/删除">删除</a>
                </td>
                <!-- 为实现表体跨行，添加一列空列 -->
                <td></td>
              </tr>
              <tr v-for="idx in position.postPojoList">
                <td></td>
              </tr>
            </template>
            <tr>
              <td colspan="2" class="col-title"><a href="javascript:void(0)" @click="addPostName()" v-if="$root.checkAuthorityByID('org-postTree-position-add')" __code="org-postTree-position-add/添加" style="color: #eb2526">+添加职位</a></td>
              <!-- 使用v-if判断当前登录用户是否有添加岗位名称的权限，使用全局判断权限方法 -->
              <td></td>
            </tr>
          </tbody>
        </table>
      </template>
      <template slot="bodyNormal">
        <table class="table table-bordered">
          <colgroup>
            <col width="200px"></col>
            <col width="100px"></col>
            <col width="100px"></col>
            <col width="200px"></col>
            <col width="200px"></col>
            <col width="100px"></col>
            <col width="80px"></col>
            <col width="80px"></col>
            <col width="80px"></col>
            <col width="100px"></col>
            <col width="100px"></col>
            <col width="100px"></col>
          </colgroup>
          <tbody>
            <template v-for="position in state.positionList">
              <tr v-for="post in position.postPojoList">
                <td>{{post.postName}}</td>
                <td>{{post.maxlevelName}}</td>
                <td>{{post.minlevelName}}</td>
                <td title="{{post.organizeName}}">{{post.organizeName}}</td>
                <td title="{{post.uppostName}}">{{post.uppostName}}</td>
                <td>{{post.postTypeName}}</td>
                <td>{{post.authorized}}</td>
                <td>{{post.atPost}}</td>
                <td>{{post.lossPost}}</td>
                <td>
                  <a v-if="post.postContent!=null&&post.postContent.length>0" href="javascript:void(0)" @click="downloadAttach(post.postContent)">点击下载</a></td>
                <td>
                  <a v-if="post.postDuty!=null&&post.postDuty.length>0" href="javascript:void(0)" @click="downloadAttach(post.postDuty)">点击下载</a></td>
                <td>
                  <a v-if="post.postDemand!=null&&post.postDemand.length>0" href="javascript:void(0)" @click="downloadAttach(post.postDemand)">点击下载</a>
                </td>
              </tr>
              <tr>
                <td colspan="12"><a href="javascript:void(0)" __code="org-postTree-post-add/添加岗位" v-if="$root.checkAuthorityByID('org-postTree-post-add')" @click="addPost(position.ID)">+添加岗位</a></td>
              </tr>
            </template>
            <tr>
              <td colspan="12"></td>
            </tr>
          </tbody>
        </table>
      </template>
      <template slot="bodyLockedLast">
        <table class="table table-bordered">
          <colgroup>
            <col width="70px" />
            <col width="70px" />
          </colgroup>
          <tbody>
            <template v-for="position in state.positionList">
              <tr v-for="post in position.postPojoList">
                <td><a href="javascript:void(0)" __code="org-postTree-post-edit/编辑岗位" @click="editPost(post.ID)">编辑</a></td>
                <td><a href="javascript:void(0)" __code="org-postTree-post-del/删除岗位" @click="removePostConfirm(post.ID)">删除</a></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
            </template>
            <tr>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </template>
    </ui-table>
  </div>
  <ui-sidecontent :show.sync="showSidebar">
    <!-- 左侧划入的职级，岗位分类界面组件 -->
    <components :is="what">
    </components>
  </ui-sidecontent>
  <!-- 职位编辑组件 -->
  <position-edit :visibility.sync="showPositionEdit" :position.sync="position"></position-edit>
  <!-- 岗位编辑组件 -->
  <post-dialog :visibility.sync="showPostDialog" v-if="showPostDialog" :post.sync="post"></post-dialog>
  <ui-confirm confirm-button-text="是" deny-button-text="否" header="提示" type="danger" @confirmed="removePost" :show.sync="showConfirmPost" close-on-confirm>
    确定要删除该岗位吗？
  </ui-confirm>
  <ui-confirm confirm-button-text="是" deny-button-text="否" header="提示" type="danger" @confirmed="removePosition" :show.sync="showConfirmPosition" close-on-confirm>
    确定要删除该职位吗？
  </ui-confirm>
</template>
<script>
import store from '../store.js'
import rank from './rank' // 职级组件
import postType from './postType' // 岗位分类组件
import postDialog from './postDialog' // 岗位编辑组件
import positionEdit from './positionEdit' // 职位组件
import Vue from 'vue'

export default {
  methods: {
    /**
     * 控制显示职级和岗位分类组件
     * @param  String componentName 传入组件名称
     */
    showComponent(componentName) {
      this.what = componentName;
      this.showSidebar = true;
    },
    /**
     * 添加岗位
     * @param String positionID 该岗位所属的职位ID
     */
    addPost(positionID) {
      store.actions.clearPost();
      this.post = {
        positionID: positionID
      };
      store.actions.loadPostTree();
      this.showPostDialog = true;
    },
    /**
     * 编辑岗位
     * @param  String postID 岗位编号
     */
    editPost(postID) {
      let me = this;
      store.actions.loadPostTree();
      store.actions.loadPost(postID, (data) => {
        delete data.createTime;
        me.post = data;
        me.showPostDialog = true;
      });
    },
    /**
     * 删除岗位
     * @param  String postID 岗位编号
     */
    removePost() {
      var postID = this.removePostID;
      if (!postID) return;
      let me = this;
      store.actions.removePost(postID, (data) => {
        this.removePostID = null;
        store.actions.loadPositionList(() => {
          this.$nextTick(() => {
            this.$refs.table.refresh();
          });
        });
        store.actions.loadPostTree();
      }, (error) => {
        me.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
    },
    removePostConfirm(id) {
      this.removePostID = id;
      this.showConfirmPost = true;
    },
    /**
     * 添加岗位名称
     */
    addPostName() {
      store.actions.clearPosition();
      this.position = {};
      this.showPositionEdit = true;
    },
    editPosition(id) {
      var me = this;
      store.actions.loadPosition(id, (data) => {
        me.position = {
          ID: data.ID,
          positionCode: data.positionCode,
          positionName: data.positionName
        };
        me.showPositionEdit = true;
      }, (error) => {
        me.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
    },
    removePosition() {
      var id = this.removePositionID;
      if (!id) return;
      var me = this;
      store.actions.removePosition(id, () => {
        this.removePositionID = null;
        store.actions.loadPositionList(() => {
          this.$nextTick(() => {
            this.$refs.table.refresh();
          });
        });
      }, (error) => {
        me.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
    },
    removePositionConfirm(id) {
      this.removePositionID = id;
      this.showConfirmPosition = true;
    },
    downloadAttach(url) {
      this.$root.downloadFile(url);
    }
  },
  data() {
    return {
      state: store.state,
      what: '', // 动态组件的名称
      showSidebar: false, // 控制显示右滑出的动态组件
      showPositionEdit: false, // 控制显示职位编辑
      showPostDialog: false, // 控制显示岗位编辑
      position: {}, //
      post: {},
      showConfirmPosition: false,
      showConfirmPost: false,
      removePositionID: null,
      removePostID: null
    };
  },
  ready() {
    store.actions.loadPositionList(() => {
      this.$nextTick(() => {
        this.$refs.table.refresh();
      });
    }); // 获取职位，岗位数据
    var vm = this;
    setTimeout(function() {
      vm.showNavbar = true;
    }, 500);
  },
  components: {
    rank,
    postType,
    postDialog,
    positionEdit
  }
};
</script>
<style lang="css" scoped>
table.table i {
  font-size: 15px;
  cursor: pointer;
}

.col-title {
  background-color: #9096a6;
  color: #fff;
  border: 1px solid #6d6f7c !important;
}

.col-title:hover {
  background-color: #9096a6;
  color: #fff;
}
</style>
