'use strict';

(function () {
  /**
   * @enum {number}
   */
  var KeyCodes = {
    ESC: 27
  };

  var DEBOUNCE_INTERVAL = 500;

  var callEscPress = function (evt, callback) {
    if (evt.keyCode === KeyCodes.ESC) {
      callback();
    }
  };

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
