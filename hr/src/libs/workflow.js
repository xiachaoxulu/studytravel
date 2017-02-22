'use strict'
/*
    paper

        node
            nodeID,
            x,
            y,
            width,
            height,
            text,
            data,
            element,

            config:{

            }

            create, // 创建元素
            render, // 计算位置、样式，渲染元素
            update, // 更新元素 update data, render element
            delete, // 删除元素

            ondragStart,
            ondragEnd


        path
            from,
            to,
            config:{
                strokeWidth,
                strokeColor,
                borderType,
            }

            create, // 创建元素
            render, // 计算位置、样式，渲染元素
            update, // 更新元素 update data, render element
            delete, // 删除元素

        handler






    workflow

        config, // 配置
        nodeList, // 节点
        pathList, // 路径

        nodeMap:[[1,2,3],[4],[5,6]] // 布局地图


        toolbar:{
            addBrotherPrev, // 添加同级节点 前
            addBrotherNext, // 添加同级节点 后
            addNextLevel, // 添加下一级
            edit,
            delete,
        }

        init, // 初始化
        update, //

        layout // 计算布局


        addNode, //
        delNode,

        ondragStart
        ondragMove
        ondragEnd


 */

let _ = {
    /**
     * keyMap 参数对照表 ["newkey/oldKey"]
     * data   数据对象
     * mode   模式选择 only 只返回参数对照表中的字段  all 返回data中的所有数据
     * return 新的数据对象
     * TODO:0 现为浅复制，需要加入深度复制模式。
     */
    dataParser(keyMap,data,mode){

        let newData = {};
        mode = mode || 'only'; // 默认为only模式

        // 只返回参数对照表中的字段
        if(mode==='only'){

            Array.isArray(keyMap) && keyMap.forEach(item=>{
                let keys    = item.split('/'),
                newKey  = keys[0],
                oldKey  = keys[1];
                newData[newKey] = data[oldKey];
            })
        }
        // 返回data中的所有数据
        else if(mode==='all'){

            // 创建参数对照表 oldKey:newKey
            let keyList = {};
            Array.isArray(keyMap) && keyMap.forEach(item=>{
                let keys    = item.split('/'),
                newKey  = keys[0],
                oldKey  = keys[1];
                keyList[oldKey] = newKey;
            })

            for(let key in data){
                // 如果参数在对照表中，则进行转换
                let newkey = keyList[key];
                if(newkey){
                    newData[newkey] = data[key];
                }
                else{
                    newData[key] = data[key];
                }

            }
        }

        return newData;
    },

    //获取元素的纵坐标
    getTop(el){
        var offset=el.offsetTop;
        if(el.offsetParent!=null) offset+=_.getTop(el.offsetParent);
        return offset;
    },
    //获取元素的横坐标
    getLeft(el){
        var offset=el.offsetLeft;
        if(el.offsetParent!=null) offset+=_.getLeft(el.offsetParent);
        return offset;
    }


}

// 节点对象
class NodeObject {
    constructor(data,config){
        // //console.log(config)
        this.super    = data.super;
        this.config   = config || {};
        this.data     = data || {};
        this.icon     = config.icon || '';
        // this.nodeId       = data.nodeId;              // || new Date().getTime();
        this.nodeId   = data.nodeId;
        this.name     = data.name;
        this.x        = data.x || 0;
        this.y        = data.y || 0;
        this.width    = data.width || 100;
        this.height   = data.height || 40;
        this.type     = data.type;
        this.order    = data.order || [];       // level order
        this.element  = this._createElement();
        this.pathList = []; // 从当前节点出去的分支路径
    }
    // 初始化节点
    _createElement(){
        return this.config.nodeCreate(this,this)
    }
    // 渲染节点
    render(){
        this.config.nodeRender(this,this)
    }
    // 更新数据
    update(data){
        console.info(data.name)
        this.name = data.name || this.name;
        this.render();
        this.config.nodeUpdate(this,this)
    }
}

