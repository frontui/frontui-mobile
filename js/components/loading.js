/**
 * @appName: 加载层
 * @author: tommyshao
 * @date:   2015-11-17
 * @useage:
 * // 初始化
 * var el = $.loading({content: 'xxxx'});
 * el.loading('hide');
 * el.loading('show');
 *
 * 1. $.loading(option)
 * 2. $('<div><%=content%></div>').loading(options);
 * 3. $('#id').loading();
 */

define('components/loading', function(require) {
    // 依赖模块
    var $ = require('zepto');
    var template = require('template');

    // 模板
    var _tpl = '<div class="loading show">'+
                    '<div class="loading-cnt">'+
                        '<i class="loading-bright"></i>'+
                        '<p><%=content%></p>'+
                    '</div>'+
                '</div>';

    // 默认配置
    var defaults = {
        content: '加载中...'
    };

    /**
     * 构造函数
     * @param el loading元素
     * @param option  配置
     * @param isFromTpl  模板缓存
     * @constructor
     */
    var Loading = function(el, option, isFromTpl) {
        this.$el = $(el);
        this._isFromTpl = isFromTpl;
        this.option = $.extend(defaults, option);
        this.show();
        return this.$el;
    };

    //- 公共方法
    Loading.prototype = {
        // 显示
        show: function() {
            var e = $.Event('loading:show');
            this.$el.trigger(e);
            this.$el.addClass('show');
        },
        // 隐藏
        hide: function() {
            var e = $.Event('loading:hide');
            this.$el.trigger(e);
            this.$el.removeClass('show');
        }
    };


    // 代理函数
    var Handler = function(option) {
        //new Loading(this, option);
        return $.adaptObject(this, defaults, option,_tpl,Loading,"loading");
    };

    // jquery 插件扩展
    $.fn.loading = $.loading = Handler;

    return Loading;
});