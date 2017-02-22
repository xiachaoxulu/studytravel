<template>
    <div  class="ui-panel">
        <div class="ui-panel-title">折叠面板 ui-collapse</div>
        <div class="ui-panel-content">
            <h4>简单展示</h4>
            <div style="width:300px">
                <ui-collapse title="折叠面板" icon="icon-jbxi">
                    <div style="border-top:1px solid #ccc;">
                        <p>内容</p>
                        <p>内容</p>
                        <p>内容</p>
                        <p>内容</p>
                        <p>内容</p>
                        <p>内容</p>
                    </div>
                </ui-collapse>
            </div>
            <table class="table table-bordered">
                <tr>
                    <td>参数</td>
                    <td>类型</td>
                    <td>说明</td>
                </tr>
                <tr>
                    <td>title</td>
                    <td>String</td>
                    <td>折叠面板title信息</td>
                </tr>
                <tr>
                    <td>icon</td>
                    <td>String</td>
                    <td>title的icon class</td>
                </tr>

                <tr>
                    <td>mt20</td>
                    <td>String</td>
                    <td>margin-top 上间距</td>
                </tr>
                <tr>
                    <td>no-border</td>
                    <td>String</td>
                    <td>去掉边框</td>
                </tr>

            </table>
        </div>
    </div>
</template>
<script>
    export default{
        data (){
            return{

            }
        }
    }
</script>
<style>
    .icon-jbxi{
        display: block;
        float: left;
        width: 30px;
        height: 28px;
        margin-right: 24px;
    }
    .icon-jbxi {
        background: url(../../../assets/images/jbxi.png) no-repeat;
    }
</style>