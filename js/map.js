'use strict';
/**
 * @typedef {Objeсt} Price
 * @property {number} MIN
 * @property {number} MAX
 */

/**
 * @typedef {Objeсt} Room
 * @property {number} MIN
 * @property {number} MAX
 */

/**
 * @typedef {Objeсt} Guest
 * @property {number} MIN
 * @property {number} MAX
 */

/**
 * @typedef {Objeсt} OfferParams
 * @property {Array.<string>} TITLES
 * @property {Array.<string>} TYPES
 * @property {Array.<string>} TIMES
 * @property {Array.<string>} FEAUTURES
 * @property {Array.<string>} PHOTOS
 * @property {Array.<string>} TYPES
 * @property {Price}
 * @property {Room}
 * @property {Guest}
 */
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

/**
 * @typedef {Objeсt} AvatarParams
 * @property {number} MIN_AVATARS
 * @property {number} MAX_AVATARS
 */
var avatarParams = {
  MIN_AVATARS: 8
};

/**
 * @typedef {Objeсt} LocationX
 * @property {number} MIN
 * @property {number} MAX
 */

/**
 * @typedef {Objeсt} LocationY
 * @property {number} MIN
 * @property {number} MAX
 */

/**
 * @typedef {Objeсt} LocationParams
 * @property {LocationX}
 * @property {LocationY}
 */
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

/**
 * @typedef {Objeсt} PinParams
 * @property {number} WIDTH
 * @property {number} HEIGHT
 */
var pinParams = {
  WIDTH: 50,
  HEIGHT: 70
};

/**
 * @typedef {Objeсt} X
 * @property {string} palace
 * @property {string} flat
 * @property {string} bungalo
 * @property {string} house
 */
var offerTypesTranslation = {
  palace: 'Дворец',
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом'
};

/**
 * @typedef {Objeсt} NewPhotoParams
 * @property {number} WIDTH
 * @property {number} HEIGHT
 * @property {string} ALT
 */
var newPhotoParams = {
  WIDTH: 40,
  HEIGHT: 40,
  ALT: 'Фотография жилья'
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
 * @typedef {Objeсt} CloneObject
 */

/**
 * Функция клонирования объекта
 * @param {Object} original - клонируемый объект
 * @return {CloneObject}
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
 * @param {number} max - Максимальное количество изображений
 * @return {Array.<string>}
 */
var getAvatarList = function (num) {
  var avatarsList = [];

  for (var i = 1; i <= num; i++) {
    var avatarNum = i <= 9 ? '0' + i : i;
    var avatar = 'img/avatars/user' + avatarNum + '.png';
    avatarsList.push(avatar);
  }

  return avatarsList;
};

/**
 * @typedef {Object} Author
 * @property {string} avatar
 */

/**
 * @typedef {Object} Offer
 * @property {string} title
 * @property {string} adress
 * @property {number} price
 * @property {string} type
 * @property {number} rooms
 * @property {number} guests
 * @property {string} checkin
 * @property {string} checkout
 * @property {Array.<string>} features
 * @property {string} description
 * @property {Array.<string>} photos
 */

/**
 * @typedef {Object} Location
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Object} Ad
 * @property {Author}
 * @property {Offer}
 * @property {Location}
 */

/**
 * Функция получения информации для объявления
 * @param {number} index
 * @return {Ad}
 */
var getAdData = function (index) {

  var avatars = shuffleArray(getAvatarList(avatarParams.MIN_AVATARS));
  var titles = shuffleArray(offerParams.TITLES);
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

  return {
    author: {
      avatar: avatars[index]
    },
    offer: {
      title: titles[index],
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
      x: locationX,
      y: locationY
    }
  };
};

/**
 * Функция генерации объявлений
 * @param {number} num - Количсетво объявлений
 * @return {Array.<Ad>}
 */
var createAdData = function (num) {
  var adsData = [];

  for (var i = 0; i < num; i++) {
    adsData.push(getAdData(i));
  }

  return adsData;
};

/**
 * Функция создания метки на карте
 * @param {Array.<Ad>} adData
 * @param {number} index
 * @return {Node}
 */
var createPin = function (adData) {
  var mapPinElement = mapPinTemplate.cloneNode(true);
  var mapPinImg = mapPinTemplate.querySelector('img');

  mapPinElement.style.left = adData.location.x - pinParams.WIDTH / 2 + 'px';
  mapPinElement.style.top = adData.location.y - pinParams.HEIGHT + 'px';
  mapPinImg.src = adData.author.avatar;
  mapPinImg.alt = adData.offer.title;

  return mapPinElement;
};

/**
 * Функция отрисовки меток
 * @param {Array.<Ad>} adData
 * @return {DocumentFragment}
 */
var renderPin = function (adData) {
  var fragment = document.createDocumentFragment();

  adData.forEach(function (element) {
    fragment.appendChild(createPin(element));
  });

  return fragment;
};

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
  newPhoto.width = newPhotoParams.WIDTH;
  newPhoto.height = newPhotoParams.HEIGHT;
  newPhoto.alt = newPhotoParams.ALT;
  newPhoto.src = src;

  return newPhoto;
};

/**
 * Функция создания карточки объявления
 * @param {Ad} adDataObject
 * @param {number} index
 * @return {Node}
 */
var createMapCard = function (adDataObject) {
  var mapCardElement = mapCardTemplate.cloneNode(true);

  mapCardElement.querySelector('.popup__title').textContent = adDataObject.offer.title;
  mapCardElement.querySelector('.popup__text--address').textContent = adDataObject.offer.adress;
  mapCardElement.querySelector('.popup__text--price').textContent = adDataObject.offer.price + '₽/ночь';
  mapCardElement.querySelector('.popup__type').textContent = offerTypesTranslation[adDataObject.offer.type];
  mapCardElement.querySelector('.popup__text--capacity').textContent = adDataObject.offer.rooms + ' комнаты для ' + adDataObject.offer.guests + ' гостей';
  mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + adDataObject.offer.checkin + ', выезд до ' + adDataObject.offer.checkout;
  mapCardElement.querySelector('.popup__description').textContent = adDataObject.offer.description;
  mapCardElement.querySelector('.popup__avatar').src = adDataObject.author.avatar;

  adDataObject.offer.feautures.forEach(function (element) {
    mapCardElement.querySelector('.popup__features').appendChild(createFeautureElement(element));
  });

  adDataObject.offer.photos.forEach(function (element) {
    mapCardElement.querySelector('.popup__photos').appendChild(createPhotoElement(element));
  });

  return mapCardElement;
};

/**
 * Функция отрисовки страницы
 */
var initPage = function () {
  var map = document.querySelector('.map');
  var mapPin = map.querySelector('.map__pins');

  var adsListData = createAdData(AD_NUM);
  var mapPinRender = renderPin(adsListData);
  var mapCardRender = createMapCard(adsListData[0]);

  mapPin.appendChild(mapPinRender);
  map.insertBefore(mapCardRender, map.querySelector('.map__filters-container'));

  map.classList.remove('map--faded');
};

initPage();
