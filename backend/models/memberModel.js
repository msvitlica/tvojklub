const mongoose = require('mongoose');
const {Schema} = mongoose;

const membercSchema = new Schema({
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    group: String,
    groupId: Schema.Types.ObjectId
})


module.exports = mongoose.model('member', membercSchema);
