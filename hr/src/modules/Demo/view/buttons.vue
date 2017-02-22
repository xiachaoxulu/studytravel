<template>

    <!-- 模块主内容 -->
    <section class="ui-module-content pos-content demoShow">

        <div class="ui-module-row">
            <!--  -->
            <div class="ui-panel">


                    <ui-collapsible header="按钮权限配置" :open="true">

                        <table class="table table-bordered">
                            <tr>
                                <td><code>code="id/name/disabled" </code></td>
                                <td><strong>有权限的按钮或元素上需要添加</strong>，例如 <code>code="demo-com-ri/日考勤/disabled"</code></td>
                            </tr>
                            <tr>
                                <td>id</td>
                                <td>按钮命名规则：模块名-页面名-按钮名，例如 demo-user-add</td>
                            </tr>
                            <tr>
                                <td>disabled</td>
                                <td>默认不需要添加，code中没有此属性的按钮直接删除，加上此属性按钮会呈现disable状态，部分按钮的disable状态样式需要自己编写 .buttonName .disabled{}</td>
                            </tr>
                            <tr>
                                <td>attached回调</td>
                                <td>
                                <strong>带有按钮权限的vue文件，必须添加</strong>
                                <pre>
                                    attached(){
                                        // 组件插入dom时进行授权检测
                                        this.$root.checkAuthority(this.$el);
                                    }
                                </pre>
                                </td>
                            </tr>

                        </table>

                    </ui-collapsible>


                    <ui-buttongroup active-class="btn-primary">

                        <button code="demo-com-ri/日考勤/disabled" type="button" class="btn btn-primary">无权限1</button>
                        <button type="button" class="btn btn-default">权限2</button>
                        <button type="button" class="btn btn-default">权限3</button>

                    </ui-buttongroup>


                    <br>
                    <br>

                    <div class="dropdown">
                        <button class="ui-tool-button"><span class="icon icon-tool icon-tool-more pull-left"></span><span class="_name pull-left">更多</span></button>

                        <ul class="dropdown-menu" style="display: block;">
                            <li code="demo-com-ri/日考勤/disabled"><a @click="disabledTest" href="javascript:;">无权限 disabled</a></li>
                            <li ><a href="javascript:;">操作1</a></li>
                            <li ><a href="javascript:;">操作2</a></li>
                        </ul>
                    </div>



            </div>

        </div>

    </section>

</template>
<script>
export default {
    methods:{
        disabledTest(){
            alert('disabledTest')
        }
    },
    attached(){
        // 组件插入dom时进行授权检测
        this.$root.checkAuthority(this.$el);
    }
}
</script>
