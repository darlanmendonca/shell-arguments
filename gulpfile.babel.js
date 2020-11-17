import gulp from 'gulp';
import gutil from 'gulp-util';
import eslint from 'gulp-eslint';

const scripts = [
  './app/index.js',
  './app/parser.js',
  './app/parser.spec.js',
  './gulpfile.babel.js',
];

gulp.task('lintTask', function lintTask() {
  return gulp
    .src(scripts)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('error', () => gutil.beep());
});

gulp.task('watch', function() {
  gulp.watch(scripts, gulp.series('lintTask'));
});

gulp.task('lint', gulp.series('lintTask', 'watch'));
