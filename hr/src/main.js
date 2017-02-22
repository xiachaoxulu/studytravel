/**
* @Created Date       : 2016-09-28T10:46:53+08:00
* @Last Modified time : 2016-12-13 18:56:47
*/

import App from './App'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import routerConfig from './config-route'
import apiConfig from './config-api'
import uiConfig from './config-ui'
import tool from 'libs/tool'
import keen from 'components/keen-ui.min.js'

Vue.__HttpMethod = 'POST';

Vue.__Basepath = '/';
 
 // 
// Vue.__Basepath = 'http://10.0.10.1:11000/';// 前端接口测试服务器
// Vue.__Basepath = 'http://10.0.10.65:8080/';// 前端接口测试服务器
 
// Vue.__Basepath   = 'http://192.168.1.37:8090/'; // 尚斌
// Vue.__Basepath   = 'http://192.168.1.37:8020/'; // 尚斌
// Vue.__Basepath   = 'http://192.168.1.15:8090/'; // 尚斌

// Vue.__Basepath   = 'http://192.168.1.40:8080/'; // 刘春霖

// Vue.__Basepath   = 'http://192.168.1.5:8889/'; // 王兴超/
// Vue.__Basepath   = 'http://10.152.64.13:8981/'; // 孙彦飞
// Vue.__Basepath   = 'http://192.168.1.52:8080/'; // zhihui
// Vue.__Basepath   = 'http://192.168.1.52:6080/'; // zhihui
// Vue.__Basepath   = 'http://192.168.1.15:8081/'; // 测试服
// Vue.__Basepath   = 'http://192.168.1.26:8080/'; // 新测试服

// Vue.__Developing = true;  // 开发中，mock可用
Vue.__Developing = false; // 关闭开发选项，准备发布，强制停用所有mock


Vue.use(keen)
Vue.use(uiConfig)

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(tool)

// set global arg
Vue.apiConfig = apiConfig;


// create router
const router = new VueRouter({
  history: false,
  hashbang: true
})

Vue.router = router;

// configure router
routerConfig(router)
router.start(App, '#app')
