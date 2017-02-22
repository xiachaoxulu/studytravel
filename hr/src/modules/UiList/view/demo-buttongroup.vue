<template>
<div class="ui-panel">

                    <div class="ui-panel-title">按钮组</div>
                    <div class="ui-panel-content">
                        <table class="table table-bordered">
                            <thead>
                                <td colspan="2">组件说明</td>
                            </thead>
                            <tr>
                                <td>设置选中项class</td>
                                <td>active-class="btn-primary"</td>
                            </tr>
                        </table>


                        <ui-buttongroup active-class="btn-primary">

                            <button type="button" class="btn btn-primary" >角色管理</button>
                            <button type="button" class="btn btn-default" >权限管理</button>
                            <button type="button" class="btn btn-default" >报表管理</button>

                        </ui-buttongroup>


                    </div>
                </div>
</template>