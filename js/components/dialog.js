/**
 * @appName: 弹出层
 * @author: tommyshao
 * @date:   2015-11-17
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

define('components/dialog', function(require) {
    // 依赖模块
    var $ = require('zepto');
    var template = require('template');

    // 模板
    var _tpl = '<div class="dialog">'+
                    '<div class="dialog-cnt">'+
                        '<div class="dialog-bd">'+
                            '<h4><%=title%></h4>'+
                            '<div><%=content%></div>'+
                        '</div>'+
                        '<div class="dialog-ft btn-group">'+
                            '<% for(var i = 0; i < button.length; i++){%>'+
                                '<% if (i == select){ %>'+
                                '<button class="btn select" role="button" type="button" id="dialogButton<%=i%>"><%=button[i]%></button>'+
                                '<% } else {%>'+
                                '<button class="btn" role="button" type="button" id="dialogButton<%=i%>"><%=button[i]%></button>'+
                                '<%}%>'+
                            '<%}%>'+
                        '</div>'+
                    '</div>'+
                '</div>';

    // 默认配置
    var defaults = {
        title: '',
        content: '',
        button: ['确认'],
        select: 0,
        allowScroll: false,
        callback: function() {}
    };

    /**
     * 构造函数
     * @param el 元素
     * @param option  配置
     * @param isFromTpl  模板缓存
     * @constructor
     */
    var Dialog = function(el, option, isFromTpl) {
        this.$el = $(el);
        this._isFromTpl = isFromTpl;
        this.option = $.extend(defaults, option);
        this.button = this.$el.find('[role="button"]');
        this._initEvent();
        this.toggle();
    };

    //- 公共方法
    Dialog.prototype = {
        // 初始化事件
        _initEvent: function() {
            var that = this;
            that.button.on('tap', function() {
                var index = that.button.index($(this));
                var e = $.Event('dialog:action');
                e.index = index;
                e.relatedTarget = $(this);
                that.$el.trigger(e);
                that.hide.apply(that);
            });
        },
        // 显示隐藏开关
        toggle: function() {
            if(this.$el.hasClass('show')) {
                this.hide();
            } else {
                this.show();
            }
        },
        // 显示
        show: function() {

            this.$el.trigger($.Event('dialog:show'));
            this.$el.addClass('show');
            this.option.allowScroll && this.$el.on('touchmove', _stopEvent);
        },
        // 隐藏
        hide: function() {
            this.$el.trigger($.Event('dialog:hide'));
            this.$el.off('touchmove', _stopEvent);
            this.$el.removeClass('show');

            this._isFromTpl && this.$el.remove();
        }
    };

    // 阻止默认事件
    function _stopEvent() {
        return false;
    }


    // 代理函数
    var Handler = function(option) {
        //new Loading(this, option);
        return $.adaptObject(this, defaults, option,_tpl,Dialog,"dialog");
    };

    // jquery 插件扩展
    $.fn.dialog = $.dialog = Handler;

    return Dialog;
});