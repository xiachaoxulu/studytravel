<template>
  <div>
    <style type="text/css">
    {{cstyle}}
    </style>
    <div class="wrap" @click.stop="">
      <div class="header">
        <span class="change-btn" @click.stop="changeDate(-1)"><i class="material-icons">keyboard_arrow_left</i></span>
        <span>{{dateSelected.y+'年'+dateSelected.m+'月'}}</span>
        <span class="change-btn" @click.stop="changeDate(1)"><i class="material-icons">keyboard_arrow_right</i></span>
      </div>
      <div class="maincontent">
        <table>
          <thead>
            <tr>
              <th>日</th>
              <th>一</th>
              <th>二</th>
              <th>三</th>
              <th>四</th>
              <th>五</th>
              <th>六</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(rowindex,row) in rowsCount">
              <template v-for="(colindex,col) in colsCount">
                <td @click.stop="itemclick(rowindex,colindex)">
                  <div class="item" v-bind:class="[
                  { 'current-month' :wraplist[rowindex*6+colindex+rowindex].type === 'current'},
                  {'current-day':wraplist[rowindex*6+colindex+rowindex].year+'-'+wraplist[rowindex*6+colindex+rowindex].month+'-'+wraplist[rowindex*6+colindex+rowindex].day==dateSelected.y+'-'+dateSelected.m+'-'+dateSelected.d},{'click':(rowindex*6+colindex+rowindex)==currentIndex}]">
                    {{{wraplist[rowindex*6+colindex+rowindex] | renderfilter}}}
                  </div>
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
      return {
        dateSelected: '',

        wraplist: [],
        rowsCount: 6,
        colsCount: 7,

        currentIndex: -1
      };
    },
    filters: {
      renderfilter(obj) {
        if (this.formatter) {
          return this.formatter(obj.year, obj.month, obj.day);
        } else {
          return obj.day;
        }
      }
    },
    methods: {
      reRender() {
        this.wraplist=this.wraplist.map((item) => {
          return item;
        });
      },
      getRange() {
        return {
          start: Object.assign({}, this.wraplist[0]),
          end: Object.assign({}, this.wraplist[this.wraplist.length - 1])
        }
      },
      itemclick(rowindex, colindex) {
        var obj = this.wraplist[rowindex * 6 + colindex + rowindex];
        this.currentIndex = rowindex * 6 + colindex + rowindex;
        if (this.itemclickcallback) this.itemclickcallback(obj.year, obj.month, obj.day);
      },
      changeDate(n) {
        let now = this.dateSelected;
        var next;
        // 前一年
        if (now.m + n <= 0) {
          next = (this.dateSelected.y - 1) + '-' + '12-' + now.d;
        }
        // 后一年
        else if (now.m + n > 12) {
          next = (this.dateSelected.y + 1) + '-' + '01-' + now.d;
        } else {
          next = this.dateSelected.y + '-' + (this.dateSelected.m + n) + '-' + now.d;
        }
        if (n == 0) {
          this.dateSelected = this.$Tool.iDate(new Date(), 'yy-mm-dd');
        } else {
          this.dateSelected = this.$Tool.iDate(new Date(next), 'yy-mm-dd');
        }
        this.initwraplist();
        if (n > 0) {
          if (this.controllastcallback) this.controllastcallback(this.dateSelected.y, this.dateSelected.m);
        } else {
          if (this.controlnextcallback) this.controlnextcallback(this.dateSelected.y, this.dateSelected.m);
        }
      },

      initwraplist() {
        this.wraplist = [];
        var currentYear = this.dateSelected.y;
        var currentMonth = this.dateSelected.m;
        var currentDay = this.dateSelected.d;
        var temp = new Date(currentYear, currentMonth, 0);
        var currentMonthDays = temp.getDate(); //本月有多少天
        for (var i = 1; i <= currentMonthDays; i++) {
          this.wraplist.push({
            type: 'current',
            year: currentYear,
            month: currentMonth,
            day: i
          });
        };

        temp = new Date(currentYear, currentMonth - 1, 1);
        var firstWeekDay = temp.getDay(); //本月1号是周几
        temp = new Date(currentYear, currentMonth - 1, 0);
        var lastyear = temp.getFullYear();
        var lastmonth = temp.getMonth() + 1;

        var lastMonthDays = temp.getDate(); //上月有多少天
        var lastMonthArr = [];
        for (var i = 1; i <= lastMonthDays; i++) {
          lastMonthArr.push(i);
        }
        //填充上月天数到列表中
        if (firstWeekDay !== 0) {
          lastMonthArr.slice(-firstWeekDay).reverse().forEach((item) => {
            this.wraplist.unshift({
              type: 'last',
              year: lastyear,
              month: lastmonth,
              day: item,
            });
          });
        }

        temp = new Date(currentYear, currentMonth + 1, 0);
        var nextyear = temp.getFullYear();
        var nextmonth = temp.getMonth() + 1;
        var len = this.wraplist.length;
        for (var i = 1; i <= this.rowsCount * this.colsCount - len; i++) {
          this.wraplist.push({
            type: 'next',
            year: nextyear,
            month: nextmonth,
            day: i
          });
        }

      }
    },
    created() {
      this.dateSelected = this.$Tool.iDate(new Date(), 'yy-mm-dd');
      this.initwraplist();
    },
    ready() {},
    props: {
      formatter: {
        type: Function
      },
      cstyle: {
        type: String,
        default: ''
      },
      itemclickcallback: {
        type: Function,
        default: function() {}
      },
      controllastcallback: {
        type: Function,
        default: function() {}
      },
      controlnextcallback: {
        type: Function,
        default: function() {}
      }
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
