'use strict';

var minPrice = {
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

var onHousingTypeOptionChange = function () {
  priceInput.min = minPrice[housingTypeSelect.value];
  priceInput.placeholder = minPrice[housingTypeSelect.value];
};

var onTimeinOptionChange = function () {
  var time = timeinSelect.value;
  timeinSelect.value = time;
  timeoutSelect.value = time;
};

var onTimeoutOptionChange = function () {
  var time = timeoutSelect.value;
  timeinSelect.value = time;
  timeoutSelect.value = time;
};

var onRoomsOptionChange = function () {
  capacityOptions.forEach(function (element) {
    if (roomCapacity[roomsSelect.value].indexOf(element.value) !== -1) {
      element.setAttribute('selected', 'selected');
      element.removeAttribute('disabled');
    } else {
      element.setAttribute('disabled', 'disabled');
      element.removeAttribute('selected');
    }
  });
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

var clearPage = function () {
  invalidElements.forEach(function (element) {
    element.classList.remove('invalid-field');
  });
  adForm.reset();
  window.disablePage();
};

housingTypeSelect.addEventListener('change', onHousingTypeOptionChange);
timeinSelect.addEventListener('change', onTimeinOptionChange);
timeoutSelect.addEventListener('change', onTimeoutOptionChange);
roomsSelect.addEventListener('change', onRoomsOptionChange);
priceInput.addEventListener('change', onElementCheckValidity);
titleInput.addEventListener('change', onElementCheckValidity);
adFormReset.addEventListener('click', function () {
  clearPage();
});
