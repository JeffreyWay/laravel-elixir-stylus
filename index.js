var _ = require('underscore');
var CssTask = require('laravel-elixir/dist/tasks/CssTask').default;

/*
 |----------------------------------------------------------------
 | Stylus Compilation Task
 |----------------------------------------------------------------
 |
 | This task will compile your Stylus, including minification and
 | and auto-prefixing. Additionally it supports any postStylus
 | plugins that you want to include with your compilation.
 |
 */

Elixir.config.css.stylus = {
    folder: 'stylus',
    search: '/**/*.styl',
    plugin: require('gulp-stylus'),
    pluginOptions: {
        use: [
            require('poststylus')(['lost'])
        ]
    }
};


Elixir.extend('stylus', function(src, output, options) {
    new CssTask('stylus', getPaths(src, output), options || {});
});


/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|array} src
 * @param  {string|null}  output
 * @return {object}
 */
var getPaths = function(src, output) {
    return new Elixir.GulpPaths()
        .src(src, Elixir.config.get('assets.css.stylus.folder'))
        .output(output || Elixir.config.get('public.css.outputFolder'), 'app.css');
};
