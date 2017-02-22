<template>
<div class="cp-pagination">
    <div class="_disableCover" v-if="disable"></div>
    <span class="_total pull-left" style="padding-top:5px;">共计 {{total}} 条数据</span>
    <div class="btn-group ui-pagenation" :class="{'nobg':nobg}">

        <!-- first -->
        <button type="button" class="bt-ctrl btn btn-default" v-bind:disabled="current == 1 " v-on:click.prevent="current=1"><i class="material-icons">first_page</i></button>
        <!-- prev -->
        <button type="button" class="bt-ctrl btn btn-default" v-bind:disabled="current == 1 " v-on:click.prevent="(current == 1) ? return : current--"><i class="material-icons">chevron_left</i></button>

        <!-- page1 -->
        <button type="button" class="btn  btn-default {{ current == 1 ?  'active' : '' }}" v-on:click.prevent="current = 1" v-show="showPrev">1</button>

        <!-- ... -->
        <span class="btn btn-default" v-show="showPrev">...</span>

        <!-- pages -->
        <button type="button"
            class="btn {{btnActive($index)}} {{ $index + diff == current ? 'active' : '' }} {{ $index + diff != current ? 'hidden-xs-down' : '' }}"
            v-for="item in pageLinks"
            v-on:click.prevent="current = $index + diff">{{$index + diff}}
        </button>

        <!-- ... -->
        <span class="btn btn-default" v-show="showNext">...</span>

        <!-- page last -->
        <button type="button" class="btn btn-default {{ numberOfPages == current ? 'active' : '' }}" v-show="showNext" v-on:click.prevent="current = numberOfPages">{{numberOfPages}}</button>


        <!-- next -->
        <button type="button" class="bt-ctrl btn btn-default" v-bind:disabled="current == numberOfPages" v-on:click.prevent="(current == numberOfPages) ? return : current++"><i class="material-icons">chevron_right</i></button>

        <!-- last -->
        <button type="button" class="bt-ctrl btn btn-default" v-bind:disabled="current == numberOfPages" v-on:click.prevent="current=numberOfPages"><i class="material-icons">last_page</i></button>


        <!-- refresh -->
        <button v-if="refresh" type="button" class="bt-ctrl btn btn-default" @click="refreshData"><i class="material-icons">refresh</i></button>


        <!-- perpage -->

        <v-dropdown v-if="pages.length>1" class="btn-group" :dropdownvalue.sync="perpage" placement="dropup-dropleft">
            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{perpage}}/页
            <span class="caret"></span>
            </button>
            <ul slot="dropdown-menu" class="dropdown-menu">
                <li v-for="p in pages"><a name="dropdown-item" href="#" :value="p">{{p}}/页</a></li>
            </ul>
        </v-dropdown>


    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            diff: 1,
            showPrev: false,
            showNext: false
        }
    },
    computed: {
        numberOfPages() {
            const result = Math.ceil(this.total / this.perpage)
            return (result < 1) ? 1 : result
        },
        pageLinks() {
            let result = this.limit
            if (this.current > this.numberOfPages) {
                this.current = 1
            }
            this.diff = 1
            this.showPrev = false
            this.showNext = false
                // if less pages than limit just show this pages
            if (this.numberOfPages <= this.limit) {
                return this.numberOfPages
            }
            // if at the beggining of the list or at the end show full number of pages within limit - 2
            // -2 is reserves space for two buttons: "..." and "first/last button"
            if (this.current <= this.limit - 2) {
                this.diff = 1
                this.showNext = true
                result = this.limit - 2
            }
            // at the end of the range
            if (this.current > this.numberOfPages - this.limit + 2) {
                this.diff = this.numberOfPages - this.limit + 3
                this.showPrev = true
                result = this.limit - 2
            }
            // if somehere in the middle show just limit - 4 links in the middle and one button on the left with "..." and on button on the right preceeded with "..."
            if (this.current >= this.limit - 2 && this.current <= this.numberOfPages - this.limit + 2) {
                this.diff = this.current - 1
                this.showPrev = true
                this.showNext = true
                result = this.limit - 4
            }
            return result
        },
    },
    methods: {
        btnActive(index) {
            return (index + this.diff === this.current) ? `btn-${this.active}` : `btn-default`
        },
        refreshData(){
            this.$emit('refresh');
        }
    },

    watch:{
        current(){
            this.currentindex = (this.current-1)*this.perpage || 0;
            this.change();
        },
        perpage(){
            this.change();
        }
    },
    props: {
        // 禁用
        disable:{
            type:Boolean,
            default:false
        },
        // 当前页
        current: {
            required:true,
            twoWay:true,
            type: Number,
            default: 1,
        },
        // 当前页首元素索引
        currentindex:{
            twoWay:true,
            type: Number,
            default: 0,
        },
        // 每页数量
        perpage: {
            required:true,
            twoWay:true,
        },
        // current，perpageg改变时回调
        change:{
            type:Function,
            default(){},
        },
        // 每页数量可选列表
        pages:{
            type:Array,
            default(){
                return [];
            }
        },
        // 总量
        total: {
            required:true,
            type: Number,
        },
        // 当前页class
        active: {
            type: String,
            default: '',
        },
        // 是否显示刷新按钮
        refresh:{
            type:Boolean,
            default:false
        },
        // 是否删除bg
        nobg:{
            type:Boolean,
            default:false,
        },
        // 分页显示标签数
        limit: {
            type: Number,
            default: 7,
        },

    }
}
</script>
<style scoped>
.ui-pagenation {
    position: relative;
}
.ui-pagenation .material-icons{
    line-height: 0;
    position: relative;
    top: 5px;
    font-size: 20px;
    color: #666;
}
.ui-pagenation .bt-ctrl{
    padding-left: 8px!important;
    padding-right: 8px!important;
}
.ui-pagenation.nobg .btn{
    background: none!important;
    border: none!important;
}
.nobg .btn-group.open .dropdown-toggle{
    box-shadow: none!important;
}
.nobg .btn:active,
.nobg .btn.active{
    box-shadow: none!important;
    color: red!important;
}
.nobg .btn{
    color: #666!important;
}
.nobg .btn:hover{
    color: #000!important;
}
.nobg .material-icons:hover{
    color: #333!important;
}
.cp-pagination ._disableCover{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    background: rgba(255,255,255,0.5);
    cursor: not-allowed;
}
</style>
