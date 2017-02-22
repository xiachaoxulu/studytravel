<template>
  <div class="orgChart">
    <!-- 模块功能条 -->
    <header class="ui-module-navbar pos-topbar-fixed">
      <div class="ui-module-navbar-content">
        <div class="pull-left">
          <input type="button" id="export" class="btn btn-primary" value="导出" __code="org-post-export">
        </div>
      </div>
    </header>
    <ul id="org" style="display: none">
    </ul>
    <section class="ui-module-content pos-content">
      <div class="ui-module-row  chart">
        <div id="chart"></div>
      </div>
    </section>
    <ui-sidecontent :show.sync="bigdymicshow" :width="400" style="z-index:99999">
      <!-- 模块功能条 -->
      <header class="ui-module-navbar pos-topbar-fixed">
        <div class="ui-module-navbar-content">
          <div class="pull-left">
            员工
          </div>
        </div>
      </header>
      <!-- 模块主内容 -->
      <section class="ui-module-content pos-content">
        <div class="ui-module-row ui-panel">
          <employee-org-list></employee-org-list>
        </div>
      </section>
    </ui-sidecontent>
  </div>
</template>
<script>
import store from '../store'
import jOrgChart from '../../../libs/jquery.jOrgChart.js'
import prettifyjs from '../../../libs/prettify.js'
import html2canvas from '../../../libs/html2canvas.js'
import employeeOrgList from './employeeOrgList'
import mystore from './store'

function getChild(data, lii) {
  if (!data) {
    return;
  }
  var ul = $("<ul></ul>");
  lii.append(ul);
  for (var i = 0; i < data.length; i++) {
    var text = "";
    if (data[i].postName) {
      text = data[i].postName;
    }

    var li = $("<li>" + text + "</li>");
    if (data[i].tag) {
      li.prop('data', data[i].tag);
    } else {
      li.prop('data', data[i]);
    }
    getChild(data[i].children, li);
    ul.append(li);
  }
}
export default {
  data() {
      return {
        bigdymicshow: false
      };
    },
    components: {
      employeeOrgList,
      mystore
    },
    ready() {
      $("#export").on("click", function(event) {
        event.preventDefault();
        html2canvas($("#chart > div > table"), {
          allowTaint: true,
          taintTest: false,
          onrendered: function(canvas) {
            canvas.id = "mycanvas";
            var dataUrl = canvas.toDataURL();
            var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
            save_link.href = dataUrl;
            save_link.download = '组织架构.png';

            var event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            save_link.dispatchEvent(event);
          }
        });
      });

      store.actions.loadPostTree2(function(data) {
        solution(data);
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      })

      function solution(msg) {
        // console.log(msg);
        // if (msg.children.length == 0) {
        //   return;
        // }
        // var msg = msg.children[0];
        var li = $("<li>" + msg.postName + "</li>");
        li.prop('data', msg);
        $("#org").append(li);
        getChild(msg.children, li);
        $("#org").jOrgChart({
          chartElement: '#chart',
          dragAndDrop: false,
          callback: function(data) {
            self.bigdymicshow = true;
          }
        });
      }
    }
};
</script>
<style lang="css" scoped>
@import url(../../../assets/css/jquery.jOrgChart.css);
.orgChart {
  background: url('../../../assets/images/bkgd.png') repeat top left;
  padding-top: 10px;
  height: 100%;
}

.chart {
  overflow-x: auto;
}
</style>
