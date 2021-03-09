const mongoose = require('mongoose');
const { Schema } = mongoose;

const trainingSchema = new Schema({
    startTime: String,
    endTime: String,
    group: Object,
    coach: String,
    membersInGroup: Array,
})

module.exports = mongoose.model('training', trainingSchema);