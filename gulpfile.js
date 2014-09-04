var gulp = require('gulp'), coffee = require('gulp-coffee'), watch = require('gulp-watch'), plumber = require('gulp-plumber');

// compiles all .coffee in to .js files and places them in ./src
gulp.task('coffee', function () {
    gulp.src('./src/*.coffee', {read: false})
    	.pipe(watch())
    	.pipe(plumber())
        .pipe(coffee({bare: true}))
        .pipe(gulp.dest('.'));
});

gulp.task('default', ['coffee'], function(callback) {
    callback();
});
