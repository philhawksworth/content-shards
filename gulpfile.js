var gulp        = require("gulp");
var sass        = require("gulp-sass");
var serve       = require('gulp-serve');
var shell       = require('gulp-shell');
var runSequence = require('run-sequence');


/*
  what goes where?
*/
var buildSrc = "src";
var buildDest = "dist";
var localCache = "cache/test-shard";
var prodCache = " /opt/build/cache/test-shard";
var cache;

// automatically set the correct path for our cache manipulations
if(process.env.URL) {
  cache = prodCache;
} else {
  cache = localCache;
}


/*
  local webserver for development
*/
gulp.task('serve', serve({
  root: [buildDest],
  port: 8008,
}));


/*
  Compile SCSS files to CSS
*/
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
gulp.task('generate:site', ['exclude:none'], shell.task('eleventy --config=eleventy.js'));
gulp.task('generate:docs', ['exclude:news'], shell.task('eleventy --config=eleventy.js'));
gulp.task('generate:news', ['exclude:docs'], shell.task('eleventy --config=eleventy.js'));


/*
  Tell eleventy which directories it should exclude from the generation
*/
gulp.task('exclude:docs', shell.task('cp src/site/.eleventyignore.docs src/site/.eleventyignore'));
gulp.task('exclude:news', shell.task('cp src/site/.eleventyignore.news src/site/.eleventyignore'));
gulp.task('exclude:none', shell.task('echo "" > src/site/.eleventyignore'));


/*
 Manage things in and out of the build cache
*/
gulp.task('stash:docs', shell.task(`mkdir -p ${cache} && cp -R ${buildDest}/docs ${cache}`));
gulp.task('stash:news', shell.task(`mkdir -p ${cache} && cp -R ${buildDest}/news ${cache}`));
gulp.task('stash:site', shell.task(`mkdir -p ${cache} && cp -R ${buildDest}/* ${cache}`));
gulp.task('fetch:site', shell.task(`mkdir -p ${buildDest} && cp -R ${cache}/* ${buildDest}`));
gulp.task('purge', shell.task(`rm -rf ${cache}`)); //scary


/*
  Watch src folder for changes
*/
gulp.task("watch", function () {
  gulp.watch(buildSrc + "/**/*", ["build:site"])
});


/*
  Build the docs section, put it in the cache, and populate a deploy from the cache
*/
gulp.task('build:docs', function(callback) {
  runSequence(
    ['generate:docs'],
    ['stash:docs'],
    ['build:cached'],
    callback
  );
});


/*
  Build the news section, put it in the cache, and populate a deploy from the cache
*/
gulp.task('build:news', function(callback) {
  runSequence(
    ['generate:news'],
    ['stash:news'],
    ['build:cached'],
    callback
  );
});


/*
  Build the entire site section, put it in a clean cache
*/
gulp.task('build:site', function(callback) {
  runSequence(
    ['purge'],
    ['generate:site'],
    ['stash:site','scss'],
    callback
  );
});


/*
  Ge the site from the cache, and also compile the scss
*/
gulp.task('build:cached', function(callback) {
  runSequence(
    ['fetch:site'],
    ['scss'],
    callback
  );
});
