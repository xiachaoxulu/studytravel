<template>
  <div class="paymentSubview">
    <div class="paymentStatus">
      <div class="pull-left">
        <ui-buttongroup active-class="btn-primary">
          <button type="button" class="btn btn-primary" @click="what='paymentRank'">职级工资</button>
          <button type="button" class="btn btn-default" @click="what='paymentPost'">岗位工资</button>
        </ui-buttongroup>
      </div>
    </div>
    <components :is="what">
    </components>
  </div>
</template>
<script>
import paymentRank from './paymentRank'
import paymentPost from './paymentPost'
export default {
  data() {
    return {
      what: 'paymentRank'
    };
  },
  components: {
  	paymentRank, 
  	paymentPost
  }
};
</script>
<style lang="css" scoped>
</style>
