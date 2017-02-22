<template>

            <div class="ui-panel">

                <div class="ui-panel-title">scrollView 滚动条</div>
                <div class="ui-panel-content">
                    <table class="table table-bordered">
                        <thead>
                            <td colspan="2">组件说明</td>
                        </thead>
                        <tr>
                            <td>属性show:Boolean</td>
                            <td>如果scrollview 默认是不显示的，需要添加show属性，来通知scrollview显隐，否则滚动条没效果，如果是默认显示的，不需要添加该属性</td>
                        </tr>
                        <tr>
                            <td>
                                ui-scrollview 父元素需要有高度，不能 height auto
                            </td>
                            <td></td>
                        </tr>
                    </table>

                    <div style="height:200px; border:1px solid #ddd; padding:5px; ">
                        
                        <ui-scrollview >
                            <ui-collapsible header="岗位职责" :open="true">
                                <div>
                                    <p>1、初中以上学历，普通话标准；</p>
                                    <p>2、身体健康，品貌端正；</p>
                                    <p>3、性格开朗，有良好的服务意识和职业素养；</p>
                                    <p>4、有餐饮行业工作经验者优先；</p>
                                    <p>5、服务员、领班岗位***优先。</p>
                                </div>
                            </ui-collapsible>
                            <ui-collapsible header="任职需求" :open="true">
                                <div>
                                    <p>1、初中以上学历，普通话标准；</p>
                                    <p>2、身体健康，品貌端正；</p>
                                    <p>3、性格开朗，有良好的服务意识和职业素养；</p>
                                    <p>1、初中以上学历，普通话标准；</p>
                                    <p>2、身体健康，品貌端正；</p>
                                    <p>3、性格开朗，有良好的服务意识和职业素养；</p>
                                </div>
                            </ui-collapsible>                            
                        </ui-scrollview>

                    </div>

                </div>                
            </div>

</template>
