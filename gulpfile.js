var gulp = require('gulp');
var uglify = require('gulp-uglify');
var maps = require('gulp-sourcemaps');
var template = require('gulp-template');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var fs = require('fs');

var config = require(__dirname + '/gulp-config.js');

var source_file = fs.readFileSync(config.source.source_file, 'utf8');



function buildJSWrapper(template_name, dest_name, for_browser){
	return gulp.src(config.source.dir + template_name)
    	.pipe(template({parser_source: source_file}))
    	.pipe(gulpif(for_browser, maps.write('./')))
    	.pipe(rename(dest_name + '.js'))
    	.pipe(gulp.dest(config.dest.dir));
}


gulp.task('build:node', function(){
	return buildJSWrapper(config.source.node_template, config.dest.node_name);
});

gulp.task('build:browser', function(){
	return buildJSWrapper(config.source.browser_template, config.dest.browser_name, true);
});

gulp.task('uglify:browser', ['build:browser'], function(){
	return gulp.src(config.dest.dir + config.dest.browser_name + '.js')
		.pipe(uglify())
		.pipe(rename(config.dest.browser_name + '.min.js'))
		.pipe(gulp.dest(config.dest.dir));
});



gulp.task('build', ['uglify:browser', 'build:node']);
gulp.task('default', ['build']);