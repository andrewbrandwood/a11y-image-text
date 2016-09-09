/* ============================================================ *\
    MOVE / Copy files
\* ============================================================ */

'use strict';

module.exports = function(gulp, config) {
    gulp.task('copy', function(){
        return gulp.src(['public/**/*'])
        .pipe(gulp.dest(config.build));
    });
};
