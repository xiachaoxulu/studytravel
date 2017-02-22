<template>
  <div class="ui-module-navbar-content" v-if="show" transition="header" transition-mode="out-in">
    <div class="pull-right text-right">
      <button class="ui-tool-button" @click="$root.showAllFuns()"><span class="icon icon-tool icon-tool-menu pull-left"></span></button>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      default: false
    },
  },
  methods: {

  },
  watch: {
    show(val) {
      if (val) this.$root.checkAuthority();
    }
  }
}
</script>
