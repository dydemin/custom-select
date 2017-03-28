# Custom Select

[![GitHub tag](https://img.shields.io/badge/tag-v0.0.1-brightgreen.svg?style=flat)](https://github.com/dydemin/custom-select/tree/v0.0.1)
[![license](https://img.shields.io/badge/license-MIT_License-blue.svg?style=flat)](https://github.com/dydemin/custom-select/blob/master/LICENSE)
[![demo](https://img.shields.io/badge/Демо-тут-lightgrey.svg?style=flat)](https://dydemin.github.io/custom-select/)

Плагин для кастомизации элемента управления выпадающего списка.

Преимущества:

- не требует подключения сторонних библиотек (типа jQuery);
- не нарушает работу форм;
- легко настраивается внешний вид через CSS.

## Установка

Необходимые файлы можно получить несколькими путями:

- скачать и распаковать [архив](https://github.com/dydemin/custom-select/archive/master.zip);
- установить через npm:
```bash
npm install https://github.com/dydemin/custom-select.git#master
```
- установить через bower:
```bash
bower install https://github.com/dydemin/custom-select.git#master
```

Все необходимые для работы файл расположены в каталоге `dist`.

## Использование

Подключить стили в шапке страницы:

```html
<link rel="stylesheet" href="custom-select/dist/custom-select.min.css">
```

Подключить скрипт плагина:

```html
<script src="custom-select/dist/custom-select.min.js"></script>
````

Добавьте в документ элемент выпадающего списка с классом `custom-select`:

```html
<select id="options" name="options" class="custom-select">
    <option value="" selected disabled>-- Placeholder --</option>
    <option value="option1">Option 1</option>
    …
</select>
```

Плагин автоматически инициализируется для всех полей выпадающего списка с 
классом `custom-select`.

При этом значение плесхолдера по умолчанию будет взято из первого элемента 
списка выбора, для которого указано пустое значение атрибута `value`, а в 
список выбора будут включены все опции списка выбора с непустым значением 
атрибута `value`.

При этом будет сгенерирована следующая разметка:

```html
<div class="cs"><!-- Контейнер, содержащий всю сгенерированную разметку -->
 &bbsp;  <!-- Искомый элемент выпадающего списка -->
    <select id="options" name="options" class="custom-select cs__control" style="display: none;">
        <option value="" selected disabled>-- Placeholder --</option>
        <option value="option1">Option 1</option>
        …
    </select><!-- /.cs__control -->
    <!-- Блок поля списка выбора, показывает выбранный элемент списка или плейсхолдер,а также отвечает за отображение &lsquo;стрелки&rsquo; -->
    <div class="cs__select">
        -- Placeholder --
    </div><!-- /.cs__select -->
    <ul class="cs__options"><!-- Список опций выбора -->
        <li class="cs__option" data-target="option1">Option 1</li><!-- Каждая опция с непустым value, искомое value помещается в data-target -->
        …
    </ul><!-- /.cs__options -->
</div><!-- /.cs -->
```

В каталоке `dist` содержаться как минимизированные, так и не сжатые версии 
файлов стилей и скриптов.

### Варианты стилей

В каталоге `dist` содержаться следующие варинаты файлов стилей (в т.ч. 
минимизированные версии):

- `custom-select.core.css` - включает стили, необходимые для функционирования 
плагина, размещения генерируемой плагином разметки. Может использоваться 
отдельно, если вы хотите самостоятельно стилизовать разметку выпадающего списка;
- `custom-select.theme.css` - включает стили для стилизации выпадающего списка 
(размеры, цвета, шрифты и т.п.). Может использоваться в качестве примера для 
пользовательских стилей;
- `custom-select.css` - включает все необходимые стили, не требует подключения 
каких-либо других файлов стилей.

### Ручная инициализация

При необходимости можно инициализировать плагин вручную:

```javascript
var customSelect = CustomSelect.create(document.getElementById('options'));
```

В этом случае вторым агрументом метода `CustomSelect.create()` можно передать 
объект настроек плагина (см. соответсвующий раздел).

## API

При подключении файла скриптов плагина на страницу создаётся глобальный объект 
`CustomSelect`.

### CustomSelect.create()

```javascript
CustomSelect CustomSelect.create(HTMLSelectElement element, Object options={})
```

С помощью этого метода можно вручную инициализировать плагин вручную, указав 
элемент выпадающего списка и опции плагина. Аргументы при вызове метода:

Название | Тип | Значение по умолчанию | Описание
--- | --- | --- | ---
element | HTMLSelectElement | N/A | Элемент выпадающего списка
options | Object | {} | Объект настроек плагина

### CustomSelect.initialized

```javascript
CustomSelect[] CustomSelect.initialized
```

Содержит массив автоматически инициализированных полей выпадаюего списка.

### Методы объекта CustomSelect

После инициализации в объекте типа `CustomSelect` доступны следующие методы:

Название | Возвращаемое значение | Описание | Описание аргументов
--- | --- | --- | ---
`open()` | this | Раскрыть выпадающий список | N/A
`close()` | this | Свернуть выпадающий список | N/A
`toggle()` | this | Переключить состояние выпадающего списк (раскрыть или свернуть) | N/A
`select(string value, string title)` | this | Выбрать элемент выпадающего списка с указанным значением атрибута value и подписью | `value` - значение атрибута value для элемента, который небходимо выбрать; `title` - текст элемента выбора, который необходимо выбрать.

### Настройки

При ручной инициализации плагина можно передать объект настроек. Этот объект 
может содержать следующие поля:

Название | Тип | Значение по умолчанию | Описание
--- | --- | --- | ---
`placeholder` | boolean|string | true | Указывает размещать ли плейсхолдер в структуре выпадающего списка;
`customClasses` | Object | {} | Объект, содержащий список пользовательских классов, добавляемых к элементам размерки, генерируемой плагином при инициализации.

#### Настройки плейсхолдера

По умолчанию опция `placeholder` принимает значение `true`. В этом случает 
значение плейсхолдера выбирается из списка элементов `option` выпадающего меню. 
Выбирается первый элемент `option` для которой указано пустое значение 
атрибута `value`.

Если указать значение опции `placeholder` равной `false`, то плейсхолдер 
отображаться не будет.

Если указать строковое значение, то оно и будет использоваться в качестве
плейсхолдера.

#### Найстройки пользовательских классов

Пользовательские классы могут использоваться для стилизации элементов разметки,
герерируемой плагином при инициализации. Ну или как вам будет вообще угодно.

При этом пользовательские классы будут добавлены к классам по умолчанию, 
задаваемых внутри плагина.

Пользовательские классы указываются в объекте `customClasses` объекта настроек 
плагина при инициализации. При необходимости указать несколько классов для 
одного элемента, можно передать их в виде строки, разделёнными пробелами, или в 
виде массива строк.

Для объекта `customClasses` доступно использование следующих полей (каждое 
отвечает за назначение пользовательских классов для отдельного элемента 
разметки):

Название | Значение по умолчанию | Описание
--- | --- | ---
`active` | 'cs__select_active' | Добавляется к блоку поля выпадаюего списка при его активации
`base` | 'cs' | Класс контейнера, включающего всю генерируемую разметку и искомое поле выпадающего списка
`control` | 'cs__control' | Класс элемента поля выпадающего списка, добавляется к испомому элементу
`option` | 'cs__option' | Класс элемента опции списка выбора
`options` | 'cs__options' | Класс блока списока выбор
`select` | 'cs__select' | Класс блока поля выпадающего списка