const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  authId: String,
  club: String,
  name: String,
  isConfirmedCoach: Boolean,
  isAllowedToEdit: Boolean
});

mongoose.model('users', userSchema);