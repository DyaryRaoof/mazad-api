const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const multiparty = require('connect-multiparty');
const multiPartiMiddleWare = multiparty({ uploadDir: './public/images/' });
const _ = require('lodash');
const User = require('../models/user');
const fs = require('fs');

router.use(multiPartiMiddleWare);

router.post('/', async (req, res) => {
  console.log(req.body.json);
  reqJson = JSON.parse(req.body.json);
  const _user = new User(reqJson);

  let user = await User.findOne({ email: _user.email }).select('-password');
  if (user && user != '') {
    res.status(400).send('User already registered, please log in !');
    return;
  }

  const salt = await bcrypt.genSalt(10);
  _user.password = await bcrypt.hash(_user.password, salt);
  var imageURL =
    req.protocol +
    '://' +
    req.get('host') +
    '/' +
    req.files.image.path.split('public/')[1];
  _user.image = imageURL;
  await _user.save();

  //   const webToken = user.generateAuthToken();

  res
    // .headers('x-auth-token', webToken)
    .send(_.pick(_user, 'name', 'email', '_id'));
});

module.exports = router;
