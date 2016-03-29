/**
 * @appName: Panel 面板
 * @author: tommyshao
 * @date:   2015-11-20
 * @useage:
 * // 初始化
 * var el = $.dialog({content: 'xxxx'});
 * el.dialog('hide');
 * el.dialog('show');
 *
 * 1. $.dialog(option)
 * 2. $('<div><%=content%></div>').dialog(options);
 * 3. $('#id').dialog();
 */

define('components/panel', function(require) {
    // 依赖模块
    var $ = require('zepto');

    // 默认配置
    var defaults = {
        trigger: '.panel-btn',
        active: 'show',
        callback: function() {}
    };

    /**
     * 构造函数
     * @param el 元素
     * @param option  配置
     * @param isFromTpl  模板缓存
     * @constructor
     */
    var Panel = function(el, option) {
        this.$el = $(el);
        var data = this.$el.data();
        this.option = $.extend(defaults, option, data);
        this.$trigger = this.$el.find(this.option.trigger);

        this._initEvent();
    };

    //- 公共方法
    Panel.prototype = {
        // 初始化事件
        _initEvent: function() {
            var that = this;
            that.$trigger.on('click', function() {
               that.toggle();
            });
        },
        toggle: function() {
            var isShow = this.$el.hasClass(this.option.active);
            var Event = $.Event('slide');
            this.$el[isShow ? 'removeClass' : 'addClass'](this.option.active).trigger(Event, isShow);
            typeof this.option.callback == 'function' && this.option.callback(isShow);
        }
    };


    // 代理函数
    var Handler = function(option) {
        var params = [].slice.call(arguments, 1);
        return $(this).each(function() {
            var that = $(this);
            var data = that.data('fm.panel');
            if(option === 'off') {
                that.removeData('fm.panel');
                return;
            }
            if(!data) that.data('fm.panel', (data = new Panel(that, option)));
            if(typeof option === 'string') data[option].apply(data, params);
        });
    };

    // jquery 插件扩展
    $.fn.panel = Handler;

    $(function() { $('.panel').panel()  });

    return Panel;
});