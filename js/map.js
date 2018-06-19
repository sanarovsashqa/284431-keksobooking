'use strict';

(function () {
  var mainPinParams = {
    WIDTH: 65,
    HEIGHT: 84,
    DEFAULT_X: '570px',
    DEFAULT_Y: '375px',
    y: {
      MIN: 130,
      MAX: 630
    },
    x: {
      MIN: 0
    }
  };

  var formStatus = {
    DISABLED: true,
    ENABLED: false
  };

  var ADS_NUM = 8;
  var activePage;
  var pinElements = [];
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var mainPin = map.querySelector('.map__pin--main');
  var pins = map.querySelector('.map__pins');
  var addressInput = form.querySelector('#address');

  /**
   * @typedef {Object} mainPinCoordinates
   * @property {x}
   * @property {y}
   */

  /**
   * Функция получения координат главного пина
   * @return {mainPinCoordinates}
   */
  var getMainPinCoords = function () {
    var x = mainPin.offsetLeft + Math.floor(mainPinParams.WIDTH / 2);
    var y = mainPin.offsetTop + mainPinParams.HEIGHT;

    return {
      x: x,
      y: y
    };
  };

  /**
   * Функция получения данных для объявлений
   * @param {number} num - Количсетво объявлений
   * @return {Array.<AdData>}
   */
  var getAdsData = function (num) {
    var adsData = [];

    for (var i = 0; i < num; i++) {
      adsData.push(window.getAdData(i));
    }

    return adsData;
  };

  /**
   * Функция отрисовки пинов
   * @param {Array.<AdData>} adData
   */
  var renderPins = function (adData) {
    var fragment = document.createDocumentFragment();

    adData.forEach(function (element) {
      var pin = window.pin.create(element);
      fragment.appendChild(pin);
      pinElements.push(pin);
    });

    pins.appendChild(fragment);
  };

  /**
   * Функция приведения страницы в активное состояние
   */
  var activatePage = function () {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    window.form.changeStatus(formStatus.ENABLED);
    window.form.onHousingTypeOptionChange();
    window.form.onRoomsOptionChange();
    window.form.addListeners();
    renderPins(getAdsData(ADS_NUM));
  };

  /**
   * Функция приведения страницы в неактивное состояние
   */
  var disablePage = function () {
    var mainPinCoords = getMainPinCoords();

    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    mainPin.style.left = mainPinParams.DEFAULT_X;
    mainPin.style.top = mainPinParams.DEFAULT_Y;
    window.form.changeStatus(formStatus.DISABLED);
    window.form.removeListeners();
    addressInput.value = mainPinCoords.x + ', ' + mainPinCoords.y;
    window.card.disable();

    pinElements.forEach(function (element) {
      pins.removeChild(element);
    });

    pinElements = [];
    activePage = false;
  };

  /**
   * Функция инициализации страницы
   */
  var initPage = function () {
    disablePage();

    mainPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var mainPinCoords = getMainPinCoords();

        if (mainPinCoords.y - shift.y >= mainPinParams.y.MIN && mainPinCoords.y - shift.y <= mainPinParams.y.MAX) {
          mainPin.style.top = mainPin.offsetTop - shift.y + 'px';
        }

        if (mainPinCoords.x - shift.x >= mainPinParams.x.MIN && mainPinCoords.x - shift.x <= map.offsetWidth) {
          mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        if (!activePage) {
          activatePage();
          activePage = true;
        }

        window.form.getAdress();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  initPage();

  window.map = {
    mainPinCoords: getMainPinCoords,
    disablePage: disablePage
  };
})();
