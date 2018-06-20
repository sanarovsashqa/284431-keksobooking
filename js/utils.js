'use strict';

(function () {
  /**
   * Функция тасования Фишера-Йетса
   * @param {Array} array
   * @return {Array}
   */
  var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  };

  /**
   * Функция получения случайного числа от min до max
   * @param {number} min
   * @param {number} max
   * @return {number}
   */
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  /**
   * @typedef {Objeсt} CloneObject
   */

  /**
   * Функция клонирования объекта
   * @param {Object} original - клонируемый объект
   * @return {CloneObject}
   */
  var getCopy = function (original) {
    var clone = Object.create(Object.getPrototypeOf(original));
    var keys = Object.getOwnPropertyNames(original);

    for (var i = 0; i < keys.length; i++) {
      Object.defineProperty(clone, keys[i], Object.getOwnPropertyDescriptor(original, keys[i]));
    }

    return clone;
  };

  window.utils = {
    shuffleArray: shuffleArray,
    getRandomInt: getRandomInt,
    getCopy: getCopy
  };
})();
