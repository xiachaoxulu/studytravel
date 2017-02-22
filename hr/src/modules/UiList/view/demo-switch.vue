<template>
            <div class="ui-panel">

                <div class="ui-panel-title">Switch 开关</div>
                <div class="ui-panel-content">
                    <div class="api"><a href="http://josephuspaye.github.io/Keen-UI/#/ui-switch-docs" target="_blank">组件说明</a></div>

                            
                    <ui-switch name="s1" :value.sync="true" checked>开启提醒</ui-switch>
                    <ui-switch name="s2" :value.sync="false">开启缓存</ui-switch>
                    <ui-switch name="s3" :value.sync="true" disabled>开启监控（禁用）</ui-switch>

                </div>                
            </div>
</template>