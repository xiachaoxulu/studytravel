<template>
            <div class="ui-panel">

                <div class="ui-panel-title">sidebar 右侧划入窗口 </div>
                <div class="ui-panel-content">
                    <table class="table table-bordered">
                        <thead>
                            <td colspan="2">组件说明</td>
                        </thead>
                        <tr>
                            <td>show</td>
                            <td>双向绑定，显示slider</td>
                        </tr>
                        <tr>
                            <td>title</td>
                            <td>标题</td>
                        </tr>
                        <tr>
                            <td>layout</td>
                            <td>布局：header-content-footer(头部+内容+底部 )；头部</td>
                        </tr>
                        <tr>
                            <td>slot</td>
                            <td>
                                header,content,footer
                            </td>
                        </tr>
                    </table>

                    <ui-button color="accent" @click="showSidebar=!showSidebar">展开Sidebar</ui-button>

                    <!-- 模块右侧划入栏 vue-->
                    <ui-sidebar :show.sync="showSidebar" title="划入栏" layout="header-content-footer" >

                        <div slot="header">
                            <ui-button type="flat" icon="add" color="primary">添加</ui-button>
                        </div>
                        <div slot="content">
                            <ui-collapsible header="岗位职责" :open="true">
                                <div>
                                    <p>4、有餐饮行业工作经验者优先；</p>
                                    <p>5、服务员、领班岗位***优先。</p>
                                </div>
                            </ui-collapsible>
                            <ui-collapsible header="任职需求" :open="false">
                                <div>
                                    <p>1、初中以上学历，普通话标准；</p>
                                    <p>2、身体健康，品貌端正；</p>
                                    <p>3、性格开朗，有良好的服务意识和职业素养；</p>
                                </div>
                            </ui-collapsible>
                            <ui-collapsible header="任职需求" :open="false">
                                <div>
                                    <p>1、初中以上学历，普通话标准；</p>
                                    <p>2、身体健康，品貌端正；</p>
                                    <p>3、性格开朗，有良好的服务意识和职业素养；</p>
                                </div>
                            </ui-collapsible>
                            <ui-collapsible header="任职需求" :open="false">
                                <div>
                                    <p>1、初中以上学历，普通话标准；</p>
                                    <p>2、身体健康，品貌端正；</p>
                                    <p>3、性格开朗，有良好的服务意识和职业素养；</p>
                                </div>
                            </ui-collapsible>
                            <ui-collapsible header="任职需求" :open="false">
                                <div>
                                    <p>1、初中以上学历，普通话标准；</p>
                                    <p>2、身体健康，品貌端正；</p>
                                    <p>3、性格开朗，有良好的服务意识和职业素养；</p>
                                </div>
                            </ui-collapsible>
                            <ui-collapsible header="任职需求" :open="false">
                                <div>
                                    <p>1、初中以上学历，普通话标准；</p>
                                    <p>2、身体健康，品貌端正；</p>
                                    <p>3、性格开朗，有良好的服务意识和职业素养；</p>
                                </div>
                            </ui-collapsible>
                        </div>
                        <div slot="footer">
                            <div class="text-center">
                                <ui-button color="accent">提交</ui-button>
                            </div>
                        </div>

                    </ui-sidebar>


                </div>                
            </div>

</template>
<script type="text/javascript">
export default {

    data(){
        return {

            showSidebar:false
        }
    }

}
</script>