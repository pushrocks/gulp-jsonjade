// import gulp
var gulp = require("gulp");
var gulpTypescript = require("gulp-typescript");
var beautylog = require("beautylog")("os");

gulp.task('compileTS', function() {
	var stream = gulp.src('../index.ts')
	  .pipe(gulpTypescript({
	  	out: "index.js"
	  }))
	  .pipe(gulp.dest("../../"));
	return stream;
});

gulp.task('default',['compileTS'], function() {
	beautylog.success('Typescript compiled');
});
gulp.start.apply(gulp, ['default']);