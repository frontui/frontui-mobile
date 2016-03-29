/**
 * @appName: 加载更多
 * @author: tommyshao
 * @date:   2015-12-30
 * @useage:
 * // 初始化
 */

define('components/loadMore', function(require) {

  var $ = require('zepto');

  // 默认配置
  // *  btn 点击加载更多按钮
  // *  text 显示loading icon
  var defaults = {
    btn: '.loading-wrap-btn',
    text: '.loading-wrap-text'
  };

  // 构造函数
  // * `el` 加载更多包裹元素
  // * `option` 配置参数
  //     1.  btn 按钮
  //     2.  text icon和文字
  var LoadMore = function(el, option) {
      this.$el = $(el);
      this.$btn = this.$el.find(option.btn);
      this.$text = this.$el.find(option.text);
      this.loading = false;
      this.initEvent();
  };

  // 属性函数
  LoadMore.prototype = {
    initEvent: function() {
      var that = this;
      this.$btn.on('click', function(e) {
        e.preventDefault();
        that.loading = true;
        that.toggle();
      })
    },
    toggle: function() {
      var e = $.Event('loadMore:action');
      e.toggle = this.loading;
      if(this.loading) {
        this.$btn.hide();
        this.$text.show();
      } else {
        this.$btn.show();
        this.$text.hide();
      }
      this.$el.trigger(e);
    },
    back: function() {
      this.loading = false;
      this.toggle();
    }
  };

  // 代理函数
  var Handler = function(option) {
    //return $.adaptObject(this, defaults, option, _tpl,LoadMore,"loadMore");
    return $(this).each(function(){
      var el = $(this);
      // 读取对象缓存

      var data  = el.data('fm.loadMore');

      if (!data) el.data('fm.loadMore',(data = new LoadMore(this,$.extend({}, defaults,  typeof option == 'object' && option))));

      if (typeof option == 'string') data[option]();
    })
  };

  // jquery 插件扩展
  $.fn.loadMore = $.loadMore = Handler;

  return LoadMore;
});