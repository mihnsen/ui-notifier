var gulp = require('gulp')
  , karma = require('karma').server
  , concat = require('gulp-concat')
  , rename = require('gulp-rename')
  , path = require('path')
  , plumber = require('gulp-plumber')
  , runSequence = require('run-sequence')
  , jshint = require('gulp-jshint')
  , babel = require('gulp-babel')
  , sass = require('gulp-sass')
  , sourcemaps = require('gulp-sourcemaps')
  , usemin = require('gulp-usemin')
  , uglify = require('gulp-uglify')
  , minifyCss = require('gulp-minify-css')
  , minifyHtml = require('gulp-minify-html');


/**
 * File patterns
 **/

// Root directory
var rootDirectory = path.resolve('./');

// Source directory for build process
var sourceDirectory = path.join(rootDirectory, './src');

// tests
var testDirectory = path.join(rootDirectory, './test/unit');

var sourceFiles = [

  // Make sure module files are handled first
  path.join(sourceDirectory, '/**/*.module.js'),

  // Then add all JavaScript files
  path.join(sourceDirectory, '/**/*.js')
];

var cssFiles = path.join(sourceDirectory, '/ui-notifier/scss/ui-notifier.scss');

var lintFiles = [
  'gulpfile.js',
  // Karma configuration
  'karma-*.conf.js'
].concat(sourceFiles);

gulp.task('build', function() {
  gulp.src(sourceFiles)
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('ui-notifier.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(rename('ui-notifier.min.js'))
    .pipe(gulp.dest('./dist'));
});

/**
 * Process
 */
gulp.task('process-all', function (done) {
  runSequence('scss', 'jshint', 'test', 'build', done);
});

/**
 * Watch task
 */
gulp.task('watch', function () {

  // Watch JavaScript files
  gulp.watch(sourceFiles, ['process-all']);
  gulp.watch(path.join(sourceDirectory, '/**/*.scss'), ['scss']);

  // watch test files and re-run unit tests when changed
  gulp.watch(path.join(testDirectory, '/**/*.js'), ['test']);
});

/**
 * stylesheet
 */
gulp.task('scss', function() {
  return gulp.src(cssFiles)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'))
    .pipe(minifyCss())
    .pipe(rename('ui-notifier.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'));
});

/**
 * Validate source JavaScript
 */
gulp.task('jshint', function () {
  return gulp.src(lintFiles)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma-src.conf.js',
    singleRun: true
  }, done);
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-concatenated', function (done) {
  karma.start({
    configFile: __dirname + '/karma-dist-concatenated.conf.js',
    singleRun: true
  }, done);
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-minified', function (done) {
  karma.start({
    configFile: __dirname + '/karma-dist-minified.conf.js',
    singleRun: true
  }, done);
});


/**
 * gh-pages pubish
 */
gulp.task('gh-pages', ['build'], function() {
  gulp.src('./demo/index.html')
    .pipe(usemin({
      css: [ minifyCss(), 'concat' ],
      html: [ minifyHtml({ empty: true }) ],
      js: [ uglify() ],
    }))
    .pipe(gulp.dest('_gh-pages/'));

  gulp.src('./demo/hero.png')
    .pipe(gulp.dest('_gh-pages/'));
});

gulp.task('default', function () {
  runSequence('process-all', 'watch');
});
