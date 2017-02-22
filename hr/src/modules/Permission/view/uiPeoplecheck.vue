<template>
    <ul class="clear-both">
        <li v-for="item in list">
            <ui-checkbox :value.sync="checklist[$index]" vali="required|date">{{item[name]}}</ui-checkbox>
            <ui-datepicker :start-time.sync="startTime[$index]" :end-time.sync="endTime[$index]" range format="yyyy/MM/dd"></ui-datepicker>
        </li>
    </ul>
</template>
<script>
    import Vue from 'vue';
    const Tool = Vue.tool;
    export default {
        props: {
            // 数据列表
            list: {
                required: true,
            },
            // list 中 name 对应的字段名
            name: {
                type: String,
                required: true,
            },
            // list 中 id 对应的字段名
            id: {
                type: String,
            },
            // 已选id或index的列表
            value: {
                type: Array,
                twoWay: true,
                default(){
                    return [];
                }
            },
        },
        watch: {
            list(){
                this.init();
                for (var i = 0; i < this.list.length; i++) {
                    this.startTime.$set(i,Tool.iDate(new Date().getTime(),'yy/mm/dd').time-0);
                    this.endTime.$set(i,Tool.iDate(new Date().getTime(),'yy/mm/dd',1).time-0);
                }
            },
            checklist(){
                this.dataUpdate();
            },
            startTime(){
                this.dataUpdate(this.startTime);
            },
            endTime(){
                this.dataUpdate();
            }
        },
        data(){
            return {
                // 状态列表
                checklist: [],
                // 数据列表
                datalist: [],
                startTime: ['2016/06/06'],
                endTime: []
            }
        },
        methods: {
            dataUpdate(){
                let _this = this;
                let _checked = [];
                let _value = '|' + this.value.join('|') + '|';

                // 监测选项状态
                this.checklist.forEach(function (checked, index) {
                    let _id = _this.id ? _this.datalist[index][_this.id] : index;
                    let _userNum = _this.datalist[index].userNum;
                    let _userName = _this.datalist[index].userName;
                    let _startTime = _this.startTime[index];
                    let _endTime = _this.endTime[index];
                    if (checked) {
                        _checked.push({
                            id: _id,
                            userNum: _userNum,
                            userName: _userName,
                            startTime: _startTime,
                            endTime: _endTime
                        })
                    }

                });

                this.value = _checked;
            },
            init(){
                let _this = this;
                let _checklist = [];
                let _value = '|' + this.value.join('|') + '|';

                // 如果传入的是对象，需要转换为数组
                let _list = [];
                for (var i in this.list) {
                    _list.push(this.list[i])
                }
                this.datalist = _list;

                // 初始化选项状态
                this.datalist.forEach(function (item, index) {

                    let _id = _this.id ? item[_this.id] : index;

                    if (_value.indexOf('|' + _id + '|') > -1) {
                        _checklist.push(true)
                    } else {
                        _checklist.push(false)
                    }

//                _this.startTime.push('')
//                _this.endTime.push('')

                });

                this.checklist = _checklist;
            }

        },

        ready(){
            this.init();
        }
    }
</script>
