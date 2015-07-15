
var gulp        = require ('gulp');
var uglify      = require ('gulp-uglify');
var watch       = require ('gulp-watch');
var htmlreplace = require ('gulp-html-replace');
var source      = require ('vinyl-source-stream');
var browserify  = require ('browserify');
var watchify    = require ('watchify');
var reactify    = require ('reactify');
var streamify   = require ('gulp-streamify');
var clean       = require ('gulp-clean');
var sass        = require ('gulp-sass');
var run         = require ('run-sequence');

var path = {
  HTML         : './src/index.html',
  ENTRY_POINT  : './src/jsx/App.jsx',
  SASS         : 'src/sass/**/*.scss',
  CSS          : 'src/css/**/*',
  JS           : 'src/js/**/*',
  DIST_CSS     : 'dist/src/css/**/*',
  DIST_JS      : 'dist/src/js/**/*',
  DEST         : 'dist',
  DEST_SRC     : 'dist/src',
  DEST_BUILD   : 'dist/build',
  DEST_SRC_JS  : 'dist/src/js',
  DEST_SRC_CSS : 'dist/src/css',
  OUT          : 'js/App.js',
  MINIFIED_OUT : 'js/App.min.js',
  ALL : [
    'src/index.html',
    'src/js/**/*',
    'src/css/**/*',
    'src/sass/**/*.scss'
  ]
};

/*
 *  Cleans the dist/js directory --
 *  -- runs on init
 */
gulp.task ('clean-js', function () {
  return gulp.src (path.DIST_JS)
    .pipe (clean ())
    .on ('error', handleError);
});

/*
 *  Cleans the dist/css directory --
 *  -- runs on init
 */
gulp.task ('clean-css', function () {
  return gulp.src (path.DIST_CSS)
    .pipe (clean ())
    .on ('error', handleError);
});

/*
 *  Copies src/css files into the dist/src/css directory
 */
gulp.task ('clone-css', function () {
  return gulp.src (path.CSS)
    .pipe (gulp.dest (path.DEST_SRC_CSS))
    .on('error', handleError);
});

/*
 *  Copies src/js files into the dist/src/js directory
 */
gulp.task ('clone-js', function () {
  return gulp.src (path.JS)
    .pipe (gulp.dest (path.DEST_SRC_JS))
    .on('error', handleError);
});

/*
 *  Copies src/html files into the dist/ directory
 */
gulp.task ('clone-html', function () {
  return gulp.src (path.HTML)
    .pipe (gulp.dest (path.DEST))
    .on('error', handleError);
});

/*
 *  Transforms Sass (foo.scss) files into regular CSS files
 */
gulp.task ('sass', function () {
  return gulp.src (path.SASS)
    .pipe (sass ().on ('error', sass.logError))
    .on ('error', handleError)
    .pipe (gulp.dest (path.DEST_SRC_CSS))
    .on ('error', handleError);
});

/*
 *  Main development sequence
 */
gulp.task ('dev-build-sequence', function () {
  return run (
    ['clean-js', 'clean-css'],
    ['clone-js', 'clone-css', 'clone-html'],
    ['sass']
  );
})

/*
 *  Main development task
 */
gulp.task ('watch', ['dev-build-sequence'],function () {
  var watcher  = watchify (browserify ({
    entries   : [path.ENTRY_POINT],
    transform : [reactify],
     /** Tells you the jsx line num instead of the single doc line num **/
    debug     : true,
    fullPaths : true,
    cache: {}, packageCache: {}
  }));

  watch (path.ALL, function () {
    run (['dev-build-sequence'], function () {
      watcher.bundle ()
        .on ('error', handleError)
        .pipe (source(path.OUT))
        .on ('error', handleError)
        .pipe (gulp.dest(path.DEST_SRC))
        .on ('error', handleError);
    });
  });

  return watcher.on  ('update', function () {
    /** Watches for updates and recompiles into a single js file **/
    watcher.bundle ()
      .on ('error', handleError)
      .pipe (source (path.OUT))
      .on ('error', handleError)
      .pipe (gulp.dest (path.DEST_SRC))
      .on ('error', handleError);

      console.info ("React (JSX) files successfully updated.");
  })
    /** On initial load we will compile all jsx to js **/
    .bundle ()
    .on ('error', handleError)
    .pipe (source(path.OUT))
    .on ('error', handleError)
    .pipe (gulp.dest(path.DEST_SRC))
    .on ('error', handleError);
});

gulp.task ('default', ['watch']);

/*
 * Handle errors
 * -- prevents Gulp from crashing
 */
function handleError (error) {
  console.log (error.toString ());
}
