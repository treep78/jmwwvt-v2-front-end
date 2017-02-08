'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);
const store = require('../store.js');
const api = require('../portfolio/api.js');
const ui = require('../portfolio/ui.js');
const viewUi = require('./ui.js');
const viewApi = require('./api.js');
const config = require('../config.js');

const onURLChange = function (event) {
  let newView = event.newURL.split('');
  let oldView = event.oldURL.split('');
  // Filter new view name
  for(let i = 0; i < newView.length; i++) {
    if(newView[i] === '#') {
      let tempView = '';
      for(let j = i; j < newView.length; j++) {
        tempView += newView[j];
        if(newView[j+1] === '/'){
          break;
        }
      }
      newView = tempView;
      if(newView === '#portfolio')
      {
        api.loadImages()
          .then(ui.getImagesSuccess)
          .then(
          viewUi.displayImages)
          .catch(ui.failure);
      }
      break;
    }
  }
  // Filter old view name
  for(let i = 0; i < oldView.length; i++) {
    if(oldView[i] === '#') {
      let tempView = '';
      for(let j = i; j < oldView.length; j++) {
        tempView += oldView[j];
        if(oldView[j+1] === '/'){
          break;
        }
      }
      oldView = tempView;
      break;
    }
  }
  $(oldView).hide();
  $(newView).show();
};

const saveEditedImage = function(event) {
  let data = getFormFields(this);
  event.preventDefault();
  console.log(data);
  viewApi.editImage(data)
    .then(viewUi.editImageSuccess)
    .catch(ui.failure);
};

const deleteSelectedImage = function() {
  event.preventDefault();
  viewApi.deleteImage()
    .then(viewUi.deleteImageSuccess)
    .catch(ui.failure);
}

const addHandlers = () => {

  $(document).on('click', '.portfolioImage', function(){
    store.activeImage = this.id;
    $('#imageDetailsModal').modal('show');
    let modalImage = [];
    for(let image in store.portfolioImages){
      if(store.portfolioImages[image].id === this.id)
      {
        store.currentImage = store.portfolioImages[image];
        if(store.user !== undefined){
          $('#deleteImage').show();
          let content = '<h2>'+
              'Title: '+
              '<input type="text" name="image[title]" value="'+store.portfolioImages[image].title+'" class="input-field">'+
              '</h2>'+
              '<br>'+
              '<img src="'+store.portfolioImages[image].link+'" class="modalImage">'+
              '</img>'+
              '<br>'+
              'Image Link: '+
              '<input type="text" name="image[link]" value="'+store.portfolioImages[image].link+'" class="text-box">'+
              '<br>'+
              'Category: '+
              '<input type="text" name="image[category]" value="'+store.portfolioImages[image].category+'" class="input-field">'+
              '<hr>'+
              'Description: <br>'+
              '<textarea type="text" name="image[description]" class="text-box">'+
              store.portfolioImages[image].description+
              '</textarea>'+
              '<input type="hidden" value="'+store.portfolioImages[image].id+'" name="image[id]" />'+
              '<button type="submit" class="btn btn-xs btn-primary">Save</button>';
              $('#imageDeailsModalBody').empty();
              $('#changeImageForm').empty();
              $('#changeImageForm').append(content);
        } else {
          $('#deleteImage').hide();
          let content = '<div class="modal-body">'+
            '<h2>'+store.portfolioImages[image].title+'</h2>'+
            '<br>'+
            '<img src="'+store.portfolioImages[image].link+'" class="modalImage"></img>'+
            '<hr>'+
            '<p class="imageDescription">'+store.portfolioImages[image].description+
            '</p>'+
          '</div>';
          $('#changeImageForm').empty();
          $('#imageDeailsModalBody').empty();
          $('#imageDeailsModalBody').append(content);
        }
      }
    }
  });

  $('#changeImageForm').on('submit', saveEditedImage);
  $('#deleteImage').on('click', deleteSelectedImage);

  window.addEventListener("hashchange", onURLChange);

  // hide all views by default
  $('#portfolio').hide();
  $('#contact').hide();
  $('#about').hide();

  // show active view on page load
  let view = window.location.href;
  // Filter view name from URL
  let routed = false;
  for(let i = 0; i < view.length; i++) {
    if(view[i] === '#') {
      routed = true;
      let tempView = '';
      for(let j = i; j < view.length; j++) {
        tempView += view[j];
        if(view[j+1] === '/'){
          break;
        }
      }
      $(tempView).show();
      if(tempView === '#portfolio')
      {
        api.loadImages()
          .then(ui.getImagesSuccess)
          .then(
          viewUi.displayImages)
          .catch(ui.failure);
      }
      break;
    }
  }
  if(!routed){
    window.location.href = config.local+"/#about";
  }

};

module.exports = {
  addHandlers,
  saveEditedImage,
};
