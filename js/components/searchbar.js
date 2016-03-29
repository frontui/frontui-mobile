/**
 * @appName: 搜索框
 * @author: tommyshao
 * @date:   2015-11-17
 */

define('components/searchBar', function(require) {
    // 依赖模块
    var $ = require('zepto');

    // 全局标识 direactive
    var toggle = '[data-toggle="searchbar"]';

    /**
     * 搜索框 构造函数
     * @param el 输入框元素
     * @param option 配置参数
     * @constructor
     */
    var SearchBar = function(el, option) {
        this.$el = $(el);
        this.option = $.extend({}, SearchBar.defaults, option);
        this.$wrapper = this.$el.closest(this.option.wrapper);
        this.$label = this.$el.next(this.option.label);

        this.$el.on('focus', $.proxy(this.active, this))
                .on('blur', $.proxy(this.blur, this))
                .on('keyup', $.proxy(this.keyup, this));
    };

    /**
     * 默认配置
     */
    SearchBar.defaults = {
      // 父元素
      wrapper: '.searchbar',
      label: '.searchbar-control-label',
      callback: function() {}
    };

    // 获得焦点时隐藏label
    SearchBar.prototype.active = function() {
      this.$wrapper.addClass('searchbar-focus');
    };

    // 失去焦点时如果文本框为空则显示label
    SearchBar.prototype.blur = function() {
        var thisValue = $.trim(this.$el.val());
        if(thisValue == '') {
            this.$wrapper.removeClass('searchbar-focus');
        }
    };

    // 输入
    SearchBar.prototype.keyup = function() {
        var thisValue = $.trim(this.$el.val());
        var e = $.Event('search:keyup');
        e.keywords = thisValue;
        this.$el.trigger(e);
    }

    // 代理函数
    var Handler = function(option) {
        return $(this).each(function() {
            var $this = $(this);
            var data = $this.data('fm.searchbar');

            if(!data) $this.data('fm.searchbar', (data = new SearchBar(this, option)));
            if(typeof option === 'string') data[option] && data[option]();
        })
    };

    // jquery 插件扩展
    $.fn.searchBar = Handler;
    $.fn.searchBar.constructor = SearchBar;

    // 全局绑定
    $(function() {
       $(toggle).searchBar();
    });

    return SearchBar;
});