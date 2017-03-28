/*!
 * Helpers.js (https://github.com/dydemin/custom-select/src/js/Helpers.js)
 * custom-select v0.0.1 (https://github.com/dydemin/custom-select)
 * Copyright 2017 dydemin <dydemin@gmail.com>
 * Licensed under MIT (https://github.com/dydemin/custom-select/blob/master/LICENSE)
 */

/**
 * Модуль устанавливает в объект Helpers вспомогательные методы для манипуляции
 * с объектами.
 *
 * @class Helpers Класс со вспомогательными методами.
 * @method void addClass(Element, string) Добавить класс к элементу.
 * @method Element createElement(string) Создать элемент с указанным тэгом.
 * @method object extend(object[]) Объединить объекты.
 * @method Node[] getChildren(Node) Получить дочерние элементы указанного.
 * @method void hasClass(Element, string) Проверить наличие класса у элемента.
 * @method void hide(HTMLElement) Скрыть элемент.
 * @method void insertAfter(Node, Node) Вставить элемент после другого элемента.
 * @method void insertInto(Node, Node) Вставить элемент внутрь другого элемента.
 * @method NodeList queryElements(string) Получить элементы по селектору.
 * @method void removeClass(Element, string) Удалить класс у элемента.
 * @method void show(HTMLElement) Отобразить элемент.
 * @method void toggleClass(Element, string) Переключить класс у элемента.
 * @method void wrap(Node, Node) Обернуть элемент в контейнер.
 */
;(function(exports, document) {
  'use strict';

  /**
   * Объединить объекты в один. Замена метода extend() из jQuery.
   *
   * Члены объектов, переданных позже, заменяют члены объектов с такими же
   * именами, переданных раньше.
   *
   * @param object[] Список объектов для объединения.
   * @return object Объединённый объект.
   */
  exports.extend = function(out) {
    out = out || {};
    for (var i = 1; i < arguments.length; i++) {
      var obj = arguments[i];
      if (!obj)
        continue;
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object')
            out[key] = exports.extend(out[key], obj[key]);
          else
            out[key] = obj[key];
        }
      }
    }
    return out;
  };

  /**
   * Обернуть элемент в другой элемент.
   *
   * @param Node element Элемент, который необходимо обернуть.
   * @param Node wrapper Элемент, в который оборачивается искомый
   * элемент.
   */
  exports.wrap = function(element, wrapper) {
    element.parentNode.insertBefore(wrapper, element);
    wrapper.appendChild(element);
  };

  /**
   * Вставить новый элемент после указанного.
   *
   * @param Node newElement Вставляемый элемент.
   * @param Node element Элемент, после которого выполняется вставка.
   */
  exports.insertAfter = function(newElement, element) {
    element.parentNode.insertBefore(newElement, element.nextSibling);
  };

  /**
   * Вставить элемент после последнего дочернего элемента контейнера.
   *
   * @param Node container Конейнер, в который вставляется элемент.
   * @param Node element Вставляемый элемент.
   */
  exports.insertInto = function(container, element) {
    container.appendChild(element);
  };

  /**
   * Получить массив дочерних элементов указанного.
   *
   * @param ParentNode element Элемент, дочерние элементы которого необходимо
   * получить.
   * @return Node[] Массив дочерних элементов указанного элемента.
   */
  exports.getChildren = function(element) {
    var children = element.children;
    var result = [];
    for (var childIndex in children) {
      var child = children.item(childIndex);
      if (null !== child) {
        result.push(child);
      }
    }

    return result;
  };

  /**
   * Создать новый элемент.
   *
   * @param string tag Название тэга нового элемента.
   * @return Element Созданный элемент.
   */
  exports.createElement = function(tag) {
    return document.createElement(tag);
  };

  /**
   * Найти все элементы по указанному селектору.
   *
   * @param string selector Селектор для поиска элементов.
   * @return NodeList
   */
  exports.queryElements = function(selector) {
    return document.querySelectorAll(selector);
  };

  /**
   * Добавить класс указанному элементу.
   *
   * @param Element element Элемент, которому необходимо добавить класс.
   * @param string className Название класса, добавляемое элементу.
   */
  exports.addClass = function(element, className) {
    // element.classList.add(className);
    element.className += ' ' + className;
  };

  /**
   * Удалить класс у указанного элемента.
   *
   * @param Element element Элемент, у которого необходимо удалить класс.
   * @param string className Название класса, удаляемое у элемента.
   */
  exports.removeClass = function(element, className) {
    element.className = element.className.replace(' ' + className, '');
  };

  /**
   * ПроверитЬ установлен ли у указанного элемента класс с указанным именем.
   *
   * @param Element element Элемент, у которого проверяется наличие класса.
   * @param string className Название проверяемого класса.
   * @return boolean Если класс установлен для указанного элемента, то
   * возвращается true, иначе - false.
   */
  exports.hasClass = function(element, className) {
    return element.className.indexOf(className) !== -1;
  };

  /**
   * Переключить класс с указанным названием у указанного элемента.
   *
   * Если у элемента установлен указанный класс, то он будет удалён; если класс
   * установлен не был - то он добавляется.
   *
   * @param Element element Элемент, у которого переключается класс.
   * @param string className Название переключаемого класса.
   */
  exports.toggleClass = function(element, className) {
    if (exports.hasClass(element, className)) {
      exports.removeClass(element, className);
    } else {
      exports.addClass(element, className);
    }
  };

  /**
   * Скрыть указанный элемент.
   *
   * @param HTMLElement element Скрываемый класс.
   */
  exports.hide = function(element) {
    element.style.display = 'none';
  };

  /**
   * Отобразить указанный элемент. По умолчанию элемент отображается как
   * блочный.
   *
   * @param HTMLElement element Отображаемый элемент.
   * @param string value Значение свойства display для отображаемого элемента.
   */
  exports.show = function(element, value) {
    value = value !== undefined ? value : 'block';

    element.style.display = value;
  };

})(Helpers={}, document);

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
    var item = null;
    for (var i = 0; i < this._items.length; i++) {
      if (this._items[i].title === title && this._items[i].value === value) {
        item = this._items[i];
        break;
      }
    }
    // var item = this._items.find(function(item) {
    //   return item.title === title && item.value === value;
    // });

    if (null !== item && (null === this._selected
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

    for (var i = 0, elements = Helpers.queryElements(activeSelectBoxSelector);
        i < elements.length; i++)
    {
      if (this._selectBox !== elements[i]) {
        Helpers.removeClass(elements[i], DEFAULT_CLASSES[ClassTypes.active]);
        this._removeCustomClasses(elements[i], ClassTypes.active);
      }
    }

    // Найти и скрыть другие списки элементов выбора
    var optionsListSelector = '.' + DEFAULT_CLASSES.base
      + ' .' + DEFAULT_CLASSES.options;

    for (var i = 0, elements = Helpers.queryElements(optionsListSelector);
        i < elements.length; i++)
    {
      if (this._optionsList !== elements[i]) {
        Helpers.hide(elements[i]);
      }
    }

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
        visibleItem.setAttribute('data-target', value);

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

      var clickedItem = ev.target;
      obj.select(
            clickedItem.getAttribute('data-target'),
            clickedItem.innerText
          )
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
        var placeholderItem = null;
        for (var i =0, items = Helpers.getChildren(this._control);
            i < items.length; i++)
        {
          if (!items[i].getAttribute('value')) {
            placeholderItem = items[i];
            break;
          }
        }

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

//# sourceMappingURL=custom-select.js.map
