// import gulp
var gulp = require("gulp");
var gulpTypescript = require("gulp-typescript");

gulp.task('compileTS', function() {
	var stream = gulp.src('../index.ts')
	  .pipe(gulpTypescript({
	  	out: "index.js"
	  }))
	  .pipe(gulp.dest("../../"));
	return stream;
});

gulp.task('default',['compileTS'], function() {
	console.log('Typescript compiled');
});
gulp.start.apply(gulp, ['default']);