const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const courseModel = new Schema({
    title: {
        type: String,
        require: true
    },
    details: {
        type: String,
        require: true
    },
    user: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})
mongoose.model('course', courseModel)

