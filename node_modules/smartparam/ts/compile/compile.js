// import gulp
var gulp = require("gulp")
var gulpTypescript = require("gulp-typescript");
var pr = require("pushrocks");

pr.beautylog.info("Now compiling TypeScript");
gulp.task('compileTS', function() {
	var stream = gulp.src('../index.ts')
	  .pipe(gulpTypescript({
	  	out: "index.js"
	  }))
	  .pipe(gulp.dest("../../"));
	return stream;
});

gulp.task('compileTestTS', function() {
	var stream = gulp.src('../test.ts')
			.pipe(gulpTypescript({
				out: "test.js"
			}))
			.pipe(gulp.dest("../../"));
	return stream;
});

gulp.task('default',['compileTS','compileTestTS'], function() {
	pr.beautylog.success('Typescript compiled');
});
gulp.start.apply(gulp, ['default']);