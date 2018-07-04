'use strict';

(function () {
  var STATUS_CODE_OK = 200;

  var serverUrl = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking/'
  };

  /**
   * Функция создания xhr
   * @param {string} method
   * @param {string} url
   * @param {function} onLoad
   * @param {function} onError
   * @param {Object} data
   */
  var getXhr = function (method, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();

    if (method === 'GET') {
      xhr.responseType = 'json';
    }

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE_OK) {
        onLoad(xhr.response);
      } else {
        onError('Произошла неизвестная ошибка. Пожалуйста, обновите страницу.');
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения. Пожалуйста, обновите страницу.');
    });
    xhr.addEventListener('timeout', function () {
      onError('Сервер долго не отвечает. Пожалуйста, обновите страницу.');
    });

    xhr.open(method, url);
    xhr.send(data ? data : '');
  };

  var load = function (onLoad, onError) {
    getXhr('GET', serverUrl.LOAD, onLoad, onError);
  };

  var upload = function (onLoad, onError, data) {
    getXhr('POST', serverUrl.UPLOAD, onLoad, onError, data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
