const gulp = require('gulp');
const lintTargetBlank = require('.');

gulp.task('lint-target-blank-pass', () =>{
  gulp.src('fixtures/pass.html')
    .pipe(lintTargetBlank({}));
});

gulp.task('lint-target-blank-fail', () =>{
  gulp.src('fixtures/fail.html')
    .pipe(lintTargetBlank({}));
});
