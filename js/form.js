'use strict';

(function () {
  /**
   * @enum {number}
   */
  var MinPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var roomCapacity = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var invalidElements = [];
  var form = document.querySelector('.ad-form');
  var titleInput = document.querySelector('#title');
  var addressInput = form.querySelector('#address');
  var housingTypeSelect = form.querySelector('#type');
  var priceInput = form.querySelector('#price');
  var timeinSelect = form.querySelector('#timein');
  var timeoutSelect = form.querySelector('#timeout');
  var roomsSelect = form.querySelector('#room_number');
  var capacitySelect = form.querySelector('#capacity');
  var capacityOptions = capacitySelect.querySelectorAll('option');
  var formReset = form.querySelector('.ad-form__reset');
  var formHeader = form.querySelector('.ad-form-header');
  var formElements = form.querySelectorAll('.ad-form__element');

  /**
   * Функция изменения состояния элементов формы
   * @param {boolean} status
   */
  var changeStatusForm = function (status) {
    formHeader.disabled = status;
    formElements.forEach(function (element) {
      element.disabled = status;
    });
  };

  /**
   * Функция получения адреса
   */
  var getFormAddress = function () {
    var mainPinCoords = window.map.mainPinCoords();
    addressInput.value = mainPinCoords.x + ', ' + mainPinCoords.y;
  };

  /**
   * Функция изменяющая значение "Цена за ночь" в связи со значением "Тип жилья"
   */
  var onHousingTypeOptionChange = function () {
    priceInput.min = MinPrice[housingTypeSelect.value];
    priceInput.placeholder = MinPrice[housingTypeSelect.value];
  };

  /**
   * Функция синхронизирующая поля "Время заезда" и "Время выезда"
   * @param {HTMLElement} element
   * @param {string} value
   */
  var timeOption = function (element, value) {
    element.value = value;
  };

  var onTimeoutOptionChange = function (evt) {
    timeOption(timeoutSelect, evt.target.value);
  };

  var onTimeinOptionChange = function (evt) {
    timeOption(timeinSelect, evt.target.value);
  };

  /**
   * Функция синхронизурующая поля "Количество комнат" и "Количество мест"
   */
  var onRoomsOptionChange = function () {
    capacityOptions.forEach(function (element) {
      element.disabled = !roomCapacity[roomsSelect.value].includes(element.value);
    });
    capacitySelect.value = roomCapacity[roomsSelect.value].includes(capacitySelect.value) ? capacitySelect.value : roomCapacity[roomsSelect.value][0];
  };

  /**
   * Функция подсвечивания невалидных элементов
   * @param {Node} element
   */
  var highlightInvalidElement = function (element) {
    invalidElements.push(element);
    element.classList.add('invalid-field');
  };

  /**
   * Функция снятия подсветки невалидных элементов
   * @param {Node} element
   */
  var unhighlightInvalidElement = function (element) {
    invalidElements.splice(invalidElements.indexOf(element), 1);
    element.classList.remove('invalid-field');
  };

  var onFormInvalid = function (evt) {
    highlightInvalidElement(evt.target);
  };

  var onElementCheckValidity = function (evt) {
    if (!evt.target.checkValidity()) {
      highlightInvalidElement(evt.target);
    } else if (invalidElements.indexOf(evt.target) !== 1) {
      unhighlightInvalidElement(evt.target);
    }
  };

  /**
   * Функция очистки страницы
   */
  var clearPage = function () {
    invalidElements.forEach(function (element) {
      element.classList.remove('invalid-field');
    });
    form.reset();
    window.map.disablePage();
  };

  /**
   * Функция добавления листенеров формы
   */
  var addFormListeners = function () {
    housingTypeSelect.addEventListener('change', onHousingTypeOptionChange);
    roomsSelect.addEventListener('change', onRoomsOptionChange);
    priceInput.addEventListener('change', onElementCheckValidity);
    titleInput.addEventListener('change', onElementCheckValidity);
    timeinSelect.addEventListener('change', onTimeoutOptionChange);
    timeoutSelect.addEventListener('change', onTimeinOptionChange);
    formReset.addEventListener('click', clearPage);
    form.addEventListener('invalid', onFormInvalid, true);
  };

  /**
   * Функция удаления листенеров формы
   */
  var removeFormListeners = function () {
    housingTypeSelect.removeEventListener('change', onHousingTypeOptionChange);
    roomsSelect.removeEventListener('change', onRoomsOptionChange);
    priceInput.removeEventListener('change', onElementCheckValidity);
    titleInput.removeEventListener('change', onElementCheckValidity);
    timeinSelect.removeEventListener('change', onTimeoutOptionChange);
    timeoutSelect.removeEventListener('change', onTimeinOptionChange);
    formReset.removeEventListener('click', clearPage);
    form.removeEventListener('invalid', onFormInvalid, true);
  };

  window.form = {
    getAdress: getFormAddress,
    changeStatus: changeStatusForm,
    onHousingTypeOptionChange: onHousingTypeOptionChange,
    onRoomsOptionChange: onRoomsOptionChange,
    addListeners: addFormListeners,
    removeListeners: removeFormListeners
  };
})();
