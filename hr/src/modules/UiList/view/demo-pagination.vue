<template>
<div class="ui-panel">

    <div class="ui-panel-title">分页</div>
    <div class="ui-panel-content">
        <table class="table table-bordered">
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Required</th>
                    <th>Description</th>
                </tr>
                <tr>
                    <td>current</td>
                    <td>
                        <code>Number</code>
                    </td>
                    <td>
                        <code>1</code>
                    </td>
                    <td></td>
                    <td>
                       当前页【 必填，双向绑定，】
                    </td>
                </tr>
                <tr>
                    <td>limit</td>
                    <td>
                        <code>Number</code>
                    </td>
                    <td>
                        <code>7</code>
                    </td>
                    <td></td>
                    <td>
                        可见分页标签数量【可选】
                    </td>
                </tr>
                <tr>
                    <td>perpage</td>
                    <td>
                        <code>Number</code>
                    </td>
                    <td>
                        <code>20</code>
                    </td>
                    <td></td>
                    <td>
                        每页数据量【必填，双向绑定】
                    </td>
                </tr>
                <tr>
                    <td>total</td>
                    <td>
                        <code>Number</code>
                    </td>
                    <td>
                        <code>20</code>
                    </td>
                    <td></td>
                    <td>
                        数据总量【必填】
                    </td>
                </tr>
                <tr>
                    <td>refresh</td>
                    <td>
                        <code>Boolean</code>
                    </td>
                    <td>
                        <code>false</code>
                    </td>
                    <td></td>
                    <td>
                        是否显示刷新按钮，点击后会向父组件dispatch refresh事件，所以父组件需要注册refresh事件
                    </td>
                </tr>
                <tr>
                    <td>nobg</td>
                    <td>
                        <code>Boolean</code>
                    </td>
                    <td>
                        <code>true</code>
                    </td>
                    <td></td>
                    <td>
                        是否去掉背景色
                    </td>
                </tr>
                <tr>
                    <td>pages</td>
                    <td>
                        <code>Array</code>
                    </td>
                    <td>
                        <code>[]</code>
                    </td>
                    <td></td>
                    <td>
                        分页数量列表
                    </td>
                </tr>
                <tr>
                    <td>active</td>
                    <td>
                        <code>String</code>
                    </td>
                    <td>
                        <code>success</code>
                    </td>
                    <td></td>
                    <td>
                        <p>当前页标签class</p>
                        <p>
                            可选值
                            <code>secondary</code>
                            <code>primary</code>
                            <code>success</code>
                            <code>info</code>
                            <code>warning</code>
                            <code>danger</code>
                            <code>link</code>
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>

        <p>
            当前页：{{currentPage}} <br>
            当前分页数：{{perPage}}
        </p>

        <div>
            <ui-pagination
                active="success"
                :total="200"
                :perpage.sync="perPage"
                :current.sync="currentPage"
                :pages = "pages"
                :refresh = "true"
            >
            </ui-pagination>

        </div>

        <div style="margin-top: 30px;">
            <ui-pagination
                active="success"
                :total="200"
                :perpage.sync="perPage"
                :current.sync="currentPage"
                :pages = "pages"
                :nobg = "true"
            >
            </ui-pagination>
        </div>





    </div>
</div>
</template>

<script type="text/javascript">
export default{
  data(){
    return {
        currentPage:1,
        perPage:20,
        pages:[20,30,40,50]
    }
  }

}
</script>
