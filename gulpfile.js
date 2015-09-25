var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var scripts = [
	'./gulpfile.js',
	'./parser.js',
	'./test/parser.spec.js',
	'./index.js'
];

gulp.task('jshint', function() {
	gulp
    .src(scripts)
    .pipe(jshint())
    .pipe(jshint.reporter(gutil.beep()))
    .pipe(jshint.reporter(stylish));
});

gulp.task('lint', ['jshint'], function() {
	gulp.watch(scripts, ['jshint']);
});