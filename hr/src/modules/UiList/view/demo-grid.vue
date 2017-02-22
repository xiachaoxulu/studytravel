<template>
<div class="ui-panel">
    <div class="ui-panel-title">Grid 组件</div>
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
                <td>fields</td>
                <td>Array</td>
                <td>【必填】字段列表，改变fields会引起table重新渲染
                    <pre>
                    <code>
                    [
                        {
                            name:'userNum',
                            title:'工号',
                            locked:'first', // 【锁定列，前】
                            sortable:true, // 【是否允许排序，开发中】
                            editable:'String',
                            editHandler:(newValue,oldData,index)=>{
                                // newValue 新的值
                                // oldData  当前行 完整的原始数据，包含原始值
                                // index    当前行 索引
                                console.log(newValue,oldData,index)
                            },

                            parent: 'userName' , // 字段组，用于附加字段的展开显示位置处理，添加parent后，组员字段将放在组长之后
                            required: true, // 默认不添加，用于系统功能级的字段必须显示，不受列选和字段权限控制
                        },

                        {
                            name:'userName',
                            title:'姓名',
                            locked:'first',
                            formater:function(value,data,index){ // 【格式化】返回的数据为 【value:该字段值，data:该条数据，index:该条数据索引】
                                return value+'&lt;a href="#"&gt;详情&lt;/a&gt;'
                            }
                        },

                        {
                            name:'deptName',
                            title:'部门',
                        },
                        {
                            name:'positionName',
                            title:'职位',
                        },
                        {
                            name:'postName',
                            title:'岗位',
                            width:'100px' // 【列宽度】
                        },

                        {
                            name:'userTypeName',
                            title:'类型',
                            locked:'last', // 【锁定列，后】
                            width:'100px'
                        },
                        {
                            name:'stateName',
                            title:'状态',
                            locked:'last',
                            width:'100px'
                        },
                        {
                            name:'ctrl',
                            title:'操作',
                            locked:'last',
                            width:'200px',
                            formater:function(value,data,index){
                                // 【tabledemo1 在ready中进行定义，指向this, 命名规则使用当前table所属的业务名称，防止命名冲突】
                                return '&lt;button class="btn btn-default" onclick="tabledemo1.showModal(\'编辑\',\''+data.userName+'\')"&gt;编辑&lt;/button&gt;&lt;button class="btn btn-default" onclick="tabledemo1.showModal(\'删除\',\''+data.userName+'\')"&gt;删除&lt;/button&gt;'
                            }
                        },

                    ]
                    </code>
                 </pre>
                </td>
            </tr>
            <tr>
                <td>datalist</td>
                <td>Array</td>
                <td>数据列表</td>
            </tr>
            <tr>
                <td>url</td>
                <td>String</td>
                <td>数据连接，设置后datalist无效，优先url获取数据，使用api格式，例如 api.OrgEmployee.list</td>
            </tr>
            <tr>
                <td>reader</td>
                <td>Object</td>
                <td>数据读取属性设置，默认
                    <pre>
                        {
                            idProperty     : 'ID',                  // 数据ID
                            successProperty: 'success',             // 成功
                            errmsgProperty : 'err_msg',             // 失败提示
                            totalProperty  : 'result.recordCount',  // 数据总量
                            rootProperty   : 'result.recordList',   // 数据列表
                        }
                    </pre>
                </td>
            </tr>
            <tr>
                <td>pageParams</td>
                <td>Object</td>
                <td>分页参数属性设置，默认
                    <pre>
                        {
                            page :'pageNum',     // 当前页
                            limit:'pageSize',    // 每页数量
                        }
                    </pre>
                </td>
            </tr>
            <tr>
                <td>selectable</td>
                <td>String</td>
                <td>是否开启表格checkbox，默认关闭，single 单选 multi 多选</td>
            </tr>
            <tr>
                <td>selected</td>
                <td>Array</td>
                <td>【sync】已选数据列表，值为每条数据的ID，此ID在reader中设置</td>
            </tr>
            <tr>
                <td>perpage</td>
                <td>Number</td>
                <td>每页数量，默认为20</td>
            </tr>
            <tr>
                <td>pages</td>
                <td>Array</td>
                <td>可选分页数量，</td>
            </tr>
            <tr>
                <td>nopaging</td>
                <td>Boolean</td>
                <td>是否关闭分页，最大支持数据量为1000条，如果数量超过1000条，则强制开启分页</td>
            </tr>
            <tr>
                <td>btrefresh</td>
                <td>Boolean</td>
                <td>分页是否显示刷新按钮</td>
            </tr>
            <tr>
                <td>height</td>
                <td>String</td>
                <td>表格高度设定, 固定高度：height="500px" 自动高度： height="auto"，自动高度需要设定ui-table的父层为 {postion:relative;top:5px;bottom:5px;}此种自适应高度，如需调整表格样式，直接给ui-table 添加 class="yourclass" 即可</td>
            </tr>
            <tr>
                <td>thheight</td>
                <td>String</td>
                <td>控制表头单元格高度,默认50px</td>
            </tr>
            <tr>
                <td>tdheight</td>
                <td>String</td>
                <td>控制单元格高度,默认50px</td>
            </tr>
            <tr>
                <td>total</td>
                <td>Number</td>
                <td>【sync】数据总条数，用来向组件外暴露数据总量</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td><strong>方法</strong></td>
                <td></td>
                <td><strong>说明</strong></td>
            </tr>
            <tr>
                <td>refresh</td>
                <td></td>
                <td>刷新表格，调用方式:为ui-table 添加 v-ref="table", 再调用 this.$refs.table.refresh()</td>
            </tr>
            <tr>
                <td>getSelections</td>
                <td></td>
                <td>获取表格选中项 array</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </table>
        <!-- <button @click="loadData">加载数据</button> -->
        <button @click="orderData">调整排序</button>
        <button @click="nopaging=!nopaging">{{nopaging?'开启分页':'关闭分页'}}</button>
        <button @click="$refs.table.refresh()">刷新</button>
        <div>共有{{total}}条数据</div>
        <div>已选：{{selected}}</div>

        {{selectedData | json 4}}

        <div style="position: relative; height: 800px;">
            <ui-grid v-ref:table class="demotable" :fields="fields" :url="url" :datalist="datalist" :nopaging="nopaging" :perpage="1" :pages="[10,20,30,50]" :btrefresh="true" selectable="multi" :selected.sync="selected" :selected-data.sync="selectedData" height="auto"
                :total.sync="total" tdheight="50px"></ui-grid>
        </div>
        <ui-modal :show.sync="modalShow" :header="modalHeader" :body="modalBody"></ui-modal>
    </div>
