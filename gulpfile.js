/*jslint node: true */
'use strict';

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    sgc = require('gulp-sass-generate-contents'),
    runSeq = require('run-sequence'),
	config = require('./_config/project.json'),
	creds = require('./_config/creds.json'),
	srcStyles = config.src + '/' + config.dirs.styles;

/* ============================================================ *\
    SCRIPTS / JS
\* ============================================================ */

gulp.task('scripts:lint', function () {
	gulp.src([config.js_file, config.tests + '/**/*.js'])
			.pipe(plugins.jshint());
});

/* ============================================================ *\
    GENERATE SASS IMPORTS AND
\* ============================================================ */

gulp.task('sass-generate-contents', function () {
	return gulp.src([
		srcStyles + '/_settings/*.scss', 
		srcStyles + '/_tools/_tools.mixins.scss', 
		srcStyles + '/_tools/_tools.functions.scss', 
		srcStyles + '/_tools/*.scss', 
		srcStyles + '/_scope/*.scss', 
		srcStyles + '/_generic/*.scss', 
		srcStyles + '/_elements/*.scss', 
		srcStyles + '/_objects/*.scss', 
		'views/_partials/**/*.scss', 
		srcStyles + '/_trumps/*.scss'])
	.pipe(sgc(config.src + '/' + config.dirs.styles + '/main.scss', creds))
	.pipe(gulp.dest(config.src + '/' + config.dirs.styles));
});

/* ============================================================ *\
    STYLES / SCSS
\* ============================================================ */

gulp.task('sass:dev', function () {
	return gulp.src(config.src + '/' + config.dirs.styles + '/main.scss')
			.pipe(plugins.sass({ errLogToConsole: true, includePaths: [config.dirs.components], outputStyle: 'compact' }))
			.pipe(plugins.autoprefixer({ browsers: ['> 5%', 'Android 3'] }))
			.pipe(plugins.pixrem(config.pixelBase))
			.pipe(gulp.dest(config.dest + '/' + config.dirs.styles));
});

/* ============================================================ *\
    MAIN TASKS
\* ============================================================ */


gulp.task('watch', function () {
	gulp.watch([config.src + '/' + config.dirs.styles + '/**/*.scss', config.dirs.components + '/**/*.scss'], ['sass:dev']);
});

gulp.task('default', function (cb) {
	runSeq(['sass-generate-contents'],['sass:dev', 'watch'], cb);
});


