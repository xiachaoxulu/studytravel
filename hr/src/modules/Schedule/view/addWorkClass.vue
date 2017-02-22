<template >
    <div>

        <div class="form-horizontal container-fluid" role="form">
            <div class="form-body">

                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group row">
                            <label class="col-sm-6 control-label">班次名称</label>
                            <div class="col-sm-18">
                                <div class="input-inline input-medium">
                                    <input type="name" v-model="workClassForm.name" class="form-control" placeholder="班次名称">
                                </div>
                                <!-- <span class="help-block">必填项</span> -->
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12" style="display:none;">
                        <div class="form-group row">
                            <label class="col-sm-6 control-label">班次类型</label>
                            <div class="col-sm-18">
                                <div class="radio-group">
                                    <ui-radio name="worktimetype" value="1" :model.sync="workClassForm.timeType" label="上班" checked></ui-radio>
                                    <!-- <ui-radio name="worktimetype" value="4" :model.sync="workClassForm.timeType" label="排休"></ui-radio> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">

                    <label class="col-sm-3 control-label">可选风格</label>
                    <div class="col-sm-21">

                        <div class="workStyleList">

                            <span class="workStyleItem" :style="{'color':workClassForm.fontcolor,'background':workClassForm.bgcolor}">当前风格</span>

                            <span @click="setColor(style[0],style[1])" class="workStyleItem" v-for="style in state.workStyle" :style="{'color':style[0],'background':style[1]}">班次</span>


                            <div>
                                <v-dropdown>
                                    <button type="button" class="btn btn-default" data-toggle="dropdown">
                                        自定义字体颜色
                                        <span class="caret"></span>
                                    </button>
                                    <div name="dropdown-menu" class="dropdown-menu">
                                        <ui-colorpicker :colors.sync="styleCustom.color"></ui-colorpicker>
                                    </div>
                                </v-dropdown>

                                <v-dropdown>
                                    <button type="button" class="btn btn-default" data-toggle="dropdown">
                                        自定义背景颜色
                                        <span class="caret"></span>
                                    </button>
                                    <div name="dropdown-menu" class="dropdown-menu">
                                        <ui-colorpicker :colors.sync="styleCustom.bg"></ui-colorpicker>
                                    </div>
                                </v-dropdown>
                            </div>

                        </div>


                    </div>

                </div>

                <div class="form-group row" v-if="workClassForm.timeType==1?true:false">
                    <label class="col-sm-3 control-label" style="margin-top:15px;">工作时段</label>
                    <div class="col-sm-21">
                        <ul class="customTimeList">
                            <li v-for="citem in workClassTime" class="customItem" >
                                <ui-timepicker :time.sync="citem.startTime"></ui-timepicker>
                                <span>到&nbsp;&nbsp;</span>
                                <ui-timepicker :time.sync="citem.endTime"></ui-timepicker>

                                <button type="button" class="btn btn-default" @click="customWorkTimeCtrl('delete',$index)">删除</button>
                            </li>
                        </ul>

                        <div style="margin-top: 20px;">
                            <button class="btn btn-default" @click="customWorkTimeCtrl('add')">添加时段</button>
                        </div>
                        <div style="padding-top:20px;">跨天时段格式：[23:00](今天<24:00) 大于 [05:00](明天>00:00) <br>支持存在一个跨天时段</div>

                    </div>
                </div>
            </div>
            <div class="form-actions">
                <div class="row">
                    <div class="text-center">
                        <ui-button color="accent" @click="customWorkTimeCtrl('submit')" class="large">保存班次</ui-button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>

