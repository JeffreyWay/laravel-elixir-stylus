var gulp = require('gulp');
var notify = require('gulp-notify');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var gulpif = require('gulp-if');

var elixir = require('laravel-elixir');
var config = elixir.config;

gulp.task('stylus', function() {
    var onError = function(err) {
        notify.onError({
            title:    "Laravel Elixir",
            subtitle: "Stylus Compilation Failed!",
            message:  "Error: <%= error.message %>",
            icon: __dirname + '/../icons/fail.png'
        })(err);

        this.emit('end');
    };

    return gulp.src(config.preprocessors.stylus.src)
        .pipe(stylus()).on('error', onError)
        .pipe(autoprefixer())
        .pipe(gulpif(config.production, minify()))
        .pipe(gulp.dest(config.preprocessors.stylus.output))
        .pipe(notify({
            title: 'Laravel Elixir',
            subtitle: 'Stylus Compiled!',
            icon: __dirname + '/../laravel-elixir/icons/laravel.png',
            message: ' '
        }));
});

// Register the task with Elixir.
elixir.extend('stylus', 'stylus', function(src, output) {
    this.preprocessors.stylus = {
        src: '/stylus',
        search: '/**/*.styl',
        output: 'public/css'
    };

    this.preprocessor('stylus', src, output);

    return this;
});