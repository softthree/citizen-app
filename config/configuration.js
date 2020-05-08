const mongoose = require('mongoose');
const jsonConfig = require('../config/config.json');

function initialize(env) {
  let config = jsonConfig[env];
  mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('Database is connected!');
  });
}

module.exports = {
  initialize
};

// mongodb://citizen:citizen1@ds253348.mlab.com:53348/citizen