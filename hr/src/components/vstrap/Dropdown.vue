<template>
  <div class="ui-dropdown {{placement.replace('-',' ')}} {{btngroup}}" @click="dropdownSelected">
    <slot></slot>
    <slot name="dropdown-menu" class="dropdown-menu"></slot>
  </div>
</template>
<script>
import EventListener from './utils/EventListener'
export default {
    methods: {

        stopScroll(e){
            console.log('stopmousewheel combotree')

            const toggle = this.$el.querySelector('[data-toggle="dropdown"]');

            if (toggle.contains(e.target)&& this.$el && this.$el.classList.contains('open') || !this.$el.contains(e.target) && this.$el && this.$el.classList.contains('open')) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        },

        toggleDropdown(e, show) {
            e.preventDefault()

            if (typeof(show) == "undefined") {
                this.$el.classList.toggle('open')
            } else {

                if (!show) {
                    this.$el.classList.remove('open')
                    console.log('hide')
                } else {
                    this.$el.classList.add('open')
                    console.log('show')
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
            if(this.$el.classList.contains('open')){

                console.log('open')

                !!this.evtID && window.removeEventListener('mousewheel',window.globalEvtList[this.evtID],true)

                this.evtID = new Date();

                if(!window.globalEvtList) window.globalEvtList = {};

                window.globalEvtList[this.evtID] = this.stopScroll;

                window.addEventListener('mousewheel',window.globalEvtList[this.evtID],true);

            }else{

                window.removeEventListener('mousewheel',window.globalEvtList[this.evtID],true)

                return;
            };
            this.$nextTick(() => {

                let pop = this.$el.querySelector('.dropdown-menu') || this.$el.querySelector('*[slot="dropdown-menu"]');

                if(!pop) return;

                var elPos = getPosition(this.$el);
                var popPos = pop.getBoundingClientRect();

                pop.style.left = elPos.left + 'px';
                pop.style.top = (elPos.top + elPos.height) + 'px';
                pop.style.minWidth = elPos.width + 'px';

                console.log(pop.scrollWidth)

                let popHeight = popPos.height < 300 ? popPos.height : 300;

                if(elPos.bottom>popHeight){
                    pop.style.top=(elPos.top+elPos.height)+'px';
                    pop.style.bottom='auto';
                }else{
                    pop.style.top='auto';
                    pop.style.bottom='30px';
                }

                let maxWidth = pop.offsetWidth < elPos.width ? elPos.width : pop.offsetWidth;
                let popWidth = popPos.width < maxWidth ? maxWidth : popPos.width;

                pop.style.width = popWidth + 'px';

                // console.log(elPos.right,popWidth,elPos.width)

                // 右侧空间不够，则靠右对齐
                if((popWidth-elPos.width) > elPos.right){
                    pop.style.left='auto'
                    pop.style.right=elPos.right+'px';
                }else{
                    pop.style.left=elPos.left+'px';
                    pop.style.right='auto';
                }

            });

        },
        dropdownSelected(e) {

            if (e.target.getAttribute('name') == 'dropdown-item') {
                this.dropdownvalue = e.target.getAttribute('value');
                this.dropdownname = e.target.innerHTML;
                this.toggleDropdown(e, false);
            }
        }
    },
    props: {
        // 下拉选中的value
        dropdownvalue: {
            twoWay: true,
        },
        // 下拉选中项的name
        dropdownname: {
            twoWay: true,
            type: String
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
        }
    },
    ready() {
        const _this = this;
        const el = this.$el
        const toggle = el.querySelector('[data-toggle="dropdown"]')
        if (toggle) {

            if (this.trigger == "hover") {
                toggle.addEventListener('mouseover', function(e) {

                    _this.toggleDropdown(e, true)

                })
                toggle.addEventListener('mouseleave', function(e) {

                    _this.toggleDropdown(e, false)

                })
                // const menu = el.querySelector('.dropdown-menu')

                // menu.addEventListener('mouseout', function(e){

                //   _this.toggleDropdown(e,false)

                // })
            } else {
                toggle.addEventListener(this.trigger, this.toggleDropdown)
            }


        }
        this._closeEvent = EventListener.listen(window, 'click', (e) => {
            if (!el.contains(e.target)){
                el.classList.remove('open');
                if(window.globalEvtList){
                    window.removeEventListener('mousewheel',window.globalEvtList[this.evtID],true)
                }
            }
        })


/*        // 打开后防止滚动，TODO 全局性能优化
        window.addEventListener('mousewheel', e => {

            console.log('stopmousewheel dropdown')
            if (!el.contains(e.target) && this.$el && this.$el.classList.contains('open')) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

        }, true);*/

    },
    beforeDestroy() {
        if (this._closeEvent) this._closeEvent.remove()
    }
}
</script>
<style type="text/css">
.dropdown-group{
  display: inline-block;
  position: relative;
}
.dropdown-group.open > .dropdown-menu{
    animation-name: flipInY;
    animation-duration: .75s;
}
/*.dropdown-group.dropleft > .dropdown-menu{
  right: 0;
  left: auto;
}
.dropdown-group.dropright > .dropdown-menu{
  left: 0;
  right: auto;
}*/

.ui-dropdown .dropdown-menu{
    position: fixed;
    overflow-y: auto;
    max-height: 300px;
    /*overflow: visible;*/
}
.ui-dropdown .dropdown-menu:before{
    z-index: 100;
    content:'';
    display: block;
    position: absolute;
    left: 50%;
    top:-5px;
    margin-left: -5px;
    width: 10px;
    height: 10px;
    background: #fff;
    transform: rotate(-45deg);
}
</style>
