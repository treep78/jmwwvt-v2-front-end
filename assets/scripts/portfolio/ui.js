'use strict';

const store = require('../store.js');
const events = require('./events.js');
const api = require('./api.js');

const success = function(data)
{
  $('#messages').text('success');
};

const failure = (error) => {
  console.error(error);
  $('#messages').text('failure');
};

module.exports = {
  failure,
  success,
};
