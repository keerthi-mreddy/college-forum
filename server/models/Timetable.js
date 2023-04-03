const mongoose = require('mongoose');

const TimetableSchema = new mongoose.Schema({
    branch: String,
    year: String,
    section: String,
    timetable: Array
})

const Timetable = mongoose.model('timetable', TimetableSchema);
module.exports = Timetable;
