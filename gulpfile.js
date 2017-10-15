"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var uglify = require("gulp-uglify");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var cheerio = require("gulp-cheerio");
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var run = require("run-sequence");
var del = require("del");

gulp.task("clean", function() {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
    "fonts/**/*.{woff,woff2}"
  ], {
    base: "."
  })
  .pipe(gulp.dest("build"));
});

gulp.task("style", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass({
      includePaths: require("node-normalize-scss").includePaths
    }))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(minify())
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("scripts", function() {
  gulp.src("js/**/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("build/js"))
});

gulp.task("images", function () {
  return gulp.src("img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp.src("img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img/webp"));
});

gulp.task("sprite", function() {
  return gulp.src("img/sprite/*.svg")
    .pipe(cheerio({
      run: function ($) {
          $('[fill]').removeAttr('fill');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp.src("*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build/"));
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html", ["html"]).on("change", server.reload);
  gulp.watch("js/**/*.js", ["scripts"]).on("change", server.reload);
});

gulp.task("build", function (done) {
  run(
    "clean",
    "copy",
    "style",
    "scripts",
    "images",
    "webp",
    "sprite",
    "html",
    done
  );
});
