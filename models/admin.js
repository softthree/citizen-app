var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        select: false
    }
});

module.exports = mongoose.model('Admin', adminSchema);