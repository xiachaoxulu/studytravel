<template>
<div class="btn-group btn-group-circle" role="group" @click="toggleClass">
	<slot></slot>
</div>
</template>
<script>
export default{
	data(){
		return {
			buttons:''
		}
	},
	props:{
		activeClass:{
			type:String,
			default:'btn-primary',
		}
	},

	methods:{
		toggleClass(e){

			const _this = this;

			if(this.buttons.length>0){
				[].forEach.call(this.buttons,function(item){

					if(item==e.target){
						item.classList.add(_this.activeClass);
						item.blur();
					}else{
						item.classList.remove(_this.activeClass);
					}

				})				
			}
		}
	},

	ready(){
		this.buttons = this.$el.querySelectorAll('button');
	}
}
</script>
<style type="text/css" scoped>
</style>