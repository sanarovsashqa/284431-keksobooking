'use strict';

/**
 * @typedef {Objeсt} minPrice
 * @property {number} bungalo
 * @property {number} flat
 * @property {number} house
 * @property {number} palace
 */
var minPrice = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

/**
 * @typedef {Objeсt} roomCapacity
 * @property {Array.<string>} oneRoom
 * @property {Array.<string>} twoRooms
 * @property {Array.<string>} threeRooms
 * @property {Array.<string>} hundredRooms
 */
var roomCapacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

var invalidElements = [];

var adForm = document.querySelector('.ad-form');
var titleInput = document.querySelector('#title');
var housingTypeSelect = adForm.querySelector('#type');
var priceInput = adForm.querySelector('#price');
var timeinSelect = adForm.querySelector('#timein');
var timeoutSelect = adForm.querySelector('#timeout');
var roomsSelect = adForm.querySelector('#room_number');
var capacitySelect = adForm.querySelector('#capacity');
var capacityOptions = capacitySelect.querySelectorAll('option');
var adFormReset = adForm.querySelector('.ad-form__reset');

/**
 * Функция изменяющая значение "Цена за ночь" в связи со значением "Тип жилья"
 */
var onHousingTypeOptionChange = function () {
  priceInput.min = minPrice[housingTypeSelect.value];
  priceInput.placeholder = minPrice[housingTypeSelect.value];
};

/**
 * Функция синхронизирующая поля "Время заезда" и "Время выезда"
 * @param {HTMLElement} element
 * @param {string} value
 */
var onTimeOptionChange = function (element, value) {
  element.value = value;
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

var onElementCheckValidity = function (evt) {
  if (!evt.target.checkValidity()) {
    invalidElements.push(evt.target);
    evt.target.classList.add('invalid-field');
  } else if (invalidElements.indexOf(evt.target) !== 1) {
    invalidElements.splice(invalidElements.indexOf(evt.target), 1);
    evt.target.classList.remove('invalid-field');
  }
};

/**
 * Функция очистки страницы
 */
var clearPage = function () {
  invalidElements.forEach(function (element) {
    element.classList.remove('invalid-field');
  });
  adForm.reset();
  window.disablePage();
};

housingTypeSelect.addEventListener('change', onHousingTypeOptionChange);
roomsSelect.addEventListener('change', onRoomsOptionChange);
priceInput.addEventListener('change', onElementCheckValidity);
titleInput.addEventListener('change', onElementCheckValidity);
timeinSelect.addEventListener('change', function (evt) {
  onTimeOptionChange(timeoutSelect, evt.target.value);
});
timeoutSelect.addEventListener('change', function (evt) {
  onTimeOptionChange(timeinSelect, evt.target.value);
});
adFormReset.addEventListener('click', function () {
  clearPage();
});
adForm.addEventListener('invalid', function () {
  onElementCheckValidity();
});
