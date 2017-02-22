<!--
* @Created Date       : 2016-10-18T10:41:19+08:00
* @Last Modified time : 2016-11-14T17:33:22+08:00
 -->
<template>
  <div class="metable">
    <style type="text/css">
    {{ style }}
    </style>
    <div class="group">
      <table class="locktable table table-bordered head">
        <colgroup>
        </colgroup>
        <thead class="groupheadertpl">
        </thead>
      </table>
      <table class="table table-bordered content">
        <colgroup>
        </colgroup>
        <tbody>
        </tbody>
      </table>
    </div>
    <div class="dataitem">
      <table class="normaltable table table-bordered head ">
        <colgroup>
        </colgroup>
        <thead class="normalheadertpl">
        </thead>
      </table>
      <table class="table table-bordered content table-hover table-striped">
        <colgroup>
        </colgroup>
        <tbody>
        </tbody>
      </table>
    </div>
    <div class="xscroll">
      <div class="xscrollmonitor"></div>
    </div>
    <div class="yscroll">
      <div class="yscrollmonitor"></div>
    </div>
    <v-spinner :size="md" :fixed="true" text="" v-ref:spinner></v-spinner>
  </div>
</template>
<script>
import EventListener from '../vstrap/utils/EventListener.js'

export default {
  data() {
      return {
        defaultColumnWidth: '100px', //默认的宽度
        totalSum: {}, //分组统计信息
        groupColumns: [],
        _titles: [],
        style: ''
      };
    },
    computed: {
      style() {

        var style = `.metable th,.metable td,.metable tr { height:${this.tdHeight}px !important}`;

        return style;
      }
    },
    methods: {
      exportExcel(fileName, worksheetName) {
        var self = this;
        // createTable();
        createDownloadLink(Export(createTable()));

        function createTable() {
          var table = document.createElement('table');
          var colgroup = document.createElement('colgroup');
          table.appendChild(colgroup);
          colgroup.innerHTML += self.$el.querySelector('.group colgroup').innerHTML;
          colgroup.innerHTML += self.$el.querySelector('.dataitem colgroup').innerHTML;
          var thead = document.createElement('thead');
          table.appendChild(thead);
          thead.innerHTML = self.$el.querySelector('.group .groupheadertpl').innerHTML;

          var theadtrs = thead.querySelectorAll('tr');
          if (theadtrs) {
            [].slice.call(theadtrs).forEach((item, index) => {
              item.innerHTML += [].slice.call(self.$el.querySelectorAll('.dataitem .normalheadertpl tr'))[index].innerHTML;
            })
          }

          var tbody = document.createElement('tbody');
          table.appendChild(tbody);

          tbody.innerHTML = self.$el.querySelector('.group .content tbody').innerHTML;
          var tbodytrs = tbody.querySelectorAll('tr');
          if (tbodytrs) {
            [].slice.call(tbodytrs).forEach((item, index) => {
              item.innerHTML += [].slice.call(self.$el.querySelectorAll('.dataitem .content tbody tr'))[index].innerHTML;
            });
          }
          return table.outerHTML;
        }

        function createDownloadLink(base64data) {
          var blob;
          var exporttype = "application/vnd.ms-excel";
          var filename = fileName + ".xls";


          if (window.navigator.msSaveBlob) {
            blob = b64toBlob(base64data, exporttype);
            window.navigator.msSaveBlob(blob, filename);
            return false;
          } else {
            var anchor = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
            var event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            if (window.URL.createObjectURL) {
              blob = b64toBlob(base64data, exporttype);
              var blobUrl = window.URL.createObjectURL(blob, exporttype);
              anchor.download = filename;
              anchor.href = blobUrl;
              anchor.dispatchEvent(event);
            } else {
              var hrefvalue = "data:" + exporttype + ";base64," + base64data;
              anchor.download = filename;
              anchor.href = hrefvalue;
              anchor.dispatchEvent(event);
            }
          }
          return true;
        }

        function Export(htmltable) {
          var cssstyle = `
                    <style type="text/css">
                    th {
                      vertical-align: middle !important;
                      text-align: center !important;
                      border: 1px solid #495264!important;
                      font-weight: normal;
                      color: #ffffff;
                      background: #5d677c;
                    }
                    </style>`;

          var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
          excelFile += "<head>";
          excelFile += cssstyle;
          excelFile += '<meta http-equiv="Content-type" content="text/html;charset=utf-8" />';
          excelFile += "<!--[if gte mso 9]>";
          excelFile += "<xml>";
          excelFile += "<x:ExcelWorkbook>";
          excelFile += "<x:ExcelWorksheets>";
          excelFile += "<x:ExcelWorksheet>";
          excelFile += "<x:Name>";
          excelFile += "{worksheet}";
          excelFile += "</x:Name>";
          excelFile += "<x:WorksheetOptions>";
          excelFile += "<x:DisplayGridlines/>";
          excelFile += "</x:WorksheetOptions>";
          excelFile += "</x:ExcelWorksheet>";
          excelFile += "</x:ExcelWorksheets>";
          excelFile += "</x:ExcelWorkbook>";
          excelFile += "</xml>";
          excelFile += "<![endif]-->";
          excelFile += "</head>";
          excelFile += "<body>";
          excelFile += htmltable.replace(/"/g, '\'');
          excelFile += "</body>";
          excelFile += "</html>";
          var ctx = {
            worksheet: worksheetName,
            table: htmltable
          };
          return base64(format(excelFile, ctx));
        }

        function b64toBlob(b64Data, contentType, sliceSize) {

          contentType = contentType || '';
          sliceSize = sliceSize || 512;

          var byteCharacters = window.atob(b64Data);
          var byteArrays = [];

          var offset;
          for (offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            var i;
            for (i = 0; i < slice.length; i = i + 1) {
              byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new window.Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
          }

          var blob = new window.Blob(byteArrays, {
            type: contentType
          });
          return blob;
        }

        function base64(s) {
          return window.btoa(unescape(encodeURIComponent(s)));
        }

        function format(s, c) {
          return s.replace(/{(\w+)}/g, function(m, p) {
            return c[p];
          });
        }

      },
      //***************************************页面操作**************************
      //
      render() {
        var groupel = this.$el.querySelector('.group');
        var dataitemel = this.$el.querySelector('.dataitem');
        //呈现内容
        // 1.呈现分组表头
        var thtpl = '';
        var trtpl;
        var colgroup = '';
        if (this.multiTitles.length != 0) {
          this.groupColumns.forEach((item) => {

            colgroup += `<col width='${item.width || this.defaultColumnWidth}'></col>`;
            thtpl += `<th rowspan="2">${item.title}</th>`;
          });
          trtpl = `<tr>${thtpl}</tr><tr></tr>`;
        } else {
          this.groupColumns.forEach((item) => {
            colgroup += `<col width='${item.width || this.defaultColumnWidth}'></col>`;
            thtpl += `<th>${item.title}</th>`;
          });
          trtpl = `<tr>${thtpl}</tr>`;
        }


        this.$el.querySelector('.group .groupheadertpl').innerHTML = trtpl;

        [].slice.call(this.$el.querySelectorAll('.group colgroup')).forEach((item) => {
          item.innerHTML = colgroup;
        });
        //呈现分组内容

        var gcontenttpl = '';

        this.dataList.forEach((item, dindex) => {

          var tdtpl = '';
          this.groupColumns.forEach((citem, index) => {
            var rowspancount = getRowspan(item, this.groupColumns, index, this.totalSum);
            if (rowspancount != null) {
              var itemcontent = item[citem.name] == undefined ? '' : item[citem.name];
              if (citem.formatter && (typeof citem.formatter == 'function')) {
                itemcontent = citem.formatter(item[citem.name], item, dindex);
              }
              tdtpl += `<td title='${itemcontent}' rowspan="${rowspancount}">${itemcontent}</td>`;
            }
          });
          var trtpl = `<tr>${tdtpl}</tr>`;
          gcontenttpl += trtpl;
        });

        if (this.rowTotal) {
          var rowTotalTpl = `<tr class='rowTotal'><td colspan=${this.groupColumns.length}>合计</td></tr>`;
          gcontenttpl += rowTotalTpl;
        }

        this.$el.querySelector('.group .content tbody').innerHTML = gcontenttpl;
        //呈现正常表头

        var dataheadtpl = '';
        var datacolgroup = '';
        var dataFirstThtpl = '';
        var dataFirstTrtpl = '';
        var dataSencondthtpl = '';
        var dataSencondtrtpl = '';

        var renderdMutiArr = [];
        this._titles.forEach((item) => {
          var isnotExist = this.multiTitles.every((gItem) => {
            if (gItem.columns.indexOf(item.name) == -1) {
              return true;
            } else {
              return false;
            }
          });
          if (isnotExist) {
            var rowspancount = 1;
            if (this.multiTitles.length > 0) {
              rowspancount = 2;
            }
            dataFirstThtpl += `<th rowspan="${rowspancount}">${item.title}</th>`;
          } else {
            this.multiTitles.forEach((mitem, index) => {
              if (mitem.columns.indexOf(item.name) != -1 && renderdMutiArr.indexOf(index) == -1) {
                renderdMutiArr.push(index);
                var colspancount = mitem.columns.length;
                dataFirstThtpl += `<th colspan="${colspancount}">${mitem.title}</th>`;
              }
            });
            dataSencondthtpl += `<th>${item.title}</th>`;
          }

          datacolgroup += `<col width='${item.width || this.defaultColumnWidth}'></col>`;
        });


        dataFirstTrtpl = `<tr>${dataFirstThtpl}</tr>`;

        if (dataSencondthtpl != '') {
          dataSencondtrtpl = `<tr>${dataSencondthtpl}</tr>`;
        }
        dataheadtpl = dataFirstTrtpl + dataSencondtrtpl;

        this.$el.querySelector('.dataitem .normalheadertpl').innerHTML = dataheadtpl;

        [].slice.call(this.$el.querySelectorAll('.dataitem colgroup')).forEach((item) => {
          item.innerHTML = datacolgroup;
        });

        //呈现正常内容

        var datacontenttpl = '';
        this.dataList.forEach((item, dindex) => {
          var tdtpl = '';
          this._titles.forEach((citem) => {
            var itemcontent = item[citem.name] == undefined ? '' : item[citem.name];
            if (citem.formatter && (typeof citem.formatter == 'function')) {
              itemcontent = citem.formatter(item[citem.name], item, dindex);
            }
            tdtpl += `<td title='${itemcontent}'>${itemcontent}</td>`;
          });
          var trtpl = `<tr>${tdtpl}</tr>`;
          datacontenttpl += trtpl;
        });
        //行合计
        if (this.rowTotal) {
          var datacontentTotalTpl = '';
          this._titles.forEach((item) => {
            var total = 0;
            if (this.totalIgnore.indexOf(item.name) == -1) {
              var flag = this.dataList.every((ditem) => {
                var itemvalue = 0;
                try {
                  if (this.totalFormatter) {
                    var ssvalue = this.totalFormatter(item.name, ditem[item.name]);
                    itemvalue = isNaN(ssvalue) ? 0:ssvalue;
                  
                  } else {

                    if (this.totalType.toLowerCase() == "int") {
                      itemvalue = parseInt(ditem[item.name]);
                    } else if (this.totalType.toLowerCase() == "FLOAT") {
                      itemvalue = parseFloat(ditem[item.name]);
                    } else {
                      itemvalue = parseInt(ditem[item.name]);
                    }
                  }
                  if (isNaN(itemvalue)) {
                    return false;
                  }
                } catch (e) {
                  itemvalue = 0;
                }
                total += itemvalue-0;
                return true;
              });
            } else {
              flag = false;
            }
            if (!flag) {
              total = '';
            } else {
              if (this.totalFormatter) {
                total = this.totalFormatter('total', total);
                console.log('total==>',total);
              }
            }
            datacontentTotalTpl += `<td title='${total}'>${total}</td>`;
          });
          datacontenttpl += `<tr>${datacontentTotalTpl}</tr>`;
        }

        this.$el.querySelector('.dataitem .content tbody').innerHTML = datacontenttpl;


        function getRowspan(row, column, index, totalSum) {

          if (index == 0) {
            if (!totalSum[row[column[index].name]]._$isuse) {
              totalSum[row[column[index].name]]._$isuse = true;
              return totalSum[row[column[index].name]].value;
            } else {
              return null;
            }
          } else {
            var evalstring = 'totalSum[row[column[0].name]]';
            for (var i = 1; i <= index; i++) {
              evalstring += '.children[row[column[' + i + '].name]]';
            };
            var obj = eval(evalstring);
            if (!obj._$isuse) {
              obj._$isuse = true;
              return obj.value;
            } else {
              return null;
            }
          }

        }

        //计算宽高,觉得 x,y scroll 呈现与否,同时决定 group,dataitem 的位置，并绑定x,y scroll的滚动事件
        var parentWidth = this.$el.offsetWidth;
        var parentHeight = this.$el.offsetHeight;
        var groupWidthTotal = 1; //边框
        var dataitemTotal = 1; //边框
        var totalwidth = 0;
        var totalheight = 0;

        var isxscroll = false;
        var xscroll = this.$el.querySelector('.xscroll');
        var isyscroll = false;
        var yscroll = this.$el.querySelector('.yscroll');

        this.groupColumns.forEach((item) => {
          try {
            groupWidthTotal += parseInt(item.width || this.defaultColumnWidth);
          } catch (e) {
            throw e;
          }
        })

        groupel.style.width = groupWidthTotal + 'px';

        this._titles.forEach((item) => {
          try {
            dataitemTotal += parseInt(item.width || this.defaultColumnWidth);
          } catch (e) {
            throw e;
          }
        });
        dataitemel.style.left = groupel.style.width;

        if ((parentWidth - groupWidthTotal) > dataitemTotal) {
          dataitemel.style.right = '0px';
        } else {
          dataitemel.style.width = dataitemTotal + 'px';
        }
        if ((groupWidthTotal + dataitemTotal) > parentWidth) {
          isxscroll = true;
          groupel.style.bottom = '17px';
          dataitemel.style.bottom = '17px';
          xscroll.style.display = 'block';
        }
        totalwidth = groupWidthTotal + dataitemTotal;

        [].slice.call(dataitemel.querySelectorAll('table')).forEach((item) => {
          totalheight += item.offsetHeight;
        });
        if (totalheight > parentHeight) {
          isyscroll = true;

          if (isxscroll) {
            totalheight += 17;
          }
          yscroll.style.display = 'block';
        }
        if (isyscroll) {
          totalwidth += 17;
        }
        this.$el.querySelector('.xscrollmonitor').style.width = totalwidth + 'px';
        this.$el.querySelector('.yscrollmonitor').style.height = totalheight + 'px';
        //滚动条事件
        if (isxscroll) {
          if (this.xscrollEventFun != null) {
            this.xscrollEventFun.remove();
          }
          this.xscrollEventFun = EventListener.listen(xscroll, 'scroll', xscrollcb);
        }
        if (isyscroll) {
          if (this.yscrollEventFun != null) {
            this.yscrollEventFun.remove();
          }
          this.yscrollEventFun = EventListener.listen(yscroll, 'scroll', yscrollcb);
          if (this.mouseScrollFun) {
            this.mouseScrollFun.remove();
          }
          this.mouseScrollFun = EventListener.listen(this.$el, 'mousewheel', mousescroll);
          if (this.mouseScrollFun1) {
            this.mouseScrollFun1.remove();
          }
          this.mouseScrollFun1 = EventListener.listen(this.$el, 'DOMMouseScroll', mousescroll);
        }


        var dataitemHead = this.$el.querySelector('.dataitem .head');
        var dataitemContent = this.$el.querySelector('.dataitem .content');
        var groupHead = this.$el.querySelector('.group .head');
        var groupContent = this.$el.querySelector('.group .content');
        var self = this;


        function xscrollcb(event) {
          var source = event.srcElement || event.target;
          var scrollleft = source.scrollLeft;
          dataitemHead.style.transform = 'translateX(' + -scrollleft + 'px)';
          dataitemContent.style.transform = 'translate(' + -scrollleft + 'px,' + -yscroll.scrollTop + 'px)';
          self.scrollleft = scrollleft;
        }

        function yscrollcb(event) {
          var source = event.srcElement || event.target;
          var scrollTop = source.scrollTop;
          self.scrollTop = scrollTop;
          dataitemContent.style.transform = 'translate(' + -xscroll.scrollLeft + 'px,' + -scrollTop + 'px)';
          groupContent.style.transform = 'translateY(' + -scrollTop + 'px)';
        }

        function mousescroll(e) {
          var step = 100;
          var value = e.wheelDelta || e.detail;
          if (value > 0) {
            yscroll.scrollTop -= step;
          } else {
            yscroll.scrollTop += step;
          }
        }
      },

      //*************************************************************************
      /**
       * [orderBy description]
       * @param  {[type]} source [description]
       * @param  {[type]} orders [description]
       * @param  {[type]} type  {asc, desc}  [description]
       * @return {[type]}        [description]
       */
      orderBy(source, orders, type, lorder) {

        if (source instanceof Array && orders instanceof Array && orders.length > 0) {

          var ordersc = orders.concat([]);
          var sorttype = type || 'asc';
          var results = [];
          var totalSum = {};

          function grouporder(source, orders, totalSum) {

            function arraysort(targetarr, condition) {
              targetarr.sort(function(a, b) {
                var convertA = a[condition];
                var convertB = b[condition];
                if (typeof convertA == 'string' && typeof convertB == 'string') {
                  if (sorttype.toUpperCase() == 'ASC') {
                    return convertA.localeCompare(convertB);
                  } else {
                    return convertB.localeCompare(convertA);
                  }
                } else {
                  if (sorttype.toUpperCase() == 'ASC') {
                    return convertA - convertB;
                  } else {
                    return convertB - convertA;
                  }
                }

              })
            }

            arraysort(source, orders[0]);

            var groupmap = new Map();
            source.forEach((item) => {
              if (groupmap.has(item[orders[0]])) {
                groupmap.get(item[orders[0]]).push(item);
              } else {
                groupmap.set(item[orders[0]], []);
                groupmap.get(item[orders[0]]).push(item);
              }
            })



            orders.shift();

            for (let [key, val] of groupmap) {

              totalSum[key] = {};
              totalSum[key].name = key;
              totalSum[key].value = val.length;
              if (orders.length == 0) {
                if (lorder.length > 0) {
                  lorder.forEach((item) => {
                    arraysort(val, item);
                  })
                }
                results = results.concat(val);
              } else {
                totalSum[key].children = {};
                var orderscopy = orders.concat([]);
                grouporder(val, orderscopy, totalSum[key].children);
              }
            }
          }

          grouporder(source, ordersc, totalSum);

          return {
            results: results,
            totalSum: totalSum
          };
        } else {
          return source;
        }
      },
      //处理表头
      handledTitle() {
        //去除分组的表头
        var arr = [];
        var temp = []; //分组的表头
        this.titles.forEach((item) => {
          if (this.groupColumns.indexOf(item.name) == -1) {
            arr.push(item);
          }
        });

        //如果非分组表头有二级表头调整顺序,让它们连在一起
        var orderArr = [];
        arr.forEach((item) => {

          var flag = orderArr.every((oitem) => {
            if (oitem.name == item.name) {
              return false;
            } else {
              return true;
            }
          });

          if (flag) {
            var columns = columnInMutiTitle(item.name, this.multiTitles);
            if (columns) {

              columns.forEach((item) => {
                arr.forEach((oitem) => {
                  if (oitem.name == item) {
                    orderArr.push(oitem);
                  }
                });
              })

            } else {
              orderArr.push(item);
            }
          }
        });
        this.groupColumns.forEach((item) => {
          this.titles.every((titem) => {
            if (titem.name == item) {
              temp.push(titem);
              return false;
            } else {
              return true;
            }
          });
        });
        //分组表头

        this._titles = orderArr;

        this.groupColumns = temp;

        function columnInMutiTitle(columnName, multiTitles) {

          for (var i = 0; i < multiTitles.length; i++) {
            if (multiTitles[i].columns.indexOf(columnName) != -1) {

              return multiTitles[i].columns;
            }
          };

          return null;
        }
      },
      validatorMulti() {
        if (this.multiTitles.length == 0) {
          return true;
        } else {
          //验证多表头, 1是否重复定义 . 不ok 就return false
          //1.是否重复定义
          var hash = {};
          var result = this.multiTitles.every((item) => {
            console.log(item)
            return item.columns.every((citem) => {
              if (hash[citem] == true) {
                return false;
              } else {
                hash[citem] = true;
                return true;
              }
            })
          });
          if (result == false) {
            throw '多表头列重复定义';
          } else {
            return true;
          }
        }
      },
      initData() {
        if (this.validatorMulti()) {

          this.groupColumns = [];
          this.groupColumns = this.groupColumns.concat(this.groupInfos);
          if (this.groupColumns.length == 0) {
            this.totalSum = {};
          } else {
            var handledResult = this.orderBy(this.dataList, this.groupColumns, this.sortReport, this.lorder);
            this.dataList = handledResult.results;

            this.totalSum = handledResult.totalSum;
          }

          //列合计
          this.dataList.forEach((item) => {
            var total = 0;
            var flag = this.titles.every((titem) => {
              if (this.totalIgnore.indexOf(titem.name) == -1 && this.groupColumns.indexOf(titem.name) == -1 && titem.name != '_$columnTotal') {
                var itemvalue = 0;
                try {
                  if (this.totalFormatter) {
                    var ssvalue = this.totalFormatter(titem.name, item[titem.name]);
                    itemvalue = isNaN(ssvalue) ?  0:ssvalue;
                  } else {

                    if (this.totalType.toLowerCase() == "int") {
                      itemvalue = parseInt(item[titem.name]);
                    } else if (this.totalType.toLowerCase() == "FLOAT") {
                      itemvalue = parseFloat(item[titem.name]);
                    } else {
                      itemvalue = parseInt(item[titem.name]);
                    }
                  }
                  if (isNaN(itemvalue)) {
                    return false;
                  }
                } catch (e) {
                  itemvalue = 0;
                }
                total += itemvalue-0;
                return true;
              } else {
                return true;
              }
            });
            if (!flag) {
              total = '';
            } else {
              if (this.totalFormatter) {
                total = this.totalFormatter('total', total);
              }
            }

            if (this.columnTotal) {
              item['_$columnTotal'] = total;
            } else {
              delete item['_$columnTotal'];
            }
          });

          console.log(this.dataList);
          var columnFlag = this.titles.every((item) => {
            if (item.name == '_$columnTotal') {
              return false;
            } else {
              return true;
            }
          });
          if (columnFlag) {

            if (this.columnTotal) {
              this.titles.push({
                name: '_$columnTotal',
                title: '合计'
              });
            }
          } else {
            if (!this.columnTotal) {
              this.titles.pop();
            }
          }
          this.handledTitle();

          this.render();
        }
      },
      refresh() {
        this.initData();

      },
      initProgress(watching) {
        if (this.progressShow) {
          this.$refs.spinner.show();
        } else {
          watching && this.$refs.spinner.hide();
        }
      }
    },
    watch: {
      progressShow(a, b) {
        this.initProgress(true);
      }
    },
    attached() {
      if (this.scrollleft) {
        var xscroll = this.$el.querySelector('.xscroll');
        xscroll.scrollLeft = this.scrollleft;
      }
      if (this.scrollTop) {
        var yscroll = this.$el.querySelector('.yscroll');
        yscroll.scrollTop = this.scrollTop;
      }
    },
    ready() {
      this.initData();
      this.initProgress();
    },
    props: {
      dataList: {
        require: true,
        type: Array,
        default: () => {
          return [];
        }
      },
      multiTitles: {
        type: Array,
        default: () => {
          return [];
        }
      },
      titles: {
        type: Array,
        default: () => {
          return [];
        },
        require: true
      },
      groupInfos: {
        type: Array,
        default: () => {
          return [];
        }
      },
      rowTotal: {
        type: Boolean,
        default: true
      },
      totalIgnore: {
        type: Array,
        default: () => {
          return [];
        }
      },
      columnTotal: {
        type: Boolean,
        default: false
      },
      progressShow: {
        type: Boolean,
        default: false
      },
      lorder: {
        type: Array,
        default: () => {
          return [];
        }
      },
      tdHeight: {
        type: Number,
        default: 40
      },
      totalFormatter: {
        type: Function
      },
      totalType: {
        type: String,
        default: 'int' //类型  int 或者 float
      },
      sortReport: {
        type: String,
        default: "desc"
      }
    }
};
</script>
<style lang="css">
.metable {
  width: 100%;
  height: 100%;
  margin: 0;
  background: #fff;
  overflow: hidden;
}

.metable .group,
.dataitem {
  position: absolute;
  top: 0px;
  bottom: 0px;
  overflow: hidden;
}

.metable .xscroll {
  position: absolute;
  height: 17px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  overflow-x: auto;
  overflow-y: hidden;
  z-index: 3;
  display: none;
}

.metable .yscroll {
  position: absolute;
  width: 17px;
  top: 0px;
  bottom: 0px;
  right: 0px;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 3;
  display: none;
}

.xscrollmonitor {
  height: 1px;
  width: 5000px;
}

.yscrollmonitor {
  height: 5000px;
}

.metable table {
  table-layout: fixed;
  margin-bottom: 0px !important;
}

.metable .head {
  position: relative;
  z-index: 2;
}

.metable .content {
  position: relative;
  z-index: 1;
}

.metable th {
  vertical-align: middle !important;
  text-align: center !important;
  border: 1px solid #495264!important;
  font-weight: normal;
  color: #ffffff;
  background: #5d677c;
}

.metable th,
.metable td,
.metable tr {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center !important;
  vertical-align: middle !important;
}

.metable .locktable,
.normaltable {
  width: 100%;
}

.metable .rowTotal {
  vertical-align: middle !important;
  text-align: center !important;
  font-weight: normal;
  color: #ffffff;
  background: #5d677c;
}

.metable .spinner {
  position: absolute !important;
}


/*
.metable .locktable {
  left: 0px;
  border-right: 1px solid #495264!important;
}

.metable .locktable tr td:last-of-type {
  border-right: 1px solid #495264!important;
}*/
</style>
