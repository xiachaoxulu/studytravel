<template>

    <aside class="sideContent aside pos-r-silder-fixed" v-show="show" transition="slideright" :style="{width:contentWidth+'px',background:background}" >

      <!-- 模块 vue -->
      <div class="ui-module" :class="{'hasBg':width>0 ?true :false}">
        <i class="material-icons sideContentClose" @click="close">close</i>
        <slot></slot>
      </div>

    </aside>

</template>

<script>
import EventListener from 'libs/utils/EventListener.js'
import getScrollBarWidth from 'libs/utils/getScrollBarWidth.js'
import coerceBoolean from 'libs/utils/coerceBoolean.js'


export default {
    data(){
        return {
          scrollviewShow:false,
          contentWidth:0,
        }
    },
    props: {
        show: {
            type: Boolean,
            coerce: coerceBoolean,
            require: true,
            twoWay: true
        },
        width:{
            type:Number,
            default:0
        },
        background:{
            type:String,
            default:'none'
        }
    },
    watch: {
        show(val) {
            let backdrop = document.createElement('div')
            const body = document.body
            backdrop.className = 'aside-backdrop'
            const scrollBarWidth = getScrollBarWidth()
            if (val) {

                this.scrollviewShow = true;

/*                body.appendChild(backdrop)
                // body.classList.add('modal-open')
                // if (scrollBarWidth !== 0) {
                //     body.style.paddingRight = scrollBarWidth + 'px'
                // }
                var x = backdrop.clientHeight
                backdrop.className += ' in'
                this._clickEvent = EventListener.listen(backdrop, 'click', this.close)

*/            } else {
/*                if (this._clickEvent) this._clickEvent.remove()
                backdrop = document.querySelector('.aside-backdrop')
                try {
                    backdrop.className = 'aside-backdrop'
                    body.classList.remove('modal-open')
                    body.style.paddingRight = '0'
                    body.removeChild(backdrop)
                } catch (e) {}*/
            }
        }
    },
    methods: {
        close() {
            this.show = false
        }
    },
    ready(){

        var _this = this;

        this.contentWidth = this.width || $(window).width()-$('#app>.app-aside').width();

        $(window).resize(function(){
            _this.contentWidth = _this.width || $(window).width()-$('#app>.app-aside').width();
        })

    }
}
</script>

<style>

.aside {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 2049;
  overflow: visible;
  background: #fff;
}

.sideContent .ui-module-navbar{
    z-index: 2001;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
}
.sideContent .ui-module-navbar{
    background: #fff;
}
.sideContent .ui-module-navbar-content{
    padding-left: 20px;
}

    .sideContentClose{
      position: absolute;
      right: 10px;
      top: 20px;
      z-index: 2002;
      cursor:pointer;
      transition: all 0.2s ease;
    }
    .sideContentClose:hover{
      transform: rotate(180deg)!important;
    }

    .hasBg{
        background: #fff;
    }

  .slideright-enter {
    animation:slideright-in .5s;
  }
  .slideright-leave {
    animation:slideright-out .5s;
  }
  @keyframes slideright-in {
    0% {
      transform: translateX(50px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideright-out {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(50px);
      opacity: 0;
    }
  }

  .aside:focus {
      outline: 0
  }

  .aside .close {
      margin-right: -8px;
      padding: 4px 8px;
      color: #fff;
      font-size: 25px;
      opacity: .8
  }

  .aside-backdrop {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 2002;
      opacity: 0;
      transition: opacity .3s ease;
      background-color: #000
  }

  .aside-backdrop.in {
      opacity: 0!important;
  }
</style>
