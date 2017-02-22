<!--
* @Created Date       : 2016-11-25T18:38:05+08:00
* @Last Modified time : 2016-12-01T11:07:19+08:00
 -->
<template>
  <div>
    <ul v-el:tree :class="{'tree-box': rootvisible, 'tree-wrap': root===data}">
      <li>
        <div v-if="rootvisible" :class="{'node-checked': !multiple &&  selectedvalue.length>0 && data[idprop] === selectedvalue[0][idprop] && data[textprop] === selectedvalue[0][textprop]}">
          <i class="ui-icon material-icons tree-icon " v-if="data[childrenprop]&&data[childrenprop].length" @click="data.expanded = !data.expanded">
        {{data.expanded?'keyboard_arrow_down':'keyboard_arrow_right'}}</i>
          <i class="ui-icon material-icons icon-none " v-else></i>
          <i v-if="checkable" @click="cascadeCheck(data)" class="material-icons tree-checkbox {{(data.checked || isParticalChecked)?'':'uncheck'}}">
            {{isParticalChecked?'remove':'checked'}}</i>
          <a :class="{'node-checked': !multiple &&  selectedvalue.length>0 && data[idprop] === selectedvalue[0][idprop] && data[textprop] === selectedvalue[0][textprop]}" href="javascript:void(0)" v-el:elem @click="_showMenu()" title="{{data[textprop]}}">{{data[textprop]}}</a>
          <span v-if="menuShow" v-show="menuVisibility" class="menu-dropdown">
          <v-dropdown :placement="menuplacement">
            <div data-toggle="dropdown"><i class="material-icons _icon_more menu-caret">expand_more</i></div>
            <ul slot="dropdown-menu" class="dropdown-menu">
              <li v-for="menu in menulist" :__code="menu.__code" v-if="menu.__code | hasAuthority">
                <a v-show="menu.show"  name="dropdown-item" @click="menuClicked(menu.event)" href="javascript:void(0)">{{menu.text}}</a>
              </li>
            </ul>
          </v-dropdown>
          </span>
        </div>
        <ul v-if="data[childrenprop]&&data[childrenprop].length" v-show="data.expanded">
          <li v-for="child in data[childrenprop]">
            <ui-tree :root="root" :data="child" :idprop="idprop" :textprop="textprop" :childrenprop="childrenprop" :checkable="checkable" :multiple="multiple" :menulist="menulist" :nodeclicked="nodeclicked" :beforenodeclicked="beforenodeclicked" :beforemenushown="beforemenushown" :beforemenuitemclicked="beforemenuitemclicked" :menuitemclicked="menuitemclicked" :menuplacement="menuplacement" :selectedvalue.sync="selectedvalue" :expandedall="expandedall" :checkstrict="checkstrict" :ancestorcheck="ancestorcheck" :simplevaluemode="simplevaluemode" :checkonebyone="checkonebyone">
            </ui-tree>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'uiTree', // 组件名称
  data() {
    return {
      menuVisibility: false // 组件内部变量,控制树节点右侧菜单下拉图标是否显示
    }
  },
  filters: {
    hasAuthority(code) {

      if (code == '' || !code) return true;

      let ID = code.split('/')[0];
      return this.$root.checkAuthorityByID(ID);
    }
  },
  computed: {
    menuShow() {
      if (this.menulist == undefined || this.menulist.length <= 0) return false;
      var me = this;
      var doNotShow = this.menulist.every((item) => {
        if (!item.show) return true;
        if (!item.__code || item.__code == '') return false;
        let ID = item.__code.split('/')[0];
        return !me.$root.checkAuthorityByID(ID);
      });
      return !doNotShow;
    },
    isParticalChecked() {
      if(!this.data.checked) return false;
      if (Array.isArray(this.data.children) && this.data.children.length > 0) {
        var notCheckedNode = this.data.children.find(p => {
          return p.checked === false;
        });
        var checkedNode = this.data.children.find(p => {
          return p.checked === true;
        });
        var partialCheckedNode = this.data.children.find(p => {
          return p.partialChecked === true;
        });
        console.log(this.data[this.textprop], ": isParticalChecked: ",
          (!!checkedNode && !!notCheckedNode) || !!partialCheckedNode, ', checked: ', this.data.checked);
        return (!!checkedNode && !!notCheckedNode) || !!partialCheckedNode;
      }
      return false;
    }
  },
  props: {
    root: {

    }, // 树json的完整数据
    data: {}, // 当前子树的json部分数据
    idprop: { // 树json数据中id属性的名称,默认是"id"
      type: String,
      default: 'id'
    },
    expandedall: {
      type: Boolean,
      default: false
    },
    textprop: { // 树json数据中节点文本显示text属性的名称,默认是"text"
      type: String,
      default: 'text'
    },
    childrenprop: { // 树json数据中子数据数组属性的名称,默认是"children"
      type: String,
      default: 'children'
    },
    checkable: { // 树节点是否显示勾选框,默认不显示
      type: Boolean,
      default: false
    },
    multiple: { // 树节点是否允许多选,默认单选(仅在checkable为true下设置有效)
      type: Boolean,
      default: false
    },
    selectedvalue: { // 当前树选中的值数组,默认是空数组
      twoWay: true,
      type: Array,
      default: () => []
    },
    menulist: [], // 树节点下拉菜单的菜单项,有两个属性,"text"(菜单项文本)和"event"(点击该菜单项对应的 事件名称),
    // 下拉菜单显示的位置,默认"dropright"(显示在右下方)
    // 此外还有"dropup-dropleft"(左上方),"dropup"(上方),"dropleft"(左侧),"drop-right"(右侧)
    menuplacement: {
      type: String,
      default: 'dropright'
    },
    nodeclicked: { // 单击树节点所对应的事件回调方法
      type: Function
    },
    beforenodeclicked: { // 单击树节点前的回调方法
      type: Function
    },
    beforemenushown: { // 在菜单显示之前的回调方法
      type: Function
    },
    menuitemclicked: { // 单击下拉菜单项所对应的事件回调方法
      type: Function
    },
    beforemenuitemclicked: { // 单击下拉菜单前的回调方法
      type: Function
    },
    rootvisible: { // 树根节点是否显示,默认显示
      type: Boolean,
      default: true
    },
    checkstrict: { // checkable 状态下节点选择完全受控(父子节点选中状态下不再关联)
      type: Boolean,
      default: false
    },
    ancestorcheck: { // checkable 状态下 勾选子节点带上父节点
      type: Boolean,
      default: false
    },
    simplevaluemode: {
      type: Boolean,
      default: false
    },
    checkonebyone: { // checkable 状态下，单个挨个儿选择节点
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 级联修改各树节点 checked 状态
    cascadeCheck(currentNode) {
      if (!this.checkonebyone) {
        if (this.multiple) {
          var oldChecked = this.data.checked; // 暂存当前节点的 checked 状态
          // 则当前节点的后代节点均修改为当前节点操作后的状态
          this.traverseCheck(!this.data.checked, this.data, this.childrenprop);
          this.data.checked = !oldChecked; // 修改本节点的 checked 状态
          // 从根节点开始判断,原则是,对于一个部分树,其子节点均为选中状态,该节点才会被选中,否则该节点不选中
          if (this.checkstrict)
            this.partialChecked(this.root, this.childrenprop);
          this.ancestorCheck();
        } else {
          var oldChecked = this.data.checked;
          this.traverseCheck(false, this.root, this.childrenprop);
          this.data.checked = !oldChecked;
        }
      } else {
        this.data.checked = !this.data.checked;
      }
      console.log('this.checkonebyone: ', this.checkonebyone);
      this.selectedvalue = [];
      this.getMultipleCheckedValue(this.root);
      this.nodeclicked && this.nodeclicked(this.selectedvalue, currentNode);
    },
    // 修改当前节点及其后代节点的checked状态,作为级联勾选用
    //    checked(true,false)
    //    data: 当前节点对应的树结构数据
    //    childrenPropName: 树结构数据中子数据数组的属性名称
    traverseCheck(checked, data, childrenPropName) {
      data.checked = checked; // 首先修改当前节点的checked状态
      // 如果当前节点没有子节点,说明遍历结束,直接退出方法
      if (!data[childrenPropName] || data[childrenPropName].length <= 0) return;
      // 否则遍历当前节点的子节点
      for (var i = 0; i < data[childrenPropName].length; i++) {
        // 递归调用当前方法,修改节点及其后代的checked状态
        this.traverseCheck(checked, data[childrenPropName][i], childrenPropName);
      }
    },
    ancestorCheck() {
      if (!this.ancestorcheck) return;
      if (!this.data.checked) return;
      var rootTree = this.$parent;
      if (rootTree.idprop) { // 说明点击的不是树根节点
        while (true) { // 向上逐层寻找根节点
          if (!rootTree.$parent.idprop) break;
          rootTree.data.checked = true;
          rootTree = rootTree.$parent;
        }
      } else { // 直接点击的是根节点
        rootTree = this;
      }
    },
    // 对于一个子树,向下层依次判断当前节点及其所有子节点的checked状态,其子节点均为选中状态,当前节点才为选中状态,否则该节点不选中
    partialChecked(data, childrenPropName) {
      // 如果当前节点没有子节点,说明遍历结束,直接退出方法
      if (!data[childrenPropName] || data[childrenPropName].length <= 0) return;

      if (!this.checkstrict) {
        var isFather = data[childrenPropName].find((elem) => {
          return elem[this.idprop] == this.data[this.idprop];
        });
        if (isFather) {
          if (data[childrenPropName].every((elem) => {
              return elem.checked;
            })) {
            data.checked = true;
            return;
          } else {
            return;
          }
        }
      }

      // 默认当前节点为选中状态,若其子节点发现有未选中状态的节点,则当前节点改为未选中
      var shouldCheck = true;
      for (var i = 0; i < data[childrenPropName].length; i++) {
        this.partialChecked(data[childrenPropName][i], childrenPropName);
        if (!data[childrenPropName][i].checked) {
          shouldCheck = false;
        }
      }
      // 最后更新当前节点的选中状态
      data.checked = shouldCheck;
    },
    // 对于多选模式,获取树节点值集合
    getMultipleCheckedValue(data) {
      if (data.checked) {
        var item = {};
        Object.assign(item, data);
        if (data[this.idprop] == this.root[this.idprop]) {
          var rootTree = this.$parent;
          if (rootTree.idprop) { // 说明点击的不是树根节点
            while (true) { // 向上逐层寻找根节点
              if (!rootTree.$parent.idprop) break;
              rootTree = rootTree.$parent;
            }
          } else { // 直接点击的是根节点
            rootTree = this;
          }
          if (rootTree.rootvisible) {
            if (this.simplevaluemode) {
              this.selectedvalue.push(item[this.idprop]);
            } else {
              this.selectedvalue.push(item);
            }
          }
        } else {
          if (this.simplevaluemode) {
            this.selectedvalue.push(item[this.idprop]);
          } else {
            this.selectedvalue.push(item);
          }
        }
      }
      if (data[this.childrenprop] && data[this.childrenprop].length > 0) {
        data[this.childrenprop].forEach((child) => {
          this.getMultipleCheckedValue(child);
        });
      }
    },
    // 显示下拉菜单的私有方法
    _showMenu() {
      var oldChecked = this.data.checked; // 暂存当前节点的 checked 状态
      if (!this.multiple) { // 若当前树为单选模式,且当前是勾中操作,则整个树的其它节点都设置为不勾选
        if (!this.data.checked) this.traverseCheck(this.data.checked, this.root, this.childrenprop);
        this.data.checked = !oldChecked; // 修改本节点的 checked 状态
        this.selectedvalue = [];
        var item = {};
        item[this.idprop] = this.data[this.idprop];
        item[this.textprop] = this.data[this.textprop];
        if (this.simplevaluemode) {
          this.selectedvalue.$set(0, item[this.idprop]);
        } else {
          this.selectedvalue.$set(0, item);
        }
        // this.root.selectedvalue = this.selectedvalue;
      }
      // 触发节点的单击回调
      if (this.nodeclicked) {
        if (this.beforenodeclicked) {
          if (this.beforenodeclicked(this.data)) this.nodeclicked(this.data);
        } else this.nodeclicked(this.data);
      }
      // 如果当前的菜单配置为空,则不做处理
      if (this.menulist == undefined || this.menulist.length <= 0) return;

      // 向上寻找当前节点对应的树根节点
      var rootTree = this.$parent;
      if (rootTree.idprop) { // 说明点击的不是树根节点
        while (true) { // 向上逐层寻找根节点
          if (!rootTree.$parent.idprop) break;
          rootTree = rootTree.$parent;
        }
      } else { // 直接点击的是根节点
        rootTree = this;
      }
      this._hideMenu(rootTree); // 从根节点开始向下逐层隐藏下拉菜单
      if (this.beforemenushown) {
        this.menuVisibility = this.beforemenushown(this.data); // 显示本节点的下拉菜单
      } else this.menuVisibility = true; // 显示本节点的下拉菜单
    },
    menuClicked(eventName) {
      if (this.menuitemclicked) {
        if (this.beforemenuitemclicked) {
          if (this.beforemenuitemclicked(data)) this.menuitemclicked(eventName, this.data);
        } else this.menuitemclicked(eventName, this.data);
      }
    },
    _hideMenu(currentNode) {
      if (currentNode.menuVisibility == undefined) return;
      currentNode.menuVisibility = false;
      for (var i = 0; i < currentNode.$children.length; i++) {
        this._hideMenu(currentNode.$children[i]);
      }
    }
  },
  created() {
    if (!this.data) {
      this.data = {};
      this.data[this.idprop] = null;
      this.data[this.childrenprop] = null;
    }
    this.$set('data.expanded', this.expandedall ? true : (this.data.expanded == undefined ? false : this.data.expanded));
    this.$set('data.checked', this.checked ? true : (this.data.checked == undefined ? false : this.data.checked));
  },
  watch: {
    // data(newVal, oldVal) {
    //   this.$set('data.expanded', this.data.expanded == undefined ? false : this.data.expanded);
    //   this.$set('data.checked', this.data.checked == undefined ? false : this.data.checked);
    //   if (!this.root) this.$set('root', this.data);
    // }
  }
};
</script>
<style scoped>
.tree-box {
  margin: 0;
  padding-left: 15px;
  padding-right: 10px;
  font-size: 14px;
  line-height: normal;
}

