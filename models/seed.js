var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var seedSchema = new Schema({
    satelliteImages: {
        type: [],
    }
});

module.exports = mongoose.model('Seed', seedSchema);