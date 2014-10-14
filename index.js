var gulp = require('gulp');
var notify = require('gulp-notify');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var gulpif = require('gulp-if');
var elixir = require('laravel-elixir');

elixir.extend('stylus', function(src, output) {

    var config = this;

    var paths = config.preprocessors.stylus = {
        src: src || '/stylus',
        search: '/**/*.styl',
        output: output || config.cssOutput
    };

    gulp.task('stylus', function() {
        var onError = function(err) {
            notify.onError({
                title:    "Laravel Elixir",
                subtitle: "Stylus Compilation Failed!",
                message:  "Error: <%= error.message %>",
                icon: __dirname + '/../laravel-elixir/icons/fail.png'
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

    return config.addPreprocessor('stylus', paths.src, paths.output);

});