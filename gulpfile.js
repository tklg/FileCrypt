var gulp = require('gulp');
var concat = require('gulp-concat');
var refresh = require('gulp-livereload');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');
var uglify = require('gulp-uglify');
var embedlr = require('gulp-embedlr');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');
var browserSync = require('browser-sync');
const Launcher = require('webdriverio/build/lib/launcher');
const path = require('path');
const wdio = new Launcher(path.join(__dirname, 'wdio.conf.js'));

var dev = (process.env.NODE_ENV || 'development').trim() == 'development';

gulp.task('default', ['build']);

var ts = ['js', 'html'];
if (!argv.single) ts.push('watch');

gulp.task('build', ts);

gulp.task('js', function() {
    gulp.src(['src/js/index.js'])
        .pipe(webpackStream(require('./webpack.config.js'), webpack))
        .pipe(gulp.dest('build/js'))
        .pipe(gulpif(!argv.single, refresh()))
});
/*gulp.task('css', function() {
    gulp.src(['src/css/*.*css'])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('bundle.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('build/css'))
        .pipe(gulpif(!argv.single, refresh()))
});*/
gulp.task('html', function() {
    gulp.src("src/*.html")
        .pipe(gulpif(dev, embedlr({
            port: 35729,
            src: "' +'http://' + (location.hostname || 'localhost') + ':" + 35729 + "/livereload.js?snipver=1"
        })))
        .pipe(gulp.dest('build/'))
        .pipe(gulpif(!argv.single, refresh()))
});

gulp.task('watch', function() {
    refresh.listen();
    gulp.watch('src/js/**', ['js']);
    gulp.watch('src/css/**', ['css']);
    gulp.watch('src/*.html', ['html']);
});

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