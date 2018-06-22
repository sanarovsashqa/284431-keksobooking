'use strict';

(function () {
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

  window.callEscPress = callEscPress;
})();
