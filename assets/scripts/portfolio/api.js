'use strict';
const config = require('../config.js');
const store = require('../store.js');

const createNewImage = (data) =>
  $.ajax({
    url: config.host+'/images',
    method: 'POST',
    data,
    headers: {
      Authorization: 'Token token='+store.user.token,
    }
  });

module.exports = {
  createNewImage,
};