// 路径对象
class PathObject {
    constructor(data,config){
        this.ID      = data.ID; //'ID'+data.from+data.to;
        this.super   = data.super;
        this.type    = data.type; // X or Y 方向
        this.from    = data.from;
        this.to      = data.to;
        this.points  = {M:{},L:[],E:{}};
        this.config  = config || {};
        this.element = this._createElement();
    }
    // 初始化节点
    _createElement(){
        return this.config.pathCreate(this,this)
    }
    // 渲染节点
    render(){
        this.config.pathRender(this,this)
    }
    // 更新数据
    update(){
        this.config.pathUpdate(this,this)
    }
}

// 流程图对象
class Workflow {
    constructor(config){
        this.config = config || {
            layOutType : 'up',        // up left
            nodeSize   : [100,50],
            nodeGrid   : [10,10],
            nodeLayout : [10,10],
            nodeTpl    : '<div></div>'
        };
        this.stageWrap  = config.stageWrap;
        this.stage      = config.stage;
        this.data     = []; // 所有节点数据
        this.nodeList = {}; // 节点列表 key=nodeID
        this.pathList = {}; // 路径列表 key=pathID
        this.nodeMap  = []; // 节点结构表 [[n1],[n2,n3],[n4,n5],[n6]]
        this.startNode = {
            nodeId:'-1',
            name:'开始',
            x:0,
            y:0,
            order:[0,0], // level 0 , order 0
            conditions:[]
        }
        this.endNode = {
            nodeId:'end',
            name:'结束',
            x:0,
            y:0,
            order:[2,0], // level 0 , order 0
            conditions:[]
        }
        this.toolbar = {}; // 工具条

        this.clickedNode   = null;  // 当前点击的node
        this.dragStartNode = null;  // 拖动动作开始的node
        this.dragEndNode   = null;  // 拖动动作终止的node
        this.canMove       = false; // stage.mousedown 后, mouseup 前, 标记为 可move状态
        this.nodeClickDown = false; // node 点击了
        this.nodeClickMove = false; // node mousedown 后, mouseup 前, 标记为 可move状态
        this.moveSx        = 0;     // move 初始坐标
        this.moveSy        = 0;     // move 初始坐标
    }
    // 初始化
    init(nodes){

        this.nodeList = {};
        this.pathList = {};
        this.nodeMap  = [];

        nodes = nodes || [];
        // 添加底层元素，用于划分路径与节点层次
        this.baseNode = this.stage.paper.rect(0,0,0,0)

        // 添加开始节点
        if(nodes.length>0){
            // 将开始节点链接至提交节点
            // TODO: 需要考虑实际开始节点不是提交人的情况，是否将此数据独立到程序外
            this.startNode.conditions = JSON.parse('[{"to":"start"}]');
        }
        nodes.unshift(Object.assign({},this.startNode));


        // 格式化节点数据
        Array.isArray(nodes) && nodes.forEach((node,index)=>{
            nodes[index] = this.parseNodeData(node);
            nodes[index].order = [nodes[index].order[0]-0,nodes[index].order[1]-0];
        })

        // 格式化数据后，判断是否存在结束节点,如果存在，直接用最新数据替换endNode
        let hasEndNode = nodes.filter(node=>{
            if(node.nodeId==='end'){
                this.endNode = node;
                return true;
            }
        });
        // 否则添加结束节点
        if(hasEndNode.length===0){
            this.endNode = this.parseNodeData(this.endNode);
            nodes.push(this.endNode);
        }

        //console.log(this.endNode)

        // 初始化节点地图
        Array.isArray(nodes) && nodes.forEach(node=>{
            let level = node.order[0] || 0,
                order = node.order[1] || 0;
            if(!this.nodeMap[level] && this.nodeMap[level]!==0){
                this.nodeMap[level] = [];
            }
            // 如果当前位置已经存在节点
            let nodeCur = this.nodeMap[level][order];
            if(nodeCur>=0){
                // 若节点重复则忽略，否则在此节点后插入
                if(nodeCur!==node.nodeId){
                    let str = this.nodeMap[level].join(',');
                    str = str.replace(`,${nodeCur},`,`,${nodeCur},${node.nodeId},`);
                    this.nodeMap[level] = str.split(',');
                }
            }else{
                this.nodeMap[level][order] = node.nodeId;
            }
        })

        //console.log(this.nodeMap)

        // 创建节点
        Array.isArray(nodes) && nodes.forEach(node=>{
            node.super = this;
            let nodeObj = new NodeObject(node,this.config);
            this.nodeList[nodeObj.nodeId] = nodeObj;
        });
        // 创建路径 （不能与创建节点合并）
        Array.isArray(nodes) && nodes.forEach(node=>{
            console.log('node',node)
            /* 生成路径 */
            // [{"to":1,if:""},{to:2,if:""}]
            if(node.nodeId!=='end'){
                let paths = [];

                if(Array.isArray(node.conditions)){
                    paths = node.conditions;
                }
                else{
                    try {
                        paths =JSON.parse(node.conditions);
                    }
                    catch(e){
                    }
                }

                console.info('paths',paths)

                // let nodeObj = this.nodeList[node.nodeId]
                paths.forEach(path=>{
                    // 如果path.to 或者 node.to 为空 则不创建路径
                    if(typeof(path.to)===undefined || !this.nodeList[path.to]) return;
                    let pathObj =  new PathObject({
                        ID:path.ID || path.to,
                        super:this,
                        from:node.nodeId,
                        to:path.to
                    },this.config);
                    this.pathList[pathObj.ID] = pathObj;
                })
            }

        });

        // 计算布局
        this.layout();

        // 添加事件监听
        this.stage.mousedown((e)=>{
            this.canMove = true;

            let startPos = this.getRelativePos(e);

            this.moveSx = startPos.x;
            this.moveSy = startPos.y;

            // // 校准stage offset位置
            // this.checkOffset(e);

            if(e.target.tagName==='rect'){
                this.nodeClickDown = true;
            }
        }).mousemove((e)=>{
            if(!this.canMove) return;

            // 屏蔽click事件引起的回调
            if(Math.abs(e.pageX-this.moveSx)<2 && Math.abs(e.pageY-this.moveSy)<2){
                return;
            }

            // nodeMoveStart
            if(this.nodeClickDown && !this.nodeClickMove){
                this.nodeClickMove = true;
                this.config.nodeDragStart && this.config.nodeDragStart(this,e,this.getRelativePos(e));
            }

            // nodeMoving
            if(this.nodeClickMove){
                this.config.nodeDragMove && this.config.nodeDragMove(this,e,this.getRelativePos(e),{x:this.moveSx,y:this.moveSy});
            }

        }).mouseup((e)=>{
            this.canMove = false;
            // //console.log('mouseup')
            // setTimeout(()=>{
                if(this.nodeClickDown && this.nodeClickMove){
                    this.nodeClickDown = false;
                    this.nodeClickMove = false;
                    this.config.nodeDragEnd && this.config.nodeDragEnd(this,e);

                    this.dragStartNode = null;
                    this.dragEndNode = null;
                }
            // },0)
        }).click(e=>{
            this.config.stageClick&&this.config.stageClick(this,e);
        });

        this.config.initCallback && this.config.initCallback(this);
    }

