/* ============================================================ *\
    SCRIPTS / JS
\* ============================================================ */

'use strict';

var gulpif       = require('gulp-if');
var jshint       = require('gulp-jshint');
var uglify       = require('gulp-uglify');
var jshintConfig = require('../../_config/jshint.json');
var sourcemaps   = require('gulp-sourcemaps');
var concat       = require('gulp-concat');

module.exports = function(gulp, config, argv) {

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
      return gulp.src([
        config.src + '/' + config.dirs.scripts + '/vendor/jquery-3.1.0.min.js',
        config.src + '/' + config.dirs.scripts + '/vendor/**/*.js'
      ])
      .pipe(gulpif(!argv.prod, jshint(jshintConfig))) //Default only
      .pipe(gulpif(!argv.prod, sourcemaps.init())) //Default only
      .pipe(concat('bundle-critical.js'))
      .pipe(gulpif(argv.prod, uglify())) //Production only
      .pipe(gulpif(!argv.prod, sourcemaps.write('.'))) //Default only
      .pipe(gulp.dest(config.dest + '/' + config.dirs.scripts));
  });

};
