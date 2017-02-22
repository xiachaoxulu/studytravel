<template>

    <div :id="id" class="ui-tablebox _offsetParent_" :class="{'auto':height=='auto','hasForm':hasform}" :style="{'height': height=='auto' ? '' : height}">
        <style type="text/css">
        {{style}}
        </style>
        <div class="ui-table">
            <div class="ui-table-header-wrap">
                <div class="ui-table-title" v-if="!!title">
                    <div class="text-center">{{title}}</div>
                </div>
                <!-- 头部 -->
                <div class="ui-table-header">
                    <!-- 选择列 -->
                    <!-- <div class="ui-table-checkbox" v-if="!!selectable">
                        <div class="ui-table-box text-center">
                        <table class="table table-bordered">
                            <colgroup>
                                <col width="50px"></col>
                            </colgroup>
                            <thead>
                                <tr>
                                    <td><input v-if="selectable!='single'" name="__selectAll" type="checkbox" value="true" v-model="selectedAll"></input></td>
                                </tr>
                            </thead>
                        </table>
                        </div>
                    </div> -->

                    <!-- 锁定列 -->
                    <div class="ui-table-locked-front">
                        <div class="ui-table-box">
                            <slot name="headerLockedFirst"></slot>
                        </div>
                    </div>

                    <!-- 正常列 -->
                    <div class="ui-table-normal ui-table-scrollable">
                        <div class="ui-table-box">
                            <slot name="headerNormal"></slot>
                        </div>
                    </div>

                    <!-- 锁定列 -->
                    <div class="ui-table-locked-last">
                        <div class="ui-table-box">
                            <slot name="headerLockedLast"></slot>
                        </div>
                    </div>
                </div>
            </div>

            <div class="ui-table-content-wrap">
                <!-- 选择列 -->
                <!-- <div class="ui-table-checkbox" v-if="!!selectable">
                    <div class="ui-table-box text-center">
                        {{{bodyTpl('checkbox')}}}
                    </div>
                </div> -->
                <!-- 锁定列 前 -->
                <div class="ui-table-body ui-table-locked-front">
                    <div class="ui-table-box">
                        <slot name="bodyLockedFirst"></slot>
                    </div>
                </div>
                <!-- 正常 -->
                <div class="ui-table-body ui-table-content ui-table-normal ui-table-scrollable">
                    <div class="ui-table-box">
                        <slot name="bodyNormal"></slot>
                    </div>
                </div>

                <!-- 锁定列 后 -->
                <div class="ui-table-body ui-table-locked-last">
                    <div class="ui-table-box">
                        <slot name="bodyLockedLast"></slot>
                    </div>
                </div>

                <div class="ui-table-ybar">
                    <div class="_bar"></div>
                </div>
            </div>
            <div class="ui-table-xline">
                <div class="ui-table-xbar">
                    <div class="_bar"></div>
                </div>
            </div>
            <!-- 页脚 -->
            <div class="ui-table-pager text-center">
                <slot name="footer"></slot>
            </div>

        </div>

        <v-spinner :fixed="false" text="" v-ref:spinner></v-spinner>

    </div>

</template>
<script type="text/javascript">
import uitable from 'libs/ui-table'
export default{
    ready(){
        this.table = uitable(this);
        this.table.init();

        // console.log('hidden:',$(this.$el).is(":hidden"))

        let _this      = this;
        let el         = $(this.$el);
        let hasRefresh = true;

        // 如果table默认隐藏，则visible的时候调用table refresh()，修复table初始化隐藏的时候获取高度错误的问题。
        // if(el.is(':hidden')){
        //     hasRefresh = false;
        // }
        // el.on('mouseenter',function(){
        //     if(!hasRefresh){
        //         console.log('hasRefreshed')
        //         _this.table.refresh();
        //         hasRefresh = true;
        //     }
        // })

        // if(this.loading){
            this.$refs.spinner.show();
        // }
        // else{
        //     this.$refs.spinner.hide();
        // }

    },
    attached(){
        // 修复隐藏>>显示造成的滚动条不准确问题，无法修复因数据加载慢造成的滚动条问题，需要调用refresh方法刷新
        let _this = this;
        setTimeout(function(){
            _this.table.refresh();
            _this.$refs.spinner.hide();
        },1000)
    },
    watch:{
        loading(val){
            if(val){
                this.$refs.spinner.show();
            }
            else{
                this.$refs.spinner.hide();
            }
        },
        refreshed(val){

            if(val){
                this.refresh();
                this.refreshed = false;
            }

        }
    },
    computed:{
        style(){

            console.log('creating style --- ui-table')

            let _this = this;
            if(this.tdheight=='') return;
            this.id = 'table'+parseInt(Math.random()*1000000);

            this.$nextTick(function(){
                _this.table && _this.table.refresh();
            })

            return '#'+this.id+' .ui-table-body td{height:'+this.tdheight+';}'
        }
    },
    methods:{
        refresh(){
            this.table.refresh();
        }
    },
	props:{
        // 表格标题
        title:{
            type:String,
        },
        // 设置表格高度，默认为600px
        height:{
            type:String,
            default:'600px'
        },
        // 是否显示loading
        loading:{
            type:Boolean,
            default:false
        },
        // // 表格中是否有表单元素，如果有，调整高度
        // hasform:{
        //     type:Boolean,
        //     default:false,
        // },
        // 设定单元格高度
        tdheight:{
            type:String,
            default:''
        },
        // 是否刷新，设置为true后刷新，刷新后自动置为false
        refreshed:{
            type:Boolean,
            twoWay:true,
            default:false
        }
	},
    data(){
        return {
            id:''
        }
    }
}
</script>
