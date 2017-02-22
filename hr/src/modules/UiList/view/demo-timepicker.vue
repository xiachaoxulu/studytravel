<template>
                <div class="ui-panel">

                    <div class="ui-panel-title">TimePicker 时间选择框 </div>
                    <div class="ui-panel-content">
                        <table class="table table-bordered">
                            <thead>
                                <td colspan="2">组件说明</td>
                            </thead>
                            <tr>
                                <td>time</td>
                                <td>时间输出</td>
                            </tr>
                        </table>

                        <div>已选时间：{{timePicker1}}</div>
                        <br>
                        <ui-timepicker :time.sync="timePicker1"></ui-timepicker>
                    </div>
                </div>
</template>
<script>
export default {
    data(){
        return{
            timePicker1:'',
        }
    }
}
</script>