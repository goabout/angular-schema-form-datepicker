/* global require */

var gulp = require('gulp');
var gulpsync          = require('gulp-sync')(gulp)
var gulpLoadPlugins   = require('gulp-load-plugins')
var plugins           = gulpLoadPlugins()

var streamqueue = require('streamqueue');

var opt = {
  TEMP: './tmp/',
  DIST: './dist/',
  APP: './demo/',
  SRC: './src/',

  //HTML
  DEMO_HTML_SOURCE: 'demo/index.html',
  HTML_SOURCE: 'src/*.html',
  TEMPLATES: 'tmp/templates.js',
  TEMPLATES_FILENAME: 'templates.js',

  //JS
  DEMO_SCRIPTS: 'demo/demo.js',
  SRC_SCRIPTS: 'src/*.js',
  SRC_FILENAME: 'source.js',

  //JS VENDOR
  VENDOR_SCRIPTS: [
    './bower_components/jquery/dist/jquery.js',
    './bower_components/angular/angular.js',
    './bower_components/angular-sanitize/angular-sanitize.js',
    './bower_components/moment/moment.js',
    './bower_components/moment/locale/nl.js',
    './bower_components/moment-timezone/moment-timezone.js',

    // Pick a date requirements
    './bower_components/pickadate/lib/compressed/picker.js',
    './bower_components/pickadate/lib/compressed/picker.time.js',
    './bower_components/pickadate/lib/compressed/picker.date.js',
    './bower_components/pickadate/lib/compressed/translations/nl_NL.js',

    //Schema form requirements
    './bower_components/tv4/tv4.js',
    './bower_components/objectpath/lib/ObjectPath.js',
    './bower_components/angular-schema-form/dist/schema-form.js',
    './bower_components/angular-schema-form/dist/bootstrap-decorator.js',
  ],
  VENDOR_SCRIPTS_FILENAME: 'vendor.js',

  //CSS
  VENDOR_STYLES: [
  './bower_components/bootstrap/dist/css/bootstrap.css',
  './bower_components/pickadate/lib/compressed/themes/classic.css',
  './bower_components/pickadate/lib/compressed/themes/classic.date.css',
  './bower_components/pickadate/lib/compressed/themes/classic.time.css',
  ],
  DEMO_STYLES: 'demo/demo.css',
  VENDOR_STYLES_FILENAME: 'vendor.css',

  //Misc
  CONNECT_PORT: 7771,
  LIVERELOAD_PORT: 37771
}

/*
  Development tasks
  
  Use 'gulp server' or just 'gulp' to run development server
*/
gulp.task('server', [
  'dev:js', 
  'dev:concat:vendorcss', 
  'dev:concat:vendorjs', 
  'dev:connect', 
  'dev:watch'
])

//Internal tasks

gulp.task('dev:watch', function() {
  //SRC
  gulp.watch(opt.HTML_SOURCE, ['dev:js']) // Because it is attached to js
  gulp.watch(opt.SRC_SCRIPTS, ['dev:js'])

  //DEMO
  gulp.watch(opt.DEMO_HTML_SOURCE, ['dev:reload'])
  gulp.watch(opt.DEMO_STYLES, ['dev:reload'])
  gulp.watch(opt.DEMO_SCRIPTS, ['dev:reload'])
})

gulp.task('dev:connect', function() {
  plugins.connect.server({
    root: [opt.TEMP, 'demo'],
    port: opt.CONNECT_PORT,
    fallback: opt.DEMO_HTML_SOURCE,
    livereload: {
      enable: true,
      port: opt.LIVERELOAD_PORT
    }
  })
})

gulp.task('dev:reload', function() {
  gulp.src(opt.DEMO_HTML_SOURCE)
    .pipe(plugins.connect.reload())
})

gulp.task('dev:clean', function(done) {
  del([opt.TEMP], {force: true})
  .then(function() {
    done()
  })
})

gulp.task('dev:js', ['dev:templates'], function() {
  return gulp.src([opt.SRC_SCRIPTS, opt.TEMPLATES])    
    .pipe(plugins.concat(opt.SRC_FILENAME))
    .pipe(gulp.dest(opt.TEMP))
    .pipe(plugins.connect.reload())
})

gulp.task('dev:templates', function() {
  return gulp.src(opt.HTML_SOURCE)
    .pipe(plugins.ngTemplates({
      module: 'schemaForm',
      standalone: false,
      filename: opt.TEMPLATES_FILENAME,
      path: function (path, base) {
        var root = 'directives/decorators/bootstrap/datepicker/'
        var finalPath = path.replace(base, root)
        return finalPath
      }
    }))
    .pipe(gulp.dest(opt.TEMP))
})

gulp.task('dev:concat:vendorjs', function() {
  return gulp.src(opt.VENDOR_SCRIPTS)
    .pipe(plugins.concat(opt.VENDOR_SCRIPTS_FILENAME))
    .pipe(gulp.dest(opt.TEMP))
})

gulp.task('dev:concat:vendorcss', function() {
  return gulp.src(opt.VENDOR_STYLES)
    .pipe(plugins.concat(opt.VENDOR_STYLES_FILENAME))
    .pipe(gulp.dest(opt.TEMP))
})

gulp.task('default', ['server'])


// Old deprecated scripts
gulp.task('minify', function() {
  var stream = streamqueue({objectMode: true});
  stream.queue(
              gulp.src('./src/*.html')
                  .pipe(minifyHtml({
                    empty: true,
                    spare: true,
                    quotes: true
                  }))
                  .pipe(templateCache({
                    module: 'schemaForm',
                    root: 'directives/decorators/bootstrap/datepicker/'
                  }))
    );
  stream.queue(gulp.src('./src/*.js'));

  stream.done()
        .pipe(concat('bootstrap-datepicker.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('.'));

});

gulp.task('non-minified-dist', function() {
  var stream = streamqueue({objectMode: true});
  stream.queue(
              gulp.src('./src/*.html')
                  .pipe(templateCache({
                    module: 'schemaForm',
                    root: 'directives/decorators/bootstrap/datepicker/'
                  }))
    );
  stream.queue(gulp.src('./src/*.js'));

  stream.done()
        .pipe(concat('bootstrap-datepicker.js'))
        .pipe(gulp.dest('.'));

});

gulp.task('jscs', function() {
  gulp.src('./src/**/*.js')
      .pipe(plumber())
      .pipe(jscs());
});

gulp.task('build', [
  'minify',
  'non-minified-dist',
  // 'jscs'
]);

