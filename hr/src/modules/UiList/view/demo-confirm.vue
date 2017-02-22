<template>
            <div class="ui-panel">

                <div class="ui-panel-title">确认框</div>
                <div class="ui-panel-content">
                    <div class="api"><a href="http://josephuspaye.github.io/Keen-UI/#/ui-confirm-docs" target="_blank">组件说明</a></div>

                        
                    <div class="demo">
                        <ui-confirm
                            @confirmed="confirmed" @denied="denied" :show.sync="showConfirm.genericConfirm"
                            close-on-confirm header="提示"
                        >
                           你确定要这样做吗？
                        </ui-confirm>

                        <ui-confirm
                            header="提示" confirm-button-text="是" deny-button-text="否"
                            @confirmed="confirmed" @denied="denied" :show.sync="showConfirm.genericConfirm2"
                            autofocus="confirm-button" close-on-confirm
                        >
                            确认按钮默认获得焦点
                        </ui-confirm>
                            
                        <!-- todo: 取消按钮不能锁定 -->
                        <ui-confirm
                            type="primary" header="提示" confirm-button-text="发布"
                            confirm-button-icon="send" deny-button-text="取消" @confirmed="publishConfirmed"
                            @denied="publishDenied" :show.sync="showConfirm.publishConfirm"
                            :loading="publishRequestInProgress"
                        >
                            提交进程，锁定其他操作...


                        </ui-confirm>

                        <ui-confirm
                            header="提示" type="danger" confirm-button-text="删除"
                            confirm-button-icon="delete" deny-button-text="取消" @confirmed="deleteConfirmed"
                            @denied="deleteDenied" :show.sync="showConfirm.deleteConfirm" close-on-confirm
                        >
                           确定删除吗？
                        </ui-confirm>

                        <!-- <div v-if="confirmResult.length">{{confirmResult}}</div> -->

                        <div class="group">
                            <ui-button @click="showConfirm.genericConfirm = true">默认样式</ui-button>

                            <ui-button @click="showConfirm.genericConfirm2 = true">确认按钮获得焦点</ui-button>

                            <ui-button
                                color="primary" @click="showConfirm.publishConfirm = true"
                            >发布</ui-button>

                            <ui-button
                                type="flat" color="danger" @click="showConfirm.deleteConfirm = true"
                            >取消</ui-button>
                        </div>

                        
                    </div>


                </div>                
            </div>
</template>
<script type="text/javascript">
export default{
	data(){
		return {

             // confirm 
            confirmResult: '',
            publishRequestInProgress: false,
            deleteRequestInProgress: false,
            showConfirm: {
                genericConfirm: false,
                genericConfirm2: false,
                publishConfirm: false,
                deleteConfirm: false
            },

			
		}
	},
    methods: {
        // button loading
        stopSpinners() {
            this.loading.btn1 = false;
            this.loading.btn2 = false;
            this.loading.btn3 = false;
            this.loading.btn4 = false;
            this.loading.btn5 = false;
            this.loading.btn6 = false;
        },

        menuOptionSelected(option) {
            console.log('Selected', option.id);
        },

        // confirm
        confirmed() {
            this.confirmResult = 'You confirmed the request.';
        },

        denied() {
            this.confirmResult = 'You denied the request.';
        },

        publishConfirmed() {
            this.publishRequestInProgress = true;

            setTimeout(() => {
                this.publishRequestInProgress = false;

                this.showConfirm.publishConfirm = false;
                this.confirmResult = 'The post was published.';
            }, 3000);
        },

        publishDenied() {
            this.confirmResult = 'You chose to NOT publish the post.';
        },

        deleteConfirmed() {
            this.confirmResult = 'You chose to delete the post.';
        },

        deleteDenied() {
            this.confirmResult = 'You chose to NOT delete the post.';
        }

    },

}
</script>