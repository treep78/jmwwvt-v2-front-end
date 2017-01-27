'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api');
const ui = require('./ui');
const store = require('../store.js');

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
            .then(ui.success)
            .catch(ui.failure);
          break;
        }
      }
    }
    if(!success){
      console.log('wrong type');
    }
};

const addHandlers = () => {
  $('#newImage').on('submit', onNewImage);
};

module.exports = {
  addHandlers,
};
