<template>
            <div class="ui-panel">

                <div class="ui-panel-title">折叠面板</div>
                <div class="ui-panel-content">
                    <div class="api"><a href="http://josephuspaye.github.io/Keen-UI/#/ui-collapsible-docs" target="_blank">组件说明</a></div>


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
                </div>
            </div>
</template>
