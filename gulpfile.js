
const gulp = require('gulp'),
      sass = require('gulp-sass'),
      jshint = require('gulp-jshint'),
      sourcemaps = require('gulp-sourcemaps'),
      templateCache = require('gulp-angular-templatecache'),
      concat = require('gulp-concat'),
      clean = require('gulp-clean'),
      uglify = require('gulp-uglify'),
      babel = require('gulp-babel');

const paths = {
  sass: ['src/scss/**/*.scss'],
  js: ['src/js/**/*.js'],
  templatecache: ['src/views/**/*.html'],
  jslibs: [
    'src/libs/winstore-jscompat.js',
    'bower_components/ionic/release/js/ionic.bundle.min.js',
    'bower_components/angular-i18n/angular-locale_pt-br.js',
    'bower_components/lunr.js/lunr.min.js',
    'bower_components/underscore/underscore-min.js',
    'bower_components/moment/min/moment.min.js',
    'bower_components/ngCordova/dist/ng-cordova.min.js',
    'bower_components/ngstorage/ngStorage.min.js',
    'bower_components/onezone-datepicker/dist/onezone-datepicker.min.js',
    'bower_components/ionic-filter-bar/dist/ionic.filter.bar.min.js',
    'bower_components/angular-ui-mask/dist/mask.min.js'
  ],
  fonts: ['bower_components/ionic/release/fonts/*.woff'],
  tempFiles: [
    'www/fonts',
    'www/css',
    'www/js',
    'www/maps'
  ]
};

gulp.task('clean-fonts', () =>
  gulp.src('www/fonts').pipe(clean())
);

gulp.task('fonts', ['clean-fonts'], () =>
  gulp.src(paths.fonts).pipe(gulp.dest('www/fonts'))
);

gulp.task('sass', ['fonts'], () =>
  gulp.src('./src/scss/ionic.app.scss')
    .pipe(sourcemaps.init())
      .pipe(sass({
        errLogToConsole: true,
        outputStyle: 'compressed'
      }))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('./www/css/'))
);

gulp.task('templatecache', () =>
  gulp.src(paths.templatecache)
    .pipe(templateCache({standalone:true, filename:'views.js', module:'app.views', root:'views/'}))
    .pipe(gulp.dest('./src/js/'))
);

gulp.task('lint', () =>
  gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
);

gulp.task('js', ['lint', 'templatecache'], () =>
  gulp.src(paths.js)
    .pipe(sourcemaps.init())
      .pipe(concat('app.min.js'))
      .pipe(babel({
        presets: ['es2015']
      }))
      //.pipe(uglify())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('./www/js'))
);

gulp.task('jslibs', () =>
  gulp.src(paths.jslibs)
    .pipe(sourcemaps.init())
      .pipe(concat('libs.min.js'))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('./www/js'))
);

gulp.task('watch', ['default'], () => {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.templatecache, ['templatecache']);
});

gulp.task('clean', () =>
  gulp.src('./www/maps', {read: false})
    .pipe(clean())
);

gulp.task('default', ['sass', 'js', 'jslibs']);

gulp.task('build', ['default'], () => gulp.start('clean'));
