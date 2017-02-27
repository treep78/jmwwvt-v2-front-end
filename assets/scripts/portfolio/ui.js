'use strict';

const store = require('../store.js');
const viewUi = require('../views/ui.js');


const success = function(data) {
  $('#messages').text('success');
};

const newImageSuccess = function(data) {
  store.portfolioImages.push(data.image);
  viewUi.displayImages();
  $('#newImageModal').modal('hide');
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
};

const editImageSuccess = function(data) {
  let images = store.portfolioImages;
  for(let image in images) {
    if(images[image].id === data.image.id){
      images[image] = data.image;
      viewUi.displayImages();
    }
  }
  $('#imageDetailsModal').modal('hide');
};

const deleteImageSuccess = function() {
  console.log('image deleted');
  $('#imageDetailsModal').modal('hide');
  for(let image in store.portfolioImages){
    if(store.portfolioImages[image].id === store.currentImage.id){
      delete store.portfolioImages[image];
    }
  }
  viewUi.displayImages();
};

const failure = (error) => {
  console.error(error);
  $('#messages').text('failure');
};

module.exports = {
  failure,
  success,
  newImageSuccess,
  getImagesSuccess,
  editImageSuccess,
  deleteImageSuccess,
};
