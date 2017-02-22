<template>
<div>
    <button @click="parentCallback">回调</button>
    <button @click="$parent.componentCallback(callbackname,params)">回调</button>
</div>
</template>
<script>
    export default{
        props:{
            params:{

            },
            callbackname:{
                type:String,
                required:true
            }
        },
        methods:{

            // 回调父组件方法
            parentCallback(){
                this.$emit('componentcallback',this.callbackname,this.params)
            }

        }

    }
</script>
