/*!
 * CustomSelect.js (https://github.com/dydemin/custom-select/src/js/CustomSelect.js)
 * custom-select v0.0.1 (https://github.com/dydemin/custom-select)
 * Copyright 2017 dydemin <dydemin@gmail.com>
 * Licensed under MIT (https://github.com/dydemin/custom-select/blob/master/LICENSE)
 */

/**
 * Модуль экспоритует в глобальный объект CustomSelect метод create() для
 * инициализации плагина на определённом элементе выпадающего списка.
 *
 * @class CustomSelect
 * @method CustomSelect create(HTMLSelectElement, Object) Инициализация плагина
 */
;(function(exports, document) {
  'use strict';

  // Тэги, используемые для структуры, формируемой плагином
  var OPTION_TAG       = 'li';
  var OPTIONS_LIST_TAG = 'ul';
  var SELECT_BOX_TAG   = 'div';
  var WRAPPER_TAG      = 'div';

  // Названия атрибутов, используемых в модуле
  var VALUE_ATTRIBUTE = 'value';

  // Типы названий классов, использованный в формируемой структуре
  var ClassTypes = {
    active:  'active',
    base:    'base',
    control: 'control',
    option:  'option',
    options: 'options',
    select:  'select'
  };

  // Названия классов по умолчанию, используемые в формируемой структурe
  var DEFAULT_CLASSES = {
    active:  'cs__select_active',
    base:    'cs',
    control: 'cs__control',
    option:  'cs__option',
    options: 'cs__options',
    select:  'cs__select'
  };

  /**
   * Основной класс плагина, включающий в себя основную логику.
   *
   * @class CustomSelect
   * @method CustomSelect open()  Раскрыть выпадающий список.
   * @method CustomSelect close() Свернуть выпадающий список.
   * @method CustomSelect toggle() Изменить состояние списка.
   * @method CustomSelect select(string, string) Выбрать элемент списка с
   * указанным значением атрибута value и указанным текстом.
   *
   * @params HTMLSelectElement element Элемент контрола выпадающего списка
   * @params Object options Объект настроек плагина.
   */
  function CustomSelect(element, options) {
    options = options !== undefined ? options : {};

    // Инициализация членов класса
    this._control = element;
    this._options = this._setOptions(options);
    this._wrapper = this._createWrapper();
    this._selectBox = this._createSelectBox();
    this._optionsList = this._createOptionsList();
    this._items = this._initializeItems(this._control);
    this._selected = null;
    this._opened = false;

    // Размерешние элементов в DOM и назначение обработчиков событий
    this._initializeElements()
        ._initializeEvents();
  }

  /**
   * --------------------------------------------------------------------------
   * Доступные методы класса
   * --------------------------------------------------------------------------
   */

  /**
   * Раскрыть выпадающий список.
   *
   * @return this
   */
  CustomSelect.prototype.open = function() {
    if (!this._opened) {
      Helpers.addClass(this._selectBox, DEFAULT_CLASSES[ClassTypes.active]);
      this._addCustomClasses(this._selectBox, ClassTypes.active);

      Helpers.show(this._optionsList);

      this._opened = true;
    }

    return this;
  };

  /**
   * Свернуть выпадающий список.
   *
   * @return this
   */
  CustomSelect.prototype.close = function() {
    if (this._opened) {
      Helpers.removeClass(this._selectBox, DEFAULT_CLASSES[ClassTypes.active]);
      this._removeCustomClasses(this._selectBox, ClassTypes.active);

      Helpers.hide(this._optionsList);

      this._opened = false;
    }

    return this;
  };

  /**
   * Переключить состояние выпадающего списка (окрыт/закрыт).
   *
   * @return this
   */
  CustomSelect.prototype.toggle = function() {
    if (this._opened) {
      this.close();
    } else {
      this.open();
    }

    return this;
  };

  /**
   * Установить выбранной элемент выпадающего списка с указанным значением
   * атрибута value и надписью.
   *
   * @return this
   */
  CustomSelect.prototype.select = function(value, title) {
    var item = this._items.find(function(item) {
      return item.title === title && item.value === value;
    });

    if (undefined !== item && (null === this._selected
        || (this._selected && this._selected.value !== value
        && this._selected.title !== title)))
    {
      this._selected = {
        value: value,
        title: title
      };

      item.original.selected = true;

      this._selectBox.innerText = title;
    }

    return this;
  };

  /**
   * --------------------------------------------------------------------------
   * Закрытые методы класса
   * --------------------------------------------------------------------------
   */

   /**
   * Добавить к указанному элементу пользовательский класс, заданный в
   * настройках при инициализации плагина.
   *
   * @param Element element Элемент, которому необходимо задать класс.
   * @param string type Тип класса (базовый, для контрола, для списка и т.п.).
   * @return this
   */
  CustomSelect.prototype._addCustomClasses = function(element, type) {
    type = type !== undefined ? type : ClassTypes.base;

    var customClasses = this._getCustomClassNames(type);
    if (null !== customClasses) {
      customClasses.forEach(function(customClass) {
        Helpers.addClass(element, customClass);
      });
    }

    return this;
  };

   /**
   * Закрыть другие выпадающие списки.
   *
   * @return this
   */
  CustomSelect.prototype._closeOthers = function() {
    // Найти и убрать класс активного для других блоков выпадающего списка
    var activeSelectBoxSelector = '.' + DEFAULT_CLASSES.base
      + ' .' + DEFAULT_CLASSES.select
      + '.' + DEFAULT_CLASSES.active;

    Helpers.queryElements(activeSelectBoxSelector).forEach(function(element) {
      if (this._selectBox !== element) {
        Helpers.removeClass(element, DEFAULT_CLASSES[ClassTypes.active]);
        this._removeCustomClasses(element, ClassTypes.active);
      }
    }, this);

    // Найти и скрыть другие списки элементов выбора
    var optionsListSelector = '.' + DEFAULT_CLASSES.base
      + ' .' + DEFAULT_CLASSES.options;

    Helpers.queryElements(optionsListSelector).forEach(function(element) {
      if (this._optionsList !== element) {
        Helpers.hide(element);
      }
    }, this);

    return this;
  };

  /**
   * Создать пустой списбок элементов выбора.
   *
   * @return Element
   */
  CustomSelect.prototype._createOptionsList = function() {
    var optionsList = Helpers.createElement(OPTIONS_LIST_TAG);
    Helpers.addClass(optionsList, DEFAULT_CLASSES[ClassTypes.options]);
    this._addCustomClasses(optionsList, ClassTypes.options);

    return optionsList;
  };

  /**
   * Создать элемент блока поля выпадающего списка.
   *
   * @return Element
   */
  CustomSelect.prototype._createSelectBox = function() {
    var selectBox = Helpers.createElement(SELECT_BOX_TAG);
    Helpers.addClass(selectBox, DEFAULT_CLASSES[ClassTypes.select]);
    this._addCustomClasses(selectBox, ClassTypes.select);

    return selectBox;
  };

  /**
   * Создать элемент контейнера разметки плагина.
   *
   * @return Element
   */
  CustomSelect.prototype._createWrapper = function() {
    var wrapper = Helpers.createElement(WRAPPER_TAG);
    Helpers.addClass(wrapper, DEFAULT_CLASSES[ClassTypes.base]);
    this._addCustomClasses(wrapper);

    return wrapper;
  };

  /**
   * Получить список пользовательских классов заданного типа.
   *
   * @param string type Тип классов элементов.
   * @return null|string[] Возвращает массив названий классов или null, если
   * ни одно название класса данного типа не задано пользователем.
   */
  CustomSelect.prototype._getCustomClassNames = function(type) {
    type = type !== undefined ? type : ClassTypes.base;

    if (this._options.customClasses.hasOwnProperty(type)) {
      if ('string' === typeof this._options.customClasses[type]) {
        return this._options.customClasses[type].split(' ');
      }

      if (this._options.customClasses[type] instanceof Array) {
        return this._options.customClases[type];
      }
    }
    return null;
  };

  /**
   * Создание необходимой для плагина структуры DOM.
   *
   * @return this
   */
  CustomSelect.prototype._initializeElements = function() {
    // Скрыть и установить необходимые классы для контрола выпадающего списка
    Helpers.hide(this._control);
    Helpers.addClass(this._control, DEFAULT_CLASSES[ClassTypes.control]);
    this._addCustomClasses(this._control, ClassTypes.control);

    // Добавить контейнер для плагина
    Helpers.wrap(this._control, this._wrapper);

    // Добавить блок поля выпадающего списка
    Helpers.insertAfter(this._selectBox, this._control);
    this._setPlaceholder();

    // Добавить список элементов выбора
    Helpers.insertAfter(this._optionsList, this._selectBox);

    // Вставить элементы выбора в список
    this._items.forEach(function(item) {
      Helpers.insertInto(this._optionsList, item.visible);
    }, this);

    return this;
  };

   /**
    * Установка обработчиков событий элементов разметки плагина.
    *
    * @return this
    */
  CustomSelect.prototype._initializeEvents = function() {
    return this._setSelectBoxClickHandler()
        ._setOptionsListClickHandler()
        ._setDocumentClickHandler();
  };

  /**
   * Получить массив элементов выбора из дочерних элементов контрола.
   *
   * @param HTMLSelectElement selectControl Элемент контрола выпадаюещго списка
   * @return {string value, string title, HTMLOptionElement original,
   * Element visible}[]
   */
  CustomSelect.prototype._initializeItems = function(selectControl) {
    var items = [];

    Helpers.getChildren(selectControl).forEach(function(option) {
      var value = option.getAttribute('value');
      var title = option.innerText;

      if (value) {
        var visibleItem = Helpers.createElement(OPTION_TAG);
        Helpers.addClass(visibleItem, DEFAULT_CLASSES[ClassTypes.option]);
        this._addCustomClasses(visibleItem, ClassTypes.option);
        visibleItem.innerText = title;
        visibleItem.dataset.target = value;

        items.push({
          value: value,
          title: title,
          original: option,
          visible: visibleItem
        });
      }
    }, this);

    return items;
  };

  /**
   * Убрать у элемента пользовательский класс, заданный в настройка при
   * инициализации плагина.
   *
   * @param Element element Элемент, у которого убиратеся класс.
   * @param string type Тип класса
   * @return this
   */
  CustomSelect.prototype._removeCustomClasses = function(element, type) {
    type = type !== undefined ? type : ClassTypes.base;

    var customClasses = this._getCustomClassNames(type);
    if (null !== customClasses) {
      customClasses.forEach(function(customClass) {
        Helpers.removeClass(element, customClass);
      });
    }

    return this;
  };

  /**
   * Установить обработчик события щелчка мышки для всего документа (выпадающий
   * список закрывается при щелчке вне его).
   *
   * @return this
   */
  CustomSelect.prototype._setDocumentClickHandler = function() {
    var obj = this;

    document.addEventListener('click', function() {
      obj.close();
    });

    return this;
  };

  /**
   * Сформировать объект настроек плагина на основе настроек по умолчанию и
   * пользовательских настроек.
   *
   * @return Object
   */
  CustomSelect.prototype._setOptions = function(options) {
    return Helpers.extend({}, this._options, options);
  };

  /**
   * Установить обработчик щелчка мышкой по списку элементов выбора (при этом
   * вычисляется по которому из элементов был произведён щелчок и он
   * устанавливается как выбранный для контрола выпадающего списка, меняется
   * надпись в поле выпадающего списка и список закрывается).
   *
   * @return this
   */
  CustomSelect.prototype._setOptionsListClickHandler = function() {
    var obj = this;

    this._optionsList.addEventListener('click', function(ev) {
      ev.stopPropagation();

      var clickedItem = ev.originalTarget;
      obj.select(clickedItem.dataset.target, clickedItem.innerText)
         .close();
    });

    return this;
  };

  /**
   * Задать подписть для блока выпаюащего списка когда ни один из элементов
   * не выбран. Подпись устанавливается либо на основе настройки placeholder
   * плагина, либо для неё выбирается элемент из опций выбора, для которого не
   * задано значение атрибута value (или задано пустое значение).
   *
   * @return this
   */
  CustomSelect.prototype._setPlaceholder = function() {
    if (this._options.placeholder) {
      if ('string' === typeof this._options.placeholder) {
        this._selectBox.innerText = this._options.placeholder;
      } else {
        var placeholderItem = Helpers.getChildren(this._control).find(
          function(child) {
            return !child.getAttribute('value');
          }
        );

        if (null !== placeholderItem) {
          this._selectBox.innerText = placeholderItem.innerText || '';
        }
      }
    }

    return this;
  };

  /**
   * Установить обрабочки щелчка мышкой для поля выпадающего списка (при щелчке
   * по полю выпадающего списка, соответсвующий список меняет состоятие:
   * раскрывается или закрывается, все остальные списки закрываются).
   *
   * @return this
   */
  CustomSelect.prototype._setSelectBoxClickHandler = function() {
    var obj = this;

    this._selectBox.addEventListener('click', function(ev) {
      ev.stopPropagation();

      obj._closeOthers()
         .toggle();
    });

    return this;
  };

  /**
   * --------------------------------------------------------------------------
   * Закрытые поля класса
   * --------------------------------------------------------------------------
   */

  /**
   * Настройки плагина по умолчанию
   */
  CustomSelect.prototype._options = {
    placeholder: true,  // показывать ли плейсхолдер
    customClasses: {}   // пользовательские классы для элементов разметки
  };

  /**
   * --------------------------------------------------------------------------
   * Экспорт в глобальную область видимости
   * --------------------------------------------------------------------------
   */

  /**
   * Инициализация плагина.
   *
   * @param HTMLSelectElement element Элемент, на котором происходит
   * инициализация плагина.
   * @param Object options Объект настроек плагина.
   * @return CustomSelect
   */
  exports.create = function(element, options) {
    options = options !== undefined ? options : {};

    return new CustomSelect(element, options);
  };

})(CustomSelect={}, document);
