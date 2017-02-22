<template>
    <div class="ui-panel">

        <div class="ui-panel-title">Table 表格    </div>
        <div class="ui-panel-content">
            <div class="api"><a href="https://github.com/ratiw/vue-table/wiki/Properties" target="_blank">组件说明</a></div>

			<table>
				<tr>
					<td>data-list</td>
					<td>数据列表，数组</td>
				</tr>
				<tr>
					<td>api-url</td>
					<td>数据地址</td>
				</tr>
				<tr>
					<td>data-path</td>
					<td>response 中的数据字段，原先ext中是 result.recordList </td>
				</tr>
				<tr>
					<td>totalPath</td>
					<td>response 中的数据总量字段，原先ext中是 result.recordCount </td>
				</tr>
				<tr>
					<td>fields</td>
					<td>表格字段列表</td>
				</tr>
				<tr>
					<td>perPage</td>
					<td>每页数量</td>
				</tr>
				<tr>
					<td>queryParams</td>
					<td>查询参数，包括查询，排序等</td>
				</tr>
				<tr>
					<td>appendParams</td>
					<td>其他附加参数</td>
				</tr>
				<tr>
					<td>selectedTo</td>
					<td>选中列表</td>
				</tr>
			</table>


		    <div class="container">
		      <!-- Example row of columns -->
		        <div class="row">
		            <div class="col-md-10">


						<div class="input-group">
						    <input v-model="searchFor" class="form-control" @keyup.enter="setFilter">
						    <span class="input-group-btn">
			                    <button class="btn btn-primary" @click="setFilter">筛选</button>
				                <button class="btn btn-default" @click="resetFilter">重置</button>
						    </span>
						</div>


		            </div>
		            <div class="col-md-14">
		                <div class="dropdown form-inline pull-right">

							<v-dropdown class="btn-group" :dropdownvalue.sync="perPage">
								<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								每页 {{perPage}}/条  <span class="caret"></span>
								</button>
								<ul slot="dropdown-menu" class="dropdown-menu">
									<li><a name="dropdown-item" value="10" href="#">10</a></li>
									<li><a name="dropdown-item" value="15" href="#">15</a></li>
									<li><a name="dropdown-item" value="20" href="#">20</a></li>
									<li><a name="dropdown-item" value="30" href="#">30</a></li>
									<li><a name="dropdown-item" value="100" href="#">100</a></li>
								</ul>
							</v-dropdown>

							<v-dropdown class="btn-group" >
								<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								列选 <span class="caret"></span>
								</button>
								<ul slot="dropdown-menu" class="dropdown-menu">
									<li v-for="field in fields">
										<span class="checkbox">
			                                <label>
			                                    <input type="checkbox" v-model="field.visible">
			                                    {{ field.title == '' ? field.name.replace('__', '') : field.title | capitalize }}
			                                </label>
			                            </span>
									</li>
								</ul>
							</v-dropdown>

		                </div>
		            </div>
		        </div>
				<div>
		        已选id : [{{selecteditems}}]
				</div>
		        <div class="table-responsive" style="overflow-x:auto;">
		            <vuetable v-ref:vuetable
			            :data-list = "tableData"
		                api-url="http://vuetable.ratiw.net/api/users"
		                data-path="data"
		                total-path="total"
		                :per-page="perPage"
		                :fields="fields"
		                :sort-order="sortOrder"
		                :selected-to.sync="selecteditems"

		                table-class="table table-bordered table-striped table-hover"
		                ascending-icon="expand_less"
		                descending-icon="expand_more"
		                pagination-class=""
		                pagination-info-class=""
		                pagination-component-class=""
		                :pagination-component="paginationComponent"
		                :item-actions="itemActions"
		                :append-params="moreParams"
		                wrapper-class="vuetable-wrapper"
		                table-wrapper=".vuetable-wrapper"
		                loading-class="loading",
		            ></vuetable>
		        </div>


		    </div> 

        </div>                
    </div>

</template>
<script>

import Vue from 'vue'

var E_SERVER_ERROR = 'Error communicating with the server'



