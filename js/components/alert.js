/**
 * @appName: 警告框
 * @author: tommyshao
 * @date:   2016-1-5
 * @useage:
 * // 初始化
 * var el = $.alert({content: 'xxxx'});
 */

define('components/alert', function(require) {
    // 依赖模块
    var $ = require('zepto');
    var template = require('template');

    // 模板
    var _tpl = '<h6 class="alert warning ">' +
                '<%=content%>' +
                '<i class="icon-clear"></i>' +
                '</h6>';

    // 默认配置
    var defaults = {
        content: '',
        button: '.icon-clear',
        callback: function() {}
    };

    /**
     * 构造函数
     * @param el 元素
     * @param option  配置
     * @param isFromTpl  模板缓存
     * @constructor
     */
    var Alert = function(el, option, isFromTpl) {
        this.$el = $(el);
        this._isFromTpl = isFromTpl;
        this.option = $.extend(defaults, option);
        this.button = this.$el.find(this.option.button);
        this._initEvent();
    };

    //- 公共方法
    Alert.prototype = {
        // 初始化事件
        _initEvent: function() {
            var that = this;
            that.button.on('tap', function() {
                var e = $.Event('alert:close');
                e.relatedTarget = $(this);
                that.$el.trigger(e);
                that.option.callback.call(null, $(this));
                that.$el.remove();
            });
        }
    };


    // 代理函数
    var Handler = function(option) {
        //new Loading(this, option);
        //return $.adaptObject(this, defaults, option,_tpl,Alert,"alert", false);
        return $(this).each(function(){
            var that = $(this),
                data = that.data('fm.Alert');
            if(!data) that.data('fm.Alert', (data = new Alert(that, option)));
            if(typeof option === 'string') data && data[option] && data[option]();
        })
    };

    // jquery 插件扩展
    $.fn.alert = $.alert = Handler;

    return Alert;
});