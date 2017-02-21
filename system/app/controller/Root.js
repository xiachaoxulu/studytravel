/**
 * The main application controller. This is a good place to handle things like routes.
 * 这是主程序的控制器，这里适合做类似路由转发这样的事情
 */
Ext.define('Web.controller.Root', {
    extend: 'Ext.app.Controller',
    uses: ['Web.view.login.Login', 'Web.view.main.container.Container'],
    /**
     * 初始化事件
     */
    onLaunch: function() {
        Ext.setGlyphFontFamily('FontAwesome');
        //屏蔽浏览器右键行为
        Ext.getDoc().on('contextmenu', function(e) {
            e.stopEvent();
        })
        this.viewport = Ext.create('Ext.container.Viewport', {
            layout: 'fit'

        });


        this.loadLoginView();
        this.loadMainView();

        //this.viewport.add(this.login);
        // 
        //调试
        // this.viewport.add(this.main);

        var self = this;
        Web.logout = function(){
            self.onLogout();
        }


    },

    loadLoginView:function(){

        this.login = new Web.view.login.Login({
            // session: session,
            listeners: {
                scope: this,
                login: 'onLogin'
            }
        });

    },
    loadMainView:function(){
        this.main = new Web.view.main.container.Container({ //用户信息传入视图         
            viewModel: {
                data: {
                    currentUser: this.user
                }
            }
        });
    },


    /**
     * logincontroller 的 "login" 事件回调.
     * @param user
     * @param loginManager
     */
    onLogin: function(loginController, username) {
        Ext.user = username;
        this.login.destroy();
        this.loadMainView();
        this.viewport.add(this.main);
    },
    // 退出
    onLogout:function(){
        this.main.destroy();
        this.loadLoginView();
        this.viewport.add(this.login);
    }
});