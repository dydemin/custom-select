;(function(exports, document, window) {
  'use strict';

  function wrap(element, wrapper) {
    element.parentNode.insertBefore(wrapper, element);
    wrapper.appendChild(element);
  }

  function insertAfter(newElement, element) {
    element.parentNode.insertBefore(newElement, element.nextSibling);
  }

  function deepExtend(out) {
    out = out || {};
    for (var i = 1; i < arguments.length; i++) {
      var obj = arguments[i];
      if (!obj)
        continue;
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object')
            out[key] = deepExtend(out[key], obj[key]);
          else
            out[key] = obj[key];
        }
      }
    }
    return out;
  }

  function hide(element) {
    element.style.display = 'none';
  }

  function show(element, value='block') {
    element.style.display = value;
  }

  function isVisible(element) {
    return (
      window.getComputedStyle
        ? getComputedStyle(element, null)
        : element.currentStyle
    ).display !== 'none';
  }

  function toggle(element) {
    if (isVisible(element)) {
      hide(element);
    } else {
      show(element);
    }
  }

  function addClass(element, className) {
    element.classList.add(className);
  }

  function removeClass(element, className) {
    element.classList.remove(className);
  }

  function hasClass(element, className) {
    return element.classList.contains(className);
  }

  function toggleClass(element, className) {
    if (hasClass(element, className)) {
      removeClass(element, className);
    } else {
      addClass(element, className);
    }
  }

  function CustomSelect(element, options={}) {
    this.element = element;
    this.setOptions(options)
        .initialize();
  }

  CustomSelect.prototype.setOptions = function(options) {
    this.options = deepExtend({}, this.options, options);

    return this;
  };

  CustomSelect.prototype.initialize = function() {
    this.hideSelectElement()
        .createWrapper()
        .createStyledSelect()
        .setPlaceholder()
        .createOptionsList()
        .setOptionsListItems()
        .setEventHandlers();

    return this;
  };

  CustomSelect.prototype.hideSelectElement = function() {
    this.element.classList.add(this.options.classes.control);

    return this;
  };


  CustomSelect.prototype.createWrapper = function() {
    this.element.classList.remove(this.options.classes.base);

    this.wrapper = document.createElement('div');
    this.wrapper.classList.add(this.options.classes.base);
    wrap(this.element, this.wrapper);

    return this;
  };

  CustomSelect.prototype.createStyledSelect = function() {
    this.styledSelect = document.createElement('div');
    this.styledSelect.classList.add(this.options.classes.select);
    insertAfter(this.styledSelect, this.element);
    return this;
  };

  CustomSelect.prototype.setPlaceholder = function() {
    var selectedOption = Array.prototype.find.call(this.element.children, function(option) {
      return null !== option.getAttribute('selected');
    });

    if (selectedOption !== undefined) {
      this.styledSelect.innerText = selectedOption.innerText || '';
    }

    return this;
  };

  CustomSelect.prototype.createOptionsList = function() {
    this.optionsList = document.createElement('ul');
    this.optionsList.classList.add(this.options.classes.options);
    insertAfter(this.optionsList, this.styledSelect);
    return this;
  };

  CustomSelect.prototype.setOptionsListItems = function() {
    Array.prototype.forEach.call(this.element.children, function(element) {
      if (null === element.getAttribute('disabled')) {
        var option = document.createElement('li');
        option.classList.add(this.options.classes.option);
        option.dataset.target = element.getAttribute('value');
        option.innerText = element.innerText;

        this.optionsList.appendChild(option);
      }
    }, this);

    return this;
  };

  CustomSelect.prototype.setEventHandlers = function() {
    this.setStyledSelectClickHandler()
        .setOptionsListClickHandler()
        .setDocumentClickHandler();
    return this;
  };

  CustomSelect.prototype.setStyledSelectClickHandler = function() {
    var obj = this;

    this.styledSelect.addEventListener('click', function(event) {
      event.stopPropagation();

      Array.prototype.forEach.call(document.querySelectorAll('.' + obj.options.classes.base + ' .' + obj.options.classes.select + '.' + obj.options.classes.active), function(element) {
        if (obj.styledSelect !== element) {
          element.classList.remove(obj.options.classes.active);
        }
      });

      Array.prototype.forEach.call(document.querySelectorAll('.' + obj.options.classes.base + ' .' + obj.options.classes.options), function(element) {
        if (obj.optionsList !== element) {
          hide(element);
        }
      });

      toggleClass(this, obj.options.classes.active);

      toggle(obj.optionsList);
    });

    return this;
  };

  CustomSelect.prototype.setOptionsListClickHandler = function() {
    var obj = this;

    this.optionsList.addEventListener('click', function(event) {
      event.stopPropagation();

      obj.styledSelect.innerText = event.originalTarget.innerText;
      removeClass(obj.styledSelect, obj.options.classes.active);

      obj.element.querySelector('option[value="' + event.originalTarget.dataset.target + '"]').selected = true;

      hide(obj.optionsList);
    });

    return this;
  };

  CustomSelect.prototype.setDocumentClickHandler = function() {
    var obj = this;

    document.addEventListener('click', function() {
      removeClass(obj.styledSelect, obj.options.classes.active);

      hide(obj.optionsList);
    });

    return this;
  };

  CustomSelect.prototype.options = {
    classes: {
      active:  'custom-select__select_active',
      base:    'custom-select',
      control: 'custom-select__control',
      option:  'custom-select__option',
      options: 'custom-select__options',
      select:  'custom-select__select'
    }
  };

  exports.create = function(element, options={}) {
    return new CustomSelect(element);
  };

  Array.prototype.forEach.call(document.querySelectorAll('select.custom-select'), function(element) {
    exports.create(element);
  });

})(this.CustomSelect={}, document, window);
