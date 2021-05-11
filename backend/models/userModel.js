const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  authId: String,
  club: Object,
  name: String,
  isOwner: Boolean
});

mongoose.model('users', userSchema);