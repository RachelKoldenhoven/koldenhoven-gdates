/**
 * Module Dependencies
 */

var browserify = require('browserify');
var gulp = require('gulp');
var babel = require('gulp-babel');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
var connect = require('gulp-connect');
var cleanCSS = require('gulp-clean-css');
var clean = require('gulp-rimraf');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var Promise = require('bluebird');
var source = require('vinyl-source-stream');


/**
 * Bourbon & Neat
 */

var bourbonPaths = require('bourbon').includePaths;
var neatPaths = require('bourbon-neat').includePaths;

console.log(bourbonPaths, neatPaths);

/**
 * Config
 */

 var paths = {
   css: './src/client/styles/**/*.css',
   scss: ['./src/client/styles/scss/*.scss',
          './src/client/styles/scss/**/*.scss'],
   scripts: './src/client/js/*.js'
 };


/**
 * Gulp Tasks
 */


gulp.task('connect', function () {
  connect.server({
    root: './src/client',
    port: 8080,
    livereload: true
  });
});

gulp.task('connectDist', function () {
  connect.server({
    root: './src/client',
    port: 9999,
    livereload: true
  });
});

gulp.task('babel', function () {
	return gulp.src('./src/client/js/bundle.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('./dist/client/js/'));
});

gulp.task('browserify', function() {
  var brify = browserify('./src/client/js/main.js');
  brify.bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./src/client/js/'));
});

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['lint']);
});

gulp.task('clean', function() {
  return gulp.src('./dist/*')
    .pipe(clean({force: true}));
});

gulp.task('sass', function () {
  return gulp.src(paths.scss)
    .pipe(sass({
      includePaths: ['styles'].concat(bourbonPaths, neatPaths)
    }).on('error', sass.logError))
    .pipe(gulp.dest('./src/client/styles/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch(paths.scss[1], ['sass']);
});

gulp.task('minify-css', function() {
  var opts = {keepSpecialComments:'*'};
  return gulp.src(paths.styles)
    .pipe(cleanCSS(opts))
    .pipe(gulp.dest('./dist/client/css/'));
});

gulp.task('copy-html-files', function () {
   gulp.src('./src/client/*.html')
     .pipe(gulp.dest('./dist/'))
});

// *** default task *** //
gulp.task('default', function () {
  runSequence(
    ['sass'],
    ['sass:watch', 'connect']
  )
});

// *** build task *** //
gulp.task('build', function() {
  runSequence(
    'clean',
    'lint',
    'browserify',
    'babel',
    'minify-css',
    'sass',
    'copy-html-files',
    'connectDist'
  );
});
