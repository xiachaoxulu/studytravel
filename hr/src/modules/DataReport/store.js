import Vue from 'vue';
const Tool = Vue.tool;

// VUEX
// flux view>actions>mutations>state>view

// 数据、状态
const state = {}
// 数据修改
const mutations = {}
// 操作
const actions = {

	//未来门店管理图表接口
	loadDataReportFuturestoreplan(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.DataReport.getFutrueStorePlan',
      success(data, res) {
        console.log(data);
				var xdata_arr=[];
				for(var i=0;i<data.length;i++){
					xdata_arr.push(data[i].storeNum);
			};
			console.log(xdata_arr);
      },
      error(res) {
        console.log(res);
      }
    });
  },
	// //薪资图表接口
	// loadDataReportFuturestoreplan(cbSuccess, cbError) {
	// 	Tool.ajax({
	// 		url: 'api.DataReport.getFutrueStorePlan',
	// 		success(data, res) {
	// 			console.log(data);
	// 		},
	// 		error(res) {
	// 			console.log(res);
	// 		}
	// 	});
	// },
	// //离职率图表接口
	// loadDataReportFuturestoreplan(cbSuccess, cbError) {
	// 	Tool.ajax({
	// 		url: 'api.DataReport.getFutrueStorePlan',
	// 		success(data, res) {
	// 			console.log(data);
	// 		},
	// 		error(res) {
	// 			console.log(res);
	// 		}
	// 	});
	// },
	//日工时图表接口
	loadDataReportFuturestoreplan(cbSuccess, cbError) {
		Tool.ajax({
			url: 'api.DataReport.getFutrueStorePlan',
			success(data, res) {
				console.log(data);
			},
			error(res) {
				console.log(res);
			}
		});
	},

	//日工时饼状图的接口数据处理
	loadDataReportFuturestoreplan(cbSuccess, cbError) {
		Tool.ajax({
			url: 'api.DataReport.gethuman',
			success(data, res) {
				console.log(data);
			},
			error(res) {
				console.log(res);
			}
		});
	},
	// //动态数据图表接口
	// loadDataReportFuturestoreplan(cbSuccess, cbError) {
	// 	Tool.ajax({
	// 		url: 'api.DataReport',
	// 		success(data, res) {
	// 			console.log(data);
	// 		},
	// 		error(res) {
	// 			console.log(res);
	// 		}
	// 	});
	// },
	// //人力成本图表接口
	// loadDataReportFuturestoreplan(cbSuccess, cbError) {
	// 	Tool.ajax({
	// 		url: 'api.DataReport',
	// 		success(data, res) {
	// 			console.log('人力成本预览请求成功');
	// 		},
	// 		error(res) {
	// 				console.log('请求失败请求失败');
	// 		}
	// 	});
	// },
	// //年龄分布图表接口
	// loadDataReportAgePercent(cbSuccess, cbError) {
  //     Tool.ajax({
  //       url: 'api.DataReport',
  //       success(data, res) {
  //         console.log('年龄分布请求成功');
  //       },
  //       error(res) {
  //         console.log('年龄分布请求失败');
  //       }
  //     });
  //   },
	// //图表接口
}

export default {
	state,
	mutations,
	actions
};
