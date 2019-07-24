var gulp = require('gulp');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path');

var mocha = new Mocha();
var dev = (process.env.NODE_ENV || 'development').trim() == 'development';

mocha.addFile('test/specs/check.js');

gulp.task('compile:test', function(done) {
  webpack(require('./webpack.config.js'), function() {
    done();
  })
});
gulp.task('serve:test', gulp.series('compile:test', function(done) {
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
}));

gulp.task('test', gulp.series('serve:test', function(done) {
  mocha.run(function(failures) {
    process.exitCode = failures ? 1 : 0;
    done()
  });
}));

gulp.task('prepublish', function(done) {
  webpack(require('./webpack.config.js'), function() {
    done();
  })
});

gulp.task('default', gulp.series('prepublish', done => {
    done()
}));
