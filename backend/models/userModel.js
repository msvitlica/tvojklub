const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
  // club: String,
  // name: String,
});

mongoose.model('users', userSchema);