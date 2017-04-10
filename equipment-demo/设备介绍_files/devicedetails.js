/**
 * Created by Administrator on 16-3-15.
 */
var params = util.getParameters();
var App = {

    init: function () {
        App.initEvent();
        App.initPageData();
    },

    initEvent: function () {

        var scrollImg = $.mggScrollImg('.imgbox ul', {
            loop: true,//循环切换
            auto: true,//自动切换
            auto_wait_time: 3000,//轮播间隔
            scroll_time: 300,//滚动时长
            callback: function (ind) {//这里传过来的是索引值
                $('#page').text(ind + 1);
            }
        });

    },

    initPageData: function () {
    },
    next: function (data) {

        util.redirect("/interface/page/orderdatachooice.html?deviceId=" + data, params);
    }

}
App.init();
