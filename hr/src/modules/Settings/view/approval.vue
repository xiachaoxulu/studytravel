<!--
* @Created Date       : 2016-11-17T17:39:18+08:00
* @Last Modified time : 2016-12-02T17:05:59+08:00
 -->


<template>
  <header class="ui-module-navbar pos-topbar-fixed">
    <div class="ui-module-navbar-content">
      <div class="pull-left">
        <h4><strong>审批设置</strong></h4>
      </div>
      <!-- <div class="pull-left search">
        <ui-search class="ui-search" placeholder="输入业务名称" :value.sync="approvalName" :search-callback="cbSearchApproval"></ui-search>
      </div> -->
    </div>
  </header>
  <section class="ui-module-content ui-panel">
    <div class="approval-add">
      <div class="pull-right">
        <a href="javascript:void(0)" __code="config-workflow-addrule/添加" @click="toEditWorkflow('add')">
          <i class="icon-tool icon-tool-add"></i><span>添加</span>
        </a>
      </div>
    </div>
    <div class="content">
      <ui-scrollview>
        <div>
          <template v-for="setting in state.approvalSettingList">
            <ui-collapse :title="setting.name" :toggle="true" icon-close="keyboard_arrow_right" class="approval-list-mt-none approval-list-no-border">
              <ul>
                <li v-for="item in setting[setting.code]">
                  <div ><span class="serial">{{$index+1}}</span></div>
                  <div @click="toEditWorkflow('show',item)" style="cursor:pointer;">
                      <span class="approval-name">{{item.workflowName}}</span>
                  </div>
                  <div @click="toEditWorkflow('show',item)" style="cursor:pointer;" class="approval-fill">
                      <i class="icon-tool icon-tool-infooutline"></i>
                    <!-- <v-dropdown trigger="hover">
                      <div data-toggle="dropdown">
                        <i class="ui-icon material-icons">info_outline</i></div>
                      <div slot="dropdown-menu" class="dropdown-menu" style="padding:10px;">
                        暂无信息
                      </div>
                    </v-dropdown> -->
                  </div>
                  <div class="approval-valid">{{item.valid==1 ? '启用中' : '停用'}}</div>
                  <div class="approval-fill">
                    <ui-switch name="s1" :value.sync="item.valid | itemValid item" checked style="width:40px;"></ui-switch>
                  </div>
                  <div>
                    <a href="javascript:void(0)"  __code="config-workflow-edit/修改" v-if="$root.checkAuthorityByID('config-workflow-addrule')" @click="toEditWorkflow('update',item)">
                      <span class="icon icon-tool icon-tool-edit pull-left"></span><span class="edit">修改</span>
                    </a>
                  </div>
                </li>
              </ul>
            </ui-collapse>
          </template>
          <!--  <ui-collapse title="组织和员工" :toggle="true" icon-close="keyboard_arrow_right" class="approval-list-mt-none approval-list-no-border">
            <ul>
              <li>
                <div><span class="serial">1</span></div>
                <div><span class="approval-name">员工入职</span></div>
                <div class="approval-fill">
                  <v-dropdown trigger="hover">
                    <div data-toggle="dropdown">
                      <i class="ui-icon material-icons">info_outline</i></div>
                    <div slot="dropdown-menu" class="dropdown-menu">
                      审批列表
                    </div>
                  </v-dropdown>
                </div>
                <div>启用中</div>
                <div class="approval-fill">
                  <ui-switch name="s1" :value.sync="true" checked></ui-switch>
                </div>
                <div>
                  <a href="javascript:void(0)">
                    <span class="icon icon-tool icon-tool-edit pull-left"></span><span class="edit">修改</span>
                  </a>
                </div>
              </li>
              <li>
                <div><span class="serial">1</span></div>
                <div><span class="approval-name">员工入职</span></div>
                <div class="approval-fill">
                  <v-dropdown trigger="hover">
                    <div data-toggle="dropdown">
                      <i class="ui-icon material-icons">info_outline</i></div>
                    <div slot="dropdown-menu" class="dropdown-menu">
                      审批列表
                    </div>
                  </v-dropdown>
                </div>
                </v-dropdown>
                <div>启用中</div>
                <div class="approval-fill">
                  <ui-switch name="s1" :value.sync="true" checked></ui-switch>
                </div>
                <div>
                  <a href="javascript:void(0)">
                    <span class="icon icon-tool icon-tool-edit pull-left"></span><span class="edit">修改</span>
                  </a>
                </div>
              </li>
            </ul>
          </ui-collapse>
          <div class="divider"></div>
          <ui-collapse title="组织和员工" :toggle="true" icon-close="keyboard_arrow_right" class="approval-list-mt-none approval-list-no-border">
            <ul>
              <li>
                <div><span class="serial">1</span></div>
                <div><span class="approval-name">员工入职</span></div>
                <div class="approval-fill">
                  <v-dropdown trigger="hover">
                    <div data-toggle="dropdown">
                      <i class="ui-icon material-icons">info_outline</i></div>
                    <div slot="dropdown-menu" class="dropdown-menu">
                      审批列表
                    </div>
                  </v-dropdown>
                </div>
                <div>启用中</div>
                <div class="approval-fill">
                  <ui-switch name="s1" :value.sync="true" checked></ui-switch>
                </div>
                <div>
                  <a href="javascript:void(0)">
                    <span class="icon icon-tool icon-tool-edit pull-left"></span><span class="edit">修改</span>
                  </a>
                </div>
              </li>
              <li>
                <div><span class="serial">1</span></div>
                <div><span class="approval-name">员工入职</span></div>
                <div class="approval-fill">
                  <v-dropdown trigger="hover">
                    <div data-toggle="dropdown">
                      <i class="ui-icon material-icons">info_outline</i></div>
                    <div slot="dropdown-menu" class="dropdown-menu">
                      审批列表
                    </div>
                  </v-dropdown>
                </div>
                </v-dropdown>
                <div>启用中</div>
                <div class="approval-fill">
                  <ui-switch name="s1" :value.sync="true" checked></ui-switch>
                </div>
                <div>
                  <a href="javascript:void(0)">
                    <span class="icon icon-tool icon-tool-edit pull-left"></span><span class="edit">修改</span>
                  </a>
                </div>
              </li>
            </ul>
          </ui-collapse> -->
        </div>
      </ui-scrollview>
    </div>
  </section>
  <!-- 编辑工作流 -->
  <ui-sidecontent :show.sync="editWorkflowShow">
    <edit-workflow v-ref:editworkflow v-if="editWorkflowShow" @back="backTolist"></edit-workflow>
  </ui-sidecontent>

