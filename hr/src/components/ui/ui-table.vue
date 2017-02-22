<template>

<div class="ui-table" :class="{'ui-table-form':hasForm}">

    <!-- 头部 -->
    <div class="ui-table-header">
        <!-- 锁定列 -->
        <div class="ui-table-header-locked-front">

            <table>
                <colgroup>
                    <col></col>
                </colgroup>
                <thead>
                    <tr>
                        <td></td>
                    </tr>
                </thead>
            </table>

        </div>

        <!-- 正常列 -->
        <div class="ui-table-header-wrap ui-table-scrollable">
            <table>
                <colgroup>
                    <col></col>
                </colgroup>
                <thead>
                    <tr>
                        <td></td>
                    </tr>
                </thead>
            </table>

        </div>

        <!-- 锁定列 -->
        <div class="ui-table-header-locked-last">

            <table>
                <colgroup>
                    <col></col>
                </colgroup>
                <thead>
                    <tr>
                        <td></td>
                    </tr>
                </thead>
            </table>

        </div>


    </div>

    <div class="ui-table-content-wrap">

        <!-- 锁定列 前 -->
        <div class="ui-table-content-locked-front">

            <table>
                <colgroup>
                    <col></col>
                </colgroup>
                <tbody>
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
            </table>

        </div>
        <!-- 正常 -->
        <div class="ui-table-content ui-table-scrollable">

            <table>
                <colgroup>
                    <col></col>
                </colgroup>
                <tbody>
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
            </table>

        </div>

        <!-- 锁定列 后 -->
        <div class="ui-table-content-locked-end">

            <table>
                <colgroup>
                    <col></col>
                </colgroup>
                <tbody>
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>


    <!-- 页脚 -->
    <div class="ui-table-pager">

    </div>

</div>


</template>

<script type="text/javascript">

exports default{

	props:{
		// 数据地址
		url:{

		},
		// 数据列表
		datalist:{

		},

		// 数据读取
		reader:{
			type:Object,
			default(){
				return {
                    type: 'json',
                    successProperty: 'success',
                    messageProperty: 'err_msg',
                    totalProperty: 'result.recordCount',
                    rootProperty: 'result.recordList'
				}
			}
		},
		// 字段列表
		fileds:{
			type:Array,
			default(){
				return [];
			}
		},
		// 参数
		params:{
			type:Object,
			default(){
				return {
					start:''
					limit:'pageSize',
					page:'pageNum'
				}
			}
		},
        /* 查询参数 */
        queryParams: {
            type: Object,
            default: function() {
                return {
                    sort: 'sort',
                    page: 'page',
                    perPage: 'per_page'
                }
            }
        },

        /* 其他参数 */
        'appendParams': {
            type: Array,
            default: function() {
                return []
            }
        },

        /* 已选数据列表 */
        selectedTo: {
            twoWay:true,
            type: Array,
            default: function() {
                return []
            }
        },
	}

}
</script>

<style type="text/css" scoped>

.ui-table{
	width: 100%;
}

.ui-table-header{
}

</style>
