/*jslint node: true */
'use strict';

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    sgc = require('gulp-sass-generate-contents'),
    runSeq = require('run-sequence'),
    config = require('./_config/project.json'),
	  creds = require('./_config/creds.json'),
    srcStyles = config.src + '/' + config.dirs.styles,
    imagemin = require('gulp-imagemin'),
    sourcemaps   = require('gulp-sourcemaps'),
    gulpif       = require('gulp-if'),
    concat       = require('gulp-concat'),
    jshint       = require('gulp-jshint'),
    uglify       = require('gulp-uglify'),
    jshintConfig = require('./_config/jshint.json'),
    argv         = require('yargs').argv,
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer');

/* ============================================================ *\
    SCRIPTS / JS
\* ============================================================ */

gulp.task('scripts', function(){
    return gulp.src([config.src + '/' + config.dirs.scripts + '/src/**/*.js'])
        .pipe(gulpif(!argv.prod, jshint(jshintConfig))) //Default only
        .pipe(gulpif(!argv.prod, sourcemaps.init())) //Default only
        .pipe(concat('bundle.js'))
        .pipe(gulpif(argv.prod, uglify())) //Production only
        .pipe(gulpif(!argv.prod, sourcemaps.write('.'))) //Default only
        .pipe(gulp.dest(config.dest + '/' + config.dirs.scripts));
});

gulp.task('scripts:vendor', function(){
    return gulp.src([config.src + '/' + config.dirs.scripts + '/vendor/**/*.js'])
        .pipe(gulpif(!argv.prod, jshint(jshintConfig))) //Default only
        .pipe(gulpif(!argv.prod, sourcemaps.init())) //Default only
        .pipe(concat('bundle-critical.js'))
        .pipe(gulpif(argv.prod, uglify())) //Production only
        .pipe(gulpif(!argv.prod, sourcemaps.write('.'))) //Default only
        .pipe(gulp.dest(config.dest + '/' + config.dirs.scripts));
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
			.pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
			.pipe(plugins.pixrem(config.pixelBase))
			.pipe(gulp.dest(config.dest + '/' + config.dirs.styles));
});


gulp.task('images', function () {
  return gulp.src(config.src + '/' + config.dirs.images + '/**/*')
      .pipe(imagemin())
      .pipe(gulp.dest(config.dest + '/' + config.dirs.images));
});

/* ============================================================ *\
    MAIN TASKS
\* ============================================================ */


gulp.task('watch', function () {
	gulp.watch([config.src + '/' + config.dirs.styles + '/**/*.scss', config.dirs.components + '/**/*.scss', config.src + '/' + config.dirs.components + '/**/*.js', config.src + '/' + config.dirs.scripts + '/**/*.js'], ['sass:dev', 'scripts', 'scripts:vendor']);
});

gulp.task('default', function (cb) {
	runSeq(['sass-generate-contents'],['sass:dev', 'images', 'watch', 'scripts', 'scripts:vendor'], cb);
});
