<template>
  <div class="view-container">
    <div class="main">
      <div class="nav-prev" @click="changepre">
        <span class="switch-btn"></span>
      </div>
      <div class="center">
        <div class="images" v-el:imagelist>
          <div class="img-wrap" v-for="(index,item) in imgurls">
          </div>
          <v-spinner :size="md" text="" v-ref:spinner v-for="(index,item) in imgurls"></v-spinner>
        </div>
      </div>
      <div class="nav-next" @click="changenext">
        <span class="switch-btn"></span>
      </div>
    </div>
    <div class="bottom">
      <div class="tools">
        <span class="view-btn plus" @click="scalePlus"><span class="b-before"></span><i></i></span>
        <span class="scale">100%</span>
        <span class="view-btn sub" @click="scaleSub"><i></i></span>
        <span class="view-btn size" @click="imgreset"><span class="b-before"></span>原始尺寸<i></i></span>
        <span class="view-btn download" @click="download"><span class="b-before"></span>下载<i></i></span>
      </div>
    </div>
  </div>
</template>
<script>
function imageOpt(url) {
  this.url = url;
  this.state = 'init'; // init  | loading | compelete
  this.scale = 1;
  this.width = 0;
  this.height = 0;
  this.imgNode = document.createElement('img');

  var ismove = false;
  var downX, downY;
  this.imgNode.lasthisX = this.imgNode.lasthisY = 0;
  this.imgNode.addEventListener('dragstart', (e) => {
    e.preventDefault();
  });
  this.imgNode.addEventListener('mousedown', (e) => {
    downX = e.clientX;
    downY = e.clientY;
    ismove = true;
    this.imgNode.classList.add('grabing');
  })
  this.imgNode.addEventListener('mouseup', (e) => {
    if (ismove) {
      ismove = false;
      this.imgNode.lasthisX += e.clientX - downX;
      this.imgNode.lasthisY += e.clientY - downY;
      this.imgNode.classList.remove('grabing');
    }
  })
  this.imgNode.addEventListener('mouseleave', (e) => {
    if (ismove) {
      ismove = false;
      this.imgNode.lasthisX += e.clientX - downX;
      this.imgNode.lasthisY += e.clientY - downY;
      this.imgNode.classList.remove('grabing');
    }
  })
  var reg = /translate\s*\(.*?\)/ig;
  this.imgNode.addEventListener('mousemove', (e) => {
    if (ismove) {
      if (reg.test(this.imgNode.style.transform)) {
        this.imgNode.style.transform = this.imgNode.style.transform.replace(reg, 'translate(' + (this.imgNode.lasthisX + e.clientX - downX) + 'px,' + (this.imgNode.lasthisY + e.clientY - downY) + 'px)');
      } else {
        this.imgNode.style.transform += ' translate(' + (this.imgNode.lasthisX + e.clientX - downX) + 'px,' + (this.imgNode.lasthisY + e.clientY - downY) + 'px)';
      }

    }
  });
}

imageOpt.prototype.mount = function(parentNode, cb) {

  if (parentNode && parentNode.nodeType == 1) {

    this.imgNode.addEventListener('load', () => {
      this.state = "compelete";
      parentNode.appendChild(this.imgNode);
      this.width = this.imgNode.offsetWidth;
      this.height = this.imgNode.offsetHeight;
      cb && cb(this);
    });
    this.imgNode.src = this.url;
    this.state = 'loading';

  } else {
    throw new Error('父节点要是element类型节点')
  }
}
imageOpt.prototype.reset = function() {
  if (this.state == "compelete") {
    this.imgNode.style.transform = "";
    this.imgNode.lasthisX = 0;
    this.imgNode.lasthisY = 0;
    this.scale = 1;
  } else {
    throw new Error('还没有加载完成')
  }
}

imageOpt.prototype.customscale = function(val) {
  if (!Number.isNaN(val)) {
    this.scale = val;
    var reg = /scale\s*\(.*?\)/;
    if (reg.test(this.imgNode.style.transform)) {
      this.imgNode.style.transform = this.imgNode.style.transform.replace(reg, "scale(" + val + ")");
    } else {
      this.imgNode.style.transform += "scale(" + val + ")";
    }
  }
}
imageOpt.prototype.scalePlus = function(step) {
  var step = step || 5;
  var val = this.scale + step / 100;
  this.customscale(val);
}
imageOpt.prototype.scaleSub = function(step) {
  var step = step || 5;
  var val = this.scale - step / 100;
  this.customscale(val);
}

imageOpt.prototype.download = function(name) {
  var save_link = document.createElement('a');
  save_link.href = this.url;
  save_link.download = name || 'credentials.png';
  var event = document.createEvent('MouseEvents');
  event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  save_link.dispatchEvent(event);
}

