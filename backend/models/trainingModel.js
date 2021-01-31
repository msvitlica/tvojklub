const mongoose = require('mongoose');
const { Schema } = mongoose;

const trainingSchema = new Schema({
    term: String,
    group: Object,
    coach: String,
    membersInGroup: Array,
    trainingDate: Date,
    scheduleId: Schema.Types.ObjectId,
    trainingStatus: { type: String, default: 'unknown'}
})

module.exports = mongoose.model('training', trainingSchema);