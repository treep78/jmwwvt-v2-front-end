'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);
const store = require('../store.js');

const onURLChange = function (event) {
  let newView = event.newURL.split('');
  let oldView = event.oldURL.split('');
  // Filter new view name
  for(let i = 0; i < newView.length; i++) {
    if(newView[i] === '#') {
      let tempView = '';
      for(let j = i; j < newView.length; j++) {
        tempView += newView[j];
      }
      newView = tempView;
      break;
    }
  }
  // Filter old view name
  for(let i = 0; i < oldView.length; i++) {
    if(oldView[i] === '#') {
      let tempView = '';
      for(let j = i; j < oldView.length; j++) {
        tempView += oldView[j];
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
      }
      $(tempView).show();
      break;
    }
  }
};

module.exports = {
  addHandlers,
};
