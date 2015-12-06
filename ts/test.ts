/// <reference path="typings/tsd.d.ts" />

var plugins = {
    beautylog: require("beautylog")("os"),
    gulp: require("gulp"),
    jade: require("gulp-jade"),
    util: require("gulp-util"),
    vinylFile: require("vinyl-file"),
    jsonjade: require("./index.js"),
    gulpInspect: require("gulp-inspect")
};


var jadeTemplate = plugins.vinylFile.readSync("./test/test.jade");
var noJadeTemplate = {}

plugins.gulp.task("check1",function(){
    var stream = plugins.gulp.src("./test/test.json")
        .pipe(plugins.jsonjade(jadeTemplate))
        .pipe(plugins.jade({ //let jade do its magic
            pretty: true,
            basedir: '/'
        })).on("error",plugins.util.log)
        .pipe(plugins.gulpInspect(true))
        .pipe(plugins.gulp.dest("./test/result/"));
    return stream;
});

plugins.gulp.task("check2",function(){
    var stream = plugins.gulp.src("./test/test.json")
        .pipe(plugins.jsonjade(noJadeTemplate));
});


plugins.gulp.task("default",["check1","check2"],function(){
    plugins.beautylog.success("Test passed");
});
plugins.gulp.start.apply(plugins.gulp, ['default']);