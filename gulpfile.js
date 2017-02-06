var gulp = require('gulp');
var runSequence = require('run-sequence');
var plugin = require('gulp-load-plugins')();

var app = {
    name: 'peekles.app',
    source: './src/ui',
    root: './wwwroot'
};

gulp.task('default', ['debug']);

gulp.task('debug', function (callback) {
    runSequence('clean',
        'debug:js',
        'debug:wiredep',
        'debug:connect',
        callback);
});

gulp.task('package', [
    'package:js'
]);

//==============================================================================
// DEBUG
//==============================================================================

gulp.task('debug:js', function () {
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
        .pipe(gulp.dest('./wwwroot'))
        .pipe(plugin.wiredep())
        .pipe(gulp.dest('./wwwroot'));
});

gulp.task('debug:connect', function () {
    plugin.connect.server({
        root: [app.root],
        port: 9000,
        livereload: true,
        middleware: function (connect, opt) {
            return [['/bower_components',
                connect["static"]('./bower_components')]]
        }
    });

    return gulp.src(__filename)
        .pipe(plugin.open({
            uri: 'http://localhost:9000',
            app: 'chrome'
        }));
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

