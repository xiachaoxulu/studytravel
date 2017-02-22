<template>
  <div class="wrap" @click.stop="">
    <div class="header">
      <span class="change-btn" @click.stop="changeYear(-1)"><i class="material-icons">keyboard_arrow_left</i></span>
      <span>{{dateSelected.y+'年'}}</span>
      <span class="change-btn" @click.stop="changeYear(1)"><i class="material-icons">keyboard_arrow_right</i></span>
    </div>
    <div class="maincontent">
      <table>
        <tbody>
          <tr v-for="(rowindex,row) in rowsCount">
            <template v-for="(colindex,col) in colsCount">
              <td @click.stop="itemclick(rowindex,colindex)">
                <div class="item" v-bind:class="[
                  {'current-day':wraplist[rowindex*3+colindex+rowindex].year+'-'+wraplist[rowindex*3+colindex+rowindex].month==dateSelected.y+'-'+dateSelected.m}]">
                  {{{wraplist[rowindex*3+colindex+rowindex] | renderfilter}}}
                </div>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import vue from 'vue'

export default {
  data() {
      return {
        dateSelected: '',

        wraplist: [],
        rowsCount: 3,
        colsCount: 4,
      };
    },
    filters: {
      renderfilter(obj) {
        if (this.formatter) {
          return this.formatter(obj.year, obj.month);
        } else {
          return obj.month + '月';
        }
      }
    },
    methods: {
      reRender() {
        this.wraplist = this.wraplist.map((item) => {
          return item;
        });
      },
      changeYear(n) {
        let next = (this.dateSelected.y - 0 + n) + '-' + this.dateSelected.m + '-' + this.dateSelected.d;
        this.dateSelected = this.$Tool.iDate(new Date(next), 'yy-mm-dd');
      },
      itemclick(rowindex, colindex) {
        var obj = this.wraplist[rowindex * 3 + colindex + rowindex];
        this.currentIndex = rowindex * 3 + colindex + rowindex;
        if (this.itemclickcallback) this.itemclickcallback(this.dateSelected.y, obj.month);
      },
      initWrapList() {
        var currentYear = this.dateSelected.y;
        for (var i = 1; i < 13; i++) {
          this.wraplist.push({
            year: currentYear,
            month: i,
          });
        };
      }
    },
    created() {
      this.dateSelected = vue.Tool.iDate(new Date(), 'yy-mm-dd');
      this.initWrapList();
    },
    props: {
      formatter: {
        type: Function
      },
      itemclickcallback: {
        type: Function,
        default: function() {}
      },
    }
};
</script>
<style lang="css" scoped>
.wrap {
  width: 100%;
  height: 100%;
  box-sizing: content-box;
  background: #fff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, .3);
  user-select: none;
  position: relative;
}

.header {
  position: absolute;
  height: 30px;
  left: 0px;
  right: 0px;
  padding: 10px;
  text-align: left;
  box-sizing: content-box;
}

.change-btn {
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
}

.change-btn:hover {
  color: red;
}

.maincontent {
  position: absolute;
  top: 50px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  padding: 10px;
}

.maincontent table {
  width: 100%;
  height: 100%;
  table-layout: fixed;
}

.maincontent td,
th {
  text-align: center;
  vertical-align: middle;
}

.maincontent th {
  height: 30px;
}

.maincontent td {
  padding: 5px;
}

.maincontent .item {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  cursor: pointer;
  color: #97948C;
  text-align: center;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #fff;
}

.maincontent .item:hover {
  border: 1px solid #F65C49 !important;
}

.maincontent .click {
  border: 1px solid #3e3c59 !important;
}

.current-month {
  color: black !important;
}

.current-day {
  color: #fff !important;
  background: #F65C49;
  border-radius: 10px;
}
</style>
