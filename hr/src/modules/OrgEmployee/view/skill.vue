<template>
  <header class="ui-module-navbar pos-topbar-fixed">
    <div class="ui-module-navbar-content">
      <div class="pull-left">
        <h4><strong>管理技能</strong></h4>
      </div>
    </div>
  </header>
  <div class="ui-panel ui-module-row">
    <ui-table height="auto" class="com-table-wrap">
      <template slot="headerNormal">
        <table class="table table-bordered">
          <colgroup>
            <col width="100px" />
            <col width="300px" />
            <col width="300px" />
            <col width="50px" />
          </colgroup>
          <thead>
            <tr>
              <th>技能名称</th>
              <th>技能等级</th>
              <th>级别</th>
              <th></th>
            </tr>
          </thead>
        </table>
      </template>
      <template slot="bodyNormal">
        <table class="table table-bordered">
          <colgroup>
            <col width="100px" />
            <col width="300px" />
            <col width="300px" />
            <col width="50px" />
          </colgroup>
          <tbody>
            <template v-for="skill in state.skillList">
              <template v-if="skill.skilllevelList.length>0">
                <tr v-for="level in skill.skilllevelList">
                  <td v-if="level == skill.skilllevelList[0]" rowspan="{{skill.skilllevelList.length+1}}" class="col-title">
                    {{skill.skillName}}</td>
                  <td>{{level.skillName}}</td>
                  <td>{{level.skillLevel}}</td>
                  <td><a href="javascript:void(0)" @click="removeLevel(level.ID)" _x_xxcode="org-skill-remove/删除" v-if="$root.checkAuthorityByID('org-skill-remove')">删除</a></td>
                </tr>
                <tr>
                  <td colspan="3"><a href="javascript:void(0)" @click="addLevel(skill.ID)" _x_xxcode="org-skill-addlevel/+添加等级" v-if="$root.checkAuthorityByID('org-skill-addlevel')">+添加等级</a></td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td class="col-title">{{skill.skillName}}</td>
                  <td colspan="2"><a href="javascript:void(0)" @click="addLevel(skill.ID)" _x_xxcode="org-skill-addlevel/+添加等级" v-if="$root.checkAuthorityByID('org-skill-addlevel')">+添加等级</a></td>
                  <td><a href="javascript:void(0)" @click="removeSkill(skill.ID)">删除</a></td>
                </tr>
              </template>
            </template>
            <tr>
              <td class="col-title"><a href="javascript:void(0)" @click="addSkill()" style="color: #eb2526" _x_xxcode="org-skill-addskillname/+添加技能名称" v-if="$root.checkAuthorityByID('org-skill-addskillname')">+添加技能名称</a></td>
              <td colspan="3"></td>
            </tr>
          </tbody>
        </table>
      </template>
      <!--  <template slot="footer">
        <div class="ui-table-pager-content text-center">
          <ui-button class="large" color="success">提交</ui-button>
        </div>
      </template> -->
    </ui-table>
  </div>
  <skill-name :visibility.sync="showSkillEdit" :skill.sync="skill"></skill-name>
  <skill-level :visibility.sync="showLevelEdit" :level.sync="level"></skill-level>
</template>
<script>
import store from '../store.js'
import skillName from './skillName'
import skillLevel from './skillLevel'
export default {
  data() {
      return {
        state: store.state,
        skill: {},
        level: {},
        showSkillEdit: false,
        showLevelEdit: false
      };
    },
    methods: {
      addSkill() {
        store.actions.clearSkill();
        this.skill = {};
        this.showSkillEdit = true;
      },
      addLevel(skillID) {
        store.actions.clearSkillLevel();
        this.level = {
          skillID: skillID
        };
        this.showLevelEdit = true;
      },
      removeSkill(skillID) {
        let me = this;
        store.actions.removeSkill(skillID, (data) => {
          store.actions.loadSkillList();
        }, (error) => {
          me.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      },
      removeLevel(levelID) {
        let me = this;
        store.actions.removeSkillLevel(levelID, (data) => {
          store.actions.loadSkillList();
        }, (error) => {
          me.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      }
    },
    ready() {
      store.actions.loadSkillList();
    },
    components: {
      skillName,
      skillLevel
    }
};
</script>
<style lang="css" scoped>
.col-title {
  background-color: #9096a6;
  color: #fff;
  border: 1px solid #6d6f7c !important;
}

.col-title:hover {
  background-color: #9096a6;
  color: #fff;
}
</style>
