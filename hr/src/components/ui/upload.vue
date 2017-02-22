<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">
        <ui-button color="primary" :disabled="isUpload" @click="addfileClick">添加</ui-button>
        <ui-button color="success" @click="uploadfilesClick" :disabled="isUpload" :loading="isUpload">上传</ui-button>
        <a class="accordion-toggle"  style="cursor:default;text-decoration: none;">
          <span>允许文件格式:</span>
          <span class="format">{{ filetypelimit | filetypefilter}}</span>
        </a>
      </h4>
    </div>
    <div class="panel-collapse" v-show="isOpen" transition="collapse">
      <div class="panel-body">
        <table class="table table-hover table-striped uploadtable">
          <thead>
            <tr>
              <th>文件名</th>
              <th>类型</th>
              <th>大小</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="file in fileList">
              <td>{{file.fileName}}</td>
              <td>{{file.type}}</td>
              <td>{{file.size}}</td>
              <td>
                <button type="button" class="btn-xs btn btn-danger mybtn" :disabled="isUpload" :class="{'disabled':isUpload}" @click="fileremoveClick(file.id)">
                  <span class="ui-icon material-icons small">close</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="panel-footer">
      <div class="footer-info">
        <span>待上传({{fileList.length}})</span>
        <span v-show="isError" class="tip">{{ tips }}</span>
      </div>
      <ui-progress-linear :show="showProgress" color="primary"></ui-progress-linear>
    </div>
    <form style='display:none' encType="multipart/form-data" name="submitform" method="post" :action="submiturl" target="hidden_frame">
    </form>
    <iframe name='hidden_frame' style='display:none'></iframe>
  </div>
</template>
<script>
import EventListener from '../vstrap/utils/EventListener.js'
import Vue from 'vue';


