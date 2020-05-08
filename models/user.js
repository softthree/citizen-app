var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    nameEmail: {
        type: String,
        required: true
    },
    password: {
        type: String,
        select: false
    },
    dob: {
        type: String
    },
    gender: {
        type: String
    },
    country: {
        type: String
    },
    tasks: {
        type: []
    }
});

module.exports = mongoose.model('User', userSchema);