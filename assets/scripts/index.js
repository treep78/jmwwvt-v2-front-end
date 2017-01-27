'use strict';

const authEvents = require('./auth/events.js');
const views = require('./views/events.js');
const portfolio = require('./portfolio/events.js');

// On document ready
$(() => {
  authEvents.addHandlers();
  views.addHandlers();
  portfolio.addHandlers();
});
