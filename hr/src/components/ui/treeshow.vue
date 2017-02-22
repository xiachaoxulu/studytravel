<template>

	<div class="iTreeList" @click="treeSelected">
		{{{treeHtml}}}
	</div>

</template>

<script>
export default{
	data(){
		return {
			treelist:[],
			treeHtml:''
		}
	},

	props:{
		// 数据
		treedata:{
			default:function(){
				return [];
			}
		},
		// 根节点id
		rootid:{
			type:[Number,String],
			default:-1
		},
		// id属性
		idprop:{
			type:String,
			default:'ID'
		},
		// parentid属性
		parentidprop:{
			type:String,
			default:'parentID'
		},
		// name属性
		nameprop:{
			type:String,
			default:'name'
		},
		// value属性
		valueprop:{
			type:String,
			default:'value'
		},
		// 选中项value
		selectedvalue:{
			type:String
		},
		// 选中项name
		selectedname:{
			type:String
		},
		// 回调函数
		callback:{
			type:Function,
			default:function(){}
		}

	},

	watch:{

		'treedata':function(){
			this.init();
		}

	},
	methods:{
		init(){

	    	var vm = this;

			// 处理组织树数据
			function createTreeData(parentID,data){

				var childs = [];

				if(!data || data.length==0 || !Array.isArray(data)) return childs;

				data.forEach(function(item){
					// console.log(item)
					if(item[vm.parentidprop]==parentID){
						var list = createTreeData(item[vm.idprop],data);

						var child = {
							children:list.concat([])
						};
						child[vm.idprop] = item[vm.idprop]
						child[vm.parentidprop] = item[vm.parentidprop]
						child[vm.nameprop] = item[vm.nameprop]
						child[vm.valueprop] = item[vm.valueprop]
						childs.push(child);
					}
				})
				return childs;
			}

			// 生成HTML
			function createTreeHtml(data){

				var html = '<ul class="treeList">';

				if(!data || data.length==0 || !Array.isArray(data)) return html+'</ul>';;

				data.forEach(function(item,i){

					html+='<li class="treeItem">';
					html+='	<div tname="treeItemName" name="dropdown-item" class="treeItemName" value="'+item[vm.valueprop]+'">'+item[vm.nameprop]+'</div>';

					if(item.children.length>0){
						html+=createTreeHtml(item.children);
					}

					html+='</li>';
				})

				return html+'</ul>';

			}

			// console.log(this.treedata)


			this.treelist = createTreeData(this.rootid,this.treedata);

			this.treeHtml = createTreeHtml(this.treelist);

		},
		// 选择
		treeSelected(e){

			if(e.target.getAttribute('tname')=='treeItemName'){
				this.selectedvalue = e.target.getAttribute('value')
				this.selectedname = e.target.innerHTML
				this.callback();
			}

			// console.log(e.target)
		}
	},

    ready() {
        this.init();
    }

}


</script>
<style>
.iTreeList{
	overflow: hidden;
	width: 300px;
}
.iTreeList ul,.iTreeList li{
	list-style: none;
	margin: 0;
	padding: 0;
}
.treeList{
	margin-top: 20px;
}
.treeItem{
	position: relative;
}
.treeList .treeList{
	padding:0 10px;
	margin-left: 20px;
	border-left:1px dotted #999;
}

.treeItem .treeItem:before{
	content: '';
	display: inline-block;
	width: 10px;
	height: 1px;
	border-top:1px dotted #999;
	position: absolute;
	top: 15px;
	left:-10px;
}
.treeItemName{
	padding: 5px 10px;
	cursor: pointer;
}
.treeItemName:hover{
	background: #eee;
}

</style>
