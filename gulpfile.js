var gulp = require('gulp');
var scss = require('gulp-sass');
var server = require('gulp-webserver');
var url = require('url');
var path = require('path');
var fs = require('fs');
var moke = require('./moce/data');
var login = require('./moce/login/login');
var querystring = require('querystring');
var minjs = require('gulp-uglify');
var mincss = require('gulp-clean-css');
var minhtml = require('gulp-htmlmin');
var babel = require('gulp-babel');
var autopre = require('gulp-autoprefixer');
// 编译scss
gulp.task('scss', function() {
    gulp.src('src/scss/*.{sass,scss}')
        .pipe(autopre({
            browsers: ['last 2 versipons']
        }))
        .pipe(scss())
        .pipe(gulp.dest('src/css'));
});
// 监听文件
gulp.task('watch', function() {
    gulp.watch('src/scss/*.{scss,sass}', ['scss']);
});
// 起服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8888,
            host: 'localhost',
            open: true,
            middleware: function(req, res, next) {
                if (req.url === '/favicon.ico') {
                    return false;
                }
                var pathname = url.parse(req.url).pathname;
                pathname = pathname === '/' ? '/index.html' : pathname;
                if (/\/api/.test(pathname)) {
                    if (pathname === '/api/login') {
                        // 登录判断
                        var arr = [];
                        req.on('data', function(chuck) {
                            arr.push(chuck);
                        });
                        req.on('end', function() {
                            var array = Buffer.concat(arr);
                            var log = querystring.parse(array.toString());
                            login.loginName.map(function(v) {
                                if (log.user === v.user && log.pwd === v.pwd) {
                                    return res.end(JSON.stringify({ code: 'log1', 'essage': '登陆成功' }));
                                }
                            });
                            res.end(JSON.stringify({ code: 'log0', 'essage': '帐号或密码错误' }));
                        });
                    } else if (pathname === '/api/req') {
                        // 注册
                        var arrs = [];
                        req.on('data', function(chuck) {
                            arrs.push(chuck);
                        });
                        req.on('end', function() {
                            var array = Buffer.concat(arrs);
                            var log = querystring.parse(array.toString());
                            var tt = login.loginName.some(function(v) {
                                return log.user === v.user;
                            });
                            if (!tt) {
                                login.loginName.push(log);
                                login.loginName = login.loginName;
                                fs.writeFileSync(path.join(__dirname, 'moce/login/login.json'), JSON.stringify(login));
                                return res.end(JSON.stringify({ code: 'reg1', essage: '注册成功' }));
                            }
                            res.end(JSON.stringify({ code: 'reg0', essage: '用户名已存在请重新注册' }));
                        });
                    } else {
                        res.end(JSON.stringify(moke(req.url)));
                    }
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }));
});
// 压缩css
gulp.task('mincss', function() {
    gulp.src('src/css/*.css')
        .pipe(mincss())
        .pipe(gulp.dest('bulit/css'));
});
// 压缩js
gulp.task('minjs', function() {
    gulp.src(['src/js/**/*.js', '!src/js/lib/require.js', '!src/js/lib/zepto.js'])
        .pipe(babel({ presets: 'es2015' }))
        .pipe(minjs())
        .pipe(gulp.dest('bulit/js'));
});
// 读取require.js
gulp.task('req', function() {
    gulp.src(['src/js/lib/require.js', 'src/js/lib/zepto.js'])
        .pipe(gulp.dest('bulit/js/lib'));
});
gulp.task('reqs', function() {
    gulp.src('src/img/*.png')
        .pipe(gulp.dest('bulit/img'));
});
// 压缩html
gulp.task('minhtml', function() {
    gulp.src('src/**/*.html')
        .pipe(minhtml({
            removeComments: false,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('bulit'));
});
// 起服务
gulp.task('bulitserver', function() {
    gulp.src('bulit')
        .pipe(server({
            port: 8888,
            host: 'localhost',
            open: true,
            middleware: function(req, res, next) {
                if (req.url === '/favicon.ico') {
                    return false;
                }
                var pathname = url.parse(req.url).pathname;
                pathname = pathname === '/' ? '/index.html' : pathname;
                if (/\/api/.test(pathname)) {
                    if (pathname === '/api/login') {
                        // 登录判断
                        var arr = [];
                        req.on('data', function(chuck) {
                            arr.push(chuck);
                        });
                        req.on('end', function() {
                            var array = Buffer.concat(arr);
                            var log = querystring.parse(array.toString());
                            login.loginName.map(function(v) {
                                if (log.user === v.user && log.pwd === v.pwd) {
                                    return res.end(JSON.stringify({ code: 'log1', 'essage': '登陆成功' }));
                                }
                            });
                            res.end(JSON.stringify({ code: 'log0', 'essage': '帐号或密码错误' }));
                        });
                    } else if (pathname === '/api/req') {
                        // 注册
                        var arrs = [];
                        req.on('data', function(chuck) {
                            arrs.push(chuck);
                        });
                        req.on('end', function() {
                            var array = Buffer.concat(arrs);
                            var log = querystring.parse(array.toString());
                            var tt = login.loginName.some(function(v) {
                                return log.user === v.user;
                            });
                            if (!tt) {
                                login.loginName.push(log);
                                login.loginName = login.loginName;
                                fs.writeFileSync(path.join(__dirname, 'moce/login/login.json'), JSON.stringify(login));
                                return res.end(JSON.stringify({ code: 'reg1', essage: '注册成功' }));
                            }
                            res.end(JSON.stringify({ code: 'reg0', essage: '用户名已存在请重新注册' }));
                        });
                    } else {
                        res.end(JSON.stringify(moke(req.url)));
                    }
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'bulit', pathname)));
                }
            }
        }));
});
gulp.task('dev', ['watch', 'server']);
gulp.task('default', ['mincss', 'minjs', 'req', 'reqs', 'minhtml', 'bulitserver']);