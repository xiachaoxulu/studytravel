<template>
  <div>
    <div class="transfer-wrap">
      <div class="transfer-list">
        <div class="transfer-list-header">
          <span>{{srcTitle}}</span>
          <span>
            <span>{{remainList.length}}条</span>
          </span>
        </div>
        <div class="transfer-list-body">
          <ul>
            <li v-for="item in remainList" @click="addItem(item,$index)">
              <span>{{item.label}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="change-list-btn">
        <div class="go-before-btn">
          <button @click="removeAll"> &lt;</button>
        </div>
        <div class="go-after-btn">
          <button @click="addAll"> &gt;</button>
        </div>
      </div>
      <div class="transfer-list">
        <div class="transfer-list-header">
          <span>{{destTitle}}</span>
          <span>
            <span>{{chosenList.length}}条</span>
          </span>
        </div>
        <div class="transfer-list-body">
          <ul>
            <li v-for="item in chosenList" @click="removeItem(item,$index)">
              <span>{{item.label}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
      return {
        remainList: []
      }
    },
    props: {
      srcTitle: {
        type: String,
        default: '可选列表'
      },
      destTitle: {
        type: String,
        default: '已选列表'
      },
      srcList: {
        type: Array,
        default: []
      },
      chosenList: {
        type: Array,
        twoWay: true,
        default: () => {
          return [];
        }
      }
    },
    methods: {
      removeAll() {
        for (var i = 0; i < this.chosenList.length; i++) {
          this.remainList.$set(this.remainList.length, this.chosenList[i])
        }
        this.chosenList = [];
      },
      addAll() {
        for (var i = 0; i < this.remainList.length; i++) {
          this.chosenList.$set(this.chosenList.length, this.remainList[i])
        }
        this.remainList = [];
      },
      addItem(data, index) {
        this.remainList.$remove(this.remainList[index]);
        this.chosenList.$set(this.chosenList.length, data);
      },
      removeItem(data, index) {
        this.chosenList.$remove(this.chosenList[index]);
        this.remainList.$set(this.remainList.length, data);
      }
    },
    ready() {
      this.remainList = this.srcList.slice(0);
    }
}
</script>
<style>
.transfer-wrap {
  /*width: 400px;*/
  width: 100%;
  height: 200px;
  text-align: center;
}

.change-list-btn {
  display: inline-block;
  overflow: hidden;
  margin: 0 8px;
  vertical-align: middle;
}

.change-list-btn button:active,
.change-list-btn button:hover {
  color: #fff;
  background-color: #2db7f5;
  border-color: #2db7f5;
}

.change-list-btn button {
  border: none;
  color: #ccc;
  background-color: #f7f7f7;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  margin-top: 5px;
}

.transfer-list {
  font-size: 12px;
  border: 1px solid #d9d9d9;
  display: inline-block;
  border-radius: 6px;
  vertical-align: middle;
  position: relative;
  width: 160px;
  height: 200px;
  padding-top: 33px;
}

.transfer-list-header {
  position: absolute;
  top: 0;
  left: 0;
  padding: 4px 10px;
  width: 100%;
}

.transfer-list-header input {
  position: relative;
  top: 3px;
  left: 0;
  margin-right: 3px;
}

.transfer-list-header span:first-child {
  float: right;
  padding-top: 3px;
}

.transfer-list-header span:last-child {
  float: left;
}

.transfer-list-body {
  overflow: auto;
  height: 100%;
  border-top: 1px solid #d9d9d9;
}

.transfer-list-body ul li {
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 7px 16px;
  padding-left: 0;
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
  text-indent: 2em;
  text-align: left;
}

.transfer-list-body ul li input {
  position: absolute;
  top: 6px;
  left: 10px;
}

.transfer-list-body ul li:hover {
  background: #2db7f5;
  color: #fff;
}
</style>
