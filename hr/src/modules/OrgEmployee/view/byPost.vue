<template>
  <section class="ui-module-content pos-content">
    <div class="ui-module-row pos-fullHeight">
      <div class="com-col-m1-left ui-panel">
        <ui-scrollview>
          <ui-tree :data="state.postTree" :root="state.postTree" idprop="ID" textprop="postName" :nodeclicked="postClicked" :rootvisible="false"></ui-tree>
        </ui-scrollview>
      </div>
      <div class="com-col-m1-middle ui-panel">
        <employee-list :employeeclicked="employeeClicked"></employee-list>
      </div>
      <div class="com-col-m1-right ui-panel">
        <div slot="content" style="margin:-10px;">
          <post v-if="postID!=null" :ID="postID"></post>
        </div>
      </div>
      <ui-sidebar :show.sync="showSidebar " title="划入栏 " layout="content">
        <div slot="content">
          <components :is="what" v-if="showSidebar" :userid="userid" :userinfocallback="userinfocallback">
        </div>
      </ui-sidebar>
      <components :is="modalwhat" :display.sync="showteam" :employee-id="editId" :ids="ids" v-if="showteam"></components>
    </div>
  </section>
</template>
<script>
import store from '../store'
import employeeList from './employeePostList'
import post from './post'
import userInfo from './userInfo'
import batchZhuanForm from './batchZhuanForm'
import batchLiForm from './batchLiForm'
import batchHeiForm from './batchHeiForm'
import addEmployee from './addEmployee'
import batchTransaction from './batchTransaction'


export default {
  data() {
      return {
        modalwhat: '',
        showteam: false,
        editId: '',
        ids: [],

        state: store.state,
        showSidebar: false,
        postID: null
      };
    },
    ready() {
      store.actions.loadPostTree();
    },
    components: {
      employeeList,
      post,
      userInfo,
      addEmployee,
      batchZhuanForm,
      batchLiForm,
      batchHeiForm,
      batchTransaction
    },
    methods: {

      userinfocallback(data, type) {



        if (type == "edit") {
          this.editId = data + '';
          this.modalwhat = 'addEmployee';
        }
        if (type == "blacklist") {
          this.ids.push(data);
          this.modalwhat = 'batchHeiForm';
        }
        if (type == "transaction") {
          this.ids.push(data);
          this.modalwhat = 'batchTransaction';
        }
        if (type == "dimission") {
          this.ids.push(data);
          this.modalwhat = 'batchLiForm';
        }
        if (type == "office") {
          this.ids.push(data);
          this.modalwhat = 'batchZhuanForm';
        }
        this.showteam = true;
      },
      employeeClicked(empID) {
        this.userid = empID;
        this.$data.showSidebar = true;
        this.what = 'userInfo'
      },
      postClicked(data) {
        if (!data.ID || data.ID == -1) return;
        this.postID = data.ID;
        store.actions.loadEmployeeByPostList(data.ID, () => {}, (error) => {
          this.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      }
    }

};
</script>
<style lang="css" scoped>
</style>
