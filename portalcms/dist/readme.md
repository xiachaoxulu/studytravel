<!--
* @Created Date       : 2016-11-14T11:13:25+08:00
* @Last Modified time : 2016-11-15T16:08:54+08:00
 -->



##  商户管理系统


| 功能模块 | 前端   | 后端   | 备注 |
|:---------|:-------|:-------|:-----|
| 首页     | 刘宝至 | 刘文强 |      |
| 产品页   | 刘宝至 | 无     |      |
| 组件     | 夏超   | 无     |      |



### 文档结构

  index.html                                                             页面首页
  package.json                                                           依赖组件包
  fis.conf.js                                                            项目运行，打包
    app                                                                  项目文件夹
      component                                                          组件
        city                                                             城市组件
        dialog                                                           对话框
        footer                                                           页面底部
        head                                                             页面头部
        head2                                                            页面头部
        loading                                                          加载状态
        logindialog                                                      登录框
        progress                                                         进度条
        video                                                            视频（开发中）
      config                                                             配置
        api.js                                                           接口
      page                                                               页面文件夹
        404                                                              错误页面
        center                                                           个人中心
        changePassword                                                   修改密码
        product                                                          产品页
        protocol                                                         协议
        register                                                         注册页面
      tool                                                               工具类
        tool.js                                                          公用方法。例如ajax，mouse function click verify...
    build
    dist
    lib
    node_modules
    resource

# TO DO LIST

1.目前版本含有模块。
  (1)首页
  (2)产品介绍页
2.后期功能迭代
  (1)登录
  (2)注册
  (3)在线购买
  (4)在线视频
