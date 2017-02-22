<template>
            <div class="ui-panel">

                <div class="ui-panel-title">弹出框 Modal</div>
                <div class="ui-panel-content">
                    <div class="api"><a href="http://josephuspaye.github.io/Keen-UI/#/ui-modal-docs" target="_blank">组件说明</a></div>



                    <ui-button @click="show.modal1 = true">默认弹出框</ui-button>
                    <ui-modal
                        :show.sync="show.modal1" header="默认弹出框"
                        body="我是弹出提示，感觉怎样？"
                    ></ui-modal>

                    <!-- :backdrop-dismissible="false" -->
                    <ui-button @click="show.modal2 = true">点击背景无法关闭</ui-button>
                    <ui-modal
                        :show.sync="show.modal2" header="点击背景无法关闭"
                        :backdrop-dismissible="false" body="我是弹出提示，感觉怎样？"
                    ></ui-modal>


                    <!-- :show-close-button="false" -->
                    <ui-button @click="show.modal4 = true">没有（X）按钮</ui-button>
                    <ui-modal
                        :show.sync="show.modal4" header="没有（X）按钮"
                        body="我是弹出提示，感觉怎样？" :show-close-button="false"
                    ></ui-modal>

                    <!-- slot="header" -->
                    <ui-button @click="show.modal5 = true">自定义头部</ui-button>
                    <ui-modal
                        :show.sync="show.modal5"
                    >
                        <div slot="header">
                            哈喽，这是自定义头部
                            <button>按钮</button>
                        </div>
                    </ui-modal>

                    <!-- hide-footer -->
                    <ui-button @click="show.modal6 = true">没有底部</ui-button>
                    <ui-modal
                        :show.sync="show.modal6" header="没有底部" hide-footer
                        body="我是弹出提示，感觉怎样？"
                    ></ui-modal>

                    <!-- slot="footer" -->
                    <ui-button @click="show.modal7 = true">自定义底部</ui-button>
                    <ui-modal
                        :show.sync="show.modal7" header="自定义底部"
                        body="我是弹出提示，感觉怎样？"
                    >
                        <div slot="footer">
                            <ui-button color="primary">确定</ui-button>
                            <ui-button @click="show.modal7 = false">关闭</ui-button>
                        </div>
                    </ui-modal>

                    <!-- type="small" -->
                    <ui-button @click="show.modal8 = true">小巧提示框</ui-button>
                    <ui-modal
                        :show.sync="show.modal8" type="small" header="小巧提示框"
                        body="我是弹出提示，感觉怎样？"
                    ></ui-modal>

                    <!-- type="large" -->
                    <ui-button @click="show.modal9 = true">超大提示框</ui-button>
                    <ui-modal
                        :show.sync="show.modal9" type="large" header="超大提示框"
                        body="我是弹出提示，感觉怎样？"
                    ></ui-modal>

                    <ui-button @click="show.modal10 = true">多内容滚动</ui-button>
                    <ui-modal
                        :show.sync="show.modal10" header="多内容滚动"
                    >
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                        <p>很多内容</p>
                    </ui-modal>


                    <!-- transition="ui-modal-fade"d -->
                    <ui-button @click="show.modal11 = true">淡入淡出效果</ui-button>
                    <ui-modal
                        :show.sync="show.modal11" header="淡入淡出效果" transition="ui-modal-fade"
                        body="我是弹出提示，感觉怎样？"
                    ></ui-modal>


                </div>
            </div>
</template>
<script type="text/javascript">
export default{
	data(){
		return {

            // modal
            show: {
                modal1: false,
                modal2: false,
                modal3: false,
                modal4: false,
                modal5: false,
                modal6: false,
                modal7: false,
                modal8: false,
                modal9: false,
                modal10: false,
                modal11: false
            },


		}
	}
}
</script>
