const mongoose = require('mongoose');
const { Schema } = mongoose;

const scheduleSchema = new Schema({
    startTime: String,
    endTime: String,
    trainingDuration:String,
    attendedGroups: Array,
    recurrance: Object,
    aboutSchedule: String
})

module.exports = mongoose.model('schedule', scheduleSchema);