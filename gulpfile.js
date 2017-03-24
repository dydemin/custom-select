'use strict';

// Загрузка необходимых пакетов
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var del = require('del');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

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

  gulp.src(stylesSrcDir + '/' + name + '.scss')
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
gulp.task('styles:clear', function() {
  del.sync([destDir + '/**/*.css', destDir + '**/*.css.map', '!' + destDir]);
});

/**
 * Сборка базовых стилей плагина.
 */
gulp.task('styles:core', function() {
  buildStyles(styles.core);
});

/**
 * Сборка стилей плагина, отвечающих за внешний вид.
 */
gulp.task('styles:theme', function() {
  buildStyles(styles.theme);
});

/**
 * Сборка общего файла стилей плагина.
 */
gulp.task('styles:all', function() {
  buildStyles(styles.all);
});

/**
 * Сборка минимизированных базовых стилей плагина.
 */
gulp.task('styles:core:min', function() {
  buildStyles(styles.core, true);
});

/**
 * Сборка минимизированных стилей плагина, отвечающих за внешний вид.
 */
gulp.task('styles:theme:min', function() {
  buildStyles(styles.theme, true);
});

/**
 * Сборка общего минимизированного файла стилей плагина.
 */
gulp.task('styles:all:min', function() {
  buildStyles(styles.all, true);
});

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
 * Задача для gulp по умолчанию - сборка всех необходимых ресурсов.
 */
gulp.task('default', ['styles:build']);
