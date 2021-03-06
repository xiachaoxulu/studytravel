<template>
  <div class="spinner spinner-gritcode {{spinnerSize}} {{fixed ? 'spinner-fixed' : ''}}" v-show="active">
    <div class="spinner-wrapper">
      <div class="spinner-circle"></div>
      <div class="spinner-text">{{text}}</div>
    </div>
  </div>
</template>

<script>
  // import styling
  const MIN_WAIT = 500 // in ms
  export default {
    data() {
      return {
        active: false,
      }
    },
    props: {
      size: {
        type: String,
        default: 'md'
      },
      text: {
        type: String,
        default: ''
      },
      fixed: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      spinnerSize() {
        return (this.size) ? `spinner-${this.size}` : `spinner-sm`
      }
    },
    methods: {
      getMinWait(delay) {
        delay = delay || 0
        return new Date().getTime() - this._started.getTime() < MIN_WAIT ? MIN_WAIT - parseInt(new Date().getTime() - this._started.getTime(), 10) + delay : 0 + delay
      },
      show(options) {
        if (options && options.text) {
          this.text = options.text
        }
        if (options && options.size) {
          this.size = options.size
        }
        if (options && options.fixed) {
          this.fixed = options.fixed
        }
        // block scrolling when spinner is on
        if(this._body) this._body.style.overflowY = 'hidden'
        // activate spinner
        this._started = new Date()
        this.active = true
        this.$root.$broadcast('shown::spinner')
      },
      hide() {
        const delay = 0
        this._spinnerAnimation = setTimeout(() => {
          this.active = false
        this._body.style.overflowY = this._bodyOverflow
        this.$root && this.$root.$broadcast('hidden::spinner')
      }, this.getMinWait(delay))
      }
    },
    events: {
      'show::spinner'(options) {
        this.show(options)
      },
      'hide::spinner'() {
        this.hide()
      },
      'start::ajax'(options) {
        this.show(options)
      },
      'end::ajax'() {
        this.hide()
      }
    },
    destroyed() {
      clearTimeout(this._spinnerAnimation)
      if(!!this._body) this._body.style.overflowY = this._bodyOverflow
    },
    ready() {
      this._body = document.querySelector('body')
      this._bodyOverflow = this._body.style.overflowY || ''
    }
  }
</script>

<style lang="scss" scoped>
/*!
 *
 * Spinner
 * With fallback to IE9
 *
 */

// Variables
// --------------------------------------------------
$brand-primary: darken(#428bca, 6.5%); // #337ab7
$spinner-backdrop-background: rgba(255,255,255,0.5) !default;;
$spinner-text-color: $brand-primary !default;
$spinner-border-size: 4px !default;
$spinner-border-primary-color:  $brand-primary !default;
$spinner-border-secondary-color: #ccc !default;
$spinner-sm: 1.5em !default;
$spinner-md: 2em !default;
$spinner-lg: 2.5em !default;
$spinner-xl: 3.5em !default;


@mixin size($width, $height: $width) {
  width: $width;
  height: $height;
}


// Animation
// --------------------------------------------------
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

// Core stuff
// --------------------------------------------------
.spinner-gritcode {
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9998;
  position: absolute;
  width: 100%;
  text-align: center;
  background: $spinner-backdrop-background;

  // fixed position is better option for full screen spinner overlay
  &.spinner-fixed {
    position: fixed;
  }

  // wraps text and spinner itself and centers it
  .spinner-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // fix for IE9
    -ms-transform: translate(-50%, -50%);
  }

  // animated spinner
  .spinner-circle {
    position: relative;
    border: $spinner-border-size solid $spinner-border-secondary-color;
    border-right-color: $spinner-border-primary-color;
    border-radius: 50%;
    display: inline-block;
    animation: spin 0.6s linear;
    animation-iteration-count: infinite;
    width: 3em;
    height: 3em;
    z-index: 2;
  }

  // a text below spinner
  .spinner-text {
    position: relative;
    text-align: center;
    margin-top: 0.5em;
    z-index: 2;
    width: 100%;
    font-size: 95%;
    color: $spinner-text-color;
  }
}

// Sizes
// --------------------------------------------------
.spinner-gritcode {
  &.spinner-sm .spinner-circle {
    @include size($spinner-sm, $spinner-sm)
  }
  &.spinner-md .spinner-circle {
    @include size($spinner-md, $spinner-md)
  }
  &.spinner-lg .spinner-circle {
    @include size($spinner-lg, $spinner-lg)
  }
  &.spinner-xl .spinner-circle {
    @include size($spinner-xl, $spinner-xl)
  }
}

// Default to standard gif for < IE10
.lt-ie10, .ie9, .oldie, .no-csstransitions, .no-csstransforms3d {
  .spinner-gritcode .spinner-circle {
    background: url("http://i2.wp.com/www.thegreatnovelingadventure.com/wp-content/plugins/wp-polls/images/loading.gif") center center no-repeat;
    animation: none;
    margin-left: 0;
    margin-top: 5px;
    border: none;
    width: 32px;
    height: 32px;
  }
}
</style>
