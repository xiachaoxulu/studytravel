<template>
    <div>
        <!-- <router-view class="view" transition="main" transition-mode="out-in"></router-view> -->
           <components :is="bigwhat" v-if="bigdymicshow" >
              </components>
    </div>
</template>
<script>
import store from '../store';
import healthCardWarning from './healthCardWarning';
import monthCheckWorkWarning from './monthCheckWorkWarning';
import dayCheckWorkWarning from './dayCheckWorkWarning';
import countOvertimeWarning from './countOvertimeWarning';
import countOvertimeLimit from './countOvertimeLimit';
export default {
    data() {
            return {
                state: store.state,
                bigdymicshow:true,
                bigwhat:'',
            };
        },
        components: {
            healthCardWarning,
            monthCheckWorkWarning,
            dayCheckWorkWarning,
            countOvertimeWarning,
            countOvertimeLimit
        },
        ready() {
            this.bigwhat=this.state.carePageID;
            // this.bigdymicshow=true;
            // this.$router.go('./' + this.state.carePageID);
        }
};
</script>
<style lang="css" scoped>
</style>
