<template>
    <div class="pull-right">

        <!-- 工资项目 -->
        <template v-if="state.menuType=='items'">
            <button __code="pay-series-items-add/添加" class="ui-tool-button" @click="$parent.$parent.$broadcast('showModalOfItems','add')">
                <span class="icon icon-tool icon-tool-add2 pull-left"></span>
                <span class="_name pull-left">添加</span>
            </button>
            <button __code="pay-series-items-edit/修改" class="ui-tool-button" @click="$parent.$parent.$broadcast('showModalOfItems','update')">
                <span class="icon icon-tool icon-tool-add2 pull-left"></span>
                <span class="_name pull-left">修改</span>
            </button>
            <v-dropdown class="ui-tool-dropdown" trigger="click">
                <button data-toggle="dropdown" class="ui-tool-button">
                    <span class="icon icon-tool icon-tool-more pull-left"></span><span class="_name pull-left">更多</span>
                </button>
                <ul slot="dropdown-menu" class="dropdown-menu">
                    <li __code="pay-series-items-delete/删除">
                        <a name="dropdown-item" href="javascript:;" @click="$parent.$parent.$broadcast('showModalOfItems','delete')">删除</a>
                    </li>
                    <li __code="pay-series-items-import/导入">
                        <a name="dropdown-item" href="javascript:;" @click="$parent.$parent.$broadcast('showModalOfItems','import')">导入</a>
                    </li>
                    <li __code="pay-series-items-export/导出">
                        <a name="dropdown-item" href="javascript:;" @click="$parent.$parent.$broadcast('showModalOfItems','export')">导出</a>
                    </li>
                </ul>
            </v-dropdown>
        </template>

        <!-- 工资套 -->
        <template v-if="state.menuType=='suite'">
            <button __code="pay-series-suites-add/添加" class="ui-tool-button" @click="$parent.$parent.$broadcast('showModalOfSuite','add')">
                <span class="icon icon-tool icon-tool-add2 pull-left"></span>
                <span class="_name pull-left">添加</span>
            </button>
            <v-dropdown class="ui-tool-dropdown" trigger="click">
                <button data-toggle="dropdown" class="ui-tool-button">
                    <span class="icon icon-tool icon-tool-more pull-left"></span><span class="_name pull-left">更多</span>
                </button>
                <ul slot="dropdown-menu" class="dropdown-menu">
                    <!-- <li>
                        <a name="dropdown-item" href="javascript:;" @click="$parent.$parent.$broadcast('showModalOfSuite','update')">修改</a>
                    </li> -->
                    <li __code="pay-series-suites-delete/删除">
                        <a name="dropdown-item" href="javascript:;" @click="$parent.$parent.$broadcast('showModalOfSuite','delete')">删除</a>
                    </li>
                    <li __code="pay-series-suites-copy/复制">
                        <a name="dropdown-item" href="javascript:;" @click="$parent.$parent.$broadcast('showModalOfSuite','copy')">复制</a>
                    </li>
                    <li __code="pay-series-suites-import/导入">
                        <a name="dropdown-item" href="javascript:;" @click="$parent.$parent.$broadcast('showModalOfSuite','import')">导入</a>
                    </li>
                    <li __code="pay-series-suites-export/导出">
                        <a name="dropdown-item" href="javascript:;" @click="$parent.$parent.$broadcast('showModalOfSuite','export')">导出</a>
                    </li>
                </ul>
            </v-dropdown>
        </template>

    </div>
</template>
<script>
import store from '../store'
export default {
    data(){
        return {
            state:store.state,
        }
    },
}
</script>
