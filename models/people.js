const mongoose = require("mongoose");

const peopleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    mobile: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avarar: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
},
    {
        timestaps: true
    }
)

const people = mongoose.model("People", peopleSchema);

module.exports = people;