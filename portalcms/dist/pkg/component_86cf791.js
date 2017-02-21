;/*!/lib/mustache.min.js*/
define('lib/mustache.min', function(require, exports, module) {

  /**
  * @Created Date       : 2016-11-11T15:54:03+08:00
  * @Last Modified time : 2016-11-29T11:33:06+08:00
  */
  
  
  
  (function defineMustache(global, factory) {
      if (typeof exports === "object" && exports && typeof exports.nodeName !== "string") {
          factory(exports)
      } else if (typeof define === "function" && define.amd) {
          define(["exports"], factory)
      } else {
          global.Mustache = {};
          factory(global.Mustache)
      }
  })(this, function mustacheFactory(mustache) {
      var objectToString = Object.prototype.toString;
      var isArray = Array.isArray || function isArrayPolyfill(object) {
          return objectToString.call(object) === "[object Array]"
      };
  
      function isFunction(object) {
          return typeof object === "function"
      }
  
      function typeStr(obj) {
          return isArray(obj) ? "array" : typeof obj
      }
  
      function escapeRegExp(string) {
          return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
      }
  
      function hasProperty(obj, propName) {
          return obj != null && typeof obj === "object" && propName in obj
      }
      var regExpTest = RegExp.prototype.test;
  
      function testRegExp(re, string) {
          return regExpTest.call(re, string)
      }
      var nonSpaceRe = /\S/;
  
      function isWhitespace(string) {
          return !testRegExp(nonSpaceRe, string)
      }
      var entityMap = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
          "/": "&#x2F;",
          "`": "&#x60;",
          "=": "&#x3D;"
      };
  
      function escapeHtml(string) {
          return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
              return entityMap[s]
          })
      }
      var whiteRe = /\s*/;
      var spaceRe = /\s+/;
      var equalsRe = /\s*=/;
      var curlyRe = /\s*\}/;
      var tagRe = /#|\^|\/|>|\{|&|=|!/;
  
      function parseTemplate(template, tags) {
          if (!template) return [];
          var sections = [];
          var tokens = [];
          var spaces = [];
          var hasTag = false;
          var nonSpace = false;
  
          function stripSpace() {
              if (hasTag && !nonSpace) {
                  while (spaces.length) delete tokens[spaces.pop()]
              } else {
                  spaces = []
              }
              hasTag = false;
              nonSpace = false
          }
          var openingTagRe, closingTagRe, closingCurlyRe;
  
          function compileTags(tagsToCompile) {
              if (typeof tagsToCompile === "string") tagsToCompile = tagsToCompile.split(spaceRe, 2);
              if (!isArray(tagsToCompile) || tagsToCompile.length !== 2) throw new Error("Invalid tags: " + tagsToCompile);
              openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + "\\s*");
              closingTagRe = new RegExp("\\s*" + escapeRegExp(tagsToCompile[1]));
              closingCurlyRe = new RegExp("\\s*" + escapeRegExp("}" + tagsToCompile[1]))
          }
          compileTags(tags || mustache.tags);
          var scanner = new Scanner(template);
          var start, type, value, chr, token, openSection;
          while (!scanner.eos()) {
              start = scanner.pos;
              value = scanner.scanUntil(openingTagRe);
              if (value) {
                  for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
                      chr = value.charAt(i);
                      if (isWhitespace(chr)) {
                          spaces.push(tokens.length)
                      } else {
                          nonSpace = true
                      }
                      tokens.push(["text", chr, start, start + 1]);
                      start += 1;
                      if (chr === "\n") stripSpace()
                  }
              }
              if (!scanner.scan(openingTagRe)) break;
              hasTag = true;
              type = scanner.scan(tagRe) || "name";
              scanner.scan(whiteRe);
              if (type === "=") {
                  value = scanner.scanUntil(equalsRe);
                  scanner.scan(equalsRe);
                  scanner.scanUntil(closingTagRe)
              } else if (type === "{") {
                  value = scanner.scanUntil(closingCurlyRe);
                  scanner.scan(curlyRe);
                  scanner.scanUntil(closingTagRe);
                  type = "&"
              } else {
                  value = scanner.scanUntil(closingTagRe)
              }
              if (!scanner.scan(closingTagRe)) throw new Error("Unclosed tag at " + scanner.pos);
              token = [type, value, start, scanner.pos];
              tokens.push(token);
              if (type === "#" || type === "^") {
                  sections.push(token)
              } else if (type === "/") {
                  openSection = sections.pop();
                  if (!openSection) throw new Error('Unopened section "' + value + '" at ' + start);
                  if (openSection[1] !== value) throw new Error('Unclosed section "' + openSection[1] + '" at ' + start)
              } else if (type === "name" || type === "{" || type === "&") {
                  nonSpace = true
              } else if (type === "=") {
                  compileTags(value)
              }
          }
          openSection = sections.pop();
          if (openSection) throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
          return nestTokens(squashTokens(tokens))
      }
  
      function squashTokens(tokens) {
          var squashedTokens = [];
          var token, lastToken;
          for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
              token = tokens[i];
              if (token) {
                  if (token[0] === "text" && lastToken && lastToken[0] === "text") {
                      lastToken[1] += token[1];
                      lastToken[3] = token[3]
                  } else {
                      squashedTokens.push(token);
                      lastToken = token
                  }
              }
          }
          return squashedTokens
      }
  
      function nestTokens(tokens) {
          var nestedTokens = [];
          var collector = nestedTokens;
          var sections = [];
          var token, section;
          for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
              token = tokens[i];
              switch (token[0]) {
                  case "#":
                  case "^":
                      collector.push(token);
                      sections.push(token);
                      collector = token[4] = [];
                      break;
                  case "/":
                      section = sections.pop();
                      section[5] = token[2];
                      collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
                      break;
                  default:
                      collector.push(token)
              }
          }
          return nestedTokens
      }
  
      function Scanner(string) {
          this.string = string;
          this.tail = string;
          this.pos = 0
      }
      Scanner.prototype.eos = function eos() {
          return this.tail === ""
      };
      Scanner.prototype.scan = function scan(re) {
          var match = this.tail.match(re);
          if (!match || match.index !== 0) return "";
          var string = match[0];
          this.tail = this.tail.substring(string.length);
          this.pos += string.length;
          return string
      };
      Scanner.prototype.scanUntil = function scanUntil(re) {
          var index = this.tail.search(re),
              match;
          switch (index) {
              case -1:
                  match = this.tail;
                  this.tail = "";
                  break;
              case 0:
                  match = "";
                  break;
              default:
                  match = this.tail.substring(0, index);
                  this.tail = this.tail.substring(index)
          }
          this.pos += match.length;
          return match
      };
  
      function Context(view, parentContext) {
          this.view = view;
          this.cache = {
              ".": this.view
          };
          this.parent = parentContext
      }
      Context.prototype.push = function push(view) {
          return new Context(view, this)
      };
      Context.prototype.lookup = function lookup(name) {
          var cache = this.cache;
          var value;
          if (cache.hasOwnProperty(name)) {
              value = cache[name]
          } else {
              var context = this,
                  names, index, lookupHit = false;
              while (context) {
                  if (name.indexOf(".") > 0) {
                      value = context.view;
                      names = name.split(".");
                      index = 0;
                      while (value != null && index < names.length) {
                          if (index === names.length - 1) lookupHit = hasProperty(value, names[index]);
                          value = value[names[index++]]
                      }
                  } else {
                      value = context.view[name];
                      lookupHit = hasProperty(context.view, name)
                  }
                  if (lookupHit) break;
                  context = context.parent
              }
              cache[name] = value
          }
          if (isFunction(value)) value = value.call(this.view);
          return value
      };
  
      function Writer() {
          this.cache = {}
      }
      Writer.prototype.clearCache = function clearCache() {
          this.cache = {}
      };
      Writer.prototype.parse = function parse(template, tags) {
          var cache = this.cache;
          var tokens = cache[template];
          if (tokens == null) tokens = cache[template] = parseTemplate(template, tags);
          return tokens
      };
      Writer.prototype.render = function render(template, view, partials) {
          var tokens = this.parse(template);
          var context = view instanceof Context ? view : new Context(view);
          return this.renderTokens(tokens, context, partials, template)
      };
      Writer.prototype.renderTokens = function renderTokens(tokens, context, partials, originalTemplate) {
          var buffer = "";
          var token, symbol, value;
          for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
              value = undefined;
              token = tokens[i];
              symbol = token[0];
              if (symbol === "#") value = this.renderSection(token, context, partials, originalTemplate);
              else if (symbol === "^") value = this.renderInverted(token, context, partials, originalTemplate);
              else if (symbol === ">") value = this.renderPartial(token, context, partials, originalTemplate);
              else if (symbol === "&") value = this.unescapedValue(token, context);
              else if (symbol === "name") value = this.escapedValue(token, context);
              else if (symbol === "text") value = this.rawValue(token);
              if (value !== undefined) buffer += value
          }
          return buffer
      };
      Writer.prototype.renderSection = function renderSection(token, context, partials, originalTemplate) {
          var self = this;
          var buffer = "";
          var value = context.lookup(token[1]);
  
          function subRender(template) {
              return self.render(template, context, partials)
          }
          if (!value) return;
          if (isArray(value)) {
              for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
                  buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate)
              }
          } else if (typeof value === "object" || typeof value === "string" || typeof value === "number") {
              buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate)
          } else if (isFunction(value)) {
              if (typeof originalTemplate !== "string") throw new Error("Cannot use higher-order sections without the original template");
              value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);
              if (value != null) buffer += value
          } else {
              buffer += this.renderTokens(token[4], context, partials, originalTemplate)
          }
          return buffer
      };
      Writer.prototype.renderInverted = function renderInverted(token, context, partials, originalTemplate) {
          var value = context.lookup(token[1]);
          if (!value || isArray(value) && value.length === 0) return this.renderTokens(token[4], context, partials, originalTemplate)
      };
      Writer.prototype.renderPartial = function renderPartial(token, context, partials) {
          if (!partials) return;
          var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
          if (value != null) return this.renderTokens(this.parse(value), context, partials, value)
      };
      Writer.prototype.unescapedValue = function unescapedValue(token, context) {
          var value = context.lookup(token[1]);
          if (value != null) return value
      };
      Writer.prototype.escapedValue = function escapedValue(token, context) {
          var value = context.lookup(token[1]);
          if (value != null) return mustache.escape(value)
      };
      Writer.prototype.rawValue = function rawValue(token) {
          return token[1]
      };
      mustache.name = "mustache.js";
      mustache.version = "2.2.1";
      mustache.tags = ["{{", "}}"];
      var defaultWriter = new Writer;
      mustache.clearCache = function clearCache() {
          return defaultWriter.clearCache()
      };
      mustache.parse = function parse(template, tags) {
          return defaultWriter.parse(template, tags)
      };
      mustache.render = function render(template, view, partials) {
          if (typeof template !== "string") {
              throw new TypeError('Invalid template! Template should be a "string" ' + 'but "' + typeStr(template) + '" was given as the first ' + "argument for mustache#render(template, view, partials)")
          }
          return defaultWriter.render(template, view, partials)
      };
      mustache.to_html = function to_html(template, view, partials, send) {
          var result = mustache.render(template, view, partials);
          if (isFunction(send)) {
              send(result)
          } else {
              return result
          }
      };
      mustache.escape = escapeHtml;
      mustache.Scanner = Scanner;
      mustache.Context = Context;
      mustache.Writer = Writer
  });
  

});

