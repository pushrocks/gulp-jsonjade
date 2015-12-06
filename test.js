/// <reference path="typings/tsd.d.ts" />
var plugins = {
    gulp: require("gulp"),
    jade: require("gulp-jade"),
    util: require("gulp-util"),
    vinylFile: require("vinyl-file"),
    jsonjade: require("./index.js"),
    gulpInspect: require("gulp-inspect")
};
var jadeTemplate = plugins.vinylFile.readSync("./test/test.jade");
plugins.gulp.task("default", function () {
    var stream = plugins.gulp.src("./test/test.json")
        .pipe(plugins.jsonjade(jadeTemplate))
        .pipe(plugins.jade({
        pretty: true,
        basedir: '/'
    })).on("error", plugins.util.log)
        .pipe(plugins.gulpInspect(true))
        .pipe(plugins.gulp.dest("./test/result/"));
    return stream;
});
plugins.gulp.start.apply(plugins.gulp, ['default']);
