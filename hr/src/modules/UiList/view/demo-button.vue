<template>
            <div class="ui-panel">

                <div class="ui-panel-title">按钮</div>
                <div class="ui-panel-content">
                    <div class="api"><a href="http://josephuspaye.github.io/Keen-UI/#/ui-button-docs" target="_blank">组件说明</a></div>
                    
                    <div class="demo">

                        <h4>默认</h4>
                        <div class="group">
                            <ui-button>默认</ui-button>
                            <ui-button color="primary" class="large">主按钮</ui-button>
                            <ui-button color="accent">强调</ui-button>
                            <ui-button color="success">成功</ui-button>
                            <ui-button color="warning">警告</ui-button>
                            <ui-button color="danger">危险</ui-button>
                        </div>
                        <h4>大号按钮 class="large"</h4>
                        <div class="group">
                            <ui-button color="primary" class="large">主按钮</ui-button>
                            <ui-button color="success" class="large">主按钮</ui-button>
                        </div>


                        <h4>默认 禁用状态 </h4>
                        <div class="group">
                            <ui-button disabled>默认</ui-button>
                            <ui-button disabled color="primary">主按钮</ui-button>
                            <ui-button disabled color="accent">强调</ui-button>
                            <ui-button disabled color="success">成功</ui-button>
                            <ui-button disabled color="warning">警告</ui-button>
                            <ui-button disabled color="danger">危险</ui-button>
                        </div>

                        <h4>阴影风格</h4>
                        <div class="group">
                            <ui-button raised>默认</ui-button>
                            <ui-button raised color="primary">主按钮</ui-button>
                            <ui-button raised color="accent">强调</ui-button>
                            <ui-button raised color="success">成功</ui-button>
                            <ui-button raised color="warning">警告</ui-button>
                            <ui-button raised color="danger">危险</ui-button>
                        </div>
                        <h4>阴影风格 禁用状态</h4>
                        <div class="group">
                            <ui-button raised disabled>默认</ui-button>
                            <ui-button raised disabled color="primary">主按钮</ui-button>
                            <ui-button raised disabled color="accent">强调</ui-button>
                            <ui-button raised disabled color="success">成功</ui-button>
                            <ui-button raised disabled color="warning">警告</ui-button>
                            <ui-button raised disabled color="danger">危险</ui-button>
                        </div>

                        <h4>图标按钮</h4>
                        <div class="group">
                            <ui-button icon="refresh">刷新</ui-button>
                            <ui-button icon="add"    color="primary">添加</ui-button>
                            <ui-button icon="delete" color="danger">删除</ui-button>
                        </div>
                        <h4>图标按钮 无背景色</h4>
                        <div class="group">
                            <ui-button type="flat" icon="refresh">刷新</ui-button>
                            <ui-button type="flat" icon="add" color="primary">添加</ui-button>
                            <ui-button type="flat" icon="delete" color="danger">删除</ui-button>
                        </div>

                        <h4>等待状态</h4>
                        <div class="group">
                            <ui-button
                                icon="refresh" :loading="loading.btn1" @click="loading.btn1 = true"
                            >刷新</ui-button>

                            <ui-button
                                icon="add" color="primary" :loading="loading.btn2" @click="loading.btn2 = true"
                            >添加</ui-button>

                            <ui-button
                                icon="delete" color="danger" :loading="loading.btn3" @click="loading.btn3 = true"
                            >删除</ui-button>
                        </div>

                        <div class="group">
                            <ui-button
                                type="flat" icon="refresh" :loading="loading.btn4" @click="loading.btn4 = true"
                            >刷新</ui-button>

                            <ui-button
                                type="flat" icon="add" color="primary" :loading="loading.btn5"
                                @click="loading.btn5 = true"
                            >添加</ui-button>

                            <ui-button
                                type="flat" icon="delete" color="danger" :loading="loading.btn6"
                                @click="loading.btn6 = true"
                            >删除</ui-button>
                        </div>

                        <div class="group">
                            <ui-button @click="stopSpinners">停止等待</ui-button>
                        </div>

                    </div>

                </div>                
            </div>
</template>
<script type="text/javascript">
export default {
    data(){
        return{

            // button loading
            loading: {
                btn1: false,
                btn2: false,
                btn3: false,
                btn4: false,
                btn5: false,
                btn6: false
            },

        }
    },
    filters:{

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
    components:{


    },
    ready(){

    }
}
</script>