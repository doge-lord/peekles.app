var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var app = {
    name: 'peekles.app',
    source: './src/ui',
    root: './wwwroot',
    bower: './bower_components'
};

gulp.task('default', ['debug']);
gulp.task('debug', ['debug:js']);
gulp.task('package', ['package:js']);

//==============================================================================
// DEBUG
//==============================================================================

gulp.task('debug:js', ['clean:root'], function () {
    return gulp.src([
        app.source + '/**/*.js'
    ])
        .pipe(plugins.eslint({
            fix: true
        }))
        .pipe(plugins.eslint.format())
        .pipe(gulp.dest(app.source))
        .pipe(gulp.dest(app.root + '/js/'));
});

//==============================================================================
// TEST
//==============================================================================

//==============================================================================
// PACKAGE
//==============================================================================

gulp.task('package:js', ['clean:root'], function () {
    return gulp.src([
        app.source + '/**/*.js'
    ])
        .pipe(plugins.eslint({
            fix: true
        }))
        .pipe(plugins.eslint.format())
        .pipe(plugins.eslint.failAfterError())
        .pipe(plugins.concat(app.name + '.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(app.root + '/js/'));
});

//==============================================================================
// UTILITIES
//==============================================================================

gulp.task('clean:root', function () {
    return gulp.src(app.root, { read: false })
        .pipe(plugins.clean());
});