</div>
</template>
<script>
export default {
    ready() {
        window.tabledemo1 = this; // 【建议用当前业务来命名，防止全局变量冲突】
    },
    data() {
        return {
            total: 0,
            nopaging: false,
            modalShow: false,
            modalHeader: '',
            modalBody: '',
            selected: [],
            selectedData: {},
            fields: [
                // {
                //   name: 'userNum',
                //   title: '工号',
                //   locked: 'last'
                // },

                {
                  name: 'userName',
                  title: '姓名',
                  locked: 'first',
                  formater: function(value, data, index) {
                    return value + '<a href="#">详情</a>'
                  }
                },
                {
                    name: 'deptName',
                    title: '部门',
                    editable:'String',
                    editHandler:(newValue,oldData,index)=>{
                        // newValue 新的值
                        // oldData  当前行 完整的原始数据，包含原始值
                        // index    当前行 索引
                        console.log(newValue,oldData,index)
                    }
                },
                // {
                //   name: 'birthDay',
                //   title: '生日',

                //   /* 提示层 */
                //   tdClass:'showTip',
                //   formater(value, data, index ,lastIndex){

                //           // 最后3项 提示层向上展开，防止被遮挡
                //           let arrow = lastIndex - index <= 2 ? 'top' : 'bottom'

                //           let timeList =   `
                //               2016-08-17 08:57:03.0 <i class="material-icons">error_outline</i>
                //               <div class="tooltip ${arrow}" role="tooltip">
                //                   <div class="tooltip-arrow"></div>
                //                   <div class="tooltip-inner">
                //                       2016-08-17 08:57:03.0 <br/>
                //                       2016-08-17 08:57:03.0 <br/>
                //                       2016-08-17 08:57:03.0 <br/>
                //                       2016-08-17 08:57:03.0 <br/>
                //                       2016-08-17 08:57:03.0 <br/>
                //                       2016-08-17 08:57:03.0 <br/>
                //                       2016-08-17 08:57:03.0 <br/>
                //                       2016-08-17 08:57:03.0 <br/>
                //                       2016-08-17 08:57:03.0 <br/>
                //                       2016-08-17 08:57:03.0
                //                   </div>
                //               </div>
                //           `

                //           return timeList;

                //   }
                // },


                // {
                //   name: 'positionName',
                //   title: '职位',
                // }, {
                //   name: 'postName',
                //   title: '岗位',
                //   width: '100px'
                // },

                // {
                //   name: 'bankCard',
                //   title: '银行卡号',
                // },


                // {
                //   name: 'genderName',
                //   title: '性别',
                //   width: '100px'
                // }, {
                //   name: 'nationName',
                //   title: '民族',
                //   width: '100px'
                // },


                // {
                //   name: 'userIDCard',
                //   title: '身份证',
                // },

                // {
                //   name: 'userTypeName',
                //   title: '类型',
                //   // locked: 'last',
                //   width: '100px'
                // }, {
                //   name: 'stateName',
                //   title: '状态',
                //   // locked: 'last',
                //   width: '100px'
                // },
                // {
                //   name: 'ctrl',
                //   title: '操作',
                //   // locked: 'last',
                //   width: '200px',
                //   formater: function(value, data, index) {
                //     // console.log(data)
                //     return '<button class="btn btn-default" onclick="tabledemo1.showModal(\'编辑\',\'' + data.userName + '\')">编辑</button><button class="btn btn-default" onclick="tabledemo1.showModal(\'删除\',\'' + data.userName + '\')">删除</button>'
                //   }

                //   // items:[

                //   //     {
                //   //         name:'add',
                //   //         tpl:'<button {{name}} class="btn btn-default">添加</button>',
                //   //         events:[
                //   //             {
                //   //                 type:'click',
                //   //                 callback:function(index,ID){
                //   //                     console.log(index,ID)
                //   //                 }
                //   //             }
                //   //         ]
                //   //     },
                //   //     {
                //   //         name:'edit',
                //   //         tpl:'<button {{name}} class="btn btn-default">编辑</button>',
                //   //         events:[
                //   //             {
                //   //                 type:'dbclick',
                //   //                 callback:function(index,ID){
                //   //                     console.log(index,ID)
                //   //                 }
                //   //             }
                //   //         ]
                //   //     },

                //   // ]
                // },

            ],

            "datalist": [

                {
                    "ID": 18,
                    "bankCard": "6222020200115114569",
                    "birthDay": "1990/09/07 0:00:00",
                    "companyID": 1,
                    "createTime": 1453878203000,
                    "deptID": 93,
                    "deptName": "财务部",
                    "gender": "118002",
                    "genderName": "女",
                    "healthEndTime": "",
                    "hukouAddress": "",
                    "hukouType": "NULL",
                    "isMarried": "NULL",
                    "nation": "113001",
                    "nationName": "汉族",
                    "nowCode": "",
                    "phone": "13001980868",
                    "positionID": 0,
                    "postID": 31,
                    "postName": "收银",
                    "rankID": 0,
                    "state": "120002",
                    "stateName": "在职",
                    "urgentPerson": "",
                    "userIDCard": "131182199009072029",
                    "userName": "贾双双",
                    "userNum": "ZY010200017",
                    "userType": "120005",
                    "userTypeName": "全职",
                    "valid": 1
                }, {
                    "ID": 19,
                    "bankCard": "6212260200061372674",
                    "birthDay": "1991/08/15 0:00:00",
                    "companyID": 1,
                    "createTime": 1453878203000,
                    "deptID": 93,
                    "deptName": "财务部",
                    "gender": "118002",
                    "genderName": "女",
                    "healthEndTime": "",
                    "hukouAddress": "",
                    "hukouType": "NULL",
                    "isMarried": "NULL",
                    "nation": "113001",
                    "nationName": "汉族",
                    "nowCode": "",
                    "phone": "18655847085",
                    "positionID": 0,
                    "postID": 32,
                    "postName": "aaa",
                    "rankID": 0,
                    "state": "120002",
                    "stateName": "在职",
                    "urgentPerson": "",
                    "userIDCard": "341221199108150629",
                    "userName": "李惠杰",
                    "userNum": "ZY010200018",
                    "userType": "120005",
                    "userTypeName": "全职",
                    "valid": 1
                }, {
                    "ID": 20,
                    "bankCard": "6212260200072210111",
                    "birthDay": "1992/11/16 0:00:00",
                    "companyID": 1,
                    "createTime": 1453878203000,
                    "deptID": 93,
                    "deptName": "财务部",
                    "gender": "118002",
                    "genderName": "女",
                    "healthEndTime": "",
                    "hukouAddress": "",
                    "hukouType": "NULL",
                    "isMarried": "NULL",
                    "nation": "113001",
                    "nationName": "汉族",
                    "nowCode": "",
                    "phone": "15991264560",
                    "positionID": 0,
                    "postID": 32,
                    "postName": "aaa",
                    "rankID": 0,
                    "state": "120002",
                    "stateName": "在职",
                    "urgentPerson": "",
                    "userIDCard": "610203199211164641",
                    "userName": "裴静",
                    "userNum": "ZY010200019",
                    "userType": "120005",
                    "userTypeName": "全职",
                    "valid": 1
                }, {
                    "ID": 21,
                    "bankCard": "6215590200005230495",
                    "birthDay": "1987/06/01 0:00:00",
                    "companyID": 1,
                    "createTime": 1453878203000,
                    "deptID": 93,
                    "deptName": "财务部",
                    "gender": "118002",
                    "genderName": "女",
                    "healthEndTime": "",
                    "hukouAddress": "",
                    "hukouType": "NULL",
                    "isMarried": "NULL",
                    "nation": "113001",
                    "nationName": "汉族",
                    "nowCode": "",
                    "phone": "18910179244",
                    "positionID": 0,
                    "postID": 33,
                    "postName": "aa",
                    "rankID": 0,
                    "state": "120002",
                    "stateName": "在职",
                    "urgentPerson": "",
                    "userIDCard": "132133198706014026",
                    "userName": "贺杏峰",
                    "userNum": "ZY010200020",
                    "userType": "120005",
                    "userTypeName": "全职",
                    "valid": 1
                }, {
                    "ID": 22,
                    "bankCard": "6212260200078630437",
                    "birthDay": "1990/11/25 0:00:00",
                    "companyID": 1,
                    "createTime": 1453878203000,
                    "deptID": 93,
                    "deptName": "财务部",
                    "gender": "118002",
                    "genderName": "女",
                    "healthEndTime": "",
                    "hukouAddress": "",
                    "hukouType": "NULL",
                    "isMarried": "NULL",
                    "nation": "113001",
                    "nationName": "汉族",
                    "nowCode": "",
                    "phone": "18210231245",
                    "positionID": 0,
                    "postID": 34,
                    "postName": "34",
                    "rankID": 0,
                    "state": "120002",
                    "stateName": "在职",
                    "urgentPerson": "",
                    "userIDCard": "130726199011252521",
                    "userName": "徐万红",
                    "userNum": "ZY010200021",
                    "userType": "120005",
                    "userTypeName": "全职",
                    "valid": 1
                },
            ],

            // 数据地址
            url: 'api.Demo.test',
            // 数据读取
            reader: {
                type: 'json',
                successProperty: 'success',
                messageProperty: 'err_msg',
                totalProperty: 'result.recordCount',
                rootProperty: 'result.recordList'
            },
        }
    },
    methods: {

        showModal(type, data) {

            this.modalShow = true;
            this.modalHeader = type;
            this.modalBody = data;

        },


        loadData() {



            this.datalist = [{
                "ID": 2,
                "bankCard": "6212260200007015437",
                "birthDay": "1981/08/07 0:00:00",
                "companyID": 1,
                "createTime": 1453878203000,
                "deptID": 92,
                "deptName": "总经理",
                "gender": "118001",
                "genderName": "男",
                "healthEndTime": "",
                "hukouAddress": "",
                "hukouType": "NULL",
                "isMarried": "NULL",
                "nation": "113001",
                "nationName": "汉族",
                "nowCode": "",
                "phone": "18610351070",
                "positionID": 5,
                "positionName": "总经理",
                "postID": 19,
                "postName": "厨师",
                "rankID": 0,
                "state": "120002",
                "stateName": "在职",
                "urgentPerson": "",
                "userIDCard": "512501198108072412",
                "userName": "肖子余",
                "userNum": "1873",
                "userType": "120005",
                "userTypeName": "全职",
                "valid": 1
            }, {
                "ID": 3,
                "bankCard": "6212260200061373961",
                "birthDay": "1993/03/08 0:00:00",
                "companyID": 1,
                "createTime": 1453878203000,
                "deptID": 95,
                "deptName": "人资部",
                "gender": "118001",
                "genderName": "男",
                "healthEndTime": "",
                "hukouAddress": "",
                "hukouType": "NULL",
                "isMarried": "NULL",
                "nation": "113001",
                "nationName": "汉族",
                "nowCode": "",
                "phone": "13522090239",
                "positionID": 0,
                "postID": 20,
                "postName": "经理",
                "rankID": 0,
                "state": "120002",
                "stateName": "在职",
                "urgentPerson": "",
                "userIDCard": "342623199303080318",
                "userName": "汪京辉",
                "userNum": "1125",
                "userType": "120005",
                "userTypeName": "全职",
                "valid": 1
            }, {
                "ID": 4,
                "bankCard": "6212260200022266221",
                "birthDay": "1991/01/26 0:00:00",
                "companyID": 1,
                "createTime": 1453878203000,
                "deptID": 95,
                "deptName": "人资部",
                "gender": "118002",
                "genderName": "女",
                "healthEndTime": "",
                "hukouAddress": "",
                "hukouType": "NULL",
                "isMarried": "NULL",
                "nation": "113001",
                "nationName": "汉族",
                "nowCode": "",
                "phone": "18612935169",
                "positionID": 0,
                "postID": 21,
                "postName": "经理",
                "rankID": 0,
                "state": "120002",
                "stateName": "在职",
                "urgentPerson": "",
                "userIDCard": "130624199101265328",
                "userName": "邓晓娟",
                "userNum": "1817",
                "userType": "120005",
                "userTypeName": "全职",
                "valid": 1
            }, {
                "ID": 5,
                "bankCard": "6215590200004841193",
                "birthDay": "1990/02/07 0:00:00",
                "companyID": 1,
                "createTime": 1453878203000,
                "deptID": 95,
                "deptName": "人资部",
                "gender": "118001",
                "genderName": "男",
                "healthEndTime": "",
                "hukouAddress": "",
                "hukouType": "NULL",
                "isMarried": "NULL",
                "nation": "113001",
                "nationName": "汉族",
                "nowCode": "",
                "phone": "18710105192",
                "positionID": 0,
                "postID": 22,
                "postName": "专员",
                "rankID": 0,
                "state": "120002",
                "stateName": "在职",
                "urgentPerson": "",
                "userIDCard": "341221199002075851",
                "userName": "陶彬彬",
                "userNum": "1064",
                "userType": "120005",
                "userTypeName": "全职",
                "valid": 1
            }, {
                "ID": 6,
                "bankCard": "6212260200023081785",
                "birthDay": "1991/05/26 0:00:00",
                "companyID": 1,
                "createTime": 1453878203000,
                "deptID": 95,
                "deptName": "人资部",
                "gender": "118002",
                "genderName": "女",
                "healthEndTime": "",
                "hukouAddress": "",
                "hukouType": "NULL",
                "isMarried": "NULL",
                "nation": "113001",
                "nationName": "汉族",
                "nowCode": "",
                "phone": "13401093832",
                "positionID": 0,
                "postID": 23,
                "postName": "厨师",
                "rankID": 0,
                "state": "120002",
                "stateName": "在职",
                "urgentPerson": "",
                "userIDCard": "340822199105261129",
                "userName": "孙静",
                "userNum": "1140",
                "userType": "120005",
                "userTypeName": "全职",
                "valid": 1
            }, {
                "ID": 7,
                "bankCard": "6212260200071643841",
                "birthDay": "1992/09/17 0:00:00",
                "companyID": 1,
                "createTime": 1453878203000,
                "deptID": 95,
                "deptName": "人资部",
                "gender": "118002",
                "genderName": "女",
                "healthEndTime": "",
                "hukouAddress": "",
                "hukouType": "NULL",
                "isMarried": "NULL",
                "nation": "113001",
                "nationName": "汉族",
                "nowCode": "",
                "phone": "18810481034",
                "positionID": 0,
                "postID": 24,
                "postName": "厨师",
                "rankID": 0,
                "state": "120002",
                "stateName": "在职",
                "urgentPerson": "",
                "userIDCard": "412702199209171442",
                "userName": "赵钰",
                "userNum": "1237",
                "userType": "120005",
                "userTypeName": "全职",
                "valid": 1
            }, {
                "ID": 9,
                "bankCard": "6212260200070571910",
                "birthDay": "1995/01/06 0:00:00",
                "companyID": 1,
                "createTime": 1453878203000,
                "deptID": 95,
                "deptName": "人资部",
                "gender": "118002",
                "genderName": "女",
                "healthEndTime": "",
                "hukouAddress": "",
                "hukouType": "NULL",
                "isMarried": "NULL",
                "nation": "113001",
                "nationName": "汉族",
                "nowCode": "",
                "phone": "18395652876",
                "positionID": 0,
                "postID": 24,
                "postName": "厨师",
                "rankID": 0,
                "state": "120002",
                "stateName": "在职",
                "urgentPerson": "",
                "userIDCard": "130681199501065824",
                "userName": "张爽",
                "userNum": "ZY010200008",
                "userType": "120005",
                "userTypeName": "全职",
                "valid": 1
            }, {
                "ID": 10,
                "bankCard": "6212260200071001438",
                "birthDay": "1986/12/25 0:00:00",
                "companyID": 1,
                "createTime": 1453878203000,
                "deptID": 95,
                "deptName": "人资部",
                "gender": "118001",
                "genderName": "男",
                "healthEndTime": "",
                "hukouAddress": "",
                "hukouType": "NULL",
                "isMarried": "NULL",
                "nation": "113001",
                "nationName": "汉族",
                "nowCode": "",
                "phone": "18500054297",
                "positionID": 0,
                "postID": 26,
                "postName": "经理",
                "rankID": 0,
                "state": "120002",
                "stateName": "在职",
                "urgentPerson": "",
                "userIDCard": "532326198510030333",
                "userName": "王波",
                "userNum": "ZY010200009",
                "userType": "120005",
                "userTypeName": "全职",
                "valid": 1
            }, {
                "ID": 11,
                "bankCard": "6212250200009516913",
                "birthDay": "1992/08/16 0:00:00",
                "companyID": 1,
                "createTime": 1453878203000,
                "deptID": 95,
                "deptName": "人资部",
                "gender": "118002",
                "genderName": "女",
                "healthEndTime": "",
                "hukouAddress": "",
                "hukouType": "NULL",
                "isMarried": "NULL",
                "nation": "113001",
                "nationName": "汉族",
                "nowCode": "",
                "phone": "18638488816",
                "positionID": 0,
                "postID": 25,
                "postName": "专员",
                "rankID": 0,
                "state": "120002",
                "stateName": "在职",
                "urgentPerson": "",
                "userIDCard": "410322199208163821",
                "userName": "张博",
                "userNum": "ZY010200010",
                "userType": "120005",
                "userTypeName": "全职",
                "valid": 1
            }, {
                "ID": 13,
                "bankCard": "6212260200075178604",
                "birthDay": "1992/03/25 0:00:00",
                "companyID": 1,
                "createTime": 1453878203000,
                "deptID": 95,
                "deptName": "人资部",
                "gender": "118002",
                "genderName": "女",
                "healthEndTime": "",
                "hukouAddress": "",
                "hukouType": "NULL",
                "isMarried": "NULL",
                "nation": "113001",
                "nationName": "汉族",
                "nowCode": "",
                "phone": "15910207176",
                "positionID": 0,
                "postID": 24,
                "postName": "厨师",
                "rankID": 0,
                "state": "120002",
                "stateName": "在职",
                "urgentPerson": "",
                "userIDCard": "612325199203253025",
                "userName": "李霞",
                "userNum": "ZY010200012",
                "userType": "120005",
                "userTypeName": "全职",
                "valid": 1
            }, {
                "ID": 14,
                "bankCard": "6212260200090733466",
                "birthDay": "1979/03/30 0:00:00",
                "companyID": 1,
                "createTime": 1453878203000,
                "deptID": 95,
                "deptName": "人资部",
                "gender": "118002",
                "genderName": "女",
                "healthEndTime": "",
                "hukouAddress": "",
                "hukouType": "NULL",
                "isMarried": "NULL",
                "nation": "113001",
                "nationName": "汉族",
                "nowCode": "",
                "phone": "13681360075",
                "positionID": 0,
                "postID": 24,
                "postName": "厨师",
                "rankID": 0,
                "state": "120002",
                "stateName": "在职",
                "urgentPerson": "",
                "userIDCard": "142232197903300028",
                "userName": "陈俐霞",
                "userNum": "ZY010200013",
                "userType": "120005",
                "userTypeName": "全职",
                "valid": 1
            }, {
                "ID": 15,
                "bankCard": "6222020200105443663",
                "birthDay": "1984/02/13 0:00:00",
                "companyID": 1,
                "createTime": 1453878203000,
                "deptID": 93,
                "deptName": "财务部",
                "gender": "118002",
                "genderName": "女",
                "healthEndTime": "",
                "hukouAddress": "",
                "hukouType": "NULL",
                "isMarried": "NULL",
                "nation": "113001",
                "nationName": "汉族",
                "nowCode": "",
                "phone": "18611181200",
                "positionID": 0,
                "postID": 28,
                "postName": "职员",
                "rankID": 0,
                "state": "120002",
                "stateName": "在职",
                "urgentPerson": "",
                "userIDCard": "50023719840213676X",
                "userName": "胡初兰",
                "userNum": "ZY010200014",
                "userType": "120005",
                "userTypeName": "全职",
                "valid": 1
            }, {
                "ID": 16,
                "bankCard": "6222020200105441741",
                "birthDay": "1988/10/20 0:00:00",
                "companyID": 1,
                "createTime": 1453878203000,
                "deptID": 93,
                "deptName": "财务部",
                "gender": "118002",
                "genderName": "女",
                "healthEndTime": "",
                "hukouAddress": "",
                "hukouType": "NULL",
                "isMarried": "NULL",
                "nation": "113001",
                "nationName": "汉族",
                "nowCode": "",
                "phone": "13401070206",
                "positionID": 0,
                "postID": 29,
                "postName": "厨师",
                "rankID": 0,
                "state": "120002",
                "stateName": "在职",
                "urgentPerson": "",
                "userIDCard": "450304198810202029",
                "userName": "莫夜玲",
                "userNum": "ZY010200015",
                "userType": "120005",
                "userTypeName": "全职",
                "valid": 1
            }, {
                "ID": 17,
                "bankCard": "",
                "birthDay": "",
                "companyID": 1,
                "createTime": 1453878203000,
                "deptID": 96,
                "deptName": "运营支持中心",
                "gender": "NULL",
                "healthEndTime": "",
                "hukouAddress": "",
                "hukouType": "NULL",
                "isMarried": "NULL",
                "nation": "NULL",
                "nowCode": "",
                "phone": "",
                "positionID": 0,
                "postID": 102,
                "rankID": 0,
                "state": "120002",
                "stateName": "在职",
                "urgentPerson": "",
                "userIDCard": "",
                "userName": "张史玲",
                "userNum": "ZY010200016",
                "userType": "120005",
                "userTypeName": "全职",
                "valid": 1
            }]
        },
        orderData() {

            this.fields = [{
                    name: 'userNum',
                    title: '工号',
                    locked: 'first'
                },

                {
                    name: 'userName',
                    title: '姓名',
                    locked: 'first'
                }, {
                    name: 'genderName',
                    title: '性别',
                }, {
                    name: 'nationName',
                    title: '民族',
                },

                {
                    name: 'deptName',
                    title: '部门',
                }, {
                    name: 'positionName',
                    title: '职位',
                }, {
                    name: 'postName',
                    title: '岗位',
                },

                {
                    name: 'bankCard',
                    title: '银行卡号',
                }, {
                    name: 'birthDay',
                    title: '生日',
                },




                {
                    name: 'userIDCard',
                    title: '身份证',
                },

                {
                    name: 'userTypeName',
                    title: '类型',
                    locked: 'last'
                }, {
                    name: 'stateName',
                    title: '状态',
                    locked: 'last'
                },


            ]


        }
    },
    attached() {
        // 组件插入dom时进行授权检测
        this.$root.checkAuthority(this.$el);
    }
}
</script>
<style type="text/css" scoped>
.demotable {
    left: 20px;
    top: 50px;
    right: 20px;
    bottom: 20px;
}
</style>
