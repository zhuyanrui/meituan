/*
 * @Author: zhuyanrui 
 * @Date: 2018-11-02 09:43:07 
 * @Last Modified by: zhuyanrui
 * @Last Modified time: 2018-11-02 13:09:17
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-webserver');
var url = require('url');
var path = require('path');
var fs = require('fs');
//建任务
gulp.task('devCss', function() {
        return gulp.src('./meituan/src/sass_styles/style.scss')
            .pipe(sass())
            .pipe(gulp.dest('./meituan/src/styles'))
    })
    //起服务
gulp.task('devServer', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090,
            // open: true,
            // host: '169.254.204.130', //配置ip
            livereload: true, //是否自动刷新浏览器
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return res.end();
                }
                if (pathname === '/api/list') { //请求接口
                    res.end(JSON.stringify({ code: 1, msg: "失败" }));
                } else { //请求文件
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }

            }
        }))
})
gulp.task('watch', function() {
    return gulp.watch("./meituan/src/sass_styles/style.scss", gulp.series("devCss"))
})
gulp.task('dev', gulp.series("devServer", "watch")) //并行执行