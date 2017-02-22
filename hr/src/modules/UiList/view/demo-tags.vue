<template>
    <div class="ui-panel">

        <div class="ui-panel-title">Tag 标签</div>
        <div class="ui-panel-content">

            
            <div>
                <span class="label label-default">默认</span>
                <span class="label label-primary"><i class="material-icons">info_outline</i> 强调</span>
                <span class="label label-success"><i class="material-icons">check_circle</i> 成功</span>
                <span class="label label-info">信息</span>
                <span class="label label-warning"><i class="material-icons">warning</i> 警告</span>
                <span class="label label-danger"><i class="material-icons">error</i> 危险</span>
            </div>
            <br>
            <div>
                
                <span class="label label-default">关闭 <i class="material-icons pointer">close</i></span>

            </div>
            <br>

            <table class="table table-bordered">
                <thead>
                    <td colspan="2">ui-tags 组件说明</td>
                </thead>
                <tr>
                    <td>tags</td>
                    <td>双向绑定，tags列表 [{label:'',value:'',disabled:false}]</td>
                </tr>
                <tr>
                    <td>type</td>
                    <td>tag 样式class</td>
                </tr>
                <tr>
                    <td>{
                    label:'标签1',
                    value:'1',
                    disabled:true
                }</td>
                    <td>disabled 禁用项</td>
                </tr>
            </table>


            <div>
                标签值：
                <br>
                [<template v-for="tag in tagList">{{tag.value}},</template>]
            </div>
            <br>
            <ui-tags :tags.sync="tagList" type="label-success" :remove-callback="remove"></ui-tags>
            <br><br>
            <ui-button @click="addTag">增加</ui-button>

        </div>                
    </div>
</template>
<script type="text/javascript">

export default {

    data(){
        return {
            tagList:[

                {
                    label:'标签1',
                    value:'1',
                    disabled:true
                },

                {
                    label:'标签2',
                    value:'2'
                },

                {
                    label:'标签3',
                    value:'3'
                },

                {
                    label:'标签4',
                    value:'4'
                },

                {
                    label:'标签5',
                    value:'5'
                },

            ]
        }
    },
    methods:{
        addTag(){
            this.tagList.push({
                label:'标签33',
                value:'33'
            })
        },
        remove(val){
            console.log(val)
        }
    }

}

</script>