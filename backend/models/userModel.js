const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  authId: String,
  club: {
    clubName: String,
    clubId: String
  },
  name: String,
  isOwner: Boolean
});

module.exports = mongoose.model('users', userSchema);