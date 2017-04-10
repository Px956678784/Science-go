/**
 * Created by Administrator on 16-1-27.
 */
var list = new Array();
var util = {
    /**
     * 页面跳转
     *
     * @param {}
     *            url
     * @param {}
     *            params
     */
    redirect: function (url, params) {
        url += (url.indexOf('?') > 0 ? '&' : '?') + 't=' + new Date().getTime();
        if (params != "" || params != null || params != undefined) {
            localStorage.setItem("_parameters",JSON.stringify(params));
        }
        localStorage.setItem('url', url);
        document.location.href = url;
    },
    /**
     * 返回parameters参数 特指页面跳转间传递的参数
     */
    getParameters: function () {
        var ps = localStorage.getItem("_parameters");
        localStorage.removeItem("_parameters");

        return ps ?JSON.stringify(ps) : {};
    },
    ajaxData: function (url, params, success, error) {
        jQuery.ajax({
            type: "post",
            async: true,
            cache: false,
            url: url,
            dataType: "json",
            data: params,
            success: function (data) {
                success(data)
            },

            error: function (data) {
                error(data)

            },
            complete: function(XMLHttpRequest) {
                //处理ajax请求后有重定向的情况
                var returnUrl = XMLHttpRequest.getResponseHeader("returnUrl");
                if(  returnUrl != null && returnUrl != "") {
                    window.location.href = returnUrl;
                }
            }
        });
    },

    saveItem: function (key, value) {
        localStorage.setItem(key, value);
    },

    getItem: function (key) {
        return localStorage.getItem(key);
    },

    setList: function (l) {

        localStorage.setItem("list", JSON.stringify(l));
    },

    getList: function () {

        return JSON.parse(localStorage.getItem("list"));
    },

    /**
     * 显示错误
     * @param msg
     */
    showError: function (msg, el) {
        this.showPinLabel(el, msg);
    },

    /**
     * 显示错误信息
     *
     * @param el
     * @param msg
     */
    showPinLabel: function (el, msg) {
        var tips = $("#error_tip");

        if (tips && tips.length == 0) {
            var sb = [];
            sb.push('<div style="position:fixed;top: 300px" id="error_tip" class="error-tip">');
            sb.push('	<div class="tip-msg"></div>');
            sb.push('</div>');
            $(document.body).append(sb.join(""));
            tips = $("#error_tip");
        }
        tips.find(".tip-msg").html(msg);
        tips.addClass('tip_show');
        setTimeout(function () {
            tips.removeClass('tip_show');
        }, 1500);

        if (el) {
            el.addClass('error-input');
            el.bind('input propertychange change', function () {
                el.removeClass('error-input');
            });
        }
    },

    /**
     * 判空
     */
    isEmpty: function (data) {
        if (data == "" || data == null || data == undefined) {
            return "";
        }
        return data;
    }
}