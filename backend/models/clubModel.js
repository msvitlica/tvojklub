const mongoose = require('mongoose');
const { Schema } = mongoose;

const clubSchema = new Schema({
  clubId: Schema.Types.ObjectID,
  name: String,
  owner: String,
  coaches: [],
  newCoaches: []
});

mongoose.model('clubs', clubSchema);