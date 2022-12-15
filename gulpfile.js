var gulp = require('gulp');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var obfuscate = require('gulp-obfuscate');

gulp.task('default', function () {
    return gulp.src('src/app.ts')
    //.pipe(uglify())
    .pipe(ts({
        noImplicitAny: true        
    }))
    .pipe(obfuscate())
    .pipe(gulp.dest('./dist/'));
});

   