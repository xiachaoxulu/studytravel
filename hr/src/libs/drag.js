class drag {

    constructor (args){

        console.log('drag init')

        this.options = Object.assign({
            parent     : '',    // 父元素
            dragScroll : false, // 拖拽至父辈边缘父元素滚动条自动滚动
            moveStep   : 10,    // 自动滚动最小间幅度
            limitStep  : 5,    // move时事件节流间隔 px
            dragable   : false, // 是否拖动元素
            hitCheck   : false, // 拖动的时候是否进行元素碰撞检测 【elements 和 鼠标位置】
            hitConfig: {        // 碰撞检测配置 默认内部检测
                contain: {},    // 包含
                // border : {      // 边距
                //     direction:['left','right','top','bottom'], // 四个方向
                //     offset:10 //或者 {left:10,right:10,top:5,bottom:5}  // 正值外扩 负值内缩
                // }
            },
            hitClass   : '',    // 被碰撞的元素要添加的class
            dragClass  : '',    // 拖拽handler元素class
            elements   : '',    // 元素selector
            start      : ()=>{},
            move       : ()=>{},
            end        : ()=>{}
        },args);

        if(!this.options.elements) {
            console.error('drag:elements selector is undefined')
            return;
        };
        // 元素
        this.elements = document.querySelectorAll(this.options.elements);
        this.dragElement = undefined;
        this.parentElement = this.options.parent ? document.querySelector(this.options.parent) : undefined;
        // 活动对象
        this.activeObj = {
            element : undefined, // 当前操作元素
            hitElement: undefined,  // 拖拽检测模式 碰撞到的元素 【当前】
            prevHitElement: undefined,  // 拖拽检测模式 碰撞到的元素 【上一个】
            index   : 0,    // 当前元素的索引
            hitIndex: 0,    // 碰撞元素的索引
            hitPosition: '' // 碰撞的方位 数组join字符串可返回 'contain' 或者 'left,top,right,bottom'等任意组合
        };
        // 默认数据
        this.dataDefault = {
            ol:0, // 拖拽开始时元素位置
            ot:0,
            or:0,
            ob:0,

            sx:0, // 拖动开始event位置
            sy:0,

            ex:0, // 拖动结束event位置
            ey:0,

            dx:0, // 位移量
            dy:0
        }

        this.limitX = 0; // 事件节流
        this.limitY = 0; // 事件节流

        // 数据中转站
        this.dataTransfer = {};

        // 初始化默认值
        Object.assign(this.dataTransfer,this.dataDefault);

        // 拖拽激活
        this.activing = false;
        this.moveing = false;

        // 事件类型 支持移动端和PC端
        this.events = {
            start : ['touchstart','mousedown'],
            move  : ['touchmove','mousemove'],
            end   : ['touchend','mouseup']
        };

        // 绑定事件
        this.bindEvents();

        // this.unbindEvents();

    }


    // 判断数组中是否包含某个选项
    isIncluded (list,target){
        list = typeof list ==='Array' ? list : Array.from(list);
        return list.some(el=>el===target);
    }

    /**
     * 绑定事件
     * TODO: 全局事件优化
     */
    bindEvents(){

        // 循环绑定事件
        for(let name in this.events){
            this.events[name].forEach(eventName=>{
                // console.log(`add ${name}Handler for ${eventName}`)
                window.addEventListener(eventName,this[name+'Handler'].bind(this))
            })
        }

    }

    /**
     * 解绑事件
     */
    unbindEvents(){

        // 循环解除绑定事件
        for(let name in this.events){
            this.events[name].forEach(eventName=>{
                // console.log(`remove ${name}Handler ${eventName}`)
                window.removeEventListener(eventName,this[name+'Handler'])
            })
        }

    }

    /**
     * 像素转数字 10px => 10
     */
    px2Num(val){
        return val.replace(/px/g,'')-0;
    }

    /**
     * 获取位置数据 兼容移动端和PC
     */
    getPagePos(type,e){
        return e.touches && e.touches[0] ? e.touches[0]['page'+type] : e['page'+type];
    }

    /**
     * 鼠标焦点碰撞检测（非双元素边界检测）
     * target {node}           目标节点 必须为单元素节点
     * evt    {Event}          事件对象
     * offset {Nummber,Object} 数值时为统一设定,Object = { left,right,top,bottom}
     * direction {Array}       方向 ['left','right','top','bottom']
     * return {String}         碰撞结果 返回碰撞方向 contain,left,top,right,bottom
     */
    cursorHitTest(target,evt,config){

        if(!target || !evt) return;

        let options = Object.assign({
                type      : 'contain', // 'contain' 包含 'border'边界距离范围 (内外边界通过正副值判定)
                offset   : 0,       // 边界距离 统一数值 或 {left,right,top,bottom} 正值放大  负值缩小
                direction : ['left','right','top','bottom'], // 检测方向
            },config),
            mx          = evt.pageX || evt.touches[0].pageX,
            my          = evt.pageY || evt.touches[0].pageY,
            rect        = target.getBoundingClientRect(),
            rect_left   = rect.left - (typeof options.offset ==='number' ? options.offset : options.offset.left || 0),
            rect_right  = rect.left + rect.width + (typeof options.offset ==='number' ? options.offset : options.offset.right || 0),
            rect_top    = rect.top - (typeof options.offset ==='number' ? options.offset : options.offset.top || 0),
            rect_bottom = rect.top + rect.height + (typeof options.offset ==='number' ? options.offset : options.offset.bottom || 0)
        ;


        // 包含检测
        if(options.type==='contain'){
            if(rect_left<=mx && rect_top<=my && rect_right>=mx && rect_bottom>=my){
                return 'contain';
            }
            return false;
        }
        // 边距检测
        else if(options.type === 'border'){

            let outerLine = {
                    left   : Math.min(rect.left,rect_left),
                    right  : Math.max(rect.right,rect_right),
                    top    : Math.min(rect.top,rect_top),
                    bottom : Math.max(rect.bottom,rect_bottom)
                },
                innerLine = {
                    left   : Math.max(rect.left,rect_left),
                    right  : Math.min(rect.right,rect_right),
                    top    : Math.max(rect.top,rect_top),
                    bottom : Math.min(rect.bottom,rect_bottom)
                }
            ;

            return options.direction.filter(dir=>{
                if(dir==='left'){
                    return mx >= outerLine.left && mx <= innerLine.left && my>=outerLine.top && my<=outerLine.bottom;
                }
                else if(dir==='right'){
                    return mx <= outerLine.right && mx >= innerLine.right && my>=outerLine.top && my<=outerLine.bottom;
                }
                else if(dir==='top'){
                    return my >= outerLine.top && my <= innerLine.top && mx>=outerLine.left && mx<=outerLine.right;
                }
                else if(dir==='bottom'){
                    return my <= outerLine.bottom && my >= innerLine.bottom && mx>=outerLine.left && mx<=outerLine.right;
                }
            }).join(',');
        }

        return false;

    }

    /**
     * 拖动开始
     */
    startHandler(e){

        // 重选元素 防止元素为初始化后创建元素
        this.elements = document.querySelectorAll(this.options.elements);

        // 当前元素非elements则return
        if(this.elements!==e.target &&  !this.isIncluded(this.elements,e.target) ){
            return;
        };

        // 重选父元素 防止父元素为初始化后创建元素
        this.parentElement = this.options.parent ? document.querySelector(this.options.parent) : undefined;

        // 将元素统一转换为数组
        if(!this.elements.length){
            this.elements = [this.elements]
        }else{
            this.elements = Array.from(this.elements);
        }

        // 活动对象
        Object.assign(this.activeObj,{
            element:e.target,
            index: this.elements.findIndex(elm=>elm===e.target),
            event:e
        })

        // 先复位数据
        Object.assign(this.dataTransfer,this.dataDefault);

        // 活动标示
        this.activing = true;

        // console.log(this.dataTransfer)

        this.limitX = this.getPagePos('X',e);
        this.limitY = this.getPagePos('Y',e);

    }

    startMove(e){

        console.log('startMove')

        let activeElement = this.activeObj.element;
        // 初始化拖动元素
        if(this.options.dragable){
            this.initElement();
            activeElement = this.dragElement;
        }

        let mx = this.getPagePos('X',e),
            my = this.getPagePos('Y',e);

        // 初始化数据
        Object.assign(this.dataTransfer,{
            // 原始位置
            ol:this.px2Num(activeElement.style.left) || 0,
            ot:this.px2Num(activeElement.style.top) || 0,
            or:this.px2Num(activeElement.style.right) || 0,
            ob:this.px2Num(activeElement.style.bottom) || 0,
            sx:mx,
            sy:my
        });

        this.options.start(this.dataTransfer,this.activeObj);


    }

    /**
     * 事件节流
     * e {Event} event
     * dir {String} 方向 x,y
     * step {Number} 幅度
     */
    eventLimit(e,step){

        let result = {
            x:false,
            y:false
        }

        if (Math.abs(this.getPagePos('X', e) - this.limitX) > step) {
            this.limitX = this.getPagePos('X', e);
            result.x = true;
        }
        if (Math.abs(this.getPagePos('Y', e) - this.limitY) > step) {
            this.limitY = this.getPagePos('Y', e);
            result.y = true;
        }

        return result;
    }

    /**
     * 拖动中
     */
    moveHandler(e){

        if(!this.activing) return;

        // 取消所有已选文本 减少对拖动的干扰
        window.getSelection().removeAllRanges();

        let mx = this.getPagePos('X',e),
            my = this.getPagePos('Y',e),
            outLimit = this.eventLimit(e,this.options.limitStep)
        ;

        // console.log(outLimit)

        if((outLimit.x || outLimit.y) && !this.moveing){
            this.moveing = true;
            this.startMove(e);
        }

        if(!this.moveing) return;

        // console.log(this.activing,this.moveing)

        Object.assign(this.dataTransfer,{
            dx:this.dataTransfer.ex+mx-this.dataTransfer.sx,
            dy:this.dataTransfer.ey+my-this.dataTransfer.sy
        });

        // 拖动元素
        this.options.dragable && this.moveElement();

        // 拖拽时,碰撞检测 【elements 和 鼠标位置】，返回当前碰撞的元素
        if(this.options.dragable && this.options.hitCheck && (outLimit.x || outLimit.y)){

            let hasHitElement = this.elements.some((elm,index)=>{


                // 边距检测 包括内边距的情况 所以前置
                if(this.options.hitConfig.border){
                    // 碰撞检测
                    let result = this.cursorHitTest(elm,e,{
                        type      : 'border',
                        direction : this.options.hitConfig.direction || [],
                        offset    : this.options.hitConfig.offset || 0
                    });

                    // 碰撞后
                    if(result){
                        if(this.activeObj.hitElement) this.activeObj.hitElement.classList.remove(this.options.hitClass);
                        this.activeObj.prevHitElement = this.activeObj.hitElement;
                        this.activeObj.hitElement     = elm;
                        this.activeObj.hitIndex       = index;
                        this.activeObj.hitPosition    = result;
                        this.activeObj.hitElement.classList.add(this.options.hitClass);
                        return true;
                    }
                }
                // 包含contain
                if(this.options.hitConfig.contain){
                    // 碰撞检测
                    let result = this.cursorHitTest(elm,e,{
                        type:'contain',
                    });

                    // 碰撞后
                    if(result){
                        if(this.activeObj.hitElement) this.activeObj.hitElement.classList.remove(this.options.hitClass);
                        this.activeObj.prevHitElement = this.activeObj.hitElement;
                        this.activeObj.hitElement     = elm;
                        this.activeObj.hitIndex       = index;
                        this.activeObj.hitPosition    = result;
                        this.activeObj.hitElement.classList.add(this.options.hitClass);
                        return true;
                    }
                }

                return false;

            })

            // // 如果没有碰撞到的元素，则已经出了可控区域
            // if(!hasHitElement){
            //     if(this.activeObj.hitElement) this.activeObj.hitElement.classList.remove(this.options.hitClass);
            // }

            console.log('hitCheck is' + this.activeObj.hitElement)

        }

        // 父元素滚动条自动滚动，通过位移量进行节流
        if(!!this.options.dragScroll && !!this.parentElement && outLimit.x){

            console.log('dragScroll')

            let result = this.cursorHitTest(this.parentElement,e,{
                type:'border',
                direction:['left','right'],
                offset:-50
            });

            console.log(result)
            // 向右
            if(result.indexOf('right')>-1 || result.indexOf('left')>-1){

                this.dragScrollDir = result.indexOf('right')>-1 ? 'right' : 'left';

                if(!this.dragScrollTimer){
                    this.timer(()=>{
                        return this.dragScrollParent()
                    },1000/60,1)
                }

            }
            else{
                this.clearTimer();
            }

        }

        // 拖动回调
        this.options.move(this.dataTransfer,this.activeObj,this.elements);

    }

    /**
     * 拖动结束
     */
    endHandler(e){

        if(!this.activing) return;

        Object.assign(this.dataTransfer,{
            ex:this.dataTransfer.dx,
            ey:this.dataTransfer.dy
        });

        if(this.moveing){

            // 拖动结束  回调
            this.options.end(this.dataTransfer,this.activeObj);

            this.options.dragable && this.resetElement();

            if(this.options.dragScroll){
                this.clearTimer();
            }
        }


        this.resetData();
    }

    // 定时器
    timer(callback,time){

        if(!callback()) return;

        clearTimeout(this.dragScrollTimer);
        this.dragScrollTimer = setTimeout(()=>{
            this.timer(callback,time);
        },time)

    }

    // 清理计时器
    clearTimer(){
        clearTimeout(this.dragScrollTimer)
        this.dragScrollTimer =undefined;
    }

    // 父元素自动滚动
    dragScrollParent(){

        // console.log(this.dragScrollDir,this.parentElement.scrollLeft)

        if(this.dragScrollDir==='left'){
            // console.log('scroll 2 left')
            Object.assign(this.dataTransfer,{
                dx:this.dataTransfer.dx-this.options.moveStep,
            });
            // console.log(this.dataTransfer.dx,this.dataTransfer.dy)
            this.options.move(this.dataTransfer,this.activeObj);

            this.parentElement.scrollLeft -=this.options.moveStep;
            if(this.parentElement.scrollLeft===0){
                this.clearTimer();
                return false;
            }
            return true;
        }
        else if(this.dragScrollDir==='right'){
            Object.assign(this.dataTransfer,{
                dx:this.dataTransfer.dx+this.options.moveStep,
            });
            this.options.move(this.dataTransfer,this.activeObj);

            if(this.parentElement.scrollLeft+this.parentElement.offsetWidth>=this.parentElement.scrollWidth){
                this.clearTimer();
                return false;
            }
            this.parentElement.scrollLeft +=this.options.moveStep;
            // console.log(this.parentElement.scrollLeft)
            return true;
        }

        return false;

    }

    /**
     * 复位数据 准备下一次拖动
     */
    resetData(){
        this.activing = false;
        this.moveing = false;
        this.limitX = 0; // 事件节流
        this.limitY = 0; // 事件节流
    }

    // 初始化元素拖拽样式
    initElement(){

        let elmRect = this.activeObj.element.getBoundingClientRect();

        // console.log(elmRect)

        if( this.isIncluded(['td','th'],this.activeObj.element.tagName.toLowerCase()) ){
            this.dragElement = document.createElement('div');
            this.dragElement.style.width = elmRect.width +'px';
            this.dragElement.style.height = elmRect.height +'px';
            this.dragElement.style.border = '1px dashed red';
        }
        else{
            this.dragElement = this.activeObj.element.cloneNode(true);
        }

        this.dragElement.classList.add('__draghandler');
        this.dragElement.innerText = this.activeObj.element.innerText;
        this.dragElement.style.position = 'fixed';
        this.dragElement.style.zIndex = '10000000';
        this.dragElement.style.opacity = '.5';
        this.dragElement.style.cursor = 'move';
        this.dragElement.style.left = elmRect.left+'px' || 0;
        this.dragElement.style.top = elmRect.top+'px' || 0;
        document.body.appendChild(this.dragElement)
    }

    // 复位元素
    resetElement(){
        this.activeObj.hitElement && this.activeObj.hitElement.classList.remove(this.options.hitClass);
        this.activeObj.hitElement = undefined;
        this.activeObj.prevHitElement = undefined;

        document.body.removeChild(this.dragElement);
        this.dragElement = undefined;
    }

    // 移动元素
    moveElement(){

        // console.log(this.dataTransfer.ol + this.dataTransfer.dx,this.dataTransfer.ot + this.dataTransfer.dy)
        this.dragElement.style.left = this.dataTransfer.ol + this.dataTransfer.dx +'px';
        this.dragElement.style.top = this.dataTransfer.ot + this.dataTransfer.dy +'px';

    }

    // 放置元素
    dropElement(){
    }

}

export default drag;
