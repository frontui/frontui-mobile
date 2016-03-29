/*!
* @project : bms_v3_mobile E+3.0移动端
* @version : 3.0.0
* @author  : frontui
* @created : tommyshao
* @description: 页面共用js
*/
require([
    'zepto',
    'tap',
    'template',
    // 搜索框
    'components/searchBar',
    // 选项卡
    'components/tab',
    // 面板
    'components/panel',
    // pop
    'components/dialog',
    // loading
    'components/loading',
    // validator
    'components/validator',
    // alert
    'components/alert',
    // loadmore
    'components/loadMore'
], function($) {
    // 隐藏地址栏，貌似没什么效果
    $(document).ready(function() {
        window.scrollTo(0,1);
    })

    /*$.ajaxSettings({
        beforeSend: function() {
            $('#ajax-loading').loading({content: '加载中...'})
        },
        complete: function() {
            $('#ajax-loading').loading('hide')
        }
    });*/

    /*var ajaxLoading;

    $(document).on('ajaxBeforeSend', function(e, xhr, options){
        ajaxLoading = $.loading({content: '加载中...'})
    })

    $(document).on('ajaxComplete', function(e, xhr, options){
        //console.log('sss');
        //$('#ajax-loading').loading('hide')
        setTimeout(function(){ ajaxLoading.loading('hide') }, 200)
    })*/

    // 全局绑定alert
    $('.alert').alert();

    // 全局绑定tab
    $('[data-toggle="tab"]').tab();

    // 全局绑定加载更多
    $('.loading-wrap').loadMore();

    $('form').prop('autocomplete', 'off')
});
