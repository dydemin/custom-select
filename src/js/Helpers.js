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
