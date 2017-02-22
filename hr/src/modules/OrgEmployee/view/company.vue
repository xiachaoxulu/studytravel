<template>
  <div class="panel panel-default storedisplay">
    <div class="panel-heading">
      <h3 class="panel-title"> <strong>{{state.companyInfo.companyName}}</strong>
      </h3>
    </div>
    <div class="panel-body">
      <section class="ui-panel-content">
        <div class="mystatistics">
          <div class="mystatistic border">
            <div class="value">
              <span class="_link">{{state.companyInfo.storeCount}}</span>
            </div>
            <div class="mylabel">门店</div>
          </div>
          <div class="mystatistic border">
            <div class="value">
              <span class="_link">{{state.companyInfo.employeeCount}}</span>
            </div>
            <div class="mylabel">员工</div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import store from '../store'
export default {
  data() {
      return {
        state: store.state
      };
    },
    ready() {
      store.actions.getStoreEmployeeCount(() => {}, (error) => {
        this.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      })
    }
};
</script>
<style lang="css" scoped>
.storedisplay {
  margin: -10px;
  overflow: hidden;
}

.mystatistics {
  /*margin: 0em 0em -2em;*/
  display: flex;
}

.mystatistics .mystatistic:last-child {
  margin-bottom: 0em;
  border: none;
}

.mymstatistics .mystatistic:first-child {
  margin-top: 0em;
}

.mystatistic {
  min-width: 50%;
}

.mystatistic ._link {
  display: inline-block;
  cursor: pointer;
}

.mystatistic:hover ._link {
  animation-name: bounceIn2;
  animation-duration: .75s;
}

.mystatistic ._icon_detail {
  position: absolute;
  top: 10px;
  right: 0px;
  cursor: pointer;
  color: #666;
  border-radius: 5px;
  background: #e9eaed;
  width: 30px;
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  font-family: 'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif;
}

.mystatistic ._icon_detail:hover,
.mystatistic ._icon_detail:focus {
  background: #27c9b4;
  color: #fff;
  text-decoration: none;
}

.value {
  position: relative;
  font-size: 2.5rem;
  font-family: 'DINCond';
  font-weight: normal;
  line-height: 1em;
  text-transform: uppercase;
  text-align: center;
}

.value > .unit {
  font-size: 1.5rem;
  font-family: 'DINCond';
  font-weight: bold;
}

.mylabel {
  color: #787878;
  font-family: '微软雅黑';
  font-weight: normal;
  padding-top: 10px;
  padding: .2em .6em .3em;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: .25em;
}

.chart {
  margin: 50px -16px 0px -16px;
  /*width: 420px;*/
  height: 300px;
}
</style>
