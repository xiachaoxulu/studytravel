##TODO

1. 菜单栏标签及模块状态管理

2.

## 已用框架

	* vue v1.0.x
	* bootstrap (去除glyphicon, carousel-control会有图标缺失问题，使用时请注意替换图标)
	* webFont 使用 Material icons
	* echart3
	* keenUI (http://josephuspaye.github.io/Keen-UI/)
	* vue-strap
	* jquery

## 项目规范及说明

### 项目目录结构

	* src 				  	主目录
	* src/main.js 		  	主程序入口
	* src/store.js  	  	全局数据存储 可使用 this.$root.state.name 访问具体属性，或者{{$root.state.name}}

	* src/assets          	存放所有css,images,fonts 等ui资源
	* src/modules         	存放所有业务模块
	* src/libs            	存放需要载入的框架，如jquery, echart 等
	* src/components      	存放所有业务模块间可公用组件，业务模块私有组件直接放到 模块的/view中

	* src/App.vue 		  	根实例
	* src/config-api.js   	api配置文件，现在各模块api分开配置，各模块目录下有自己的api.js，新增模块后，需要把api.js import进config-api.js中
	* src/config-mock.js  	mock数据配置文件，现在各模块mock分开配置，各模块目录下有自己的mock.js，新增模块后，需要把mock.js import进config-mock.js中
	* src/config-route.js 	路由配置，全局统一配置，注意，路由配置中指向的路由文件必须存在
	* src/config-ui.js    	ui组件配置，所有需要全局公用的组件需要在次注册，全局使用时就不用import单独引用组件

### 模块目录结构

	* 所有项目新建时复制Demo模板文件

	* src/modules/ModuleA 	 模块目录

	* ModuleA/view 	   		 模块组件目录，模块私有组件放在此目录
	* ModuleA/view/main.vue  模块主入口
	* ModuleA/store.js 	     模块数据，业务，逻辑文件，约定使用Flex单向数据流动，view>actions>mutations>state>view
	* ModuleA/api.js   		 模块api，需要注册到/src/config-api.js中
	* ModuleA/mock.js 		 模块mock数据，inservice属性决定该模块是否开启mock
	* ModuleA/readme.md      模块业务逻辑，接口约定等需要记录的，以及开发过程中遇到待解决的问题，及下个版本需要改进的地方，在次记录

### 目录，文件命名规范

	* 各模块首字母大写命名 如 Dashboard
	* vue组件遵循驼峰模式，但是引入的时候需要将驼峰改成 - 模式，例如 appHeader >> <app-header></app-header>


## UI规范


### 命名规则

	* 使用 - 代替驼峰方式，例如 app-[module]-[item]

	* app-[name] 系统业务级模块 class用app-开头

	* ui-[name]  ui组件及子元素 ui-[name]-[item]

	* _[name]    组件内私有class，避免长名称（ui-module-item-name）,禁止对 ._[name] 直接定义样式，应使用 .ui-module ._icon{}

	* com-col-[name]-[layout]   公用列定位

	* com-mod-[name] 			公用模块

### app结构

	* app-aside  左侧栏

	* app-title  左侧栏 app名称

	* app-search 左侧栏 全局搜索

	* app-nav    左侧栏 主菜单

	* app-tabs   左侧栏 标签

	* app-user   左侧栏 用户

	* app-content 右侧主视窗

	* app-function 功能APP列表


### ui组件 详见/modules/Demo



	* ui-module 右侧主视图区 模块结构

		`
	    <!-- 模块示例 -->
	    <div class="ui-module" >

	        <!-- 模块功能条 -->
	        <header class="ui-module-navbar pos-topbar-fixed">

	            <!-- buttons -->

	        </header>

	        <!-- 模块主内容 -->
	        <section class="ui-module-content pos-l-content">

	            <!-- 列 -->
	            <div class="ui-module-col v-panel">列内容1</div>
	            <div class="ui-module-col v-panel">列内容2</div>
	            <div class="ui-module-col v-panel">列内容3</div>

	        </section>

	        <!-- 模块右侧栏 -->
	        <aside class="ui-module-aside pos-r-aside">

	        </aside>

	        <!-- 模块右侧栏 固定 -->
	        <aside class="ui-module-aside pos-r-aside-fixed">

	        </aside>

	        <!-- 模块右侧划入栏 组件-->
	        <ui-sidebar>
				<slot name="header"></slot>
				<slot name="content"></slot>
				<slot name="footer"></slot>
	        </ui-sidebar>

	    </div>

	`

	* icon 引入 <i class="material-icons">icon-name</i> 比如写入icon-name ,icon 尺寸


	* 按需引入echarts

		`
		// 引入 ECharts 主模块
		var echarts = require('echarts/lib/echarts');
		// 引入柱状图
		require('echarts/lib/chart/bar');
		// 引入提示框和标题组件
		require('echarts/lib/component/tooltip');
		require('echarts/lib/component/title');

		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('main'));
		// 绘制图表
		myChart.setOption({
		    title: { text: 'ECharts 入门示例' },
		    tooltip: {},
		    xAxis: {
		        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
		    },
		    yAxis: {},
		    series: [{
		        name: '销量',
		        type: 'bar',
		        data: [5, 20, 36, 10, 10, 20]
		    }]
		});

		`


	* 滚动条组件, showScrollView，需要ready后设置为true, scrollview父层需要设置高度

		`
		<div class="..">
			<ui-scrollview :show="showScrollView">滚动内容</ui-scrollview>
		</div>

		`

	* 右侧siderbar 组件

		`
		<ui-sidebar :show.sync="show" title="个人信息" layout="content" >

			具体内容或其他组件

		</ui-sidebar>

		`


### 布局与定位 不参与逻辑，以 pos-开头

	* .pos-topbar-fixed   固定头部
	* .pos-r-aside-fixed  固定右侧栏 如首页右侧常用功能模块
	* .pos-r-aside        右侧栏
	* .pos-r-silder-fixed 右侧花如兰 固定
	* .pos-content        无右边栏内容区
	* .pos-l-content      有右边栏，左侧内容区


### 组件通讯


1. 自定义组件 >> 自定义事件传入及回调

`
    // 父组件
    <components :is="" :callbackName="callbackName" @componentCallback="componentCallback"></components>

    // 子组件
    <template>
        <button @click="parentCallback">回调</button>
    </template>
    <script>
        export default{
            props:{
                callbackName:{
                    type:String,
                    required:true
                }
            },
            methods:{

                // 回调父组件方法
                parentCallback(){
                    this.$emit('componentCallback',this.callbackName)
                }

            }

        }
    </script>


`

2. 敏感操作的弹窗控制 使用v-if控制渲染 避免v-show出现的权限漏洞

`
    <ui-modal :show.sync="show" v-if="show"></ui-modal>

`

3. 按钮权限

4. 菜单权限

5. tab切换，关闭 >> 状态保留与重置

## UI components

| 组件        							| 说明
|---------------------------------------|------------------
| button                 				| ok
| icon/Iconfont       					| ok
|---------------------------------------|------------------
| Cascader   级联选择                 	|
| DatePicker 日期选择框                 |
| TimePicker 时间选择框                 |
| Tree 树形控件							|
| TreeSelect 树选择						| 类似 Select 的选择控件
| Transfer 穿梭框						| 双栏穿梭选择框
| Upload 上传							|
| Table 表格							|
| Pagination 分页						|
|---------------------------------------|------------------
| Form 表单  							| 具有数据收集、校验和提交功能的表单
| input 输入框 							| 格式，验证
| radio                 				| ok
| checkbox                 				| ok
| select                 				| ok
| Switch 开关							| ok
| Badge 徽标数		                 	|
| Collapse 折叠面板		                | ok
| Calendar 日历		                 	|
| Dropdown 下拉菜单		                | ok
| Modal 对话框		                 	| ok
| confirm 确认框		                | ok
| Message 全局提示		                |
| Notification 通知提醒框		        |
| Popconfirm 气泡确认框		            |
| Popover 气泡卡片		                |
| Timeline 时间轴		                |
| Tooltip 文字提示		                |
| Tag 标签		                 		|
| Tabs 标签页		                 	| ok
|---------------------------------------|------------------
|  										|
| 										|
| 										|
| 										|
| 										|
| 										|
| 										|
| 										|
| 										|
| 										|


基本
	Button按钮
	Icon图标
	Layout布局
表单
	Cascader级联选择
	Checkbox多选框
	DatePicker日期选择框
	Form表单
	InputNumber数字输入框
	Radio单选框
	Rate评分
	Select选择器
	Slider滑动输入条
	Switch开关
	TimePicker时间选择框
	Transfer穿梭框
	TreeSelect树选择
	Upload上传
展示
	Alert警告提示
	Badge徽标数
	Carousel走马灯
	Collapse折叠面板
	Calendar日历
	Card卡片
	Dropdown下拉菜单
	Modal对话框
	Message全局提示
	Notification通知提醒框
	Progress进度条
	Popconfirm气泡确认框
	Popover气泡卡片
	Timeline时间轴
	Tooltip文字提示
	Tree树形控件
	Table表格
	Tag标签
导航
	Breadcrumb面包屑
	Menu导航菜单
	Pagination分页
	Steps步骤条
	Tabs标签页
其它
	Affix固钉
	LocaleProvider国际化
	QueueAnim进出场动画
	Spin加载中


##TODO

1. 全局console.log
2.
