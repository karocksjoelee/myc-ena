const gulp = require('gulp');
const jshint = require('gulp-jshint');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();
const cm = require('./utility/common-module');

gulp.task('default', ['serve','jshint', 'nodemon', 'watch-front-end','watch-back-end']);


gulp.task('serve', () => {
    browserSync.init({
        proxy: {
            target: 'localhost:7500',
            ws: true
        }
    });
});


gulp.task('jshint', () => {
    return gulp.src(['routes/**/*.js', 'middleware.js', 'bin/www.js'])
        .pipe(jshint({
            esnext: true
        }))
        .pipe(jshint.reporter('jshint-stylish'));
});


gulp.task('watch-front-end', function () {

    gulp.watch(['dist/*.html', 'dist/*.js', 'dist/*.*']).on('change', browserSync.reload);

});

gulp.task('watch-back-end', () => {

    gulp.watch(['routes/**/*.js', 'middleware.js', 'bin/www.js', 'gulpfile.js','dist/*.*']).on('change', () => {
        cm.logWarn('[SERVER] Back-End File Changed');
    });

});

gulp.task('nodemon',() => {
   nodemon({
       script: './bin/www',
       env: {'NODE_ENV':'development'},
       ignore: ['src']
   }).on('restart',() => {
       cm.logWarn('[SERVER] Restarted ');
   });
});

