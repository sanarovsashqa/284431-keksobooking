'use strict';

(function () {
  var message = document.createElement('div');

  var createErrorMessage = function (text) {
    message.classList.add('error-message--active');
    message.textContent = text;
    document.body.appendChild(message);
    setTimeout(function () {
      document.body.removeChild(message);
    }, 3000);
  };

  window.createErrorMessage = createErrorMessage;
})();
