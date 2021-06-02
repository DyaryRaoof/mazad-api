const express = require('express');

const user = require('../routes/users');
// const contactModel = require('../routes/contacts')

// const admin = require('../routes/admin');

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/users', user);
  // app.use('/api/contact-model', contactModel)
  // app.use('/api/notification', notification)

  // app.use('/admin', admin);
};
