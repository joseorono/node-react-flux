var fs = require ('fs');
var path = require ('path');
var readdirSyncRecursive = require ('wrench').readdirSyncRecursive;

/** Synchronously read every item
    inside a given path, returning an array of strings **/

var SourceDirectories = function (pathToDirectory, format) {
  pathToDirectory = '.' + pathToDirectory + '/';

  /** Read in the items
      inside the given path **/
  var directories = readdirSyncRecursive (path.resolve (__dirname, pathToDirectory));

  /** Filter out all read items
      that are not directo-ries **/
  directories = directories.filter (function (item) {
    var path_name = path.resolve (__dirname, pathToDirectory + item);
    if (fs.lstatSync (path_name).isDirectory ()) {
      return path_name;
    }
  });

  /** Convert the filtered items
      to their 'absolute' path if the isAbsolute flag is true **/
  if (format === 'absolute') {
    directories = directories.map (function (directory) {
      return path.resolve (__dirname, pathToDirectory + directory);
    });
  } else {
    /** ...and as for 'relative' paths **/
    directories = directories.map (function (directory) {
      return pathToDirectory.substring (1) + directory;
    });
  }

  /** Return the array of directories
      back to the Webpack configuration **/
  return directories;
}

module.exports = SourceDirectories;
