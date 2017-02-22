<template>

  <div @click.prevent.stop="handleClick" class="item" :name="name" :value="value"><slot></slot><span class="ui-icon material-icons check small" v-show="chosen">check</span></div>

</template>

<script>
  export default {
    props: {
      value: {
        // type: String,
        required:true
      },
      name: {
        // type: String,
        required:true
      }
    },
    data() {
      return {
        chosen: false,
      }
    },
    computed: {
      chosen() {
        return this.$parent.value.indexOf(this.value) !== -1
      }
    },
    methods: {
      handleClick() {
        const parent = this.$parent
        if (parent.multiple) {
          const index = parent.value.indexOf(this.value)

          if(index===-1){
            parent.value.push(this.value)
            parent.names.push(this.name)
          }else{
            parent.value.splice(index, 1)
            parent.names.splice(index, 1)
          }
        } else {
          parent.value = [this.value]
          parent.names = [this.name]
          parent.show = false
        }
      }
    }
  }
</script>
