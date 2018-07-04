'use strict';

(function () {
  var activePin;
  var pinTemplate = document.querySelector('#map-card-template').content.querySelector('.map__pin');

  var pinParams = {
    WIDTH: 50,
    HEIGHT: 70
  };

  /**
   * Функция приведения пина в активное состояние
   * @param {string} element
   */
  var activatePin = function (element) {
    if (activePin) {
      deactivatePin();
    }
    activePin = element;
    activePin.classList.add('map__pin--active');
  };

  /**
   * Функция приведения пина в неактивное состояние
   */
  var deactivatePin = function () {
    activePin.classList.remove('map__pin--active');
    activePin = null;
  };

  /**
   * Функция создания пина на карте
   * @param {Array.<AdData>} adData
   * @return {Node}
   */
  var createPin = function (adData) {
    var pin = pinTemplate.cloneNode(true);
    var pinImg = pin.querySelector('img');

    pin.style.left = adData.location.x - pinParams.WIDTH / 2 + 'px';
    pin.style.top = adData.location.y - pinParams.HEIGHT + 'px';
    pinImg.src = adData.author.avatar;
    pinImg.alt = adData.offer.title;

    pin.addEventListener('click', function (evt) {
      if (activePin !== evt.currentTarget) {
        window.card.render(adData);
        activatePin(evt.currentTarget);
      }
    });

    return pin;
  };

  window.pin = {
    create: createPin,
    deactivate: deactivatePin,
  };
})();
