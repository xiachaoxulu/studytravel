import Vue from 'vue';
const Tool = Vue.tool;
import store from './store'

function vuex(){

    // flux view>actions>mutations>state>view

    // 数据、状态
    const state = {

        // 配置信息
        config:{
            dateType:'',
            holiday:'',
            overDay:'1', // 跨天后置12小时
        },
        showOverDay:true, // 是否显示跨天排班

        routeFromWeek:false,// 标注此次路由跳转为人为操作，从week到day，state中有 workDataDays 数据

        type: 'week', // 排班类型，week,day

        orgType: '', // 组织类型：department,store
        orgGroup: '',       // 门店小组：管理组or服务组
        orgGroupID:3,          // 0 部门 1 管理组 2 服务组
        workClassType: 0,           // 当前排班所属组织  1 部门 2 管理组 3 服务组，用来显示特定组织的排班

        storeID:'', // 门店id
        deptID:'',  // 部门id

        userName: '', // 按人名搜索

        scheduleStatusShow:false, // 是否显示当前排班审核状态
        scheduleStatus:'',        // 当前排班审核状态

        hasEditedOfDay:false, // 周排版是否已编辑
        hasEditedOfHour:false,// 日排班是否已编辑
        hasCreatedHours:false,// 日排班是否已创建
        hasHiddenHours:true,  // 是否隐藏排班内容，提升性能

        toUpdateDay:false,    // 是否需要更新周排班数据，在日排班中添加班次后，需要更新周排班

        serverDate:(new Date()), // 服务器当前时间

        // 默认显示当前排班阶段的开始日期，需要通过排班时间段列表计算 actions.initDateSelectList
        dateStart: '', //
        recorderStartDate: '', // 备份dateStart

        weekIndex: 0 , // 当前周索引，用于标记切换周所在的索引

        // 选中显示日排版的时间
        daySelected:'',

        // 按月排班or按周排班  month or week
        dateType: 'week',

        // 周排班，日期长度
        dateLength: 0,

        // 日排班，时间长度
        hourLength: 48+24,

        // 时间段列表
        durationList:[],

        // 时间表 周
        workTimeDays: [],

        // 时间表 日
        workTimeHours:[],

        // 预估人数
        requiredNumber: {
            day:{},
            hour:{}
        },

        // 人员
        persons: [

        ],

        // 人员分页数据
        personPagenation:{
            total:0,            // 总数
            perpage:20,         // 每页数量
            pages:[10,20,30,50],   // 分页列表
            current:1,          // 当前页
            currentindex:0,     // 当前页开始元素索引
        },


        // 班次列表
        workClass: [
        /*

            {
                id: '1',
                type: '1',  //  排班类型 1 部门  2 管理组 3 服务组
                timeType:1, //  班次类型 1:正常上班  4:排休
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

        // 技能列表
        workSkills:[
            // {
            //  ID:1,
            //  name:'烤串'
            // },
            // {
            //  ID:2,
            //  name:'收银'
            // },
            // {
            //  ID:3,
            //  name:'配菜'
            // }
        ],

        // 排班数据 周
        workDataDays: {
            /* 格式化后的数据
            key = 'user'+[userID]+'_date'+[date]
            'user1_date20140101': {
                departmentId: '1',
                departmentName: '人事部',
                storeId: '',
                storeName: '三里屯店',
                userID: '1',
                userName: '马云',
                postName: '经理',
                date: '123131312313', // 用时间戳表示
                workTimeType: '1',  // 班次类型： 1 固定班次 2自定义班次 3请假  4排休
                workTime: '1',      // 固定班次存班次id
            },
            'user2_date20140101': {
                departmentId: '1',
                departmentName: '产品部',
                storeId: '',
                storeName: '三里屯店',
                userID: '2',
                userName: '李彦宏',
                postName: '经理',
                date: '123131312313',
                workTimeType: '2',
                workTime: [         // 自定义班次直接存数据
                    '1300/1800',
                    '2000/2400',
                ]
            }
            */

        },

        // 周排班附加数据。
        workDataDaysMore:{},

        // 管理组排班数据，暂存
        workDataManagers:{},

        // 排班数据 周 实际人数统计依赖表  >天>人
        workDataDaysActualNumber:[

            // {
            //  userID:workDataDays[id]
            // }


        ],


        // 排班数据 日 实际人数统计依赖表  >天>人
        workDataHoursActualNumber:[

            // {
            //  userID:workDataDays[id]
            // }


        ],

        // 每日实际工时 人>小时
        workDataHoursWorkHours:[],

        // 排班数据 日
        workDataHours:{
            /*
            'user1_start20140101_end12313': {
                departmentId: '1',
                storeId: '',
                userID: '1',
                date: '112342342424', // 用时间戳表示
                startTime: '123123123', // 开始时间，时间戳
                endTime: '12312313', // 结束时间
                skillID: 1, // 技能id
            }
            */
        },
        // 自定义班次 暂存
        customWorkClass:[

            {
                startTime:'00:00',
                endTime:'00:00'
            }

        ],

        // 自定义班次时间表
        customWorkClassTime:[

        ],

        // 缓存加载的日排版数据
        dataWorkHours:{},

        // 当前排班包含的班次，用于导出excel时罗列
        exportWorkClass:{
            hour:[],
            day:[]
        },

        // 缓存数据
        cachedWorkDay:{},
        cachedWorkHour:{},

        //

        workDayByRow:[],
        workHourByRow:[],

        // 请假信息
        leaveInfo:{},

        // 出差信息
        bstripInfo:{},

        // 调拨信息
        transferInfo:{},

    }

    const mutations = {

        // 配置信息
        SetConfig(data){
            state.config = data;
            state.dateType = data.dateType;
        },
        // 更改跨天排班是否显示状态
        SetShowOverDay(val){
            state.showOverDay = val;

            if(val){
                mutations.SetHourLength(48+24);
            }else{
                mutations.SetHourLength(48);
            }

        },

        // 修改当前排班表是否已经编辑

        SethasEditedOfDay(val){
            state.hasEditedOfDay = val;
        },

        // 设置排班审核状态
        SetScheduleStatus(data){
            state.scheduleStatus = data;

            if(data){
                state.scheduleStatusShow = true;
            }

        },

        // 隐藏24小时排班，提升性能
        HideHours(type){
            state.hasHiddenHours = type;
        },

        // 设置全局group,deptID
        SetOrgData(type,value){
            if(type=='department'){
                state.deptID = value;
                store.mutations.SetOrgData('department',value)
            }
            else if(type=='store'){
                state.storeID = value;
                store.mutations.SetOrgData(state.orgGroup,value)
            }

        },
        // 排班类型 week day
        SetDateType(type){
            state.dateType = type;
        },

        SetDateLength(n){
            state.dateLength = n;
        },

        SetHourLength(n){
            state.hourLength = n;
        },

        SetRouteFromWeek(yes){
            state.routeFromWeek = yes;
        },

        // 设置日排版选中的日期
        SetDaySelectedData(data){

            data.daySelected = Tool.iDate(data.daySelected-0,'yy/mm/dd').string;

            for( var i in data){
                state[i] = data[i]
            }
            // state.daySelected = Tool.iDate(date-0,'yy/mm/dd').string;
        },

        // 周排班 开始日期
        SetStartTime(date){
            state.dateStart = date;
        },
        // 设置时间段列表
        SetDurationList(data){
            state.durationList = data;
        },

        // 自定义时间选择列
        SetCustomWorkClassTime(type){

            var data = [];

            var t = type==48 ? 0.5 : 1;

            for(let i=0;i<=24;i+=t){

                let sh = Math.floor(i);

                data.push({
                    label:(sh<10?'0'+sh:sh)+':'+(sh<i?'30':'00'),
                    value:(sh<10?'0'+sh:sh)+':'+(sh<i?'30':'00')
                })

            }


            state.customWorkClassTime = data;

        },

        // 周排班时间表
        SetWorkDays(data){
            state.workTimeDays = data;

        },
        // 日排班时间表
        SetWorkHours(data){
            state.workTimeHours = data;
        },
        // 预估排班人数
        SetRequireNumber(type,data){

            if(type=='week'){
                state.requiredNumber.day = data;
            }
            else if(type=='day'){
                state.requiredNumber.hour = data;
            }

            // ///console.log(state.requiredNumber.hour)

        },
        // 设置周排班数据
        SetWorkDataDays(data,rowData){

            state.workDayByRow = rowData;

            state.workDataDays = data;

            state.hasEditedOfDay = false;


            // 生成所需人数依赖表

            state.workDataDaysActualNumber = [];

            // 循环时间表

            state.workTimeDays.forEach(function(workDay, j) {

                state.workDataDaysActualNumber.push({})

                // 循环人员表
                state.persons.forEach(function(people, i) {

                    var id = 'user' + people.userID + '_date' + workDay.time;

                    state.workDataDaysActualNumber[j][people.userID] = state.workDataDays[id];

                })

            })
        },

        // 设置周排班附加数据
        SetWorkDataDaysMore(data,id){
            state.workDataDaysMore[id] = data;
        },

        // 设置管理组排班数据

        SetWorkDataManagers(data){
            console.warn(data)
            state.workDataManagers = data;
        },

        // 设置日排班数据
        SetWorkDataHours(data,rowData){

            state.workHourByRow = rowData;

            state.workDataHours = data;

            state.hasEditedOfHour = false;


            // 生成所需人数依赖表

            state.workDataHoursActualNumber = [];

            // 循环时间表
            state.workTimeHours.forEach(function(workHour,j){

                state.workDataHoursActualNumber[j] = {};

                // 循环人员表
                state.persons.forEach(function(people, i) {
                    var id = 'user' + people.userID + '_time' + workHour.hour+'_date'+workHour.time;

                    // console.log(people.userID,state.workDataHours[id])

                    state.workDataHoursActualNumber[j][people.userID] = state.workDataHours[id];

                })

            })

            // console.log(state.workDataHoursActualNumber)


            // 生成工时依赖表

            state.workDataHoursWorkHours = [];

            // 循环人员表
            state.persons.forEach(function(people, i) {

                state.workDataHoursWorkHours[i] = {};

                // 循环时间表
                state.workTimeHours.forEach(function(workHour, j) {

                    var id = 'user' + people.userID + '_time' + workHour.hour + '_date' + workHour.time;
                    state.workDataHoursWorkHours[i]['time' + workHour.hour] = state.workDataHours[id];

                })

            })

        },

        // 更新某条排班数据
        /**
         * 更新排班数据，包括周排班和日排班
         * @param {string} type     类型：周排班 week 日排班 day
         * @param {string} ctrlType 操作类型: add,update,delete
         * @param {object} data     更新数据 周排班必须包含{workTime,workTimeType,workClass,workName}，日排班{skillID}
         * @param {string} id       要操作数据的id
         */
        EidtWorkDataByID(type,ctrlType,data,id){

            let source;

            if(type=='week'){
                state.hasEditedOfDay = true;
                source = state.workDataDays;
            }
            else if(type=='day'){
                state.hasEditedOfHour = true;
                source = state.workDataHours;
            }

            if(!source) return;

            // 更新排班数据
            for( var key in data){
                source[id][key] = data[key];
            }

            // 更新操作状态
            source[id]['ctrlType'] = ctrlType;

        },


        // 添加人员数据
        SetPersons(data){

            // 整理顺序
            if(state.orgType=='store'){

                var storeTeam = {};

                data.forEach(function(item,i){

                    if(!storeTeam['teamID_'+item.teamID]){
                        storeTeam['teamID_'+item.teamID] = [];
                    }

                    storeTeam['teamID_'+item.teamID].push(item);

                })


                var orderPerson = [];

                for(var i in storeTeam){

                    var team = storeTeam[i];

                    team.forEach(function(people,i){
                        people.isFirst = (i==0? true:false);
                        people.teamLength = team.length;
                        orderPerson.push(people)
                    })

                }

                data = orderPerson;

            }

            ///console.log(data)

            state.persons = data;

            state.personPagenation.total = data.length;
            state.personPagenation.current = 1;
            state.personPagenation.currentindex = 0;

            // // 清空搜索
            // state.userName = '';

        },

        // 设置人员分页
        ChangePage(index){
            state.personPagenation.current = index;
        },

        // 编辑自定义班次
        EditCustomWork(type,data,index){

            // 添加时间段
            if(type=='add'){


                // 最多五个时间段
                if(state.customWorkClass.length>=5){

                    Vue.tool.showTip({
                        type:'error',
                        msg:'班次最多可添加5个时段，如果您的时段过多请考虑是否分班次'
                    })
                    // alert('时间不能为空')
                    return;
                }


                state.customWorkClass.push(data)
            }
            // // 更新时间段
            // else if(type=='update'){
            //  state.customWorkClass.$set(index,data.contact([]))
            // }
            // 删除时间段
            else if(type=='delete'){
                state.customWorkClass.splice(index,1);
            }

        },
        // 技能
        SetWorkSkills(data){
            state.workSkills = data;
        },

        // 添加当前排班用到的班次到导出班次列表
        SetExportWorkClass(type,id){

            let workList = state.exportWorkClass[type]

            if(workList.indexOf(id+'')<0){
                workList.push(id+'')
            }

        },
        // 重置导出班次列表
        ClearExportWorkClass(type){
            state.exportWorkClass[type]=[];
        },

        // 请假信息
        SetLeaveInfo(data){

            // ((\d{4})-(\d{2})-(\d{2}))
            // ((\d{2}):(\d{2}):(\d{2}))
            //

            let holiday = {};

            console.info('请假信息')
            console.info(data)
            Array.isArray(data) && data.forEach(item=>{

                let startDate = item.startTime.match(/((\d{4})-(\d{2})-(\d{2}))/) || '',
                    endDate = item.endTime.match(/((\d{4})-(\d{2})-(\d{2}))/) || '',
                    startTime = item.startTime.match(/((\d{2}):(\d{2}):(\d{2}))/),
                    endTime = item.endTime.match(/((\d{2}):(\d{2}):(\d{2}))/),
                    duration = actions.getDateListInRange(startDate[0],endDate[0],'yyyy-mm-dd')
                ;

                duration.forEach(date=>{


                    let id = 'user' + item.userID + '_date' + new Date(date+' 00:00:00').getTime();
                    console.log(date,id)

                    if(!holiday[id]){
                        holiday[id] = []
                    }

                    holiday[id].push(item)

                })

            });

            console.log(holiday)

            state.leaveInfo = holiday;

        },
        // 出差信息
        SetBustripInfo(data){

            // ((\d{4})-(\d{2})-(\d{2}))
            // ((\d{2}):(\d{2}):(\d{2}))
            //

            let info = {};

            console.info('出差信息')
            console.info(data)
            Array.isArray(data) && data.forEach(item=>{

                let startDate = item.startTime.match(/((\d{4})-(\d{2})-(\d{2}))/) || '',
                    endDate = item.endTime.match(/((\d{4})-(\d{2})-(\d{2}))/) || '',
                    startTime = item.startTime.match(/((\d{2}):(\d{2}):(\d{2}))/),
                    endTime = item.endTime.match(/((\d{2}):(\d{2}):(\d{2}))/),
                    duration = actions.getDateListInRange(startDate[0],endDate[0],'yyyy-mm-dd')
                ;

                duration.forEach(date=>{


                    let id = 'user' + item.userID + '_date' + new Date(date+' 00:00:00').getTime();
                    console.log(date,id)

                    if(!info[id]){
                        info[id] = []
                    }

                    info[id].push(item)

                })

            });

            console.log(info)

            state.bstripInfo = info;

        },
        // 调拨信息
        SetTransferInfo(data,endDateTime){

            let info = {};

            console.info('调拨信息')
            console.info(data)
            Array.isArray(data) && data.forEach(item=>{

                // 如果有结束时间，则结束时间当天借调部门不能排班，所属部门可排版，所以要把调会当天从借调周期内去掉

                if(item.backTime){
                    item.backTime = Vue.Tool.iDate(item.backTime,'yy-mm-dd').string;
                }

                // 如果没有结束时间，则默认为当前班表的结束时间
                item.endTime = item.backTime || endDateTime.string;

                // console.error(item.endTime );

                let startDate = item.effectiveTime.match(/((\d{4})-(\d{2})-(\d{2}))/) || '',
                    endDate = item.endTime.match(/((\d{4})-(\d{2})-(\d{2}))/) || '',
                    startTime = item.effectiveTime.match(/((\d{2}):(\d{2}):(\d{2}))/),
                    endTime = item.endTime.match(/((\d{2}):(\d{2}):(\d{2}))/),
                    duration = actions.getDateListInRange(startDate[0],endDate[0],'yyyy-mm-dd')
                ;

                duration.forEach(date=>{

                    // if(item.userID===2771){
                    //     console.error(2771,date)
                    // }
                    //

                    let id = 'user' + item.userID + '_date' + new Date(date+' 00:00:00').getTime();
                    // console.log(date,id)

                    if(!info[id]){
                        info[id] = []
                    }

                    info[id].push(item)

                })

            });

            console.log(info)

            state.transferInfo = info;

        },

    }

    const actions = {

        // 清空搜索
        clearSearch(){
            state.userName = '';
        },

        // 计算日期范围内列表
        getDateListInRange(_start,_end,style){

            if(!_start || !_end) return [];

            let dateList = [_start],
                startDate = new Date(_start),
                endDate = new Date(_end),
                dateRange = endDate.getTime() - startDate.getTime();
            ;

            if(dateRange>0){
                let dayRange = dateRange/(1000 * 60 * 60 * 24);
                for(let i=1;i<=dayRange;i++){
                    dateList.push(Vue.Tool.iDate(_start,style,i).string)
                }
            }

            // console.warn(dateList);

            return dateList;
        },


        /**
         * 异步加载队列
         * @param  {Array}    list     执行列表
         * @param  {Function} callback 加载完成回调函数
         * @param  {Boolean}  type     是否按顺序加载执行
         * @return {Function}
         */
        asyncLoader(list,callback,type){

            var loaders = list.length;
            var list = list;

            /* 顺序加载 */
            if(type){
                return function fn(){

                    let handler = list.shift();

                    if (list.length == 0) {
                        handler(() => {
                            callback();
                        })
                    }
                    else{
                        handler(() => {
                            fn();
                        })
                    }

                };
            }
            /* 并行加载 */
            else{
                return function fn(){

                    let handler = list.shift();
                    handler(() => {
                        loaders--;
                        if(loaders==0){
                            callback();
                        }

                    });

                    if (list.length > 0) {
                        fn();
                    }

                };
            }
        },

        // 设置当前状态
        setStatusNow(data){

            if (data.type) state.type = data.type;
            if (data.orgType) state.orgType = data.orgType;
            if (data.orgGroup) {
                state.orgGroup = data.orgGroup;
                state.orgGroupID = data.orgGroup == 'manager' ? 1 : (data.orgGroup == 'service' ? 2 : 3);
            }

            state.workClassType = state.orgType=='department' ? 1 : (state.orgGroup=='manager' ? 2 : 3);

            // 设置共享的状态
            store.mutations.SetStatusNow({
                orgType: state.orgType,
                orgGroup: state.orgGroup,
                orgGroupID: state.orgGroupID,
                workClassType: state.workClassType,
            });


            // 加载缓存中的workClass
            store.mutations.GetCachedWorkClass();
        },

        // 选择部门or门店数据 >> 初始化数据分页
        setOrgData(type,value){
            // 清空搜索
            state.userName = '';
            mutations.SetOrgData(type,value);
            mutations.ChangePage(1);
        },


        // 是否显示跨天排班 状态改变 >> 初始化排班表时间+重新格式化日排班数据 >> 自动渲染新排班数据
        changeShowOverDay(val){
            mutations.SetShowOverDay(val);

            // console.log(state.hourLength)

            actions.initWorkTimeHours();
            actions.formatWorkDataOfHours(state.cachedWorkHour);

        },

        // 隐藏24小时排班内容，节省性能开销 >> 从日排班切换出去后即刻隐藏24小时排班内容，防止共享数据变更时导致的24小时排班渲染。
        hideHours(type){

            mutations.HideHours(type);

        },


        // 设置排班展示格式 按周或者按月 >> 已废弃！！！
        setDateType(type){
            mutations.SetDateType(type);
            actions.init(false,false,true);
        },

        // 标注此次路由跳转为人为操作 >> 点击日期进入24小时排版后，无需重新   加载当天的周排班数据，如果直接地址栏进入24小时排班，则需要加载当天的周排班数据
        setRouteFromWeek(yes){
            mutations.SetRouteFromWeek(yes);
        },

        /**
         * 初始化排班
         * @param  {string}  timeType        排班类型： week:周排班 day:日排班
         * @param  {object}  orgData         组织数据
         * @param  {boolean} onlyRefreshData 是否只更新数据，只更新数据的话，无需初始化排班时间表和时间选项，部门选项
         * @return {[type]}                 [description]
         */
        init(timeType,orgData,onlyRefreshData,dontUpdateTime,vueEl){

            // console.log(vueEl)

            if(vueEl) state.vueEl = vueEl;

            // 设置当前排班类型（周排班，日排班）
            if(!!timeType){
                state.type = timeType;
            }

            // 初始化时间段列表 ，初始化当前时间表开始时间dateStart
            if(state.type=='week' && !dontUpdateTime){
                actions.initDateSelectList('','init')
            }

            // 判断是否是week跳转至day ，如果是只更新hour排班表及数据
            if(state.routeFromWeek || onlyRefreshData){
                Vue.nextTick(function(){
                    actions.initWorkTime();
                    actions.initWorkData();
                })
            }else{

                // [获取配置信息（回调）]
                store.actions.getConfigData(function(){

                    let orgName =  state.orgType=='department' ? 'department' : state.orgGroup;

                    // 配置项数据
                    mutations.SetConfig({
                        dateType:store.state.config.dateType[orgName],
                        holiday:store.state.config.holiday[orgName],
                        overDay:store.state.config.overDay
                    });

                    // 渲染时间及排版时间表
                    if(!dontUpdateTime){

                        if(state.type=='week'){
                            actions.initDateSelectList('','init')
                        }

                        actions.initWorkTime();
                    }

                    // 获取人员 >> 初始化数据
                    // actions.initPersons(function(){

                        // Vue.nextTick(function(){
                            actions.initWorkData();
                        // })

                    // });

                    // 加载门店数据
                    if(state.orgType=='store'){

                        // 加载所需人数
                        actions.initRequiredNumber(state.type);

                        // 获取技能
                        actions.initSkills();

                    }

                });

            }

        },

        // 备份dateStart
        recorderDateStart(){
            state.recorderStartDate = state.dateStart;
        },

        // 恢复dateStart
        resetDateStart(){
            if(state.recorderStartDate){
                state.dateStart = state.recorderStartDate;
            }
        },

        /**
         * 初始化可选时间段列表 ，初始化当前时间表开始时间dateStart
         * @param [String,Date] date 当前日期或指定日期
         * @param [String]      type 类型 init:初始化时
         */
        initDateSelectList(date,type){

            // 如果没有date，则使用serverDate，即当前时间
            var _date = date || state.serverDate;
            var time = Tool.iDate(_date);

            // console.log(state.dateType)
            // console.warn('date',time,time.string)

            // 按周排班
            if(state.dateType=='week'){
                // 容错兜底，默认使用当前时间
                // mutations.SetStartTime(time.y+'/'+time.m+'/'+time.d);

                // 初始化时间段列表

                var timeNow = Tool.iDate(state.serverDate);    // 设置的当前时间

                var dateList = [];


                // 本月末 = 下月初1-1000毫秒
                var lastDay = time.lastDay; //// todo: 应该用服务器时间来计算

                // /////console.log('lastDay'+lastDay)

                var week = 1;

                // ['周日', '周一', '周二', '周三', '周四', '周五', '周六'] 周日为0
                let firstDayWeek = new Date(time.y+'/'+time.m+'/'+1).getDay(), // 每月1号周几
                    firstMonDay = firstDayWeek===0 ? 2 : 2+(7-firstDayWeek); // 每周第一个周一是几号


                // 初始化时需要确定当前时间所在的周期

                if(type==='init'){

                    // 当前时间大于等于本月第一个周一时 生成本月列表
                    if(timeNow.d-0>=firstMonDay){

                    }
                    // 当前时间小于本月第一个周一时  生成上月列表
                    else{

                        // 1月，上一月，跨年
                        if(time.m-0===1){
                            time = Tool.iDate((time.y-1)+'/12/'+1);
                        }
                        // 上一月，当年
                        else{
                            time = Tool.iDate(time.y+'/'+(time.m-1)+'/'+1);
                        }

                        // 重新设置时间
                        firstDayWeek = new Date(time.y+'/'+time.m+'/'+1).getDay(), // 每月1号周几
                        firstMonDay = firstDayWeek===0 ? 2 : 2+(7-firstDayWeek);

                    }
                }


                console.log(time.string)


                console.log('this day week is' + firstMonDay)

                /*for(let i=1;i<=lastDay;i+=7){
                    let start = i;
                    let end = (i+6)>lastDay?lastDay:i+6;
                    let isNow = false;
                    // 如果当前时间属于该时间段，则当前排班阶段第一天为start
                    if(time.d>=start && time.d<=end){

                        // 设置当前阶段开始日期
                        mutations.SetStartTime(time.y+'/'+time.m+'/'+start);
                        isNow = true;
                    }

                    end = end<10?'0'+end:end;


                    var passed = time.d>i?true:false;

                    if(timeNow.y>time.y){
                        passed = true;
                    }
                    else if(timeNow.y==time.y && timeNow.m>time.m){
                        passed =  true;
                    }

                    else if(timeNow.y==time.y && timeNow.m==time.m && timeNow.d>i){
                        passed = true;
                    }else{
                        passed = false;
                    }

                    dateList.push({
                        start: time.y+'/'+time.mm+'/'+(i<10?('0'+i):i),
                        startCN:time.y+'年'+time.mm+'月'+(i<10?('0'+i):i)+'日',
                        end: time.y+'/'+time.mm+'/'+end,
                        endCN:time.mm+'月'+end+'日',
                        week:week++,
                        passed: passed,
                        isnNow: isNow
                    })

                }*/

                // /////console.log(dateList)

                for(let i=firstMonDay;i<=35;i+=7){

                    let startDay = Tool.iDate(time.y+'/'+time.m+'/'+1,'yy/mm/dd',i-1),
                        endDay = Tool.iDate(time.y+'/'+time.m+'/'+1,'yy/mm/dd',i-1+6);

                        console.log(startDay,endDay)


                    // 非本月周一则结束循环
                    if(startDay.week===1 && startDay.m !== time.m){
                        break;
                    }

                    let start = i;
                    let end = (i+6)>lastDay?lastDay:i+6;
                    let isNow = false;
                    // 如果当前时间属于该时间段，则当前排班阶段第一天为start


                    let startYMD = startDay.y+startDay.mm+startDay.dd-0,
                        endYMD   =  endDay.y+endDay.mm+endDay.dd-0,
                        nowYMD   =  timeNow.y+timeNow.mm+timeNow.dd-0;

                    console.info(startYMD,'==',endYMD,'==',nowYMD)

                    // 如果当前时间在时间段内，则设置当前阶段的开始日期 为 指定开始日期
                    if(nowYMD>=startYMD && nowYMD<=endYMD){

                        // console.info('>>>',startDay.y+'/'+startDay.m+'/'+startDay.d)

                        // 设置当前阶段开始日期
                        mutations.SetStartTime(startDay.y+'/'+startDay.m+'/'+startDay.d);
                        isNow = true;
                    }

                    end = end<10?'0'+end:end;


                    var passed = time.d>i?true:false;

                    if(timeNow.y>time.y){
                        passed = true;
                    }
                    else if(timeNow.y==time.y && timeNow.m>time.m){
                        passed =  true;
                    }

                    else if(timeNow.y==time.y && timeNow.m==time.m && timeNow.d>i){
                        passed = true;
                    }else{
                        passed = false;
                    }

                    dateList.push({
                        start: startDay.y+'/'+startDay.mm+'/'+startDay.dd,
                        startCN:startDay.y+'年'+startDay.mm+'月'+startDay.dd+'日',
                        end: endDay.y+'/'+endDay.mm+'/'+endDay.dd,
                        endCN:endDay.y+'年'+endDay.mm+'月'+endDay.dd+'日',
                        week:week++,
                        passed: passed,
                        isNow: isNow
                    })

                    // 标记当前周索引
                    if(isNow){
                        this.weekIndex = dateList.length-1;
                    }

                }


                // 设置排班阶段列表
                mutations.SetDurationList(dateList.concat([]));
            }
            // 按月排班
            else if(state.dateType=='month'){

                mutations.SetStartTime(time.y+'/'+time.m+'/01');

            }


        },
        // 切换周
        changeWeek(n){
            if(n<0){
                if(state.weekIndex===0){
                    actions.changeMonth(-1);
                    state.weekIndex = state.durationList.length-1;
                    actions.setStartDate(state.durationList[state.weekIndex].start)
                }
                else{
                    state.weekIndex -= 1;
                    actions.setStartDate(state.durationList[state.weekIndex].start)
                }
            }
            else if(n===0){

                let date = '';

                // 先回到本月
                actions.changeMonth(0);

                console.log(state.durationList)

                // 再回到本周
                state.durationList.forEach((item,index)=>{
                    if(item.isNow){
                        console.log(item.start)
                        date = item.start
                        state.weekIndex = index;
                    }
                })

                console.log(date)
                actions.setStartDate(date)
            }
            else if(n>0){
                if(state.weekIndex===(state.durationList.length-1)){
                    actions.changeMonth(1);
                    state.weekIndex = 0;
                    actions.setStartDate(state.durationList[state.weekIndex].start)
                }
                else{
                    state.weekIndex += 1;
                    actions.setStartDate(state.durationList[state.weekIndex].start)
                }
            }
        },

        // 切换月份 >> 更新时间列表 >> 设置当前时间 >> 初始化新数据
        changeMonth(n){

            // 当前时间表开始时间
            let now = Tool.iDate(state.dateStart);

            /////console.log(now.string)

            // 前一年
            if(now.m+n <=0){

                var next = (now.y-1)+'/'+'12/01'

                if(state.dateType==='week'){
                    // ['周日', '周一', '周二', '周三', '周四', '周五', '周六'] 周日为0
                    let firstDayWeek = new Date(next).getDay(), // 每月1号周几
                    firstMonDay = firstDayWeek===0 ? 2 : 2+(7-firstDayWeek); // 每周第一个周一是几号

                    next = (now.y-1)+'/'+'12/'+firstMonDay;
                }


            }
            // 后一年
            else if(now.m+n>12){

                var next = (now.y+1)+'/'+'01/01'

                if (state.dateType === 'week') {
                    // ['周日', '周一', '周二', '周三', '周四', '周五', '周六'] 周日为0
                    let firstDayWeek = new Date(next).getDay(), // 每月1号周几
                        firstMonDay = firstDayWeek === 0 ? 2 : 2 + (7 - firstDayWeek); // 每周第一个周一是几号

                    next = (now.y + 1) + '/' + '01/' + firstMonDay;
                }
            }
            //
            else{

                var next = now.y+'/'+(now.m+n)+'/01'

                if (state.dateType === 'week') {
                    // ['周日', '周一', '周二', '周三', '周四', '周五', '周六'] 周日为0
                    let firstDayWeek = new Date(next).getDay(), // 每月1号周几
                        firstMonDay = firstDayWeek === 0 ? 2 : 2 + (7 - firstDayWeek); // 每周第一个周一是几号

                    next = now.y + '/' + (now.m + n) + '/' + firstMonDay;
                }

            }

            // 如果==0，则回到今日
            if(n==0){
                actions.initDateSelectList();
                actions.setStartDate(state.dateStart);
            }else{
                actions.initDateSelectList(next);
                actions.setStartDate(next);
            }

            // console.log(next,state.dateStart)


        },

        // 切换起始日期 >> 初始化时间表 >> 初始化排班数据
        setStartDate(date){

            // 设置起始时间
            mutations.SetStartTime(date);

            // 初始化排班时间表
            actions.initWorkTime();

            // 初始化排班数据
            actions.initWorkData();

        },
        // 设置当前24小时排班所属的日期，在24小时载入时设置
        setDaySelectedData(data){
            mutations.SetDaySelectedData(data);
            mutations.SetStartTime(data.daySelected);
        },

        // 初始化时间表
        initWorkTime(){

            // 判断排班格式，按月，按周 ,设置时间表长度
            if(state.dateType=='month'){
                var n = Tool.iDate(state.dateStart).lastDay-0;
                mutations.SetDateLength(n)
            }
            else if(state.dateType == 'week'){
                mutations.SetDateLength(7)
            }

            // 初始化时间表
            if(state.type=='week'){
                actions.initWorkTimeDays();
            }else{
                actions.initWorkTimeHours();
            }

        },

        // 初始化排班数据 >> 加载排班审核状态信息
        initWorkData(){

            console.error('initWorkData')

            // state.SetPersons([]);

            if(state.vueEl){
                state.vueEl.tableLoading = true;
            }

            let list = [actions.initWorkClass];

            if(state.type=='week'){

                // 选择了门店或者部门后才能加载
                if(!!state.storeID || !!state.deptID){
                    list = list.concat([actions.initPersons,actions.initWorkDataOfDays,actions.getLeaveInfo,actions.getBustripInfo,actions.getTransferInfo]);
                }

            }else{

                // 如果不是周排班跳转日排班，而是直接刷新日排班页面，则需要加载周排班数据，需要使用每天的worktime数据
                if(!state.routeFromWeek){
                    list = list.concat([actions.initPersons,actions.initWorkDayForHour]);
                }

                list.push(actions.initWorkDataOfHours);
            }


            actions.asyncLoader(list,function(){

                if(state.type=='week'){
                    actions.formatWorkDataOfDays(state.cachedWorkDay);
                }else{

                    // 如果不是周排班跳转日排班，而是直接刷新日排班页面，则需要加载周排班数据，需要使用每天的worktime数据
                    if(!state.routeFromWeek){

                        actions.setRouteFromWeek(true)
                        actions.formatWorkDataOfDays(state.cachedWorkDay,true);
                    }

                    console.error(state.cachedWorkHour)

                    actions.formatWorkDataOfHours(state.cachedWorkHour);
                }

                if(state.vueEl && state.vueEl.refreshTable){

                    Vue.nextTick(function(){
                        state.vueEl.refreshTable();
                    })

                }

            })();

        },

        // 获取排班内请假信息
        getLeaveInfo(callback){
            var startDate = Tool.iDate(state.dateStart,'yymmdd');
            var endDate = Tool.iDate(state.dateStart,'yymmdd',state.dateLength-1);



            var data = {
                deptID:'',
                storeID:'',
                startDate:startDate.string,
                endDate:endDate.string
            }

            if(state.orgType=='department'){
                data.deptID = state.deptID;
            }
            else if( state.orgType=='store'){
                data.storeID = state.storeID;
                data.group = state.orgGroupID;
            }


            Tool.ajax({
                url: 'api.schedule.getLeaveInfo',
                data: data,
                method: 'POST',
                success(data, res) {

                    mutations.SetLeaveInfo(data);
                    callback();

                },
                error(res) {
                    callback();
                }
            });
        },

        // 获取排班内出差信息
        getBustripInfo(callback){
            var startDate = Tool.iDate(state.dateStart,'yymmdd');
            var endDate = Tool.iDate(state.dateStart,'yymmdd',state.dateLength-1);

            var data = {
                deptID:'',
                storeID:'',
                startDate:startDate.string,
                endDate:endDate.string
            }

            if(state.orgType=='department'){
                data.deptID = state.deptID;
            }
            else if( state.orgType=='store'){
                data.storeID = state.storeID;
                data.group = state.orgGroupID;
            }


            Tool.ajax({
                url: 'api.schedule.getBustripInfo',
                data: data,
                method: 'POST',
                success(data, res) {

                    mutations.SetBustripInfo(data);
                    callback();

                },
                error(res) {
                    callback();
                }
            });
        },

        // 获取排班内调拨信息
        getTransferInfo(callback){
            var startDate = Tool.iDate(state.dateStart,'yymmdd');
            var endDate = Tool.iDate(state.dateStart,'yymmdd',state.dateLength-1);
            var endDateTime = Tool.iDate(state.dateStart,'yy-mm-dd hh:mm:ss',state.dateLength-1);

            var data = {
                deptID:'',
                storeID:'',
                startDate:startDate.string,
                endDate:endDate.string
            }

            if(state.orgType=='department'){
                data.deptID = state.deptID;
            }
            else if( state.orgType=='store'){
                data.storeID = state.storeID;
                data.group = state.orgGroupID;
            }


            Tool.ajax({
                url: 'api.schedule.getTransferInfo',
                data: data,
                method: 'POST',
                success(data, res) {

                    mutations.SetTransferInfo(data,endDateTime);
                    callback();

                },
                error(res) {
                    callback();
                }
            });
        },


        // 加载排班审核状态信息 >>
        getScheduleStatus() {

            var startDate = Tool.iDate(state.dateStart,'yymmdd');
            var endDate = Tool.iDate(state.dateStart,'yymmdd',state.dateLength);

            var data = {
                orgID:'',
                orgType:state.orgType=='department' ?'dept':state.orgType,
                startTime:startDate.string,
                endTime:endDate.string,
            }

            if(state.orgType=='department'){
                data.orgID = state.deptID;
            }
            else if( state.orgType=='store'){
                data.orgID = state.storeID;
                data.group = state.orgGroupID;
            }

            Tool.ajax({
                url: 'api.schedule.getScheduleStatus',
                data: data,
                method: 'POST',
                success(data, res) {

                    mutations.SetScheduleStatus(data.type);

                },
                error(res) {

                }
            });


        },

        // 提交审核
        submitSechedule(){

            var startDate = Tool.iDate(state.dateStart,'yymmdd');
            var endDate = Tool.iDate(state.dateStart,'yymmdd',state.dateLength);

            var data = {
                orgID:'',
                orgType:state.orgType=='department' ?'dept':state.orgType,
                startTime:startDate.string,
                endTime:endDate.string,
            }

            if(state.orgType=='department'){
                data.orgID = state.deptID;
            }
            else if( state.orgType=='store'){
                data.orgID = state.storeID;
                data.group = state.orgGroupID;
            }

            Tool.ajax({
                url:'api.schedule.putScheduleStatus',
                data:data,
                success(data,res){

                    Vue.tool.showTip({
                        type:'success',
                        msg:'已提交审核'
                    })

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

        // 加载 预估人数
        initRequiredNumber(type){

            var startDate = Tool.iDate(state.dateStart,'yymmdd');

            if(type=='week'){

                var endDate = Tool.iDate(state.dateStart,'yymmdd',state.dateLength);

                var url = 'api.schedule.getRuquireNubmersDays';

                var data = {
                    startDate:startDate.time,
                    endDate:endDate.time
                }
            }

            else if(type=='day'){

                var url = 'api.schedule.getRuquireNubmersHours';
                var data = {
                    date:startDate.time
                }
            }

            data.orgType = state.orgType == 'department' ? 'dept' : state.orgType;

            if(state.orgType=='department'){
                data.orgID = state.deptID;
            }
            else if( state.orgType=='store'){
                data.orgID = state.storeID;
            }


            // 加载数据
            Tool.ajax({
                url:url,
                data:data,
                success(data,res){

                    ///console.log(data)

                    mutations.SetRequireNumber(type,data);

                },
                error(res){
                    ///console.log(res)
                }
            })

        },

        // 周排班 排班时间表 初始化（天）
        initWorkTimeDays(){

            var days = [];

            for(var i=0;i<state.dateLength;i++){

                // 周排班

                var timeNow = Tool.iDate(state.dateStart,'yymmdd',i);

                var item = {
                    userID:'',
                    date:timeNow.string,
                    week:timeNow.w,
                    time:timeNow.time,
                    actualNumber:0
                }

                days.push(item);

            }

            // 周期前多添加一天，用于跨月，跨周
            var prev = Tool.iDate(state.dateStart,'yymmdd',-1);
            var prevItem = {
                userID:'',
                date:prev.string,
                week:prev.w,
                time:prev.time,
                actualNumber:0
            }
            days.push(prevItem);


            var next = Tool.iDate(state.dateStart,'yymmdd',state.dateLength);
            var nextItem = {
                userID:'',
                date:next.string,
                week:next.w,
                time:next.time,
                actualNumber:0
            }
            days.push(nextItem);

            mutations.SetWorkDays(days);

        },

        // 周排班 排班数据 加载 >> 格式化数据
        initWorkDataOfDays(callback){

            var startDate = Tool.iDate(state.dateStart,'yymmdd',-1);
            var endDate = Tool.iDate(state.dateStart,'yymmdd',state.dateLength);

            //
            var data = {
                deptID:'',
                storeID:'',
                startDate:startDate.string,
                endDate:endDate.string,
                userName:state.userName
            }

            if(state.orgType=='department'){
                data.deptID = state.deptID;
            }
            else if( state.orgType=='store'){
                data.storeID = state.storeID;
                data.group = state.orgGroupID;
            }

            // 加载数据
            Tool.ajax({
                url:'api.schedule.getScheduleDays',
                data:data,
                success(data,res){
                    state.cachedWorkDay = data;
                    if(callback) callback();
                },
                error(res){
                    if(callback) callback();
                }
            })

        },

        // 周排班 整理排班表数据格式，确保数据完整性, key格式 user[userID]_date[time]
        /**
         * 周排班数据整理
         * @param  {Object} workTable      周排班时间表
         * @param  {Boolean} onlyHour      是否是刷新24小时排班时加载对应日的周排班数据，24小时排班时用到
         * @param  {Boolean} formatManager 是否为管理组周排班数据整理格式，24小时排班时用到
         * @return {[type]}               [description]
         */
         formatWorkDataOfDays(workTable,onlyHour,formatManager){

             console.error('formatWorkDataOfDays')

             workTable = workTable || {};

             var _data = {};

             // 循环人员表
             let timeLen = state.workTimeDays.length

             //
             if(formatManager){
                 timeLen = 1;
             }else{
                 mutations.ClearExportWorkClass('day');
             }


             let workDayByRow = [];

             for(var i=0,len=state.persons.length;i<len;i++){

                 var people = state.persons[i];

                 let workDayCellPeople = Object.assign({},people);

                 workDayByRow.push(workDayCellPeople);

                 // 循环时间表
                 for(var j=0;j<timeLen;j++){

                     var workDay = state.workTimeDays[j];

                     var id = 'user' + people.userID + '_date' + workDay.time;


                     // 如果不存在该人员某天排版数据，则自动生成空数据
                     if(!workTable[id]){

                         // 初始化排班数据
                         _data[id] = {
                             date: workDay.time, // 日期用时间戳表示
                             workTimeType: '',
                             workTime: '',
                         }

                         // 空数据
                         _data[id]['dataStatus'] = 'new';

                     }else{
                         // 复制排班数据
                         _data[id] = {};
                         for( let x in workTable[id]){
                             _data[id][x] = workTable[id][x];
                         }

                         // 获取到的数据
                         _data[id]['dataStatus'] = 'old';


                     }

                     _data[id] = actions.formatWorkDataOfDaysItem(_data[id]);

                     // 操作 add/update/delete
                     _data[id]['ctrlType'] = '';

                     // 日期用时间戳表示
                     _data[id]['date'] = workDay.time;
                     _data[id]['dateString'] = workDay.date;

                     // 复制人员数据
                     for( let x in people){
                         _data[id][x] = people[x];
                     }

                     // 判定当前单元格是否可编辑

                     var startDay = Tool.iDate(state.dateStart,'',j);
                     var today = Tool.iDate(Tool.iDate(state.serverDate).string);





                     // 在今天之前，则不能编辑
                     if(startDay.time<=today.time-0){
                         _data[id]['editable'] = 'disable'
                     }
                     // 请假时 则 dayOff
                     else if(_data[id].workTimeType-0==3){

                         _data[id]['editable'] = 'dayOff'

                     }else{

                         // console.log(people.userName,'date',Vue.Tool.iDate(workDay.time).string)
                         _data[id]['editable'] = 'able'


                         // 借调中不能排班
                         // 本部门的人，从本部门借调走  本部门不可排班
                         // 其他部门的人，从其他部门借调来 本部门可排班
                         let transferInfo = state.transferInfo[id];

                         let currentOrgID = ''; // 当前组织ID

                         let transferInfoCurrent = transferInfo ? transferInfo[0] || {} : {};
                         let isTransfer = transferInfo && transferInfo.length>0;
                         let isToCurrentOrg; // 是否异动到当前组织


                         if(people.userID===2692){
                             console.log(startDay.string,transferInfoCurrent,isTransfer)
                         }

                         // 判断是否异动到当前组织
                         if(state.orgType=='department'){
                             isToCurrentOrg = transferInfoCurrent.toDeptID == state.deptID;
                         }
                         else if( state.orgType=='store'){
                             isToCurrentOrg = transferInfoCurrent.toStoreID == state.storeID;
                         }


                         // 本部门员工
                         if(people.isTransferwork===0){

                             // 默认可排班
                             _data[id]['editable'] = 'able';

                             // 借调，借调到其他部门，借调期内不能排班
                             if(transferInfoCurrent.typeName==='借调' && isTransfer ){
                                 if(!isToCurrentOrg){
                                     _data[id]['editable'] = 'disable';
                                     _data[id]['disableText'] = '本部门人员，借调至其他部门'
                                 }
                             }
                             // 调动，调动到其他部门，借调期内不能排班
                             else if(transferInfoCurrent.typeName==='调动' && isTransfer ){
                                 if(!isToCurrentOrg){
                                     _data[id]['editable'] = 'disable';
                                     _data[id]['disableText'] = '本部门人员，调动至其他部门'
                                 }
                             }
                             // 升迁，降职到其他部门，借调期内不能排班
                             else if(transferInfoCurrent.typeName==='升迁'||transferInfoCurrent.typeName==='降职'){
                                 if(isTransfer && !isToCurrentOrg){
                                     _data[id]['editable'] = 'disable';
                                     _data[id]['disableText'] = '本部门人员，异动（升迁或降职）至其他部门'
                                 }
                             }
                             // 升迁，降职到本部门，不受影响

                         }
                         // 其他部门员工
                         else{

                             // 默认可排班
                             _data[id]['editable'] = 'disable';

                             if(isTransfer){
                                 _data[id]['editable'] = 'able';
                                 // // 借调，借调到本部门，借调期内才能排班
                                 // if(transferInfoCurrent.typeName==='借调'){
                                 // }
                                 // // 调动，调动到本部门，借调期内才能排班
                                 // if(transferInfoCurrent.typeName==='调动'){
                                 // }
                                 // // 升迁，降职到本部门，借调期内才能排班
                                 // if(transferInfoCurrent.typeName==='升迁'||transferInfoCurrent.typeName==='降职'){
                                 // }
                             }
                             else{
                                 _data[id]['editable'] = 'disable';
                                 _data[id]['disableText'] = '其他部门人员，不在异动生效时间内'
                             }

                         }


                         // // 借调来的员工
                         // if(people.isTransferwork===1){
                         //
                         //     // 借调日期内
                         //     if(transferInfo && transferInfo.length>0 /*&& transferInfo[0].deptID!=transferInfo[0].toDeptID */){
                         //         console.info(transferInfo)
                         //         _data[id]['editable'] = 'able';
                         //     }
                         //     else{
                         //         console.error('借调人员，已调回原部门',people.userName,Vue.Tool.iDate(workDay.time).string);
                         //         _data[id]['editable'] = 'disable';
                         //         _data[id]['disableText'] = '借调人员，已调回原部门'
                         //     }
                         // }
                         // // 本部门员工
                         // else{
                         //     // 有异动记录
                         //     if(transferInfo && transferInfo.length>0 /*&& transferInfo[0].deptID!=transferInfo[0].toDeptID */){
                         //
                         //
                         //         // TODO:目前只会有一条与当前组织有关系的异动记录，未来可能会加上调动记录，那就有多条了，需要根据组织id判断是否与本部门有关系
                         //         transferInfo.forEach(info=>{
                         //             // 本部门员工借调走的
                         //             if(info.typeName==='借调'){
                         //                 _data[id]['editable'] = 'disable';
                         //                 _data[id]['disableText'] = '本部门人员，其他部门借调中'
                         //             }
                         //             // 调动来的员工，升迁降职的员工
                         //             else{
                         //                 _data[id]['editable'] = 'able';
                         //             }
                         //         })
                         //
                         //     }
                         //     //
                         //     else{
                         //         _data[id]['editable'] = 'able';
                         //     }
                         //
                         // }

                     }

                     // 离职后不能排班
                     if(people.userState==='离职'){
                         _data[id]['editable'] = 'disable';
                         _data[id]['disableText'] = '该员工已经离职，不能排班'
                     }
                     // 退休后不能排班
                     else if(people.userState==='退休'){
                         _data[id]['editable'] = 'disable';
                         _data[id]['disableText'] = '该员工已经退休，不能排班'
                     }



                     // 请假信息
                     _data[id]['holiday'] = state.leaveInfo[id];
                     // 出差信息
                     _data[id]['busTrip'] = state.bstripInfo[id];
                     // 借调
                     _data[id]['transfer'] = state.transferInfo[id];



                     // console.log(`_data[id]['holiday']`,_data[id]['holiday'])


                 }

             }


             // if(formatManager){
             //     mutations.SetWorkDataManagers(_data);
             //     actions.formatWorkDataOfDaysMore('manager');
             //     return;
             // }else{
                 mutations.SetWorkDataDays(_data,workDayByRow);
             // }


             // 生成附加数据

             // 如果直接进入日排班则立即加载附加数据
             if(onlyHour){
                 for(var id in state.workDataDays){
                     actions.formatWorkDataOfDaysMore(id);
                 }
             }
             // 否则延迟加载
             else {
                 Vue.nextTick(function(){
                     setTimeout(function(){

                         for(var id in state.workDataDays){
                             actions.formatWorkDataOfDaysMore(id);
                         }

                     },500)
                 })
             }

         },

        /**
         * 格式化周排班数据/条 添加 班次样式，班次class，班次名称
         * @param  {object} data 一条周排班数据，必须包含{workTimeType}
         * @return {object}      return {workStyle,workClass,workName}
         */
        formatWorkDataOfDaysItem(data){

            /* 班次样式,班次名称 */
            data.workName =  '';
            // data.workTimeStr = '';
            data.workNameHtml =  '';
            data.workStyle =  {color:'',bgcolor:''};
            data.workClass =  '';

            // 固定班次，休息班次
            if(data.workTimeType-0==1 || data.workTimeType-0==4){

                var _workClass = store.actions.getWorkClassByID(data.workTime);

                if(_workClass){
                    data.workClass = '';
                    data.workStyle = {color:_workClass.fontcolor,bgcolor:_workClass.bgcolor};//  'background:'+_workClass.bgcolor+';color:'+_workClass.fontcolor+';';
                    data.workName =  _workClass.name;
                    // data.workTimeStr = _workClass.time.join('-')


                    let workTimes = '';
                    _workClass.time.forEach(function(time,i){
                        workTimes+=time.replace('/','-')+'/'
                    })
                    data.workName =  _workClass.time.join('</br>');

                    data.workNameHtml=_workClass.name;
                    if(data.workTimeType-0==1){
                        data.workNameHtml+='<div class="tooltip bottom" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner">'+_workClass.time.join('<br/>')+'</div></div>'
                    }


                }else{
                    // data.workStyle =  '';
                }

                mutations.SetExportWorkClass('day', data.workTime)

            }
            // 自定义班次
            else if(data.workTimeType-0==2){
                data.workClass =  'workCustom';

                if(typeof(data.workTime)=='string' && data.workTime.indexOf('[')==0){
                    data.workTime = JSON.parse(data.workTime);
                }

                if(typeof(data.workTime)!='object'){

                }else{

                    let workTimes = '';
                    data.workTime.forEach(function(time,i){
                        workTimes+=time.replace('/','-')+'/'
                    })
                    data.workName =  data.workTime.join('</br>');

                    data.workNameHtml='<i class="material-icons">error_outline</i>'+workTimes.substring(0,10)+'...';
                    data.workNameHtml+='<div class="tooltip bottom" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner">'+data.workTime.join('<br/>')+'</div></div>'

                }

            }
            // 请假
            else if(data.workTimeType-0==3){
                data.workClass =  'workLeave';
                data.workName =  '休息';
            }
            // 超出当月排班范围
            else if(data.editable=='timeout'){
                data.workClass =  'workTimeout'
            }

            return data;
        },

        /**
         * 生成周排班附加数据    workTimeArray,workTimeNumber
         * @param  {string} type 类型 type:manager
         * @return {[type]}      [description]
         */
        formatWorkDataOfDaysMore(id){

            console.log('正在生成附加数据')

            // let workDataDaysMore = {};

            // let _data = type=='manager' ? state.workDataManagers : state.workDataDays;



            // for(var id in _data){

                let data = state.workDataDays[id];

                let dataMore = {};

                // 班次时间
                if(data.workTimeType-0==1 || data.workTimeType-0==4){

                    var _workClass = store.actions.getWorkClassByID(data.workTime);

                    if(_workClass){
                        // 获取班次时间及班次时间数字
                        dataMore.workTimeArray = _workClass.time;
                        dataMore.workTimeNumber = [];

                        // 将班次时间格式化为  201606061200(日期+时间) ，用来判断跨日排班
                        _workClass.timeNumber.forEach(function(t){

                            // 判断是否跨天 开始时间大于结束时间，且结束时间不为0，则为跨天
                            if(t[0]-0>=t[1]-0 && t[1]-0>0){

                                // 跨班放在当天，则结束时间为跨天
                                if (state.showOverDay && state.config.overDay - 0 == 1) {
                                    var overDay = Tool.iDate(data.date, 'yymmdd', 1);
                                    // console.warn(overDay.string)
                                    dataMore.workTimeNumber.push([data.dateString+t[0],overDay.string+t[1]])
                                }
                                // 跨版放在明天，则开始时间为跨天
                                else if (state.showOverDay && state.config.overDay - 0 == 2) {
                                    var overDay = Tool.iDate(data.date, 'yymmdd', -1);
                                    dataMore.workTimeNumber.push([overDay.string+t[0],data.dateString+t[1]])
                                }

                            }else{
                                dataMore.workTimeNumber.push([data.dateString+t[0],data.dateString+t[1]])
                            }

                        })
                    }else{
                        dataMore.workTimeArray = [];
                        dataMore.workTimeNumber = [];
                    }

                }
                // 自定义班次
                else if(data.workTimeType-0==2){

                    // 获取自定义班次时间
                    dataMore.workTimeArray = data.workTime;

                    // console.log(data.workTime)

                    // 将自定义班次时间转化为数字
                    dataMore.workTimeNumber = [];
                    dataMore.workTimeArray.forEach(function(t){
                        let _array = t.replace(/:/ig,'').split('/');

                        // 将班次时间格式化为  201606061200(日期+时间) ，用来判断跨日排班


                        // 判断是否跨天 开始时间大于结束时间，且结束时间不为0，则为跨天
                        if(_array[0]-0>=_array[1]-0 && _array[1]-0>0){

                            // console.log(state.showOverDay,state.config.overDay)

                            // 跨班放在当天，则结束时间为跨天
                            if (state.showOverDay && state.config.overDay - 0 == 1) {
                                var overDay = Tool.iDate(data.date, 'yymmdd', 1);
                                dataMore.workTimeNumber.push([data.dateString+_array[0],overDay.string+_array[1]])
                                // console.log(dataMore.workTimeNumber)
                            }
                            // 跨版放在明天，则开始时间为跨天
                            else if (state.showOverDay && state.config.overDay - 0 == 2) {
                                var overDay = Tool.iDate(data.date, 'yymmdd', -1);
                                dataMore.workTimeNumber.push([overDay.string+_array[0],data.dateString+_array[1]])
                            }

                        }else{
                            dataMore.workTimeNumber.push([data.dateString+_array[0],data.dateString+_array[1]])
                        }


                    })

                }
                // 请假
                else{
                    dataMore.workTimeArray = [];
                    dataMore.workTimeNumber = [];
                }

                // console.log(dataMore.workTimeNumber)

                // workDataDaysMore[id]=dataMore;

                // 如果是管理组数据，则进行合并
                // if(type=='manager'){
                //     Object.assign(_data[id],dataMore);
                // }

            // }


            // if(type=='manager'){
            //     mutations.SetWorkDataManagers(_data);
            // }
            // else{
                mutations.SetWorkDataDaysMore(dataMore,id);
            // }

        },

        // 检测是否能添加班次，主要排除前后2天时间段重叠的情况
        canSetWorkClass(workClassData,id){


            // return true;
            console.log('检测是否能添加班次，主要排除前后2天时间段重叠的情况')

            // 获取昨天排班数据


            let uid = id.split('_date')[0];
            let todaytime = id.split('_date')[1]-0;
            let today = Tool.iDate(todaytime,'yymmdd').string;
            let startDayTime = today+'0000'

            let workClassToday = [];


            if(workClassData.workTimeType==1){

                let _data = store.actions.getWorkClassByID(workClassData.workTime).timeNumber;

                _data.forEach(function(item) {

                    workClassToday.push([item[0],item[1]])

                })


            }else if(workClassData.workTimeType==2){
                workClassToday = store.mutations.FormatWorkClass({time:workClassData.workTime}).timeNumber;


            }else{
                return true;
            }

            workClassToday.forEach(function(item){

                // console.log(item)

                // 跨天
                if(item[0]-0>item[1]-0){
                    item[0] = today+item[0];
                    item[1] = Tool.iDate(todaytime,'yymmdd',1).string+item[1];
                }else{
                    item[0] = today+item[0];
                    item[1] = today+item[1];
                }


            })
            // console.log(workClassToday)


            let widPrev = uid + '_date' + Tool.iDate(todaytime,'yymmdd',-1).time;
            let workDataOfDayPrev = state.workDataDays[widPrev];
            let workDataOfDayMorePrev = state.workDataDaysMore[widPrev];

            actions.formatWorkDataOfDaysMore(widPrev);

            // 获取明天排班数据
            let widNext = uid + '_date' + Tool.iDate(todaytime,'yymmdd',1).time;
            let workDataOfDayNext = state.workDataDays[widNext];
            let workDataOfDayMoreNext = state.workDataDaysMore[widNext];

            actions.formatWorkDataOfDaysMore(widPrev);

            // console.log(widPrev,workDataOfDayMorePrev,widNext,workDataOfDayMoreNext)

            let canotPrev = 0;
            let canotNext = 0;


            workClassToday.forEach(function(workHour){


                // 检测班次是否与上一天跨天班次时间冲突
                if(workDataOfDayMorePrev){
                    // console.log(workDataOfDayMorePrev.workTimeNumber)
                    workDataOfDayMorePrev.workTimeNumber.forEach(function(wclassHour, t) {


                        // 开始时间小于今天00:00,结束时间大于今天00:00
                        if(wclassHour[0]-0<startDayTime-0&& wclassHour[1]-0>startDayTime-0){

                            // 如果当前班次开始时间小于前天班次结束时间，则重合
                            if (workHour[0] - 0 < wclassHour[1] - 0) {

                                canotPrev++;
                            }
                        }

                    })
                }


                // 检测下一天的班次，显示次日00:00-12:00的班次，开始时间大于今天2400,小于次日1200
                if(workDataOfDayMoreNext){
                    // console.log(workDataOfDayMoreNext.workTimeNumber)
                    workDataOfDayMoreNext.workTimeNumber.forEach(function(wclassHour, t) {

                        // 当前班次结束时间大于次日班次开始时间，则重合
                        if (workHour[1] - 0 > wclassHour[0] - 0) {

                            canotNext++;
                        }


                    })
                }

            })


            // console.error(canotPrev,canotNext)

            if (canotPrev > 0 && canotNext>0) {
                Vue.tool.showTip({
                    type: 'error',
                    msg: '所选班次时间与前后两天班次时间有冲突'
                })
            }
            else if (canotPrev > 0 && canotNext==0) {
                Vue.tool.showTip({
                    type: 'error',
                    msg: '所选班次时间与前一天班次时间有冲突'
                })
            }
            else if (canotPrev == 0 && canotNext>0) {
                Vue.tool.showTip({
                    type: 'error',
                    msg: '所选班次时间与后一天班次时间有冲突'
                })
            }



            return (canotPrev > 0 || canotNext>0) ? false : true;


        },


        /**
         * 周排班 添加、删除，修改 一条排班数据
         * @param  {String} type 操作类型：add,update,delete
         * @param  {Object} data 班次数据，{workTimeType,workTime}
         * @param  {String} id   数据id
         * @return {[type]}      [description]
         */
        editWorkDataDaysByID(type,data,id){

            console.log(actions.canSetWorkClass(data,id))

            if((type=='add' || type=='update') && !actions.canSetWorkClass(data,id)) return;

            data = actions.formatWorkDataOfDaysItem(data);

            mutations.EidtWorkDataByID('week',type,data,id);

            // 更新周排班数据的附加数据
            actions.formatWorkDataOfDaysMore(id);

        },

        /**
         * 加载管理组排班数据，用于简单展示
         * @return {[type]} [description]
         */
        getManagerWorkData(){
            var daySelected = Tool.iDate(state.daySelected,'yymmdd');

            var data = {
                deptID:'',
                storeID:state.storeID,
                group:'1',
                startTimeStr:daySelected.time,
                endTimeStr:Tool.iDate(state.daySelected,'yymmdd',1).time,
                userName:state.userName
            }
            // 加载数据

            console.warn('加载管理组排班数据')

            Tool.ajax({
                url:'api.schedule.getScheduleDays',
                data:data,
                success(data,res){
                    console.warn(data)
                    actions.formatWorkDataOfDays(data,false,true);
                },
                error(res){
                    ///console.log(res)
                }
            })

        },

        /**
         * 根据id获取相应的排班数据
         * @param  {string} id        id
         * @param  {object} emptyData 包含所需数据字段列表的 {}
         * @return {[type]}           [description]
         */
        getWorkDataByID(id,emptyData){

            if(state.type=='week'){
                var source = state.workDataDays;
            }
            else if(state.type=='day'){
                var source = state.workDataHours;
            }

            let data = {};

            for(let key in emptyData){
                data[key] = source[id][key];
            }

            // /////console.log(data)

            return data;

        },


        // 周排班 —— 提交全部排班数据 增加、修改、删除
        submitWorkDataOfDays(){

            var dataAdd = [], updateData = [], deleteData=[];

            // dataStatus 数据初始化状态
            // ctrlType   数据最后的操作状态

            var alldata = {
                orgID:'',
                orgType:state.orgType=='department' ?'dept':state.orgType,
                list:''
            }

            if(state.orgType=='department'){
                alldata.orgID = state.deptID;
                alldata.group = state.orgGroupID;
            }
            else if( state.orgType=='store'){
                alldata.orgID = state.storeID;
                alldata.group = state.orgGroupID;
            }

            var emptyData = {
                ID:'',
                deptID:'',
                storeID:'',
                userID:'',
                workTimeType:'',
                workTime:'',
                date:'',
                day:''
            }

            // 开始筛选数据
            for(let i in state.workDataDays){

                var item = state.workDataDays[i];


                // 新增
                if(item.dataStatus=='new' && (item.ctrlType=='add' || item.ctrlType=='update') && item.workTimeType!='' && item.workTime!=''){

                    var data = {};
                    for(let i in emptyData){
                        data[i] = item[i]
                    }

                    data.day = item.date;

                    dataAdd.push(data);

                }
                // 更新
                else if(item.dataStatus=='old' && (item.ctrlType=='add' || item.ctrlType=='update') && item.workTimeType!='' && item.workTime!=''){
                    var data = {};
                    for(let i in emptyData){
                        data[i] = item[i]
                    }

                    data.day = item.date;

                    updateData.push(data);
                }
                // 删除
                else if(item.dataStatus=='old' && item.ctrlType=='delete'){

                    deleteData.push(item.ID);
                }

            }

            let list = [];

            // 新增接口
            if(dataAdd.length>0){

                list.push(function(callback){

                    let _data = Object.assign({},alldata);
                    _data.list = JSON.stringify(dataAdd);

                    Tool.ajax({
                        url:'api.schedule.putScheduleDays',
                        data:_data,
                        method:'POST',
                        success(data,res){

                            if(callback) callback();

                            Vue.tool.showTip({
                                show:true,
                                type:'success',
                                msg:'保存成功'
                            })

                        },
                        error(res){
                            if(callback) callback();
                            Vue.tool.showTip({
                                show:true,
                                type:'warning',
                                msg:res
                            })

                        }
                    });
                })
            }
            // 更新接口
            if(updateData.length>0){

                list.push(function(callback){

                    let _data = Object.assign({},alldata);
                    _data.list = JSON.stringify(updateData);

                    Tool.ajax({
                        url:'api.schedule.updateScheduleDays',
                        data:_data,
                        method:'POST',
                        success(data,res){

                            if(callback) callback();

                            Vue.tool.showTip({
                                show:true,
                                type:'success',
                                msg:'保存成功'
                            })
                        },
                        error(res){
                            if(callback) callback();
                            Vue.tool.showTip({
                                show:true,
                                type:'warning',
                                msg:res
                            })

                        }
                    });
                })



            }
            // 删除接口
            if(deleteData.length>0){
                list.push(function(callback){

                    alldata.IDs = JSON.stringify(deleteData);
                    Tool.ajax({
                        url:'api.schedule.deleteScheduleDays',
                        data:alldata,
                        method:'POST',
                        success(data,res){

                            if(callback) callback();

                            Vue.tool.showTip({
                                show:true,
                                type:'success',
                                msg:'保存成功'
                            })
                        },
                        error(res){
                            if(callback) callback();
                            Vue.tool.showTip({
                                show:true,
                                type:'warning',
                                msg:res
                            })

                        }
                    });
                })
            }

            if(list.length==0) return;

            actions.asyncLoader(list,function(){

                actions.asyncLoader([actions.initWorkDataOfDays],function(){
                    // actions.initWorkData();

                    actions.initPersons(()=>{
                        actions.formatWorkDataOfDays(state.cachedWorkDay)
                    })

                })();

            })();

        },

        /**在日排班中给人员添加排班数据
         * [addWorkClassInHour description]
         * @param {string} userID 人员id
         * @param {object} data   {workTime,workTimeType}
         */
        addWorkClassInHour(userID,data){

            let daySelected = Tool.iDate(state.daySelected,'yymmdd');
            let wid = 'user' + userID + '_date' + daySelected.time;

            // 判断当前排班是否跟前后排班冲突

            if(!actions.canSetWorkClass(data,wid)) return;


            // 向周排班对应的日期添加新班次数据
            actions.editWorkDataDaysByID('add',data,wid);

            // 格式化日排班数据，
            actions.formatWorkDataOfHours(state.workDataHours);

            // 删除某人该天store中缓存的任务，数据库中的任务会在提交的时候自动清空
            actions.removeWorkSkillToday(userID);

            state.toUpdateDay = true;

        },

        // 删除某人该天store中缓存的任务，数据库中的任务会在提交日排版的时候清空
        removeWorkSkillToday(userID){

            for(let i=0;i<state.hourLength;i++){

                if(!state.workTimeHours[i]) return '';

                console.log(i)

                let id = 'user'+userID+'_time'+state.workTimeHours[i].hour+'_date'+state.workTimeHours[i].time;

                actions.editWorkSkillsByID('delete',{
                    skillID:''
                },id)

            }

        },


        // 日排班 排班时间表 初始化（小时）
        initWorkTimeHours() {

            let date = state.daySelected;

            let hours = [];

            if (state.type == 'day') {

                let today = Tool.iDate(state.daySelected, 'yymmdd');
                let overDay = today;

                if (state.config.overDay - 0 == 1) {
                    overDay = Tool.iDate(state.daySelected, 'yymmdd', 1);
                }
                else if (state.config.overDay - 0 == 2) {
                    overDay = Tool.iDate(state.daySelected, 'yymmdd', -1);
                    // console.log(state.daySelected,overDay.string)
                }

                for (let i = 0; i < state.hourLength; i++) {

                    let index = i;

                    let item = {
                        userID: '',
                        date: today.string,
                        time: today.time,
                        hour: '',
                        hour_s:'',
                        hour_e:'',
                        actualNumber: 0,
                        startTime: '',
                        endTime: '',
                        skillID: ''
                    }

                    // 日排班

                    // 判断跨天排班状态
                    // 1:今天，属于今天则把跨天排班放在今天排班的后面，增加12小时
                    if (state.showOverDay && state.config.overDay - 0 == 1) {

                        if(i>=48){
                            item.date = overDay.string;
                            item.time = overDay.time;
                        }
                        index = index >= 48 ? index - 48 : index;

                    }
                    // 2:明天，属于明天则把跨天排班放在今天排班的前面，增加12小时
                    else if (state.showOverDay && state.config.overDay - 0 == 2) {

                        if(i<24){
                            item.date = overDay.string;
                            item.time = overDay.time;
                        }

                        index = index < 24 ? index + 24 : index - 24;

                    }

                    let sh = Math.floor(index / 2) < 10 ? '0' + Math.floor(index / 2) : Math.floor(index / 2);
                    let eh = Math.floor((index + 1) / 2) < 10 ? '0' + Math.floor((index + 1) / 2) : Math.floor((index + 1) / 2);
                    let shour = index % 2 == 0 ? (sh + '00') : (sh + '30');
                    let ehour = (index + 1) % 2 == 0 ? (eh + '00') : (eh + '30');


                    item.hour = shour+'_'+ehour;
                    item.hour_s = shour;
                    item.hour_e = ehour;
                    item.time_s = item.date+shour;
                    item.time_e = item.date+ehour;

                    // console.log(item.hour_s)

                    hours.push(item);

                }

                mutations.SetWorkHours(hours.concat([]));


            }

        },


        // 为日排班加载周排版数据
        initWorkDayForHour(callback){

            var daySelected = Tool.iDate(state.daySelected,'yymmdd');

            // 加载周排班数据，只加载选中的当天 copy from initWorkDataOfDays

            // var data = {
            //     deptID:'',
            //     storeID:'',
            //     startTimeStr:Tool.iDate(state.daySelected,'yymmdd',-1).time, // 提前一天，加载前一天的排班班次，解决跨天班次显示问题
            //     endTimeStr:Tool.iDate(state.daySelected,'yymmdd',2).time, // 推后一天，加载下一天的排班班次，解决跨天班次显示问题
            //     userName:state.userName
            // }


            var data = {
                deptID:'',
                storeID:'',
                startDate:Tool.iDate(state.daySelected,'yymmdd',-1).string, // 提前一天，加载前一天的排班班次，解决跨天班次显示问题
                endDate:Tool.iDate(state.daySelected,'yymmdd',2).string, // 推后一天，加载下一天的排班班次，解决跨天班次显示问题
                userName:state.userName
            }

            if(state.orgType=='department'){
                data.deptID = state.deptID;
            }
            else if( state.orgType=='store'){
                data.storeID = state.storeID;
                data.group = state.orgGroupID;
            }

            // 加载数据
            Tool.ajax({
                url:'api.schedule.getScheduleDays',
                data:data,
                success(data,res){
                    state.cachedWorkDay = data;

                    callback();
                },
                error(res){
                    callback();
                }
            })


        },

        // 日排班 排班数据 加载
        initWorkDataOfHours(callback){


            var daySelected = Tool.iDate(state.daySelected,'yymmdd');

            var data = {
                storeID:state.storeID,
                group:state.orgGroupID,
                date:daySelected.time,
                userName:state.userName
            }


            // 加载数据
            Tool.ajax({
                url:'api.schedule.getScheduleHours',
                data:data,
                success(data,res){

                    state.cachedWorkHour = data;
                    callback();
                },
                error(res){
                    callback();
                }
            })


        },


        // 日排班 整理排班表数据格式，确保数据完整性, key格式 user[userID]_date[time]
        formatWorkDataOfHours(workData){

            console.warn('formatWorkDataOfHours')

            mutations.ClearExportWorkClass('hour');

            workData = workData || {};
            let workTable = {};

            // 格式化数据，用来解决服务器端返回的数据ID没有_date+时间戳
            for (var ID in workData) {
                let item = workData[ID];
                if(ID.indexOf('_date')<0){
                    workTable[ID + '_date' + item.monthDate] = item;
                }else{
                    workTable[ID] = item;
                }
            }

            var _data = {};
            var startDay = Tool.iDate(state.daySelected,'yymmdd');
            var startDayTime = startDay.string+'0000'-0;
            var today = Tool.iDate(Tool.iDate(state.serverDate).string);

            // 循环人员表

            let workHourByRow = [];

            state.persons.forEach(function(people,i){


                workHourByRow.push(Object.assign({},people));

                // 获取某人该天班次数据
                var wid = 'user' + people.userID + '_date' + Tool.iDate(state.daySelected).time;
                var workDataOfDay = state.workDataDays[wid];
                // actions.formatWorkDataOfDaysMore(wid);
                var workDataOfDayMore = state.workDataDaysMore[wid];


                if(workDataOfDay.workTimeType==1 ||workDataOfDay.workTimeType==4){
                    mutations.SetExportWorkClass('hour',workDataOfDay.workTime)
                }

                // 获取昨天排班数据

                var widPrev = 'user' + people.userID + '_date' + Tool.iDate(state.daySelected,'yymmdd',-1).time;
                var workDataOfDayPrev = state.workDataDays[widPrev];
                // actions.formatWorkDataOfDaysMore(widPrev);


                var workDataOfDayMorePrev = state.workDataDaysMore[widPrev];


                // 获取明天排班数据
                var widNext = 'user' + people.userID + '_date' + Tool.iDate(state.daySelected,'yymmdd',1).time;
                var workDataOfDayNext = state.workDataDays[widNext];

                // actions.formatWorkDataOfDaysMore(widNext);


                var workDataOfDayMoreNext = state.workDataDaysMore[widNext];



                // 循环时间表
                state.workTimeHours.forEach(function(workHour,index) {

                    var id = 'user' + people.userID + '_time' + workHour.hour+'_date'+workHour.time;

                    // 如果不存在该人员某天排版数据，则自动生成空数据
                    if(!workTable[id]){

                        // 初始化空排班数据
                        _data[id] = {
                            startTimeStr: workHour.hour_s,
                            endTimeStr: workHour.hour_e,
                            skillID: '',
                            workTime:'',
                            workTimeType:'',
                            dataStatus:'new'
                        }

                    }else{

                        // 复制排班数据
                        _data[id] = {};
                        for (let x in workTable[id]) {
                            _data[id][x] = workTable[id][x];
                        }
                        // 获取到的数据
                        _data[id]['dataStatus'] =  _data[id]['dataStatus'] || 'old';

                    }

                    let hasHour = false;

                    // work style ,班次时间内，添加workstyle
                    _data[id].workStyle = {color:'',bgcolor:''};

                    // console.log(workDataOfDayMore.workTimeNumber)

                    workDataOfDayMore.workTimeNumber.forEach(function(wclassHour, t) {

                        // 判断格子是否在班次时间段内
                        if (workHour.time_s - 0 >= wclassHour[0] - 0 && workHour.time_e - 0 <= wclassHour[1] - 0) {

                            _data[id].editable = 'able';

                            _data[id].workTime = _data[id].workTime || workDataOfDay.workTime;
                            _data[id].workTimeType = _data[id].workTimeType ||  workDataOfDay.workTimeType;

                            _data[id].workStyle = workDataOfDay.workStyle;
                            _data[id].workClass = workDataOfDay.workClass;

                            hasHour = true;
                        }

                    })

                    // 检测前一天的跨班班次，显示00:00后的跨班班次，且设置为不可编辑
                    if(workDataOfDayMorePrev){
                        workDataOfDayMorePrev.workTimeNumber.forEach(function(wclassHour, t) {

                            // 开始时间小于今天00:00,结束时间大于今天00:00
                            if(wclassHour[0]-0<startDayTime&& wclassHour[1]-0>startDayTime){
                                if (workHour.time_e - 0 <= wclassHour[1] - 0) {
                                    _data[id].workStyle = workDataOfDayPrev.workStyle;
                                    _data[id].workClass = workDataOfDayPrev.workClass+' workOverDay';
                                    _data[id]['editable'] = 'disable';
                                    _data[id]['overDay'] = '[昨]'

                                    if(workDataOfDayPrev.workTimeType==1 ||workDataOfDayPrev.workTimeType==4){
                                        mutations.SetExportWorkClass('hour',workDataOfDayPrev.workTime)
                                    }

                                    hasHour = true;
                                }
                            }

                        })
                    }


                    // 检测下一天的班次，显示次日00:00-12:00的班次，且设置为不可编辑
                    if(workDataOfDayMoreNext){
                        workDataOfDayMoreNext.workTimeNumber.forEach(function(wclassHour, t) {

                            // 开始时间大于今天2400
                            if (workHour.time_s - 0 >= wclassHour[0] - 0 && workHour.time_e - 0 <= wclassHour[1] - 0) {
                                if (workHour.time_e - 0 <= wclassHour[1] - 0) {
                                    _data[id].workStyle = workDataOfDayNext.workStyle;
                                    _data[id].workClass = workDataOfDayNext.workClass;
                                    _data[id]['editable'] = 'disable';
                                    _data[id]['overDay'] = '[明]'

                                    if(workDataOfDayNext.workTimeType==1 ||workDataOfDayNext.workTimeType==4){
                                        mutations.SetExportWorkClass('hour',workDataOfDayNext.workTime)
                                    }

                                    hasHour = true;
                                }
                            }
                        })
                    }

                    if(!hasHour) return;

                    //
                    _data[id].hour = workHour.hour;
                    _data[id].date = workHour.time;  // 日期用时间戳表示


                    // 201606061830 日期+时间
                    _data[id].startTime =workHour.time_s;
                    _data[id].endTime =workHour.time_e;


                    // 操作 add/update/delete
                    _data[id].ctrlType = '';


                    // 复制人员数据
                    for( let x in people){
                        _data[id][x] = people[x];
                    }

                    // 判定当前单元格是否可编辑


                    // 在今天之前，则不能编辑
                    if (startDay.time - 0 <= today.time - 0) {
                        _data[id].editable = 'disable'
                    }


                    // 排休
                    if(_data[id].workTimeType-0==4){
                        _data[id].editable = 'disable'
                    }



                })

            })

            console.error(state.exportWorkClass.hour)


            mutations.SetWorkDataHours(_data,workHourByRow);



        },


        /**
         * 编辑对应id的日排版任务数据
         * @param  {string} ctrlType 编辑类型：add,update,delete
         * @param  {object} data {skillID}
         * @param  {string} id   数据id
         * @return {[type]}      [description]
         */
        editWorkSkillsByID(ctrlType,data,id){
            mutations.EidtWorkDataByID('day',ctrlType,data,id);
        },

        // 批量编辑
        editWorkSkills(type,ids,skillID) {


            // 获取某人该天班次数据
            // var wid = 'user' + people.userID + '_date' + Tool.iDate(state.daySelected).time;
            // var workDataOfDay = state.workDataDays[wid];
            // var workDataOfDayMore = state.workDataDaysMore[wid];

            // if(workDataOfDay.workTimeType==1 ||workDataOfDay.workTimeType==4){
            //     mutations.SetExportWorkClass('hour',workDataOfDay.workTime)
            // }


            // 判断是否有固定班次


            // 判断是否在固定班次范围内


            // 如果不是，则提示是否转成自定义班次


            // 提交自定义班次数据


            for (let i = 0, len = ids.length; i < len; i++) {

                let id = ids[i];

                let user = id.split('_time')[0]

                console.log(user,id)

                actions.editWorkSkillsByID('add', {
                    skillID: skillID
                }, id)

            }


        },
        // 日排班 —— 提交全部排班数据 增加、修改、删除
        submitWorkDataOfHours(){

            // 先保存在24小时排班中更改的周排班数据，如果排班有修改，会清空当天的任务数据。
            // actions.submitWorkDataOfDays();

            var alldata = {
                orgID:'',
                orgType:state.orgType=='department' ?'dept':state.orgType,
                list:''
            }

            if(state.orgType=='department'){
                alldata.orgID = state.deptID;
            }
            else if( state.orgType=='store'){
                alldata.orgID = state.storeID;
                alldata.group = state.orgGroupID;
            }


            var dataAdd = [], updateData = [], deleteData=[];

            // dataStatus 数据初始化状态
            // ctrlType   数据最后的操作状态

            var emptyData = {
                ID:'',
                deptID:'',
                storeID:'',
                userID:'',
                startTimeStr: '',
                endTimeStr: '',
                skillID: '',
                workTime:'',
                workTimeType:''
            }

            // 开始筛选数据
            for(let i in state.workDataHours){

                var item = state.workDataHours[i];


                // 新增
                if(item.dataStatus=='new' && (item.ctrlType=='add' || item.ctrlType=='update')/* && item.workTimeType!='' && item.workTime!=''*/){

                    var data = {};
                    for(let i in emptyData){
                        data[i] = item[i]
                    }

                    data.date = item.date;

                    dataAdd.push(data);

                }
                // 更新
                else if(item.dataStatus=='old' && (item.ctrlType=='add' || item.ctrlType=='update')/* && item.workTimeType!='' && item.workTime!=''*/){
                    var data = {};
                    for(let i in emptyData){
                        data[i] = item[i]
                    }

                    data.date = item.date;

                    updateData.push(data);
                }
                // 删除
                else if(item.dataStatus=='old' && item.ctrlType=='delete'){

                    deleteData.push(item.ID);
                }

            }


            let list = [];

            // 新增接口
            if(dataAdd.length>0){

                list.push(function(callback){
                    let _data = Object.assign({},alldata);
                    _data.list = JSON.stringify(dataAdd);

                    Tool.ajax({
                        url:'api.schedule.putScheduleHours',
                        data:_data,
                        method:'POST',
                        success(data,res){
                            if(callback) callback();

                            Vue.tool.showTip({
                                show:true,
                                type:'success',
                                msg:'保存成功'
                            })
                        },
                        error(res){
                            if(callback) callback();

                            Vue.tool.showTip({
                                show:true,
                                type:'warning',
                                msg:res
                            })

                        }
                    });

                })



            }

            // 更新接口
            if(updateData.length>0){

                list.push(function(callback){

                    let _data = Object.assign({},alldata);

                    _data.list = JSON.stringify(updateData);

                    Tool.ajax({
                        url:'api.schedule.updateScheduleHours',
                        data:_data,
                        method:'POST',
                        success(data,res){
                            if(callback) callback();
                            Vue.tool.showTip({
                                show:true,
                                type:'success',
                                msg:'保存成功'
                            })
                        },
                        error(res){
                            if(callback) callback();
                            Vue.tool.showTip({
                                show:true,
                                type:'warning',
                                msg:res
                            })
                        }
                    });
                })



            }

            // 删除接口
            if(deleteData.length>0){

                list.push(function(callback){
                    Tool.ajax({
                        url:'api.schedule.deleteScheduleHours',
                        data:{
                            'IDs':JSON.stringify(deleteData)
                        },
                        method:'POST',
                        success(data,res){
                            if(callback) callback();
                            Vue.tool.showTip({
                                show:true,
                                type:'success',
                                msg:'保存成功'
                            })
                        },
                        error(res){
                            if(callback) callback();
                            Vue.tool.showTip({
                                show:true,
                                type:'warning',
                                msg:res
                            })


                        }
                    });
                })



            }

            if(list.length==0) return;

            actions.asyncLoader(list,function(){


                actions.asyncLoader([actions.initWorkDataOfHours],function(){

                    actions.formatWorkDataOfHours(state.cachedWorkHour);

                })();


            })();


        },
        // 获取班次数据
        initWorkClass(callback){

            var fn = callback || function(){}

            var alldata = {
                orgID:'',
                orgType:state.orgType=='department' ?'dept':state.orgType,
            }

            if(state.orgType=='department'){
                alldata.orgID = state.deptID;
            }
            else if( state.orgType=='store'){
                alldata.orgID = state.storeID;
            }

            if(!alldata.orgID){
                fn();
                return;
            }

            // 加载数据
            Vue.Tool.ajax({
                url:'api.schedule.selectWorkClass',
                data:alldata,
                success(data,res){


                    if(data.length==0){

                        Vue.tool.showTip({
                            type:'warning',
                            msg:'暂无班次数据请添加班次数据，并重新选择要排班的组织'
                        })

                    }

                    state.workClass = data;
                    store.mutations.SetWorkClass(data);

                    fn();
                },
                error(res){
                    fn();
                }
            });
        },

        // 获取门店小组&成员
        initPersons(callback){

            var startDate = Tool.iDate(state.dateStart,'yymmdd');
            var endDate = Tool.iDate(state.dateStart,'yymmdd',state.dateLength-1);

            var fn = callback || function(){}

            var data = {
                storeID:'',
                deptID:'',
                userName:state.userName,
                startDate:startDate.string,
                endDate:endDate.string,
            }

            if(state.orgType=='department'){
                data.deptID = state.deptID-0;

                if(data.deptID==''&&state.userName=='') {

                    Vue.tool.showTip({
                        type:'error',
                        msg:'请您选择部门'
                    })

                    return;
                };

            }
            else if( state.orgType=='store'){
                data.storeID = state.storeID-0;
                data.group = state.orgGroupID;
                if(data.storeID==''&&state.userName==''){

                    Vue.tool.showTip({
                        type:'error',
                        msg:'请您选择门店'
                    })

                    return;

                };
            }

            // 加载数据
            Tool.ajax({
                url:'api.schedule.getPersons',
                data:data,
                success(data,res){
                    mutations.SetPersons(data);

                    fn();

                },
                error(res){
                    fn();
                    Vue.tool.showTip({
                        type:'error',
                        msg:res
                    })
                }
            });

        },

        // 编辑自定义班次 时间段 增删改
        editCustomWork(type,data,index){

            mutations.EditCustomWork(type,data,index)

        },

        // 获取技能列表

        initSkills(){

            // 加载数据
            Tool.ajax({
                url:'api.schedule.getSkills',
                data:{
                    defintionCode:127000
                },
                success(data,res){

                    mutations.SetWorkSkills(data);

                },
                error(res){
                    ///console.log(res)
                }
            });

        },
        // 获取技能名称

        getSkillNameByID(id){

            var name = '';
            for(let i=0,len=state.workSkills.length;i<len;i++){

                if(state.workSkills[i].ID+''==id+'' && state.workSkills[i].valid==1){
                    return name = state.workSkills[i].codeName;
                }

            }

            return name;


        },

        // 导出班次优化 3列布局
        exportWorkClass(colNum){

            console.log(store.state.workClass)

            let workClass = Array.from(store.state.workClass).filter(item=>!!item.valid);

            let html='<tr>'

            for(let i=0;i<colNum;i++){
                html+=`
                    <td colspan="2" style="text-align: center;font-weight: bold; background:#333; color:#fff;border:2px solid #fff;">班次名称</td>
                    <td colspan="2" style="text-align: center;font-weight: bold; background:#333; color:#fff;border:2px solid #fff;">班次时间</td>
                `
            }
            html+=`</tr>`

            workClass.forEach((citem,index)=>{

                if(index%colNum===0){
                    html+= index===0 ? `<tr>` : `</tr><tr>`
                }

                let times = '';

                citem.time.forEach(time=>{
                    times+=`<span>${time}</span>`
                })

                html+=`
                    <td colspan="2" style="background:${citem.bgcolor};color:${citem.fontcolor};border:2px solid #fff;" align="center">
                        ${citem.name}
                    </td>
                    <td colspan="2">${times}</td>
                `
            })

            html+=`</tr>`

            // console.log(html)

            return html;
        },

    }

    return {
        state,
        mutations,
        actions
    }


}

const department = new vuex();
const manager    = new vuex();
const service    = new vuex();

export default {
    department,
    manager,
    service
};
