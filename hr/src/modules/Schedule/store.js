import Vue from 'vue';

// flux view>actions>mutations>state>view

// 数据、状态
const state = {
    fullscreen:false, // 是否全屏排班

    dataStatus:{
        config:false,
        orgList:false,
        workClass:false,
    },

    // 排班配置
    config:{
        // 排班周期
        dateType:{
            'manager':'week',
            'service':'month',
            'department':'week',
        },
        // 应休天数
        holiday:{
            'manager':4,
            'service':4,
            'department':4,
        },
        overDay:1,     // 跨天班次显示位置，1 当天，2后一天
    },

    orgType:'',
    orgGroup:'',
    orgGroupID:'',
    workClassType:'',

    // 门店or部门id
    orgData:{
        department:'',
        manager:'',
        service:'',
    },

    // 搜索框数据
    searchInput:'',

    // 组织列表
    orgList:{
        dept:[],
        store:[]
    },

	// 班次列表
	workClass: [
	/*

		{
			id: '1',
			type: '1', 	//排班类型 1 部门  2 门店
			timeType:1,
			name: '夜班',
			time: ['18:00/24:00', '24:00/05:00'],
			color: ['font_white', 'bg_black']
		}, {
			id: '2',
			type: '1',
			timeType:1,
			name: '白班',
			time: ['09:00/12:00', '13:00/18:00'],
			color: ['font_white', 'bg_green']
		}
	 */
	],
    // 班次筛选列表 用于快速筛选班次
    workClassFilted:[],

    // 班次列表缓存
    workClassCached:{
        department:{},
        manager:{},
        service:{},
    },

	// 班次预设风格
	workStyle:[
        ['#333333','#ffffff'],
        ['#ffffff','#49c5cd'],
        ['#ffffff','#efc137'],
        ['#ffffff','#6964b4'],
        ['#FFCDD2','#B71C1C'],
        ['#E1BEE7','#4A148C'],
        ['#C5CAE9','#1A237E'],
        ['#B3E5FC','#01579B'],
        ['#B2DFDB','#004D40'],
        ['#DCEDC8','#33691E'],
        ['#FFF9C4','#F57F17'],
        ['#FFE0B2','#E65100'],
        ['#D7CCC8','#3E2723'],
    ],

}
//
const mutations = {

    // 更新设置

    SetConfig(data){

        // 排班周期

        state.config.dateType.manager = data.managePeriod-0==1 ? 'week': 'month';
        state.config.dateType.service = data.servicePeriod-0==1 ? 'week': 'month';
        state.config.dateType.department = data.departmentPeriod-0==1 ? 'week': 'month';

        // 应休天数

        state.config.holiday.manager = data.manageRest;
        state.config.holiday.service = data.serviceRest;
        state.config.holiday.department = data.departmentRest;


    },

    // 更新当前状态数据
    SetStatusNow(data){

        for(var i in data){
            state[i] =  data[i];
        }

    },

    // 更新org数据
    SetOrgData(type,id){
        state.orgData[type] = id;
    },

	// 更新班次列表数据
	SetWorkClass(data){

        if(!data) return;

        data.forEach(function(item,index){

            mutations.FormatWorkClass(item);

        })

        state.workClassCached[state.orgGroup] = data;
        state.workClass = data;
        state.workClassFilted = data;

	},
    GetCachedWorkClass(){
        state.workClassFilted = state.workClass = state.workClassCached[state.orgGroup];
    },
    // 格式化班次数据
    FormatWorkClass(item){

        // 转化为数组
        if(typeof(item.time)=='string' && item.time.indexOf('[')==0){
            item.time = JSON.parse(item.time);
        }

        // 转化为数字
        item.timeNumber = [];
        item.time.forEach(function(t){

            let _array = t.replace(/:/ig,'').split('/');
            item.timeNumber.push([_array[0],_array[1]])

        })

        return item;
    },

	// 编辑班次
	EditWorkClass(type,data,index){

		// 添加班次
		if(type=='add'){

			if(typeof(data.time)=='string' && data.time.indexOf('[')==0){
				data.time = JSON.parse(data.time);
			}

            let _data = mutations.FormatWorkClass(data);

			state.workClass.push(_data);
		}
		// 更新班次
		else if(type=='update'){
            let _data = mutations.FormatWorkClass(data);
			state.workClass.$set(index,_data)
		}
		// 删除班次
		else if(type=='delete'){

            state.workClass[index].valid = 0;
			// state.workClass.splice(index,1);
		}

	},
    // 组织结构数据
    SetOrgList(type,data){
        state.orgList[type] = data;
    },

}

