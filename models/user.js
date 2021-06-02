const mongoose = require('mongoose');

const UserModel = mongoose.Schema({
  id: String,
  name: String,
  email: String,
  jobCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  password: String,
  image: String,
  isJobSeeker: Boolean,
});

const User = mongoose.model('User', UserModel);

module.exports = User;
