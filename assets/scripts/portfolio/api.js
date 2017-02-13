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

  const loadImages = (data) =>
  $.ajax({
    url: config.host+'/images',
    method: 'GET',
  });

  const editImage = (data) =>
    $.ajax({
      url: config.host+'/images/'+data.image.id,
      method: 'PATCH',
      data,
      headers: {
        Authorization: 'Token token='+store.user.token,
      }
    });

    const deleteImage = () =>
      $.ajax({
        url: config.host+'/images/'+store.currentImage.id,
        method: 'DELETE',
        headers: {
          Authorization: 'Token token='+store.user.token
        },
      });

module.exports = {
  createNewImage,
  loadImages,
  editImage,
  deleteImage,
};
