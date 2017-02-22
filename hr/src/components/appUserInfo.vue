<template>
<div>
	<ui-sidebar :show.sync="show" title="个人信息" layout="content" >
	    
	    <div class="userInfo" slot="content">

	    </div>

	</ui-sidebar>
</div>
</template>
<script>

export default {
    data(){
        return{
        }
    },
    components:{
    },
    methods:{

    },
    props:{
        show:{
            type: Boolean,
            require: true,
            twoWay: true
        },
        eidtable:{
            default:false
        }
    }
}
</script>
<style>

.userInfo{
	height: 995px;
	background-image: url('../assets/images/userInfo.png')
}

</style>