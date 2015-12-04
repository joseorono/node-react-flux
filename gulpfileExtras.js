var gulp = require ('gulp');
var watch = require ('gulp-watch');
var sass = require ('gulp-sass');
var concat = require ('gulp-concat');
var source = require ('vinyl-source-stream');
var browserify = require ('browserify');
var watchify = require ('watchify');
var reactify = require ('reactify');
var spawn = require ('child_process').spawn;
var del = require ('del');
var run = require ('run-sequence');
var SourceDirectories = require ('./utils/SourceDirectories');

var _path = {
  ENTRY_POINT: './src/extras/AppExtendedExample.jsx',
  OUTPUT_JS: 'App.js',
  OUTPUT_CSS: 'App.css',
  SERVER: [ './server.js', './server/**/*' ],
  ASSETS: './assets/**/*',
  HTML: './src/*.html',
  SASS: './src/**/*.scss',
  REACT: [ './src/**/*.jsx', './src/**/*.js' ],
  REACT_DIRECTORIES: SourceDirectories ('./src', 'relative'),
  SRC: './src',
  DIST: 'dist',
};

var _NODE = null;
var _WATCHER = null;
var _PRODUCTION = false;

var _browserify = function () {
  return browserify (_path.ENTRY_POINT, {
    cache: {},
    debug: true,
    transform: [ reactify ],
    extensions: [ '.js', '.jsx' ],
    paths: _path.REACT_DIRECTORIES,
    packageCache: {}
  });
};

var _getSourceDirectories = function () {
  return SourceDirectories (_path.SRC, 'relative');
};

var _error = function (error) {
  console.log (error.toString ());
};

gulp.task('assets', function() {
  return gulp.src(_path.ASSETS)
      .on ('error', _error)
      .pipe (gulp.dest('dist/assets'))
      .on('error', _error);
})

gulp.task ('html', function () {
  return gulp.src (_path.HTML)
    .on ('error', _error)
    .pipe (gulp.dest (_path.DIST))
    .on('error', _error);
});

gulp.task ('sass', function () {
  return gulp.src (_path.SASS)
    .on ('error', _error)
    .pipe (sass ())
    .pipe (concat (_path.OUTPUT_CSS))
    .pipe (gulp.dest (_path.DIST));
});

gulp.task ('watchify', function () {
  if (_WATCHER) _WATCHER.close ();
  _WATCHER = watchify (_browserify ());

  _WATCHER
    .bundle ()
    .on ('error', _error)
    .pipe (source (_path.OUTPUT_JS))
    .on ('error', _error)
    .pipe (gulp.dest (_path.DIST))
    .on ('error', _error);
});

gulp.task ('browserify', function () {
  if (_PRODUCTION) {
    return _browserify ()
      .bundle ()
      .on ('error', _error)
      .pipe (source (_path.OUTPUT_JS))
      .on ('error', _error)
      .pipe (gulp.dest (_path.DIST))
      .on ('error', _error);
  } else {
    _WATCHER
      .bundle ()
      .on ('error', _error)
      .pipe (source (_path.OUTPUT_JS))
      .on ('error', _error)
      .pipe (gulp.dest (_path.DIST))
      .on ('error', _error);
  }
});

gulp.task ('server', function () {
  if (_NODE) _NODE.kill ();
  _NODE = spawn ('node', ['server.js'], { stdio: 'inherit' });
  _NODE.on ('close', function (code) {
    if (code === 8) {
      console.log ('Error detected; waiting for changes...');
    }
  })
});

gulp.task ('build', function () {
  _PRODUCTION = true;
  return run (['html'], ['sass'], ['browserify']);
});

gulp.task ('deploy', function () {
  _PRODUCTION = true;
  return run (['html'], ['sass'], ['browserify'], function () {
    gulp.start ('server');
  });
});

gulp.task ('start', function () {
	return run (['assets'], ['html'], ['sass'], ['watchify'], function () {
    run (['server'], function () {
      watch (_path.SERVER, function () {
        gulp.start ('server');
      });

      watch(_path.ASSETS, function() {
	gulp.start ('assets');
      });

      watch (_path.HTML, function () {
        gulp.start ('html');
      });

      watch (_path.SASS, function () {
        gulp.start ('sass');
      });

      watch (_path.REACT, function () {
        if (_getSourceDirectories ().length !== _path.REACT_DIRECTORIES.length) {
          _path.REACT_DIRECTORIES = _getSourceDirectories ();
          gulp.start ('watchify');
        } else {
          gulp.start ('browserify');
        }
      });
    })
  })
});

gulp.task ('default', ['start']);

process.on ('exit', function () {
  if (_NODE) _NODE.kill ();
})
