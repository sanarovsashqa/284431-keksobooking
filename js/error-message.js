'use strict';

(function () {
  var TIMEOUT = 3000;
  var message = document.createElement('div');

  /**
   * Функция создания сообщения об ошибке
   * @param {string} text Передаваемый текст
   */
  var createErrorMessage = function (text) {
    message.classList.add('error-message--active');
    message.textContent = text;
    document.body.appendChild(message);
    setTimeout(function () {
      document.body.removeChild(message);
    }, TIMEOUT);
  };

  window.createErrorMessage = createErrorMessage;
})();
