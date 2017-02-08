'use strict';
const config = require('../config.js');
const store = require('../store.js');

const editImage = (data) =>
  $.ajax({
    url: config.host+'/images/'+data.image.id,
    method: 'PATCH',
    data,
    headers: {
      Authorization: 'Token token='+store.user.token,
    }
  });

module.exports = {
  editImage,
};