const actions = {
    initData(){

    },
	// 初始化
    init(initCall) {

        // 加载组织列表
        if(!state.dataStatus.orgList){
            actions.initOrgList(function(){
                state.dataStatus.orgList = true;
            });
        }


        // // 获取班次
        // if(!state.dataStatus.workClass){
        //     actions.initWorkClass(function() {
        //         state.dataStatus.workClass = true;
        //     });
        // }

        // 获取配置信息
        // if(!state.dataStatus.config){
        //     actions.getConfigData(function(){
        //         state.dataStatus.config = true;
        //         initCall();
        //     })
        // }else{
        //     initCall();
        // }

    },

    // 判断多时间段班次是否合格
    filterMutliWorkTime(timeList, callback) {

        let startTimeList=[],endTimeList=[],noPassed=timeList.length;

        if(timeList.length==0){

            Vue.Tool.showTip({
                type: 'error',
                msg: '工作时间段不能为空'
            })

            return false;

        }


        for( let i=0,len=timeList.length;i<len;i++){

            let item = timeList[i],
                _startTime = item.startTime.replace(':', '') - 0,
                _endTime = item.endTime.replace(':', '') - 0
            ;

            // 第二个时间为00:00时 转为 24:00
            if(item.endTime == '00:00') item.endTime = '24:00';

            // 是否为空
            if (!item.startTime || !item.endTime) {

                Vue.Tool.showTip({
                    type: 'error',
                    msg: '工作时间段不能为空'
                })

                continue;
            }

            // 是否重合
            let overNum = 0;
            startTimeList.forEach((time,index)=>{

                // 本时段跨天
                if(_startTime>_endTime){

                    // 且已验证时段跨天，暂时只允许有一个跨天时段
                    if(startTimeList[index]>endTimeList[index]){
                        overNum++;
                    }
                    // 非跨天时段
                    else{
                        // 跨天时段的开始时间如果小于此时间段的结束时间，则重合
                        if(_startTime<endTimeList[index]){
                            overNum++;
                        }

                    }


                }
                // 本时段非跨天
                else {

                    // 若已验证时段跨天
                    if(startTimeList[index]>endTimeList[index]){

                        // 如果已验证时段的开始时间小于本时段的结束时间，则重合
                        if(startTimeList[index]<_endTime){
                            overNum++;
                        }

                    }
                    else{
                        // 都不跨天，则验证时段是否重合
                        if(!(_startTime>=endTimeList[index] || _endTime<=startTimeList[index]) || _startTime==startTimeList[index] || _endTime==endTimeList[index]){
                            overNum++;
                        }

                    }


                }

            })

            if(overNum>0){

                Vue.Tool.showTip({
                    type: 'error',
                    msg: '工作时间段重合请修改'
                })

                continue;
            }

            startTimeList.push(_startTime);
            endTimeList.push(_endTime);
            noPassed--;

        }


        if(noPassed==0) return timeList;

        return false;

    },

    // 获取配置信息
    getConfigData(callback){

        Vue.Tool.ajax({
            url: 'api.Settings.getScheduleConfig',
            success(data, res) {
                mutations.SetConfig(data);

                callback();
            },
            error(res) {
                Vue.Tool.showTip({
                    type:'error',
                    msg:res
                })
            }
        });

        // callback();
    },

	// // 获取班次数据
	// initWorkClass(callback){

	// 	var fn = callback || function(){}

	// 	// 加载数据
	// 	Vue.Tool.ajax({
	// 		url:'api.schedule.selectWorkClass',
	// 		data:{},
	// 		success(data,res){

	// 			mutations.SetWorkClass(data);

	// 			fn();

	// 		},
	// 		error(res){
	// 			///console.log(res)
	// 		}
	// 	});
	// },

	// 查询班次数据
	getWorkClassByID(ID){

		// ///console.log(state.workClass)

		for(let i=0,len=state.workClass.length;i<len;i++){

			if(state.workClass[i].ID-0==ID-0){

				var data = {};

				for(var key in state.workClass[i]){
					data[key] = state.workClass[i][key];
				}

				return state.workClass[i];
			}

		}

	},

	// 编辑班次数据，增删改
	eidtWorkClass(type,data,index){

        data.orgType = state.orgType=='department' ?'dept': 'store';

        if(state.orgType=='department'){
            data.orgID = state.orgData['department'];
        }
        else if( state.orgType=='store'){
            data.orgID = state.orgData[state.orgGroup];
        }

		if(type=='add'){

			// 提交数据

			if(typeof(data.time)=='object'){
				data.time = JSON.stringify(data.time)
			}

			Vue.Tool.ajax({
				url:'api.schedule.addWorkClass',
				data:data,
				success(data,res){

					/////console.log(data)

					if(typeof(data.time)=='string'){
						data.time = JSON.parse(data.time)
					}

					mutations.EditWorkClass('add',data)

					Vue.tool.showTip({
						show:true,
						type:'success',
						msg:'添加成功'
					})

				},
				error(res){

					///console.log(res)
					Vue.tool.showTip({
						show:true,
						type:'warning',
						msg:res
					})

				}
			});

		}
		else if(type=='update'){

			// 提交数据

			data.ID = state.workClass[index].ID;
			if(typeof(data.time)=='object'){
				data.time = JSON.stringify(data.time)
			}

			Vue.Tool.ajax({
				url:'api.schedule.updateWorkClass',
				data:data,
				success(data,res){

					/////console.log(data)
					/////console.log(index)

					if(typeof(data.time)=='string'){
						data.time = JSON.parse(data.time)
					}

					mutations.EditWorkClass('update',data,index)
					// actions.initWorkClass();
					Vue.tool.showTip({
						show:true,
						type:'success',
						msg:'修改成功'
					})

				},
				error(res){
					///console.log(res)
					Vue.tool.showTip({
						show:true,
						type:'warning',
						msg:res
					})
				}
			});


		}
		else if(type=='delete'){


			Vue.Tool.ajax({
				url:'api.schedule.deleteWorkClassByID',
				data:{
					IDs:JSON.stringify([state.workClass[index].ID])
				},
				success(data,res){

					mutations.EditWorkClass('delete',data,index)
					Vue.tool.showTip({
						show:true,
						type:'success',
						msg:'删除成功'
					})

				},
				error(res){
					///console.log(res)
					Vue.tool.showTip({
						show:true,
						type:'warning',
						msg:res
					})
				}
			});

		}
		else{
			mutations.EditWorkClass(type,data,index)
		}

	},


	// 加载组织列表
	initOrgList(callback){

		var fn = callback || function(){}

		// 加载部门数据
		Vue.Tool.ajax({
			url:'api.common.getDepartment',
			success(data,res){

				mutations.SetOrgList('dept',data);

				fn();

			},
			error(res){
				///console.log(res)

				Vue.tool.showTip({
					type:'error',
					msg:res
				})

			}
		});

        // 加载门店数据
        Vue.Tool.ajax({
            url:'api.common.getStore',
            success(data,res){
                mutations.SetOrgList('store',data);
                fn();

            },
            error(res){
                ///console.log(res)

                Vue.tool.showTip({
                    type:'error',
                    msg:res
                })

            }
        });

	},

	// 上传需求人数excel
    uploadExcel(formData,successCB,errorCB){

        // 上传文件
        Vue.Tool.ajax({
            url:'api.common.uploadFile',
            data:formData,
            success(data,res){
                successCB();

                var allData = {
                    orgID:'',
                    orgType:state.orgType == 'department' ? 'dept' : state.orgType,
                    filePath:data.path
                }

                if(state.orgType=='department'){
                    allData.orgID = state.orgData['department'];
                }
                else if( state.orgType=='store'){
                    allData.orgID = state.orgData[state.orgType];
                }

                if(!allData.orgID ||allData.orgID==''){
                    Vue.Tool.showTip({
                        type:'error',
                        msg:'请先选择要操作的部门或门店'
                    })
                    return;
                }


                // 解析excel
                Vue.Tool.ajax({
                    url:'api.schedule.parseExcel',
                    data:allData,
                    success(data,res){
                        successCB(data);
                    },
                    error(res){
                        ///console.log(res)
                        errorCB(res);
                    }
                });

            },
            error(res){
                ///console.log(res)
                errorCB(res);
            }
        });


        // var oReq = new XMLHttpRequest();
        // oReq.open("POST", "stash.php", true);
        // oReq.onload = function(oEvent) {
        //  if (oReq.status == 200) {
        //      success();
        //  } else {
        //      error(oReq.status);
        //  }
        // };
        // oReq.send(formData);

    },

    // 筛选班次
    filterWorkClass(time){

        state.workClassFilted = state.workClass.filter(item=>{

            if(!time) return true;

            let times = time.split(' '),
                firstTimes = item.time[0].split('/');

            // console.log(times,firstTimes)

            if(times[0] &&firstTimes[0] && firstTimes[0].indexOf(times[0])>-1){

                if(times[1] && firstTimes[1]){

                    if(firstTimes[1].indexOf(times[1])>-1) return true;

                    return false;

                }

                return true;
            }

            // console.log(time,item.time)
            return false;


        })

    },
    clearFilterWorkClass(){
        state.workClassFilted = [].concat(state.workClass);
    },
}

export default {
	state,
	mutations,
	actions
};
