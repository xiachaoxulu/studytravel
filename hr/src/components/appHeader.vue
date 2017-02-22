<template>
<div class="ui-module-navbar-content clear-both" v-show="show" transition="fade">
    <div class="pull-right">
        <button class="ui-tool-button" @click="$root.showAllFuns()"><span class="icon icon-tool icon-tool-menu pull-left"></span></button>
    </div>

    <div class="app-date pull-right">{{date}}<span class="app-weather" @click="$root.showWeather=true"><i class="icon-weather {{icon}}"></i></span></div>
</div>
</template>
<script>
export default {
    props: {
        show: {
            type: Boolean,
            require: true,
        }
    },
    data(){
        return {
            date:'',
            icon:''
        }
    },
    watch:{
        '$root.state.weather'(){
            this.icon = this.$root.state.weather[0] && this.$root.state.weather[0].icon || '';
        }
    },
    ready(){

        // 当前时间
        let _date = this.$Tool.iDate(new Date());
        this.date = _date.y+'年'+_date.m+'月'+_date.d+'日 '+_date.w;

        // 当前天气

        this.icon = this.$root.state.weather[0] && this.$root.state.weather[0].icon || '';



    }
}

</script>
<style>
.fade-enter {
    animation: fade-in .3s;
}

.fade-leave {
    animation: fade-out .3s;
}

@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes fade-out {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

</style>
