'use strict';

var through = require('through2');
var path = require('path');
var File = require('vinyl');
var toIco = require('to-ico');

// file can be a vinyl file object or a string
// when a string it will construct a new one
module.exports = function(file, opt) {
  if (!file) {
    throw new Error('gulp-to-ico: Missing file option');
  }
  opt = opt || {};

  var latestFile;
  var latestMod;
  var fileName;
  var input = [];

  if (typeof file === 'string') {
    fileName = file;
  } else if (typeof file.path === 'string') {
    fileName = path.basename(file.path);
  } else {
    throw new Error('gulp-to-ico: Missing path in file options');
  }

  function bufferContents(file, enc, cb) {
    // ignore empty files
    if (file.isNull()) {
      cb();
      return;
    }

    // we don't do streams (yet)
    if (file.isStream()) {
      this.emit('error', new Error('gulp-to-ico: Streaming not supported'));
      cb();
      return;
    }

    // set latest file if not already set,
    // or if the current file was modified more recently.
    if (!latestMod || file.stat && file.stat.mtime > latestMod) {
      latestFile = file;
      latestMod = file.stat && file.stat.mtime;
    }

    // add file to input
    input.push(file.contents);
    cb();
  }

  function endStream(cb) {
    // no files passed in, no file goes out
    if (!latestFile || input.length === 0) {
      cb();
      return;
    }

    var icoFile;

    // if file opt was a file path
    // clone everything from the latest file
    if (typeof file === 'string') {
      icoFile = latestFile.clone({contents: false});
      icoFile.path = path.join(latestFile.base, file);
    } else {
      icoFile = new File(file);
    }

    toIco(input, opt).then(content => {
      icoFile.contents = content;

      this.push(icoFile);
      cb();
    });
  }

  return through.obj(bufferContents, endStream);
};
