const mongoose = require('mongoose');
const { Schema } = mongoose;

const trainingSchema = new Schema({
    term: String,
    group: String,
    coach: String,
    membersInGroup: Array,
})

module.exports = mongoose.model('training', trainingSchema);