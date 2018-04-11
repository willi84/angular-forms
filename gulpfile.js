var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('concat:dist', function() {
 return gulp.src(['./dist/inline*bundle.js', './dist/polyfills*bundle.js', './dist/main*bundle.js'])
   .pipe(concat('angular-forms.min.js'))
   .pipe(gulp.dest('../../../../dist/FOOBAR/js/'));
});
gulp.task('concat', function() {
    return gulp.src(['./dist/inline*bundle.js', './dist/polyfills*bundle.js', './dist/main*bundle.js'])
      .pipe(concat('angular-forms.min.js'))
      .pipe(gulp.dest('./dist/'));
   });
