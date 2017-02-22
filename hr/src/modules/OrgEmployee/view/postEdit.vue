<template>
  <div class="ui-module">
    <header class="ui-module-navbar pos-topbar-fixed">
      <app-modulenavbar :show="showNavbar">
        <div class="pull-left">
          <a href="javascript:void(0)">
            &lt;返回 </a>
              <span>岗位修改</span>
        </div>
        <div class="pull-right">
          <button type="button" class="btn btn-default">保存</button>
        </div>
      </app-modulenavbar>
    </header>
    <section class="ui-module-content pos-content">
      <div class="ui-module-row pos-fullHeight">
        <table class="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>职位</th>
              <th>岗位</th>
              <th>职级</th>
              <th>组织</th>
              <th>上级岗位</th>
              <th>岗位分类</th>
              <th>定编</th>
              <th>在岗</th>
              <th>缺编</th>
              <th>岗位说明书</th>
              <th>岗位职责</th>
              <th>任职要求</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>岗位名称</td>
              <td>店经理</td>
              <td>
                <select class="form-control">
                  <option value="1">职级1</option>
                  <option value="2">职级2</option>
                  <option value="3">职级3</option>
                  <option value="4">职级4</option>
                  <option value="5">职级5</option>
                </select>
              </td>
              <td>
                <v-dropdown>
                  <button type="button" class="btn btn-default" data-toggle="dropdown">
                    选择组织
                    <span class="caret"></span>
                  </button>
                  <div slot="dropdown-menu" class="dropdown-menu">
                    <ui-tree :data="departmentTree"> </ui-tree>
                  </div>
                </v-dropdown>
              </td>
              <td>
                <v-dropdown>
                  <button type="button" class="btn btn-default" data-toggle="dropdown">
                    上级岗位
                    <span class="caret"></span>
                  </button>
                  <div slot="dropdown-menu" class="dropdown-menu">
                    <ui-tree :data="postTree"> </ui-tree>
                  </div>
                </v-dropdown>
              </td>
              <td>
                <v-dropdown>
                  <button type="button" class="btn btn-default" data-toggle="dropdown">
                    岗位分类
                    <span class="caret"></span>
                  </button>
                  <div slot="dropdown-menu" class="dropdown-menu">
                    <ui-tree :data="postTypeTree"></ui-tree>
                  </div>
                </v-dropdown>
              </td>
              <td>5人</td>
              <td>2人</td>
              <td>3人</td>
              <td>+添加</td>
              <td>+添加</td>
              <td>+添加</td>
              <td>删除</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
<script>
import store from '../store'
export default {
  data() {
      return {
        showNavbar: false,
        selected1: null,
        departmentTree: {
          id: 1,
          text: '总公司',
          expanded: true,
          children: [{
            id: 2,
            text: '人事部'
          }, {
            id: 3,
            text: '北京一区',
            children: [{
              id: 4,
              text: '新奥店'
            }, {
              id: 5,
              text: '北辰店'
            }]
          }]
        },
        postTree: {
          id: 1,
          text: '总经理',
          expanded: true,
          children: [{
            id: 11,
            text: '分区总经理',
            expanded: true,
            children: [{
              id: 111,
              text: '营运总监',
              expanded: true,
              children: [{
                id: 1111,
                text: '店经理',
                expanded: true,
                children: [{
                  id: 11111,
                  text: '订货经理',
                  expanded: true
                }, {
                  id: 11112,
                  text: '人事经理',
                  expanded: true
                }]
              }]
            }, {
              id: 112,
              text: '品控总监',
              expanded: true
            }, {
              id: 113,
              text: '市场总监',
              expanded: true
            }, {
              id: 114,
              text: '财务总监',
              expanded: true
            }]
          }]
        },
        postTypeTree: {
          id: -1,
          text: '岗位分类',
          expanded: true,
          children: [{
            id: 1,
            text: '管理类',
            expanded: true,
            children: [{
              id: 2,
              text: '总部',
              expanded: true,
              children: [{
                id: 3,
                text: '高层',
                expanded: true,
                children: [{
                  id: 4,
                  text: '总经理',
                  expanded: true
                }, {
                  id: 5,
                  text: '总监',
                  expanded: true
                }]
              }, {
                id: 6,
                text: '中层',
                expanded: true
              }]
            }, {
              id: 7,
              text: '分公司',
              expanded: true
            }]
          }, {
            id: 8,
            text: '职能类',
            expanded: true
          }]
        }
      };
    },
    ready() {
      var vm = this;
      setTimeout(function() {
        vm.showNavbar = true;
      }, 500);
    }
};
</script>
<style lang="css" scoped>
</style>
