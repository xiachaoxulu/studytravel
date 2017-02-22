<template>
  <div class="tree-combo {{placement.replace('-',' ')}} {{btngroup}}">
    <slot></slot>
    <div class="dropdown-menu drop-tree" name="dropdown-item">
      <ui-tree v-if="treeExists" :data="treedata" :root="treedata" :idprop="idprop" :textprop="textprop" :childrenprop="childrenprop" :checkable="checkable" :multiple="multiple" :selectedvalue.sync="dropdownvalue" :menulist="menulist" :nodeclicked="nodeclicked" :beforenodeclicked="beforenodeclicked" :beforemenushown="beforemenushown" :menuitemclicked="menuitemclicked" :beforemenuitemclicked="beforemenuitemclicked" :rootvisible="rootvisible" :simplevaluemode="simplevaluemode" :checkstrict="checkstrict" :checkonebyone="checkonebyone"></ui-tree>
    </div>
  </div>
</template>
<script>
import EventListener from '../vstrap/utils/EventListener'
import uiTree from './tree.vue'
export default {
  data() {
    return {
      treeExists: false
    }
  },
  methods: {

    stopScroll(e) {
      console.log('stopmousewheel combotree')
      if (!this.$el) return;

      const toggle = this.$el.querySelector('[data-toggle="dropdown"]');

      if (toggle.contains(e.target) && this.$el && this.$el.classList.contains('open') || !this.$el.contains(e.target) && this.$el && this.$el.classList.contains('open')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    },

    toggleDropdown(e, show) {
      if (!this.treeExists) this.treeExists = true;
      if (e) e.preventDefault();
      if (typeof show == "undefined") {
        this.$el.classList.toggle('open');
      } else {
        if (!show) {
          if (!this.multiple)
            this.$el.classList.remove('open');
        } else {
          this.$el.classList.add('open');
        }
      }


      function getPosition(el) {
        var _parent = document.querySelector('body');
        var _elRect = el.getBoundingClientRect();
        var _parentRect = _parent.getBoundingClientRect();
        return {
          width: el.offsetWidth,
          height: el.offsetHeight,
          left: _elRect.left - _parentRect.left,
          top: _elRect.top - _parentRect.top,
          right: -(_elRect.right - _parentRect.right),
          bottom: -(_elRect.bottom - _parentRect.bottom)
        }
      }

      // 检测是否为显示状态
      if (this.$el.classList.contains('open')) {

        console.log('open')

        !!this.evtID && window.removeEventListener('mousewheel', window.globalEvtList[this.evtID], true)

        this.evtID = new Date();

        if (!window.globalEvtList) window.globalEvtList = {};

        window.globalEvtList[this.evtID] = this.stopScroll;

        window.addEventListener('mousewheel', window.globalEvtList[this.evtID], true);

      } else {

        window.removeEventListener('mousewheel', window.globalEvtList[this.evtID], true)

        return;
      };


      this.$nextTick(() => {
        let pop = this.$el.querySelector('div.drop-tree');
        var elPos = getPosition(this.$el);
        var popPos = pop.getBoundingClientRect();

        pop.style.left = elPos.left + 'px';
        pop.style.top = (elPos.top + elPos.height) + 'px';
        pop.style.minWidth = elPos.width + 'px';

        // console.log(popPos,elPos)

        let popHeight = popPos.height < 300 ? popPos.height : 300;

        if (elPos.bottom > popHeight) {
          pop.style.top = (elPos.top + elPos.height) + 'px';
          pop.style.bottom = 'auto';
        } else {
          pop.style.top = 'auto';
          pop.style.bottom = '30px';
        }

        let popWidth = popPos.width < elPos.width ? elPos.width : popPos.width;

        if (elPos.right < elPos.right - (popWidth - elPos.width)) {
          pop.style.left = 'auto'
          pop.style.right = '30px';
        } else {
          pop.style.left = elPos.left + 'px';
          pop.style.right = 'auto';
        }


        // if (elPos.bottom > popPos.height) { // 下方可以容纳
        //     pop.style.top = (elPos.top + elPos.height) + 'px';
        //     pop.style.bottom = 'auto';
        //     pop.style.maxHeight = (domPos.height - elPos.top - elPos.height - 5) + 'px';
        // } else { // 下方不能容纳
        //     if (popPos.height > elPos.top) {
        //         pop.style.top = (elPos.top - popPos.height + elPos.height * 3) + 'px';
        //         pop.style.bottom = 'auto';
        //     } else {
        //         pop.style.top = (elPos.top - popPos.height + elPos.height) + 'px';
        //         pop.style.bottom = 'auto';
        //     }
        // }

        // if (elPos.right < elPos.right - (popPos.width - elPos.width)) {
        //     pop.style.left = elPos.left + 'px';
        //     pop.style.right = 'auto';
        // } else {
        //     pop.style.left = elPos.left + 'px';
        //     pop.style.right = 'auto';
        // }

      });
    }
  },
  props: {
    dropdownvalue: {
      twoWay: true,
      default: () => []
    },
    dropdownname: {
      twoWay: true,
      default: () => []
    },
    placement: {
      type: String,
      default: ''
    },
    trigger: {
      type: String,
      default: 'click'
    },
    btngroup: {
      type: String,
      default: 'dropdown-group'
    },
    treedata: {},
    idprop: { // 树json数据中id属性的名称,默认是"id"
      type: String,
      default: 'id'
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
    menulist: [], // 树节点下拉菜单的菜单项,有两个属性,"text"(菜单项文本)和"event"(点击该菜单项对应的 事件名称)
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
    simplevaluemode: {
      type: Boolean,
      default: false
    },
    enabledrop: {
      type: Boolean,
      default: true
    },
    checkstrict: { // checkable 状态下节点选择完全受控(父子节点选中状态下不再关联)
      type: Boolean,
      default: false
    },
    checkonebyone: { // checkable 状态下，单个挨个儿选择节点
      type: Boolean
    }
  },
  ready() {
    var me = this;
    const el = this.$el;
    const toggle = el.querySelector('[data-toggle="dropdown"]');
    if (toggle && this.enabledrop) {
      if (this.trigger == 'hover') {
        toggle.addEventListener('mouseover', function(e) {
          me.toggleDropdown(e, true);
        });
      } else {
        toggle.addEventListener(this.trigger, this.toggleDropdown);
      }
    }
    // this._closeEvent = EventListener.listen(document, 'click', (e) => {
    //     // console.log(el.contains(e.target))
    //     el.classList.remove('open');
    //     // if (!el.contains(e.target || e.srcElement))
    // });


    this._closeEvent = EventListener.listen(window, 'click', (e) => {
      if (!el.contains(e.target)) {
        el.classList.remove('open')
        if (window.globalEvtList) {
          window.removeEventListener('mousewheel', window.globalEvtList[this.evtID], true)
        }
      }

    })

    /*        // 打开后防止滚动，TODO 全局性能优化
            window.addEventListener('mousewheel', e => {

                console.log('stopmousewheel combotree')
                if (!el.contains(e.target) && this.$el && this.$el.classList.contains('open')) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }

            }, true);*/

  },
  beforeDestroy() {
    if (this._closeEvent) this._closeEvent.remove();
  },
  watch: {
    'dropdownvalue': function(newVal, oldVal) {
      var me = this;
      this.dropdownname = newVal.map(function(obj) {
        return {
          label: obj[me.textprop]
        };
      });
      if (!this.multiple) this.toggleDropdown(null, false);
      console.log(this.dropdownname)
    },
    'enabledrop': function(val, oldVal) {
      console.log('val:', val);
      const el = this.$el;
      const toggle = el.querySelector('[data-toggle="dropdown"]');
      if (val) {
        if (this.trigger == 'hover') {
          toggle.addEventListener('mouseover', function(e) {
            me.toggleDropdown(e, true);
          });
        } else {
          toggle.addEventListener(this.trigger, this.toggleDropdown);
        }
      } else {
        if (this.trigger == 'hover') {
          toggle.removeEventListener('mouseover', getEventListeners(toggle.mouseover[0].listener));
        } else {
          toggle.removeEventListener(this.trigger, this.toggleDropdown);
        }
      }
    }
  }
};
</script>
<style lang="css" scoped>
.tree-combo .tree-wrap {
  overflow-y: auto;
  height: 200px;
  min-width: 150px;
}

.tree-combo {
  width: 100%;
}

.drop-tree {
  position: fixed;
  z-index: 10000;
  width: auto;
  overflow-y: auto;
  min-width: 150px;
  height: 200px;
  /*width: auto; max-height: 250px; overflow-y: auto*/
}

.dropdown-group.open > .dropdown-menu {
  animation: none;
}
</style>
