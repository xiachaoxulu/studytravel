<template>
	<div class="ui-dragdrop">
		<slot></slot>
	</div>
</template>
<script type="text/javascript">
import 'libs/jquery.dragsort-0.5.2.js'
export default{
	props:{
		order:{
			type:Array,
			twoWay:true,
			default(){
				return [];
			}
		},
		callback:{
			type:Function,
			default:function(){}
		},
		itemselector:{
			type:String,
			required:true
		},
		dragselector:{
			type:String,
			default:''
		}
	},
	ready(){

		const _this = this;
		function saveOrder() {

			_this.order = [];
			const dragItems = _this.$el.querySelectorAll(_this.itemselector);

			Array.from(dragItems).forEach(function(item){
				_this.order.push(item.getAttribute('orderid'))
			})
			// console.log(_this.order)

			_this.callback(_this.order);
		};

		$(this.$el.querySelector(_this.itemselector)).parent().dragsort({
			itemSelector: _this.itemselector,
			dragSelector: _this.dragselector,
			dragBetween: true,
			dragEnd: saveOrder,
			placeHolderTemplate: ""
		});
	}
}
</script>
<style type="text/css">
.dragHandler{
	border: 1px dashed green;
	opacity: .2;
	border-radius: 10px;
}
</style>
