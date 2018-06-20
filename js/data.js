'use strict';

(function () {
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

  var AVATARS_NUM = 8;

  /**
   * Функция получения src для изображений
   * @param {number} num - Количество изображений
   * @return {Array.<string>}
   */
  var getAvatarsList = function (num) {
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
   * @typedef {Object} AdData
   * @property {Author}
   * @property {Offer}
   * @property {Location}
   */

  /**
   * Функция получения данных для объявления
   * @param {number} index
   * @return {AdData}
   */
  var getAdData = function (index) {

    var avatars = window.utils.shuffleArray(getAvatarsList(AVATARS_NUM));
    var titles = window.utils.shuffleArray(offerParams.TITLES);
    var locationX = window.utils.getRandomInt(locationParams.x.MIN, locationParams.x.MAX);
    var locationY = window.utils.getRandomInt(locationParams.y.MIN, locationParams.y.MAX);
    var price = window.utils.getRandomInt(offerParams.price.MIN, offerParams.price.MAX);
    var type = offerParams.TYPES[window.utils.getRandomInt(0, offerParams.TYPES.length)];
    var room = window.utils.getRandomInt(offerParams.room.MIN, offerParams.room.MAX);
    var guest = window.utils.getRandomInt(offerParams.guest.MIN, offerParams.guest.MAX);
    var checkin = offerParams.TIMES[window.utils.getRandomInt(0, offerParams.TIMES.length)];
    var checkout = offerParams.TIMES[window.utils.getRandomInt(0, offerParams.TIMES.length)];
    var feautures = window.utils.shuffleArray(window.utils.getCopy(offerParams.FEAUTURES)).splice(window.utils.getRandomInt(0, offerParams.FEAUTURES.length));
    var photos = window.utils.shuffleArray(window.utils.getCopy(offerParams.PHOTOS));

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

  window.getAdData = getAdData;
})();
