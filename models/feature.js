var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var featureSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    plainName: {
        type: String
    },
    tutorialImages: {
        type: [],
    },
    tutorialText: {
        type: String
    },
    images: {
        type: []
    }
});

module.exports = mongoose.model('Feature', featureSchema);