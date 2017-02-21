/**
* @Created Date       : 2016-10-24T10:11:03+08:00
* @Last Modified time : 2016-11-29T17:55:58+08:00
*/



var mustache = require('../../../lib/mustache.min.js')
var tool = require('../../tool/Tool.js')

var citys = {
  "domestic": [{ name: "ABCDE", charSort: true }, { name: "FGHJ", charSort: false }, { name: "KLMNP", charSort: false }, { name: "QRSTW", charSort: false }, { name: "XYZ", charSort: false }],
  "data": {
    "domestic": [{
      "title": "ABCDE",
      "cityList": [{ "char": "A", "list": [{ "cityurl": "aba", "name": "阿坝" }, { "cityurl": "anji", "name": "安吉县" }, { "cityurl": "anshun", "name": "安顺" }, { "cityurl": "anshan", "name": "鞍山" }, { "cityurl": "anqing", "name": "安庆" }, { "cityurl": "ankang", "name": "安康" }, { "cityurl": "aershan", "name": "阿尔山市" }, { "cityurl": "anyang", "name": "安阳" }, { "cityurl": "aletai", "name": "阿勒泰" }, { "cityurl": "alashan", "name": "阿拉善盟" }] }, { "char": "B", "list": [{ "cityurl": "beijing_city", "name": "北京" }, { "cityurl": "beihai", "name": "北海" }, { "cityurl": "benxi", "name": "本溪" }, { "cityurl": "baoding", "name": "保定" }, { "cityurl": "baoji", "name": "宝鸡" }, { "cityurl": "baoting", "name": "保亭" }, { "cityurl": "baishan", "name": "白山" }, { "cityurl": "baotou", "name": "包头" }, { "cityurl": "bangbu", "name": "蚌埠" }, { "cityurl": "buerjin", "name": "布尔津县" }, { "cityurl": "boao", "name": "博鳌" }, { "cityurl": "baoshan", "name": "保山" }, { "cityurl": "boluo", "name": "博罗县" }, { "cityurl": "baise", "name": "百色" }] }, { "char": "C", "list": [{ "cityurl": "chengdu", "name": "成都" }, { "cityurl": "chongqing_city", "name": "重庆" }, { "cityurl": "changsha", "name": "长沙" }, { "cityurl": "changzhou", "name": "常州" }, { "cityurl": "changchun", "name": "长春" }, { "cityurl": "changbaishan", "name": "长白山 白山" }, { "cityurl": "changde", "name": "常德" }, { "cityurl": "chenzhou", "name": "郴州" }, { "cityurl": "chifeng", "name": "赤峰" }, { "cityurl": "chishui", "name": "赤水市" }, { "cityurl": "chaozhou", "name": "潮州" }] }, { "char": "D", "list": [{ "cityurl": "dali", "name": "大理" }, { "cityurl": "dalian", "name": "大连" }, { "cityurl": "dandong", "name": "丹东" }, { "cityurl": "daocheng", "name": "稻城县" }, { "cityurl": "dongguan", "name": "东莞" }, { "cityurl": "dunhuang", "name": "敦煌市" }, { "cityurl": "datong", "name": "大同" }, { "cityurl": "dujiangyan", "name": "都江堰市" }, { "cityurl": "diqing", "name": "迪庆" }, { "cityurl": "dongying", "name": "东营" }, { "cityurl": "danxia", "name": "丹霞山" }] }, { "char": "E", "list": [{ "cityurl": "emeishan", "name": "峨眉山市" }, { "cityurl": "ejina", "name": "额济纳旗" }, { "cityurl": "enshi", "name": "恩施自治州" }, { "cityurl": "erdaobaihe", "name": "二道白河" }, { "cityurl": "eerduosi", "name": "鄂尔多斯" }, { "cityurl": "enshishi", "name": "恩施市" }, { "cityurl": "enping", "name": "恩平市" }] }],
      "charSort": true
    }, {
      "title": "FGHJ",
      "cityList": [{ "char": "F", "list": [{ "cityurl": "fenghuang", "name": "凤凰县" }, { "cityurl": "fuzhou_fujian", "name": "福州" }, { "cityurl": "foshan", "name": "佛山" }, { "cityurl": "fangchenggang", "name": "防城港" }, { "cityurl": "fuxianhu", "name": "抚仙湖" }, { "cityurl": "fengcheng_dandong", "name": "凤城市" }, { "cityurl": "fuyang_anhui", "name": "阜阳" }, { "cityurl": "fushun", "name": "抚顺" }, { "cityurl": "fogang", "name": "佛冈县" }] }, { "char": "G", "list": [{ "cityurl": "guangzhou", "name": "广州" }, { "cityurl": "guilin", "name": "桂林" }, { "cityurl": "guiyang", "name": "贵阳" }, { "cityurl": "gulangyu", "name": "鼓浪屿" }, { "cityurl": "ganzi", "name": "甘孜" }, { "cityurl": "guangyuan", "name": "广元" }, { "cityurl": "ganzhou", "name": "赣州" }, { "cityurl": "guangan", "name": "广安" }] }, { "char": "H", "list": [{ "cityurl": "hangzhou", "name": "杭州" }, { "cityurl": "huangshan", "name": "黄山" }, { "cityurl": "huizhou_guangdong", "name": "惠州" }, { "cityurl": "haerbin", "name": "哈尔滨" }, { "cityurl": "haikou", "name": "海口" }, { "cityurl": "hefei", "name": "合肥" }, { "cityurl": "huzhou", "name": "湖州" }, { "cityurl": "huhehaote", "name": "呼和浩特" }, { "cityurl": "hengdian", "name": "横店" }, { "cityurl": "huidong_huizhou", "name": "惠东县" }, { "cityurl": "heyuan", "name": "河源" }] }, { "char": "J", "list": [{ "cityurl": "jinan", "name": "济南" }, { "cityurl": "jiuzhaigou", "name": "九寨沟县" }, { "cityurl": "jiaxing", "name": "嘉兴" }, { "cityurl": "jiujiang", "name": "九江" }, { "cityurl": "jiangmen", "name": "江门" }, { "cityurl": "jinhua", "name": "金华" }, { "cityurl": "jinzhou", "name": "锦州" }, { "cityurl": "jilin_city", "name": "吉林" }, { "cityurl": "jingdezhen", "name": "景德镇" }, { "cityurl": "jiayuguan", "name": "嘉峪关" }, { "cityurl": "jiaozuo", "name": "焦作" }, { "cityurl": "jinzhong", "name": "晋中" }, { "cityurl": "jiuhuashan", "name": "九华山" }, { "cityurl": "jiashan", "name": "嘉善县" }] }],
      "charSort": false
    }, {
      "title": "KLMNP",
      "cityList": [{ "char": "K", "list": [{ "cityurl": "kunming", "name": "昆明" }, { "cityurl": "kaifeng", "name": "开封" }, { "cityurl": "kangding", "name": "康定市" }, { "cityurl": "kunshan", "name": "昆山市" }, { "cityurl": "kaili", "name": "凯里市" }, { "cityurl": "keshiketeng", "name": "克什克腾旗" }, { "cityurl": "kanasi", "name": "喀纳斯" }, { "cityurl": "kuandian", "name": "宽甸" }, { "cityurl": "kaiping", "name": "开平市" }] }, { "char": "L", "list": [{ "cityurl": "lijiang", "name": "丽江" }, { "cityurl": "luguhu", "name": "泸沽湖,丽江" }, { "cityurl": "luoyang", "name": "洛阳" }, { "cityurl": "lanzhou", "name": "兰州" }, { "cityurl": "lasa", "name": "拉萨" }, { "cityurl": "leshan", "name": "乐山" }, { "cityurl": "langzhong", "name": "阆中市" }, { "cityurl": "libo", "name": "荔波县" }, { "cityurl": "lianyungang", "name": "连云港" }, { "cityurl": "liuzhou", "name": "柳州" }, { "cityurl": "lishui", "name": "丽水" }, { "cityurl": "lixian_aba", "name": "理县" }, { "cityurl": "linyi", "name": "临沂" }, { "cityurl": "lingshui", "name": "陵水" }, { "cityurl": "linan", "name": "临安市" }] }, { "char": "M", "list": [{ "cityurl": "moganshan", "name": "莫干山" }, { "cityurl": "mianyang", "name": "绵阳" }, { "cityurl": "meizhou", "name": "梅州" }, { "cityurl": "maoming", "name": "茂名" }, { "cityurl": "mile", "name": "弥勒县" }, { "cityurl": "mudanjiang", "name": "牡丹江" }, { "cityurl": "meishan", "name": "眉山" }, { "cityurl": "mao", "name": "茂县" }] }, { "char": "N", "list": [{ "cityurl": "nanjing", "name": "南京" }, { "cityurl": "ningbo", "name": "宁波" }, { "cityurl": "nanning", "name": "南宁" }, { "cityurl": "nanchang", "name": "南昌" }, { "cityurl": "nantong", "name": "南通" }, { "cityurl": "nanchong", "name": "南充" }, { "cityurl": "nankunshan", "name": "南昆山" }, { "cityurl": "nanping", "name": "南平" }, { "cityurl": "nanyang", "name": "南阳" }, { "cityurl": "nanxun", "name": "南浔镇" }, { "cityurl": "nanaodao", "name": "南澳岛" }, { "cityurl": "ningde", "name": "宁德" }, { "cityurl": "neijiang", "name": "内江" }] }, { "char": "P", "list": [{ "cityurl": "pingyao", "name": "平遥县" }, { "cityurl": "panjin", "name": "盘锦" }, { "cityurl": "putuoshan", "name": "普陀山" }, { "cityurl": "penglai", "name": "蓬莱市" }, { "cityurl": "putian", "name": "莆田" }, { "cityurl": "pingtan", "name": "平潭县" }, { "cityurl": "panzhihua", "name": "攀枝花" }, { "cityurl": "pingxiang", "name": "萍乡" }, { "cityurl": "puer", "name": "普洱" }, { "cityurl": "puzhehei", "name": "普者黑" }] }],
      "charSort": false
    }, {
      "title": "QRSTW",
      "cityList": [{ "char": "Q", "list": [{ "cityurl": "qingdao", "name": "青岛" }, { "cityurl": "qinhuangdao", "name": "秦皇岛" }, { "cityurl": "qiandaohu", "name": "千岛湖" }, { "cityurl": "qingyuan", "name": "清远" }, { "cityurl": "quanzhou", "name": "泉州" }, { "cityurl": "qionghai", "name": "琼海" }, { "cityurl": "qiandongnan", "name": "黔东南" }, { "cityurl": "qufu", "name": "曲阜市" }, { "cityurl": "qingchengshan", "name": "青城山" }, { "cityurl": "quzhou", "name": "衢州" }, { "cityurl": "qinzhou", "name": "钦州" }] }, { "char": "R", "list": [{ "cityurl": "rizhao", "name": "日照" }, { "cityurl": "ruoergai", "name": "若尔盖县" }, { "cityurl": "rongcheng", "name": "荣成市" }, { "cityurl": "ruili", "name": "瑞丽市" }, { "cityurl": "rushan", "name": "乳山市" }, { "cityurl": "ruyuan", "name": "乳源" }, { "cityurl": "renhua", "name": "仁化县" }, { "cityurl": "rilongzhen", "name": "日隆镇" }, { "cityurl": "rikaze", "name": "日喀则" }, { "cityurl": "renshou", "name": "仁寿县" }] }, { "char": "S", "list": [{ "cityurl": "shanghai_city", "name": "上海" }, { "cityurl": "sanya", "name": "三亚" }, { "cityurl": "shenzhen", "name": "深圳" }, { "cityurl": "suzhou_jiangsu", "name": "苏州" }, { "cityurl": "shenyang", "name": "沈阳" }, { "cityurl": "shuanglang", "name": "双廊镇" }, { "cityurl": "shaoxing", "name": "绍兴" }, { "cityurl": "shijiazhuang", "name": "石家庄" }, { "cityurl": "shaoguan", "name": "韶关" }, { "cityurl": "shantou", "name": "汕头" }, { "cityurl": "shennongjia", "name": "神农架" }, { "cityurl": "sanqingshan", "name": "三清山" }, { "cityurl": "shuhe", "name": "束河古镇" }, { "cityurl": "shengsi", "name": "嵊泗县" }, { "cityurl": "shiyan", "name": "十堰" }] }, { "char": "T", "list": [{ "cityurl": "tianjin_city", "name": "天津" }, { "cityurl": "taiyuan", "name": "太原" }, { "cityurl": "taian", "name": "泰安" }, { "cityurl": "tengchong", "name": "腾冲市" }, { "cityurl": "taishan", "name": "台山市" }, { "cityurl": "tianshui", "name": "天水" }, { "cityurl": "taizhou_zhejiang", "name": "台州" }, { "cityurl": "tangshan", "name": "唐山" }, { "cityurl": "tonglu", "name": "桐庐县" }, { "cityurl": "taizhou_jiangsu", "name": "泰州" }, { "cityurl": "tongli", "name": "同里" }, { "cityurl": "tongren", "name": "铜仁" }] }, { "char": "W", "list": [{ "cityurl": "wuhan", "name": "武汉" }, { "cityurl": "wuzhen", "name": "乌镇" }, { "cityurl": "wuxi", "name": "无锡" }, { "cityurl": "weihai", "name": "威海" }, { "cityurl": "wulumuqi", "name": "乌鲁木齐" }, { "cityurl": "wenzhou", "name": "温州" }, { "cityurl": "weizhou", "name": "涠洲岛" }, { "cityurl": "wuyishan", "name": "武夷山市" }, { "cityurl": "wulong", "name": "武隆县" }, { "cityurl": "wuyuan", "name": "婺源县" }, { "cityurl": "wuhu", "name": "芜湖" }, { "cityurl": "weifang", "name": "潍坊" }, { "cityurl": "wutaishan", "name": "五台山" }, { "cityurl": "wudangshan", "name": "武当山" }, { "cityurl": "wenchang", "name": "文昌" }] }],
      "charSort": false
    }, {
      "title": "XYZ",
      "cityList": [{ "char": "X", "list": [{ "cityurl": "xiamen", "name": "厦门" }, { "cityurl": "xian", "name": "西安" }, { "cityurl": "xitang", "name": "西塘镇" }, { "cityurl": "xichang", "name": "西昌市" }, { "cityurl": "xining", "name": "西宁" }, { "cityurl": "xishuangbanna", "name": "西双版纳" }, { "cityurl": "xianggelila", "name": "香格里拉县" }, { "cityurl": "xunliaowan", "name": "巽寮湾" }, { "cityurl": "xuzhou", "name": "徐州" }, { "cityurl": "xijiangqianhumiaozhai", "name": "西江千户苗寨" }, { "cityurl": "xingcheng", "name": "兴城市" }, { "cityurl": "xinduqiao", "name": "新都桥" }, { "cityurl": "xiangfan", "name": "襄阳" }, { "cityurl": "xiangxi", "name": "湘西" }, { "cityurl": "xianyang", "name": "咸阳" }] }, { "char": "Y", "list": [{ "cityurl": "yangshuo", "name": "阳朔县" }, { "cityurl": "yangzhou", "name": "扬州" }, { "cityurl": "yangjiang", "name": "阳江" }, { "cityurl": "yantai", "name": "烟台" }, { "cityurl": "yinchuan", "name": "银川" }, { "cityurl": "yichang", "name": "宜昌" }, { "cityurl": "yanji", "name": "延吉市" }, { "cityurl": "yiwu", "name": "义乌市" }, { "cityurl": "yaan", "name": "雅安" }, { "cityurl": "yanan", "name": "延安" }, { "cityurl": "yibin", "name": "宜宾" }, { "cityurl": "yingkou", "name": "营口" }, { "cityurl": "yuntaishan", "name": "云台山" }, { "cityurl": "yixing", "name": "宜兴市" }] }, { "char": "Z", "list": [{ "cityurl": "zhuhai", "name": "珠海" }, { "cityurl": "zhangjiajie", "name": "张家界" }, { "cityurl": "zhengzhou", "name": "郑州" }, { "cityurl": "zhoushan", "name": "舟山" }, { "cityurl": "zhenyuan", "name": "镇远县" }, { "cityurl": "zhaoqing", "name": "肇庆" }, { "cityurl": "zhongshan", "name": "中山" }, { "cityurl": "zhanjiang", "name": "湛江" }, { "cityurl": "zhangzhou", "name": "漳州" }, { "cityurl": "zhenjiang", "name": "镇江" }, { "cityurl": "zhouzhuang", "name": "周庄" }, { "cityurl": "zhongwei", "name": "中卫" }, { "cityurl": "zhangye", "name": "张掖" }, { "cityurl": "zhangjiakou", "name": "张家口" }, { "cityurl": "zunyi", "name": "遵义" }] }],
      "charSort": false
    }]
  }
}

 
var tpl = __inline('city.tpl');

