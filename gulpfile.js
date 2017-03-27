'use strict';

// Загрузка необходимых пакетов
var autoprefixer = require('autoprefixer');
var concat = require('gulp-concat');
var cssnano = require('cssnano');
var del = require('del');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

// Каталоги для работы
var destDir = 'dist'; // Целевой (для размещения собранных файлов)
var srcDir = 'src'; // Исходники
var stylesSrcDir = srcDir + '/' + 'scss'; // Исходники стилей

// Названия различных вариантов стилей
var styles = {
  all: 'custom-select',
  core: 'custom-select.core',
  theme: 'custom-select.theme'
};

// Настройки автопрефиксера
var autoprefixerConfig = {
  browsers: 'last 2 versions'
};

// Настройки оптимизатора стилей
var cssnanoConfig = {
  options: {
    save: true
  }
};

// Процессоры postcss
var postcssProcessors = [
  autoprefixer(autoprefixerConfig)
];

// Процессоры postcss для минимизированных стилей
var postcssMinProcessors = postcssProcessors.concat(cssnano(cssnanoConfig));

/**
 * Сборка стилей.
 *
 * @param string name Название варианта стилей)
 * @param bool minify Минимизировать ли стили
 * @throws При передаче неверного значения аргумента name.
 */
function buildStyles(name, minify=false) {
  if (styles.hasOwnProperty(name)) {
    // Проверка правильного имени варианта стилей
    throw 'InvalidArgumentException: name argument should have value from '
      + styles.toString();
  }

  // Определение набора процессоров postcss
  var postcssProcs = minify ? postcssMinProcessors : postcssProcessors;

  return gulp.src(stylesSrcDir + '/' + name + '.scss')
      .pipe(gulpif(!minify, sourcemaps.init()))
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss(postcssProcs))
      .pipe(gulpif(!minify, sourcemaps.write('./')))
      .pipe(gulpif(minify, rename(name + '.min.css')))
      .pipe(gulp.dest(destDir));
}

/**
 * Очистка стилей (удаление собранных файлов стилей).
 */
gulp.task('styles:clear', () => {
  del.sync([destDir + '/**/*.css', destDir + '/**/*.css.map', '!' + destDir]);
});

/**
 * Очистка скриптов.
 */
gulp.task('scripts:clear', () => {
  del.sync([destDir + '/**/*.js', destDir + '/**/*.js.map', '!' + destDir]);
});

/**
 * Очитска каталога с собранными файлами проекта.
 */
gulp.task('clear', [
  'styles:clear',
  'scripts:clear'
]);

/**
 * Сборка базовых стилей плагина.
 */
gulp.task('styles:core', () => buildStyles(styles.core));

/**
 * Сборка стилей плагина, отвечающих за внешний вид.
 */
gulp.task('styles:theme', () => buildStyles(styles.theme));

/**
 * Сборка общего файла стилей плагина.
 */
gulp.task('styles:all', () => buildStyles(styles.all));

/**
 * Сборка минимизированных базовых стилей плагина.
 */
gulp.task('styles:core:min', () => buildStyles(styles.core, true));

/**
 * Сборка минимизированных стилей плагина, отвечающих за внешний вид.
 */
gulp.task('styles:theme:min', () => buildStyles(styles.theme, true));

/**
 * Сборка общего минимизированного файла стилей плагина.
 */
gulp.task('styles:all:min', () => buildStyles(styles.all, true));

/**
 * Сборка всех доступных файлов стилей плагина.
 */
gulp.task('styles:build', [
  'styles:clear',
  'styles:core',
  'styles:theme',
  'styles:all',
  'styles:core:min',
  'styles:theme:min',
  'styles:all:min'
]);

/**
 * Сборка скриптов.
 *
 * @param boolean minimize Указывает минимизировать ли скрипты.
 */
function buildScripts(minimize=false) {
  var scripts = [
    'src/js/Helpers.js',
    'src/js/CustomSelect.js',
    'src/js/custom-select.js'
  ];

  return gulp.src(scripts)
             .pipe(gulpif(!minimize, sourcemaps.init()))
             .pipe(concat('custom-select.js'))
             .pipe(gulpif(minimize, uglify()))
             .pipe(gulpif(!minimize, sourcemaps.write('./')))
             .pipe(gulpif(minimize, rename('custom-select.min.js')))
             .pipe(gulp.dest('dist'))
}

/**
 * Сборка неминимизированных скриптов.
 */
gulp.task('scripts:build:max', () => buildScripts());

/**
 * Сборка минимизированных скриптов.
 */
gulp.task('scripts:build:min', () => buildScripts(true));

/**
 * Сборка скриптов.
 */
gulp.task('scripts:build', [
  'scripts:clear',
  'scripts:build:max',
  'scripts:build:min'
]);

/**
 * Задача для gulp по умолчанию - сборка всех необходимых ресурсов.
 */
gulp.task('default', [
  'styles:build',
  'scripts:build'
]);