;/*!/app/component/city/city.js*/
define("app/component/city/city",function(n,a,i){"use strict";function t(){e.parse(l);var n=e.render(l,r);return n}function u(n){for(var a=document.querySelectorAll(".city-nav > span"),i=document.querySelectorAll(".city-content > div"),t=document.querySelectorAll(".city-content a"),u=0;u<a.length;u++)!function(n){c.listen(a[n],"click",function(){for(var t=0;t<a.length;t++)a[t].className="";a[n].className="active";for(var u=a[n].getAttribute("data-key"),e=0;e<i.length;e++)i[e].className="city-panel",i[e].getAttribute("data-key")==u&&(i[e].className="city-panel active")})}(u);for(var e=0;e<t.length;e++)!function(a){c.listen(t[a],"click",function(){console.log(t[a]),n&&n(t[a].getAttribute("key"))})}(e)}var e=n("lib/mustache.min"),c=n("app/tool/Tool"),r={domestic:[{name:"ABCDE",charSort:!0},{name:"FGHJ",charSort:!1},{name:"KLMNP",charSort:!1},{name:"QRSTW",charSort:!1},{name:"XYZ",charSort:!1}],data:{domestic:[{title:"ABCDE",cityList:[{"char":"A",list:[{cityurl:"aba",name:"阿坝"},{cityurl:"anji",name:"安吉县"},{cityurl:"anshun",name:"安顺"},{cityurl:"anshan",name:"鞍山"},{cityurl:"anqing",name:"安庆"},{cityurl:"ankang",name:"安康"},{cityurl:"aershan",name:"阿尔山市"},{cityurl:"anyang",name:"安阳"},{cityurl:"aletai",name:"阿勒泰"},{cityurl:"alashan",name:"阿拉善盟"}]},{"char":"B",list:[{cityurl:"beijing_city",name:"北京"},{cityurl:"beihai",name:"北海"},{cityurl:"benxi",name:"本溪"},{cityurl:"baoding",name:"保定"},{cityurl:"baoji",name:"宝鸡"},{cityurl:"baoting",name:"保亭"},{cityurl:"baishan",name:"白山"},{cityurl:"baotou",name:"包头"},{cityurl:"bangbu",name:"蚌埠"},{cityurl:"buerjin",name:"布尔津县"},{cityurl:"boao",name:"博鳌"},{cityurl:"baoshan",name:"保山"},{cityurl:"boluo",name:"博罗县"},{cityurl:"baise",name:"百色"}]},{"char":"C",list:[{cityurl:"chengdu",name:"成都"},{cityurl:"chongqing_city",name:"重庆"},{cityurl:"changsha",name:"长沙"},{cityurl:"changzhou",name:"常州"},{cityurl:"changchun",name:"长春"},{cityurl:"changbaishan",name:"长白山 白山"},{cityurl:"changde",name:"常德"},{cityurl:"chenzhou",name:"郴州"},{cityurl:"chifeng",name:"赤峰"},{cityurl:"chishui",name:"赤水市"},{cityurl:"chaozhou",name:"潮州"}]},{"char":"D",list:[{cityurl:"dali",name:"大理"},{cityurl:"dalian",name:"大连"},{cityurl:"dandong",name:"丹东"},{cityurl:"daocheng",name:"稻城县"},{cityurl:"dongguan",name:"东莞"},{cityurl:"dunhuang",name:"敦煌市"},{cityurl:"datong",name:"大同"},{cityurl:"dujiangyan",name:"都江堰市"},{cityurl:"diqing",name:"迪庆"},{cityurl:"dongying",name:"东营"},{cityurl:"danxia",name:"丹霞山"}]},{"char":"E",list:[{cityurl:"emeishan",name:"峨眉山市"},{cityurl:"ejina",name:"额济纳旗"},{cityurl:"enshi",name:"恩施自治州"},{cityurl:"erdaobaihe",name:"二道白河"},{cityurl:"eerduosi",name:"鄂尔多斯"},{cityurl:"enshishi",name:"恩施市"},{cityurl:"enping",name:"恩平市"}]}],charSort:!0},{title:"FGHJ",cityList:[{"char":"F",list:[{cityurl:"fenghuang",name:"凤凰县"},{cityurl:"fuzhou_fujian",name:"福州"},{cityurl:"foshan",name:"佛山"},{cityurl:"fangchenggang",name:"防城港"},{cityurl:"fuxianhu",name:"抚仙湖"},{cityurl:"fengcheng_dandong",name:"凤城市"},{cityurl:"fuyang_anhui",name:"阜阳"},{cityurl:"fushun",name:"抚顺"},{cityurl:"fogang",name:"佛冈县"}]},{"char":"G",list:[{cityurl:"guangzhou",name:"广州"},{cityurl:"guilin",name:"桂林"},{cityurl:"guiyang",name:"贵阳"},{cityurl:"gulangyu",name:"鼓浪屿"},{cityurl:"ganzi",name:"甘孜"},{cityurl:"guangyuan",name:"广元"},{cityurl:"ganzhou",name:"赣州"},{cityurl:"guangan",name:"广安"}]},{"char":"H",list:[{cityurl:"hangzhou",name:"杭州"},{cityurl:"huangshan",name:"黄山"},{cityurl:"huizhou_guangdong",name:"惠州"},{cityurl:"haerbin",name:"哈尔滨"},{cityurl:"haikou",name:"海口"},{cityurl:"hefei",name:"合肥"},{cityurl:"huzhou",name:"湖州"},{cityurl:"huhehaote",name:"呼和浩特"},{cityurl:"hengdian",name:"横店"},{cityurl:"huidong_huizhou",name:"惠东县"},{cityurl:"heyuan",name:"河源"}]},{"char":"J",list:[{cityurl:"jinan",name:"济南"},{cityurl:"jiuzhaigou",name:"九寨沟县"},{cityurl:"jiaxing",name:"嘉兴"},{cityurl:"jiujiang",name:"九江"},{cityurl:"jiangmen",name:"江门"},{cityurl:"jinhua",name:"金华"},{cityurl:"jinzhou",name:"锦州"},{cityurl:"jilin_city",name:"吉林"},{cityurl:"jingdezhen",name:"景德镇"},{cityurl:"jiayuguan",name:"嘉峪关"},{cityurl:"jiaozuo",name:"焦作"},{cityurl:"jinzhong",name:"晋中"},{cityurl:"jiuhuashan",name:"九华山"},{cityurl:"jiashan",name:"嘉善县"}]}],charSort:!1},{title:"KLMNP",cityList:[{"char":"K",list:[{cityurl:"kunming",name:"昆明"},{cityurl:"kaifeng",name:"开封"},{cityurl:"kangding",name:"康定市"},{cityurl:"kunshan",name:"昆山市"},{cityurl:"kaili",name:"凯里市"},{cityurl:"keshiketeng",name:"克什克腾旗"},{cityurl:"kanasi",name:"喀纳斯"},{cityurl:"kuandian",name:"宽甸"},{cityurl:"kaiping",name:"开平市"}]},{"char":"L",list:[{cityurl:"lijiang",name:"丽江"},{cityurl:"luguhu",name:"泸沽湖,丽江"},{cityurl:"luoyang",name:"洛阳"},{cityurl:"lanzhou",name:"兰州"},{cityurl:"lasa",name:"拉萨"},{cityurl:"leshan",name:"乐山"},{cityurl:"langzhong",name:"阆中市"},{cityurl:"libo",name:"荔波县"},{cityurl:"lianyungang",name:"连云港"},{cityurl:"liuzhou",name:"柳州"},{cityurl:"lishui",name:"丽水"},{cityurl:"lixian_aba",name:"理县"},{cityurl:"linyi",name:"临沂"},{cityurl:"lingshui",name:"陵水"},{cityurl:"linan",name:"临安市"}]},{"char":"M",list:[{cityurl:"moganshan",name:"莫干山"},{cityurl:"mianyang",name:"绵阳"},{cityurl:"meizhou",name:"梅州"},{cityurl:"maoming",name:"茂名"},{cityurl:"mile",name:"弥勒县"},{cityurl:"mudanjiang",name:"牡丹江"},{cityurl:"meishan",name:"眉山"},{cityurl:"mao",name:"茂县"}]},{"char":"N",list:[{cityurl:"nanjing",name:"南京"},{cityurl:"ningbo",name:"宁波"},{cityurl:"nanning",name:"南宁"},{cityurl:"nanchang",name:"南昌"},{cityurl:"nantong",name:"南通"},{cityurl:"nanchong",name:"南充"},{cityurl:"nankunshan",name:"南昆山"},{cityurl:"nanping",name:"南平"},{cityurl:"nanyang",name:"南阳"},{cityurl:"nanxun",name:"南浔镇"},{cityurl:"nanaodao",name:"南澳岛"},{cityurl:"ningde",name:"宁德"},{cityurl:"neijiang",name:"内江"}]},{"char":"P",list:[{cityurl:"pingyao",name:"平遥县"},{cityurl:"panjin",name:"盘锦"},{cityurl:"putuoshan",name:"普陀山"},{cityurl:"penglai",name:"蓬莱市"},{cityurl:"putian",name:"莆田"},{cityurl:"pingtan",name:"平潭县"},{cityurl:"panzhihua",name:"攀枝花"},{cityurl:"pingxiang",name:"萍乡"},{cityurl:"puer",name:"普洱"},{cityurl:"puzhehei",name:"普者黑"}]}],charSort:!1},{title:"QRSTW",cityList:[{"char":"Q",list:[{cityurl:"qingdao",name:"青岛"},{cityurl:"qinhuangdao",name:"秦皇岛"},{cityurl:"qiandaohu",name:"千岛湖"},{cityurl:"qingyuan",name:"清远"},{cityurl:"quanzhou",name:"泉州"},{cityurl:"qionghai",name:"琼海"},{cityurl:"qiandongnan",name:"黔东南"},{cityurl:"qufu",name:"曲阜市"},{cityurl:"qingchengshan",name:"青城山"},{cityurl:"quzhou",name:"衢州"},{cityurl:"qinzhou",name:"钦州"}]},{"char":"R",list:[{cityurl:"rizhao",name:"日照"},{cityurl:"ruoergai",name:"若尔盖县"},{cityurl:"rongcheng",name:"荣成市"},{cityurl:"ruili",name:"瑞丽市"},{cityurl:"rushan",name:"乳山市"},{cityurl:"ruyuan",name:"乳源"},{cityurl:"renhua",name:"仁化县"},{cityurl:"rilongzhen",name:"日隆镇"},{cityurl:"rikaze",name:"日喀则"},{cityurl:"renshou",name:"仁寿县"}]},{"char":"S",list:[{cityurl:"shanghai_city",name:"上海"},{cityurl:"sanya",name:"三亚"},{cityurl:"shenzhen",name:"深圳"},{cityurl:"suzhou_jiangsu",name:"苏州"},{cityurl:"shenyang",name:"沈阳"},{cityurl:"shuanglang",name:"双廊镇"},{cityurl:"shaoxing",name:"绍兴"},{cityurl:"shijiazhuang",name:"石家庄"},{cityurl:"shaoguan",name:"韶关"},{cityurl:"shantou",name:"汕头"},{cityurl:"shennongjia",name:"神农架"},{cityurl:"sanqingshan",name:"三清山"},{cityurl:"shuhe",name:"束河古镇"},{cityurl:"shengsi",name:"嵊泗县"},{cityurl:"shiyan",name:"十堰"}]},{"char":"T",list:[{cityurl:"tianjin_city",name:"天津"},{cityurl:"taiyuan",name:"太原"},{cityurl:"taian",name:"泰安"},{cityurl:"tengchong",name:"腾冲市"},{cityurl:"taishan",name:"台山市"},{cityurl:"tianshui",name:"天水"},{cityurl:"taizhou_zhejiang",name:"台州"},{cityurl:"tangshan",name:"唐山"},{cityurl:"tonglu",name:"桐庐县"},{cityurl:"taizhou_jiangsu",name:"泰州"},{cityurl:"tongli",name:"同里"},{cityurl:"tongren",name:"铜仁"}]},{"char":"W",list:[{cityurl:"wuhan",name:"武汉"},{cityurl:"wuzhen",name:"乌镇"},{cityurl:"wuxi",name:"无锡"},{cityurl:"weihai",name:"威海"},{cityurl:"wulumuqi",name:"乌鲁木齐"},{cityurl:"wenzhou",name:"温州"},{cityurl:"weizhou",name:"涠洲岛"},{cityurl:"wuyishan",name:"武夷山市"},{cityurl:"wulong",name:"武隆县"},{cityurl:"wuyuan",name:"婺源县"},{cityurl:"wuhu",name:"芜湖"},{cityurl:"weifang",name:"潍坊"},{cityurl:"wutaishan",name:"五台山"},{cityurl:"wudangshan",name:"武当山"},{cityurl:"wenchang",name:"文昌"}]}],charSort:!1},{title:"XYZ",cityList:[{"char":"X",list:[{cityurl:"xiamen",name:"厦门"},{cityurl:"xian",name:"西安"},{cityurl:"xitang",name:"西塘镇"},{cityurl:"xichang",name:"西昌市"},{cityurl:"xining",name:"西宁"},{cityurl:"xishuangbanna",name:"西双版纳"},{cityurl:"xianggelila",name:"香格里拉县"},{cityurl:"xunliaowan",name:"巽寮湾"},{cityurl:"xuzhou",name:"徐州"},{cityurl:"xijiangqianhumiaozhai",name:"西江千户苗寨"},{cityurl:"xingcheng",name:"兴城市"},{cityurl:"xinduqiao",name:"新都桥"},{cityurl:"xiangfan",name:"襄阳"},{cityurl:"xiangxi",name:"湘西"},{cityurl:"xianyang",name:"咸阳"}]},{"char":"Y",list:[{cityurl:"yangshuo",name:"阳朔县"},{cityurl:"yangzhou",name:"扬州"},{cityurl:"yangjiang",name:"阳江"},{cityurl:"yantai",name:"烟台"},{cityurl:"yinchuan",name:"银川"},{cityurl:"yichang",name:"宜昌"},{cityurl:"yanji",name:"延吉市"},{cityurl:"yiwu",name:"义乌市"},{cityurl:"yaan",name:"雅安"},{cityurl:"yanan",name:"延安"},{cityurl:"yibin",name:"宜宾"},{cityurl:"yingkou",name:"营口"},{cityurl:"yuntaishan",name:"云台山"},{cityurl:"yixing",name:"宜兴市"}]},{"char":"Z",list:[{cityurl:"zhuhai",name:"珠海"},{cityurl:"zhangjiajie",name:"张家界"},{cityurl:"zhengzhou",name:"郑州"},{cityurl:"zhoushan",name:"舟山"},{cityurl:"zhenyuan",name:"镇远县"},{cityurl:"zhaoqing",name:"肇庆"},{cityurl:"zhongshan",name:"中山"},{cityurl:"zhanjiang",name:"湛江"},{cityurl:"zhangzhou",name:"漳州"},{cityurl:"zhenjiang",name:"镇江"},{cityurl:"zhouzhuang",name:"周庄"},{cityurl:"zhongwei",name:"中卫"},{cityurl:"zhangye",name:"张掖"},{cityurl:"zhangjiakou",name:"张家口"},{cityurl:"zunyi",name:"遵义"}]}],charSort:!1}]}},l='<div class="qcity">\r\n	<div class="city-nav">\r\n		{{#domestic}}\r\n			<span data-key="{{name}}" class="{{#charSort}}active{{/charSort}}">{{name}}</span>\r\n		{{/domestic}}\r\n	</div>\r\n	<div class="city-content">\r\n		{{#data.domestic}}\r\n			<div data-key="{{title}}" class="city-panel {{#charSort}}active{{/charSort}}">\r\n			{{#cityList}}\r\n				<dl class="list">\r\n					<dt>{{char}}</dt>\r\n					<dd>\r\n						<ul>\r\n							{{#list}}		\r\n								<li><a href="#" key="{{name}}">{{name}}</a></li>\r\n							{{/list}}\r\n						</ul>\r\n					</dd>\r\n				</dl>\r\n			{{/cityList}}\r\n			</div>\r\n		{{/data.domestic}}\r\n	</div>\r\n</div>';i.exports={create:t,listenControl:u}});
;/*!/app/component/dialog/dialog.js*/
define("app/component/dialog/dialog",function(e,t,o){"use strict";function n(e,t){function o(){document.body.removeChild(a),p.docmove&&p.docmove.remove(),p.docmup&&p.docmup.remove()}var n={};n.title=e.title||"提示",n.content=e.content||"请输入提示内容",n.close=e.close||!0,n.width=e.width||500,n.height=e.height||300,n.showfooter=void 0==e.showfooter?!0:e.showfooter,c.parse(l);var s=c.render(l,n),a=document.createElement("div"),d="dialog"+Math.floor(1e4*Math.random()+1);a.setAttribute("id",d),a.innerHTML=s,document.body.appendChild(a);var u=document.querySelector("#"+d+" .container"),f=document.querySelector("#"+d+" .dialog-container .title"),m=document.querySelector("#"+d+" .dialog-container .close"),v=document.querySelector("#"+d+" .dialog-container .btn0"),h=document.querySelector("#"+d+" .dialog-container .btn1");500!=n.width&&(u.style.width=n.width+"px"),300!=n.height&&(u.style.height=n.height+"px");var p=i(f,u);return m&&r.listen(m,"click",function(){t&&t(0),o()}),v&&r.listen(v,"click",function(){t&&t(1),o()}),h&&r.listen(h,"click",function(){t&&t(2),o()}),{close:o,dom:u}}function i(e,t){function o(e,o){n&&(l+=e-i,s+=o-c,i=e,c=o,t.offsetLeft-Math.abs(l)>=0?t.style.transform="translate("+l+"px,"+s+"px)":l=0>l?-t.offsetLeft:t.offsetLeft,t.offsetTop-Math.abs(s)>=0?t.style.transform="translate("+l+"px,"+s+"px)":s=0>s?-t.offsetTop:t.offsetTop)}var n=!1,i=0,c=0,l=0,s=0,a=(t.clientWidth,t.clientHeight,void 0),d=void 0;return r.listen(e,"mousedown",function(e){0==e.button&&(n=!0,i=e.x,c=e.y,a=r.listen(document,"mousemove",function(e){o(e.x,e.y)}),d=r.listen(document,"mouseup",function(){n=!1,a.remove(),d.remove(),a=null,d=null}))}),{docmove:a,docmup:d}}var c=e("lib/mustache.min"),r=e("app/tool/Tool"),l='<!-- \r\n@require "app/component/dialog/dialog.less" \r\n-->\r\n<div class="dialog-container">\r\n	<div class="container">\r\n		{{#close}}<div class="close"><a href="javascript:void(0)" class="icon"></a></div>{{/close}}\r\n		<div class="title">{{title}}</div>\r\n		<div class="content">{{{content}}}</div>\r\n		{{#showfooter}}\r\n		<div class="footer">\r\n			<a class="btn0">确定</a>\r\n			<a class="btn1">取消</a>\r\n		</div>\r\n		{{/showfooter}}\r\n	</div>\r\n</div>';o.exports={create:n}});
;/*!/app/component/head/head.js*/
define("app/component/head/head",function(e,n,t){"use strict";function i(){var e='{{^islogin}}\r\n<div class="unlogin">\r\n	<input type="button" value="登录" id="loginBtn">\r\n	<input type="button" value="注册" id="regBtn">\r\n</div>\r\n{{/islogin}}\r\n{{#islogin}}\r\n<div class="inlogin">\r\n	<a href="javascript:void(0)" class="photo"></a>\r\n	<div class="item-container">\r\n		<div class="item" data-key="usercenter"><a href="javascript:void(0)">个人中心</a></div>\r\n		<div class="item" data-key="suggest"><a href="javascript:void(0)" >意见反馈</a></div>\r\n		<div class="item" data-key="exit"><a href="javascript:void(0)" >退出</a></div>\r\n	</div>\r\n</div>\r\n{{/islogin}}';g.parse(e);var n=m.getLoginState(),t=g.render(e,n),i=document.querySelector(".header .login");i.innerHTML=t,n.islogin?o():a()}function o(){var e=document.querySelector(".header .photo"),n=document.querySelector(".header .inlogin"),t=document.querySelector(".header .item-container"),i=document.querySelectorAll(".header .item");m.listen(e,"mouseover",function(){t.style.display="block"}),m.mouseleave(n,function(){t.style.display="none"}),Array.prototype.slice.call(i).forEach(function(e){m.listen(e,"click",function(){var n=e.getAttribute("data-key");if(n)switch(n){case"exit":l()}})})}function a(){var n=document.getElementById("loginBtn");m.listen(n,"click",function(){var n=e("../logindialog/logindialog.");n.create(function(){i()})});var t=document.getElementById("regBtn");m.listen(t,"click",function(){window.location.href="/app/page/register/register.html",v&&v()})}function l(){m.clearCookie("islogin"),i()}function c(){for(var e=document.querySelectorAll(".main-nav > ul li"),n=0;n<e.length;n++)!function(n){m.listen(e[n],"click",function(){for(var t=0;t<e[n].parentNode.childNodes.length;t++)"li"==e[n].parentNode.childNodes[t].nodeName.toLowerCase()&&(e[n].parentNode.childNodes[t]==e[n]?(e[n].parentNode.childNodes[t].className="active",console.log(1)):(e[n].parentNode.childNodes[t].className=" ",console.log(2)));u&&u(n)}),m.listen(e[n],"mouseover",function(){"active"!==e[n].className&&(e[n].className="hover")}),m.listen(e[n],"mouseout",function(){"active"!==e[n].className&&(e[n].className="")})}(n)}function r(e){for(var n=document.querySelectorAll(".main-nav > ul li"),t=0;t<n.length;t++)n[t].className="",t==e&&(console.log("active"),n[t].className="active")}function s(e){u=e}function d(e){v=e}var u,v,m=e("app/tool/Tool"),g=e("lib/mustache.min");i(),c(),t.exports={setActive:r,setNavClickCallBack:s,setRegBtnCallBack:d}});
;/*!/app/component/loading/loading.js*/
define("app/component/loading/loading",function(n,r,a){"use strict";function i(n,r){function a(){n.removeChild(t)}if(!n)throw"loading target is must";var i={};i.type=r&&r.type||"ball";var d,l;switch(i.type){case"ball":l="loading-wrap",d='<!--\r\n* @Created Date       : 2016-11-11T15:54:04+08:00\r\n* @Last Modified time : 2016-11-30T18:13:52+08:00\r\n -->\r\n\r\n\r\n\r\n<!--\r\n@require "app/component/loading/loading.less"\r\n  -->\r\n	<!-- <div class="loading">\r\n		<div class="ball ball1"></div>\r\n	</div>\r\n	<div class="text">\r\n		<p>L O A D I N G . . .</p>\r\n	</div> -->\r\n	<div class="loading-wrap "></div>\r\n<div class="loading">\r\n	<img src="/resource/image/loading.gif" alt="">\r\n</div>\r\n';break;case"cat":l="loadingcat-wrap",d='<!--   \r\n@require "app/component/loading/loadingcat.less" \r\n  -->\r\n	<div class="loadingcat">\r\n	</div>\r\n	<div class="cat">\r\n		<div class="eye lefteye">\r\n			<div class="ball"></div>\r\n		</div>\r\n		<div class="eye righteye">\r\n			<div class="ball"></div>			\r\n		</div>\r\n	</div>\r\n	<div class="text">\r\n		<p>L O A D I N G . . .</p>\r\n	</div>\r\n';break;default:l="loading-wrap",d='<!--\r\n* @Created Date       : 2016-11-11T15:54:04+08:00\r\n* @Last Modified time : 2016-11-30T18:13:52+08:00\r\n -->\r\n\r\n\r\n\r\n<!--\r\n@require "app/component/loading/loading.less"\r\n  -->\r\n	<!-- <div class="loading">\r\n		<div class="ball ball1"></div>\r\n	</div>\r\n	<div class="text">\r\n		<p>L O A D I N G . . .</p>\r\n	</div> -->\r\n	<div class="loading-wrap "></div>\r\n<div class="loading">\r\n	<img src="/resource/image/loading.gif" alt="">\r\n</div>\r\n'}e.parse(d);var s=e.render(d),t=document.createElement("div");return t.className=l,t.innerHTML=s,n.appendChild(t),{close:a}}var e=n("lib/mustache.min");a.exports={create:i,close:close}});
;/*!/app/component/logindialog/logindialog.js*/
define("app/component/logindialog/logindialog",function(e,o,n){"use strict";function r(o){var n=e("app/component/dialog/dialog"),r='<div class="logindialog">\r\n	<p><input type="text" id="username" placeholder="用户名"></p>\r\n	<p><input type="password" id="password" placeholder="密码"></p>\r\n	<p class="forget"><span class="error"></span><a href="javascript:void(0)">忘记密码</a></p>\r\n	<p><input type="button" value="登录" class="login"></p>\r\n</div>';t.parse(r);var l=t.render(r),s=n.create({title:"登录",content:l,height:350,showfooter:!1}),p=(s.dom.querySelector(".logindialog"),s.dom.querySelector(".login")),c=s.dom.querySelector("#username"),d=s.dom.querySelector("#password"),u=s.dom.querySelector(".error");p&&a.listen(p,"click",function(){if(""==c.value.trim()||""==d.value.trim())u.innerHTML=a.xss("用户名或者密码不能为空");else{u.innerHTML=a.xss("");{e("app/component/loading/loading").create(s.dom,{type:"cat"})}a.ajax({url:"login",method:"post",data:{userName:c.value,passWord:i(d.value)}},function(){s.close(),a.setCookie("islogin","1",.5),o&&o({username:c})},function(e){u.innerHTML=e})}})}var a=e("app/tool/Tool"),t=e("lib/mustache.min"),i=e("lib/md5");n.exports={create:r}});
;/*!/app/component/head2/head2.js*/
define("app/component/head2/head2",function(e,n,i){"use strict";function t(){var e='{{^islogin}}\r\n<div class="unlogin">\r\n	<input type="button" value="登录" id="loginBtn">\r\n	<input type="button" value="注册" id="regBtn">\r\n</div>\r\n{{/islogin}}\r\n{{#islogin}}\r\n<div class="inlogin">\r\n	<a href="javascript:void(0)" class="photo"></a>\r\n	<div class="item-container">\r\n		<div class="item" data-key="usercenter"><a href="javascript:void(0)">个人中心</a></div>\r\n		<div class="item" data-key="suggest"><a href="javascript:void(0)" >意见反馈</a></div>\r\n		<div class="item" data-key="exit"><a href="javascript:void(0)" >退出</a></div>\r\n	</div>\r\n</div>\r\n{{/islogin}}';f.parse(e);var n=m.getLoginState(),i=f.render(e,n),t=document.querySelector(".header2 .login");t.innerHTML=i,n.islogin?a():o()}function a(){var e=document.querySelector(".header2 .photo"),n=document.querySelector(".header2 .inlogin"),i=document.querySelector(".header2 .item-container"),t=document.querySelectorAll(".header2 .item");m.listen(e,"mouseover",function(){i.style.display="block"}),m.mouseleave(n,function(){i.style.display="none"}),[].slice.call(t).forEach(function(e){m.listen(e,"click",function(){var n=e.getAttribute("data-key");if(n)switch(n){case"exit":c()}})})}function o(){var n=document.getElementById("loginBtn");m.listen(n,"click",function(){var n=e("app/component/logindialog/logindialog");n.create(function(){t()})});var i=document.getElementById("regBtn");m.listen(i,"click",function(){window.location.href="/app/page/register/register.html",v&&v()})}function c(){m.clearCookie("islogin"),t()}function l(){var e=document.querySelectorAll(".main-nav > ul li");[].slice.call(e).forEach(function(e,n){m.listen(e,"click",function(){d&&d(n)}),m.listen(e,"mouseover",function(){"active"!==e.className&&(e.className="hover")}),m.listen(e,"mouseout",function(){"active"!==e.className&&(e.className="")})})}function r(e){var n=document.querySelectorAll(".main-nav > ul li");[].slice.call(n).forEach(function(n,i){n.className="",i==e&&(n.className="active")})}function s(e){d=e}function u(e){v=e}var d,v,m=e("app/tool/Tool"),f=e("lib/mustache.min");t(),l(),i.exports={setActive:r,setNavClickCallBack:s,setRegBtnCallBack:u}});
;/*!/app/component/progress/progress.js*/
define("app/component/progress/progress",function(s,e,a){"use strict";function n(){var s=document.createElement("div");s.innerHTML=r,document.body.appendChild(s)}var r=(s("lib/mustache.min"),s("app/tool/Tool"),'<!-- \r\n@require "app/component/progress/progress.less" \r\n-->\r\n<div class="progress-warp">\r\n	<div class="base">\r\n		<div class="current">\r\n			<span class="label">100%</span>\r\n		</div>\r\n		<div class="node-list">\r\n			<div class="node active" data-value="20%" style="left:20%"><span class="label">订单提交</span></div>\r\n			<div class="node" data-value="60%" style="left:60%"><span class="label">派送</span></div>\r\n			<div class="node" data-value="80%" style="left:80%"><span class="label">完成</span></div>\r\n		</div>\r\n	</div>\r\n</div>');a.exports={create:n}});