    // 整理NodeMap
    formatNodeMap(){

        // 始终保持结束节点在最末尾，如果有节点与结束节点同级，则将结束节点提取出来，单独一行
        //console.log(this.nodeMap)
        //console.log(this.endNode.order[0])
        let lastNodeLevel = this.nodeMap[this.endNode.order[0]];
        if(lastNodeLevel.length>1 || this.nodeMap[this.nodeMap.length-1][0]!=='end'){
            //console.log(lastNodeLevel,lastNodeLevel.indexOf(this.endNode.nodeId))
            this.nodeMap[this.endNode.order[0]].splice(lastNodeLevel.indexOf(this.endNode.nodeId),1);
            this.nodeMap.push([this.endNode.nodeId]);
            // this.endNode.order=[this.nodeMap.length-1,0];
        }else{

        }

        // 清除空的level
        this.nodeMap = this.nodeMap.filter(level=>{
            return level&&level.length>0;
        })
        // 清除空的节点
        this.nodeMap.forEach(level=>{
            level = level.filter(order=>{
                return !!order;
            })
        })

        // 重新定义节点order
        this.nodeMap.forEach((level,i)=>{
            level.forEach((nodeID,j)=>{
                //console.log(nodeID,i,j)
                if(this.nodeList[nodeID]){
                    // 同步节点order和节点数据中的order
                    this.nodeList[nodeID].order = [i-0,j-0];
                    this.nodeList[nodeID].data.order = [i-0,j-0];
                }

                // 更新结束节点order，需独立更新 因为 this.nodeList[nodeID]不等于this.endNode;
                // TODO: 设置 this.endNode = nodeObject 解决此问题
                if(nodeID==='end'){
                    this.endNode.order = [i-0,j-0];
                }

            })
        })

        console.log('nodeMap',this.nodeMap)
        console.log(this.nodeList)


    }

