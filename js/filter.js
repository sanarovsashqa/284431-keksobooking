'use strict';

(function () {
  var filter = document.querySelector('.map__filters');
  var typeSelect = filter.querySelector('#housing-type');
  var priceSelect = filter.querySelector('#housing-price');
  var roomsSelect = filter.querySelector('#housing-rooms');
  var guestsSelect = filter.querySelector('#housing-guests');
  var featuresFieldset = filter.querySelector('#housing-features');
  var filterElements = filter.querySelectorAll('input, select');
  var data = [];
  var filteredData = [];

  var priceRange = {
    low: {
      MIN: 0,
      MAX: 9999
    },
    middle: {
      MIN: 10000,
      MAX: 50000
    },
    high: {
      MIN: 50000,
      MAX: Infinity
    }
  };

  var PINS_NUM = 5;

  var filterElement = function (element, key, item) {
    if (key === 'price') {
      var priceValue = priceRange[element.value];
      return priceValue ? item[key] >= priceValue.MIN && item[key] <= priceValue.MAX : true;
    }
    return element.value === 'any' ? true : element.value === item[key].toString();
  };

  var filterType = function (item) {
    return filterElement(typeSelect, 'type', item.offer);
  };

  var filterPrice = function (item) {
    return filterElement(priceSelect, 'price', item.offer);
  };

  var filterRooms = function (item) {
    return filterElement(roomsSelect, 'rooms', item.offer);
  };

  var filterGuests = function (item) {
    return filterElement(guestsSelect, 'guests', item.offer);
  };

  var filterFeatures = function (item) {
    var checkedFeatures = featuresFieldset.querySelectorAll('input:checked');

    return Array.from(checkedFeatures).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  };

  var onFiltersChange = window.utils.debounce(function () {
    filteredData = data.slice();
    filteredData = filteredData.filter(filterType);
    filteredData = filteredData.filter(filterPrice);
    filteredData = filteredData.filter(filterRooms);
    filteredData = filteredData.filter(filterGuests);
    filteredData = filteredData.filter(filterFeatures);
    window.card.disable();
    window.pins.remove();
    window.pins.create(filteredData.slice(0, PINS_NUM));
  });

  var enableFilters = function () {
    filterElements.forEach(function (element) {
      element.disabled = false;
    });
    filter.addEventListener('change', onFiltersChange);
  };

  var disableFilters = function () {
    filterElements.forEach(function (element) {
      element.disabled = true;
    });
    filter.removeEventListener('change', onFiltersChange);
  };

  var activateFilters = function (adData) {
    data = adData.slice();
    enableFilters();
    return adData.slice(0, PINS_NUM);
  };

  var deactivateFilters = function () {
    disableFilters();
    filter.reset();
  };

  window.filter = {
    activate: activateFilters,
    deactivate: deactivateFilters
  };
})();
