<template>
  <ui-modal :show.sync="visibility" hide-footer :header.sync="header" type="large">
    <div class="panel panel-default">
      <div class="panel-body">
        <ui-validator>
          <form class="form-horizontal container-fluid" role="form" vali-submit="submitBtn|submitedCall">
            <div class="row divider">
              <div>基本信息</div>
              <div></div>
            </div>
            <div class="row">
              <!-- <div class="col-sm-12">
                <div class="form-group row">
                  <label class="col-sm-8 control-label">岗位编码：</label>
                  <div class="col-sm-16">
                    <input type="text" v-model="post.postCode" vali="required" vali-msg="必填项" class="form-control" placeholder="请输入岗位编码" />
                  </div>
                </div>
              </div> -->
              <div class="col-sm-12">
                <div class="form-group row">
                  <label class="col-sm-8 control-label">岗位名称：</label>
                  <div class="col-sm-16">
                    <input type="text" v-model="post.postName" vali="required" vali-msg="必填项" class="form-control" placeholder="请输入岗位名称" />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group row">
                  <label class="col-sm-8 control-label">上级岗位：</label>
                  <div class="col-sm-16">
                    <combo-tree :treedata="state.postTree" :nodeclicked="postClicked" :multiple="false" idprop="ID" textprop="postName" :rootvisible="false">
                      <div data-toggle="dropdown">
                        <input type="text" v-model="post.uppostName" readonly="readonly" class="form-control" placeholder="点击选择上级岗位">
                      </div>
                    </combo-tree>
                  </div>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group row">
                  <label class="col-sm-8 control-label">岗位分类：</label>
                  <div class="col-sm-16">
                    <combo-tree :treedata="state.postTypeTree" :nodeclicked="postTypeClicked" :multiple="false" idprop="ID" textprop="postType" :rootvisible="false">
                      <div data-toggle="dropdown">
                        <input type="text" v-model="post.postTypeName" readonly="readonly" vali="required" vali-msg="必填项" class="form-control" placeholder="点击选择岗位分类">
                      </div>
                    </combo-tree>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group row">
                  <label class="col-sm-8 control-label">最低职级：</label>
                  <div class="col-sm-16">
                    <select v-model="post.minlevel" class="form-control" vali="required" vali-msg="请选择最低职级">
                      <option value="">请选择最低职级</option>
                      <template v-for="rank in state.rankList">
                        <option value="{{rank.ID}}" :selected="rank.ID==post.minlevel">{{rank.rankName}}({{rank.orderNum}})</option>
                      </template>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group row">
                  <label class="col-sm-8 control-label">最高职级：</label>
                  <div class="col-sm-16">
                    <select v-model="post.maxlevel" class="form-control" vali="required" vali-msg="请选择最高职级">
                      <option value="">请选择最高职级</option>
                      <template v-for="rank in state.rankList">
                        <option value="{{rank.ID}}" :selected="rank.ID==post.maxlevel">{{rank.rankName}}({{rank.orderNum}})</option>
                      </template>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group row">
                  <label class="col-sm-8 control-label">组织：</label>
                  <div class="col-sm-16">
                    <combo-tree :treedata="state.deptStoreTree" :nodeclicked="deptClicked" :multiple="false" idprop="ID" :rootvisible="false">
                      <div data-toggle="dropdown">
                        <input type="text" v-model="post.organizeName" readonly="readonly" vali="required" vali-msg="必填项" class="form-control" placeholder="点击选择所属部门">
                      </div>
                    </combo-tree>
                  </div>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group row">
                  <label class="col-sm-8 control-label">定编：</label>
                  <div class="col-sm-16">
                    <input type="text" v-model="post.authorized" vali="required|minNum:1" vali-msg="必填项||定编应为数字" class="form-control" placeholder="" />
                  </div>
                </div>
              </div>
            </div>
            <div class="row divider">
              <div>附件</div>
              <div></div>
            </div>
            <div class="row">
              <div class="form-group row">
                <label class="col-sm-4 control-label">岗位说明书</label>
                <div class="col-sm-4">
                  <button type="button" class="btn btn-default" @click="uploadAttach('postContent')">+ 上传附件</button>
                </div>
                <div class="col-sm-13">
                  <template v-if="post.postContent!=null && post.postContent.length>0">
                    <span class="label label-success">
                    <i class="material-icons">check_circle</i>上传成功</span>
                  </template>
                </div>
                <div class="col-sm-3">
                  <a href="javascript:void(0)" v-if="post.postContent!=null && post.postContent.length>0" @click="removeAttach('postContent')">删除</a>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="form-group row">
                <label class="col-sm-4 control-label">岗位职责</label>
                <div class="col-sm-4">
                  <button type="button" class="btn btn-default" @click="uploadAttach('postDuty')">+ 上传附件</button>
                </div>
                <div class="col-sm-13">
                  <template v-if="post.postDuty!=null && post.postDuty.length>0">
                    <span class="label label-success">
                    <i class="material-icons">check_circle</i>上传成功</span>
                  </template>
                </div>
                <div class="col-sm-3">
                  <a href="javascript:void(0)" v-if="post.postDuty!=null && post.postDuty.length>0" @click="removeAttach('postDuty')">删除</a>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="form-group row">
                <label class="col-sm-4 control-label">任职要求</label>
                <div class="col-sm-4">
                  <button type="button" class="btn btn-default" @click="uploadAttach('postDemand')">+ 上传附件</button>
                </div>
                <div class="col-sm-13">
                  <template v-if="post.postDemand!=null && post.postDemand.length>0">
                    <span class="label label-success">
                    <i class="material-icons">check_circle</i>上传成功</span>
                  </template>
                </div>
                <div class="col-sm-3">
                  <a href="javascript:void(0)" v-if="post.postDemand!=null && post.postDemand.length>0" @click="removeAttach('postDemand')">删除</a>
                </div>
              </div>
              <div class="form-actions">
                <div class="row">
                  <div class="text-center">
                    <ui-button id="submitBtn" color="accent">保存</ui-button>
                    <ui-button color="default" @click="close">取消</ui-button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ui-validator>
      </div>
    </div>
    <ui-modal :show.sync="uploadShow" :header="uploadHeader" hide-footer>
      <ui-upload filetypelimit="txt,doc,docx,pdf" :filecountlimit="1" :submiturl="postFileUrl" :callback="uploadDone"></ui-upload>
    </ui-modal>
  </ui-modal>
  <ui-confirm confirm-button-text="是" deny-button-text="否" header="提示" type="danger" @confirmed="confirmed" :show.sync="showConfirm" close-on-confirm>
    确定要删除该附件吗？
  </ui-confirm>
