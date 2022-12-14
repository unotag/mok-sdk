var gulp = require('gulp');
var uglify = require('gulp-uglify');
var obfuscate = require('gulp-obfuscate');
 
gulp.task('default', function () {
    return gulp.src('src/app.js')
    //.pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./dist/'));
});