<template>
    <div class="ui-panel">

        <div class="ui-panel-title">transfer 穿梭框 </div>
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

            <div>已选时间：{{transfer1}}</div>
            <br>
            <ui-transfer :endData.sync="transfer1"></ui-transfer>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                transfer1:[1,2,3,4,5,6,7,8,9,10],
            }
        }
    }
</script>