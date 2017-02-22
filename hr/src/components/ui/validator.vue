<template>
<div class="ui-validator" style="position:relative;">
    <slot></slot>
</div>
</template>
<script>
import 'libs/validators'
export default{
    ready(){
       this.init();
    },
    methods:{
        init(){
            let _this = this;

            let formEl = this.$el.querySelector('form') || this.$el.querySelector('[validator="form"]');

            this.validator = new FormValidation($(formEl),{
                super:_this
            });

            // $(formEl).formValidation({
            //     super:_this
            // })

            console.log('this.validator',this.validator)
        },
        refresh(){
           // this.init();
            this.validator.refresh();
        }
    },
    events: {
        // failed() {
        //     console.log(arguments)
        // }
    }
}
</script>
<style>
.ui-validator .tooltip{
}

.ui-validator .tooltip-inner{
    background: #00B5AD!important;
}
.ui-validator .tooltip-arrow {
    border-top-color: #00B5AD!important;
}
.ui-validator .tooltip-inner{
    max-width: 230px;
}
.ui-validator .has-error .tooltip-inner{
    background: #fd6551!important;
}
.ui-validator .has-error .tooltip-arrow {
    border-top-color: #fd6551!important;
}
</style>
