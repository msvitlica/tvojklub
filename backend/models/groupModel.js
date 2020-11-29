const mongoose = require('mongoose');
const {Schema} = mongoose;

const groupSchema = new Schema({
    name: String,
    description: String,
})


module.exports = mongoose.model('group', groupSchema);