</template>
<script>
import store from '../store'
import editWorkflow from './edit_workflow'
export default {
  data() {
      return {
        state: store.state,
        editWorkflowShow:false,
        cancelSwitch:false, // 取消workflow valid 的改变
      }
    },
    components:{
        editWorkflow
    },
    filters: {

        itemValid:{
            read(val){
                return !!val;
            },
            write(newVal,oldVal,workflow){

                if(this.cancelSwitch){
                    this.cancelSwitch = false;
                    return !!newVal;
                }

                if(!newVal){

                    this.$root.showConfirm({
                        msg:`${workflow.busName}工作流【${workflow.workflowName}】不再进行审批操作？`,
                        textOK:'确认',
                        textCancel:'取消',
                        ok:()=>{
                            this.updateWorkflowValid(workflow,newVal);
                        },
                        cancel:()=>{
                            this.cancelSwitch = true;
                            workflow.valid = !!oldVal;
                        }
                    })
                    return !!newVal;
                }

                this.updateWorkflowValid(workflow,newVal);

                return !!newVal;
            }
        }
    },
    methods: {
      cbSearchApproval(val) {},
        // 开启or关闭工作流
      updateWorkflowValid(workflow,valid){
          console.log(workflow)
          store.actions.validApprovalSetting(workflow.ID, valid ? 1 : 0, () => {
            this.$root.showTip({
              type: 'info',
              msg: '操作成功！',
              duration: 2000
            });
          }, (error) => {
            this.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
            store.actions.loadApprovalSettingList(null, (error) => {
              this.$root.showTip({
                type: 'danger',
                msg: error,
                duration: 2000
              });
            });
          });
      },
        // 加载数据
      loadWorkflowList(){
          store.actions.loadApprovalSettingList(() => {
            console.log(this.state.approvalSettingList)
          });

      },

        // 从配置页返回该列表页
        backTolist(){
            this.editWorkflowShow=false;
            this.loadWorkflowList();
        },


        //   添加，编辑工作流
      toEditWorkflow(type,workflow) {
        this.editWorkflowShow = true;
        setTimeout(()=>{
            this.$refs.editworkflow.editType=type;
            // 添加工作流
            if(type==='add'){
                this.$refs.editworkflow.addWorkflow();
            }
            else if(type==='show'){
                workflow = workflow || {};
                this.$refs.editworkflow.loadWorkflow(workflow.ID);
            }
            else if(type==='update'){
                workflow = workflow || {};
                this.$refs.editworkflow.loadWorkflow(workflow.ID);
            }
        },100)
      }
    },
    ready() {

        this.loadWorkflowList();

      /* 加载公用数据 */

      // 组织数据
      store.actions.loadDeptStoreTree(data => {
          store.mutations.SetCommonData('orgWithTeam',data);
      }, error=> {
          this.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
          });
      });

        // 加载岗位树
        store.actions.loadCommonPostTree(data => {
            console.log('postTree',data)
            store.mutations.SetCommonData('postTree',data);
        }, error=> {
            this.$root.showTip({
                type: 'danger',
                msg: error,
                duration: 2000
            });
        });


      // 字典项
      // 加载字典项 —— 业务类型
      store.actions.getSystemCode('codeBus','147000');

    }
};
</script>
<style lang="css" scoped>
.search {
  margin-left: 24px;
}

