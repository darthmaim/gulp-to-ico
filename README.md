![status](https://secure.travis-ci.org/darthmaim/gulp-to-ico.svg?branch=master)

## Installation

Install package with NPM and add it to your development dependencies:

`npm install --save-dev gulp-to-ico`

## Information

<table>
<tr>
<td>Package</td><td>gulp-to-ico</td>
</tr>
<tr>
<td>Description</td>
<td>Combine multiple .png files into a single .ico file.</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 4</td>
</tr>
</table>

## Usage

```js
var ico = require('gulp-to-ico');

gulp.task('favicon', function() {
  return gulp.src('./img/favicon/*.png')
    .pipe(ico('favicon.ico'))
    .pipe(gulp.dest('./dist/'));
});
```

To specify `cwd`, `path` and other [vinyl](https://github.com/wearefractal/vinyl) properties, gulp-to-ico accepts `Object` as first argument:

```js
var ico = require('gulp-to-ico');

gulp.task('scripts', function() {
  return gulp.src(['./img/favicon/16.png', './img/favicon/32.png'])
    .pipe(ico({ path: 'favicon.ico', stat: { mode: 0666 }}))
    .pipe(gulp.dest('./dist/'));
});
```

You can pass options to the underlying [to-ico](https://github.com/kevva/to-ico) plugin as a second parameter.


```js
var ico = require('gulp-to-ico');

gulp.task('favicon', function() {
  return gulp.src('./img/favicon/*.png')
    .pipe(ico('favicon.ico', { resize: true, sizes: [16, 24, 32, 64] }))
    .pipe(gulp.dest('./dist/'));
});
```
