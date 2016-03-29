var gulp = require('gulp')
var less = require('gulp-less')
var plumber = require('gulp-plumber')
var autoPrefixer = require('gulp-autoprefixer')
var connect = require('gulp-connect')
var uglify = require('gulp-uglify')
var usemin = require('gulp-usemin')
var imagemin = require('gulp-imagemin')
var notify = require('gulp-notify')
var replace = require('gulp-replace')

var staticPath = {
  iconfont: './iconfont/**/**',
  images: './images/**/**',
  less: ['./less/**/**', '!./less/_**/**.less', '!./less/**/_**.less'],
  template: './test/**/**.html'
}
var distPath = './dist';

gulp.task('css', function() {
  return gulp.src(staticPath.less)
          .pipe(plumber({ errorHandler: notify.onError('错误: <%= error.message %>') }))
          .pipe(less())
          .pipe(gulp.dest(distPath+'/css'))
          .pipe(connect.reload())
})

gulp.task('font', function() {
  return gulp.src(staticPath.iconfont)
            .pipe(gulp.dest(distPath+'/iconfont'))
})

gulp.task('images', function() {
  return gulp.src(staticPath.images)
            .pipe(imagemin({
                      optimizationLevel: 5,
                      progressive: true,
                      svgoPlugins: [{removeViewBox: false}]//,
                      //use: [pngquant()]
                  }))
            .pipe(gulp.dest(distPath+'/images'))
})

gulp.task('js', function() {
  return gulp.src(staticPath.template)
          .pipe(usemin({
                    //assetsDir: __dirname,
                    //outputRelativePath: distPath,
                    //path: distPath,
                    //js: [function() { return $.uglify({mangle: false})}]
                    js: [uglify]
                }))
          .pipe(replace('./dist/js', './js'))
          .pipe(gulp.dest(distPath))
          .pipe(connect.reload())

})

gulp.task('watch', function() {
  gulp.watch(staticPath.less, ['less'])
  gulp.watch(staticPath.iconfont, ['font'])
  gulp.watch(staticPath.images, ['images'])
  gulp.watch(staticPath.js, ['js'])
  gulp.watch(staticPath.template, ['js'])
})

gulp.task('server', ['css', 'images', 'font', 'js'], function() {
    var port = 8089;
    connect.server({
        root: distPath,
        port: port
    });

    console.log('server start at: http://localhost: '+ port + '/');
});

gulp.task('default', function() {
  gulp.start(['watch', 'server']);
})
