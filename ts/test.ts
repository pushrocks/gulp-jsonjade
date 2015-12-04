/// <reference path="typings/tsd.d.ts" />
var gulp = require("gulp");
var jade = require("gulp-jade");
var util = require("gulp-util");
var vinylFile = require("vinyl-file");
var jsonjade = require("./index.js");

var jadeTemplate = vinylFile.readSync("./test/test.jade");

gulp.task("default",function(){
    var stream = gulp.src("./test/test.json")
        .pipe(jsonjade(jadeTemplate))
        .pipe(jade({ //let jade do its magic
            pretty: true,
            basedir: '/'
        })).on("error",util.log)
        .pipe(gulp.dest("./test/result/"));
    return stream;
});
gulp.start.apply(gulp, ['default']);