<template>
<div class="ui-panel">

    <div class="ui-panel-title">table 组件</div>
    <div class="ui-panel-content" style="height: 100%;">
        <table class="table table-bordered">
            <tr>
                <td>参数</td>
                <td>类型</td>
                <td>说明</td>
            </tr>
            <tr>
                <td>title</td>
                <td>String</td>
                <td>表格标题</td>
            </tr>
            <tr>
                <td>height</td>
                <td>String</td>
                <td>表格高度设定, 固定高度：height="500px"   自动高度： height="auto"，自动高度需要设定ui-table的父层为 {postion:relative;top:5px;bottom:5px;}此种自适应高度，如需调整表格样式，直接给ui-table 添加 class="yourclass" 即可</td>
            </tr>
            <tr>
                <td>tdheight</td>
                <td>String</td>
                <td>控制单元格高度</td>
            </tr>
            <tr>
                <td>loading</td>
                <td>Boolean</td>
                <td>是否显示loading状态</td>
            </tr>
            <tr>
                <td>slot</td>
                <td></td>
                <td>

                    <pre>slot="headerLockedFirst": 表头-锁定列-前列</pre>
                    <pre>slot="headerNormal"     : 表头-正常列</pre>
                    <pre>slot="headerLockedLast" : 表头-锁定列-后列</pre>

                    <pre>slot="bodyLockedFirst"  : 内容-锁定列-前列</pre>
                    <pre>slot="bodyNormal"       : 内容-正常列</pre>
                    <pre>slot="bodyLockedLast"   : 内容-锁定列-后列</pre>

                    <pre>slot="footer"           : 底部</pre>

                    <strong>
                        需要特别注意 colgroup 中col宽度的定义，此处定义宽度后，表格头部和内容部分宽度才能保持一致，
                        详细代码见下面的例子
                    </strong>
                </td>
            </tr>
        </table>

        <p>
            <button @click="showLoading=!showLoading">{{showLoading?'关闭':'显示'}}loading</button>
        </p>

        <div style="position: relative; height: 800px;">

            <ui-table title="表格名称" height="auto" :loading="showLoading" tdheight="62px">

                <!-- 表头-锁定列-前列 -->
                <template slot="headerLockedFirst">

                    <table class="table table-bordered">
                        <colgroup>
                            <col width="100px">
                            <col width="100px">
                        </colgroup>
                        <thead>
                            <tr>
                                <th name="userNum">工号</th>
                                <th name="userName">姓名</th>
                            </tr>
                        </thead>
                    </table>

                </template>
                <!-- 表头-正常列 -->
                <template slot="headerNormal">
                    <table class="table table-bordered">
                        <colgroup>
                            <col width="200px">
                            <col width="200px">
                            <col width="100px">
                            <col width="200px">
                            <col width="200px">
                            <col width="100px">
                            <col width="100px">
                            <col width="200px">
                        </colgroup>
                        <thead>
                            <tr>
                                <th name="deptName">部门</th>
                                <th name="positionName">职位</th>
                                <th name="postName">岗位</th>
                                <th name="bankCard">银行卡号</th>
                                <th name="birthDay">生日</th>
                                <th name="genderName">性别</th>
                                <th name="nationName">民族</th>
                                <th name="userIDCard">身份证</th>
                            </tr>
                        </thead>
                    </table>
                </template>
                <!-- 表头-锁定列-后列 -->
                <template slot="headerLockedLast">

                    <table class="table table-bordered">
                        <colgroup>
                            <col width="150px">
                            <col width="150px">
                            <col width="150px">
                            </colgroup>
                        <thead>
                            <tr>
                                <th name="userTypeName">类型</th>
                                <th name="stateName">状态</th>
                                <th name="ctrl">操作</th>
                            </tr>
                        </thead>
                    </table>
                </template>


                <!-- 内容-锁定列-前列 -->
                <template slot="bodyLockedFirst">

                    <table class="table table-bordered">
                        <colgroup>
                            <col width="100px">
                            <col width="100px">
                        </colgroup>
                        <tbody>
                            <tr>
                                <td>1873</td>
                                <td>
                                    肖子余
                                    <a href="#">详情</a>
                                </td>
                            </tr>
                            <tr>
                                <td>1125</td>
                                <td>
                                    汪京辉
                                    <a href="#">详情</a>
                                </td>
                            </tr>
                            <tr>
                                <td>1817</td>
                                <td>
                                    邓晓娟
                                    <a href="#">详情</a>
                                </td>
                            </tr>
                            <tr>
                                <td>1064</td>
                                <td>
                                    陶彬彬
                                    <a href="#">详情</a>
                                </td>
                            </tr>
                            <tr>
                                <td>1140</td>
                                <td>
                                    孙静
                                    <a href="#">详情</a>
                                </td>
                            </tr>
                            <tr>
                                <td>1237</td>
                                <td>
                                    赵钰
                                    <a href="#">详情</a>
                                </td>
                            </tr>
                            <tr>
                                <td>ZY010200007</td>
                                <td>
                                    李坤
                                    <a href="#">详情</a>
                                </td>
                            </tr>
                            <tr>
                                <td>ZY010200008</td>
                                <td>
                                    张爽
                                    <a href="#">详情</a>
                                </td>
                            </tr>
                            <tr>
                                <td>ZY010200009</td>
                                <td>
                                    王波
                                    <a href="#">详情</a>
                                </td>
                            </tr>
                            <tr>
                                <td>ZY010200010</td>
                                <td>
                                    张博
                                    <a href="#">详情</a>
                                </td>
                            </tr>
                            <tr>
                                <td>ZY010200011</td>
                                <td>
                                    黄明杰
                                    <a href="#">详情</a>
                                </td>
                            </tr>
                            <tr>
                                <td>ZY010200012</td>
                                <td>
                                    李霞
                                    <a href="#">详情</a>
                                </td>
                            </tr>
                            <tr>
                                <td>ZY010200013</td>
                                <td>
                                    陈俐霞
                                    <a href="#">详情</a>
                                </td>
                            </tr>
                            <tr>
                                <td>ZY010200014</td>
                                <td>
                                    胡初兰
                                    <a href="#">详情</a>
                                </td>
                            </tr>
                            <tr>
                                <td>ZY010200015</td>
                                <td>
                                    莫夜玲
                                    <a href="#">详情</a>
                                </td>
                            </tr>
                            <tr>
                                <td>ZY010200016</td>
                                <td>
                                    张史玲
                                    <a href="#">详情</a>
                                </td>
                            </tr>
                            <tr>
                                <td>ZY010200017</td>
                                <td>
                                    贾双双
                                    <a href="#">详情</a>
                                </td>
                            </tr>
                            <tr>
                                <td>ZY010200018</td>
                                <td>
                                    李惠杰
                                    <a href="#">详情</a>
                                </td>
                            </tr>
                            <tr>
                                <td>ZY010200019</td>
                                <td>
                                    裴静
                                    <a href="#">详情</a>
                                </td>
                            </tr>
                            <tr>
                                <td>ZY010200020</td>
                                <td>
                                    贺杏峰
                                    <a href="#">详情</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </template>
                <!-- 内容-正常列 -->
                <template slot="bodyNormal">

                    <table class="table table-bordered">
                        <colgroup>
                            <col width="200px">
                            <col width="200px">
                            <col width="100px">
                            <col width="200px">
                            <col width="200px">
                            <col width="100px">
                            <col width="100px">
                            <col width="200px">
                        </colgroup>
                        <tbody>
                            <tr>
                                <td>总经理</td>
                                <td>总经理</td>
                                <td>厨师</td>
                                <td>6212260200007015437</td>
                                <td>1981/08/07 0:00:00</td>
                                <td>男</td>
                                <td>汉族</td>
                                <td><ui-datepicker width="120px" :left="true" :range="true"></ui-datepicker></td>
                            </tr>
                            <tr>
                                <td>人资部</td>
                                <td></td>
                                <td>经理</td>
                                <td>6212260200061373961</td>
                                <td>1993/03/08 0:00:00</td>
                                <td>男</td>
                                <td>汉族</td>
                                <td>342623199303080318</td>
                            </tr>
                            <tr>
                                <td>人资部</td>
                                <td></td>
                                <td>经理</td>
                                <td>6212260200022266221</td>
                                <td>1991/01/26 0:00:00</td>
                                <td>女</td>
                                <td>汉族</td>
                                <td>130624199101265328</td>
                            </tr>
                            <tr>
                                <td>人资部</td>
                                <td></td>
                                <td>专员</td>
                                <td>6215590200004841193</td>
                                <td>1990/02/07 0:00:00</td>
                                <td>男</td>
                                <td>汉族</td>
                                <td>341221199002075851</td>
                            </tr>
                            <tr>
                                <td>人资部</td>
                                <td></td>
                                <td>厨师</td>
                                <td>6212260200023081785</td>
                                <td>1991/05/26 0:00:00</td>
                                <td>女</td>
                                <td>汉族</td>
                                <td>340822199105261129</td>
                            </tr>
                            <tr>
                                <td>人资部</td>
                                <td></td>
                                <td>厨师</td>
                                <td>6212260200071643841</td>
                                <td>1992/09/17 0:00:00</td>
                                <td>女</td>
                                <td>汉族</td>
                                <td>412702199209171442</td>
                            </tr>
                            <tr>
                                <td>人资部</td>
                                <td></td>
                                <td>专员</td>
                                <td>6212260200067679171</td>
                                <td>1991/02/03 0:00:00</td>
                                <td>男</td>
                                <td>汉族</td>
                                <td>522526199102032237</td>
                            </tr>
                            <tr>
                                <td>人资部</td>
                                <td></td>
                                <td>厨师</td>
                                <td>6212260200070571910</td>
                                <td>1995/01/06 0:00:00</td>
                                <td>女</td>
                                <td>汉族</td>
                                <td>130681199501065824</td>
                            </tr>
                            <tr>
                                <td>人资部</td>
                                <td></td>
                                <td>经理</td>
                                <td>6212260200071001438</td>
                                <td>1986/12/25 0:00:00</td>
                                <td>男</td>
                                <td>汉族</td>
                                <td>532326198510030333</td>
                            </tr>
                            <tr>
                                <td>人资部</td>
                                <td></td>
                                <td>专员</td>
                                <td>6212250200009516913</td>
                                <td>1992/08/16 0:00:00</td>
                                <td>女</td>
                                <td>汉族</td>
                                <td>410322199208163821</td>
                            </tr>
                            <tr>
                                <td>人资部</td>
                                <td></td>
                                <td>专员</td>
                                <td>6212260200084470380</td>
                                <td>1990/04/14 0:00:00</td>
                                <td>女</td>
                                <td>汉族</td>
                                <td>341221199004143168</td>
                            </tr>
                            <tr>
                                <td>人资部</td>
                                <td></td>
                                <td>厨师</td>
                                <td>6212260200075178604</td>
                                <td>1992/03/25 0:00:00</td>
                                <td>女</td>
                                <td>汉族</td>
                                <td>612325199203253025</td>
                            </tr>
                            <tr>
                                <td>人资部</td>
                                <td></td>
                                <td>厨师</td>
                                <td>6212260200090733466</td>
                                <td>1979/03/30 0:00:00</td>
                                <td>女</td>
                                <td>汉族</td>
                                <td>142232197903300028</td>
                            </tr>
                            <tr>
                                <td>财务部</td>
                                <td></td>
                                <td>职员</td>
                                <td>6222020200105443663</td>
                                <td>1984/02/13 0:00:00</td>
                                <td>女</td>
                                <td>汉族</td>
                                <td>50023719840213676X</td>
                            </tr>
                            <tr>
                                <td>财务部</td>
                                <td></td>
                                <td>厨师</td>
                                <td>6222020200105441741</td>
                                <td>1988/10/20 0:00:00</td>
                                <td>女</td>
                                <td>汉族</td>
                                <td>450304198810202029</td>
                            </tr>
                            <tr>
                                <td>运营支持中心</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>财务部</td>
                                <td></td>
                                <td>收银</td>
                                <td>6222020200115114569</td>
                                <td>1990/09/07 0:00:00</td>
                                <td>女</td>
                                <td>汉族</td>
                                <td>131182199009072029</td>
                            </tr>
                            <tr>
                                <td>财务部</td>
                                <td></td>
                                <td>aaa</td>
                                <td>6212260200061372674</td>
                                <td>1991/08/15 0:00:00</td>
                                <td>女</td>
                                <td>汉族</td>
                                <td>341221199108150629</td>
                            </tr>
                            <tr>
                                <td>财务部</td>
                                <td></td>
                                <td>aaa</td>
                                <td>6212260200072210111</td>
                                <td>1992/11/16 0:00:00</td>
                                <td>女</td>
                                <td>汉族</td>
                                <td>610203199211164641</td>
                            </tr>
                            <tr>
                                <td>财务部</td>
                                <td></td>
                                <td>aa</td>
                                <td>6215590200005230495</td>
                                <td>1987/06/01 0:00:00</td>
                                <td>女</td>
                                <td>汉族</td>
                                <td>132133198706014026</td>
                            </tr>
                        </tbody>
                    </table>

                </template>
                <!-- 内容-锁定列-后列 -->
                <template slot="bodyLockedLast">

                    <table class="table table-bordered">
                        <colgroup>
                            <col width="150px">
                            <col width="150px">
                            <col width="150px">
                        </colgroup>
                        <tbody>
                            <tr>
                                <td>
                                    <v-select :value.sync="selected1" :fluid="true">
                                        <v-option value="1" name="选项1" >选项1</v-option>
                                        <v-option value="2" name="选项2" >选项2</v-option>
                                        <v-option value="3" name="选项3" >选项3</v-option>
                                        <v-option value="4" name="选项4" >选项4</v-option>
                                        <v-option value="5" name="选项5" >选项5</v-option>
                                        <v-option value="6" name="选项6" >选项6</v-option>
                                        <v-option value="7" name="选项7" >选项7</v-option>
                                        <v-option value="8" name="选项8" >选项8</v-option>
                                    </v-select>
                                </td>
                                <td>
                                    <ui-timepicker></ui-timepicker>
                                </td>
                                <td>
                                    <ui-datepicker width="120px" :left="true"></ui-datepicker>
                                </td>
                            </tr>
                            <tr>
                                <td>全职</td>
                                <td>在职</td>
                                <td>
                                    <button class="btn btn-default">编辑</button>
                                    <button class="btn btn-default">删除</button>
                                </td>
                            </tr>
                            <tr>
                                <td>全职</td>
                                <td>在职</td>
                                <td>
                                    <button class="btn btn-default">编辑</button>
                                    <button class="btn btn-default">删除</button>
                                </td>
                            </tr>
                            <tr>
                                <td>全职</td>
                                <td>在职</td>
                                <td>
                                    <button class="btn btn-default">编辑</button>
                                    <button class="btn btn-default">删除</button>
                                </td>
                            </tr>
                            <tr>
                                <td>全职</td>
                                <td>在职</td>
                                <td>
                                    <button class="btn btn-default">编辑</button>
                                    <button class="btn btn-default">删除</button>
                                </td>
                            </tr>
                            <tr>
                                <td>全职</td>
                                <td>在职</td>
                                <td>
                                    <button class="btn btn-default">编辑</button>
                                    <button class="btn btn-default">删除</button>
                                </td>
                            </tr>
                            <tr>
                                <td>全职</td>
                                <td>离职</td>
                                <td>
                                    <button class="btn btn-default">编辑</button>
                                    <button class="btn btn-default">删除</button>
                                </td>
                            </tr>
                            <tr>
                                <td>全职</td>
                                <td>在职</td>
                                <td>
                                    <button class="btn btn-default">编辑</button>
                                    <button class="btn btn-default">删除</button>
                                </td>
                            </tr>
                            <tr>
                                <td>全职</td>
                                <td>在职</td>
                                <td>
                                    <button class="btn btn-default">编辑</button>
                                    <button class="btn btn-default">删除</button>
                                </td>
                            </tr>
                            <tr>
                                <td>全职</td>
                                <td>在职</td>
                                <td>
                                    <button class="btn btn-default">编辑</button>
                                    <button class="btn btn-default">删除</button>
                                </td>
                            </tr>
                            <tr>
                                <td>全职</td>
                                <td>离职</td>
                                <td>
                                    <button class="btn btn-default">编辑</button>
                                    <button class="btn btn-default">删除</button>
                                </td>
                            </tr>
                            <tr>
                                <td>全职</td>
                                <td>在职</td>
                                <td>
                                    <button class="btn btn-default">编辑</button>
                                    <button class="btn btn-default">删除</button>
                                </td>
                            </tr>
                            <tr>
                                <td>全职</td>
                                <td>在职</td>
                                <td>
                                    <button class="btn btn-default">编辑</button>
                                    <button class="btn btn-default">删除</button>
                                </td>
                            </tr>
                            <tr>
                                <td>全职</td>
                                <td>在职</td>
                                <td>
                                    <button class="btn btn-default">编辑</button>
                                    <button class="btn btn-default">删除</button>
                                </td>
                            </tr>
                            <tr>
                                <td>全职</td>
                                <td>在职</td>
                                <td>
                                    <button class="btn btn-default">编辑</button>
                                    <button class="btn btn-default">删除</button>
                                </td>
                            </tr>
                            <tr>
                                <td>全职</td>
                                <td>在职</td>
                                <td>
                                    <button class="btn btn-default">编辑</button>
                                    <button class="btn btn-default">删除</button>
                                </td>
                            </tr>
                            <tr>
                                <td>全职</td>
                                <td>在职</td>
                                <td>
                                    <button class="btn btn-default">编辑</button>
                                    <button class="btn btn-default">删除</button>
                                </td>
                            </tr>
                            <tr>
                                <td>全职</td>
                                <td>在职</td>
                                <td>
                                    <button class="btn btn-default">编辑</button>
                                    <button class="btn btn-default">删除</button>
                                </td>
                            </tr>
                            <tr>
                                <td>全职</td>
                                <td>在职</td>
                                <td>
                                    <button class="btn btn-default">编辑</button>
                                    <button class="btn btn-default">删除</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <v-select :value.sync="selected1" :fluid="true">
                                        <v-option value="1" name="选项1" >选项1</v-option>
                                        <v-option value="2" name="选项2" >选项2</v-option>
                                        <v-option value="3" name="选项3" >选项3</v-option>
                                        <v-option value="4" name="选项4" >选项4</v-option>
                                        <v-option value="5" name="选项5" >选项5</v-option>
                                        <v-option value="6" name="选项6" >选项6</v-option>
                                        <v-option value="7" name="选项7" >选项7</v-option>
                                        <v-option value="8" name="选项8" >选项8</v-option>
                                    </v-select>
                                </td>
                                <td>
                                    <ui-datepicker  width="100%"></ui-datepicker>
                                </td>
                                <td>
                                    <ui-datepicker width="120px" :left="true" :range="true"></ui-datepicker>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </template>

                <!-- 表格底部 -->
                <template slot="footer">
                    <div class="ui-table-pager-content text-center">
                        <ui-button class="large" color="success">提交</ui-button>
                    </div>
                </template>

            </ui-table>

        </div>

    </div>
</div>


</template>
<script>
export default {
    data(){
        return {
            showLoading:false,
            selected1:[]
        }
    }
}
</script>
<style type="text/css" scoped>
.demotable{
    left: 20px;
    top: 50px;
    right: 20px;
    bottom: 20px;
}
</style>
