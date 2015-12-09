'use strict';

// git commit -m 'fix multiple typecasts, and use chai to assertions'

var gulp = require('gulp');
var gutil = require('gulp-util');

var scripts = [
	'./app/*.js',
	'./test/**/*.js'
];

gulp.task('jshint', function() {
	let jshint = require('gulp-jshint');
	let stylish = require('jshint-stylish');

	let beep = function() {
		gutil.beep();
	};

	gulp
		.src(scripts)
		.pipe(jshint())
		.pipe(jshint.reporter(beep))
		.pipe(jshint.reporter(stylish));
});

gulp.task('lint', ['jshint'], function() {
	gulp.watch(scripts, ['jshint']);
});
