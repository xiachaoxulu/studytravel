<template>
    <div>
        <ui-checkbox v-for="item in list" :value.sync="checklist[$index]" >{{item[name]}}</ui-checkbox>
    </div>
</template>
<script>
export default {
    props:{
        // 数据列表
        list:{
            required:true,
        },
        // list 中 name 对应的字段名
        name:{
            type:String,
            required:true,
        },
        // list 中 id 对应的字段名
        id:{
            type:String,
        },
        // 已选id或index的列表
        value:{
            type:Array,
            twoWay:true,
            default(){
                return [];
            }
        },
    },
    watch:{
        list(){
            this.isinit = true;
            this.init();
        },
        value(){
            this.isinit = true;
            this.init();
        },
        checklist(){

            if(this.isinit) return;

            let _this = this;
            let _checked = [];
            let _value = '|'+this.value.join('|')+'|'

            // 监测选项状态
            this.checklist.forEach(function(checked,index){

                let _id = _this.id ? _this.datalist[index][_this.id] : index;

                if(checked){
                    _checked.push(_id)
                }

            })

            this.value = _checked;
        }
    },
    data(){
        return {
            // 状态列表
            checklist:[],
            // 数据列表
            datalist:[],
            // 初始化中
            isinit:false,
        }
    },
    methods:{
        init(){
            let _this = this;
            let _checklist = [];
            let _value = '|'+this.value.join('|')+'|';

            // 如果传入的是对象，需要转换为数组
            let _list = [];
            for (var i in this.list) {
                _list.push(this.list[i])
            }
            this.datalist = _list;

            // 初始化选项状态
            this.datalist.forEach(function(item,index){

                let _id = _this.id ? item[_this.id] : index;

                if(_value.indexOf('|'+_id+'|')>-1){
                    _checklist.push(true)
                }else{
                    _checklist.push(false)
                }

            });

            this.checklist = _checklist;

            this.$nextTick(function(){
                this.isinit = false;
            })

        }

    },

    ready(){

        this.init();

    }
}
</script>
