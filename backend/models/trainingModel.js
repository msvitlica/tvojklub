const mongoose = require('mongoose');
const { Schema } = mongoose;

const trainingSchema = new Schema({
    term: String,
    group: String,
    coach: String,
    membersInGroup: Array,
    recurranceDay: String
})

module.exports = mongoose.model('training', trainingSchema);