<template>
<div>
    <div class="ui-panel">

        <div class="ui-panel-title">Tree 树形控件</div>
        <div class="ui-panel-content">
            <table class="table table-bordered">
              <thead>
                <td>参数</td>
                <td>类型</td>
                <td>说明</td>
              </thead>
              <tbody>
                <tr>
                  <td>data</td>
                  <td>Object</td>
                  <td>树结构的json数据</td>
                </tr>
                <tr>
                  <td>idprop</td>
                  <td>String</td>
                  <td>json数据中id属性的属性名称，默认 id</td>
                </tr>
                <tr>
                  <td>textprop</td>
                  <td>String</td>
                  <td>json数据中树节点文本属性的属性名称，默认 text</td>
                </tr>
                <tr>
                  <td>childrenprop</td>
                  <td>String</td>
                  <td>树结构的json数据中子数据数组属性的名称，默认 children</td>
                </tr>
                <tr>
                  <td>checkable</td>
                  <td>Boolean</td>
                  <td>各节点前是否显示checkbox复选框，默认 false</td>
                </tr>
                <tr>
                  <td>multiple</td>
                  <td>Boolean</td>
                  <td>是否允许多选，默认 false</td>
                </tr>
                <tr>
                  <td>expandall</td>
                  <td>Boolean</td>
                  <td>是否展开全部节点，默认 false</td>
                </tr>
                <tr>
                  <td>selectedvalue</td>
                  <td>Array</td>
                  <td>当前树选中的值数组，默认是空数组</td>
                </tr>
                <tr>
                  <td>menulist</td>
                  <td>Array</td>
                  <td>树节点下拉菜单项对象数组，默认是空数组，对象有配置属性："text"(菜单项文本)和"event"(点击该菜单项对应的事件名称)</td>
                </tr>
                <tr>
                  <td>menuplacement</td>
                  <td>String</td>
                  <td>树节点下拉菜单显示的位置，默认"dropright"(显示在右下方)，此外还有"dropup-dropleft"(左上方),"dropup"(上方),"dropleft"(左侧),"drop-right"(右侧)</td>
                </tr>
                <tr>
                  <td>nodeclicked</td>
                  <td>Function</td>
                  <td>单击树节点的处理事件</td>
                </tr>
                <tr>
                  <td>beforenodeclicked</td>
                  <td>Function</td>
                  <td>单击树节点之前的处理事件</td>
                </tr>
                <tr>
                  <td>menuitemclicked</td>
                  <td>Function</td>
                  <td>单击下拉菜单项的处理事件</td>
                </tr>
                <tr>
                  <td>beforemenuitemclicked</td>
                  <td>Function</td>
                  <td>单击下拉菜单项之前的处理事件</td>
                </tr>
                <tr>
                  <td>rootvisible</td>
                  <td>Boolean</td>
                  <td>是否显示树根节点，默认true</td>
                </tr>
                <tr>
                  <td>checkstrict</td>
                  <td>Boolean</td>
                  <td>父子节点选中状态是否关联，默认false</td>
                </tr>
                <tr>
                  <td>ancestorcheck</td>
                  <td>Boolean</td>
                  <td>选中子节点，是否影响其所有父节点的选中状态，默认 false</td>
                </tr>
              </tbody>
            </table>
            <br/>
        </div>
    </div>


  <div class="ui-panel">
    <div class="ui-panel-title">树</div>
    <div class="ui-panel-content">
      <div class="demo">
        <h4>默认</h4>
        <div class="group">
          <ui-tree :data="treeData" :menulist.sync="menuList" menuplacement="dropup-dropleft" :beforemenushown="beforeMenuShown" :menuitemclicked="menuItemClicked" :nodeclicked="nodeClicked"></ui-tree>
        </div>
        <h4>带有复选框(默认单选模式)</h4>
        <div class="group">
          <ui-tree :data="treeData2" :checkable="true" :selectedvalue.sync="selectedValue"></ui-tree>
        </div>
        <h4>复选模式</h4>
        <div class="group">
          <ui-tree :data="treeData3" :checkable="true" :multiple="true"></ui-tree>
        </div>
        <h4>下拉选择框</h4>
        <div class="group">
          <v-dropdown>
            <button type="button" class="btn btn-default" data-toggle="dropdown">
              选择组织
              <span class="caret"></span>
            </button>
            <div slot="dropdown-menu" class="dropdown-menu">
              <ui-tree :data="treeData4" :checkable="true" :multiple="true"></ui-tree>
            </div>
          </v-dropdown>
        </div>
        <h4>combotree</h4>
        <combo-tree :treedata="treeData" :dropdownvalue.sync="dropvalue" :dropdownname.sync="dropname" :checkable="true" :multiple="false">
          <div data-toggle="dropdown">
            <span v-for="item in dropname" class="label label-info">{{item.label}}</span>
            <span class="caret"></span></div>
        </combo-tree>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  methods: {
    beforeMenuShown(data) {
      console.log('beforemenushown', data);
      console.log(this)
      this.menuList.$set(this.menuList.length,{
        text:'xxxxx',
        event:'xxxxxx2'
      })
      return true;
    }
  },
  data() {
    return {
      selectedValue: [],
      // 树节点单击事件
      nodeClicked: function(data) {
        console.log(data);
        console.log(this.selectedValue)
      },
      // 树菜单点击事件
      menuItemClicked: function(menuName, data) {
        console.log(menuName);
        console.log(data);
      },

      dropvalue: [],
      dropname: [{
        label: '下拉菜单'
      }],
      menuList: [{
        text: '测试菜单1',
        event: 'itemclicked'
      }],
      treeData: {
        id: 1,
        text: '很',
        children: [{
          id: 2,
          text: '11',
          children: [{
            id: 5,
            text: '长很',
            checked: true
          }, {
            id: 6,
            text: '长的一'
          }]
        }, {
          id: 3,
          text: '12',
          children: [{
            id: 7,
            text: '段文字',
            children: [{
              id: 8,
              text: '1211',
              children: []
            }]
          }, {
            id: 8,
            text: '段文字段'
          }]
        }, {
          id: 4,
          text: '段文字段文',
          children: []
        }]
      },
      treeData2: {
        id: 1,
        text: '1',
        children: [{
          id: 2,
          text: '段文字段文字',
          children: [{
            id: 5,
            text: '111'
          }, {
            id: 6,
            text: '112'
          }]
        }, {
          id: 3,
          text: '段文字段文字段',
          children: [{
            id: 7,
            text: '121',
            children: [{
              id: 8,
              text: '1211',
              children: []
            }]
          }, {
            id: 8,
            text: '段文字段文字段'
          }]
        }, {
          id: 4,
          text: '13',
          children: []
        }]
      },
      treeData3: {
        id: 1,
        text: '1',
        children: [{
          id: 2,
          text: '11',
          children: [{
            id: 5,
            text: '111'
          }, {
            id: 6,
            text: '112'
          }]
        }, {
          id: 3,
          text: '12',
          children: [{
            id: 7,
            text: '121',
            children: [{
              id: 8,
              text: '1211',
              children: []
            }]
          }, {
            id: 8,
            text: '122'
          }]
        }, {
          id: 4,
          text: '13',
          children: []
        }]
      },
      treeData4: {
        id: 1,
        text: '1',
        children: [{
          id: 2,
          text: '11',
          children: [{
            id: 5,
            text: '111'
          }, {
            id: 6,
            text: '112'
          }]
        }, {
          id: 3,
          text: '12',
          children: [{
            id: 7,
            text: '121',
            children: [{
              id: 8,
              text: '1211',
              children: []
            }]
          }, {
            id: 8,
            text: '122'
          }]
        }, {
          id: 4,
          text: '13',
          children: []
        }]
      }
    };
  }
};
</script>
<style lang="css" scoped>
</style>