    // 更新数据
    update(){
    }
    // 计算布局
    layout(){

        // 整理nodeMap
        this.formatNodeMap();


        // 更新画布尺寸
        let maxLevelY = this.nodeMap.length,
            maxLevelX = 1,
            stageWidthNow = this.config.width,
            stageHeightNow = this.config.height
        ;
        this.nodeMap.forEach(level=>{
            maxLevelX = Math.max(maxLevelX,level.length);
        });

        stageWidthNow = Math.max(stageWidthNow,maxLevelX*(this.config.nodeSize[0]+this.config.nodeGrid[0]));
        stageHeightNow = Math.max(stageHeightNow,maxLevelY*(this.config.nodeSize[1]+this.config.nodeGrid[1]));

        this.stage.node.style.width = stageWidthNow;
        this.stage.node.style.height = stageHeightNow;

        //console.log(this.stage.node.style.width)
        //console.log(maxLevelY,maxLevelX)

        // 确定基点
        let basePoint = [stageWidthNow/2,20];
        this.basePoint = basePoint;

        // 根据布局计算node xy
        //console.log('nodeorder',this.nodeMap)
        this.nodeMap.forEach((level,i)=>{
            level.forEach((nodeID,j)=>{

                if(!nodeID) return;

                let node = this.nodeList[nodeID],
                    levelLen = level.length,
                    levelPoint = [
                        // 计算当前层级相对于中心点坐标偏移坐标 即为层级居中时最左侧坐标
                        basePoint[0]-(node.width*levelLen+this.config.nodeGrid[0]*(levelLen-1))/2,
                        basePoint[1]+(node.height+this.config.nodeGrid[1])*i*(node.nodeId==='start'?1:1)
                    ]
                ;

                node.x = levelPoint[0]+(node.width+this.config.nodeGrid[0])*j;
                node.y = levelPoint[1];

                // 计算当前节点的4方位连接点坐标
                // left top right bottom
                node.points = {
                    top: {
                        x:node.x+node.width/2,
                        y:node.y - this.config.nodeMargin[0]
                    },
                    right:{
                        x:node.x + node.width + this.config.nodeMargin[1],
                        y:node.y+node.height/2
                    },
                    bottom:{
                        x:node.x +node.width/2,
                        y:node.y + node.height + (node.nodeId==='-1' ? this.config.nodeMargin[0] :this.config.nodeMargin[2])
                    },
                    left: {
                        x:node.x - this.config.nodeMargin[3],
                        y:node.y+node.height/2
                    }
                }
                let pointsUsedTpl = {
                    up:0,
                    down:0,
                    left:0,
                    right:0
                }
                node.pointsUsed = {
                    left:Object.assign({},pointsUsedTpl), // [up,down] y 向上，向下 分别使用量 判断重复使，计算同方向偏移量
                    top:Object.assign({},pointsUsedTpl), // [left,right] x 向左向右 ...
                    right:Object.assign({},pointsUsedTpl),
                    bottom:Object.assign({},pointsUsedTpl)
                }
                node.render();
            })
        })

        // 清空所有节点保存的路径信息，以便重新归类
        for( let ID in this.nodeList){
            this.nodeList[ID].pathList = [];
        }

        // 确定node坐标后，计算路径坐标点
        for( let key in this.pathList){

            if(!this.pathList[key]) return;

            let path = this.pathList[key],
                nodeFrom = this.nodeList[path.from],
                nodeTo   = this.nodeList[path.to];

            if(!nodeTo) return;

            let levelGrid = nodeTo.order[0]-nodeFrom.order[0], // 层级间距
                nodeGrid = nodeTo.order[1]-nodeFrom.order[1];  // 节点间距

            // 记录当前结点走出的线段
            // if(nodeFrom.pathList.indexOf[key]<0){
                nodeFrom.pathList.push(key);
            // }

            // 跨层级 lv1[0] -> lv3[1]
            // 自动路径优先是使用右端点，手动路径使用指定方位端点



            // 重置points
            path.points = {M:{},L:[],E:{}};

            // 直连 相邻层级Y方向
            if(Math.abs(levelGrid)===1 && nodeFrom.x === nodeTo.x){
                let mp = this.getLinkPoint({
                        node:nodeFrom,
                        pathDir:(levelGrid>0 ? 'down' : 'up'),
                        pathType:true
                    }),
                    ep = this.getLinkPoint({
                        node:nodeTo,
                        pathDir:(levelGrid>0 ? 'up' : 'down'),
                        pathType:true
                    })
                ;
                // 开始
                path.points.M = {
                    x:mp.x,//+mp.offsetX,
                    y:mp.y,//+mp.offsetY
                }
                // 结束
                path.points.E = {
                    x:ep.x,//+ep.offsetX,
                    y:ep.y,//+ep.offsetY
                }

                path.type = 'Y';

            }
            // 直连 同层级 x方向 相邻节点
            else if(Math.abs(levelGrid)==0 && Math.abs(nodeFrom.order[1]-nodeTo.order[1])==1){

                let mp = this.getLinkPoint({
                        node:nodeFrom,
                        pathDir:(nodeGrid>0 ? 'right' : 'left'),
                        pathType:true
                    }),
                    ep = this.getLinkPoint({
                        node:nodeTo,
                        pathDir:(nodeGrid>0 ? 'left' : 'right'),
                        pathType:true
                    })
                ;

                // 开始
                path.points.M = {
                    x:mp.x,//+mp.offsetX,
                    y:mp.y,//+mp.offsetY
                }
                // 结束
                path.points.E = {
                    x:ep.x,//+ep.offsetX,
                    y:ep.y,//+ep.offsetY
                }

                path.type = 'X';
            }
            // 非直连 相邻层级
            else if(Math.abs(levelGrid)===1){

                // 节点路径起点
                let fromPointPos = levelGrid>0 ? 'bottom' : 'top',
                    toPointPos   = levelGrid>0 ? 'top' : 'bottom'
                ;

                let mp = this.getLinkPoint({
                        node     : nodeFrom,
                        pathDir  : levelGrid>0 ? 'down' : 'up',
                        position : fromPointPos,
                    }),
                    ep = this.getLinkPoint({
                        node     : nodeTo,
                        pathDir  : levelGrid>0 ? 'up' : 'down',
                        position : toPointPos,
                    })
                ;
                // 起点
                path.points.M = {
                    x:mp.x,
                    y:mp.y,
                }
                // 结束
                path.points.E = {
                    x:ep.x,
                    y:ep.y,
                }

                // 中间点
                path.points.L = [
                    {
                        x:mp.x,
                        y:mp.y+(ep.y-mp.y)/2,
                    },
                    {
                        x:ep.x,
                        y:mp.y+(ep.y-mp.y)/2,
                    }
                ]

                path.type = 'Y';
            }
            // 非直连 不同层级
            else if(Math.abs(levelGrid)>0){

                let nodeFromPos = this.getNodePosition(nodeFrom,'Y'),
                    nodeToPos = this.getNodePosition(nodeTo,'Y'),
                    nodePos;
                //
                if((nodeFromPos==='left'&&nodeToPos==='center') || (nodeToPos==='left'&&nodeFromPos==='center')){
                    nodePos = 'left'
                }
                else if((nodeFromPos==='right'&&nodeToPos==='center') || (nodeToPos==='right'&&nodeFromPos==='center')){
                    nodePos = 'right'
                }
                let mp = this.getLinkPoint({
                        node     : nodeFrom,
                        pathDir  : levelGrid>0 ? 'down' : 'up',
                        position : nodePos,
                    }),
                    ep = this.getLinkPoint({
                        node     : nodeTo,
                        pathDir  : levelGrid>0 ? 'up' : 'down',
                        position : nodePos,
                    })
                ;
                    // ep = this.getLinkPoint(nodeTo,(levelGrid>0 ? 'up' : 'down'),false,'top');
                // 中间点 位移及x坐标
                let offsetX = 10,
                    pathLx
                ;
                // 确定偏移
                if(mp.position==='left'){
                    // 开始
                    path.points.M = {
                        x:mp.x,//-mp.offsetX,
                        y:mp.y+10,//-mp.offsetY
                    }
                    // 结束
                    path.points.E = {
                        x:ep.x,//-ep.offsetX,
                        y:ep.y,//-ep.offsetY
                    }
                    pathLx = (path.points.M.x<path.points.E.x) ? path.points.M.x-offsetX : path.points.E.x-offsetX ;//- Math.max(mp.offsetX,ep.offsetX);
                }
                else{
                    // 开始
                    path.points.M = {
                        x:mp.x,//+mp.offsetX,
                        y:mp.y+10,//+mp.offsetY
                    }
                    // 结束
                    path.points.E = {
                        x:ep.x,//+ep.offsetX,
                        y:ep.y,//+ep.offsetY
                    }
                    pathLx = (path.points.M.x>path.points.E.x) ? path.points.M.x+offsetX : path.points.E.x+offsetX ;//+ Math.max(mp.offsetX,ep.offsetX);
                }
                path.points.L = [
                    {
                        x:pathLx,
                        y:path.points.M.y
                    },
                    {
                        x:pathLx,
                        y:path.points.E.y
                    }
                ]

                path.type = 'Y';

            }
            // 非直连 同层级 X方向
            else if(Math.abs(levelGrid)===0){

                let nodeFromPos = this.getNodePosition(nodeFrom,'Y'), // 节点相对于中线的方位
                    nodeToPos = this.getNodePosition(nodeTo,'Y'),
                    mp = this.getLinkPoint({
                        node     : nodeFrom,
                        pathDir  : levelGrid>=0 ? 'left' : 'right',
                    }),
                    ep = this.getLinkPoint({
                        node     : nodeTo,
                        pathDir  : levelGrid>=0 ? 'right' : 'left',
                        position : mp.postion
                    })
                ;
                // 开始
                path.points.M = {
                    x:mp.x+mp.offsetX+(nodeFromPos==='left' ? 1 : -1)*20,
                    y:mp.y+mp.offsetY
                }
                // 结束
                path.points.E = {
                    x:ep.x+ep.offsetX+(nodeToPos==='left' ? 1 : -1)*20,
                    y:ep.y+ep.offsetY
                }
                // 中间点 位移及y坐标
                let offsetY = 10,
                    pathLy
                ;

                if(mp.position==='top'){
                    pathLy = (path.points.M.y>path.points.E.y) ? path.points.M.y-offsetY : path.points.E.y-offsetY
                }
                else{
                    pathLy = (path.points.M.y>path.points.E.y) ? path.points.M.y+offsetY : path.points.E.y+offsetY
                }

                path.points.L = [
                    {
                        x:path.points.M.x,
                        y:pathLy
                    },{
                        x:path.points.E.x,
                        y:pathLy
                    }
                ]

                path.type = 'X';
            }
            path.render();
        }
    }