/*

            proxy: {
                type: 'ajax',
                url: url,
                pageParam: "pageNum",
                limitParam: "pageSize",
                startParam: "",
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    messageProperty: 'err_msg',
                    totalProperty: 'result.recordCount',
                    rootProperty: 'result.recordList'
                }
            }

            http://10.152.64.50:8081/acewill/employee/selectEmployeeAllPage.htm?_dc=1464007600132&userNum=&state=120002&pageNum=1&pageSize=50


			{
				"result": {
					"pageCount": 24,
					"pageNum": 1,
					"pageSize": 50,
					"recordCount": 1168,
					"recordList": [{
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
						"ID": 8,
						"bankCard": "6212260200067679171",
						"birthDay": "1991/02/03 0:00:00",
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
						"phone": "18275258674",
						"positionID": 0,
						"postID": 25,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "522526199102032237",
						"userName": "李坤",
						"userNum": "ZY010200007",
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
					}, {
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
					}, {
						"ID": 23,
						"bankCard": "6212260200071645572",
						"birthDay": "1992/10/03 0:00:00",
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
						"phone": "13756461931",
						"positionID": 0,
						"postID": 35,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "152105199210032143",
						"userName": "迟鑫",
						"userNum": "ZY010200022",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}, {
						"ID": 24,
						"bankCard": "6215590200004124467",
						"birthDay": "1990/03/08 0:00:00",
						"companyID": 1,
						"createTime": 1453878203000,
						"deptID": 93,
						"deptName": "财务部",
						"gender": "118001",
						"genderName": "男",
						"healthEndTime": "",
						"hukouAddress": "",
						"hukouType": "NULL",
						"isMarried": "NULL",
						"nation": "113001",
						"nationName": "汉族",
						"nowCode": "",
						"phone": "13301362040",
						"positionID": 0,
						"postID": 36,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "230822199003080655",
						"userName": "于永泉",
						"userNum": "ZY010200023",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}, {
						"ID": 25,
						"bankCard": "6212260200073139186",
						"birthDay": "1993/05/20 0:00:00",
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
						"phone": "18245011580",
						"positionID": 0,
						"postID": 35,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "230121199305202908",
						"userName": "牛姗姗",
						"userNum": "ZY010200024",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}, {
						"ID": 26,
						"bankCard": "6215590200010466472",
						"birthDay": "1966/05/30 0:00:00",
						"companyID": 1,
						"createTime": 1453878203000,
						"deptID": 97,
						"deptName": "维安部",
						"gender": "118001",
						"genderName": "男",
						"healthEndTime": "",
						"hukouAddress": "",
						"hukouType": "NULL",
						"isMarried": "NULL",
						"nation": "113001",
						"nationName": "汉族",
						"nowCode": "",
						"phone": "13011198658",
						"positionID": 0,
						"postID": 37,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "222403196805300053",
						"userName": "林卫",
						"userNum": "ZY010200025",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}, {
						"ID": 27,
						"bankCard": "6222020200060444177",
						"birthDay": "1983/09/18 0:00:00",
						"companyID": 1,
						"createTime": 1453878203000,
						"deptID": 97,
						"deptName": "维安部",
						"gender": "118001",
						"genderName": "男",
						"healthEndTime": "",
						"hukouAddress": "",
						"hukouType": "NULL",
						"isMarried": "NULL",
						"nation": "113001",
						"nationName": "汉族",
						"nowCode": "",
						"phone": "15011151435",
						"positionID": 0,
						"postID": 38,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "23022519830918001X",
						"userName": "于阿龙",
						"userNum": "ZY010200026",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}, {
						"ID": 28,
						"bankCard": "6215590200001213222",
						"birthDay": "1995/01/09 0:00:00",
						"companyID": 1,
						"createTime": 1453878203000,
						"deptID": 97,
						"deptName": "维安部",
						"gender": "118001",
						"genderName": "男",
						"healthEndTime": "",
						"hukouAddress": "",
						"hukouType": "NULL",
						"isMarried": "NULL",
						"nation": "113001",
						"nationName": "汉族",
						"nowCode": "",
						"phone": "15398167763",
						"positionID": 0,
						"postID": 39,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "341221199501099292",
						"userName": "韩析蒙",
						"userNum": "ZY010200027",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}, {
						"ID": 29,
						"bankCard": "6212260200057088474",
						"birthDay": "1991/01/14 0:00:00",
						"companyID": 1,
						"createTime": 1453878203000,
						"deptID": 97,
						"deptName": "维安部",
						"gender": "118001",
						"genderName": "男",
						"healthEndTime": "",
						"hukouAddress": "",
						"hukouType": "NULL",
						"isMarried": "NULL",
						"nation": "113001",
						"nationName": "汉族",
						"nowCode": "",
						"phone": "13241103553",
						"positionID": 0,
						"postID": 40,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "130623199101141513",
						"userName": "薛立辉",
						"userNum": "ZY010200028",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}, {
						"ID": 30,
						"bankCard": "6212260200057088466",
						"birthDay": "1987/05/10 0:00:00",
						"companyID": 1,
						"createTime": 1453878203000,
						"deptID": 97,
						"deptName": "维安部",
						"gender": "118001",
						"genderName": "男",
						"healthEndTime": "",
						"hukouAddress": "",
						"hukouType": "NULL",
						"isMarried": "NULL",
						"nation": "113037",
						"nationName": "蒙古族",
						"nowCode": "",
						"phone": "18513718521",
						"positionID": 0,
						"postID": 41,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "210123198705101254",
						"userName": "郭海东",
						"userNum": "ZY010200029",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}, {
						"ID": 31,
						"bankCard": "6215590200008146029",
						"birthDay": "1987/04/04 0:00:00",
						"companyID": 1,
						"createTime": 1453878203000,
						"deptID": 97,
						"deptName": "维安部",
						"gender": "118001",
						"genderName": "男",
						"healthEndTime": "",
						"hukouAddress": "",
						"hukouType": "NULL",
						"isMarried": "NULL",
						"nation": "113001",
						"nationName": "汉族",
						"nowCode": "",
						"phone": "13315427530",
						"positionID": 0,
						"postID": 41,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "130681198704042011",
						"userName": "张磊",
						"userNum": "ZY010200030",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}, {
						"ID": 32,
						"bankCard": "6212260200070796301",
						"birthDay": "1984/06/04 0:00:00",
						"companyID": 1,
						"createTime": 1453878203000,
						"deptID": 97,
						"deptName": "维安部",
						"gender": "118001",
						"genderName": "男",
						"healthEndTime": "",
						"hukouAddress": "",
						"hukouType": "NULL",
						"isMarried": "NULL",
						"nation": "113001",
						"nationName": "汉族",
						"nowCode": "",
						"phone": "15011355200",
						"positionID": 0,
						"postID": 41,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "654123198406040477",
						"userName": "杨远",
						"userNum": "ZY010200031",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}, {
						"ID": 33,
						"bankCard": "6212260200062990201",
						"birthDay": "1990/08/18 0:00:00",
						"companyID": 1,
						"createTime": 1453878203000,
						"deptID": 97,
						"deptName": "维安部",
						"gender": "118001",
						"genderName": "男",
						"healthEndTime": "",
						"hukouAddress": "",
						"hukouType": "NULL",
						"isMarried": "NULL",
						"nation": "113001",
						"nationName": "汉族",
						"nowCode": "",
						"phone": "18910936327",
						"positionID": 0,
						"postID": 40,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "421022199008182418",
						"userName": "肖维",
						"userNum": "ZY010200032",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}, {
						"ID": 34,
						"bankCard": "6222020200114980598",
						"birthDay": "1988/02/23 0:00:00",
						"companyID": 1,
						"createTime": 1453878203000,
						"deptID": 97,
						"deptName": "维安部",
						"gender": "118001",
						"genderName": "男",
						"healthEndTime": "",
						"hukouAddress": "",
						"hukouType": "NULL",
						"isMarried": "NULL",
						"nation": "113001",
						"nationName": "汉族",
						"nowCode": "",
						"phone": "18618214234",
						"positionID": 0,
						"postID": 40,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "152105198802232152",
						"userName": "迟瑞",
						"userNum": "ZY010200033",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}, {
						"ID": 35,
						"bankCard": "6212260200071226613",
						"birthDay": "1988/06/07 0:00:00",
						"companyID": 1,
						"createTime": 1453878203000,
						"deptID": 97,
						"deptName": "维安部",
						"gender": "118001",
						"genderName": "男",
						"healthEndTime": "",
						"hukouAddress": "",
						"hukouType": "NULL",
						"isMarried": "NULL",
						"nation": "113001",
						"nationName": "汉族",
						"nowCode": "",
						"phone": "18634570128",
						"positionID": 0,
						"postID": 41,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "142623198806074911",
						"userName": "梁朝威",
						"userNum": "ZY010200034",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}, {
						"ID": 36,
						"bankCard": "6212260200076668033",
						"birthDay": "1990/08/06 0:00:00",
						"companyID": 1,
						"createTime": 1453878203000,
						"deptID": 97,
						"deptName": "维安部",
						"gender": "118001",
						"genderName": "男",
						"healthEndTime": "",
						"hukouAddress": "",
						"hukouType": "NULL",
						"isMarried": "NULL",
						"nation": "113001",
						"nationName": "汉族",
						"nowCode": "",
						"phone": "15706613151",
						"positionID": 0,
						"postID": 40,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "440982199008065930",
						"userName": "李富贵",
						"userNum": "ZY010200035",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}, {
						"ID": 37,
						"bankCard": "",
						"birthDay": "",
						"companyID": 1,
						"createTime": 1453878203000,
						"deptID": 97,
						"deptName": "维安部",
						"gender": "118001",
						"genderName": "男",
						"healthEndTime": "",
						"hukouAddress": "",
						"hukouType": "NULL",
						"isMarried": "NULL",
						"nation": "NULL",
						"nowCode": "",
						"phone": "",
						"positionID": 0,
						"postID": 0,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "",
						"userName": "杨永鑫",
						"userNum": "ZY010200036",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}, {
						"ID": 38,
						"bankCard": "6212260200079500233",
						"birthDay": "",
						"companyID": 1,
						"createTime": 1453878203000,
						"deptID": 97,
						"deptName": "维安部",
						"gender": "118001",
						"genderName": "男",
						"healthEndTime": "",
						"hukouAddress": "",
						"hukouType": "NULL",
						"isMarried": "NULL",
						"nation": "NULL",
						"nowCode": "",
						"phone": "",
						"positionID": 0,
						"postID": 41,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "",
						"userName": "谭志强",
						"userNum": "ZY010200037",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}, {
						"ID": 39,
						"bankCard": "6212260200079978116",
						"birthDay": "1984/12/05 0:00:00",
						"companyID": 1,
						"createTime": 1453878203000,
						"deptID": 97,
						"deptName": "维安部",
						"gender": "118001",
						"genderName": "男",
						"healthEndTime": "",
						"hukouAddress": "",
						"hukouType": "NULL",
						"isMarried": "NULL",
						"nation": "113001",
						"nationName": "汉族",
						"nowCode": "",
						"phone": "13997945560",
						"positionID": 0,
						"postID": 41,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "420582198412054336",
						"userName": "龚尚强",
						"userNum": "ZY010200038",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}, {
						"ID": 40,
						"bankCard": "6212250200008830364",
						"birthDay": "1997/07/14 0:00:00",
						"companyID": 1,
						"createTime": 1453878203000,
						"deptID": 97,
						"deptName": "维安部",
						"gender": "118001",
						"genderName": "男",
						"healthEndTime": "",
						"hukouAddress": "",
						"hukouType": "NULL",
						"isMarried": "NULL",
						"nation": "113001",
						"nationName": "汉族",
						"nowCode": "",
						"phone": "18516835536",
						"positionID": 0,
						"postID": 40,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "411402199707149371",
						"userName": "夏学豪",
						"userNum": "ZY010200039",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}, {
						"ID": 41,
						"bankCard": "6212260200011437585",
						"birthDay": "1982/06/27 0:00:00",
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
						"phone": "13311014931",
						"positionID": 0,
						"postID": 24,
						"postName": "厨师",
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "51052119820627189X",
						"userName": "刘红爱",
						"userNum": "ZY010200040",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}, {
						"ID": 42,
						"bankCard": "6215590200013414354",
						"birthDay": "1992/01/12 0:00:00",
						"companyID": 1,
						"createTime": 1453878203000,
						"deptID": 96,
						"deptName": "运营支持中心",
						"gender": "118002",
						"genderName": "女",
						"healthEndTime": "",
						"hukouAddress": "",
						"hukouType": "NULL",
						"isMarried": "NULL",
						"nation": "113001",
						"nationName": "汉族",
						"nowCode": "",
						"phone": "13261827870",
						"positionID": 0,
						"postID": 43,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "230321199201123245",
						"userName": "张美玉",
						"userNum": "ZY010200041",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}, {
						"ID": 43,
						"bankCard": "6215590200013072608",
						"birthDay": "1987/03/26 0:00:00",
						"companyID": 1,
						"createTime": 1453878203000,
						"deptID": 96,
						"deptName": "运营支持中心",
						"gender": "118001",
						"genderName": "男",
						"healthEndTime": "",
						"hukouAddress": "",
						"hukouType": "NULL",
						"isMarried": "NULL",
						"nation": "113001",
						"nationName": "汉族",
						"nowCode": "",
						"phone": "13510850326",
						"positionID": 0,
						"postID": 44,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "430122198703260010",
						"userName": "刘毅",
						"userNum": "ZY010200042",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}, {
						"ID": 44,
						"bankCard": "6215590200013072798",
						"birthDay": "1992/12/29 0:00:00",
						"companyID": 1,
						"createTime": 1453878203000,
						"deptID": 96,
						"deptName": "运营支持中心",
						"gender": "118001",
						"genderName": "男",
						"healthEndTime": "",
						"hukouAddress": "",
						"hukouType": "NULL",
						"isMarried": "NULL",
						"nation": "113001",
						"nationName": "汉族",
						"nowCode": "",
						"phone": "18132796826",
						"positionID": 0,
						"postID": 45,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "130602199212290915",
						"userName": "张鑫宇",
						"userNum": "ZY010200043",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}, {
						"ID": 45,
						"bankCard": "6222020302044441160",
						"birthDay": "1992/04/28 0:00:00",
						"companyID": 1,
						"createTime": 1453878203000,
						"deptID": 96,
						"deptName": "运营支持中心",
						"gender": "118002",
						"genderName": "女",
						"healthEndTime": "",
						"hukouAddress": "",
						"hukouType": "NULL",
						"isMarried": "NULL",
						"nation": "113001",
						"nationName": "汉族",
						"nowCode": "",
						"phone": "18202240575",
						"positionID": 0,
						"postID": 46,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "120224199204284827",
						"userName": "于娇",
						"userNum": "ZY010200044",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}, {
						"ID": 46,
						"bankCard": "6215590200005289970",
						"birthDay": "1987/09/15 0:00:00",
						"companyID": 1,
						"createTime": 1453878203000,
						"deptID": 96,
						"deptName": "运营支持中心",
						"gender": "118001",
						"genderName": "男",
						"healthEndTime": "",
						"hukouAddress": "",
						"hukouType": "NULL",
						"isMarried": "NULL",
						"nation": "113001",
						"nationName": "汉族",
						"nowCode": "",
						"phone": "13718571613",
						"positionID": 0,
						"postID": 47,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "210711198709154211",
						"userName": "蔡谦诚",
						"userNum": "ZY010200045",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}, {
						"ID": 48,
						"bankCard": "6215590200001293182",
						"birthDay": "1989/01/13 0:00:00",
						"companyID": 1,
						"createTime": 1453878203000,
						"deptID": 93,
						"deptName": "财务部",
						"gender": "118001",
						"genderName": "男",
						"healthEndTime": "",
						"hukouAddress": "",
						"hukouType": "NULL",
						"isMarried": "NULL",
						"nation": "113001",
						"nationName": "汉族",
						"nowCode": "",
						"phone": "18612393691",
						"positionID": 0,
						"postID": 33,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "510623198901134035",
						"userName": "张翠园",
						"userNum": "ZY010200047",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}, {
						"ID": 49,
						"bankCard": "6212260200027043286",
						"birthDay": "1989/07/04 0:00:00",
						"companyID": 1,
						"createTime": 1453878203000,
						"deptID": 96,
						"deptName": "运营支持中心",
						"gender": "118001",
						"genderName": "男",
						"healthEndTime": "",
						"hukouAddress": "",
						"hukouType": "NULL",
						"isMarried": "NULL",
						"nation": "113001",
						"nationName": "汉族",
						"nowCode": "",
						"phone": "18811349040",
						"positionID": 0,
						"postID": 48,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "612401198907046112",
						"userName": "罗庭律",
						"userNum": "ZY010200048",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}, {
						"ID": 50,
						"bankCard": "6222020200118689377",
						"birthDay": "1986/01/02 0:00:00",
						"companyID": 1,
						"createTime": 1453878203000,
						"deptID": 96,
						"deptName": "运营支持中心",
						"gender": "118001",
						"genderName": "男",
						"healthEndTime": "",
						"hukouAddress": "",
						"hukouType": "NULL",
						"isMarried": "NULL",
						"nation": "NULL",
						"nowCode": "",
						"phone": "18001106398",
						"positionID": 0,
						"postID": 48,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "430726198601025237",
						"userName": "覃业振",
						"userNum": "ZY010200049",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}, {
						"ID": 51,
						"bankCard": "6212260200070926775",
						"birthDay": "1987/04/10 0:00:00",
						"companyID": 1,
						"createTime": 1453878203000,
						"deptID": 96,
						"deptName": "运营支持中心",
						"gender": "118001",
						"genderName": "男",
						"healthEndTime": "",
						"hukouAddress": "",
						"hukouType": "NULL",
						"isMarried": "NULL",
						"nation": "113001",
						"nationName": "汉族",
						"nowCode": "",
						"phone": "13522996990",
						"positionID": 0,
						"postID": 45,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "372925198704106558",
						"userName": "孟振法",
						"userNum": "ZY010200050",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}, {
						"ID": 52,
						"bankCard": "6222020302042531475",
						"birthDay": "1987/05/09 0:00:00",
						"companyID": 1,
						"createTime": 1453878203000,
						"deptID": 96,
						"deptName": "运营支持中心",
						"gender": "118001",
						"genderName": "男",
						"healthEndTime": "",
						"hukouAddress": "",
						"hukouType": "NULL",
						"isMarried": "NULL",
						"nation": "113001",
						"nationName": "汉族",
						"nowCode": "",
						"phone": "13509611553",
						"positionID": 0,
						"postID": 48,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "350824198705090431",
						"userName": "王文坤",
						"userNum": "ZY010200051",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}, {
						"ID": 53,
						"bankCard": "6215590200008928673",
						"birthDay": "1996/04/04 0:00:00",
						"companyID": 1,
						"createTime": 1453878203000,
						"deptID": 96,
						"deptName": "运营支持中心",
						"gender": "118002",
						"genderName": "女",
						"healthEndTime": "",
						"hukouAddress": "",
						"hukouType": "NULL",
						"isMarried": "NULL",
						"nation": "113001",
						"nationName": "汉族",
						"nowCode": "",
						"phone": "18515352338",
						"positionID": 0,
						"postID": 48,
						"rankID": 0,
						"state": "120002",
						"stateName": "在职",
						"urgentPerson": "",
						"userIDCard": "140224199604043022",
						"userName": "张艳艳",
						"userNum": "ZY010200052",
						"userType": "120005",
						"userTypeName": "全职",
						"valid": 1
					}],
					"startRecord": 0
				},
				"err_msg": "请求处理成功",
				"err_code": 8888,
				"success": "true"
			}


 */

