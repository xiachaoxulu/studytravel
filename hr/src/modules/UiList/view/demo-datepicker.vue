<template>
<div class="ui-panel">
    <div class="ui-panel-title">日期插件</div>
    <div class="ui-panel-content">

        <table class="table table-bordered">
            <tr>
                <td>参数</td>
                <td>类型</td>
                <td>说明</td>
            </tr>
            <tr>
                <td>range</td>
                <td>Boolean</td>
                <td>开启日期范围选择</td>
            </tr>
            <tr>
                <td>width</td>
                <td>String</td>
                <td>显示宽度，例如200px,100%，默认200px,</td>
            </tr>
            <tr>
                <td>time</td>
                <td>String</td>
                <td>【双向】输入输出时间</td>
            </tr>
            <tr>
                <td>startTime</td>
                <td>String</td>
                <td>【双向】开启range后，时间范围的开始时间</td>
            </tr>
            <tr>
                <td>endTime</td>
                <td>String</td>
                <td>【双向】开启range后，时间范围的结束时间</td>
            </tr>
            <tr>
                <td>clearable</td>
                <td>Boolean</td>
                <td>是否显示清空按钮</td>
            </tr>
            <tr>
                <td>format</td>
                <td>String</td>
                <td>显示格式，默认 yy-MM-dd，MM必须大写</td>
            </tr>
            <tr>
                <td>disabled</td>
                <td>Boolean</td>
                <td>禁用</td>
            </tr>

            <tr>
                <td>HHMM</td>
                <td>Boolean</td>
                <td>是否开启选择小时分钟</td>
            </tr>
            <tr>
                <td>callback</td>
                <td>Function</td>
                <td>日期修改后的回调，如果是单选日期，返回的参数为time,如果是多选日期，返回的参数是[startTime,endTime]数组</td>
            </tr>
            <tr>
                <td>showType</td>
                <td>String</td>
                <td>显示类型 dd 默认显示日 mm 显示月份选择 yy 显示年份选择</td>
            </tr>
        </table>


        <div>StartTime:{{startTime}}</div>
        <div>EndTime:{{endTime}}</div>
        <div>Time:{{time}}</div>
        <div>
            <button @click="setTime">设置time</button>
        </div>

        <p>带时间选择</p>
        <ui-datepicker :callback="test" :HHMM="true" :time.sync="time"></ui-datepicker>

        <p>设定显示类型</p>
        <ui-datepicker :callback="test" :time.sync="time" show-type="mm" format="yyyy-MM"></ui-datepicker>
        <br>
        <ui-datepicker :callback="test" :time.sync="time" show-type="yy" format="yyyy"></ui-datepicker>
        <br>

        <ui-datepicker :start-time.sync="startTime" :end-time.sync="endTime" :callback="test" range show-type="mm" format="yyyy-MM"></ui-datepicker><button @click="clearRange()">清空</button><button @click="setRange()">赋值</button>
        <br>
        <ui-datepicker :start-time.sync="startTime" :end-time.sync="endTime" :callback="test" range show-type="yy" format="yyyy"></ui-datepicker><button @click="clearRange()">清空</button><button @click="setRange()">赋值</button>


        <p>默认</p>
        <!--base-->
        <ui-datepicker :callback="test"></ui-datepicker>

        <p>disabled</p>
        <!--disabled-->
        <ui-datepicker disabled></ui-datepicker>

        <p>显示清空按钮</p>
        <!--show clear button-->
        <ui-datepicker clearable></ui-datepicker>

        <p>设置宽度186px</p>
        <!--set width-->
        <ui-datepicker width="186"></ui-datepicker>

        <p>显示格式</p>
        <!--format display-->
        <ui-datepicker format="yyyy/MM/dd"></ui-datepicker>

        <p>双向绑定time</p>

        <!--bind modal-->
        <ui-datepicker :time.sync="time"></ui-datepicker><button @click="time=''">清空</button><button @click="time='2016-06-06'">赋值</button>

        <p>选择范围时间</p>
        <!--show range-->
        <ui-datepicker :start-time.sync="startTime" :end-time.sync="endTime" :callback="test" range></ui-datepicker><button @click="clearRange()">清空</button><button @click="setRange()">赋值</button>

        <ui-datepicker :start-time.sync="startTime" :end-time.sync="endTime" :callback="test" range></ui-datepicker><button @click="clearRange()">清空</button><button @click="setRange()">赋值</button>

    </div>
</div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            time: '2016-05-15',
            startTime: new Date('2016-03-31').getTime(),
            endTime: new Date('2016-03-31').getTime()
        }
    },
    methods: {
        setTime() {
            this.time = null;
        },
        test(date) {
            console.log(date)
                // alert('时间改变了')
        },
        setRange() {
            this.startTime = '2016-06-01'
            this.endTime = '2016-06-02'
        },
        clearRange() {
            this.startTime = ''
            this.endTime = ''
        }
    }
}
</script>