    // 格式化节点数据
    parseNodeData(node){
        let nodeData = _.dataParser(this.config.nodeDataMap,node,'all');
        nodeData.nodeId = node.nodeId;
        // nodeData.nodeId = node.nodeId;
        nodeData.width = this.config.nodeSize[0];
        nodeData.height = this.config.nodeSize[1];
        return nodeData;
    }
    /**
     * 获取node可用的连接点
     * node 节点对象
     * dir  路径方向
     * type 路径类型 直连 非直连
     * position 指定位置
     */
    getLinkPoint(options){

        let node     = options.node,     // nodeObject
            pathDir  = options.pathDir,  // up,down,left,right
            pathType = options.pathType, // true false
            position = options.position  // left right top bottom
        ;

        let nodePoint,pointName;
        // 节点直连
        if(pathType){
            if(pathDir==='up'){
                pointName = 'top';
            }
            else if( pathDir==='down' ){
                pointName = 'bottom';
            }
            else if(pathDir==='left'){
                pointName = 'left';
            }
            else if(pathDir==='right'){
                pointName = 'right';
            }
            nodePoint = node.points[pointName];
            // node.pointsUsed[pointName][pathDir]++; // 直连暂不计数
            return {
                x:nodePoint.x,
                y:nodePoint.y,
                offsetX:0,
                offsetY:0,
                position:pointName
            };
        }
        else{
            // 节点非直连
            // 指定链接点位置
            if(position){
                let point = node.points[position],
                    pointUsed = node.pointsUsed[position],
                    offsetDir = (position==='left' || position==='right') ? 'x' : 'y';
                ;
                node.pointsUsed[position][pathDir]++;

                // console.info(pointUsed[pathDir])

                return {
                    x:point.x,
                    y:point.y,
                    offsetX:offsetDir==='x' ? pointUsed[pathDir] * 20 : 0,
                    offsetY:offsetDir==='y' ? pointUsed[pathDir] * 20 : 0,
                    position:position,
                    pathDir:pathDir
                }
            }
            // 自定判断连接点位置
            else{
                let offsetDir;
                // up,down => left or right
                if(pathDir==='up' || pathDir==='down'){
                    offsetDir = 'x';
                    // 确定路径位置 左侧 还是 右侧
                    // node中心点x > 画布中心点 x 靠右
                    if( (node.x-node.width/2) > this.basePoint[0]){
                        pointName = ['right','right'];
                    }
                    // 靠左
                    else if( (node.x-node.width/2) < this.basePoint[0] ){
                        pointName = ['left','left'];
                    }
                    // 居中
                    else{
                        pointName = ['left','right'];
                    }
                }
                // left,right => top or bottom
                else if(pathDir==='left' || pathDir==='right'){
                    pointName = ['top','top'];
                    offsetDir = 'y';
                }
                else{
                    pointName = ['bottom','bottom'];
                    offsetDir = 'y';
                }
                let pointUsedA = node.pointsUsed[pointName[0]],
                    pointUsedB = node.pointsUsed[pointName[1]],
                    pointA = node.points[pointName[0]],
                    pointB = node.points[pointName[1]]
                    ;
                // 左侧点空闲
                if(pointUsedA[pathDir]==0){
                    node.pointsUsed[pointName[0]][pathDir]++;
                    return {
                        x:pointA.x,
                        y:pointA.y,
                        offsetX:0,
                        offsetY:0,
                        position:pointName[0],
                        pathDir:pathDir
                    };
                }
                // 右侧点空闲
                else if(pointUsedB[pathDir]==0){
                    node.pointsUsed[pointName[1]][pathDir]++;
                    return {
                        x:pointB.x,
                        y:pointB.y,
                        offsetX:0,
                        offsetY:0,
                        position:pointName[1],
                        pathDir:pathDir
                    };
                }
                // 无空闲，则平均分配，优先左侧
                else if( pointUsedA[pathDir] <= pointUsedB[pathDir]){
                    node.pointsUsed[pointName[0]][pathDir]++;
                    return {
                        x:pointA.x,
                        y:pointA.y,
                        offsetX:offsetDir=='x' ? pointUsedA[pathDir] * 20 : 0, // 便宜量 10
                        offsetY:offsetDir=='y' ? pointUsedA[pathDir] * 20 : 0,
                        position:pointName[0],
                        pathDir:pathDir
                    }
                }
                else if( pointUsedA[pathDir] > pointUsedB[pathDir]){
                    node.pointsUsed[pointName[1]][pathDir]++;
                    return {
                        x:pointB.x,
                        y:pointB.y,
                        offsetX:offsetDir=='x' ? pointUsedB[pathDir] * 20 : 0, // 便宜量 10
                        offsetY:offsetDir=='y' ? pointUsedB[pathDir] * 20 : 0,
                        position:pointName[1],
                        pathDir:pathDir
                    }
                }
            }
        }
    }
    /**
     * 获取节点位置 return left right center top bottom
     * node 节点对象
     * dir 布局方向 X,Y
     */
    getNodePosition(node,dir){
        // 竖向布局时
        if(dir==='Y'){
            // //console.log(node.name,node.x+node.width/2,this.basePoint[0])
            // node中心点x > 画布中心点 x 靠右
            if( (node.x+node.width/2) > this.basePoint[0]){
                return 'right';
            }
            // 靠左
            else if( (node.x+node.width/2) < this.basePoint[0] ){
                return 'left'
            }
            // 居中
            else{
                return 'center'
            }
        }
        // 横向布局
        else if(dir==='X'){
            // node中心点y > 画布中心点 y 靠下
            if( (node.y+node.height/2) > this.basePoint[0]){
                return 'bottom';
            }
            // 靠上
            else if((node.y+node.height/2) < this.basePoint[0] ){
                return 'top'
            }
            // 居中
            else{
                return 'center'
            }
        }
    }

