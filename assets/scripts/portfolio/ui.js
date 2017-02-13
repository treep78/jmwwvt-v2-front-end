'use strict';

const store = require('../store.js');
const events = require('./events.js');
const api = require('./api.js');


const refreshImages = function() {
  console.log('refresh images');
  let filter = 'none';
  let view = window.location.href;
  for(let i = 0; i < view.length; i++) {
    if(view[i] === '#') {
      let tempView = '';
      for(let j = i; j < view.length; j++) {
        tempView += view[j];
        if(view[j+1] === '/'){
          let tempCat = '';
          for(let k = j+2; k < view.length; k++) {
            tempCat += view[k];
          }
          filter = tempCat;
          break;
        }
      }
    }
  }
  let images = store.portfolioImages;
  let content = '';
  for(let image in images) {
    // html template for images
    if(images[image].category === filter || filter === 'none') {
      let html = '<img src="'+images[image].link+'" alt="'+images[image].title+'" class="portfolioImage" id="'+images[image].id+'">'+
      '</img>';
      content += html;
    }
  }
  $('#portfolioImages').empty();
  $('#portfolioImages').append(content);
};

const success = function(data) {
  $('#messages').text('success');
};

const newImageSuccess = function(data) {
  //store.portfolioImages += data.image;
  //viewUi.displayImages();
  console.log('asfa');
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

const editImageSuccess = function(data) {
  let images = store.portfolioImages;
  for(let image in images) {
    if(images[image].id === data.image.id){
      images[image] = data.image;
      refreshImages();
    }
  }
  $('#imageDetailsModal').modal('hide');
}

const deleteImageSuccess = function() {
  console.log('image deleted');
  $('#imageDetailsModal').modal('hide');
  for(let image in store.portfolioImages){
    if(store.portfolioImages[image].id === store.currentImage.id){
      delete store.portfolioImages[image];
    }
  }
  refreshImages();
}

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
