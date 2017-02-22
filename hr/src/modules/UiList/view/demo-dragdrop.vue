<template>
            <div class="ui-panel">

                <div class="ui-panel-title">拖动排序</div>
                <div class="ui-panel-content">
                    <table class="table table-bordered">
                        <thead>
                            <td colspan="2">组件说明</td>
                        </thead>
                        <tr>
                            <td>:order.sync="order"</td>
                            <td>双向绑定的order数组，值为拖动元素的索引值</td>
                        </tr>
                        <tr>
                            <td>itemselector="li"</td>
                            <td>排序元素的selector，注意：不能带有父元素选择器，例如'.parent li'不会有效果</td>
                        </tr>
                        <tr>
                            <td>dragselector="._order"</td>
                            <td>拖动元素的selector，必须为itemselector 的子元素 ，默认为itemselector本身，注意：不能带有父元素选择器，例如'li ._order'不会有效果</td>
                        </tr>

                    </table>
                    <p>排序：{{order}}</p>
                    <div>
                  
                        <ui-dragdrop :order.sync="order" itemselector="li" dragselector="._name">
                            <ul class="app-functionList clear-both">
                                <li orderid="0" >
                                    <div class="_content">
                                        <span class="icon icon-fn">1</span>
                                        <span class="_name" >拖我才行</span>
                                    </div>
                                </li>
                                <li orderid="1" >
                                    <div class="_content">
                                        <span class="icon icon-fn">2</span>
                                        <span class="_name" >拖我才行</span>
                                    </div>
                                </li>
                                <li orderid="2" >
                                    <div class="_content">
                                        <span class="icon icon-fn">3</span>
                                        <span class="_name" >拖我才行</span>
                                    </div>
                                </li>
                                <li orderid="3" >
                                    <div class="_content">
                                        <span class="icon icon-fn">4</span>
                                        <span class="_name" >拖我才行</span>
                                    </div>
                                </li>
                                <li orderid="4" >
                                    <div class="_content">
                                        <span class="icon icon-fn">5</span>
                                        <span class="_name" >拖我才行</span>
                                    </div>
                                </li>
                                <li orderid="5" >
                                    <div class="_content">
                                        <span class="icon icon-fn">5</span>
                                        <span class="_name" >拖我才行</span>
                                    </div>
                                </li>
                            </ul>

                        </ui-dragdrop>

                    </div>
                        

                </div>                
            </div>
</template>
<script type="text/javascript">
export default{
  data(){
    return {
        order:[]
    }
  }

}
</script>
<style type="text/css" scoped="">
.app-functionList{
    width: 500px;
    height: 300px;
}
.app-functionList li{
    border: 1px solid #ddd;
}
</style>