<template>

    <aside class="aside ui-module-slider pos-r-silder-fixed" v-show="show" transition="slideright" :style="{width:width+'px'}">
        <span class="pos-silder-close" @click='close'><i class="material-icons">close</i></span>
        <div class="ui-module-slider-view" :class="layout">

            <div class="ui-module-slider-header">
                <div class="ui-module-slider-title">{{title}}</div>
                <div class="_title-content">
                  <slot name="header"></slot>
                </div>
            </div>
            <div class="ui-module-slider-content">

                <ui-scrollview :show="scrollviewShow">
                  <slot name="content"></slot>
                </ui-scrollview>

            </div>

            <div class="ui-module-slider-footer">
                <slot name="footer"></slot>
            </div>

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
          scrollviewShow:false
        }
    },

    computed:{
      sideWidth(){

        return this.width==0 ? 'width:'+this.width+'px;' : '';

      }

    },

    props: {
        show: {
            type: Boolean,
            coerce: coerceBoolean,
            require: true,
            twoWay: true
        },
        // 标题
        title:{
            type:String,
            default:''
        },
        // 布局
        layout:{
            type:String,
            require:true,
            default:'header-content-footer'
        },
        // 是否允许滚动
        scroll:{
            type: Boolean,
            coerce: coerceBoolean,
            default:true,
        },
        width:{
          type:Number,
          default:420
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

                body.appendChild(backdrop)
                // body.classList.add('modal-open')
                // if (scrollBarWidth !== 0) {
                //     body.style.paddingRight = scrollBarWidth + 'px'
                // }
                var x = backdrop.clientHeight
                backdrop.className += ' in'
                this._clickEvent = EventListener.listen(backdrop, 'click', this.close)

            } else {
                if (this._clickEvent) this._clickEvent.remove()
                backdrop = document.querySelector('.aside-backdrop')
                try {
                    backdrop.className = 'aside-backdrop'
                    body.classList.remove('modal-open')
                    body.style.paddingRight = '0'
                    body.removeChild(backdrop)
                } catch (e) {}
            }
        }
    },
    methods: {
        close() {
            this.show = false
        }
    },
    ready(){
    }
}
</script>

<style scoped>

  .aside-open {
    transition: transform 0.3s;
  }
  .aside-open.has-push-right {
    transform: translateX(-300px);
  }
  .aside {
      position: fixed;
      top: 0;
      bottom: 0;
      z-index: 2049;
      overflow: visible;
      background: #fff;
  }
  .aside.left {
    left: 0;
    right: auto;
  }
  .aside.right {
    left: auto;
    right: 0;
  }

  .slideleft-enter {
    animation:slideleft-in .3s;
  }
  .slideleft-leave {
    animation:slideleft-out .3s;
  }
  @keyframes slideleft-in {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideleft-out {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(-100%);
      opacity: 0;
    }
  }
  .slideright-enter {
    animation:slideright-in .3s;
  }
  .slideright-leave {
    animation:slideright-out .3s;
  }
  @keyframes slideright-in {
    0% {
      transform: translateX(100%);
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
      transform: translateX(100%);
      opacity: 0;
    }
  }

  .aside:focus {
      outline: 0
  }

  @media (max-width: 991px) {
      .aside {
          min-width:240px
      }
  }

  .aside.left {
      right: auto;
      left: 0
  }

  .aside.right {
      right: 0;
      left: auto
  }

  .aside .aside-dialog .aside-header {
      border-bottom: 1px solid #e5e5e5;
      min-height: 16.43px;
      padding: 6px 15px;
      background: #337ab7;
      color: #fff
  }

  .aside .aside-dialog .aside-header .close {
      margin-right: -8px;
      padding: 4px 8px;
      color: #fff;
      font-size: 25px;
      opacity: .8
  }

  .aside .aside-dialog .aside-body {
      position: relative;
      padding: 15px
  }

  .aside .aside-dialog .aside-footer {
      padding: 15px;
      text-align: right;
      border-top: 1px solid #e5e5e5
  }

  .aside .aside-dialog .aside-footer .btn+.btn {
      margin-left: 5px;
      margin-bottom: 0
  }

  .aside .aside-dialog .aside-footer .btn-group .btn+.btn {
      margin-left: -1px
  }

  .aside .aside-dialog .aside-footer .btn-block+.btn-block {
      margin-left: 0
  }

  .aside-backdrop {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 2040;
      opacity: 0;
      transition: opacity .3s ease;
      background-color: #000
  }


  .aside-backdrop.in {
      opacity: .5;
      filter: alpha(opacity=50)
  }



  .slideright-enter {
    animation:slideright-in .3s;
  }
  .slideright-leave {
    animation:slideright-out .3s;
  }
  @keyframes slideright-in {
    0% {
      transform: translateX(100%);
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
      transform: translateX(100%);
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