export default {
	data() {

		return {

			tableData:[
				{
					"id": 82,
					"name": "Aglae Hartmann",
					"nickname": "dignissimos",
					"email": "anderson84@example.com",
					"birthdate": "2004-03-17",
					"gender": "M",
					"group_id": "5",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 83,
					"name": "Aiden Wilkinson",
					"nickname": "tempore",
					"email": "norris.emard@example.com",
					"birthdate": "2002-12-24",
					"gender": "F",
					"group_id": "5",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 22,
					"name": "Albina Yundt",
					"nickname": "consequatur",
					"email": "auer.ottilie@example.net",
					"birthdate": "1987-11-29",
					"gender": "F",
					"group_id": "1",
					"created_at": "2016-04-21 09:21:33",
					"updated_at": "2016-04-21 09:21:33"
				}, {
					"id": 86,
					"name": "Alejandrin Walker",
					"nickname": "sit",
					"email": "kuhlman.mark@example.net",
					"birthdate": "2000-05-13",
					"gender": "M",
					"group_id": "3",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 16,
					"name": "Alford McGlynn IV",
					"nickname": "vero",
					"email": "nicholaus59@example.com",
					"birthdate": "2002-05-04",
					"gender": "F",
					"group_id": "1",
					"created_at": "2016-04-21 09:21:33",
					"updated_at": "2016-04-21 09:21:33"
				}, {
					"id": 31,
					"name": "Alice Hermann MD",
					"nickname": "enim",
					"email": "evelyn.kohler@example.org",
					"birthdate": "2003-07-16",
					"gender": "F",
					"group_id": "2",
					"created_at": "2016-04-21 09:21:33",
					"updated_at": "2016-04-21 09:21:33"
				}, {
					"id": 134,
					"name": "Ana Wiza",
					"nickname": "ut",
					"email": "nicolas61@example.com",
					"birthdate": "1992-02-05",
					"gender": "F",
					"group_id": "3",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 7,
					"name": "Annabell Walter",
					"nickname": "accusamus",
					"email": "colin00@example.org",
					"birthdate": "1995-05-08",
					"gender": "F",
					"group_id": "1",
					"created_at": "2016-04-21 09:21:33",
					"updated_at": "2016-04-21 09:21:33"
				}, {
					"id": 44,
					"name": "Antonette Aufderhar",
					"nickname": "exercitationem",
					"email": "iblanda@example.com",
					"birthdate": "2001-02-15",
					"gender": "M",
					"group_id": "1",
					"created_at": "2016-04-21 09:21:33",
					"updated_at": "2016-04-21 09:21:33"
				}, {
					"id": 127,
					"name": "Antonette Nienow",
					"nickname": "dolores",
					"email": "hirthe.pasquale@example.org",
					"birthdate": "1990-06-17",
					"gender": "M",
					"group_id": "4",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 87,
					"name": "Arthur Wehner",
					"nickname": "velit",
					"email": "zboncak.amos@example.net",
					"birthdate": "2011-08-03",
					"gender": "M",
					"group_id": "3",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 3,
					"name": "Aubrey Wuckert",
					"nickname": "ipsum",
					"email": "haskell.beatty@example.com",
					"birthdate": "2012-12-11",
					"gender": "F",
					"group_id": "3",
					"created_at": "2016-04-21 09:21:33",
					"updated_at": "2016-04-21 09:21:33"
				}, {
					"id": 70,
					"name": "Bertram Howe",
					"nickname": "nihil",
					"email": "elliott.friesen@example.org",
					"birthdate": "1999-01-02",
					"gender": "F",
					"group_id": "2",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 85,
					"name": "Boyd Morar II",
					"nickname": "sunt",
					"email": "lilian60@example.net",
					"birthdate": "2009-07-22",
					"gender": "M",
					"group_id": "1",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 54,
					"name": "Brandy Price",
					"nickname": "fugit",
					"email": "sawayn.naomi@example.net",
					"birthdate": "1987-02-23",
					"gender": "F",
					"group_id": "2",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 136,
					"name": "Brennon Barrows",
					"nickname": "ad",
					"email": "kevin37@example.net",
					"birthdate": "2004-12-01",
					"gender": "M",
					"group_id": "5",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 80,
					"name": "Brittany Towne",
					"nickname": "iure",
					"email": "jamison.harvey@example.com",
					"birthdate": "1996-02-23",
					"gender": "F",
					"group_id": "1",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 8,
					"name": "Brooklyn Reichel",
					"nickname": "rerum",
					"email": "fgoldner@example.org",
					"birthdate": "1999-08-21",
					"gender": "M",
					"group_id": "4",
					"created_at": "2016-04-21 09:21:33",
					"updated_at": "2016-04-21 09:21:33"
				}, {
					"id": 109,
					"name": "Bruce Rath",
					"nickname": "dolorem",
					"email": "jed.botsford@example.com",
					"birthdate": "1991-04-08",
					"gender": "F",
					"group_id": "1",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 150,
					"name": "Camylle Kerluke",
					"nickname": "doloremque",
					"email": "flehner@example.com",
					"birthdate": "2004-04-22",
					"gender": "F",
					"group_id": "1",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 115,
					"name": "Catharine Schuppe",
					"nickname": "cum",
					"email": "reynolds.courtney@example.org",
					"birthdate": "2000-01-31",
					"gender": "M",
					"group_id": "4",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 128,
					"name": "Cecelia Kovacek",
					"nickname": "vel",
					"email": "travon06@example.net",
					"birthdate": "2008-09-18",
					"gender": "M",
					"group_id": "4",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 2,
					"name": "Chaz Considine",
					"nickname": "ipsam",
					"email": "rmonahan@example.net",
					"birthdate": "2012-03-16",
					"gender": "F",
					"group_id": "2",
					"created_at": "2016-04-21 09:21:33",
					"updated_at": "2016-04-21 09:21:33"
				}, {
					"id": 39,
					"name": "Chelsey Simonis",
					"nickname": "est",
					"email": "fritsch.cathrine@example.org",
					"birthdate": "2006-08-25",
					"gender": "M",
					"group_id": "2",
					"created_at": "2016-04-21 09:21:33",
					"updated_at": "2016-04-21 09:21:33"
				}, {
					"id": 122,
					"name": "Clair Hyatt",
					"nickname": "deleniti",
					"email": "ehickle@example.org",
					"birthdate": "1994-06-23",
					"gender": "M",
					"group_id": "1",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 9,
					"name": "Clementine Harber",
					"nickname": "odio",
					"email": "flossie84@example.com",
					"birthdate": "1999-06-06",
					"gender": "F",
					"group_id": "4",
					"created_at": "2016-04-21 09:21:33",
					"updated_at": "2016-04-21 09:21:33"
				}, {
					"id": 118,
					"name": "Dameon Fritsch",
					"nickname": "ea",
					"email": "mariane.schneider@example.com",
					"birthdate": "2001-02-25",
					"gender": "F",
					"group_id": "4",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 37,
					"name": "Dawson Waelchi",
					"nickname": "itaque",
					"email": "lakin.rene@example.net",
					"birthdate": "2010-01-28",
					"gender": "M",
					"group_id": "5",
					"created_at": "2016-04-21 09:21:33",
					"updated_at": "2016-04-21 09:21:33"
				}, {
					"id": 104,
					"name": "Dr. Demarcus Fritsch",
					"nickname": "sed",
					"email": "yolanda.bergnaum@example.net",
					"birthdate": "1997-12-30",
					"gender": "F",
					"group_id": "2",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 29,
					"name": "Dr. Desiree Hodkiewicz V",
					"nickname": "totam",
					"email": "llemke@example.com",
					"birthdate": "1993-12-19",
					"gender": "F",
					"group_id": "5",
					"created_at": "2016-04-21 09:21:33",
					"updated_at": "2016-04-21 09:21:33"
				}, {
					"id": 84,
					"name": "Dr. Evert Paucek",
					"nickname": "beatae",
					"email": "cortiz@example.com",
					"birthdate": "1991-06-12",
					"gender": "F",
					"group_id": "3",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 66,
					"name": "Dr. Ludie Botsford",
					"nickname": "error",
					"email": "kdouglas@example.net",
					"birthdate": "2014-04-19",
					"gender": "M",
					"group_id": "4",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 77,
					"name": "Dr. Major Pacocha",
					"nickname": "ut",
					"email": "yweber@example.net",
					"birthdate": "1995-01-18",
					"gender": "M",
					"group_id": "2",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 47,
					"name": "Dr. Vicente Weber",
					"nickname": "repellat",
					"email": "zoe.koch@example.com",
					"birthdate": "2001-04-06",
					"gender": "F",
					"group_id": "2",
					"created_at": "2016-04-21 09:21:33",
					"updated_at": "2016-04-21 09:21:33"
				}, {
					"id": 35,
					"name": "Elaina Runolfsdottir",
					"nickname": "aut",
					"email": "kling.aliza@example.org",
					"birthdate": "2007-08-15",
					"gender": "M",
					"group_id": "4",
					"created_at": "2016-04-21 09:21:33",
					"updated_at": "2016-04-21 09:21:33"
				}, {
					"id": 67,
					"name": "Electa McGlynn",
					"nickname": "asperiores",
					"email": "margret.frami@example.net",
					"birthdate": "1989-08-29",
					"gender": "M",
					"group_id": "1",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 20,
					"name": "Elsa Kohler",
					"nickname": "vel",
					"email": "rhomenick@example.org",
					"birthdate": "1986-05-16",
					"gender": "M",
					"group_id": "1",
					"created_at": "2016-04-21 09:21:33",
					"updated_at": "2016-04-21 09:21:33"
				}, {
					"id": 60,
					"name": "Eula Stroman",
					"nickname": "earum",
					"email": "nora95@example.net",
					"birthdate": "2004-08-23",
					"gender": "M",
					"group_id": "1",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 116,
					"name": "Ezekiel Gaylord",
					"nickname": "illo",
					"email": "braxton15@example.net",
					"birthdate": "1992-12-16",
					"gender": "M",
					"group_id": "1",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 125,
					"name": "Fanny Johns",
					"nickname": "odit",
					"email": "uward@example.net",
					"birthdate": "1986-12-16",
					"gender": "F",
					"group_id": "5",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 63,
					"name": "Florine Lubowitz",
					"nickname": "in",
					"email": "svon@example.net",
					"birthdate": "1987-03-12",
					"gender": "F",
					"group_id": "4",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 74,
					"name": "Francisco Schinner",
					"nickname": "consequuntur",
					"email": "pdietrich@example.com",
					"birthdate": "2000-04-26",
					"gender": "M",
					"group_id": "1",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 25,
					"name": "Frederick Purdy",
					"nickname": "ut",
					"email": "melany71@example.com",
					"birthdate": "2002-10-04",
					"gender": "F",
					"group_id": "1",
					"created_at": "2016-04-21 09:21:33",
					"updated_at": "2016-04-21 09:21:33"
				}, {
					"id": 57,
					"name": "Genoveva Rutherford Sr.",
					"nickname": "maiores",
					"email": "kayli.hand@example.org",
					"birthdate": "2013-12-08",
					"gender": "F",
					"group_id": "5",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 69,
					"name": "Gracie Bogisich",
					"nickname": "sunt",
					"email": "nikki88@example.org",
					"birthdate": "2000-01-12",
					"gender": "F",
					"group_id": "3",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 10,
					"name": "Hallie McLaughlin Jr.",
					"nickname": "aperiam",
					"email": "ojacobson@example.com",
					"birthdate": "1994-10-03",
					"gender": "M",
					"group_id": "5",
					"created_at": "2016-04-21 09:21:33",
					"updated_at": "2016-04-21 09:21:33"
				}, {
					"id": 149,
					"name": "Hester Nader",
					"nickname": "quia",
					"email": "joey78@example.net",
					"birthdate": "2010-10-31",
					"gender": "M",
					"group_id": "5",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 55,
					"name": "Humberto Rippin",
					"nickname": "quis",
					"email": "jewel26@example.net",
					"birthdate": "2000-08-24",
					"gender": "M",
					"group_id": "3",
					"created_at": "2016-05-14 03:47:34",
					"updated_at": "2016-05-14 03:47:34"
				}, {
					"id": 1,
					"name": "Ignatius Breitenberg",
					"nickname": "quisquam",
					"email": "hamill.raegan@example.com",
					"birthdate": "1999-12-13",
					"gender": "M",
					"group_id": "5",
					"created_at": "2016-04-21 09:21:33",
					"updated_at": "2016-04-21 09:21:33"
				}
			],

			selecteditems:[],
			searchFor: '',
			fields: [
				{
					name:'__checkbox:id',
					title:'选择',
				},
				{
					name: 'name',
					title:'姓名',
					sortField: 'name',
				}, 
				{
					name: 'email',
					title:'邮箱',
					sortField: 'email',
				}, 
				{
					name: 'email',
					title:'邮箱',
					sortField: 'email',
				}, 
				{
					name: 'email',
					title:'邮箱',
					sortField: 'email',
				}, 
				{
					name: 'email',
					title:'邮箱',
					sortField: 'email',
				}, 
				{
					name: 'email',
					title:'邮箱',
					sortField: 'email',
				}, 
				{
					name: 'email',
					title:'邮箱',
					sortField: 'email',
				}, 
				{
					name: 'email',
					title:'邮箱',
					sortField: 'email',
				}, 
				{
					name: 'nickname',
					title:'昵称',
					sortField: 'nickname',
					callback: 'allCap'
				}, 
				{
					name: 'birthdate',
					title:'出生日期',
					sortField: 'birthdate',
					callback: 'D/MM/Y'
				}, 
				{
					name: 'gender',
					title:'性别',
					sortField: 'gender',
					titleClass: 'text-center',
					dataClass: 'text-center',
					callback: 'gendertpl'
				}, 
				{
					name: '__actions',
					title:'操作',
					dataClass: 'text-center',
				}
			],
			sortOrder: {
				field: 'name',
				direction: 'asc'
			},
			perPage: 10,
			paginationComponent: 'vuetable-pagination-bootstrap',
			paginationInfoTemplate: ' {from} / {to} / {total} ',
			itemActions: [{
				name: 'view-item',
				label: '',
				icon: 'zoom_in',
				class: 'btn btn-default',
				extra: {
					'title': 'View',
					'data-toggle': "tooltip",
					'data-placement': "left"
				}
			}, {
				name: 'edit-item',
				label: '',
				icon: 'edit',
				class: 'btn btn-default',
				extra: {
					title: 'Edit',
					'data-toggle': "tooltip",
					'data-placement': "top"
				}
			}, {
				name: 'delete-item',
				label: '',
				icon: 'delete',
				class: 'btn btn-default',
				extra: {
					title: 'Delete',
					'data-toggle': "tooltip",
					'data-placement': "right"
				}
			}],
			moreParams: [],
		}

	},
	watch: {
		'perPage': function(val, oldVal) {
			this.$broadcast('vuetable:refresh')
		},
		'paginationComponent': function(val, oldVal) {
			this.$broadcast('vuetable:load-success', this.$refs.vuetable.tablePagination)
			this.paginationConfig(this.paginationComponent)
		}
	},
	methods: {
		/**
		 * Callback functions
		 */
		allCap: function(value) {
			return value.toUpperCase()
		},
		gendertpl: function(value) {
			return value == 'M' ? '<span class="label label-info"><i class="glyphicon glyphicon-star"></i> Male</span>' : '<span class="label label-success"><i class="glyphicon glyphicon-heart"></i> Female</span>'
		},
		function(value, fmt) {
			if (value == null) return ''
			fmt = (typeof fmt == 'undefined') ? 'D MMM YYYY' : fmt
			return moment(value, 'YYYY-MM-DD').format(fmt)
		},
		/**
		 * Other functions
		 */
		setFilter: function() {
			this.moreParams = [
				'filter=' + this.searchFor
			]
			this.$nextTick(function() {
				this.$broadcast('vuetable:refresh')
			})
		},
		resetFilter: function() {
			this.searchFor = ''
			this.setFilter()
		},
		preg_quote: function(str) {
			// http://kevin.vanzonneveld.net
			// +   original by: booeyOH
			// +   improved by: Ates Goral (http://magnetiq.com)
			// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// +   bugfixed by: Onno Marsman
			// *     example 1: preg_quote("$40");
			// *     returns 1: '\$40'
			// *     example 2: preg_quote("*RRRING* Hello?");
			// *     returns 2: '\*RRRING\* Hello\?'
			// *     example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
			// *     returns 3: '\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:'

			return (str + '').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
		},
		highlight: function(needle, haystack) {
			return haystack.replace(
				new RegExp('(' + this.preg_quote(needle) + ')', 'ig'),
				'<span class="highlight">$1</span>'
			)
		},
		paginationConfig: function(componentName) {
			console.log('paginationConfig: ', componentName)
			if (componentName == 'vuetable-pagination') {
				this.$broadcast('vuetable-pagination:set-options', {
					wrapperClass: 'pagination',
					icons: {
						first: '',
						prev: '',
						next: '',
						last: ''
					},
					activeClass: 'active',
					linkClass: 'btn btn-default',
					pageClass: 'btn btn-default'
				})
			}
			if (componentName == 'vuetable-pagination-dropdown') {
				this.$broadcast('vuetable-pagination:set-options', {
					wrapperClass: 'form-inline',
					icons: {
						prev: 'glyphicon glyphicon-chevron-left',
						next: 'glyphicon glyphicon-chevron-right'
					},
					dropdownClass: 'form-control'
				})
			}
		}
	},
	events: {
		'vuetable:row-changed': function(data) {
			console.log('row-changed:', data.name)
		},
		'vuetable:row-clicked': function(data, event) {
			console.log('clicked:', data.name)
			// data.name = '! ' + data.name
			data.nickname = '<i>' + data.nickname + '</i>'
		},
		'vuetable:action': function(action, data) {
			console.log('vuetable:action', action, data)
			if (action == 'view-item') {
				alert(action, data.name)
			} else if (action == 'edit-item') {
				alert(action, data.name)
			} else if (action == 'delete-item') {
				alert(action, data.name)
			}
		},
		'vuetable:load-success': function(data) {
			if (this.searchFor !== '') {
				for (var n in data) {
					data[n].name = this.highlight(this.searchFor, data[n].name)
					data[n].email = this.highlight(this.searchFor, data[n].email)
				}
			}
		},
		'vuetable:load-error': function(response) {
			if (response.status == 400) {
				alert('Something\'s Wrong!', response.data.message, 'error')
			} else {
				alert('Oops', E_SERVER_ERROR, 'error')
			}
		}
	}
}
</script>
<style scoped>
.table-responsive{
	margin-top: 30px;
}
ul.dropdown-menu li .checkbox{
 	padding-left: 20px;
}
.vuetable th.sortable:hover {
    color: #2185d0;
    cursor: pointer;
}
.vuetable-actions {
    width: 11%;
    padding: 12px 0px;
    text-align: center;
}
.vuetable-actions > button {
  padding: 3px 6px;
  margin-right: 4px;
}
.vuetable-pagination {
    margin: 0;
}
.vuetable-pagination .btn {
    margin: 2px;
}
.vuetable-pagination-info {
    float: left;
    margin-top: auto;
    margin-bottom: auto;
}
ul.pagination {
  margin: 0px;
}
.vuetable-pagination-component {
  float: right;
}
.vuetable-pagination-component li a {
    cursor: pointer;
}
[v-cloak] {
    display: none;
}
.highlight {
    background-color: yellow;
}

/* Loading Animation: */
.vuetable-wrapper {
    opacity: 1;
    position: relative;
    filter: alpha(opacity=100); /* IE8 and earlier */
}
.vuetable-wrapper.loading {
  opacity:0.4;
   transition: opacity .3s ease-in-out;
   -moz-transition: opacity .3s ease-in-out;
   -webkit-transition: opacity .3s ease-in-out;
}
.vuetable-wrapper.loading:after {
  position: absolute;
  content: '';
  top: 40%;
  left: 50%;
  margin: -30px 0 0 -30px;
  border-radius: 100%;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  border: 4px solid #000;
  height: 60px;
  width: 60px;
  background: transparent !important;
  display: inline-block;
  -webkit-animation: pulse 1s 0s ease-in-out infinite;
          animation: pulse 1s 0s ease-in-out infinite;
}
@keyframes pulse {
  0% {
    -webkit-transform: scale(0.6);
            transform: scale(0.6); }
  50% {
    -webkit-transform: scale(1);
            transform: scale(1);
         border-width: 12px; }
  100% {
    -webkit-transform: scale(0.6);
            transform: scale(0.6); }
}
</style>