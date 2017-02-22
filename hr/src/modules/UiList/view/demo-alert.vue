<template>

            <div class="ui-panel">
                <div class="ui-panel-title">提示</div>
                <div class="ui-panel-content">

                        <p>
                            <button class="btn btn-default btn-lg"
                              @click="showTip">
                              点击显示全局提示
                            </button>
                        </p>

                        <table class="table table-bordered">
                            <tr>
                                <td>方法</td>
                                <td>说明</td>
                                <td>参数</td>
                            </tr>
                            <tr>
                                <td>
                                    <p>组件中使用 <strong>this.$root.showTip(data)</strong></p>
                                    <p>store中使用 <strong>Vue.tool.showTip(data)</strong></p>
                                </td>
                                <td>显示</td>
                                <td>
                                    <pre>
                                    <code>
                                        {
                                            type:'success',     // 提示类型 success,warning,info,danger
                                            msg:'全局提示信息', // 提示文字
                                            duration:1000       // 自动消失时间
                                        }
                                    </code>
                                    </pre>

                                </td>
                            </tr>
                            <tr>
                                <td>this.$root.hideTip()</td>
                                <td>隐藏</td>
                                <td></td>
                            </tr>
                        </table>


                    <h4>组件api</h4>
                    <div class="api">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Default</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>show</td>
                                    <td>
                                        <code>Boolean</code>
                                    </td>
                                    <td>
                                        <code>true</code>
                                    </td>
                                    <td>Whether show the component</td>
                                </tr>
                                <tr>
                                    <td>dismissable</td>
                                    <td>
                                        <code>Boolean</code>
                                    </td>
                                    <td>
                                        <code>false</code>
                                    </td>
                                    <td>Whether show close button</td>
                                </tr>
                                <tr>
                                    <td>type</td>
                                    <td>
                                        <code>String</code>
                                        , one of
                                        <code>success</code>
                                        <code>info</code>
                                        <code>warning</code>
                                        <code>danger</code>
                                    </td>
                                    <td>
                                        <code>success</code>
                                    </td>
                                    <td>Components styles</td>
                                </tr>
                                <tr>
                                    <td>duration</td>
                                    <td>
                                        <code>Number</code>
                                    </td>
                                    <td>
                                        <code>0</code>
                                    </td>
                                    <td>
                                        Auto close duration. Set
                                        <code>0</code>
                                        or a negative number will NOT be auto-close.
                                    </td>
                                </tr>
                                <tr>
                                    <td>width</td>
                                    <td>
                                        <code>String</code>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>placement</td>
                                    <td>
                                        <code>String</code>
                                        . one of
                                        <code>top</code>
                                        ,
                                        <code>top-right</code>
                                    </td>
                                    <td></td>
                                    <td>how to position the component.</td>
                                </tr>
                            </tbody>
                        </table>                    </div>

                    <div class="demo">



                        <button class="btn btn-default btn-lg"
                          @click="showRight = !showRight">
                          Click to toggle alert on right
                        </button>

                        <button class="btn btn-default btn-lg"
                          @click="showTop = !showTop">
                          Click to toggle alert on top
                        </button>
                        <hr>
                        <ui-alert type="success" >
                          <strong>Well Done!</strong>
                          You successfully read this important alert message.
                        </ui-alert>

                        <ui-alert type="info" >
                          <strong>Heads up!</strong> This alert needs your attention, but it's not super important.
                        </ui-alert>

                        <ui-alert type="error" dismissable>
                          <strong>Oh snap!</strong> Change a few things up and try submitting again.
                        </ui-alert>

                        <ui-alert type="warning" dismissable>
                          <strong>Warning!</strong> Better check yourself, you're not looking too good.
                        </ui-alert>

                        <ui-alert
                          :show.sync="showRight"
                          :duration="3000"
                          type="success"
                          width="400px"
                          placement="top-right"
                          dismissable
                        >
                          <span class="icon-ok-circled alert-icon-float-left"></span>
                          <strong>Well Done!</strong>
                          <p>You successfully read this important alert message.</p>
                        </ui-alert>

                        <ui-alert
                          :show.sync="showTop"
                          :duration="3000"
                          type="error"
                          width="400px"
                          placement="top"
                          dismissable>
                          <span class="icon-info-circled alert-icon-float-left"></span>
                          <strong>Heads up!</strong>
                          <p>This alert needs your attention.</p>
                        </ui-alert>


                    </div>

                </div>
            </div>

</template>
<script type="text/javascript">
export default {
    data(){
        return {

        showRight:false,
        showTop:false,

        }
    },
    methods:{
        showTip(){
            this.$root.showTip({
                type:'success',// 提示类型 success,warning,info,danger
                msg:'全局提示信息',
                duration:3000
            })

        }
    }
}
</script>
