 <template>
  <div class="wrap">
    <header class="ui-module-navbar pos-topbar-fixed">
      <div class="ui-module-navbar-content">
        <div class="pull-left title">
          <h4><strong>安全设置</strong></h4>
        </div>
        <div class="pull-left emp-center-tab">
          <ui-buttongroup active-class="btn-primary">
            <button type="button" class="btn  btn-primary" @click="operatorLog">操作日志</button>
            <button type="button" class="btn  btn-default" @click="setting">安全设置</button>
          </ui-buttongroup>
        </div>
      </div>
    </header>
    <div class="wrap-content">
      <components :is="bigwhat" v-if="bigdymicshow">
      </components>
    </div>
  </div>
</template>
<script>
import store from '../store'
import operatorLog from './operatorLog'
import setting from './setting'
export default {
  data() {
      return {

        bigdymicshow: true,
        bigwhat: 'operatorLog',
      };
    },
    components: {
      operatorLog,
      setting
    },
    methods: {
      operatorLog() {
        if (this.bigwhat != "operatorLog") {
          this.bigwhat = 'operatorLog';
        }
      },
      setting(){
        if (this.bigwhat != "setting") {
          this.bigwhat = 'setting';
        }
      }
    }
};
</script>
<style lang="css" scoped>
.vacation-right {
  margin-right: 30px;
}

.title {
  margin-right: 20px;
}

.wrap,
.wrap-content {
  height: 100%;
  background: #fff;
}

.wrap-content {
  position: relative;
  padding: 10px;
}

.testtable {
  left: 10px;
  right: 10px;
  top: 10px;
  bottom: 10px;
}
</style>
