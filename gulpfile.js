var gulp = require('gulp');
var ts = require('gulp-typescript');
const javascriptObfuscator = require('gulp-javascript-obfuscator');
gulp.task('default', function () {
    return gulp.src('src/app.ts')    
    .pipe(ts({
        noImplicitAny: true        
    }))  
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./dist/'));
});

   