const del = require('del');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const replace = require('gulp-replace');
const autoprefixer = require('gulp-autoprefixer');
const gulpSass = require('gulp-sass');
const dartSass = require('sass');
const sass = gulpSass(dartSass);
const rtlcss = require('gulp-rtlcss');
const cleanCSS = require('gulp-clean-css');
const eslint = require('gulp-eslint');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');

const { reload } = browserSync;
const Promise = require('promise');


/*-----------------------------------------------
|   Paths
-----------------------------------------------*/
const CSS = 'pages/assets/css';
const JS = 'pages/assets/js';
const lib = 'pages/assets/lib';
const Paths = {
  HERE: './',
  PAGES: {
    FOLDER: 'pages',
    ALL: 'pages/**/*.*',
    HTML: 'pages/**/*.html',
  },
  JS: {
    ALL: 'js/**/*.js',
    BOOTSTRAP: [
      './js/bootstrap/util.js',
      './js/bootstrap/alert.js',
      './js/bootstrap/button.js',
      './js/bootstrap/carousel.js',
      './js/bootstrap/collapse.js',
      './js/bootstrap/dropdown.js',
      './js/bootstrap/modal.js',
      './js/bootstrap/tooltip.js',
      './js/bootstrap/popover.js',
      './js/bootstrap/scrollspy.js',
      './js/bootstrap/tab.js',
      './js/bootstrap/toast.js',
    ],
    THEME: [
      'js/theme/Utils.js', // Required
      'js/theme/bootstrap-navbar.js', // Required
      'js/theme/detector.js', // Required
      'js/theme/stickyfill.js', // Required
      'js/theme/stickykit.js', // Required
      'js/theme/**/!(Utils | bootstrap-navbar | detector | stickyfill | stickykit)*.js',
    ],
    PLUGINS: ['js/plugins/imagesloaded.pkgd.js', 'js/plugins/TweenMax.js', 'js/plugins/ScrollToPlugin.js', 'js/plugins/CustomEase.js', 'js/plugins/DrawSVGPlugin.js', 'js/plugins/all.min.js'],
  },
  SCSS: {
    ALL: 'scss/**/*.scss',
    THEME: 'scss/theme.scss',
  },
  ASSETS: {
    ALL: 'pages/assets/**/*.*',
    FONTS: 'pages/assets/fonts/**/*.*',
    VIDEO: 'pages/assets/video/**/*.*',
    IMG: 'pages/assets/img/**/*.*',
    JS: 'pages/assets/js',
  },
  CSS: 'pages/assets/css',
  DEPENDENCIES: {
    jquery: {
      FROM: 'node_modules/jquery/dist/jquery.min.js', // Required
      TO: JS,
    },
    popper: {
      FROM: 'node_modules/popper.js/dist/umd/popper.min.js', // Required
      TO: JS,
    },
    prismjs: {
      FROM: ['node_modules/prismjs/prism.js', 'node_modules/prismjs/themes/prism-okaidia.css'],
      TO: lib,
    },
    'loaders.css': {
      FROM: ['node_modules/loaders.css/loaders.min.css', 'node_modules/loaders.css/loaders.css.js'],
      TO: lib,
    },
    stickyfilljs: {
      FROM: 'node_modules/stickyfilljs/dist/stickyfill.min.js', // Required
      TO: lib,
    },
    'jquery-countdown': {
      FROM: 'node_modules/jquery-countdown/dist/jquery.countdown.min.js',
      TO: lib,
    },
    'sticky-kit': {
      FROM: 'node_modules/sticky-kit/dist/**/*.*', // Required
      TO: lib,
    },
    '@fortawesome': {
      FROM: 'node_modules/@fortawesome/fontawesome-free/js/all.min.js', // Required
      TO: lib,
    },
    'bootstrap-js': {
      FROM: 'node_modules/bootstrap/js/dist/!(index)*.js', // Required
      TO: 'js/bootstrap',
    },
    'bootstrap-scss': {
      FROM: 'node_modules/bootstrap/scss/**/*.scss', // Required
      TO: 'scss/bootstrap',
    },
    fancybox: {
      FROM: 'node_modules/@fancyapps/fancybox/dist/**/*.*',
      TO: lib,
    },
    plyr: {
      FROM: 'node_modules/plyr/dist/**/*.*',
      TO: lib,
    },
    'jquery.mb.ytplayer': {
      FROM: ['node_modules/jquery.mb.ytplayer/dist/css/jquery.mb.YTPlayer.min.css', 'node_modules/jquery.mb.ytplayer/dist/jquery.mb.YTPlayer.min.js'],
      TO: lib,
    },
    'jquery-countdown': {
      FROM: 'node_modules/jquery-countdown/dist/jquery.countdown.min.js',
      TO: lib,
    },
    imageloaded: {
      FROM: 'node_modules/imagesloaded/*.*',
      TO: lib,
    },
    flexslider: {
      FROM: 'node_modules/flexslider/*.*',
      TO: lib,
    },
    'semantic-ui-accordion': {
      FROM: ['node_modules/semantic-ui-accordion/accordion.min.css', 'node_modules/semantic-ui-accordion/accordion.min.js'],
      TO: lib,
    },
    'semantic-ui-transition': {
      FROM: ['node_modules/semantic-ui-transition/transition.min.css', 'node_modules/semantic-ui-transition/transition.min.js'],
      TO: lib,
    },
  },
  GENERATED: [
    'js/bootstrap',
    'scss/bootstrap',
    'pages/assets/css',
    'pages/assets/js',
  ],
};


/*-----------------------------------------------
|   Cleaning
-----------------------------------------------*/
gulp.task('clean', () => del(Paths.GENERATED, { force: true }));


