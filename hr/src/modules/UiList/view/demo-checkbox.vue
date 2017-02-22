<template>
            <div class="ui-panel">

                <div class="ui-panel-title">多选 ui-checkbox</div>
                <div class="ui-panel-content">
                    <div class="api"><a href="http://josephuspaye.github.io/Keen-UI/#/ui-checkbox-docs" target="_blank">组件说明</a></div>

                    <h4>简单展示 {{area}}</h4>
                    <div>
                        <ui-checkbox :value.sync="area[0]" checked>朝阳</ui-checkbox>
                        <ui-checkbox :value.sync="area[1]">丰台</ui-checkbox>
                        <ui-checkbox :value.sync="area[2]" disabled>西城</ui-checkbox>
                    </div>

                    <h4>多选框群组 ui-checkboxgroup</h4>

                    <table class="table table-bordered">
                        <tr>
                            <td>参数</td>
                            <td>类型</td>
                            <td>说明</td>
                        </tr>
                        <tr>
                            <td>list</td>
                            <td>Array || Object</td>
                            <td>所有选项数据列表，支持数组，或者{}</td>
                        </tr>
                        <tr>
                            <td>name</td>
                            <td>String</td>
                            <td>【必填】选项名称字段</td>
                        </tr>

                        <tr>
                            <td>id</td>
                            <td>String</td>
                            <td>选项id字段。如果数据中有id，且返回的选中数据需要id，则必须添加该参数</td>
                        </tr>
                        <tr>
                            <td>value</td>
                            <td>Array</td>
                            <td>【必填，双向】已选项目id或index列表，id为上面设置的id，不设置则返回index</td>
                        </tr>

                    </table>


                    <div>
                        <strong>使用index作为返回数据</strong>
                        <p>已选：{{areaListChecked}}</p>

                        <ui-checkboxgroup :list="areaList" name="name" :value.sync="areaListChecked"></ui-checkboxgroup>


                    </div>
                    <div>
                        <strong>使用id作为返回数据</strong>
                        <p>已选：{{areaListChecked2}}</p>
                        <p><button @click="changeData">切换数据</button></p>

                        <ui-checkboxgroup :list="areaList2" name="name" id="id" :value.sync="areaListChecked2">

                        </ui-checkboxgroup>

                    </div>

                </div>
            </div>
</template>
<script type="text/javascript">
	export default{
        methods:{
            changeData(){

                this.areaListChecked2 = ['s1','s2','s3','s4'];
                this.areaList2 = {
                    's1':{
                        name:'北京',
                        id:'s1',
                    },
                    's2':{
                        name:'上海',
                        id:'s2',
                    },
                    's3':{
                        name:'天津',
                        id:'s3',
                    },
                    's4':{
                        name:'广州',
                        id:'s4',
                    },
                    's5':{
                        name:'广州2',
                        id:'s5',
                    }
                };

            }
        },
		data(){
			return {
				area:[],
                areaListChecked:[1,2,3],
                areaList:[
                    {
                        name:'北京',
                        id:'1',
                    },
                    {
                        name:'上海',
                        id:'2',
                    },
                    {
                        name:'天津',
                        id:'3',
                    },
                    {
                        name:'广州',
                        id:'4',
                    },
                    {
                        name:'北京',
                        id:'1',
                    },
                    {
                        name:'上海',
                        id:'2',
                    },
                    {
                        name:'天津',
                        id:'3',
                    },
                    {
                        name:'广州',
                        id:'4',
                    },
                    {
                        name:'北京',
                        id:'1',
                    },
                    {
                        name:'上海',
                        id:'2',
                    },
                    {
                        name:'天津',
                        id:'3',
                    },
                    {
                        name:'广州',
                        id:'4',
                    },
                    {
                        name:'北京',
                        id:'1',
                    },
                    {
                        name:'上海',
                        id:'2',
                    },
                    {
                        name:'天津',
                        id:'3',
                    },
                    {
                        name:'广州',
                        id:'4',
                    },
                    {
                        name:'北京',
                        id:'1',
                    },
                    {
                        name:'上海',
                        id:'2',
                    },
                    {
                        name:'天津',
                        id:'3',
                    },
                    {
                        name:'广州',
                        id:'4',
                    },
                    {
                        name:'北京',
                        id:'1',
                    },
                    {
                        name:'上海',
                        id:'2',
                    },
                    {
                        name:'天津',
                        id:'3',
                    },
                    {
                        name:'广州',
                        id:'4',
                    },
                    {
                        name:'北京',
                        id:'1',
                    },
                    {
                        name:'上海',
                        id:'2',
                    },
                    {
                        name:'天津',
                        id:'3',
                    },
                    {
                        name:'广州',
                        id:'4',
                    },
                    {
                        name:'北京',
                        id:'1',
                    },
                    {
                        name:'上海',
                        id:'2',
                    },
                    {
                        name:'天津',
                        id:'3',
                    },
                    {
                        name:'广州',
                        id:'4',
                    },
                ],
                areaListChecked2:['s1','s2','s3'],
                areaList2:{
                    's1':{
                        name:'北京',
                        id:'s1',
                    },
                    's2':{
                        name:'上海',
                        id:'s2',
                    },
                    's3':{
                        name:'天津',
                        id:'s3',
                    },
                    's4':{
                        name:'广州',
                        id:'s4',
                    }
                },
			}
		}
	}
</script>