function create() {
  mustache.parse(tpl);
  var result = mustache.render(tpl, citys);
  return result;
}

function listenControl(itemCallBack) {
  var navs = document.querySelectorAll('.city-nav > span');
  var contents = document.querySelectorAll('.city-content > div');
  var contentsA = document.querySelectorAll('.city-content a');
  for(var i =0 ; i<navs.length;i++){
    (function(idx){
      tool.listen(navs[idx], 'click', function(){
        for(var n =0 ;n<navs.length;n++){
            navs[n].className = "";
        }
        navs[idx].className = "active";
        var key = navs[idx].getAttribute('data-key');
        for(var k =0 ;k<contents.length;k++){
          contents[k].className = "city-panel";
          if(contents[k].getAttribute('data-key') == key){
            contents[k].className = "city-panel active";
          }
        }
      });
    })(i)
  }
  // Array.prototype.slice.call(navs).forEach((item) => {
  //   tool.listen(item, 'click', () => {
  //     Array.prototype.slice.call(navs).forEach((c) => {
  //       c.className = "";
  //     })
  //     item.className = "active";
  //     var key = item.getAttribute('data-key');
  //     Array.prototype.slice.call(contents).forEach((c) => {
  //       c.className = "city-panel";
  //       if (c.getAttribute('data-key') == key) {
  //         c.className = "city-panel active";
  //       }
  //     });
  //   });
  // });
  for(var m= 0;m<contentsA.length;m++){
    (function(idx){
      tool.listen(contentsA[idx], 'click', function(){
        console.log(contentsA[idx])
        itemCallBack && itemCallBack(contentsA[idx].getAttribute('key'));
      });
    })(m)

  }
  // Array.prototype.slice.call(contentsA).forEach((item) => {
  //   tool.listen(item, 'click', () => {
  //     console.log(item)
  //     itemCallBack && itemCallBack(item.getAttribute('key'));
  //   });
  // });
}
module.exports={ create:create, listenControl:listenControl }