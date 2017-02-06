var gulp = require('gulp');
var plugin = require('gulp-load-plugins')();

var app = {
    name: 'peekles.app',
    source: './src/ui',
    root: './wwwroot',
    bower: './bower_components'
};

gulp.task('default', ['debug']);
gulp.task('debug', [

    'debug:wiredep'
]);
gulp.task('package', [
    'package:js'
]);

//==============================================================================
// DEBUG
//==============================================================================

gulp.task('debug:js', ['clean'], function () {
    return gulp.src([
        app.source + '/**/*.js'
    ])
        .pipe(plugin.eslint({
            fix: true
        }))
        .pipe(plugin.eslint.format())
        .pipe(gulp.dest(app.source))
        .pipe(gulp.dest(app.root + '/js/'));
});

gulp.task('debug:wiredep', function () {
    return gulp.src(app.source + '/index.html')
        .pipe(gulp.dest('./wwwroot'));
});

//==============================================================================
// TEST
//==============================================================================

//==============================================================================
// PACKAGE
//==============================================================================

gulp.task('package:js', ['clean'], function () {
    return gulp.src([
        app.source + '/**/*.js'
    ])
        .pipe(plugin.eslint({
            fix: true
        }))
        .pipe(plugin.eslint.format())
        .pipe(plugin.eslint.failAfterError())
        .pipe(plugin.concat(app.name + '.js'))
        .pipe(plugin.uglify())
        .pipe(gulp.dest(app.root + '/js/'));
});

//==============================================================================
// UTILITIES
//==============================================================================

gulp.task('clean', function () {
    return gulp.src(app.root, { read: false })
        .pipe(plugin.clean());
});