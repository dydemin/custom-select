/*!
 * custom-select.js (https://github.com/dydemin/custom-select/src/js/custom-select.js)
 * custom-select v0.0.1 (https://github.com/dydemin/custom-select)
 * Copyright 2017 dydemin <dydemin@gmail.com>
 * Licensed under MIT (https://github.com/dydemin/custom-select/blob/master/LICENSE)
 */

/**
 * Модуль инициалзирует планиг для элементов select с классом custom-select
 * и экспортирует в глобальный объект CustomSelect список инициализированных
 * объектов для возможности последующего доступа.
 *
 * @class CustomSelect
 * @property CustomSelect[] initialized Список инициализированных объектов
 */
;(function(exports) {

  var initialized = [];

  for (var i = 0, elements = Helpers.queryElements('select.custom-select');
      i < elements.length; i++)
  {
    initialized.push(CustomSelect.create(elements[i]));
  }

  exports.initialized = initialized;

})(CustomSelect);