.tree-box li {
  padding: 0;
  list-style: none;
  white-space: nowrap;
  outline: 0;
  user-select: none;
}

i.ui-icon.material-icons {
  cursor: pointer;
  vertical-align: middle;
  color: #959595;
}

.tree-box li a {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  border-radius: 2px;
  cursor: pointer;
  text-decoration: none;
  vertical-align: middle;
  color: #000;
}

.tree-checkbox {
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  display: inline-block;
  /*line-height: 16px;*/
  vertical-align: middle;
  /*height: 16px;*/
  /*width: 16px;*/
  /*border: 1px solid #000;*/
  box-sizing: border-box;
  /*font-size: 13px;*/
  line-height: 18px;
  height: 18px;
  width: 18px;
  border: 1px solid #a8adb9;
  font-size: 17px;
  color: #27c9b4;
  font-weight: 900;
  text-align: center;
  border-radius: 2px;
}

.tree-checkbox.uncheck {
  color: #fff;
}

.menu-caret {
  cursor: pointer;
}

.tree-node {
  float: left;
}

.menu-dropdown {
  position: relative;
  top: 0;
  vertical-align: middle;
}

.dropdown-group {
  vertical-align: middle !important;
}

.tree-icon {
  cursor: pointer;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  border: 1px solid #959595;
  font-size: 20px !important;
  text-indent: -1px;
  line-height: 20px;
}

.icon-none {
  width: 20px;
  height: 20px;
}

.node-checked {
  background-color: #a9adb9;
  color: #fff !important;
}

.node-checked > i.tree-icon {
  background-color: #a9adb9;
  color: #fff !important;
  border: 1px solid #fff;
}

.node-leaf {
  margin-left: 20px;
}

.tree-wrap .dropdown-group.open > .dropdown-menu {
  animation-duration: 0.1s;
}
</style>
