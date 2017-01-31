'use strict';

const store = require('../store.js');
const events = require('./events.js');
const api = require('./api.js');

const success = function(data) {
  $('#messages').text('success');
};

const getImagesSuccess = function(data) {
  let images = data.images;
  store.portfolioImages = images;
  let content = '';
  let categories = [];
  for(let image in images) {
    // setup categories
    if(categories[images[image].category] === undefined) {
      categories[images[image].category] = 1;
    } else {
      categories[images[image].category] += 1;
    }
  }
  for(let category in categories){
    content += '<a href="#portfolio/'+category+'" class="chalk-text">'+category+'('+categories[category]+')'+'</a>';
  }
  store.categories = categories;
  $('#categories').empty();
  $('#categories').append(content);
}

const failure = (error) => {
  console.error(error);
  $('#messages').text('failure');
};

module.exports = {
  failure,
  success,
  getImagesSuccess,
};
