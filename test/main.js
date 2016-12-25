var ico = require('../');

var should = require('should');
var path = require('path');
var assert = require('stream-assert');
var File = require('vinyl');
var gulp = require('gulp');

require('mocha');

var fixtures = function (glob) { return path.join(__dirname, 'fixtures', glob); }

describe('gulp-to-ico', function() {
  it('should throw, when arguments is missing', function () {
    ico.should.throw('gulp-to-ico: Missing file option');
  });

  it('should ignore null files', function (done) {
    var stream = ico('test.ico');

    stream
      .pipe(assert.length(0))
      .pipe(assert.end(done));

    stream.write(new File());
    stream.end();
  });

  it('should emit error on streamed file', function (done) {
    gulp.src(fixtures('*'), { buffer: false })
      .pipe(ico('test.ico'))
      .once('error', function (err) {
        err.message.should.eql('gulp-to-ico: Streaming not supported');
        done();
      });
  });

  it('should convert single file', function (done) {
    gulp.src(fixtures('16.png'))
      .pipe(assert.length(1))
      .pipe(ico('test.ico'))
      .pipe(assert.length(1))
      .pipe(assert.end(done));
  });

  it('should convert multiple files', function (done) {
    gulp.src(fixtures('*'))
      .pipe(assert.length(2))
      .pipe(ico('test.ico'))
      .pipe(assert.length(1))
      .pipe(assert.end(done));
  });
});
