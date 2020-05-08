const bcrypt = require('bcryptjs');
const saltRounds = 10;
const asyncMiddleware = require('../utils/asyncMiddleware');

var salt = bcrypt.genSaltSync(10);

function hashPassword(password) {
    return bcrypt.hashSync(password, salt);
    //  bcrypt.hash(password, saltRounds);
}

function comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
    //  bcrypt.compare(password, hash);
}

module.exports = {
    hashPassword,
    comparePassword
};