<template>
  <div class="panel wrap">
    <div class="title">
      <div>新增待审批（{{pendingRecentCount}}）</div>
      <div __code="workflow-approval-pending-viewall/查看所有审批">
        <ui-button @click="getApprovalAll">查看所有审批</ui-button>
      </div>
    </div>
    <ui-scrollview>
      <div class="content">
        <ul class="approval-pending-list">
          <li v-for="item in state.approvalPendingList" @click="getApprovalDetail(item.wkId)">
            <ui-checkbox :value.sync="approvalChecked[$index]">{{item.title}}</ui-checkbox>
            <div v-if="item.flag==1" class="dot"></div>
            <div>
              {{item.date}}
            </div>
            <div class="text" title="{{item.text}}">
              {{item.text}}
            </div>
          </li>
        </ul>
      </div>
    </ui-scrollview>
    <div class="footer">
      <div>
        <ui-checkbox :value.sync="checkAll">全选</ui-checkbox>
      </div>
      <div __code="workflow-approval-pending-approve/同意">
        <ui-button class="accent" @click="resolve">同意</ui-button>
      </div>
      <div __code="workflow-approval-pending-reject/驳回">
        <ui-button class="accent" @click="reject">驳回</ui-button>
      </div>
      <!-- <div>
        <ui-button class="accent" @click="transfer">转审</ui-button>
      </div> -->
    </div>
    <ui-sidebar :show.sync="showApprovalDetail" title="详情" layout="header-content">
      <div slot="content">
        <approval-detail></approval-detail>
      </div>
    </ui-sidebar>
    <approval-resolve :display.sync="showApprovalResolve" :card-id="cardId" :wkid.sync="resolveIDs"></approval-resolve>
    <approval-reject :display.sync="showApprovalReject" :card-id="cardId" :wkid.sync="rejectID"></approval-reject>
    <approval-transfer :display.sync="showApprovalTransfer" :card-id="cardId" :wkid.sync="transferID"></approval-transfer>
  </div>
</template>
<script>
import store from '../store'
import approvalDetail from './ApprovalDetail'
import approvalResolve from './ApprovalResolve'
import approvalReject from './ApprovalReject'
import approvalTransfer from './ApprovalTransfer'

export default {
  data() {
      return {
        state: store.state,
        checkAll: false,
        approvalChecked: [],
        showApprovalDetail: false,
        showApprovalResolve: false,
        showApprovalReject: false,
        showApprovalTransfer: false,
        resolveIDs: null,
        rejectID: null,
        transferID: null
      };
    },
    props: {
      // 加 CardId 以便在审批同意、驳回等操作后回传给主界面刷新待审批卡片
      cardId: {
        type: String
      }
    },
    computed: {
      pendingRecentCount: function() {
        return this.state.approvalPendingList.reduce(function(total, x) {
          return x.flag == 1 ? total + 1 : total
        }, 0);
      }
    },
    watch: {
      'checkAll': function(val) {
        for (let i = 0; i < this.state.approvalPendingList.length; i++) {
          this.approvalChecked.$set(i, val);
        }
      }
    },
    events: {
      refreshApprovalList() {
        for (let i = this.approvalChecked.length; i > this.state.approvalPendingList.length; i--) {
          this.approvalChecked.$remove(this.approvalChecked[i]);
        }
        for (let i = 0; i < this.state.approvalPendingList.length; i++) {
          this.approvalChecked.$set(i, false);
        }
      }
    },
    methods: {
      getApprovalDetail(wkId, e) {
        // console.log(wkId);
        // console.log(e);
        // this.showApprovalDetail = true;
      },
      resolve() {
        let hasChosen = true;
        let chosenIDs = [];
        if (this.approvalChecked.length <= 0) {
          hasChosen = false;
        } else {
          this.approvalChecked.forEach((item, idx) => {
            if (item === true) {
              chosenIDs.push(this.state.approvalPendingList[idx].wkId);
              hasChosen = true;
            }
          });
        }
        if (!hasChosen) {
          this.$root.showTip({
            type: 'danger',
            msg: "请先选择要审批的记录！",
            duration: 2000
          });
          return;
        }

        this.resolveIDs = chosenIDs;
        this.showApprovalResolve = true;
      },
      reject() {
        let hasChosen = true;
        let chosenIDs = [];
        if (this.approvalChecked.length <= 0) {
          hasChosen = false;
        } else {
          this.approvalChecked.forEach((item, idx) => {
            if (item === true) {
              chosenIDs.push(this.state.approvalPendingList[idx].wkId);
              hasChosen = true;
            }
          });
        }
        if (!hasChosen) {
          this.$root.showTip({
            type: 'danger',
            msg: "请先选择要驳回的记录！",
            duration: 2000
          });
          return;
        }

        this.rejectID = chosenIDs;
        this.showApprovalReject = true;
      },
      transfer() {
        let hasChosen = true;
        let chosenIDs = [];
        if (this.approvalChecked.length <= 0) {
          hasChosen = false;
        } else {
          this.approvalChecked.forEach((item, idx) => {
            if (item === true) {
              chosenIDs.push(this.state.approvalPendingList[idx].wkId);
              hasChosen = true;
            }
          });
        }
        if (!hasChosen) {
          this.$root.showTip({
            type: 'danger',
            msg: "请先选择要转审的记录！",
            duration: 2000
          });
          return;
        }

        this.transferID = chosenIDs;
        this.showApprovalTransfer = true;
      },
      getApprovalAll() {
        this.$root.openFn('tab', '/Workflow/Pending', '审批');
      }
    },
    ready() {
      store.actions.loadApprovalPendingList((data) => {
        this.$dispatch('refreshCardSlideTitle', "全部待审批（" + this.state.approvalPendingList.length + "）", ['allcount', 'pcount']);
      });
    },
    components: {
      approvalDetail,
      approvalResolve,
      approvalReject,
      approvalTransfer
    }
};
</script>
<style lang="css" scoped>
.wrap {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.title {
  display: flex;
  padding: 24px;
  font-size: 16px;
}

.title>div:nth-child(1) {
  flex: 1;
  font-weight: bold;
  margin-top: 10px;
}

.content {
  margin-left: 24px;
  margin-right: 24px;
  margin-bottom: 150px;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
}

.text {
  overflow: hidden;
}

.dot {
  float: right;
  margin-right: 19px;
  margin-top: 4px;
  border-radius: 4px;
  border: 4px solid #ff312b;
  width: 4px;
  height: 4px !important;
}

.content ul li {
  padding-top: 19px;
  padding-bottom: 19px;
  padding-left: 22px;
  border-bottom: 1px solid #e5e5e5;
  font-weight: 600;
}


/*
.content ul li:hover {
  cursor: pointer;
  background-color: #f2f3f5;
}*/

.content ul li div {
  height: 25px;
  line-height: 25px;
}

.footer {
  padding-bottom: 24px;
  padding-top: 24px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding-left: 50px;
}

.footer > div {
  float: left;
  padding-left: 12px;
  padding-right: 12px;
}

.footer > div:nth-child(1) {
  position: relative;
  top: 10px;
  left: 12px;
}

.footer .ui-button {
  min-width: 80px;
  width: 80px;
}

.ui-checkbox {
  font-weight: 600;
}
</style>
<style>
.approval-pending-list .ui-checkbox {
  margin-bottom: 0;
}
</style>
