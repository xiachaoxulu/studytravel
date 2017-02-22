<template>
	
	<div class="ui-tags">
		<template v-for="tag in tags">
			<span class="label {{tag.disabled ? 'label-default' :type}}">{{tag.label}} <i class="material-icons pointer" @click="removeTags(tag)">close</i></span> 
		</template>
	</div>

</template>
<script type="text/javascript">

export default {

	props:{
		tags:{
			type:Array,
			twoWay:true,
			default:[]
		},
		type:{
			type:String,
			default:'label-primary'
		},
		removeCallback:{
			type:Function,
			default:function(){

			}
		}
	},
	methods:{
		removeTags(tag){
			if(tag.disabled) return;
			this.tags.$remove(tag)
			this.removeCallback(tag.value);
		}
	}

}

</script>
<style type="text/css" scoped>
	.ui-tags .label{
		margin-right: 5px;
	}
</style>