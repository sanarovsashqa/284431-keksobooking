'use strict';

(function () {
  var offerTypesTranslation = {
    palace: 'Дворец',
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };

  var photoParams = {
    WIDTH: 40,
    HEIGHT: 40,
    ALT: 'Фотография жилья'
  };

  /**
   * @enum {number}
   */
  var KeyCodes = {
    ESC: 27
  };

  var activeCard;
  var cardTemplate = document.querySelector('#map-card-template').content.querySelector('.map__card');
  var map = document.querySelector('.map');

  /**
   * Функция создания элемента 'Feauture'
   * @param {string} text - Подставляемый текст
   * @return {Node}
   */
  var createFeautureElement = function (text) {
    var newFuture = document.createElement('li');

    newFuture.classList.add('popup__feature');
    newFuture.classList.add('popup__feature--' + text);

    return newFuture;
  };

  /**
   * Функция создания элемента 'Photo'
   * @param {string} src - Подставляемый src
   * @return {Node}
   */
  var createPhotoElement = function (src) {
    var newPhoto = document.createElement('img');

    newPhoto.classList.add('popup__photo');
    newPhoto.width = photoParams.WIDTH;
    newPhoto.height = photoParams.HEIGHT;
    newPhoto.alt = photoParams.ALT;
    newPhoto.src = src;

    return newPhoto;
  };

  /**
   * Функция создания карточки объявления
   * @param {AdData} adData
   * @return {Node}
   */
  var createCard = function (adData) {
    var card = cardTemplate.cloneNode(true);

    card.querySelector('.popup__title').textContent = adData.offer.title;
    card.querySelector('.popup__text--address').textContent = adData.offer.adress;
    card.querySelector('.popup__text--price').textContent = adData.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = offerTypesTranslation[adData.offer.type];
    card.querySelector('.popup__text--capacity').textContent = adData.offer.rooms + ' комнаты для ' + adData.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + adData.offer.checkin + ', выезд до ' + adData.offer.checkout;
    card.querySelector('.popup__description').textContent = adData.offer.description;
    card.querySelector('.popup__avatar').src = adData.author.avatar;

    adData.offer.feautures.forEach(function (element) {
      card.querySelector('.popup__features').appendChild(createFeautureElement(element));
    });

    adData.offer.photos.forEach(function (element) {
      card.querySelector('.popup__photos').appendChild(createPhotoElement(element));
    });

    card.querySelector('.popup__close').addEventListener('click', function () {
      disableCard();
      window.pin.disable();
    });
    document.addEventListener('keydown', onCardEscPress);

    return card;
  };

  /**
   * Функция отключения карточки объявления при нажатии клавиши ESC
   * @param {number} evt
   */
  var onCardEscPress = function (evt) {
    if (evt.keyCode === KeyCodes.ESC) {
      disableCard();
      window.pin.disable();
    }
  };

  /**
   * Функция отключения карточки объявления
   */
  var disableCard = function () {
    if (activeCard) {
      map.removeChild(activeCard);
      document.removeEventListener('keydown', onCardEscPress);
      activeCard = null;
    }
  };

  /**
   * Функция отрисовки карточки объявления
   * @param {Array.<AdData>} adData
   */
  var renderCard = function (adData) {
    disableCard();

    var card = createCard(adData);
    map.insertBefore(card, map.querySelector('.map__filters-container'));
    activeCard = card;
  };

  window.card = {
    render: renderCard,
    disable: disableCard
  };
})();
