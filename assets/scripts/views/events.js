'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);
const store = require('../store.js');
const api = require('../portfolio/api.js');
const ui = require('../portfolio/ui.js');
const viewUi = require('./ui.js');

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

const addHandlers = () => {
  window.addEventListener("hashchange", onURLChange);

  // hide all views by default
  $('#portfolio').hide();
  $('#contact').hide();
  $('#about').hide();

  // show active view on page load
  let view = window.location.href;
  // Filter view name from URL
  for(let i = 0; i < view.length; i++) {
    if(view[i] === '#') {
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
};

module.exports = {
  addHandlers,
};
