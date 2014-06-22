var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    browserSync = require('browser-sync');

gulp.task('styles', function() {
  return gulp.src('dev/sass/full.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
});

gulp.task('images', function() {
  return gulp.src('dev/images/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
});

gulp.task('clean', function() {
  return gulp.src(['dist/css', 'dist/js', 'dist/images'], {read: false})
    .pipe(clean());
});

gulp.task('browser-sync', function() {  
    browserSync.init(["css/*.css", "js/*.js"], {
        proxy: {
            host: "localhost",
            port: 80
        }
    });
});



gulp.task('default', ['clean', 'browser-sync'], function() {
    gulp.start('styles', 'images');
});



gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('dev/styles/**/*.scss', ['styles']);

  // Watch image files
  gulp.watch('dev/images/**/*', ['images']);

});