.approval-add {
  padding-right: 24px;
}

.approval-add i {
  position: relative;
  display: inline-block;
  font-size: 12px;
  text-align: right;
  color: #fd6d5a;
  /*top: 7px;*/
}

.content {
  position: absolute;
  top: 120px;
  left: 24px;
  right: 24px;
  bottom: 24px;
}

.content li {
  line-height: 60px;
  display: flex;
  height: 60px;
  font-weight: bold;
}

.content li:hover {
  background-color: #f2f3f5;
}

.content li > div {
  padding-right: 24px;
  padding-left: 24px;
}

.serial {
  display: inline-block;
  text-align: center;
  font-weight: bold;
  background-color: #e5e5e5;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
}

.approval-name {
  display: block;
  width: 180px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.approval-fill {
  flex: 1;
}

.approval-fill .ui-switch {
  height: 60px;
}

.approval-valid {
  width: 100px;
  text-align: center;
}

.divider {
  margin-top: 24px;
}
</style>
<style lang="css">
.approval-list-no-border {
  border: none !important;
}

.approval-list-no-border .ui-collapse-info-tit-icon {
  width: 0;
  margin-right: 0;
}

.approval-list-no-border .ui-collapse-info-tit-name {
  font-size: 16px;
  font-weight: 600;
}

.approval-list-no-border .ui-dropdown.dropdown-group {
  height: 24px;
  line-height: 24px;
  vertical-align: middle;
}

.approval-list-no-border .icon.icon-tool.icon-tool-edit.pull-left {
  line-height: 60px;
  height: 60px;
  vertical-align: middle;
}

.approval-list-mt-none {
  padding: 0 !important;
}

.approval-list-mt-none .ui-collapse-info-more {
  float: left;
}

.approval-list-mt-none .ui-collapse-info-list {
  padding-top: 10px;
}
.approval-list-mt-none .ui-collapse-info-list a{
    color: #666;
}
.approval-list-mt-none .ui-collapse-info-list a:hover{
    color: #fd6d5a;
    text-decoration: none;
}
</style>
