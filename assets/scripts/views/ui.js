'use strict';

const store = require('../store.js');
const events = require('./events.js');

const doSomething = function(event) {
  let data = getFormFields(this);
  event.preventDefault();
  console.log('doSomething!');
}

// this function is called to display portfolio images
const displayImages = function() {
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

const editImageSuccess = function() {
  console.log('image edited');
}

module.exports = {
  displayImages,
  editImageSuccess,
};
