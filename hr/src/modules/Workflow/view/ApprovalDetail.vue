<template>
  <div class="panel wrap">
    <div class="sub-box">
      <ui-avatar username="张三的" :size="80" style="float: left" background-color="#61dbcc"></ui-avatar>
      <div class="person">
        <div>曹哲</div>
        <div>新奥店 | 资深服务员</div>
        <div>7月27日 17:00</div>
      </div>
      <div class="clear-both"></div>
    </div>
    <div class="sub-box">
      <div class="sub-title">病假 (共计8天)</div>
      <div>开始时间：2016年7月28日 星期四</div>
      <div>结束时间：2016年8月08日 星期一</div>
    </div>
    <div class="sub-box">
      <div class="sub-title">审批情况</div>
      <div class="approval-timeline">
        <app-approval-timeline :display.sync="true" :list="appList"></app-approval-timeline>
      </div>
    </div>
    <div class="sub-box">
      <div class="sub-title">近期请假记录</div>
      <ui-scrollview>
        <div class="content">
          <div>
            <ui-collapse title="最近一个月请假3次，共计3天" no-border="approval-no-border" mt20="approval-mt-5">
              <div>
                <ul>
                  <li>1. 病假 请假1天 2016年7月1日9:00-18:00</li>
                  <li>2. 事假 请假2天 2016年7月2日9:00-7月3日18:00</li>
                </ul>
              </div>
            </ui-collapse>
            <ui-collapse title="最近一个月请假3次，共计3天" no-border="approval-no-border" mt20="approval-mt-5">
              <div>
                <ul>
                  <li>1. 病假 请假1天 2016年7月1日9:00-18:00</li>
                  <li>2. 事假 请假2天 2016年7月2日9:00-7月3日18:00</li>
                </ul>
              </div>
            </ui-collapse>
            <ui-collapse title="最近一个月请假3次，共计3天" no-border="approval-no-border" mt20="approval-mt-5">
              <div>
                <ul>
                  <li>1. 病假 请假1天 2016年7月1日9:00-18:00</li>
                  <li>2. 事假 请假2天 2016年7月2日9:00-7月3日18:00</li>
                </ul>
              </div>
            </ui-collapse>
            <ui-collapse title="最近一个月请假3次，共计3天" no-border="approval-no-border" mt20="approval-mt-5">
              <div>
                <ul>
                  <li>1. 病假 请假1天 2016年7月1日9:00-18:00</li>
                  <li>2. 事假 请假2天 2016年7月2日9:00-7月3日18:00</li>
                </ul>
              </div>
            </ui-collapse>
            <ui-collapse title="最近一个月请假3次，共计3天" no-border="approval-no-border" mt20="approval-mt-5">
              <div>
                <ul>
                  <li>1. 病假 请假1天 2016年7月1日9:00-18:00</li>
                  <li>2. 事假 请假2天 2016年7月2日9:00-7月3日18:00</li>
                </ul>
              </div>
            </ui-collapse>
            <ui-collapse title="最近一个月请假3次，共计3天" no-border="approval-no-border" mt20="approval-mt-5">
              <div>
                <ul>
                  <li>1. 病假 请假1天 2016年7月1日9:00-18:00</li>
                  <li>2. 事假 请假2天 2016年7月2日9:00-7月3日18:00</li>
                </ul>
              </div>
            </ui-collapse>
            <ui-collapse title="最近一个月请假3次，共计3天" no-border="approval-no-border" mt20="approval-mt-5">
              <div>
                <ul>
                  <li>1. 病假 请假1天 2016年7月1日9:00-18:00</li>
                  <li>2. 事假 请假2天 2016年7月2日9:00-7月3日18:00</li>
                </ul>
              </div>
            </ui-collapse>
            <ui-collapse title="最近一个月请假3次，共计3天" no-border="approval-no-border" mt20="approval-mt-5">
              <div>
                <ul>
                  <li>1. 病假 请假1天 2016年7月1日9:00-18:00</li>
                  <li>2. 事假 请假2天 2016年7月2日9:00-7月3日18:00</li>
                </ul>
              </div>
            </ui-collapse>
            <ui-collapse title="最近一个月请假3次，共计3天" no-border="approval-no-border" mt20="approval-mt-5">
              <div>
                <ul>
                  <li>1. 病假 请假1天 2016年7月1日9:00-18:00</li>
                  <li>2. 事假 请假2天 2016年7月2日9:00-7月3日18:00</li>
                </ul>
              </div>
            </ui-collapse>
          </div>
        </div>
      </ui-scrollview>
    </div>
    <div class="footer">
      <div>
        <ui-button>同意</ui-button>
      </div>
      <div>
        <ui-button>驳回</ui-button>
      </div>
      <div>
        <ui-button>转审</ui-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      appList: [{
        ID: '1',
        Name: '张三',
        Photo: '/static/avatar.c8999e7.png',
        Time: '04-28 09:00',
        isApproved: true
      }, {
        ID: '1',
        Name: '张三',
        Photo: '/static/avatar.c8999e7.png',
        Time: '04-28 09:00',
        isApproved: true
      }, {
        ID: '1',
        Name: '张三',
        Photo: '/static/avatar.c8999e7.png',
        Time: '04-28 09:00',
        isApproved: true
      }, {
        ID: '1',
        Name: '张三',
        Photo: '/static/avatar.c8999e7.png',
        Time: '04-28 09:00',
        isApproved: true
      }]
    };
  }
};
</script>
<style lang="css" scoped>
.wrap {
  padding-top: 24px;
}

.person {
  float: left;
  padding-left: 24px;
}

.person > div:nth-child(1) {
  font-size: 22px;
}

.person > div:nth-child(2) {
  height: 24px;
  line-height: 24px;
}

.person > div:nth-child(2) {
  height: 24px;
  line-height: 24px;
}

.detail > div:nth-child(n+2) {
  height: 24px;
  line-height: 24px;
}

.approval-timeline {
  height: 120px;
  position: relative;
}

.sub-box {
  margin-left: 24px;
  margin-right: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e5e6ea;
}

.sub-title {
  font-size: 17px;
  font-weight: bold;
  height: 37px;
  line-height: 37px;
}

.footer {
  padding-bottom: 24px;
  padding-top: 24px;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #fff;
}

.footer > div {
  float: left;
  padding-left: 5px;
  padding-right: 5px;
}

.footer > div:nth-child(1) {
  padding-left: 58px;
}

.footer .ui-button {
  min-width: 98px;
  width: 98px;
}
</style>
<style lang="css">
.approval-no-border {
  border: none !important;
}

.approval-no-border .ui-collapse-info-tit-icon {
  width: 0;
  margin-right: 0;
}

.approval-no-border .ui-collapse-info-tit-name {
  font-size: 13px;
}

.approval-no-border .ui-collapse-info-list {
  font-size: 12px;
  padding-left: 16px;
}

.approval-mt-5 {
  margin-top: 5px !important;
  padding: 0 !important;
}
</style>
