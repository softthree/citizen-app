const SeedModel = require('./models/seed');
const LinkModel = require('./models/links');

const AdminModel = require('./models/admin');
const mongoose = require('mongoose');
const jsonConfig = require('./config/config.json');
const passwordUtils = require('./utils/passwordHash')

let config = jsonConfig['development'];
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function () {
    console.log('Database is connected!');

    let satelliteImages = await SeedModel.find();
    let seedImages = new SeedModel({
        satelliteImages: []
    });

    await seedImages.save();

    let admin = {
        userName: 'test',
        password: 'test123'
    }

    let hashedPassword = await passwordUtils.hashPassword(admin.password);
    let defaultUser = new AdminModel({
        userName: admin.userName,
        password: hashedPassword
    })

    await defaultUser.save();

    mongoose.disconnect();
});