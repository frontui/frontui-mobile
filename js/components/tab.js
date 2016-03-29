/**
 * @appName: Tab 选项卡
 * @author: tommyshao
 * @date:   2015-11-19
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

define('components/tab', function(require) {
    // 依赖模块
    var $ = require('zepto');

    // 默认配置
    var defaults = {
        nav: '.tab-nav',
        navItem: 'li',
        content: '.tab-content',
        item: 'li',
        callback: function() {}
    };

    /**
     * 构造函数
     * @param el 元素
     * @param option  配置
     * @param isFromTpl  模板缓存
     * @constructor
     */
    var Tab = function(el, option) {
        this.$el = $(el);
        this.option = $.extend(defaults, option);
        this.$nav = this.$el.find(this.option.nav);
        this.$navItem = this.$nav.children(this.option.navItem);
        this.$content = this.$el.find(this.option.content);
        this.$item = this.$content.children(this.option.item);
        this.activeIndex = 0;

        this._setStyle();

        this._initEvent();
        this.active();
    };

    //- 公共方法
    Tab.prototype = {
        _setStyle: function() {
            this.containerWidth = this.$content.width();
            this.$content.css('width', this.$item.length * 100+'%');
            this.$el.addClass('active');
        },
        // 初始化事件
        _initEvent: function() {
            var that = this;
            var maxIndex = that.$item.length - 1;

            this.$navItem.on('tap', function() {
                that.activeIndex = that.$navItem.index($(this));
                that.active();
            });

            this.$content.on('swipeLeft', function() {
                if(that.activeIndex < maxIndex) {
                    that.activeIndex++;
                    that.active();
                }
            });

            this.$content.on('swipeRight', function() {
                if(that.activeIndex > 0) {
                    that.activeIndex--;
                    that.active();
                }
            });

            /*this.$content.on('webkitTransitionEnd mozTransitionEnd MSTransitionEnd otransitionend transitionend', function() {
                var curItem = that.$item.eq(that.activeIndex);
                var curItemH = curItem.height();
                console.log(curItemH)
                that.$item.not(curItem).css({'height': curItemH, 'overflow': 'hidden'});
            })*/
        },
        // 切换
        active: function(index) {
            var e = $.Event('tab:active');
            if(index) this.activeIndex = index;
            this.$navItem.removeClass('current').eq(this.activeIndex).addClass('current');

            //var thisItemH = this.$item.eq(this.activeIndex).height();
            //this.$content.css({'height': thisItemH, 'overflow': 'hidden'});

            this.animate();
            e.index = index;
            typeof this.option.callback == 'function' && this.option.callback.call(this, index);
            this.$el.trigger(e)
        },
        // 动画
        animate: function() {
            var transNum = this.containerWidth * this.activeIndex;
            var cssTran = {transform: 'translate(-'+ transNum +'px, 0) translateZ(0)', '-webkit-transform': 'translate(-'+ transNum +'px, 0) translateZ(0)'};
            //this.$item.css({'height': 'auto'});
            this.$content.css(cssTran)
        }
    };


    // 代理函数
    var Handler = function(option) {
        var params = [].slice.call(arguments, 1);
        return $(this).each(function() {
            var that = $(this);
            var data = that.data('fm.tab');
            if(!data) that.data('fm.tab', (data = new Tab(that, option)));
            if(typeof option === 'string') data[option].apply(data, params);
        });
    };

    // jquery 插件扩展
    $.fn.tab = Handler;

    //$(function() { $('.tab').tab()  });

    return Tab;
});