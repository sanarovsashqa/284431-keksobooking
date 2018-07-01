'use strict';

(function () {

  var pinElements = [];
  var pins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  /**
   * Функция создания пинов
   * @param {Array.<AdData>} adData
   */
  var createPins = function (adData) {
    adData.forEach(function (element) {
      var pin = window.pin.create(element);
      fragment.appendChild(pin);
      pinElements.push(pin);
    });

    pins.appendChild(fragment);
  };

  /**
   * Функция удаления пинов
   */
  var removePins = function () {
    pinElements.forEach(function (element) {
      pins.removeChild(element);
    });

    pinElements = [];
  };

  window.pins = {
    create: createPins,
    remove: removePins
  };
})();
