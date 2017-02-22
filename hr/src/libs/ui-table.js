/**
* @Author             : Yang
* @Created Date       : 2016-06-02 00:18:52
* @Last Modified by   :
* @Last Modified time : 2016-11-07 11:00:09
*/
import 'libs/jquery.mousewheel.min.js'
export default function(vm) {

    var options = {
        selected: false
    }

    // 获取表格元素
    var el = $(vm.$el),
        uitable              = el.find('div.ui-table'),
        tableHeader          = el.find('div.ui-table-header-wrap'),
        tableCheckbox        = el.find('div.ui-table-checkbox'),
        tableCheckBody       = el.find('div.ui-table-content-wrap div.ui-table-checkbox'),
        tableLockedFirst     = el.find('div.ui-table-locked-front'),
        tableLockedLast      = el.find('div.ui-table-locked-last'),
        tableNormal          = el.find('div.ui-table-normal'),
        tableHeaderNormal    = el.find('div.ui-table-header-wrap div.ui-table-normal'),
        tableBodywrap        = el.find('div.ui-table-content-wrap'),
        tableBody            = el.find('div.ui-table-content-wrap div.ui-table-body'),
        tableBodyNormal      = el.find('div.ui-table-content-wrap div.ui-table-body.ui-table-normal'),
        tableBodyNormalTable = tableBodyNormal.find('table'),
        tableBox             = el.find('div.ui-table-content-wrap div.ui-table-box'),
        tablboxHeight        = 0,
        tablePager           = el.find('div.ui-table-pager'),
        xline                = el.find('div.ui-table-xline'),
        xbar                 = el.find('div.ui-table-xbar'),
        xbar_inner           = el.find('div.ui-table-xbar ._bar'),
        ybar                 = el.find('div.ui-table-ybar'),
        ybar_inner           = el.find('div.ui-table-ybar ._bar'),


        // 修复谷歌内核v55版本bug
        // overflow:auto 容器内元素尺寸改变导致滚动条莫名其妙隐藏  【解决办法：父元素高度必须大于滚动条宽度】

        sbarWidth            = (ybar[0].offsetWidth - ybar[0].scrollWidth) ? (ybar[0].offsetWidth - ybar[0].scrollWidth)+2 : 20, // 滚动条宽度
        scrollLeft           = 0;

    /**
     * 根据col宽度获取整体宽度，<col width="50px"></col>
     * @param  {[type]} table [description]
     * @return {[type]}       [description]
     */
    function getColWidth(table) {
        var width = 0;
        table.find('col').each(function(index, item) {
            width += $(item).width();

            // console.log($(item).width())

        })

        return width;
    }

    /**
     * 初始化布局
     * @return {[type]} [description]
     */
    function layoutInit() {

        let tablboxHeightList = [tableBox.eq(0).height(), tableBox.eq(1).height(), tableBox.eq(2).height()];

        tablboxHeight = Math.max.apply({}, tablboxHeightList);

        // console.info(tablboxHeight);

        // 选择列
        var checkboxWidth = tableCheckbox.width();
        tableCheckbox.find('td').height(tableLockedFirst.find('td').height())

        // 是否有横向滚动条
        var xbarHeight = tableBodyNormalTable.width() > tableBodyNormal.width() ? sbarWidth : sbarWidth;
        var ybarWidth = tablboxHeight > tableBodywrap.height() ? sbarWidth : 0;

        // console.log(tableBodyNormalTable.width(),tableBodyNormal.width())

        // 锁定列 前
        tableLockedFirst.width(getColWidth(tableLockedFirst.eq(0)) + 1);
        tableLockedFirst.css({
            'left': checkboxWidth - 1 + 'px'
        })

        // 锁定列 后
        tableLockedLast.width(getColWidth(tableLockedLast.eq(0)));
        tableLockedLast.css({
            right: ybarWidth + 'px'
        });
        // tableLockedLast.css('min-width',ybarWidth+1+'px'); // 预留滚动条位置

        // 正常列
        var contLeft = tableLockedFirst.width() - 1 + checkboxWidth - 1,
            contRight = tableLockedLast.width() - 1 + ybarWidth;

        // console.info(contLeft, contRight);

        tableNormal.css({
            'left': contLeft + 'px',
            'right': contRight + 'px'
        })

        // 横向滚动条
        xbar.css({
            'margin-left': contLeft + 'px',
            'margin-right': contRight + 'px'
        })
        xbar.height(xbarHeight);

        xbar_inner.width(tableNormal.find('table').width());

        xline.css({
            'bottom': tablePager.outerHeight() + 'px'
        })

        // 竖向滚动条
        ybar_inner.height(tablboxHeight);

        // 计算选择列和内容列的高度
        tableBody.height(uitable.height() - tableHeader.height() - tablePager.outerHeight() - xbarHeight);
        tableCheckBody.height(uitable.height() - tableHeader.height() - tablePager.outerHeight() - xbarHeight);


    }

    /**
     * 刷新布局、滚动条
     * @return {[type]} [description]
     */
    function refresh() {


        // 刷新后，table有变化，重新获取
        // tableBodyTable     = el.find('div.ui-table-content-wrap div.ui-table-body table');

        // console.log('table-refresh')

        layoutInit();


        var sT = ybar.scrollTop(),
            sL = xbar.scrollLeft();

        // console.log('sT',sT)
        tableBody.scrollTop(sT);
        tableCheckBody.scrollTop(sT);

        xbar.scrollLeft(sL);

    }

    /**
     * 滚轮事件监听，使用滚轮时间监听插件
     * @param  {[type]} e     [description]
     * @param  {[type]} delta [滚轮方向 up>0 down<0]
     * @return {[type]}       [description]
     */
    function mousewheelEvent(e, delta) {

        // console.log(tableBox.height())


        // 优先竖向
        if (tablboxHeight > tableBodywrap.height()) {
            // console.log(delta)
            var sT = ybar.scrollTop();
            // up
            if (delta > 0) {
                sT -= 30;
            }
            // down
            else {
                sT += 30;
            }

            ybar.scrollTop(sT);
            tableBody.scrollTop(sT);
            tableCheckBody.scrollTop(sT);

        } else {
            // 横向
            var sL = xbar.scrollLeft();
            // up
            if (delta > 0) {
                sL -= 30;
            }
            // down
            else {
                sL += 30;
            }

            xbar.scrollLeft(sL)
            tableNormal.scrollLeft(sL)
        }
    }

    /**
     * 初始化
     * @param  {[type]} config [description]
     * @return {[type]}        [description]
     */
    function init(config) {

        // console.log('table-init')

        //
        for (var i in config) {
            options[i] = config[i]
        }

        layoutInit();


        var refreshTimer;
        $(window).on('resize', function() {
            clearTimeout(refreshTimer)
            refreshTimer = setTimeout(function(){
                refresh()
            },200)
        })


        // 注册滚轮事件
        tableHeaderNormal.on('mousewheel', mousewheelEvent);
        tableBodywrap.on('mousewheel', mousewheelEvent);

        // 竖向滚动
        ybar.on('scroll', function(e) {
            var sT = $(this).scrollTop();
            tableBody.scrollTop(sT);
            tableCheckBody.scrollTop(sT);
        });

        // 横向滚动
        xbar.on('scroll', function(e) {
            var sL = $(this).scrollLeft()

            if (scrollLeft != sL) {
                tableNormal.scrollLeft(sL)
            }
            scrollLeft = sL;
        });
    }

    // init();

    return {
        init: init,
        refresh: refresh, // 表格数据修改后，需要调用refresh来更新表格布局
    }


}
