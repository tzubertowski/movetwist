const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: String,
  password: { type: String, required: true }
});

UserSchema.pre(
  ‘save’,
  {
    let user = this;
    if (!user.isModified('password')) {
      return next();
    }
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) {
          return next(err);
        }
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    }
  }
);

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    let user = this;
    bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}

module.exports = mongoose.model('Conversation', ConversationSchema);
