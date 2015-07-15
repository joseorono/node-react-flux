
var gulp        = require ('gulp');
var uglify      = require ('gulp-uglify');
var htmlreplace = require ('gulp-html-replace');
var source      = require ('vinyl-source-stream');
var browserify  = require ('browserify');
var watchify    = require ('watchify');
var reactify    = require ('reactify');
var streamify   = require ('gulp-streamify');
var clean       = require ('gulp-clean');
var sass        = require ('gulp-sass');

var path = {
  HTML         : './src/index.html',
  ENTRY_POINT  : './src/jsx/App.jsx',
  ALL          : [ 'src/sass/*.scss', 'src/index.html' ],
  JS           : [ 'dist/src/js/*.js', 'dist/src/js/**/*.js' ],
  CSS          : [ 'dist/src/css/*.css' ],
  SASS         : [ 'src/sass/*.scss'    ],
  DEST         : 'dist',
  DEST_SRC     : 'dist/src',
  DEST_BUILD   : 'dist/build',
  DEST_SRC_JS  : 'dist/src/js',
  DEST_SRC_CSS : 'dist/src/css',
  OUT          : 'js/App.js',
  MINIFIED_OUT : 'js/App.min.js'
};

/*
 *  Cleans the dist/css & dist/js directories --
 *  -- runs on init
 */
gulp.task ('clean', function () {
  gulp.src (path.JS)
    .pipe (clean ())
    .on ('error', handleError);.
  gulp.src (path.CSS)
    .pipe (clean ())
    .on ('error', handleError);
});

/*
 *  Copies specified files to their designated locations
 */
gulp.task ('clone', function () {
  gulp.src (path.HTML)
    .pipe (gulp.dest (path.DEST))
    .on('error', handleError);
});

/*
 *  Transforms Sass (foo.scss) files into regular CSS files
 */
gulp.task('sass', ['clean-css'], function () {
  gulp.src (path.SASS)
    .pipe (sass ().on ('error', sass.logError))
    .on ('error', handleError)
    .pipe (gulp.dest (path.DEST_SRC_CSS))
    .on ('error', handleError);
});

/*
 *  Main development task
 */
gulp.task ('watch', ['clean', 'sass', 'clone'], function () {
  var watcher  = watchify(browserify ({
    entries   : [path.ENTRY_POINT],
    transform : [reactify],
     /** Tells you the jsx line num instead of the single doc line num **/
    debug     : true,
    fullPaths : true,
    cache: {}, packageCache: {}
  }));

  return watcher.on  ('update', function () {
    /** Watches for updates and recompiles into a single js file **/
    watcher.bundle ()
      .on ('error', handleError)
      .pipe (source (path.OUT))
      .on ('error', handleError)
      .pipe (gulp.dest (path.DEST_SRC))
      .on ('error', handleError);

    console.log ('Successfully compiled JSX fils to JS.');
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
gulp.watch (path.ALL, ['sass', 'clone']);

/*
 * Handle errors
 * -- prevents Gulp from crashing
 */
function handleError (error) {
  console.log (error.toString ());
}