export default {
  data() {
      return {
        fileList: [],
        isError: false,
        tips: '',
        isUpload: false,
        showProgress: false,
        isOpen: true
      }
    },
    components: {

    },
    props: {
      submiturl: {
        type: String,
        default: '',
        required: true
      },
      filecountlimit: {
        type: Number,
        default: 1
      },
      filetypelimit: {
        type: String,
        default: 'rar|jpg|zip|'
      },
      filesizelimit: {
        type: Number,
        default: 2048
      },
      callback: {
        type: Function,
        default: function() {}
      },
      errortime: {
        type: Number,
        default: 2000
      }
    },
    filters: {
      filetypefilter(value) {
        var str = "";
        var types = value.split('|').forEach((item) => {
          if (item != "") {
            str += item.toUpperCase() + ",";
          }
        });
        if (str != "") {
          str = str.substring(0, str.length - 1);
        } else {
          str = "任何类型文件";
        }
        return str;
      }
    },
    methods: {
      toggleIsOpen() {
        this.$data.isOpen = !this.$data.isOpen;
      },
      fileremoveClick(id) {
        var self = this;
        self.$data.fileList.forEach(function(file) {
          if (file.id == id) {
            var _element = self.$el.querySelector("#" + id);
            var _parentElement = _element.parentNode;
            if (_parentElement) {
              _parentElement.removeChild(_element);
            }
            self.$data.fileList.$remove(file);
            return;
          }
        })
      },
      deleteemptyfile() {
        var self = this;
        var inputs = self.$el.querySelectorAll('input');
        if (inputs.length > 0) {
          [].forEach.call(inputs, (input) => {
            if (!input.value) {
              var _parentElement = input.parentNode;
              if (_parentElement) {
                _parentElement.removeChild(input);
              }
              return;
            }
          });
        }
      },
      checktype(type) {
        var self = this;
        var types = self.filetypelimit.split(',').map((item) => {
          if (item != "") {
            return item.replace(/(^\s*)|(\s*$)/g, '').toUpperCase();
          }
        });
        if (types.indexOf(type.toUpperCase()) == -1) {
          return false;
        } else {
          return true;
        }
      },
      addfileClick() {
        var id = this.createId();
        var self = this;
        if (self.$data.fileList.length >= self.filecountlimit) {
          self.showError("最多上传 " + self.filecountlimit + " 文件!");
          return;
        }

        var inputs = self.$el.querySelectorAll('input');
        var hasEmpty = false;
        if (inputs.length > 0) {
          [].forEach.call(inputs, (input) => {
            if (!input.value || !self.checktype(input.value.substring(input.value.lastIndexOf('.') + 1))) {
              hasEmpty = true;
              input.click();
              return false;
            }
          });
        }
        if (!hasEmpty) {
          var inputObj = document.createElement('input')
          inputObj.setAttribute('id', '_ef' + id);
          inputObj.setAttribute('type', 'file');
          inputObj.setAttribute("style", 'visibility:hidden');
          EventListener.listen(inputObj, 'change', (e) => {
            //srcElement FF target IE,chrome 兼容
            var src = e.srcElement || e.target;
            var type = src.value.substring(src.value.lastIndexOf('.') + 1);
            if (self.filetypelimit != "") {

              var types = self.filetypelimit.split(',').map((item) => {
                if (item != "") {
                  return item.replace(/(^\s*)|(\s*$)/g, '').toUpperCase();
                }
              });
              if (types.indexOf(type.toUpperCase()) == -1) {
                self.showError("不允许上传该类型文件！");
                return;
              }
            }
            if ((src.files[0].size / 1024) <= self.filesizelimit) {
              self.$data.fileList.push({
                id: src.getAttribute('id'),
                fileName: src.files[0].name,
                type: type,
                size: (src.files[0].size / 1024).toFixed(2) + "kb"
              });
            } else {
              inputObj.parentNode && inputObj.parentNode.removeChild(inputObj);
              self.showError("该文件大小:"+(src.files[0].size / 1024).toFixed(2) + "kb,文件最大为:" + self.filesizelimit + "kb");
              return;
            }
          });
          self.$el.querySelector('form').appendChild(inputObj);
          inputObj.click();
        }
      },
      createId() {
        var ids = [];
        this.$data.fileList.forEach(function(file) {
          ids.push(file.id.split('_ef')[1]);
        })
        if (ids.length == 0) {
          return 1;
        } else {
          return ((ids.sort((a, b) => {
            return a - b;
          }).pop() - 0) + 1)
        }
      },
      uploadfilesClick() {
        var self = this;
        if (self.$data.fileList.length == 0) {
          self.showError("没有文件需要上传！");
          return;
        }
        if (self.submiturl == "") {
          self.showError("上传地址为空！");
          return;
        }
        if (!self.$data.isUpload) {
          self.$data.isUpload = true;
          self.$data.showProgress = true;
          self.deleteemptyfile();

          var formData = new FormData();
          var form = self.$el.querySelector("form");
          var intputs = form.querySelectorAll("input");
          [].forEach.call(intputs, (file) => {
            formData.append(file.getAttribute('id'), file.files[0]);
          });
          const Tool = Vue.tool;
          Tool.ajax({
            url: self.submiturl,
            data: formData,
            success(data, res) {
              var path = data.photourl || data.url;
              if (data.monthID && data.suiteID) {
                self.callback({
                  monthID: data.monthID,
                  suiteID: data.suiteID
                });
              } else {
                var url;
                [].forEach.call(intputs, (input) => {
                  var file = input.files[0];
                  url = window.URL.createObjectURL(file);

                });
                self.callback(path, url);
              }
              self.$data.fileList = [];
              while (form.hasChildNodes()) {
                form.removeChild(form.firstChild);
              }
              self.$data.isUpload = false;
              self.$data.showProgress = false;
            },
            error(res) {

              self.showError(res);
              self.$data.isUpload = false;
              self.$data.showProgress = false;
            }
          });
        }
      },
      showError(msg) {
        var self = this;
        if (!self.$data.isError) {
          self.$data.isError = true;
          self.$data.tips = msg;
          setTimeout(() => self.$data.isError = false, self.errortime);
        }
      }
    },
    transitions: {
      collapse: {
        afterEnter: function afterEnter(el) {
          el.style.maxHeight = "";
        },
        beforeLeave: function beforeLeave(el) {
          el.style.maxHeight = el.offsetHeight + "px";
          return el.offsetHeight;
        }
      }
    }
}
</script>
<style scoped>
.accordion-toggle {
  cursor: pointer;
}

.mybtn {
  min-width: 0px !important;
  min-height: 0px !important;
  padding: 1px 5px !important;
  margin-top: 0px !important;
}

.format {
  color: red !important;
}

.collapse-transition {
  transition: max-height .5s ease;
  overflow: hidden;
}

.collapse-enter,
.collapse-leave {
  max-height: 0!important;
}

.uploadtable th {
  width: 25%;
}

.footer-info {
  margin-bottom: 10px;
}

.tip {
  font-size: 12px;
  color: red;
}
</style>
