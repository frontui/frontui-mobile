/*
*  require模块化配置
*/
require.config({
    baseUrl: typeof window['STATIC'] === 'undefined' ?  '/static/js' : window['STATIC'],
    urlArgs: (function() {
        return typeof window['STATIC_VERSION'] === 'undefined' ? '' :  'v='+window['STATIC_VERSION'];
    })(),
    paths: {
        '$': 'lib/zepto',
        'template': 'lib/template'
    }
});
