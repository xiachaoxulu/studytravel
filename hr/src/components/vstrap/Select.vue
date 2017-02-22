<template>
<div class="ui search dropdown selection multiple" :class="{'active visible':show,'fluid':fluid,'disabled':disabled}"  @click="toggleDropdown">

    <input visible="hidden" type="text" :value="value"></input>

    <div class="labelList {{ labelHidden ? 'isHidden' : ''}} {{overflow==='hidden' ? 'willHidden' : ''}}" v-if="names.length>0" v-el:labellist>
        <div class="labelContain" v-el:labelcontain>
            <span v-for="item in names" track-by="$index" class="label label-default" data-value="{{item}}"   @click.stop="">{{item}} <i class="material-icons" @click.stop="removeItem($index)">close</i></span>
        </div>
    </div>

    <i class="material-icons dropdown icon">arrow_drop_down</i>
    <!-- <input v-el:searchbox v-if="search" class="search"  autocomplete="off" tabindex="0"> -->

    <div class="default text" v-el:btn >
        {{placeholder}}
    </div>

    <div v-show="showNotify" class="notify">最多选择（{{limit}}）个</div>

    <div class="menu transition visible" tabindex="-1" @click.prevent.stop>

        <div class="selectBts" v-if="multiple && toolbar" >
            <button @click="selectAll">全选</button>
            <button @click="selectToggle">反选</button>
            <button @click="clearAll">清空</button>
        </div>

        <template v-if="options.length">

            <div v-for="option in options | filterBy searchText " v-bind:id="option.value" @click="select(option.value,option.name)" class="item" >{{ option.name }}<span class="ui-icon material-icons check small" v-show="value.indexOf(option.value) !== -1">check</span></div>

        </template>
        <slot v-else></slot>

    </div>
</div>

</template>

<script>
import coerceBoolean from './utils/coerceBoolean.js'
import EventListener from 'libs/utils/EventListener'

