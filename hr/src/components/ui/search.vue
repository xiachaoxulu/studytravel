<!--
* @Created Date       : 2016-09-24T14:43:48+08:00
* @Last Modified time : 2016-10-18T10:24:37+08:00
 -->


<template>
    <div class="com-topsearch">
        <i class="material-icons _icon _icon-front">search</i>
        <input type="text" placeholder="{{placeholder}}" v-model="value" @keyup.enter="searchCallback(value)" >
        <button class="btn btn-primary _icon _icon-last" @click="searchCallback(value)">搜索</button>
    </div>
</template>
<script>
export default {
    props:{
        placeholder:{
            type:String,
            default:'搜索'
        },
        value:{
            twoWay:true,
            require:true,
        },
        searchCallback:{
            type:Function,
            default(){}
        }
    }
}
</script>
