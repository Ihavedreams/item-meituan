var gulp = require('gulp');
var sass = require('gulp-sass'); // 编译scss
var auto = require('gulp-autoprefixer'); // 自动添加前缀
var clean = require('gulp-clean-css'); // 压缩css
var server = require('gulp-webserver'); // 起服务
var url = require('url');
var fs = require('fs');
var path = require('path');
var listJson = require('./mock/list.json');
var querystring = require('querystring');
console.log(listJson);
gulp.task('devScss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(auto({
            browsers: ['last 2 versions']
        }))
        .pipe(clean())
        .pipe(gulp.dest('./src/css'))
});

gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('devScss'));
});

gulp.task('devServer', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090, // 配置端口号
            // open: true, // 是否自动打开浏览器
            host: '169.254.204.254',
            // livereload: true // 是否自动刷新浏览器
            middleware: function(req, res, next) { //拦截前端请求
                var pathname = url.parse(req.url).pathname;

                if (pathname === '/api/list') { //请求接口
                    res.end(JSON.stringify({ code: 1, data: listJson }))
                } else if (pathname === '/api/searchKey') {
                    var val = url.parse(req.url, true).query.key;

                    var target = [];

                    listJson.forEach(function(item) {
                        if (item.title.match(val) != null && item.title.match(val)) {
                            target.push(item.title);
                        }
                    })
                    res.end(JSON.stringify({ code: 1, data: target }))
                } else if (pathname === '/api/search') { //get
                    var val = url.parse(req.url, true).query.key;

                    var target = [];

                    listJson.forEach(function(item) {
                        if (item.title.match(val) != null && item.title.match(val)) {
                            target.push(item);
                        }
                    })
                    res.end(JSON.stringify({ code: 1, data: target }))
                } else if (pathname === '/api/login') { //post
                    var str = '';
                    req.on('data', function(chunk) {
                        str += chunk;
                    })

                    req.on('end', function() {
                        var params = querystring.parse(str);

                        var isHas = userlist.some(function(item) {
                            return item.username === params.username && item.pwd === params.pwd
                        })

                        if (isHas) {
                            res.end(JSON.stringify({ code: 1, msg: "登录成功" }))
                        } else {
                            res.end(JSON.stringify({ code: 0, msg: "登录失败" }))
                        }
                    })
                } else { //请求文件的
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
});
gulp.task('dev', gulp.parallel('devScss', 'watch'));