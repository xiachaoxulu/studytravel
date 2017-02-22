<template>
    <!-- 模块 vue -->
    <div class="ui-module" >

    	<div class="ui-module-content">
				
			<div class="tip404">
	    		很抱歉，您要看的内容正在开发中...
			</div>

    	</div>

    </div>
</template>

<script>
export default {   
    data(){
        return{
        }
    },
    ready(){
    }
}
</script>
<style scoped>
.tip404{
	width: 400px;
	height: 100px;
	line-height: 100px;
	text-align: center;
	background: #fff;
	border-radius: 10px;
	margin: 300px auto 0;
	box-shadow:  0 0 10px rgba(0,0,0,.2);
	font-size: 16px;
}
</style>