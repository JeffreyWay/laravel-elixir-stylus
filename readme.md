## Usage

This is a simple wrapper around Laravel Elixir. Add it to your Elixir-enhanced Gulpfile, like so:

```
var elixir = require('laravel-elixir');

require('laravel-elixir-stylus');

elixir(function(mix) {
   mix.stylus();
});
```

This will scan your `resources/assets/stylus` directory for all files. Instead, if you only want to compile a single file, you may do:

```
mix.stylus("bootstrap.styl");
```

Finally, if you'd like to output to a different directory than the default `public/css`, then you may override this as well.

```
mix.stylus("bootstrap.styl", "public/css/foo/bar/");
```
