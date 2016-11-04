const gulp = require('gulp');
const gutil = require('gulp-util');
const eslint = require('gulp-eslint');

const scripts = [
  './app/index.js',
  './app/parser.js',
  './test/unit/parser.spec.js',
  './gulpfile.js',
];

gulp.task('lintTask', function lintTask() {
  return gulp
    .src(scripts)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('error', () => gutil.beep());
});

gulp.task('lint', ['lintTask'], function() {
  gulp.watch(scripts, ['lintTask']);
});
