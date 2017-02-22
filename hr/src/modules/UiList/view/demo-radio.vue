<template>


            <div class="ui-panel">

                <div class="ui-panel-title">单选 radio</div>
                <div class="ui-panel-content">
                    <div class="api"><a href="http://josephuspaye.github.io/Keen-UI/#/ui-radio-docs" target="_blank">组件说明</a></div>

                    <div>radio组件新增 required 参数，默认true，false时，可反选已选中的radio状态</div>

                    <h4>选中值：{{sex}}</h4>
                    <div>
                    <ui-radio name="sex" value="1" :model.sync="sex" label="男" checked></ui-radio>
                    <ui-radio name="sex" value="2" :model.sync="sex" label="女"></ui-radio>
                    <ui-radio name="sex" value="3" :model.sync="sex" label="其他" disabled></ui-radio>
                    </div>
                </div>
            </div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {
				sex:''
			}
		}
	}
</script>
