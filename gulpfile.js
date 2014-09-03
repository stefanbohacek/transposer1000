var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    rimraf = require('gulp-rimraf'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    browserSync = require('browser-sync');

gulp.task('browser-sync', function () {
   var files = [
      'templates/*.html',
      'static/css/**/*.css',
      'static/images/**/*',
      'static/js/**/*.js'
   ];

   browserSync.init(files, {
      proxy: "localhost:5000"
   });
});

gulp.task('styles', function() {
  return gulp.src('src/styles/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(autoprefixer('last 3 version', 'android >= 3', { cascade: true }))
    .pipe(gulp.dest('static/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('static/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint('tests/.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('static/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('static/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('static/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('clean', function() {
  return gulp.src(['static/css', 'static/js', 'static/images'], {read: false})
    .pipe(rimraf());
});

gulp.task('watch', function() {
  gulp.watch('src/styles/*.less', ['styles']);
  gulp.watch('src/scripts/*.js', ['scripts']);
  gulp.watch('src/images/**/*', ['images']);
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images', 'browser-sync', 'watch');
});