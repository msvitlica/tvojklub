const mongoose = require('mongoose');
const {Schema} = mongoose;

const groupSchema = new Schema({
    name: String,
})


module.exports = mongoose.model('group', groupSchema);
