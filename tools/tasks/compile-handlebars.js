/* ============================================================ *\
    MOVE / Handlebars compile templates
\* ============================================================ */

'use strict';

var path = require('path');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var merge = require('merge-stream');
var handlebars = require('gulp-handlebars');

module.exports = function(gulp, config) {

  gulp.task('compile-handlebars', function() {
    var templatesArr = [
      './' + config.dirs.components + '/_partials/palette-table/*.hbs'
    ];
    gulp.src(templatesArr)
      .pipe(handlebars({handlebars: require('handlebars')}))
      .pipe(wrap('Handlebars.template(<%= contents %>)'))
      .pipe(declare({
        namespace: 'a11y.templates',
        noRedeclare: true // Avoid duplicate declarations
      })).pipe(concat('templates.js'))
      .pipe(gulp.dest(config.dest + '/' + config.dirs.templates));
  });
};
