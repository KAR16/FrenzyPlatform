
var gulp = require('gulp');
var w3cjs = require('gulp-w3cjs');
var csslint = require('gulp-csslint');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('htmllint', function () {
    gulp.src('*.html')
        .pipe(w3cjs());
});

gulp.task('jshint', function () {
  gulp.src(['*.js', 'public/js/**/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter());
});

gulp.task('csslint', function() {
  gulp.src('css/*.css')
    .pipe(csslint())
    .pipe(csslint.reporter());
});

gulp.task('lint', function() {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// Watch Files For Changes & Reload
gulp.task('serve', function () {
 browserSync({
   notify: false,
   // Customize the BrowserSync console logging prefix
   logPrefix: 'WSK',
   // Run as an https by uncommenting 'https: true'
   // Note: this uses an unsigned certificate which on first access
   //       will present a certificate warning in the browser.
   // https: true,
   server: ['.tmp', '.']
 });

 gulp.watch(['*.html'], reload);
 gulp.watch(['templates/**/*.html'], reload);
 gulp.watch(['styles/**/*.{scss,css}'], reload);
 gulp.watch(['js/**/*.js'], ['jshint']);
 gulp.watch(['img/**/*'], reload);
});

gulp.task('default', function() {
  gulp.start('htmllint', 'csslint');
});
