const mongoose = require('mongoose')

const registrationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    college: {
        type: String,
        required: true
    },
    question_1: {
        type: String,
        required: true
    },
    question_2: {
        type: String,
        required: true
    },
    question_3: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Registration', registrationSchema)