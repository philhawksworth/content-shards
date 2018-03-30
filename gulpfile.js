var gulp        = require("gulp");
var sass        = require("gulp-sass");
var serve       = require('gulp-serve');
var shell       = require('gulp-shell');
var clean       = require('gulp-clean');
var runSequence = require('run-sequence');


/*
  what goes where?
*/
var buildSrc = "src";
var buildDest = "dist";



// cleanup the build output
gulp.task('clean-build', function () {
  return gulp.src(buildDest, {read: false})
    .pipe(clean());
});


// local webserver for development
gulp.task('serve', serve({
  root: [buildDest],
  port: 8008,
}));





// Compile SCSS files to CSS
gulp.task("scss", function () {
  gulp.src(buildSrc + "/scss/main.scss")
    .pipe(sass({
      outputStyle: "compressed"
    }).on('error', sass.logError))
    .pipe(gulp.dest(buildDest + "/css"))
});



/*
 Run our static site generator to build the pages
*/
gulp.task('generate', shell.task('eleventy --config=eleventy.js'));
gulp.task('generate:docs', shell.task('eleventy --config=eleventy.docs.js'));



/*
 Manage things in and out of the build cache
*/
gulp.task('stash:docs', shell.task(`cp -R ${buildDest}/docs ${cache}/docs`));
gulp.task('fetch:docs', shell.task(`mkdir -p ${buildDest} && cp -R ${cache}/docs ${buildDest}`));



/*
  Watch src folder for changes
*/
gulp.task("watch", function () {
  gulp.watch(buildSrc + "/**/*", ["build"])
});



/*
  Build the docs section, put it in the cache, and populate a deploy from the cache
*/
gulp.task('build:docs', function(callback) {
  runSequence(
    ['generate:docs'],
    ['stash:docs'],
    ['build:cache'],
    callback
  );
});



/*
  Let's build this sucker. Mostly from the cached assets
*/
gulp.task('build:cache', function(callback) {
  runSequence(
    ['fetch:docs']
    ['scss'],
    callback
  );
});
