/*

验证元素： input:text,checkbox,radio,file

1. 输入框

2. radio

3. checkbox

4. switch

5. file

6. time

7. select


验证语法：

required      >> 必填
maxNum:number >> 最大值
minNum:number >> 最小值
maxStr:number >> 最大长度
minStr:number >> 最小长度

file:String   >> 文件格式 Doc,Excel,Png/Jpg/Gif
mult:number   >> 多选 mult:3-5

format:String >> 格式验证 date('yy-mm-dd'), time('hh:mm:ss'), email , phone ,


示例代码：

    <form vali-submit="submitBt" vali-reset="resetBt" vali-submit-call="submited">


        <div vali-step="1">

            <input type="text" vali="required|max:5|min:3" vali-msg="成功||失败">

            <input type="radio" vali="required|multi:2" vali-msg="成功||失败">


        </div>

        <div vali-step="2">

            <input type="text" vali="required|max:5|min:3" vali-msg="成功||失败">

            <input type="radio" vali="required|multi:2" vali-msg="成功||失败">

        </div>

        <div>
            组验证
            <input name='group1' type="text" vali="required|max:5|min:3" vali-msg="成功||失败">
            <input name='group1' type="text" >
            <input name='group1' type="text" >
            <input name='group1' type="text" >


        </div>

        <button vali-step>下一步</button>

        <button id="submitBt">提交</button>
        <button id="resetBt">重置</button>



    </form>

    var _this = this;
    $('form').formValidation({
        super:_this,
        step:true,
        stepCallback:function(step){

        }
    });



 */
/**
 * 验证表达式
 * @param  {String}  type   验证类型
 * @param  {String}  val    验证字符串
 * @param  {String}  format 格式
 * @return {Boolean}        [description]
 */
function _is(type, val, format) {

    // 邮箱
    if (type == 'email') {
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(val)
    }
    // 手机号
    if (type == 'mobile') {
        return /^[1][0-9]{10}$/.test(val)
    }
    // 固话 支持：010-12345678、0912-1234567、(010)-12345678、(0912)1234567、(010)12345678、(0912)-1234567、01012345678、09121234567
    if (type == 'phone') {
        return /^(^0\d{2}-?\d{8}$)|(^0\d{3}-?\d{7}$)|(^0\d2-?\d{8}$)|(^0\d3-?\d{7}$)$/.test(val)
    }

    // 身份证
    if (type == 'id') {

    }
    // 时间格式
    if (type == 'time') {

    }
    // 日期格式 * 2012-05-14、2012/05/6、2012.5.14、20120528
    if (type == 'date') {
        return /^[1-9]\d{3}([-|\/|\.])?((0\d)|([1-9])|(1[0-2]))\1(([0|1|2]\d)|([1-9])|3[0-1])$/.test(val)
    }
    // 汉字
    if (type == 'cn') {
        return /^[\u4e00-\u9fa5]{0,}$/.test(val)
    }
    // 英文
    if (type == 'en') {
        return /^[a-zA-Z]*$/.test(val)
    }

}


// (function($) {

    // 去除字符串前后空格
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    }