</template>
<script>
import store from '../store.js'
export default {
  data() {
      return {
        state: store.state,
        orgTree: {},
        postFileUrl: 'api.OrgEmployee.photoUpload',
        uploadShow: false,
        uploadHeader: '',
        fileType: null,
        removeFileType: null,
        showConfirm: false
      };
    },
    computed: {
      header() {
        return this.post.ID == null ? '添加岗位' : '修改岗位';
      }
    },
    props: {
      post: {
        twoWay: true,
        default: {}
      },
      visibility: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      uploadAttach(fileType) {
        this.fileType = fileType;
        this.uploadShow = true;
      },
      uploadDone(data) {
        console.log('data: ', data)
        this.uploadShow = false;
        this.$set('post.' + this.fileType, data);
      },
      removeAttach(fileType) {
        this.removeFileType = fileType;
        this.showConfirm = true;
      },
      confirmed() {
        console.log(this.post[this.removeFileType])
        if (this.post[this.removeFileType]) {
          this.$set('post.' + this.removeFileType, null);
          if (this.post.ID) {
            store.actions.editPost(this.post, () => {
              store.actions.loadPositionList();
              store.actions.loadPostTree();
            }, (error) => {
              this.$root.showTip({
                type: 'danger',
                msg: error,
                duration: 2000
              });
            });
          }
        }
      },
      postClicked(data) {
        this.post.parentID = data.ID;
        this.post.uppostName = data.postName;
      },
      postTypeClicked(data) {
        this.post.postType = data.ID;
        this.post.postTypeName = data.postType;
      },
      deptClicked(data) {
        this.post.organizeID = data.organizeID;
        this.post.organizeName = data.text;
      },
      close() {
        this.visibility = false
        this.post = {};
      }
    },
    events: {
      submitedCall() {
        if (this.post.minlevel && this.post.maxlevel) {
          var min = this.state.rankList.find((elem) => {
            return elem.ID == this.post.minlevel;
          });
          var max = this.state.rankList.find((elem) => {
            return elem.ID == this.post.maxlevel;
          });
          if (min.orderNum > max.orderNum) {
            this.$root.showTip({
              type: 'danger',
              msg: '最低职级应小于最高职级！请重新选择！',
              duration: 2000
            });
            return;
          }
        }
        if (this.post.ID) {
          if (this.post.ID == this.post.parentID) {
            this.$root.showTip({
              type: 'danger',
              msg: '上级岗位不能选择自身岗位！',
              duration: 2000
            });
            return;
          }
          store.actions.editPost(this.post, () => {
            store.actions.loadPositionList();
            store.actions.loadPostTree();
            this.visibility = false;
          }, (error) => {
            this.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          });
        } else {
          if (!this.post.parentID) this.post.parentID = -1;
          store.actions.addPost(this.post, () => {
            store.actions.loadPositionList(() => {
              this.$parent.$nextTick(() => {
                this.$parent.$refs.table.refresh();
              });
            });
            store.actions.loadPostTree();
            this.visibility = false;
          }, (error) => {
            this.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          });
        }
      },
      removeAttach(fileName) {
        this.post[fileName] = null;
      }
    },
    ready() {
      store.actions.loadDeptStoreTree();
      store.actions.loadRankList();
      store.actions.loadPostTypeTree();
      store.actions.loadDeptTree();
      store.actions.loadPostTree();
    }
};
</script>
<style lang="css" scoped>
.divider {
  height: 40px;
  line-height: 40px;
}

.divider div:nth-child(1) {
  text-align: center;
  position: absolute;
  left: 50%;
  width: 60px;
  margin-left: -25px;
  font-size: 12px;
  color: #737373;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}

.divider div:nth-child(2) {
  width: 100%;
  height: 21px;
  border-bottom: 1px dashed #737373;
}
</style>
