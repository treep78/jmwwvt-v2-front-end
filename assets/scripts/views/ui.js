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

      /*let html = '<a data-toggle="modal" data-target="#'+images[image].id+
      'Modal"><img src="'+images[image].link+'" alt="'+images[image].title+
      '" class="portfolioImage" id="'+images[image].id+
      '"></img></a><div class="modal fade" id="'+images[image].id+
      'Modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><h2>'+images[image].title+
      '</h2><br><img src="'+images[image].link+
      '" class="modalImage"><p class="imageDescription">'+images[image].description+
      '</p></img><div id="imageDetailsDiv"></div></div></div></div></div>';*/

      let html = '<img src="'+images[image].link+'" alt="'+images[image].title+'" class="portfolioImage" id="'+images[image].id+'">'+
      '</img>';/*+
      '<div class="modal fade" id="'+images[image].id+'Modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'+
        '<div class="modal-dialog" role="document">'+
          '<div class="modal-content">'+
            '<div class="modal-header">'+
              '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                '<span aria-hidden="true">&times;</span>'+
              '</button>'+
            '</div>'+
            '<div class="modal-body">'+
              '<form id="editImage'+images[image].id+'">'+
                '<h2>'+
                  '<input type="text" name="image[title]" value="'+images[image].title+'" class="input-field">'+
                '</h2>'+
                '<br>'+
                '<img src="'+images[image].link+'" class="modalImage">'+
                '</img>'+
                  '<br>'+
                  '<input type="text" name="image[link]" value="'+images[image].link+'" class="text-box">'+
                  '<br>'+
                  '<input type="text" name="image[category]" value="'+images[image].category+'" class="text-box">'+
                  '<input type="text" name="image[description]" value="'+images[image].description+'"  class="text-box">'+
                  '<button type="submit" class="btn btn-xs btn-default">Save</button>'+
              '</form>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>';*/
      content += html;
    }
  }
  $('#portfolioImages').empty();
  $('#portfolioImages').append(content);
};

module.exports = {
  displayImages,
};
