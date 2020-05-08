var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var linkSchema = new Schema({
    links: {
        type: []
    }
});

module.exports = mongoose.model('Link', linkSchema);