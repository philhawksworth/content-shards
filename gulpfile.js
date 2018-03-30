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
var localCache = "cache";
var prodCache = " /opt/build/cache/test-shard";
var cache;

// automatically set the correct path for our cache manipulations
if(process.env.URL) {
  cache = prodCache;
} else {
  cache = localCache;
}



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
gulp.task('generate:site', shell.task('eleventy --config=eleventy.js'));
gulp.task('generate:docs', shell.task('eleventy --config=eleventy.docs.js'));
gulp.task('generate:news', shell.task('eleventy --config=eleventy.news.js'));



/*
 Manage things in and out of the build cache
*/
gulp.task('stash:docs', shell.task(`mkdir -p ${cache} && cp -R ${buildDest}/docs ${cache}`));
gulp.task('stash:news', shell.task(`mkdir -p ${cache} && cp -R ${buildDest}/news ${cache}`));
gulp.task('stash:site', shell.task(`mkdir -p ${cache} && cp -R ${buildDest} ${cache}`));
gulp.task('fetch:docs', shell.task(`mkdir -p ${buildDest} && cp -R ${cache}/docs ${buildDest}`));
gulp.task('fetch:news', shell.task(`mkdir -p ${buildDest} && cp -R ${cache}/news ${buildDest}`));
gulp.task('fetch:site', shell.task(`mkdir -p ${buildDest} && cp -R ${cache}/* ${buildDest}`));



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
  Build the docs section, put it in the cache, and populate a deploy from the cache
*/
gulp.task('build:news', function(callback) {
  runSequence(
    ['generate:news'],
    ['stash:news'],
    ['build:cache'],
    callback
  );
});


/*
  Build the docs section, put it in the cache, and populate a deploy from the cache
*/
gulp.task('build:site', function(callback) {
  runSequence(
    ['generate:site'],
    ['stash:site','scss'],
    callback
  );
});



/*
  Let's build this sucker. Mostly from the cached assets
*/
gulp.task('build:cache', function(callback) {
  runSequence(
    ['fetch:site'],
    ['scss'],
    callback
  );
});
