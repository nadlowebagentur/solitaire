var gulp = require('gulp'),
    sass = require('gulp-sass')(require('node-sass')),
    nano = require('gulp-cssnano'),
    prefix = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync');

gulp.task('html', function () {
    return gulp.src('app/index.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('babel', function () {
    return gulp.src('app/scripts/script.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts/'));
});

gulp.task('sass', function () {
    return gulp.src('app/styles/master.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(prefix({
            cascade: false
        }))
        .pipe(nano())
        .pipe(gulp.dest('dist/styles/'))
        .pipe(browserSync.stream());
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
});

gulp.task('dist', gulp.series('html', 'babel', 'sass'));
gulp.task('watch', function () {
    gulp.watch('app/*.html', gulp.series('html')); //.on('change', browserSync.reload);
    gulp.watch("app/scripts/*.js", gulp.series('babel')); //.on('change', browserSync.reload);
    gulp.watch('app/styles/**/*.scss', gulp.series('sass')); //.on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('dist', 'watch', 'serve'));