    // 根据开始节点id和结束节点id来获取相应的path对象
    getPathByFromTo(fromID,toID){

        for(let id in this.pathList){
            let pathObj = this.pathList[id];
            if(pathObj.from===fromID && pathObj.to===toID){
                return pathObj;
            }
        }

    }

    // 获取鼠标相对画布的坐标
    getRelativePos(e){

        let offsetL = _.getLeft(this.stageWrap),
            offsetH = _.getTop(this.stageWrap)
        ;

        return {
            x:e.pageX-offsetL+this.stageWrap.scrollLeft,
            y:e.pageY-offsetH+this.stageWrap.scrollTop
        }
    }
    // 添加节点
    addNode(nodeData){
        // init data
        nodeData.super = this;
        nodeData.nodeId = uuid.short();
        // nodeData.nodeId = nodeData.nodeId;
        nodeData.name = nodeData.name || '新节点';

        // add to nodeList
        this.nodeList[nodeData.nodeId] = new NodeObject(nodeData,this.config);

        // add to nodeMap
        if(!this.nodeMap[nodeData.order[0]]){
            this.nodeMap[nodeData.order[0]] = [];
        }
        this.nodeMap[nodeData.order[0]][nodeData.order[1]] = nodeData.nodeId;

        // relayout
        this.layout();

        // 回调
        nodeData.order =[...this.nodeList[nodeData.nodeId].order];
        this.config.onAfterAddNode(this,nodeData);
    }
    // 添加新的路径
    addPath(fromNode,toNode){
        //console.log('添加新的路径')

        // //console.log(fromNode.nodeId,toNode.nodeId)

        // 判断路径是否已存在
        if(this.getPathByFromTo(fromNode.nodeId,toNode.nodeId)){
            return;
        }

        let pathID = uuid.short();//'ID'+fromNode.nodeId+toNode.nodeId;

        if(this.pathList[pathID]) return;

        let pathObj =  new PathObject({
            ID:pathID,
            super:this,
            from:fromNode.nodeId,
            to:toNode.nodeId
        },this.config);
        this.pathList[pathObj.ID] = pathObj;

        this.layout();

        this.config.onCreatePath(this,{
            ID:pathObj.ID,
            from:fromNode.nodeId,
            to:toNode.nodeId
        });

    }

    delPath(pathID){
        if(!this.pathList[pathID]) return;
        this.config.onBeforeDelPath(this,pathID);
        // 无需此时删除对应的node中的path，layout的时候会自动删除
        // 删除路径
        this.pathList[pathID].element.remove();
        delete this.pathList[pathID];
        this.layout();

        this.config.onAfterDelPath(this,pathID);
    }

    // 添加辅助路径 用于连线
    addPathHandler(){
        this.pathHandler = new PathObject({
            super:this
        },this.config);
    }
    // 渲染辅助路径
    renderPathHandler(points){
        if(this.pathHandler){
            this.pathHandler.points = points;
            this.pathHandler.render();
        }
    }
    // 删除辅助路径
    removePathHandler(){
        if(this.pathHandler){
            this.pathHandler.element.remove();
            this.pathHandler = null;
        }
    }
}

export default Workflow;
