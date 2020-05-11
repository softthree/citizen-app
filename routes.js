const express = require('express');
const router = express.Router();
const jwt = require('./utils/jwt');
const GeneralController = require('./controllers/generalController');
const UserController = require('./controllers/userController')
const FeatureController = require('./controllers/featureController')
const SeedController = require('./controllers/seedController')




router.get('/test', (req, res) => {
    res.send('Server Is Running!');
});

// User Routes

router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.post('/update', jwt.verifyJwt, UserController.update);
router.post('/getUserData', jwt.verifyJwt, UserController.getData);



router.post('/adminLogin', UserController.adminLogin);

// Admin Routes

router.get('/dashboard', GeneralController.dashboard)
router.post('/addFeature', FeatureController.addFeature)
router.get('/getFeature/:name', FeatureController.getFeatureInfo)
router.get('/deleteFeature/:id', FeatureController.deleteFeature)
router.get('/getFeatureList', FeatureController.getFeatureList)
router.post('/updateFeature/:name', FeatureController.updateFeature)
router.post('/insertFeatureImages/:name', FeatureController.insertFeatureImages)
router.get('/recaptchaImages/:name', FeatureController.recaptchaImages)
router.get('/levelsimages/:name', FeatureController.boundingImages)


router.post('/addSatelliteImage/:id', SeedController.insertImage)
router.post('/deleteSatelliteImage', SeedController.deleteImage)
router.get('/getSatelliteImages', SeedController.getSatelliteImages)

module.exports = router;