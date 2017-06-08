var gulp = require('gulp');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');
var rename = require('gulp-rename');
const Launcher = require('webdriverio/build/lib/launcher');
const path = require('path');
const wdio = new Launcher(path.join(__dirname, 'wdio.conf.js'));

var dev = (process.env.NODE_ENV || 'development').trim() == 'development';

gulp.task('default', ['prepublish']);

gulp.task('serve:test', function(done) {
    gulp.src(['test/specs/tests.web.js'])
        .pipe(webpackStream(require('./webpack.config.js'), webpack))
        .pipe(gulp.dest('test/fixtures/js'));
    browserSync({
        logLevel: 'silent',
        notify: false,
        open: false,
        port: 9000,
        server: {
            baseDir: ['test/fixtures']
        },
        ui: false
    }, done);
});

gulp.task('e2e', ['serve:test'], function() {
    wdio.run().then(code => {
        process.exit(code);
    }, error => {
        console.error('Launcher failed to start the test', error.stacktrace);
        process.exit(1);
    });
});

gulp.task('test', ['e2e'], function() {
    //browserSync.exit();
});

gulp.task('prepublish', function(done) {
    gulp.src(['src/js/index.js'])
        .pipe(webpackStream(require('./webpack.config.js'), webpack))
        .pipe(rename('index.js'))
        .pipe(gulp.dest('lib/'));
});