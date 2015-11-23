var gulp = require('gulp');
var bower = require('gulp-bower');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var util = require('gulp-util');
var less = require('gulp-less');
var csso = require('gulp-csso');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var copy = require('gulp-copy');
var jasmine = require('gulp-jasmine');

var config = {
    core: {
        folder: 'core',
        style: 'core/less/**/*.less',
        js: 'core/js/**/*.js',
        test: 'core/js/**/*.test.js'
    },
    build: {
        folder: 'build',
        style: 'build/css',
        js: 'build/js'
    },
    bootstrap: {
        style: 'bower_components/bootstrap/less/bootstrap.less',
        js: 'bower_components/bootstrap/js/*.js'
    }
};

gulp.task('bower', function () {
    return bower()
        .pipe(gulp.dest('bower_components'));
});

gulp.task('jscs', function() {
    return gulp.src(config.core.js)
        .pipe(jscs())
        .pipe(jscs.reporter());
});

gulp.task('jshint', function() {
    return gulp.src(config.core.js)
        .pipe(jshint())
        .pipe(jshint.reporter());
});

gulp.task('css', function () {
    return gulp.src([config.core.style, config.bootstrap.style])
        .pipe(less())
        .pipe(concat('all.css'))
        .pipe(csso())
        .on('error', errorHandler)
        .pipe(gulp.dest(config.build.style));
});

gulp.task('js', function () {
    return gulp.src([config.bootstrap.js, config.core.js, '!' + config.core.test])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .on('error', errorHandler)
        .pipe(gulp.dest(config.build.js));
});

gulp.task('html', function() {
    return gulp.src('index.html')
        .pipe(copy(config.build.folder, {prefix:0}));
});

gulp.task('test', function () {
    return gulp.src(config.core.test)
        .pipe(jasmine());
});


function errorHandler(err){
    util.log(util.colors.red('Error'), err.message);
    this.end();
}
