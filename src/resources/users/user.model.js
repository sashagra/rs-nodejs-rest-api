const uuid = require('uuid');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
  name: String,
  login: String,
  password: String,
  _id: {
    type: String,
    default: uuid
  }
});

userSchema.pre('save', function p(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return next(err);

    // eslint-disable-next-line no-shadow
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};
const User = mongoose.model('User', userSchema);

module.exports = User;
