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

  var activeCard;
  var cardTemplate = document.querySelector('#map-card-template').content.querySelector('.map__card');
  var map = document.querySelector('.map');

  /**
   * Функция создания элемента 'Feauture'
   * @param {string} text - Подставляемый текст
   * @return {Node}
   */
  var createFeature = function (text) {
    var feature = document.createElement('li');

    feature.classList.add('popup__feature');
    feature.classList.add('popup__feature--' + text);

    return feature;
  };

  /**
   * Функция создания элемента 'Photo'
   * @param {string} src - Подставляемый src
   * @return {Node}
   */
  var createPhoto = function (src) {
    var photo = document.createElement('img');

    photo.classList.add('popup__photo');
    photo.width = photoParams.WIDTH;
    photo.height = photoParams.HEIGHT;
    photo.alt = photoParams.ALT;
    photo.src = src;

    return photo;
  };

  /**
   * Функция создания карточки объявления
   * @param {AdData} adData
   * @return {Node}
   */
  var createCard = function (adData) {
    var card = cardTemplate.cloneNode(true);

    card.querySelector('.popup__title').textContent = adData.offer.title;
    card.querySelector('.popup__text--address').textContent = adData.offer.address;
    card.querySelector('.popup__text--price').textContent = adData.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = offerTypesTranslation[adData.offer.type];
    card.querySelector('.popup__text--capacity').textContent = adData.offer.rooms + ' комнаты для ' + adData.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + adData.offer.checkin + ', выезд до ' + adData.offer.checkout;
    card.querySelector('.popup__description').textContent = adData.offer.description;
    card.querySelector('.popup__avatar').src = adData.author.avatar;


    if (adData.offer.features.length !== 0) {
      adData.offer.features.forEach(function (element) {
        card.querySelector('.popup__features').appendChild(createFeature(element));
      });
    } else {
      card.removeChild(card.querySelector('.popup__features'));
    }

    if (adData.offer.photos.length !== 0) {
      adData.offer.photos.forEach(function (element) {
        card.querySelector('.popup__photos').appendChild(createPhoto(element));
      });
    } else {
      card.removeChild(card.querySelector('.popup__photos'));
    }

    card.querySelector('.popup__close').addEventListener('click', function () {
      disableCard();
      window.pin.deactivate();
    });
    document.addEventListener('keydown', onCardEscPress);

    return card;
  };

  /**
   * Функция отключения карточки объявления при нажатии клавиши ESC
   * @param {number} evt
   */
  var onCardEscPress = function (evt) {
    window.utils.callEscPress(evt, disableCard);
  };

  /**
   * Функция отключения карточки объявления
   */
  var disableCard = function () {
    if (activeCard) {
      map.removeChild(activeCard);
      document.removeEventListener('keydown', onCardEscPress);
      window.pin.deactivate();
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