/*-----------------------------------------------
|   SCSS
-----------------------------------------------*/
gulp.task('scss', () => gulp.src(Paths.SCSS.THEME)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 5 versions'],
    cascade: false,
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(plumber.stop())
  .pipe(gulp.dest(Paths.CSS))
  .pipe(browserSync.stream()));

gulp.task('scss:min', () => gulp.src(Paths.SCSS.THEME)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 5 versions'],
    cascade: false,
  }))
  .pipe(cleanCSS({ compatibility: 'ie9' }))
  .pipe(rename({ suffix: '.min' }))
  .pipe(sourcemaps.write('.'))
  .pipe(plumber.stop())
  .pipe(gulp.dest(Paths.CSS))
  .pipe(browserSync.stream()));

gulp.task('scss:rtl', () => gulp.src(Paths.SCSS.THEME)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 5 versions'],
    cascade: false,
  }))
  .pipe(rtlcss()) // Convert to RTL.
  .pipe(rename({ suffix: '-rtl' })) // Append "-rtl" to the filename.
  .pipe(sourcemaps.write('.'))
  .pipe(plumber.stop())
  .pipe(gulp.dest(Paths.CSS))
  .pipe(browserSync.stream()));

gulp.task('scss:rtl:min', () => gulp.src(Paths.SCSS.THEME)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 5 versions'],
    cascade: false,
  }))
  .pipe(rtlcss()) // Convert to RTL.
  .pipe(cleanCSS({ compatibility: 'ie9' }))
  .pipe(rename({ suffix: '-rtl.min' }))
  .pipe(sourcemaps.write('.'))
  .pipe(plumber.stop())
  .pipe(gulp.dest(Paths.CSS))
  .pipe(browserSync.stream()));


/*-----------------------------------------------
|   JavaScript
-----------------------------------------------*/
gulp.task('js:bootstrap', () => gulp.src(Paths.JS.BOOTSTRAP)
  .pipe(concat('bootstrap.js'))
  .pipe(replace(/^(export|import).*/gm, ''))
  .pipe(babel({
    compact: false,
    presets: [
      [
        'env', {
          modules: false,
          loose: true,
        },
      ],
    ],
    plugins: [
      process.env.PLUGINS && 'transform-es2015-modules-strip',
      '@babel/plugin-proposal-object-rest-spread',
    ].filter(Boolean),
  }))
  .pipe(gulp.dest(Paths.ASSETS.JS))
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(gulp.dest(Paths.ASSETS.JS))
  .pipe(reload({ stream: true })));

gulp.task('js:theme', () => gulp.src(Paths.JS.THEME)
  // .pipe(eslint({ fix: true }))
  // .pipe(eslint.format())
  // .pipe(eslint.failAfterError())
  .pipe(concat('theme.js'))
  .pipe(replace(/^(export|import).*/gm, ''))
  .pipe(babel({
    compact: false,
    presets: [
      [
        'env',
        {
          modules: false,
          loose: true,
        },
      ],
    ],
    plugins: [
      process.env.PLUGINS && 'transform-es2015-modules-strip',
      '@babel/plugin-proposal-object-rest-spread',
      'transform-strict-mode',
    ].filter(Boolean),
  }))
  .pipe(gulp.dest(Paths.ASSETS.JS))
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(gulp.dest(Paths.ASSETS.JS))
  .pipe(reload({ stream: true })));

gulp.task('js:plugins', () => gulp.src(Paths.JS.PLUGINS)
  .pipe(concat('plugins.js'))
  .pipe(replace(/^(export|import).*/gm, ''))
  .pipe(babel({
    compact: false,
    presets: [
      [
        'env', {
          modules: false,
          loose: true,
        },
      ],
    ],
    plugins: [
      process.env.PLUGINS && 'transform-es2015-modules-strip',
      '@babel/plugin-proposal-object-rest-spread',
    ].filter(Boolean),
  }))
  .pipe(gulp.dest(Paths.ASSETS.JS))
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(gulp.dest(Paths.ASSETS.JS))
  .pipe(reload({ stream: true })));

gulp.task('js', gulp.parallel('js:bootstrap', 'js:plugins', 'js:theme'));


/*-----------------------------------------------
|   Dependencies
-----------------------------------------------*/
gulp.task('copy:dependency', () => {
  const promises = Object.keys(Paths.DEPENDENCIES).map(item => new Promise((resolve, reject) => {
    gulp.src(Paths.DEPENDENCIES[item].FROM)
      .pipe(gulp.dest((Paths.DEPENDENCIES[item].TO === lib) ? `${Paths.DEPENDENCIES[item].TO}/${item}` : Paths.DEPENDENCIES[item].TO))
      .on('end', (err) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve();
        }
      });
  }));
  return Promise.all(promises);
});


/*-----------------------------------------------
|   Watching
-----------------------------------------------*/
gulp.task('watch', () => {
  gulp.watch(Paths.SCSS.ALL, gulp.series('scss'));

  gulp.watch(Paths.JS.THEME, gulp.series('js', (done) => {
    reload();
    done();
  }));

  gulp.watch(Paths.JS.PLUGINS, gulp.series('js', (done) => {
    reload();
    done();
  }));

  gulp.watch([Paths.PAGES.HTML, Paths.ASSETS.FONTS, Paths.ASSETS.VIDEO, Paths.ASSETS.IMG], (done) => {
    reload();
    done();
  });
});


/*-----------------------------------------------
|   Serve
-----------------------------------------------*/
gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: Paths.PAGES.FOLDER,
    },
    // proxy: '127.0.0.1:8010',
    port: 3000,
    open: true,
    notify: false,
  });
});


/*-----------------------------------------------
|   Starting everything
-----------------------------------------------*/
gulp.task('default', gulp.series('copy:dependency', 'scss', 'js', gulp.parallel('watch', 'serve')));