export default {
  data() {
      return {
        imglist: []
      }
    },
    methods: {
      download() {
        this.imglist[this.curimgIndex].download();
      },
      scalePlus() {
        this.imglist[this.curimgIndex].scalePlus();
        this.$el.querySelector('.scale').innerText = parseInt(this.imglist[this.curimgIndex].scale * 100) + '%';
      },
      scaleSub() {
        this.imglist[this.curimgIndex].scaleSub();
        this.$el.querySelector('.scale').innerText = parseInt(this.imglist[this.curimgIndex].scale * 100) + '%';
      },
      imgreset() {
        this.imglist[this.curimgIndex].reset();
        this.$el.querySelector('.scale').innerText = parseInt(this.imglist[this.curimgIndex].scale * 100) + '%';
      },
      changepre() {
        this.curimgIndex > 0 ? this.curimgIndex-- : 0;
        this.change();
      },
      changenext() {
        this.curimgIndex >= this.imgurls.length - 1 ? 0 : this.curimgIndex++;
        this.change();
      },
      change() {
        if(this.imgurls.length===0){
          return;
        }
        if (this.imglist[this.curimgIndex]) {
          this.$el.querySelector('.images').style.marginLeft = "-" + this.curimgIndex * 100 + "%";
        } else {
          var img = new imageOpt(this.imgurls[this.curimgIndex]);
          this.imglist[this.curimgIndex] = img;
          var imgwrap = this.$el.querySelectorAll('.img-wrap')[this.curimgIndex];
          this.$refs.spinner[this.curimgIndex].show();
          img.mount(imgwrap, () => {
            this.$refs.spinner[this.curimgIndex].hide();
          });
          this.$el.querySelector('.images').style.marginLeft = "-" + this.curimgIndex * 100 + "%";
        }

      }
    },
    ready() {
       
      this.change();
    },
    props: {
      imgurls: {
        type: Array,
        default: () => {
          return [];
        }
      },
      curimgIndex: {
        default: 0
      }
    }
};
</script>
<style lang="css">
.view-container {
  width: 100%;
  height: 100%;
  position: relative;
  background: #fff;
  min-height: 500px;
}

.view-container .main {
  position: absolute;
  top: 0px;
  bottom: 36px;
  width: 100%;
}

.view-container  .main .nav-prev,
.view-container  .main .nav-next {
  position: absolute;
  top: -3px;
  right: 0;
  width: 70px;
  font-size: 40px;
  color: #ccc;
  background: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;
  height: 100%;
  transition: background-color .2s ease-in;
  user-select: none;
}

.view-container  .main .nav-prev {
  left: 0;
}

.view-container  .main .nav-prev:hover,
.view-container  .main .nav-next:hover {
  background: #e6e6e6;
}

.view-container  .main .switch-btn {
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -85px 0 0 -18px;
  width: 40px;
  height: 72px;
  background: url('../../assets/images/slider_btn_icon.png') no-repeat 0 0;
}

.view-container  .main .nav-prev .switch-btn {
  background-position: 0 -87px;
  margin-left: -26px;
}

.view-container  .main .nav-prev:hover .switch-btn {
  background-position: -46px -87px;
}

.view-container  .main .nav-next:hover .switch-btn {
  background-position: -46px 0;
}

.view-container  .center {
  position: relative;
  margin: 3px 70px;
  overflow: hidden;
  height: 100%;
}

.view-container  .center .images {
  width: 100%;
  height: 100%;
  white-space: nowrap;
  transition: all 1s;
}

.view-container  .center .img-wrap {
  width: 100%;
  height: 100%;
  display: inline-flex;
  vertical-align: bottom;
  justify-content: center;
  flex-flow: row nowrap;
  align-items: center;
  overflow: hidden;
}

.view-container  .center img {
  cursor: -webkit-grab;
  cursor: grab;
}

.view-container  .center img.grabing {
  cursor: -webkit-grabbing;
  cursor: grabbing;
}

.view-container  .bottom {
  position: absolute;
  bottom: 0;
  left: 0px;
  right: 0px;
  line-height: 36px;
  height: 36px;
  text-align: center;
  background: #fafafa;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
}

.view-container  .tools span {
  display: inline-block;
  user-select: none;
  cursor: pointer;
}

.view-container  .tools .scale {
  margin: 0;
  width: 36px;
  padding-left: 0;
  color: #666;
  overflow: hidden;
  text-align: center;
  vertical-align: top;
}

.view-container  .tools .view-btn {
  color: #666;
  transition: background-color .2s ease-in;
  padding: 0 7px;
  position: relative;
}

.view-container  .tools .view-btn:hover {
  background-color: #e3e3e3;
  text-decoration: none;
}

.view-container  .tools .view-btn .b-before {
  content: ".";
  display: block;
  position: absolute;
  left: -1px;
  top: 10px;
  width: 1px;
  height: 18px;
  overflow: hidden;
  background-color: #dfdfdf;
}

.view-container .tools .view-btn i {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 17px;
  overflow: hidden;
  background: url('../../assets/images/toolbar.png') no-repeat left center transparent;
}

.view-container  .tools .sub i {
  background-position: -15px 4px;
}

.view-container .tools .plus i {
  background-position: 5px 4px;
}

.view-container  .tools .size i {
  margin-left: 5px;
  background-position: -40px -60px;
}

.view-container  .tools .download i {
  margin-left: 5px;
}
</style>
