var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var util = require('gulp-util');
var less = require('gulp-less');
var csso = require('gulp-csso');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var copy = require('gulp-copy');

var conf = {
    build: {
        folder: 'build',
        css: 'build/css',
        js: 'build/js'
    }
};
var bootstrap = {
    less: 'bower_components/bootstrap/less/*.less',
    js: 'bower_components/bootstrap/js/*.js'
};

gulp.task('jscs', function() {
    return gulp.src('all.js')
        .pipe(jscs())
        .pipe(jscs.reporter());
});

gulp.task('jshint', function() {
    return gulp.src('all.js')
        .pipe(jshint())
        .pipe(jshint.reporter());
});

gulp.task('css', function () {
    return gulp.src(['all.less', bootstrap.less])
        .pipe(less())
        .pipe(concat('all.css'))
        .pipe(csso())
        .on('error', errorHandler)
        .pipe(gulp.dest(conf.build.css));
});

gulp.task('js', function () {
    return gulp.src(['all.js', bootstrap.js])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .on('error', errorHandler)
        .pipe(gulp.dest(conf.build.js));
});

gulp.task('html', function() {
    return gulp.src('index.html')
        .pipe(copy(conf.build.folder, {prefix:0}));
});



gulp.task('style-build', ['bower', 'sprite'], function () {
    return gulp.src([conf.less, bootstrap.less])
        .pipe(less())
        .pipe(autoprefixer(['last 2 version']))

        .pipe(gulp.dest(conf.release.css));
});

gulp.task('clean', function (cb) {
    del([conf.release.folder, conf.build.folder], cb);
});

gulp.task('script-build', ['bower'], function () {
    return gulp.src(mainBowerFiles({includeDev: true}))
        .pipe(filter('*.js'))
        .pipe(concat('cdp.js'))
        .pipe(uglify())
        .pipe(gulp.dest(conf.release.js));
});

function errorHandler(err){
    util.log(util.colors.red('Error'), err.message);
    this.end();
}
