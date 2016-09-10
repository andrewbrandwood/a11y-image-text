/*jslint node: true */
'use strict';

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    sgc = require('gulp-sass-generate-contents'),
    runSeq = require('run-sequence'),
	  creds = require('./_config/creds.json'),
    imagemin = require('gulp-imagemin'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    handlebars = require('gulp-compile-handlebars'),
    rename = require('gulp-rename'),
    argv         = require('yargs').argv;
    // Tasks
    var tasks         = {};

    tasks.default     = [];
    tasks.watch       = [];

    // Config
    var config        = require('./_config/project.json');
    var srcStyles     = config.src + '/' + config.dirs.styles;


    config.cleanPaths = [];
    config.creds      = require('./_config/creds.json');




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

// var sassConfig = {
//     errLogToConsole: true,
//     includePaths:    [config.paths.src.components],
//     outputStyle:     'compact'
// };
//
// gulp.task('sass', ['sprites'],function () {
//     return gulp.src(config.src + '/' + config.dirs.styles + '/main.scss')
//         .pipe(gulpif(!argv.prod, sourcemaps.init())) //Default only
//         .pipe(sass(sassConfig))
//         .pipe(postcss(getPostCssPlugins(stylesConfig.browsers.normal)))
//         .pipe(gulpif(!argv.prod, sourcemaps.write('.'))) //Default only
//         .pipe(gulpif(!argv.prod, livereload())) //Default only
//         .pipe(gulp.dest(config.dest + '/' + config.dirs.styles));
// });


gulp.task('images', function () {
  return gulp.src(config.src + '/' + config.dirs.images + '/**/*')
      .pipe(imagemin())
      .pipe(gulp.dest(config.dest + '/' + config.dirs.images));
});


gulp.task('compile-html', function () {
    var templateData = {}, // if template data is used then get it from a json file
    options = {
        batch : ['./views/_partials']
    }

    return gulp.src(config.dirs.components + '/**/*.hbs')
        .pipe(handlebars(templateData, options))
        .pipe(rename({extname: '.html'}))
        .pipe(gulp.dest(config.build));
});

/* ============================================================ *\
    MAIN TASKS
\* ============================================================ */

require('./tools/tasks/compile-handlebars.js')(gulp, config);
require('./tools/tasks/copy-assets.js')(gulp, config);
require('./tools/tasks/scripts.js')(gulp, config, argv);


gulp.task('watch', function () {
	gulp.watch([config.src + '/' + config.dirs.styles + '/**/*.scss', config.dirs.components + '/**/*.scss', config.src + '/' + config.dirs.components + '/**/*.js', config.src + '/' + config.dirs.scripts + '/**/*.js'], ['sass:dev', 'scripts', 'scripts:vendor']);
});

gulp.task('default', function (cb) {
	runSeq(['sass-generate-contents', 'compile-handlebars'],['sass:dev', 'images', 'watch', 'scripts', 'scripts:vendor'], cb);
});

gulp.task('build', function (cb) {
	runSeq(['sass-generate-contents', 'compile-handlebars'],['sass:dev', 'images', 'scripts', 'scripts:vendor'],['compile-html', 'copy'], cb);
});
