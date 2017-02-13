'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api.js');
const ui = require('./ui.js');
const store = require('../store.js');
const viewUi = require('../views/ui.js');

const onNewImage = function (event) {
  event.preventDefault();
  let data = getFormFields(this);
  let link = data.image.link;
  let success=false;
  for(let i=0; i<link.length;i++) {
      if(link[i] === '.'){
        let ext = link[i+1]+link[i+2]+link[i+3];
        if(ext === 'png' || ext === 'jpg') {
          success=true;
          api.createNewImage(data)
            .then(ui.newImageSuccess)
            .catch(ui.failure);
          break;
        }
      }
    }
    if(!success){
      console.log('wrong type');
    }
};

const saveEditedImage = function(event) {
  let data = getFormFields(this);
  event.preventDefault();
  api.editImage(data)
    .then(ui.editImageSuccess(data))
    .catch(ui.failure);
};

const deleteSelectedImage = function() {
  event.preventDefault();
  api.deleteImage()
    .then(ui.deleteImageSuccess)
    .catch(ui.failure);
}

const addHandlers = () => {
  $('#newImage').on('submit', onNewImage);
  $('#changeImageForm').on('submit', saveEditedImage);
  $('#deleteImage').on('click', deleteSelectedImage);
};

module.exports = {
  addHandlers,
};
