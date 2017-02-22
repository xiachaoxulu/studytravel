<template>
  <div v-show="display" class="approval-list" :style="{ top: parentLocY+'px', left: parentLocX+'px' }">
    <div v-for="(index, item) in list">
      <div>
        <div :class="{ 'approved': item[approvalProp], 'not-approved': item[approvalProp] }">
          <i class="ui-icon, material-icons">{{item[approvalProp] ? "check" : "clear"}}</i></div>
        <div><img :src="item[photoUrl]" :alt="item[nameProp]"></div>
        <div>{{item[nameProp]}}</div>
        <div>{{{item[timeProp]}}}</div>
      </div>
      <div v-if="index != list.length-1" class="approval-line"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
      return {

      };
    },
    props: {
      display: {
        type: Boolean,
        twoWay: true,
        default: false
      },
      list: {
        type: Array,
        default: []
      },
      idProp: {
        type: String,
        default: 'ID'
      },
      nameProp: {
        type: String,
        default: 'Name'
      },
      photoUrl: {
        type: String,
        default: 'Photo'
      },
      timeProp: {
        type: String,
        default: 'Time'
      },
      approvalProp: {
        type: String,
        default: 'isApproved'
      },
      parentLocX: {
        type: Number,
        default: 0
      },
      parentLocY: {
        type: Number,
        default: 0
      }
    }
};
</script>
<style lang="css" scoped>
.approval-list {
  position: absolute;
  z-index: 9999;
  background-color: #fff;
  white-space: nowrap;
  overflow-x: auto;
  right: 0;
}

.approval-list > div {
  display: inline-block;
  width: 75px;
  text-align: center;
  white-space: normal;
}

.approval-list > div > div:nth-child(3) {
  margin-top: 10px;
  font-size: 14px;
}

.approval-list > div > div:nth-child(4) {
  margin-top: 15px;
  color: #878787;
  font-size: 10px;
}

.approval-list i {
  font-size: 10px;
  font-weight: bold;
}

.approved {
  color: #0fd286;
}

.not-approved {
  color: #0fd286;
}

.approval-list img {
  border-radius: 50%;
  height: 36px;
  width: 36px;
}

.approval-line {
  width: 30px;
  border-bottom: 1px solid #cdced3;
  position: relative;
  top: -80px;
  left: 60px;
}
</style>