import store from '../store';
export default {
    attached(){

        // let type = '';
        // if (this.$route.params.type == 'department') {
        //     type = 1;
        // } else if (this.$route.params.group == 'manager') {
        //     type = 2;
        // } else if (this.$route.params.group == 'service') {
        //     type = 3;
        // }

        this.workClassForm.type = this.state.workClassType;
    },
    data() {
        return {

            state:store.state,


            // 自定义风格
            styleCustom:{
                color:{
                    hex:'#ffffff'
                },
                bg:{
                    hex:'#333333'
                }
            },

            workClassForm:{
                name:'',    // 班次名称
                fontcolor:'',
                bgcolor:'',
                type:'',    // 班次类型 1: 部门 2:管理组 3:服务组 与state.workClassType相同
                timeType:''
            },
            // 班次时间 暂存
            workClassTime:[
                {
                    startTime:'00:00',
                    endTime:'00:00'
                }
            ],
            ctrlType:'add',
            ctrlIndex:''
        }
    },
    watch:{
        'styleCustom.color.hex'(val){
            this.workClassForm.fontcolor = this.styleCustom.color.hex;
            this.workClassForm.bgcolor = this.styleCustom.bg.hex;
        },
        'styleCustom.bg.hex'(val){
            this.workClassForm.fontcolor = this.styleCustom.color.hex;
            this.workClassForm.bgcolor = this.styleCustom.bg.hex;
        },
    },
    methods:{

        // 设置颜色
        setColor(color,bg){
            this.workClassForm.bgcolor = bg;
            this.workClassForm.fontcolor = color;
        },

        // 自定义班次 操作
        customWorkTimeCtrl(type,data){

            // 增加自定义班次 时间段
            if(type=='add'){


                // 最多五个时间段
                if(this.workClassTime.length>=5){

                    this.$root.showTip({
                        type:'error',
                        msg:'班次最多可添加5个时段，如果您的时段过多请考虑是否分班次'
                    })
                    // alert('时间不能为空')
                    return;
                }

                this.workClassTime.push({
                    startTime:'00:00',
                    endTime:'00:00'
                })
            }
            else if(type=='delete'){
                var index = data;
                this.workClassTime.splice(index,1);

            }
            // 提交班次
            else if(type=='submit'){

                var workTime = [];

                if(this.workClassForm.timeType==''){
                    this.$root.showTip({
                        type:'error',
                        msg:'班次类型不能为空'
                    })

                    return;
                }
                if(this.workClassForm.name==''){
                    this.$root.showTip({
                        type:'error',
                        msg:'班次名称不能为空'
                    })

                    return;
                }
                if(this.workClassForm.bgcolor==''){
                    this.$root.showTip({
                        type:'error',
                        msg:'请选择班次风格'
                    })

                    return;
                }


                if(this.workClassTime.length==0){

                    this.$root.showTip({
                        type:'error',
                        msg:'时间不能为空'
                    })
                    // alert('时间不能为空')
                    return;
                }


                // 排休
                if(this.workClassForm.timeType=='4'){


                    this.workClassTime = [
                        {
                            startTime:'00:00',
                            endTime:'24:00'
                        }
                    ];

                    workTime = ['00:00/24:00'];

                }else{


                    let timeList = store.actions.filterMutliWorkTime(this.workClassTime);

                    if(!timeList || timeList.length==0) return;
                    timeList.forEach(time=>{
                        workTime.push(time.startTime+'/'+time.endTime)
                    });



                }



                if(this.ctrlType=='add'){

                    let type = '';
                    if (this.$route.params.type == 'department') {
                        type = 1;
                    } else if (this.$route.params.group == 'manager') {
                        type = 2;
                    } else if (this.$route.params.group == 'service') {
                        type = 3;
                    }

                    this.workClassForm.type = type;

                    store.actions.eidtWorkClass('add',{
                        type: this.workClassForm.type,
                        timeType:this.workClassForm.timeType,
                        name: this.workClassForm.name,
                        time: workTime.concat([]),
                        fontcolor:this.workClassForm.fontcolor,
                        bgcolor:this.workClassForm.bgcolor
                    });

                }
                else if(this.ctrlType=='update'){

                    store.actions.eidtWorkClass('update',{
                        type: this.workClassForm.type,
                        timeType:this.workClassForm.timeType,
                        name: this.workClassForm.name,
                        time: workTime.concat([]),
                        fontcolor:this.workClassForm.fontcolor,
                        bgcolor:this.workClassForm.bgcolor
                    },this.ctrlIndex);


                }

                // 关闭

                this.$dispatch('hideAddWorkClass')


            }
        }

    },

    events:{
        // 初始化数据，清空数据
        initWorkClassData(){

            this.ctrlType = 'add';
            this.workClassForm = {
                valid:1,
                name:'',    // 班次名称
                fontcolor:'',
                bgcolor:'',
                type:'',
                timeType:''
            }

            this.workClassForm.type = this.state.workClassType;

            // 班次时间 暂存
            this.workClassTime = [
                {
                    startTime:'00:00',
                    endTime:'00:00'
                }
            ]

        },
        // 修改班次
        changeAddWorkClass(id,index){

            this.ctrlIndex = index;
            this.ctrlType = 'update';

            // console.log(id,index)
            var data = store.actions.getWorkClassByID(id);

            console.log(data)

            for(var key in this.workClassForm){

                if (key == 'timeType') {
                    this.workClassForm[key] = data[key]+'';
                }
                else {
                    this.workClassForm[key] = data[key];
                }

            }

            if(typeof(data.time)=='string' && data.time.indexOf('[')==0){
                data.time = JSON.parse(data.time)
            }

            this.workClassTime = [];

            for(let i=0,len=data.time.length;i<len;i++){

                var time = data.time[i].split('/');

                this.workClassTime.push({
                    startTime:time[0],
                    endTime:time[1]
                })

            }


        }
    }
}

</script>


<style scoped>

.customTimeList{
    list-style:none;
    margin: 0;
}
.customItem{
    margin-bottom: 10px;
}
.workStyleList{
    padding-bottom: 20px;
}
.workStyleItem{
    display: inline-block;
    height: 40px;
    padding: 0 10px;
    margin-bottom: 20px;
    line-height: 40px;
    text-align: center;
    border-radius: 6px;
    margin-right: 20px;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0,0,0,0.2);
}
.workStyleItem:hover{
    box-shadow: none;
}
.workStyleItem:active{
    animation: rubberBand .2s;
}

.workStyle{
/*    width: 100px;
    height: 50px;
    border: 1px solid #ddd;
    text-align: center;
    line-height: 50px;
*/}
</style>