export default {
    props: {
        // 选项列表 [{label,name}...]
        options: {
            type: Array,
            default () {
                return []
            },
        },
        // 已选项
        value: {
            type:Array,
            twoWay: true,
            required:true
        },
        // 默认文字
        placeholder: {
            type: String,
            default: '请选择'
        },
        // 是否多选
        multiple: {
            type: Boolean,
            coerce: coerceBoolean,
            default: false
        },
        // search: { // Allow searching (only works when options are provided)
        //     type: Boolean,
        //     coerce: coerceBoolean,
        //     default: false
        // },
        // 多选限制
        limit: {
            type: Number,
            default: 1024
        },
        // 选中后关闭下拉
        closeOnSelect: { // only works when multiple==false
            type: Boolean,
            coerce: coerceBoolean,
            default: false
        },
        // 禁用
        disabled: {
            type: Boolean,
            coerce: coerceBoolean,
            default: false
        },
        // 是否100%
        fluid:{
            type: Boolean,
            coerce: coerceBoolean,
            default: false
        },
        // 多选选项超出一行是否隐藏，默认隐藏
        overflow:{
            type:String,
            default:'visible'
        },
        // 多选是否显示工具条 全选 反选 清空
        toolbar:{
            type:Boolean,
            default:true
        }
    },

    events:{
        formReset(){
            this.value = [];
        }
    },

    data() {
        return {
            searchText: null,
            show: false,
            showNotify: false,
            names:[],
            search:false,
            allNames:{},
            labelHidden:false, // label超出一行时是否隐藏
        }
    },
    computed: {
        selectedItems() {
            let foundItems = []
            if (this.value.length) {
                for (let item in this.value) {
                    if (typeof this.value[item] === "string") {
                        foundItems.push(this.value[item])
                    }
                }
                return foundItems
            }
        },
        showPlaceholder() {
            return this.value.length === 0
        }
    },
    watch: {
        // 检测是否超出最大可选数目
        value(val) {
            if (val.length > this.limit) {
                this.showNotify = true
                this.value.pop()
                setTimeout(() => this.showNotify = false, 1000)
            }

            this.updateNames();

            // console.log(this.$els.labelcontain)
            this.$nextTick(()=>{
                // 多选状态，超出一行，隐藏
                if(this.multiple && this.overflow==='hidden' && this.$els.labelcontain && this.$els.labellist){
                    if(this.$els.labelcontain.offsetHeight/this.$els.labellist.offsetHeight>=2){
                        this.labelHidden = true;
                    }
                    else{
                        this.labelHidden = false;
                    }
                    console.log(this.$els.labelcontain.offsetHeight,this.$els.labellist.offsetHeight)
                }
            })

        },
        options(){
            this.initData();
        }
    },
    methods: {
        // 全选
        selectAll(){
            this.value = this.options.map(option=>{
                return option.value;
            })
        },
        // 反选
        selectToggle(){
            if(this.value.length===0) return;
            let unselected = this.options.filter(option=>{
                return this.value.indexOf(option.value)<0 ? true : false;
            })
            this.value = unselected.map(option=>{
                return option.value;
            })
        },
        // 清空
        clearAll(){
            this.value = [];
        },
        select(v,n) {
            if(this.disabled) return;

            // console.log(this.value)

            if (this.value.indexOf(v) === -1) {
                if (this.multiple) {
                    this.value.push(v)
                } else {
                    this.value = [v]
                }
            } else {
                if (this.multiple) {
                    this.value.$remove(v)
                }
            }
            if (this.closeOnSelect) {
                this.toggleDropdown()
            }



        },
        toggleDropdown() {

            if(this.disabled) return;

            this.show = !this.show

            // if(this.show && this.search){
            //     this.$els.searchbox.focus();
            // }

        },
        removeItem(v){
            this.value.splice(v,1)
        },

        initData(){

            if(this.options.length==0){
                Array.from(this.$el.querySelectorAll('div.menu div.item')).forEach(item=>{
                    let name = item.getAttribute('name');
                    let value = item.getAttribute('value');
                    this.allNames[value] = name;
                });

            }else{
                this.options.forEach(item=>{
                    let name = item.name;
                    let value = item.value;
                    this.allNames[value] = name;
                });
            }


            let _this = this;

            if (this.value.constructor !== Array) {
                if (this.value.length === 0) {
                    this.value = []
                } else {
                    this.value = [this.value]
                }
            } else {
                if (!this.multiple && this.value.length > 0) {
                    this.value = this.value.slice(0, 1)
                }
                else if (this.multiple ) {

                    if(this.value.length > this.limit){
                        this.value = this.value.slice(0, this.limit)
                    }

                }
            }

            this.updateNames()

        },

        updateNames(){
            this.names = [];
            this.value.forEach(item => {
                this.names.push(this.allNames[item]);
            })

        },
    },
    ready() {

        this.initData();

        const el = this.$el
        this._closeEvent = EventListener.listen(window, 'click', (e) => {
            if (!el.contains(e.target)) this.show = false;
        })
    },
    beforeDestroy() {
        if (this._closeEvent) this._closeEvent.remove()
    }
}
</script>
<style scoped>
.ui.multiple.search.dropdown > .labelList{
    position: relative;
    display: inline-block;
    width: 100%;
    height: auto;
    overflow: hidden;
    text-overflow: ellipsis;
}
.ui.multiple.search.dropdown > .labelList ~ .text {
    display: none;
}
.ui.multiple.search.dropdown > .labelList.willHidden{
    height: 30px;
}
.ui.multiple.search.dropdown > .labelList.isHidden:after{
    z-index: 10;
    position: absolute;
    right: 0px;
    top: 0px;
    display: block;
    width: 20px;
    height: 100%;
    line-height: 24px;
    content:'...';
    font-weight: bold;
    background: #fff;
    text-align: center;
}
.selectBts{
    border-top: 1px dashed #ccc;
    /*border-bottom: 1px dashed #ccc;*/
    padding: 10px 0 10px 8px;
}
.selectBts button{
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px 10px;
    background: #fff;
}
.selectBts button:hover{
    background: #ddd;
}
</style>
