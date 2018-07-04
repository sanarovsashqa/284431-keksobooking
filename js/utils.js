'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  /**
   * @enum {number}
   */
  var KeyCodes = {
    ESC: 27
  };

  var callEscPress = function (evt, callback) {
    if (evt.keyCode === KeyCodes.ESC) {
      callback();
    }
  };

  /**
   * Функция устранения дребезга
   * @param {function} callback
   * @return {function}
   */
  var debounce = function (callback) {
    var lastTimeout = null;

    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callback.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    callEscPress: callEscPress,
    debounce: debounce
  };
})();