/*    // Plugin definition
    $.fn.formValidation = function(option) {
        return this.each(function() {
            var $this = $(this);

            return new FormValidation($this, option || {});

        });
    };
*/
    /**
     * 表单验证实例
     * @param  {Object} _config         配置项
     * @param  {String} _formBtSubmit   提交按钮id
     * @param  {String} _formBtReset    重置按钮id
     * @param  {String} _formCallSubmit 提交验证成功后回调
     * @param  {String} _formCallReset  重置回调
     * @param  {Array}  _inputList      验证元素列表
     * @return {Function}
     */
    window.FormValidation = function(form,options) {


        var _config = {
            super: null
        }

        var _formEl, // 表单元素
            _formBtSubmit, // 提交按钮
            _formBtReset, // 重置按钮
            _formCallSubmit, // 提交回调
            _formCallReset, // 重置回调
            _inputList = [] // 元素列表
        ;
        /**
         * 表单元素
         * @param {jquery object} el        [元素]
         * @param {string} type             [元素类型 text,radio,checkbox,file]
         * @param {string} validator        [验证表达式]
         * @param {string} msg              [验证提示信息：通过|失败|提示]
         */
        function FElement(data) {


            let _this       = this;
            this.elwrap     = data.elwrap; // 元素父层包裹
            this.elements   = data.elements; // 相同name的元素集
            this.type       = data.type;     // 元素类型
            this.msg        = data.msg && data.msg.split('||'); // 提示
            this.valiString = data.validator; // 验证规则
            this.tipMsg     = data.tip; // 提示信息
            this.validators = [];

            // 删除vali中的特殊元素标记
            this.valiString = (this.valiString.replace('radio', '')).replace('checkbox', '');

            // 拆分数组去除空项，兼容多出|的情况
            this.valiString.trim().split('|').forEach(function(item) {
                item != '' && _this.validators.push(item);
            })

            // console.log(this.validators)

            this.init();

        }

        /**
         * 初始化
         * @return {[type]} [description]
         */
        FElement.prototype.init = function() {

            var _this = this;

            // 获得焦点，显示提示信息
            this.elements.off('focus.validator').on('focus.validator', function() {
                _this.showTip('info');
            })

            // 失去焦点，开启验证，延迟200ms验证，方便js赋值
            this.type != 'checkbox' && this.elements.off('blur.validator').on('blur.validator', function() {
                console.log('blur')
                setTimeout(()=>{
                    _this.getValidate();
                },200)
            })


            // 添加提示层
            if (this.msg) {

                var left = this.elwrap[0].offsetLeft; // - 200 / 2 + this.elements[0].offsetWidth / 2
                var bottom = 30;

                this.tip = $('<div class="tooltip scale-transition top" style="opacity:1;left:' + left + 'px;bottom:' + bottom + 'px;" ><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>');
                this.tip.hide();
                this.elwrap.after(this.tip);
                this.tipTxt = this.tip.find('div.tooltip-inner');
            }


            // console.log(this.tipTxt)

        }

        /**
         * 验证
         * @param  {string} valiStr 验证表达式
         * @return {[type]}         [description]
         */
        FElement.prototype.validate = function(valiStr) {


            var _passed = true,
                _type = valiStr.split(':')[0],
                _value = valiStr.split(':')[1];

            // 必填
            if (_type == 'required') {

                if (this.type == 'text' || this.type == 'password' || this.type == 'file' || this.type == 'textarea') {

                    this.elements.each(function(index,item) {

                        console.log(item,item.value);
                        let val = $(this).val();

                        // console.log(val)

                        _passed = val && val != '' ? true : false;

                        // console.log($(this),_passed)

                        if (_passed) return _passed;

                    })

                    return _passed;

                } else if (this.type == 'checkbox' || this.type == 'radio') {


                    let len = 0;

                    this.elements.each(function() {

                        !!$(this).is(':checked') ? len++ : 1;

                    })

                    console.log('required', len > 0)

                    return len > 0;

                } else {
                    return _passed;
                }


            }
            // 多选
            else if (_type == 'multi') {

                let min = _value.split('-')[0] || 0;
                let max = _value.split('-')[1] || this.elements.length;

                // 只对checkbox起作用
                if (this.type == 'checkbox') {


                    let len = 0;

                    this.elements.each(function() {

                        !!$(this).is(':checked') ? len++ : 1;

                    })
                    console.log(len, min, max)

                    return len >= min - 0 && len <= max - 0;

                } else {
                    return true;
                }


            }

            // 最大值/最小值
            else if (_type == 'maxNum' || _type == 'minNum') {

                this.elements.each(function() {

                    console.warn($(this).val())

                    let val = $(this).val()-0;

                    console.log(isNaN(val))

                    if (isNaN(val)) {
                        _passed = false;
                        return false;
                    }

                    // 最大值
                    if (_type == 'maxNum' && val > _value - 0) {
                        _passed = false;
                        return _passed;
                    }
                    // 最小值
                    else if (_type == 'minNum' && val < _value - 0) {
                        _passed = false;
                        return _passed;
                    }

                })

                return _passed;

            }

            else if(_type=='float'){

                let pass = 0;

                this.elements.each(function() {

                    let val = $(this).val();

                    let floatStr = val.split('.')[1];

                    // 是数字 且 （没有小数 或 小数长度小于_value ）
                    if ( (!floatStr || floatStr.length <= _value) && Math.abs(val)>=0){
                        pass++;
                    }

                    // return;

                    // let pow = Math.pow(10,_value); //float:1 1位小数 float:2 两位小数， 将小数转为整数1，则验证数值*Math.pow(10,_value)

                    // console.log(val*pow)

                    // let re = val * pow % 1;

                    // let result = re < 0.000000000001 || re > 0.999999999999? parseInt(val*pow) : val*pow;

                    // if ( result % 1==0) pass++;

                })

                return pass==this.elements.length ? true :false;

            }

            else if(_type=='floatStep'){

                let pass = 0;

                this.elements.each(function() {

                    let val = $(this).val();
                    if (val * 10000000000 % (_value * 10000000000) == 0) pass++;

                })

                return pass==this.elements.length ? true :false;

            }

            else if(_type=='float'){

                let pass = 0;

                this.elements.each(function() {

                    let val = $(this).val();

                    let pow = Math.pow(10,_value); //float:1 1位小数 float:2 两位小数， 将小数转为整数1，则验证数值*Math.pow(10,_value)

                    if (val*pow % 1==0) pass++;

                })

                return pass==this.elements.length ? true :false;

            }

            // 最大长度/最小长度
            else if (_type == 'maxStr' || _type == 'minStr') {

                this.elements.each(function() {

                    let val = $(this).val()

                    console.log(val)

                    // 最大值
                    if (_type == 'maxStr' && val.length > _value - 0) {
                        _passed = false;
                        return _passed;
                    }
                    // 最小值
                    else if (_type == 'minStr' && val.length < _value - 0) {
                        _passed = false;
                        return _passed;
                    }

                })

                return _passed;

            }

            // format 格式
            else if (_type == 'format') {

                this.elements.each(function() {

                    let val = $(this).val()

                    // email
                    if (_value == 'email') {
                        _passed = _is('email', val);
                        return _passed;
                    }
                    // mobile
                    else if (_value == 'mobile') {
                        _passed = _is('mobile', val);
                        return _passed;
                    }
                    // 日期
                    else if (_value.indexOf('date')>-1){

                        let dateFormater = _value

                        console.log(_value)
                        console.log(/\[(.*?)\]/.exec(_value))

                        // /\[{./w/s}\]/
                        // /(\[)(/w+)(\])/

                    }

                })

                return _passed;

            }


        }

        /**
         * 获取验证结果
         */
        FElement.prototype.getValidate = function() {

            let _this = this;

            // 如果为非必选项且没有选值，则直接返回true，跳过验证
            if (_this.valiString.indexOf('required') <0) {

                console.log('no required',_this.type)

                let _len = 0;

                if (_this.type == 'text' || _this.type == 'textarea') {


                    console.log(_this.elements)

                    _this.elements.each(function() {

                        console.log('$(this).val()',$(this).val())

                        if ($(this).val()) _len++;

                    })


                } else if (_this.type == 'checkbox' || _this.type == 'radio') {

                    _this.elements.each(function() {

                        if ($(this).is(':checked')) _len++;

                    })

                }

                // 如果所有元素未选择，则跳过验证
                if (_len == 0) {
                    _this.showTip('hide');
                    return true;
                }

            }

            // 遍历所有验证表达式
            let vlen = 0;
            _this.validators.forEach(function(item, index) {

                if(_this.validate(item))vlen++;

            })

            // console.log(vlen, _this.validators.length)

            // 全部验证成功，则验证通过
            if (vlen == _this.validators.length) {
                _this.showTip('hide');
                return true;
            } else {
                _this.showTip('failed');
                return false;
            }

        }

        /**
         * 显示提示信息
         * @param  {[type]} type [提示类型:info,success,failed]
         * @return {[type]}      [description]
         */
        FElement.prototype.showTip = function(type) {



            let _this = this;

            if (type == 'info') {
                this.elwrap.parent().removeClass('has-error');
                if (!this.msg) return;

                this.tipTxt.text(this.msg[0]);
                this.tip.fadeIn();
            } else if (type == 'success') {
                if (!this.msg) return;
                this.tip.hide();
            } else if (type == 'failed') {
                this.elwrap.parent().addClass('has-error');

                if (!this.msg) return;
                this.tipTxt.text(this.msg[1] || this.msg[0]);
                this.tip.hide().delay(0).fadeIn();
            } else if (type == 'hide') {
                this.elwrap.parent().removeClass('has-error');

                if (!this.msg) return;
                this.tip.finish().hide();
            }

        }

        // 卸载验证元素

        FElement.prototype.uninstall = function(){
            this.tip.remove();
        }

        /**
         * 获取表单验证元素
         * @return {[type]} [description]
         */
        function getElement() {


            // get input
            _formEl.find('*[vali]').each(function(index, elm) {

                let elwrap = $(this);
                let elements = $(this);
                let type = elements.attr('type');

                // 获取所有同name的input
                let group = _formEl.find('input[name="' + $(this).attr('name') + '"]');

                if (group.length > 0) elements = group;

                // 如果elments不是input，则获取该元素下的input
                if(!elements.is(':input')){
                    elements = elements.find('input')
                }

                // 获取最新元素type
                type = elements.attr('type') || 'text'

                // 特殊type
                if ($(this).attr('vali').indexOf('radio') > -1){
                    type = 'radio'
                }
                else if ($(this).attr('vali').indexOf('checkbox') > -1){
                    type = 'checkbox'
                }

                // console.log(elements)

                _inputList.push(new FElement({
                    elwrap: elwrap,
                    elements: elements, // 注意 组验证 时，需要选取所有同name元素，组验证只需要设置第一个元素大的验证语法
                    type: type,
                    validator: $(this).attr('vali'),
                    msg: $(this).attr('vali-msg'),
                    tip: $(this).attr('tip') || ''
                }))


                // console.warn(_inputList.length)

            });

            // get buttons

            let _submitAttr = _formEl.attr('vali-submit')
            let _resetAttr = _formEl.attr('vali-reset')

            _formBtSubmit = _submitAttr ? _formEl.find('#' + _submitAttr.split('|')[0]) : undefined;
            _formBtReset = _resetAttr ? _formEl.find('#' + _resetAttr.split('|')[0]) : undefined;

            // get callback
            _formCallSubmit = _submitAttr ? _submitAttr.split('|')[1] : undefined;
            _formCallReset = _resetAttr ? _resetAttr.split('|')[1] : undefined;

            console.log(_formCallSubmit, _formCallReset)

            // 添加监听事件
            _formBtSubmit && _formBtSubmit.off('click.validator').on('click.validator', function() {

                var _passed = 0;

                let results = [];

                _inputList.forEach(function(item) {
                    if (item.getValidate()) {
                        _passed++;
                        results.push({
                            passed:true,
                            msg:item.msg,
                            vali:item.valiString,
                            tip: item.tipMsg
                        })
                    }
                    else{
                        results.push({
                            passed:false,
                            msg:item.msg,
                            vali:item.valiString,
                            tip: item.tipMsg
                        })
                    }
                })

                // callback(results);

                if (_passed == _inputList.length) {

                    if(_formCallSubmit){
                        _config.super && _config.super.$dispatch(_formCallSubmit);
                    }else{
                        _config.super.$emit('successed',results)
                    }

                    console.warn('通过')
                } else {
                    _config.super.$emit('failed',results)
                    console.warn('失败')
                }

            })

            _formBtReset && _formBtReset.off('click.validator').on('click.validator', function() {

                _inputList.forEach(function(item) {
                    item.showTip('hide');
                    _formEl[0].reset();
                })

                // 触发父层重置事件，触发子组件重置事件
                if (_formCallReset) {
                    _config.super && _config.super.$dispatch(_formCallReset) && _config.super.$broadcast('formReset');
                } else {
                    _config.super.$emit('reset')
                }


            })

        }

        for (var i in options) {
            _config[i] = options[i];
        }

        _formEl = form;

        getElement();


        this.refresh = function(){

            _inputList.forEach(function(item) {
                item.uninstall();
            })

            _inputList = [];
            getElement();
            console.log('refresh validators')
        }


    };



// }(jQuery));
