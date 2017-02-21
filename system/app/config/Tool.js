Ext.define('Web.config.Tool', {
    requires: [
        'Web.config.Config'
    ],
    statics: {
        //解析形如 "~/" 的api路径
        parseApiUrl: function(url) {
            return url.replace(/^~\//, Web.config.Config.apiBasicUrl + "/");
        },
        //ajax请求 --> .then
        ajaxPost: function(url, params, flagLoading) {
            var self = this,
                urlFull = this.parseApiUrl(url),
                method = Web.config.Config.flagDebug ? 'GET' : 'POST',
                deferredSucc = new Ext.Deferred();
            //loading
            //ajax
            Ext.Ajax.request({
                url: urlFull,
                params: params,
                method: method,
                useDefaultXhrHeader: false, //cross-origin
                success: function(result) {
                    //parse response
                    result = JSON.parse(result.responseText);

                    console.log('ajaxsucc:-------->', {
                        url: url,
                        params: params,
                        data: result
                    });
                    //resolve
                    if (result.success == "false") {
                        var error = {
                            "msg": result.err_msg,
                            "code": result.err_code
                        };
                        deferredSucc.reject(error);
                        if (error.code == 1) {
                            Ext.Msg.show({
                                title: '提示',
                                message: "已脱机超时,是否重新登录?",
                                buttons: Ext.Msg.YESNO,
                                icon: Ext.Msg.QUESTION,
                                fn: function(btn) {
                                    if (btn === 'yes') {
                                        location.reload();
                                    }
                                }
                            });

                        } else {
                            Ext.Msg.alert('提示', error.msg || '操作失败');
                        }
                    } else {
                        deferredSucc.resolve(result.result);
                    }
                },
                failure: function(error) {

                    //deferredSucc.reject(error);


                    //tip
                    Ext.Msg.alert('提示', '服务器异常');
                }
            });
            return deferredSucc.promise;
        }
    }
});