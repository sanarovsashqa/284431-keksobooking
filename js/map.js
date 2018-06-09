'use strict';

var offerParams = {
  TITLES: [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ],
  TYPES: [
    'palace',
    'flat',
    'house',
    'bungalo'
  ],
  TIMES: [
    '12:00',
    '13:00',
    '14:00',
  ],
  FEAUTURES: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ],
  PHOTOS: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ],
  price: {
    MIN: 1000,
    MAX: 1000000
  },
  room: {
    MIN: 1,
    MAX: 5
  },
  guest: {
    MIN: 1,
    MAX: 20
  }
};

var locationParams = {
  x: {
    MIN: 300,
    MAX: 900
  },
  y: {
    MIN: 130,
    MAX: 630
  }
};

var pinParams = {
  WIDTH: 40,
  HEIGHT: 40
};

var offerTypesTranslation = {
  palace: 'Дворец',
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом'
};

var AD_NUM = 8;
var mapCardTemplate = document.querySelector('#map-card-template').content.querySelector('.map__card');
var mapPinTemplate = document.querySelector('#map-card-template').content.querySelector('.map__pin');

/**
 * Функция тасования Фишера-Йетса
 * @param {Array} array
 * @return {Array}
 */
var shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

/**
 * Функция получения случайного числа от min до max
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * Функция клонирования объекта
 * @param {Object} original - клонируемый объект
 * @return {Object}
 */
var getCopy = function (original) {
  var clone = Object.create(Object.getPrototypeOf(original));
  var keys = Object.getOwnPropertyNames(original);

  for (var i = 0; i < keys.length; i++) {
    Object.defineProperty(clone, keys[i], Object.getOwnPropertyDescriptor(original, keys[i]));
  }

  return clone;
};

/**
 * Функция получения src для изображений
 * @param {number} num - Количество изображений
 * @return {Array}
 */
var getAvatarList = function (num) {
  var avatarsList = [];
  for (var i = 1; i <= num; i++) {
    var avatar = 'img/avatars/user0' + i + '.png';
    avatarsList.push(avatar);
  }

  return avatarsList;
};

/**
 * Функция получения информации для объявления
 * @param {number} num - количество объявлений
 * @return {Array}
 */
var getAdData = function (num) {
  var adsData = [];

  var avatars = shuffleArray(getAvatarList(num));
  var titles = shuffleArray(offerParams.TITLES);

  for (var i = 0; i < num; i++) {
    var locationX = getRandomInt(locationParams.x.MIN, locationParams.x.MAX);
    var locationY = getRandomInt(locationParams.y.MIN, locationParams.y.MAX);
    var price = getRandomInt(offerParams.price.MIN, offerParams.price.MAX);
    var type = offerParams.TYPES[getRandomInt(0, offerParams.TYPES.length)];
    var room = getRandomInt(offerParams.room.MIN, offerParams.room.MAX);
    var guest = getRandomInt(offerParams.guest.MIN, offerParams.guest.MAX);
    var checkin = offerParams.TIMES[getRandomInt(0, offerParams.TIMES.length)];
    var checkout = offerParams.TIMES[getRandomInt(0, offerParams.TIMES.length)];
    var feautures = shuffleArray(getCopy(offerParams.FEAUTURES)).splice(getRandomInt(0, offerParams.FEAUTURES.length));
    var photos = shuffleArray(getCopy(offerParams.PHOTOS));

    var ad = {
      author: {
        avatar: avatars[i]
      },
      offer: {
        title: titles[i],
        adress: locationX + ', ' + locationY,
        price: price,
        type: type,
        rooms: room,
        guests: guest,
        checkin: checkin,
        checkout: checkout,
        feautures: feautures,
        description: '',
        photos: photos
      },
      location: {
        x: locationX - pinParams.WIDTH / 2,
        y: locationY - pinParams.HEIGHT
      }
    };

    adsData.push(ad);
  }

  return adsData;
};

/**
 * Функция создания метки на карте
 * @param {Array} arr
 * @param {number} index
 * @return {Node}
 */
var createPin = function (arr, index) {
  var mapPinElement = mapPinTemplate.cloneNode(true);
  var mapPinImg = mapPinTemplate.querySelector('img');

  mapPinElement.style.left = arr[index].location.x + 'px';
  mapPinElement.style.top = arr[index].location.y + 'px';
  mapPinImg.src = arr[index].author.avatar;
  mapPinImg.alt = arr[index].offer.title;

  return mapPinElement;
};

/**
 * Функция отрисовки меток
 * @param {Array} arr
 * @return {DocumentFragment}
 */
var renderPin = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(createPin(arr, i));
  }

  return fragment;
};

/**
 * Функция создания элемента 'Feauture'
 * @param {string} element - Подставляемый текст
 * @return {Node}
 */
var createFeautureElement = function (element) {
  var newFuture = document.createElement('li');

  newFuture.classList.add('popup__feature', 'popup__feature--' + element);

  return newFuture;
};

/**
 * Функция создания элемента 'Photo'
 * @param {string} element - Подставляемый текст
 * @return {Node}
 */
var createPhotoElement = function (element) {
  var newPhoto = document.createElement('img');

  newPhoto.classList.add('popup__photo');
  newPhoto.width = 40;
  newPhoto.height = 40;
  newPhoto.alt = 'Фотография жилья';
  newPhoto.src = element;

  return newPhoto;
};

/**
 * Функция создания карточки объявления
 * @param {Array} arr
 * @param {number} index
 * @return {Node}
 */
var createMapCard = function (arr, index) {
  var mapCardElement = mapCardTemplate.cloneNode(true);

  mapCardElement.querySelector('.popup__title').textContent = arr[index].offer.title;
  mapCardElement.querySelector('.popup__text--address').textContent = arr[index].offer.adress;
  mapCardElement.querySelector('.popup__text--price').textContent = arr[index].offer.price + '₽/ночь';
  mapCardElement.querySelector('.popup__type').textContent = offerTypesTranslation[arr[index].offer.type];
  mapCardElement.querySelector('.popup__text--capacity').textContent = arr[index].offer.rooms + ' комнаты для ' + arr[index].offer.guests + ' гостей';
  mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arr[index].offer.checkin + ', выезд до ' + arr[index].offer.checkout;
  mapCardElement.querySelector('.popup__description').textContent = arr[index].offer.description;
  mapCardElement.querySelector('.popup__avatar').src = arr[index].author.avatar;

  var feautureFragment = document.createDocumentFragment();
  arr[index].offer.feautures.forEach(function (element) {
    feautureFragment.appendChild(createFeautureElement(element));
  });

  var photoFragment = document.createDocumentFragment();
  arr[index].offer.photos.forEach(function (element) {
    photoFragment.appendChild(createPhotoElement(element));
  });

  mapCardElement.querySelector('.popup__photos').appendChild(photoFragment);
  mapCardElement.querySelector('.popup__features').appendChild(feautureFragment);

  return mapCardElement;
};

/**
 * Функция отрисовки карточек объявления
 * @param {Array} arr
 * @return {DocumentFragment}
 */
var renderMapCard = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(createMapCard(arr, i));
  }

  return fragment;
};

/**
 * Функция отрисовки страницы
 */
var initPage = function () {
  var map = document.querySelector('.map');
  var mapPin = map.querySelector('.map__pins');

  var adsListData = getAdData(AD_NUM);
  var mapPinRender = renderPin(adsListData);
  var mapCardRender = renderMapCard(adsListData);

  mapPin.appendChild(mapPinRender);
  map.insertBefore(mapCardRender, map.querySelector('.map__filters-container'));

  map.classList.remove('map--faded');
};

initPage();
